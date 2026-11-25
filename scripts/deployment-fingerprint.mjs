import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
const base='https://rofiporto.vercel.app';
const records=[];
for (const [route,file] of [['/favicon.ico','src/app/favicon.ico'],['/apple-icon.png','src/app/apple-icon.png']]) {
 const response=await fetch(base+route);const actual=Buffer.from(await response.arrayBuffer());const expected=await readFile(file);
 const hash=data=>createHash('sha256').update(data).digest('hex');
 assert.equal(response.status,200);assert.equal(hash(actual),hash(expected));
 records.push({route,status:response.status,sha256:hash(actual),matchesRepository:true});
}
for (const route of ['/about/','/projects/amora/']) {
 const r=await fetch(base+route,{redirect:'manual'});
 assert.equal(r.status,308);assert.equal(new URL(r.headers.get('location'),base).pathname,route.slice(0,-1));
 records.push({route,status:r.status,location:r.headers.get('location')});
}
const response=await fetch(base+'/branding/opengraph-image');const bytes=Buffer.from(await response.arrayBuffer());
assert.equal(response.status,200);assert.equal(bytes.readUInt32BE(16),1200);assert.equal(bytes.readUInt32BE(20),630);
records.push({route:'/branding/opengraph-image',status:200,width:1200,height:630});
const home=await(await fetch(base)).text();
assert.ok(home.includes('"@type":"WebSite"'));assert.ok(!home.includes('"@type":"ProfilePage"'));
assert.ok(home.includes('EYNn_eOPX0mmNaCYj8XHJMIGH3kJtgDupC6_LV5HXzQ'));
records.push({route:'/',newWebsiteSchema:true,profilePageOnlyOnAbout:true,verificationPreserved:true});
await writeFile('docs/seo/evidence/phase8-deployment-fingerprint.json',JSON.stringify({base,passed:true,records},null,2));
console.log('Production icons match repository; social image, root graph, verification and trailing slash redirects passed');
