import json
from pathlib import Path
e=Path(__file__).parent/'evidence'
intro='''# Phase 8 — Before/after comparison

24 November 2026. Previous = Phase1 production f34a987. Current = production checkpoint fa08c14. Evidence phase-specific disimpan, bukan ditimpa. Perbandingan lab satu run per konfigurasi tidak membuktikan efek kausal kode atau ranking. Mesin/cache/CDN dan kegiatan host dapat berbeda; baseline Phase1 juga memiliki run yang sempat bersamaan. Run home mobile Phase8 sempat beririsan dengan build lokal; ini batas komparabilitas, bukan disembunyikan.

## Technical, content dan external readiness

| Indikator | Previous | Current | Improvement / evidence | Remaining issue | Verification |
|---|---|---|---|---|---|
| Route/crawlability | 36 halaman200, utama server HTML | Tetap36 halaman200, crawlable | Tidak kehilangan route; phase8-production-smoke791 | Bukan bukti36indexed | Verified HTTP |
| Canonical | Ada36/36; konfigurasi tersebar | Helper production, konsisten sitemap/internal links/meta | Smoke + slash redirect308 | Google canonical hanya sampel akun | Verified HTTP, partial GSC |
| Indexability | Production publik; preview belum pasti | Production indexable, preview build noindex meta/header dan sitemap kosong | phase8-preview-smoke791 | Preview Vercel nyata pending | Verified lokal/production |
| Metadata | Terisi36/36, social tidak merata | Metadata unik dan social semua template | Smoke36 + Phase3 before/after | Snippet dipilih Google | Verified rendered |
| Sitemap/robots | 36 URL dan200 | Tetap36 URL, canonical, no fabricated lastmod | HTTP + GSC Success36 Phase7 | Report freshness Google berbeda | Verified |
| Broken certificate links | Tiga PDF404 | Tautan bukti200, legacy308 satu hop | Smoke redirects/assets | External blocked tidak disimpulkan broken | Verified |
| Apostrophe asset URL | Gagal optimizer lokal ditemukan Phase2 | Dua nama aman dan legacy redirect | Production source/optimizer checks | Tidak ada gagal pada tested variants | Verified |
| Structured data | Homepage ProfilePage/Person, WebSite belum ada | Stable Person/WebSite/UB; about ProfilePage; karya/Breadcrumb sesuai | Entity469, RRT about2valid, SMV0error/warning | Eligibility bukan tampilan pasti | Verified scoped |
| Site name/favicon | Nama situs belum dinyatakan lewat WebSite, ikon bawaan | Nama lengkap, monogram ICO/Apple dan OG1200×630 | Fingerprint hash production sesuai repo | SERP recrawl/choice pending | Verified asset/meta |
| Heading/semantics | Arsip/about ada gap level | H1 satu, hierarki dan landmark diperjelas | Smoke + CUA sampel | Full assistive-tech audit belum | Verified scope |
| Internal linking | Contextual links terbatas | Profil/karya/bukti saling terhubung, BFS36route | Smoke target/fragment/orphan checks | GSC Links masih no data | Verified HTML |
| Image SEO | Ada sizes tidak sesuai/detail tanpa sizes | Responsive sizes sesuai konteks, alt/ratio,73WebP200 | phase8-production-images | Source asli besar sengaja dipertahankan; bukan payload semua page | Verified rendered/source |
| Accessibility | Lighthouse96; kontras/gap modal | Lighthouse96; fokus dialog/Tab/Escape/return dan label diperbaiki | Production interaction checks | Kontras tertentu, screen reader/pixel suite belum | Partial |
| Mobile | Belum regression lengkap pada Phase1 | 6route ×3viewport diuji, tidak overflow | Browser observations | Bukan semua device/route/interaksi | Verified sample |
| Content | Klaim dampak dan kontribusi belum merata | 13MDX diperjelas, sumber/tim/batas hasil | Content11 + actual production | Riset/lessons/fakta tanggal pending | Partial |
| GSC verification | Token ada, data baru belum diperoleh | Token tetap, owner verified | Fingerprint + dashboard Phase7 | Data baru perlu recrawl | Verified |
| GSC performance | Screenshot historis rank4, tanpa dataset sebanding | 2clicks/15impressions/5.1position; coverage7hari sebelum deploy | ZIP28d dan90d UI | Queries/pembanding kosong; tidak mengklaim ranking naik/turun kausal | Actual limited data |
| Google indexing | Belum audit akun baru | Root indexed Phase7, about discoverednotindexed Phase8 | Individual Inspection | Request about quota exceeded, belum queued | Verified scoped |
| Field CWV/INP | Tidak tersedia | Tetap insufficient usage data | GSC/PSI429 tercatat | Tidak mengisi nol/TBT sebagai INP | Unavailable |
| Preview platform/protection | Unknown | Guard kode dan build diuji | Preview791 | URL/protection nyata perlu pemilik | Partial |
| Monitoring/off-page | Belum ada sistem terisi | CSV27kolom9observasi, checklist dan roadmap | Docs16–19/23 | Belum automation atau backlink baru | Template verified |

## Lighthouse: indikator numerik

Nilai di bawah berasal dari JSON asli. Difference hanya arah angka pada run tersebut, bukan signifikansi statistik atau persentase kenaikan SEO. SEO score100 sudah ada di baseline. Semua LCP/CLS di sini lab; p75 field tetap unavailable.

| Page/device | Metric | Previous | Current | Difference on run | Evidence pair | Remaining / verification |
|---|---|---|---|---|---|---|
'''
mapping=[('Home mobile','lighthouse-mobile.json','phase8-home-mobile.json'),('Home desktop','lighthouse-desktop.json','phase8-home-desktop.json'),('Competitions mobile','lighthouse-competitions.json','phase8-competitions-mobile.json')]
rows=[]
for label,old,new in mapping:
    before=json.loads((e/old).read_text(encoding='utf-8'));after=json.loads((e/new).read_text(encoding='utf-8'))
    metrics=[]
    for category in ['performance','seo','accessibility','best-practices']:
        metrics.append((category,before['categories'][category]['score']*100,after['categories'][category]['score']*100,'score'))
    for key,unit,scale in [('largest-contentful-paint','s',1000),('first-contentful-paint','s',1000),('speed-index','s',1000),('total-blocking-time','ms',1),('cumulative-layout-shift','',1),('total-byte-weight','bytes',1)]:
        metrics.append((key,before['audits'][key]['numericValue']/scale,after['audits'][key]['numericValue']/scale,unit))
    for metric,b,a,unit in metrics:
        direction='Sama' if abs(a-b)<.0001 else ('Lebih besar' if a>b else 'Lebih kecil')
        fmt=lambda v: str(round(v)) if unit in ['score','bytes'] else f'{v:.3f}'
        rows.append(f'| {label} | {metric} | {fmt(b)} {unit} | {fmt(a)} {unit} | {direction} | {old} → {new} | Lab verified; bukan ranking/field |')
text=intro+'\n'.join(rows)+'''

## Remaining performance interpretation

Pencapaian mobile run utama: performance85 vs baseline90, TBT349ms vs170ms, LCP3.19s vs sekitar3.2s. Penghematan transfer tidak otomatis memperbaiki blocking. Run ulang terpisah disimpan, bukan mengganti angka utama: performance92, TBT291ms, LCP2.43s (`phase8-competitions-mobile-repeat.json`). Target LCP tercapai pada repeat, belum konsisten; TBT masih di atas baseline pada dua run. SEO-06 tetap terbuka untuk profiling, bukan dinyatakan selesai karena salah satu skor lebih tinggi.

Beranda tidak mengalami peningkatan skor performance mobile (98 tetap98); desktop100 tetap100, SEO100 tetap100. CLS tetap0 pada semua pasangan. Tidak ada angka gabungan “SEO meningkat X%”. Perubahan branding/schema dan content technical readiness tidak sama dengan organic uplift. GSC pascadeploy dan field CWV belum cukup untuk mengukur dampaknya.
'''
Path('docs/seo/21-before-after-comparison.md').write_text(text,encoding='utf-8')
