"""Create documentation tables from measured Phase 1 evidence only."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
DOC = ROOT/'docs/seo'
E = DOC/'evidence'
rows = json.loads((E/'http-audit.json').read_text(encoding='utf-8'))
pages = [r for r in rows if r.get('status') == 200 and r.get('title') and r['url'] == r['finalUrl'] and not r['url'].endswith('/about/') and not r['url'].endswith('/projects/') and r['url'].startswith('https:')]
assets=json.loads((E/'assets.json').read_text(encoding='utf-8'))

text = '''# Phase 1 — Baseline metrics

Tanggal 24 November 2026 (Asia/Jakarta). Repository HEAD f34a987. Semua nilai di bawah diambil pada audit ini kecuali yang secara eksplisit ditandai historis/pending. Tidak ada perubahan production.

## Lighthouse lab

Lighthouse CLI 12.8.2, Chrome headless lokal. Satu run per URL/config, cache browser direset oleh Lighthouse. Mobile memakai simulated throttling RTT 150 ms, throughput 1638,4 Kbps, CPU slowdown 4×, viewport 412×823. Desktop memakai preset desktop. Ini baseline indikatif, bukan median multi-run atau field data. Dua run lanjutan desktop/pencapaian sempat berjalan bersamaan sehingga noise host dapat memengaruhi hasil. File JSON mencatat waktu, environment, config dan setiap audit.

| URL / form factor | Performance | Accessibility | Best Practices | SEO | FCP | LCP | TBT | CLS | Transfer total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
'''
for filename,label in [('lighthouse-mobile.json','/ mobile'),('lighthouse-desktop.json','/ desktop'),('lighthouse-competitions.json','/competitions mobile')]:
    d=json.loads((E/filename).read_text(encoding='utf-8'))
    scores=[str(round(d['categories'][k]['score']*100)) for k in ['performance','accessibility','best-practices','seo']]
    values=[d['audits'][k].get('displayValue','N/A').replace('\xa0',' ') for k in ['first-contentful-paint','largest-contentful-paint','total-blocking-time','cumulative-layout-shift']]
    diag=d['audits']['diagnostics']['details']['items'][0]
    text+='| '+ ' | '.join([label]+scores+values+[f"{diag['totalByteWeight']:,} byte"])+' |\n'
text+='''
INP tidak diukur oleh navigation Lighthouse. TBT bukan pengganti nilai INP aktual. LCP/CLS di tabel adalah lab. Field p75 LCP, INP, CLS, CWV pass rate dan periode CrUX masih **belum tersedia** karena request PSI API mendapat 429. Jangan mengisi dengan nol. Lighthouse SEO 100 hanya cakupan pemeriksaan otomatis, bukan skor keseluruhan audit, prediksi ranking, atau validasi fakta/schema eksternal.

## HTTP dan indeks

| Metrik | Nilai / status |
| --- | --- |
| Request initial HTTP | 44, tidak ada network error |
| Konten canonical dalam sitemap | 36 (5 statis + 31 proyek), semuanya HTTP 200 |
| Respons final initial audit | 42×200, 2×404, 0×500 |
| URL uji missing | Root path dan slug proyek, keduanya 404 + noindex |
| Sitemap / robots / favicon | HTTP 200 |
| Canonical seluruh konten | Tersedia pada 36/36 |
| H1 seluruh konten | Satu pada 36/36 |
| Title/deskripsi | Tersedia pada 36/36 |
| JSON-LD beranda | Satu ProfilePage dengan mainEntity Person; JSON parse sukses |
| WebSite | Tidak ditemukan di homepage |
| Link/resource audit | 126 URL, hasil lengkap di evidence; 403 EM UB dan 999 LinkedIn dibatasi bot |
| Jumlah halaman indexed saat ini | Belum tersedia dari GSC |
| Clicks / impressions / CTR / average position | Belum tersedia dari GSC |
| Peringkat nama lengkap | Posisi 4 pada screenshot pengguna 23 November; historis, bukan pengukuran independen |
| Sitemap GSC | Success dengan 35 URL pada pemeriksaan percakapan sebelumnya; historis. XML audit saat ini 36 URL |

## Inventaris per halaman

Panjang karakter termasuk spasi, bukan estimasi pixel SERP. Description panjang/pendek tidak otomatis salah. Semua detail meta/header/image/link disimpan pada http-audit.json. Tabel title tidak memasukkan URL variasi redirect dan 404.

| Route | Status | Title | Karakter title | Karakter description | H1 | Canonical |
| --- | --- | --- | --- | --- | --- | --- |
'''
for p in pages:
    desc=next((m.get('content','') for m in p['meta'] if m.get('name')=='description'),'')
    canonical=next((l.get('href','') for l in p['links'] if l.get('rel')=='canonical'),'')
    route=p['url'].replace('https://rofiporto.vercel.app','') or '/'
    text+=f"| {route} | {p['status']} | {p['title']} | {len(p['title'])} | {len(desc)} | {sum(h[0]=='h1' for h in p['headings'])} | {canonical} |\n"
text+='''
## Aset dan payload

Total sumber public 107 file, 108.182.470 byte (sekitar 103,17 MiB). Ini storage sumber, bukan transfer halaman. Inventaris 107 file beserta dimensi/format ada di assets.json. next/image menyediakan varian optimizer yang berbeda dari file asli.

| Aset sumber terbesar | Byte | Dimensi | Format |
| --- | --- | --- | --- |
'''
for a in assets[:12]: text+=f"| {a['path']} | {a['bytes']:,} | {a.get('width','—')}×{a.get('height','—')} | {a.get('format','—')} |\n"
text+='''
## JavaScript, font, cache dan render blocking

| Run | Requests | Scripts | CSS | Fonts | Main document transfer | Total task time |
| --- | --- | --- | --- | --- | --- | --- |
'''
for filename in ['lighthouse-mobile.json','lighthouse-desktop.json','lighthouse-competitions.json']:
    d=json.loads((E/filename).read_text(encoding='utf-8')); x=d['audits']['diagnostics']['details']['items'][0]
    text+='| '+' | '.join(str(v) for v in [filename,x['numRequests'],x['numScripts'],x['numStylesheets'],x['numFonts'],x['mainDocumentTransferSize'],round(x['totalTaskTime'],2)])+' |\n'
text+='''
Total request/script dapat mencakup prefetch yang dipicu viewport. Ini network per run, bukan ukuran seluruh dependency terpasang. Daftar bundle dan byte transfer per URL ada di link-resource-audit.json; Lighthouse network-requests menyimpan network run sebenarnya. Production JS/CSS berhash mengirim Cache-Control public,max-age=31536000,immutable. HTML beranda must-revalidate dengan X-Vercel-Cache HIT dan prerender header. next/font menyajikan Geist/Geist Mono; font requests teramati dua pada setiap run.

Beranda lab tidak memiliki console error. Responsive/mobile layout penuh, keyboard navigation, modal interaction, semua route hydration, dark theme, visual social preview dan preview deployment tetap memerlukan pemeriksaan lanjutan. Build/analyzer tidak dijalankan pada phase ini.

## Cara reproduksi dan integritas

- `python docs/seo/collect_phase1.py` membaca HTTP/asset inventory dengan Python + Pillow yang tersedia.
- `python docs/seo/collect_links.py` membaca link/resource; beberapa layanan menolak bot. Regex kandidat source asset dapat menghasilkan false positive pada apostrof, dan tidak dipakai sebagai bug tanpa verifikasi.
- `npx --yes lighthouse@12.8.2 https://rofiporto.vercel.app/ --chrome-flags="--headless --no-sandbox" --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=docs/seo/evidence/lighthouse-mobile.json --quiet`.
- Desktop menambahkan `--preset=desktop`; pencapaian mengganti URL dan output path. CHROME_PATH diarahkan ke Chrome lokal.
- HTTP audit mengekstrak HTML dengan HTMLParser; line break h1 dapat tergabung pada teks hasil ekstraksi meski visual tetap terpisah. Hasil binary favicon pada body HTTP tidak dipakai untuk menilai encoding. Verifikasi byte UTF-8 terpisah pada beranda menunjukkan nama dan title benar tanpa replacement character.
- GET internal dan status link bukan bukti semua URL terindeks. JSON parse bukan hasil Rich Results Test. Tidak ada benchmark sebelum/sesudah karena belum ada perubahan implementasi.
'''
(DOC/'03-baseline-metrics.md').write_text(text,encoding='utf-8')
# Avoid preserving third-party session cookies in audit documentation.
for filename in ['http-audit.json','link-resource-audit.json']:
    data=json.loads((E/filename).read_text(encoding='utf-8'))
    for row in data:
        row['headers']={k:v for k,v in row.get('headers',{}).items() if k.lower() != 'set-cookie'}
    (E/filename).write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
print('Baseline documentation written from evidence.')
