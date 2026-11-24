import { readdir, readFile, writeFile } from 'node:fs/promises';
import { gzipSync, brotliCompressSync } from 'node:zlib';
import path from 'node:path';
async function walk(dir) { const entries=await readdir(dir,{withFileTypes:true}); return (await Promise.all(entries.map(e=>e.isDirectory()?walk(path.join(dir,e.name)):path.join(dir,e.name)))).flat(); }
const files=(await walk('.next/static')).filter(f=>f.endsWith('.js'));
const chunks=await Promise.all(files.map(async file=>{const data=await readFile(file);return {file,rawBytes:data.length,gzipBytes:gzipSync(data).length,brotliBytes:brotliCompressSync(data).length};}));
const headers=[];
for (const base of ['http://127.0.0.1:3101','https://rofiporto.vercel.app']) {
  const response=await fetch(base, {headers:{'Accept-Encoding':'gzip, br'}});
  const html=await response.text();
  const js=html.match(/<script src="([^"]+)"/)[1];
  for (const route of ['',js]) {
    const r=await fetch(base+route,{headers:{'Accept-Encoding':'gzip, br'}});
    headers.push({url:base+route,status:r.status,cache:r.headers.get('cache-control'),encoding:r.headers.get('content-encoding'),vercelCache:r.headers.get('x-vercel-cache')});
    await r.arrayBuffer();
  }
}
await writeFile('docs/seo/evidence/phase5-bundle-cache.json',JSON.stringify({chunks,totals:chunks.reduce((a,c)=>({raw:a.raw+c.rawBytes,gzip:a.gzip+c.gzipBytes,brotli:a.brotli+c.brotliBytes}),{raw:0,gzip:0,brotli:0}),headers,note:'All emitted chunks are not the JavaScript loaded by a single route. Compression figures are local calculations, not observed transfer.'},null,2));
console.log(chunks.length,'emitted JS chunks; cache/compression headers recorded');
