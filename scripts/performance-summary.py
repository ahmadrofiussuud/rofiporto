"""Summarize real Lighthouse JSON and inventory raster assets without modifying images."""
import json
from pathlib import Path
from PIL import Image

out = Path('docs/seo/evidence')
rows = []
for path in sorted(out.glob('phase5-*-*-*.json')):
    data = json.loads(path.read_text(encoding='utf-8'))
    if 'audits' not in data:
        continue
    audits = data['audits']
    requests = audits['network-requests']['details']['items']
    rows.append(dict(file=path.name, url=data['finalDisplayedUrl'], fetched=data['fetchTime'],
        scores={k: v['score'] * 100 for k, v in data['categories'].items()},
        metrics={k: audits[k].get('numericValue') for k in ['largest-contentful-paint', 'cumulative-layout-shift', 'total-blocking-time', 'first-contentful-paint', 'speed-index', 'total-byte-weight']},
        jsTransferBytes=sum(r.get('transferSize', 0) for r in requests if r.get('resourceType') == 'Script'),
        jsDecodedBytes=sum(r.get('resourceSize', 0) for r in requests if r.get('resourceType') == 'Script'),
        images=[dict(url=r['url'], bytes=r.get('transferSize'), mime=r.get('mimeType')) for r in requests if r.get('resourceType') == 'Image']))
inventory = []
for path in Path('public').rglob('*'):
    if path.is_file():
        try:
            with Image.open(path) as im:
                inventory.append(dict(path=path.as_posix(), bytes=path.stat().st_size, width=im.width, height=im.height, format=im.format))
        except (OSError, ValueError):
            pass
(out / 'phase5-performance-summary.json').write_text(json.dumps(rows, indent=2), encoding='utf-8')
(out / 'phase5-image-inventory.json').write_text(json.dumps(inventory, indent=2), encoding='utf-8')
for row in rows:
    print(row['file'], row['scores'], row['metrics'], 'JS', row['jsTransferBytes'])
print('Raster inventory:', len(inventory), 'files')
