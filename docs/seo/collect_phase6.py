"""Read-only snapshots and a content inventory; never modifies external profiles."""
import json, re, urllib.request, urllib.error
from pathlib import Path
from collections import Counter
from html.parser import HTMLParser

out=Path('docs/seo/evidence'); rows=[]
for p in sorted(Path('content/projects').glob('*.mdx')):
    s=p.read_text(encoding='utf-8'); front,body=s.split('---',2)[1:]
    def field(k):
        m=re.search(r'^'+k+r':\s*"([^"]*)"',front,re.M)
        return m[1] if m else ''
    rows.append(dict(slug=p.stem,title=field('title'),category=field('category'),role=field('role'),date=field('date'),words=len(body.split()),headings=re.findall(r'^## (.+)',body,re.M),links=re.findall(r'\]\(([^)]+)\)',body)))
(out/'phase6-content-inventory.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2),encoding='utf-8')
snapshots=[]
for url in ['https://rofiporto.vercel.app/','https://github.com/ahmadrofiussuud']:
    try:
        r=urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'}),timeout=30)
        html=r.read().decode('utf-8')
        snapshots.append(dict(url=url,status=r.status,lang=re.findall(r'<html[^>]*lang="([^"]*)',html),title=re.findall(r'<title>(.*?)</title>',html,re.S),hasWebsiteSchema='"@type":"WebSite"' in html,hasEnglishBio='undergraduate' in html,hasPortfolioLink='https://rofiporto.vercel.app' in html,hasIndonesianPortfolioDescription='Portofolio resmi' in html))
    except (urllib.error.URLError,TimeoutError) as e:
        snapshots.append(dict(url=url,error=str(e)))
(out/'phase6-live-observations.json').write_text(json.dumps(snapshots,ensure_ascii=False,indent=2),encoding='utf-8')
print('Projects',len(rows),'categories',dict(Counter(r['category'] for r in rows)))
print(json.dumps(snapshots,ensure_ascii=False))
