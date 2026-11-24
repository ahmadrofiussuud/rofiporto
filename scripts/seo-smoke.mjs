import assert from "node:assert/strict";
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const argumentsList = process.argv.slice(2);
function option(name, fallback) {
  const index = argumentsList.indexOf(name);
  return index < 0 ? fallback : argumentsList[index + 1];
}

const base = new URL(option("--base-url", "http://localhost:3100"));
const mode = option("--mode", "production");
assert.ok(["production", "preview"].includes(mode), "Use --mode production or preview");
const production = "https://rofiporto.vercel.app";
const preview = mode === "preview";
const reportPath = option("--report", "");
const results = [];

function check(condition, message) {
  assert.ok(condition, message);
  results.push(message);
}

function decode(value) {
  return value.replace(/&amp;/g, "&").replace(/&quot;/g, '"')
    .replace(/&#x([\da-f]+);/gi, (_, number) => String.fromCodePoint(parseInt(number, 16)))
    .replace(/&#(\d+);/g, (_, number) => String.fromCodePoint(Number(number)));
}

function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)]
    .map(([, name, value]) => [name.toLowerCase(), decode(value)]));
}

function meta(html, name) {
  return [...html.matchAll(/<meta\b[^>]*>/gi)].map(([tag]) => attributes(tag))
    .find(tag => tag.name === name || tag.property === name)?.content;
}

async function request(route) {
  const response = await fetch(new URL(route, base), { redirect: "manual", signal: AbortSignal.timeout(30000) });
  return { response, html: await response.text() };
}

