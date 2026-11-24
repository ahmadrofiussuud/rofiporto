import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
const base = process.argv[2] || 'http://127.0.0.1:3101';
const origin = 'https://rofiporto.vercel.app';
const checks = [];
function check(value, message) { assert.ok(value, message); checks.push(message); }
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
const graphs = [];
for (const url of urls) {
  const pathname = new URL(url).pathname;
  const html = await (await fetch(`${base}${pathname}`)).text();
  const scripts = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
  check(scripts.length === 1, `${pathname}: one JSON-LD graph`);
  const graph = JSON.parse(scripts[0][1]);
  check(graph['@context'] === 'https://schema.org', `${pathname}: schema context`);
  const nodes = graph['@graph'];
  check(new Set(nodes.map(n => n['@id'])).size === nodes.length, `${pathname}: unique IDs`);
  const person = nodes.find(n => n['@type'] === 'Person');
  check(person?.['@id'] === `${origin}/#person` && person.name === 'Muhammad Ahmad Rofi’us Su’ud', `${pathname}: stable owner`);
  check(person.sameAs.length === 3 && !person.email && !person.telephone && !person.birthDate, `${pathname}: existing profiles and no private fields`);
  check(nodes.find(n => n['@type'] === 'WebSite')?.publisher['@id'] === person['@id'], `${pathname}: publisher relationship`);
  check(nodes.find(n => n['@type'] === 'CollegeOrUniversity')?.['@id'] === person.affiliation['@id'], `${pathname}: university reference`);
  check(nodes.filter(n => n['@type'] === 'ProfilePage').length === (pathname === '/about' ? 1 : 0), `${pathname}: profile page scope`);
  check(!nodes.some(n => ['Article', 'BlogPosting', 'SoftwareApplication'].includes(n['@type'])), `${pathname}: no unsupported article/application claims`);
  if (pathname !== '/') {
    const crumb = nodes.find(n => n['@type'] === 'BreadcrumbList');
    check(crumb?.itemListElement.at(-1).item === url, `${pathname}: canonical breadcrumb`);
    check(crumb.itemListElement.every((item, i) => item.position === i + 1), `${pathname}: ordered breadcrumbs`);
    check(html.includes('aria-label="Jejak navigasi"'), `${pathname}: visible breadcrumb navigation`);
  }
  check(Boolean(person.award) === (pathname === '/about'), `${pathname}: evidenced award scope`);
  graphs.push({ url, graph });
}
for (const route of ['/favicon.ico', '/apple-icon.png', '/branding/opengraph-image']) {
  const response = await fetch(`${base}${route}`);
  check(response.status === 200 && response.headers.get('content-type')?.includes('image/'), `${route}: public image 200`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (route.includes('opengraph')) check(bytes.readUInt32BE(16) === 1200 && bytes.readUInt32BE(20) === 630, 'Social image dimensions 1200x630');
}
await writeFile('docs/seo/evidence/phase4-entity-smoke.json', JSON.stringify({ base, pages: urls.length, checks: checks.length, passed: true, results: checks, graphs }, null, 2));
console.log(`${urls.length} pages, ${checks.length} entity checks passed`);
