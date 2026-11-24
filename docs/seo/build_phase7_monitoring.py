"""Create a CSV monitoring template seeded only with observed GSC data."""
import csv, json
from pathlib import Path

root=Path(__file__).parent
fields=['date','period_label','period_start','period_end','coverage_start','coverage_end','source','environment','grain','query','query_class','landing_page','device','country','impressions','clicks','ctr_percent','average_position','indexing_status','lcp_p75_ms','inp_p75_ms','cls_p75','cwv_status','website_changes','findings','next_action','evidence']
common=dict(date='2026-11-24',coverage_start='2026-11-16',coverage_end='2026-11-22',source='GSC CSV',environment='production Phase 3',period_label='Last 28 days selected; available chart 7 days',query_class='unavailable',cwv_status='Insufficient usage data',website_changes='Phase 4-6 local; not deployed',evidence='docs/seo/evidence/phase7-gsc-28days.zip')
rows=[dict(common,grain='property',clicks=2,impressions=15,ctr_percent=13.33,average_position=5.1,findings='Queries export has headers only; comparison unavailable',next_action='Collect comparable future periods; do not infer query mix')]
for r in csv.DictReader((root/'evidence/phase7-gsc-28days/Pages.csv').open(encoding='utf-8-sig',newline='')):
    url=r['Top pages']
    rows.append(dict(common,grain='page',landing_page=url,clicks=r['Clicks'],impressions=r['Impressions'],ctr_percent=r['CTR'].rstrip('%'),average_position=r['Position'],indexing_status='URL is on Google (inspection 2026-11-24)' if url=='https://rofiporto.vercel.app/' else '',findings='Page aggregation differs from property aggregation',next_action='Review URL Inspection after approved deployment'))
for r in csv.DictReader((root/'evidence/phase7-gsc-28days/Devices.csv').open(encoding='utf-8-sig',newline='')):
    rows.append(dict(common,grain='device',device=r['Device'],clicks=r['Clicks'],impressions=r['Impressions'],ctr_percent=r['CTR'].rstrip('%'),average_position=r['Position'],findings='Very small sample; not evidence of UX superiority',next_action='Continue mobile and desktop testing'))
for r in csv.DictReader((root/'evidence/phase7-gsc-28days/Countries.csv').open(encoding='utf-8-sig',newline='')):
    rows.append(dict(common,grain='country',country=r['Country'],clicks=r['Clicks'],impressions=r['Impressions'],ctr_percent=r['CTR'].rstrip('%'),average_position=r['Position'],findings='Only country in available export',next_action='Keep country filters consistent when comparing'))
rows.append(dict(common,grain='property',source='GSC browser UI; not separate CSV export',period_label='Custom 90 days',period_start='2026-08-25',period_end='2026-11-22',clicks=2,impressions=15,ctr_percent=13.3,average_position=5.1,findings='90-day window contains only 7 days of available chart',next_action='Export 90-day and comparable history when available',evidence='docs/seo/evidence/phase7-dashboard-observations.json'))
with (root/'19-monitoring-template.csv').open('w',encoding='utf-8',newline='') as f:
    writer=csv.DictWriter(f,fieldnames=fields);writer.writeheader();writer.writerows(rows)
with (root/'19-monitoring-template.csv').open(encoding='utf-8',newline='') as f:
    validated=list(csv.DictReader(f))
    assert len(validated)==9
    assert all(r['inp_p75_ms']=='' and r['lcp_p75_ms']=='' and r['cls_p75']=='' for r in validated)
    assert all(None not in r for r in validated)
print('Monitoring CSV: 9 actual observations, 27 consistent columns; unknown field metrics remain blank')
summary=json.loads((root/'evidence/phase7-lighthouse-summary.json').read_text())
table=['\n## Lighthouse production aktual — 24 November 2026\n','| Device | Performance | SEO | Accessibility | Best Practices | LCP s | FCP s | Speed Index s | TBT ms | CLS | Page KiB |','|---|---|---|---|---|---|---|---|---|---|---|']
for row in summary:
    s=row['scores'];m=row['metrics'];device='Mobile' if 'mobile' in row['file'] else 'Desktop'
    table.append(f"| {device} | {s['performance']:.0f} | {s['seo']:.0f} | {s['accessibility']:.0f} | {s['best-practices']:.0f} | {m['largest-contentful-paint']/1000:.2f} | {m['first-contentful-paint']/1000:.2f} | {m['speed-index']/1000:.2f} | {m['total-blocking-time']:.1f} | {m['cumulative-layout-shift']:.3f} | {m['total-byte-weight']/1024:.1f} |")
table.append('\nURL: https://rofiporto.vercel.app/ . Run terpisah berurutan, tidak bersamaan dengan pengujian CUA. Raw phase7-production-mobile.json dan phase7-production-desktop.json. Hasil ini production Phase 3, bukan hasil deployment Phase 4–6 atau bukti peningkatan kausal terhadap Phase 5 lokal. Tidak memasukkan metrik lab ini ke kolom p75 field pada CSV.\n')
p=root/'16-external-tools-guide.md';text=p.read_text(encoding='utf-8'); marker='\n## Lighthouse production aktual'
p.write_text(text.split(marker)[0]+'\n'.join(table),encoding='utf-8')