try {
  const files = (await readdir("content/projects")).filter(file => file.endsWith(".mdx"));
  const projects = await Promise.all(files.map(async file => ({
    route: `/projects/${file.slice(0, -4)}`,
    ...matter(await readFile(path.join("content/projects", file), "utf8")),
  })));
  const routes = ["/", "/about", "/projects", "/competitions", "/contact", ...projects.map(p => p.route)];
  const { response: robotsResponse, html: robots } = await request("/robots.txt");
  check(robotsResponse.status === 200, "robots.txt returns 200");
  check(/Allow: \/\s/.test(robots) && !/Disallow: \/\s/.test(robots), "Public pages and resources can be crawled");
  check(robots.includes(`Sitemap: ${production}/sitemap.xml`), "robots points to production sitemap");
  const { response: sitemapResponse, html: sitemap } = await request("/sitemap.xml");
  check(sitemapResponse.status === 200, "sitemap.xml returns 200");
  const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, url]) => decode(url));
  const expected = routes.map(route => production + (route === "/" ? "" : route));
  assert.deepEqual([...locations].sort(), preview ? [] : [...expected].sort(), "Sitemap has exactly the public canonical route set");
  check(new Set(locations).size === locations.length, "Sitemap has no duplicate URLs");
  check(!sitemap.includes("<lastmod>"), "No inferred or build-time lastmod timestamps");

  const pages = new Map();
  const titles = new Set();
  const descriptions = new Set();
  const linkGraph = {};
  const internalTargets = new Set();
  const imageTargets = new Set();
  for (const route of routes) {
    const { response, html } = await request(route);
    check(response.status === 200, `${route} returns 200`);
    check(/<html[^>]*lang="id"/.test(html), `${route} declares Indonesian`);
    const headerNoindex = /noindex/i.test(response.headers.get("x-robots-tag") || "");
    const robotsNoindex = /noindex/i.test(meta(html, "robots") || "");
    check(preview ? headerNoindex && robotsNoindex : !headerNoindex && !robotsNoindex, `${route} ${mode} index directives correct`);
    const canonicalLinks = [...html.matchAll(/<link\b[^>]*>/gi)].map(([tag]) => attributes(tag)).filter(tag => tag.rel === "canonical");
    check(canonicalLinks.length === 1 && canonicalLinks[0].href === production + (route === "/" ? "" : route), `${route} has one production canonical`);
    const title = decode(html.match(/<title>([^<]+)<\/title>/)?.[1] || "");
    check(title.length > 0 && Boolean(meta(html, "description")), `${route} title and description exist`);
    const description = meta(html, "description");
    check(!titles.has(title) && !descriptions.has(description), `${route} metadata unique across public pages`);
    titles.add(title);
    descriptions.add(description);
    check(meta(html, "og:title") === title && Boolean(meta(html, "twitter:card")), `${route} social metadata matches page`);
    check(meta(html, "og:description") === description && meta(html, "twitter:description") === description, `${route} descriptions consistent across search and social`);
    check((meta(html, "og:image") || "").startsWith(`${production}/`), `${route} social image uses production`);
    check(meta(html, "google-site-verification") === "EYNn_eOPX0mmNaCYj8XHJMIGH3kJtgDupC6_LV5HXzQ", `${route} preserves GSC verification`);
    const markup = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
    const main = markup.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] || "";
    check((main.match(/<h1\b/g) || []).length === 1, `${route} renders one H1 without JavaScript`);
    const levels = [...main.matchAll(/<h([1-6])\b/g)].map(([, level]) => Number(level));
    check(levels.every((level, index) => index === 0 ? level === 1 : level <= levels[index - 1] + 1), `${route} heading levels do not skip`);
    const project = projects.find(p => p.route === route);
    if (project) {
      check(decode(main).includes(project.data.title), `${route} renders project title`);
      check(main.includes("prose"), `${route} renders MDX article`);
    }
    pages.set(route, markup);
    linkGraph[route] = [];
    for (const [tag] of markup.matchAll(/<img\b[^>]*>/gi)) {
      const image = attributes(tag);
      check(Boolean(image.alt), `${route} image has descriptive alt`);
      const src = new URL(image.src, production);
      const original = src.pathname === "/_next/image" ? src.searchParams.get("url") : image.src;
      if (original?.startsWith("/images/")) imageTargets.add(original);
    }
    for (const [tag] of markup.matchAll(/<a\b[^>]*>/gi)) {
      const href = attributes(tag).href;
      if (!href || /^(mailto:|tel:)/i.test(href)) continue;
      const target = new URL(href, `${production}${route}`);
      if (target.origin === production) {
        internalTargets.add(target.pathname + target.hash);
        if (routes.includes(target.pathname) && target.pathname !== route) linkGraph[route].push(target.pathname);
      }
    }
  }
  const reachable = new Set(["/"]);
  const queue = ["/"];
  for (const route of queue) {
    for (const target of linkGraph[route]) {
      if (!reachable.has(target)) {
        reachable.add(target);
        queue.push(target);
      }
    }
  }
  check(routes.every(route => reachable.has(route)), "All public pages reachable from homepage anchors; no orphan pages");
  for (const target of imageTargets) {
    const response = await fetch(new URL(target, base), { method: "HEAD", redirect: "manual" });
    check(response.status === 200 && response.headers.get("content-type")?.startsWith("image/"), `Image source ${target} exists`);
  }
  for (const name of ["sertifikat-wcc-web-development.jpeg", "pemateri-workshop-product-management-bcc.jpg"]) {
    const imageProbe = new URL("/_next/image", base);
    imageProbe.search = new URLSearchParams({ url: `/images/competitions/${name}`, w: "640", q: "75" }).toString();
    const optimizedImage = await fetch(imageProbe);
    check(optimizedImage.status === 200 && optimizedImage.headers.get("content-type")?.startsWith("image/"), `Certificate ${name} works through image optimizer`);
    await optimizedImage.arrayBuffer();
  }
  for (const route of projects.map(p => p.route)) {
    check(pages.get("/projects").includes(`href="${route}"`), `${route} linked in server-rendered archive`);
  }
  const checkedPaths = new Map();
  for (const target of internalTargets) {
    const url = new URL(target, production);
    let markup = pages.get(url.pathname);
    if (!pages.has(url.pathname)) {
      if (!checkedPaths.has(url.pathname)) checkedPaths.set(url.pathname, await request(url.pathname));
      const result = checkedPaths.get(url.pathname);
      check(result.response.status === 200, `Internal link ${url.pathname} returns 200 without redirect`);
      markup = result.html;
    }
    if (url.hash) check(markup.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `Fragment ${target} exists`);
  }
  for (const route of ["/seo-smoke-missing", "/projects/seo-smoke-missing", "/projects/amora.mdx"]) {
    const { response, html } = await request(route);
    check(response.status === 404, `${route} returns real 404`);
    check(/noindex/i.test(meta(html, "robots") || response.headers.get("x-robots-tag") || ""), `${route} is noindex`);
  }
  for (const route of ["/about/", "/projects/"]) {
    const { response } = await request(route);
    check(response.status === 308 && new URL(response.headers.get("location"), base).pathname === route.slice(0, -1), `${route} redirects once to canonical path`);
  }
  const legacyCertificates = [
    ["/images/projects/Sertif%20JAVA%20dasar.pdf", "/images/projects/sertif%20java.jpg"],
    ["/images/projects/Sertif%20PM%20dasar.pdf", "/images/projects/sertif%20manajemen%20proyek.jpg"],
    ["/images/projects/Sertifikat%20PBO.pdf", "/images/projects/sertif%20pbo.jpg"],
    ["/images/competitions/sertif%20finalis%20web%20dev'.jpeg", "/images/competitions/sertifikat-wcc-web-development.jpeg"],
    ["/images/competitions/sertif%20finalis%20web%20dev%27.jpeg", "/images/competitions/sertifikat-wcc-web-development.jpeg"],
    ["/images/competitions/Pemateri%20WS%205%20PM%20BCC%20-%20Muhammad%20Ahmad%20Rofi'us%20Su'ud_page-0001.jpg", "/images/competitions/pemateri-workshop-product-management-bcc.jpg"],
    ["/images/competitions/Pemateri%20WS%205%20PM%20BCC%20-%20Muhammad%20Ahmad%20Rofi%27us%20Su%27ud_page-0001.jpg", "/images/competitions/pemateri-workshop-product-management-bcc.jpg"],
  ];
  for (const [oldName, currentName] of legacyCertificates) {
    const { response } = await request(oldName);
    check(response.status === 308, `${oldName} permanently redirects`);
    const destination = new URL(response.headers.get("location"), base);
    check(destination.pathname === currentName, `${oldName} points to existing certificate`);
    const result = await fetch(destination, { redirect: "manual" });
    check(result.status === 200 && result.headers.get("content-type")?.startsWith("image/"), `${oldName} destination is image 200 in one hop`);
    await result.arrayBuffer();
  }
  const queryPage = await request("/?utm_source=seo-smoke");
  check(queryPage.response.status === 200 && queryPage.html.includes(`rel="canonical" href="${production}"`), "Tracking query preserves root canonical");
  const report = { date: new Date().toISOString(), base: base.href, mode, pages: routes.length, checks: results.length, status: "passed", orphanPages: routes.filter(route => !reachable.has(route)), linkGraph, results };
  if (reportPath) await writeFile(reportPath, JSON.stringify(report, null, 2));
  console.log(`SEO smoke passed: ${routes.length} pages, ${results.length} checks (${mode}).`);
} catch (error) {
  if (reportPath) await writeFile(reportPath, JSON.stringify({ date: new Date().toISOString(), mode, status: "failed", completedChecks: results.length, error: String(error) }, null, 2));
  console.error(error);
  process.exitCode = 1;
}
