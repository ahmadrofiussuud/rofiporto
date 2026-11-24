import { writeFile } from 'node:fs/promises';
const root='https://rofiporto.vercel.app';
const results=[];
for (const pathname of ['/','/robots.txt','/sitemap.xml']) {
  try {
    const response=await fetch(root+pathname,{signal:AbortSignal.timeout(30000)});
    const html=await response.text();
    results.push({tool:'HTTP public',url:root+pathname,checkedAt:new Date().toISOString(),status:response.status,
      ...(pathname==='/'?{lang:html.match(/<html[^>]*lang="([^"]*)/)?.[1],verificationPresent:html.includes('EYNn_eOPX0mmNaCYj8XHJMIGH3kJtgDupC6_LV5HXzQ'),canonical:html.match(/rel="canonical" href="([^"]*)/)?.[1],analyticsMarkerPresent:/googletagmanager|google-analytics|va\.vercel-scripts|_vercel\/insights|plausible\.io/i.test(html)}:{}),
      ...(pathname==='/sitemap.xml'?{urlCount:[...html.matchAll(/<loc>/g)].length}:{}),
      ...(pathname==='/robots.txt'?{body:html}:{})});
  }catch(error){results.push({tool:'HTTP public',url:root+pathname,error:String(error)});}
}
for (const pathname of ['/','/about','/projects/amora']) {
  const endpoint=`https://validator.w3.org/nu/?doc=${encodeURIComponent(root+pathname)}&out=json`;
  try {
    const response=await fetch(endpoint,{signal:AbortSignal.timeout(45000),headers:{'User-Agent':'Portfolio SEO audit; public URL validation','Accept':'application/json'}});
    const body=await response.text();
    let data;try{data=JSON.parse(body)}catch{data={responseExcerpt:body.slice(0,400)}}
    results.push({tool:'W3C Nu',url:root+pathname,endpoint,checkedAt:new Date().toISOString(),status:response.status,data});
  }catch(error){results.push({tool:'W3C Nu',url:root+pathname,error:String(error)});}
}
const psi=`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(root)}&strategy=mobile`;
try {
  const response=await fetch(psi,{signal:AbortSignal.timeout(45000)});const data=await response.json();
  results.push({tool:'PSI',url:root,checkedAt:new Date().toISOString(),status:response.status,loadingExperience:data.loadingExperience,originLoadingExperience:data.originLoadingExperience,error:data.error});
}catch(error){results.push({tool:'PSI',url:root,error:String(error)});}
await writeFile('docs/seo/evidence/phase7-public-tools.json',JSON.stringify(results,null,2));
console.log(results.map(r=>({tool:r.tool,url:r.url,status:r.status,error:r.error,errors:r.data?.messages?.filter(m=>m.type==='error').length,warnings:r.data?.messages?.filter(m=>m.subType==='warning').length})));
