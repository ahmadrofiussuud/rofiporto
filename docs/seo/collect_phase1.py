"""Read-only Phase 1 HTTP and asset inventory. Writes audit evidence only."""
import concurrent.futures
import hashlib
import json
import re
import time
import urllib.request
import urllib.error
from html.parser import HTMLParser
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
BASE = 'https://rofiporto.vercel.app'
OUT = ROOT / 'docs/seo/evidence'
OUT.mkdir(exist_ok=True)

class Parser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.meta, self.links, self.images, self.headings, self.scripts = [], [], [], [], []
        self.title, self.text, self.jsonld = '', [], []
        self.tag, self.buffer, self.ld = '', '', False
        self.lang = None
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'html': self.lang = a.get('lang')
        if tag == 'meta': self.meta.append(a)
        if tag in ['a', 'link']: self.links.append(dict(tag=tag, **a))
        if tag == 'img': self.images.append(a)
        if tag == 'script':
            if a.get('src'): self.scripts.append(a['src'])
            self.ld = a.get('type') == 'application/ld+json'
        if tag in ['title','h1','h2','h3','h4','h5','h6'] or (tag == 'script' and self.ld):
            self.tag, self.buffer = tag, ''
    def handle_data(self, data):
        if self.tag: self.buffer += data
        if data.strip(): self.text.append(data.strip())
    def handle_endtag(self, tag):
        if tag != self.tag: return
        if tag == 'title': self.title = self.buffer
        elif tag == 'script':
            try: self.jsonld.append(json.loads(self.buffer))
            except Exception as e: self.jsonld.append({'parseError':str(e)})
        else: self.headings.append([tag, self.buffer])
        self.tag, self.buffer = '', ''

def fetch(url):
    start = time.monotonic()
    try:
        response = urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0 SEO-Audit'}), timeout=35)
    except urllib.error.HTTPError as e: response = e
    except Exception as e: return {'url':url, 'error':str(e)}
    raw = response.read()
    text = raw.decode('utf-8', errors='replace')
    record = dict(url=url, finalUrl=response.url, status=response.code, headers=dict(response.headers), decodedBytes=len(raw), elapsedSeconds=round(time.monotonic()-start,3))
    if 'text/html' in response.headers.get('Content-Type',''):
        p = Parser(); p.feed(text)
        record.update(title=p.title, meta=p.meta, links=p.links, images=p.images, headings=p.headings, jsonld=p.jsonld, scripts=p.scripts, lang=p.lang)
        (OUT / ('home.html' if url == BASE+'/' else 'ignore.tmp')).write_text(text,encoding='utf-8') if url == BASE+'/' else None
    else: record['body'] = text[:20000]
    return record

slugs = sorted(p.stem for p in (ROOT/'content/projects').glob('*.mdx'))
urls = [BASE+p for p in ['/','/about','/projects','/competitions','/contact','/robots.txt','/sitemap.xml','/seo-audit-missing-20261124','/projects/seo-audit-missing-20261124','/about/','/projects/','/favicon.ico']] + ['http://rofiporto.vercel.app/'] + [BASE+'/projects/'+s for s in slugs]
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool: records = list(pool.map(fetch,urls))
(OUT/'http-audit.json').write_text(json.dumps(records,ensure_ascii=False,indent=2),encoding='utf-8')
assets=[]
for p in (ROOT/'public').rglob('*'):
    if not p.is_file(): continue
    a=dict(path=str(p.relative_to(ROOT)).replace('\\','/'),bytes=p.stat().st_size)
    try:
        with Image.open(p) as im: a.update(width=im.width,height=im.height,format=im.format)
    except Exception: pass
    assets.append(a)
(OUT/'assets.json').write_text(json.dumps(sorted(assets,key=lambda a:-a['bytes']),ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'requests':len(records),'errors':[r for r in records if r.get('error')], 'statuses':{str(s):sum(r.get('status')==s for r in records) for s in [200,404,500]},'assets':len(assets),'assetBytes':sum(a['bytes'] for a in assets)},indent=2))
