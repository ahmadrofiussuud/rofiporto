import { readdir, readFile, writeFile } from 'node:fs/promises';
import matter from 'gray-matter';

const base = process.argv[2];
const output = process.argv[3];
if (!base || !output) throw new Error('Usage: node capture-on-page.mjs BASE_URL OUTPUT');
const decode = value => value.replace(/&amp;/g, '&').replace(/&#x([\da-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n,16))).replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));
const attrs = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([,k,v]) => [k,decode(v)]));
const slugs = (await readdir('content/projects')).filter(f=>f.endsWith('.mdx')).map(f=>f.slice(0,-4));
const routes = ['/', '/about', '/projects', '/competitions', '/contact', ...slugs.map(s=>`/projects/${s}`)];
const pages = [];
for (const route of routes) {
  const response = await fetch(new URL(route, base));
  const html = await response.text();
  const markup = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
  const metas = [...html.matchAll(/<meta\b[^>]*>/gi)].map(([t])=>attrs(t));
  const metadata = name => metas.find(m=>m.name===name || m.property===name)?.content;
  const headings = [...markup.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].map(([,level,text])=>({level:Number(level),text:decode(text.replace(/<br\s*\/?>/gi,' ').replace(/<[^>]+>/g,'').trim())}));
  const links = [...markup.matchAll(/<a\b[^>]*>/gi)].map(([t])=>attrs(t).href).filter(Boolean);
  pages.push({route,status:response.status,title:decode(html.match(/<title>([^<]*)<\/title>/)?.[1]||''),description:metadata('description'),ogTitle:metadata('og:title'),ogDescription:metadata('og:description'),twitterTitle:metadata('twitter:title'),headings,links});
}
const content = [];
for (const slug of slugs) {
  const project = matter(await readFile(`content/projects/${slug}.mdx`,'utf8'));
  content.push({slug,...project.data});
}
await writeFile(output, JSON.stringify({date:new Date().toISOString(),base,pages,content},null,2));
console.log(`Captured ${pages.length} rendered pages to ${output}`);
