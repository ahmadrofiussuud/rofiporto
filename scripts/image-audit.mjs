import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
const base = process.argv[2] || 'http://127.0.0.1:3101';
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const routes = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => new URL(m[1]).pathname);
const images = [], sources = new Set();
for (const route of routes) {
  const html = await (await fetch(base + route)).text();
  for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
    const attrs = Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map(m => [m[1], m[2].replaceAll('&amp;', '&')]));
    assert.ok(Object.hasOwn(attrs, 'alt'), `${route}: missing alt`);
    assert.ok(attrs.sizes || (attrs.width && attrs.height), `${route}: no responsive geometry`);
    const url = new URL(attrs.src, base);
    if (url.pathname === '/_next/image') sources.add(url.searchParams.get('url'));
    else if (url.origin === base) sources.add(url.pathname);
    images.push({route, alt:attrs.alt, sizes:attrs.sizes, loading:attrs.loading || 'eager', source:attrs.src});
  }
}
const requests=[];
for (const source of sources) {
  if (!source.startsWith('/')) continue;
  const response = await fetch(base + source);
  assert.equal(response.status, 200, source);
  assert.ok(response.headers.get('content-type')?.startsWith('image/'), source);
  const optimized = await fetch(`${base}/_next/image?url=${encodeURIComponent(source)}&w=640&q=75`, {headers:{Accept:'image/webp'}});
  assert.equal(optimized.status, 200, `optimized ${source}`);
  assert.equal(optimized.headers.get('content-type'), 'image/webp', source);
  requests.push({source,status:response.status, optimizedStatus:optimized.status, optimizedType:optimized.headers.get('content-type'), cache:optimized.headers.get('cache-control'), bytes:(await optimized.arrayBuffer()).byteLength});
}
await writeFile(process.argv[3] || 'docs/seo/evidence/phase5-image-render-audit.json', JSON.stringify({base,pages:routes.length, imageElements:images.length, uniqueSources:sources.size, images, requests, passed:true},null,2));
console.log(routes.length,'pages,',images.length,'image elements,',requests.length,'local sources/optimized WebP passed');
