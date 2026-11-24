"""Supplemental read-only checks for Phase 1."""
import concurrent.futures
import json
import re
import urllib.request
import urllib.error
import urllib.parse
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT/'docs/seo/evidence'
rows = json.loads((OUT/'http-audit.json').read_text(encoding='utf-8'))
urls = set()
for row in rows:
    for link in row.get('links',[]):
        href = link.get('href','')
        if link.get('tag') == 'a' and href.startswith('http'):
            urls.add(href.split('#')[0])
    for image in row.get('images',[]):
        urls.add(urllib.parse.urljoin(row['url'],image['src']))
    for script in row.get('scripts',[]):
        urls.add(urllib.parse.urljoin(row['url'],script))
    for link in row.get('links',[]):
        if link.get('rel') == 'stylesheet': urls.add(urllib.parse.urljoin(row['url'],link['href']))

class Redirects(urllib.request.HTTPRedirectHandler):
    def __init__(self): self.chain=[]
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        self.chain.append({'from':req.full_url,'status':code,'to':newurl})
        return super().redirect_request(req,fp,code,msg,headers,newurl)

def check(url):
    h=Redirects()
    try:
        req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0','Accept-Encoding':'gzip'})
        try: r=urllib.request.build_opener(h).open(req,timeout=25)
        except urllib.error.HTTPError as e: r=e
        body=r.read()
        return dict(url=url,status=r.code,finalUrl=r.url,redirects=h.chain,headers=dict(r.headers),transferBytes=len(body))
    except Exception as e: return dict(url=url,error=str(e),redirects=h.chain)

urls.update(['http://rofiporto.vercel.app/','https://rofiporto.vercel.app/about/','https://rofiporto.vercel.app/projects/'])
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool: result=list(pool.map(check,sorted(urls)))
(OUT/'link-resource-audit.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
missing=[]
for p in (ROOT/'src').rglob('*'):
    if p.suffix not in ['.tsx','.ts']: continue
    for ref in re.findall(r'["\'](/images/[^"\']+)["\']',p.read_text(encoding='utf-8')):
        if not (ROOT/'public'/ref.lstrip('/')).exists(): missing.append(dict(file=str(p.relative_to(ROOT)),reference=ref))
(OUT/'missing-source-assets.json').write_text(json.dumps(missing,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'checks':len(result),'non200':[r for r in result if r.get('status')!=200],'missingSourceAssets':missing},ensure_ascii=True)[:9000])
