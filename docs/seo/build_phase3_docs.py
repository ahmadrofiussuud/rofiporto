"""Build Phase 3 documentation from captured rendered metadata."""
import json
from pathlib import Path

D=Path('docs/seo')
before=json.loads((D/'evidence/phase3-before.json').read_text(encoding='utf-8'))
after=json.loads((D/'evidence/phase3-after.json').read_text(encoding='utf-8'))
old={p['route']:p for p in before['pages']}
keywords='''# Phase 3 — Keyword mapping

24 November 2026. Semua keyword berikut **hipotesis relevansi**, bukan keyword dengan volume pencarian atau performa GSC terverifikasi. Tidak ada export GSC baru dalam repository atau diberikan pemilik pada phase ini. Bukti ranking ke-4 sebelumnya adalah screenshot historis untuk query nama tertentu.

## Strategi dan intent

| Kelompok | Keyword hipotesis | Intent | Landing page |
| --- | --- | --- | --- |
| Nama lengkap | Muhammad Ahmad Rofi'us Su'ud; Muhammad Ahmad Rofi’us Su’ud | Menemukan identitas dan portofolio resmi | / |
| Variasi benar | Rofi'us Su'ud; Rofi’us Su’ud; Rofi; MARS sebagai inisial yang sudah dipakai | Navigational, perlu konteks karena nama pendek ambigu | / dan /about |
| Personal branding / kampus | Muhammad Ahmad Rofi'us Su'ud FILKOM UB; Rofi Universitas Brawijaya; Pendidikan Teknologi Informasi | Memahami profil, latar pendidikan dan pengalaman | /about |
| Product management | Rofi product management; Product Manager BCC; Product Manager website EM UB | Memahami peran dan contoh kontribusi | /about, /projects/bcc-pm, /projects/website-em-ub |
| Digital product development | karya digital Rofi; portofolio pengembangan produk digital; nama produk spesifik | Menilai karya, fitur dan konteks pengembangan | /projects dan detail proyek |
| Prestasi / pengalaman | prestasi Rofi FILKOM UB; mentor MCC 180DC UB; Brand Ambassador HOLOGY | Menemukan catatan prestasi dan dokumentasi | /competitions, fragment speaking/ambassadors |
| Organisasi | Rofi EM UB; Ketua Futsal BIOS; Ketua Pelaksana Filkom League | Memahami tanggung jawab organisasi yang sudah disebutkan pemilik/repository | /about dan detail organisasi |
| Kontak | kontak Muhammad Ahmad Rofi'us Su'ud; kolaborasi Rofi | Menghubungi pemilik | /contact |

Tidak membuat landing page terpisah untuk variasi apostrof atau nama. Root menjadi halaman utama nama lengkap, about memperjelas konteks universitas. Nama pendek tidak diberi klaim volume/persaingan. Keyword kompetisi/tahun yang masih perlu konfirmasi tidak dipromosikan sebagai klaim baru.

## Pemetaan seluruh URL

Status H pada setiap baris berarti hipotesis, volume belum diukur. Sumber relevansi adalah konten terlihat, metadata MDX, dan arahan pemilik. Keberadaan sertifikat/gambar tidak berarti audit telah memverifikasi keaslian atau penerbit secara independen.

| URL | Fokus primer | Pendukung | Intent | Status |
| --- | --- | --- | --- | --- |
| / | Muhammad Ahmad Rofi'us Su'ud | portofolio resmi, FILKOM Universitas Brawijaya | Identitas | H |
| /about | profil Muhammad Ahmad Rofi'us Su'ud | Pendidikan Teknologi Informasi, product management, EM UB, BCC | Profil dan pengalaman | H |
| /projects | karya digital Rofi | pengalaman organisasi, kolaborasi akademik | Evaluasi portofolio | H |
| /competitions | prestasi dan pengalaman berbagi Rofi | mentoring, pemateri, brand ambassador | Dokumentasi kredibilitas | H |
| /contact | kontak Muhammad Ahmad Rofi'us Su'ud | diskusi produk dan kolaborasi | Kontak | H |
'''
for p in after['content']:
    category=p['category']
    focus=p.get('seoTitle') or p['title']
    support=', '.join(p.get('tags',[])[:3])
    intent='Pengalaman organisasi' if category=='organisasi' else 'Dokumentasi sertifikasi' if category=='skill' else 'Kolaborasi akademik' if category=='akademik' else 'Gambaran karya dan kontribusi'
    keywords+=f"| /projects/{p['slug']} | {focus} | {support} | {intent} | H |\n"
keywords+='''
## Validasi hipotesis berikutnya

Minta GSC Search results 28 hari dan 3 bulan dengan dimensi query/page/device/country dan clicks, impressions, CTR, average position. Kelompokkan variasi nama tanpa menjumlahkan baris yang sudah teragregasi ganda. Bandingkan rentang sebanding dan anotasi tanggal deployment yang sebenarnya. Konfirmasi Google-selected canonical lewat URL Inspection. Update status H hanya bila ada bukti data, bukan karena title sudah diubah.

## Bukti dan acuan

- Snapshot metadata yang benar-benar dirender sebelum/sesudah tersedia di evidence/phase3-before.json dan phase3-after.json.
- Google menganjurkan judul deskriptif dan ringkas, description yang merangkum isi, serta anchor dengan href yang dapat dirayapi. Tidak ada jaminan Google memakai title/snippet persis seperti metadata.
- [Google title links](https://developers.google.com/search/docs/appearance/title-link)
- [Google snippets](https://developers.google.com/search/docs/appearance/snippet)
- [Google crawlable links](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)
'''
(D/'06-keyword-mapping.md').write_text(keywords,encoding='utf-8')

title_changes=sum(p['title']!=old[p['route']]['title'] for p in after['pages'])
desc_changes=sum(p['description']!=old[p['route']]['description'] for p in after['pages'])
report=f'''# Phase 3 — On-page dan semantic implementation

24 November 2026. Basis perbandingan adalah build lokal Phase 2 versus build lokal Phase 3, bukan perbandingan production sebelum/sesudah deployment. GSC terbaru belum tersedia. Keyword mapping seluruh 36 URL berstatus hipotesis di 06-keyword-mapping.md.

## Perubahan aktual

- Meninjau seluruh 36 halaman, memperbarui {title_changes} title dan {desc_changes} description. Title yang sudah spesifik tetap dipertahankan. Semua title/description unik berdasarkan hasil rendered HTML.
- Homepage mempertahankan nama lengkap sebagai title/H1. Teks pengantar menghubungkan pemilik dengan Pendidikan Teknologi Informasi FILKOM Universitas Brawijaya. OG/Twitter description diselaraskan dengan meta description.
- About, arsip karya, pencapaian dan kontak memiliki H1 bertopik jelas. Struktur about dan kontak memakai H2 untuk subbagian; kartu arsip memakai H2, kartu homepage tetap H3 di bawah H2 section.
- Property seoTitle opsional memisahkan judul pencarian deskriptif dari judul kartu/proyek yang sudah dikenal. Description seluruh 31 MDX diperjelas berdasarkan materi yang sudah ada; sertifikasi berbahasa Indonesia pada metadata dan heading bagian.
- About memakai figure/figcaption untuk foto, kontak section berlabel, dan footer detail memakai nav berlabel. Tidak membungkus ulang semua elemen hanya demi menambah tag semantik.
- Lima belas proyek diberi paragraf tautan kontekstual. Tiga halaman EM UB menjelaskan perbedaan konteks peran organisasi dan produk lewat tautan silang; tidak menghapus/menggabungkan URL.
- Seluruh 31 detail memiliki tautan profil pemilik. About menghubungkan langsung case study EM UB dan BCC. Karya/pencapaian saling terhubung. Link demo/kode mendapat accessible name khusus dan rel yang sesuai.
- Filter pencapaian memiliki aria-pressed; thumbnail sertifikat memakai button berlabel. Modal mendapat dialog semantics, judul terhubung, fokus awal, trap Tab/Shift+Tab, Escape, return focus dan scroll lock.
- Token muted text light theme digelapkan sedikit (46,9% → 45% lightness) untuk mengatasi kontras teks proses. Warna brand, layout, font, cover dan animasi desain dipertahankan.

## Halaman yang diperbaiki

Kelima halaman utama diubah sesuai daftar di atas. Seluruh 31 detail di tabel metadata berikut mendapat description, navigasi profil, dan metadata social yang mengikuti template. Paragraf kontekstual ditambahkan pada website-em-ub, emub-2026, em-ub-web-2026, bcc-pm, bcc-website, bios-2025, bios-2026, filkom-league-2026, tehmbois-wcc, pelatihan-ar-sdn-3-dono, kelasin, jaspel-rsud-moh-saleh, cert-java, cert-pbo, cert-pm.

Sitemap masih 36 URL. Tidak ada halaman keyword nama tambahan. Publikasi formal belum didokumentasikan dengan URL penerbit/DOI yang terverifikasi; PHIC diperlakukan sebagai pengalaman kompetisi sesuai data yang ada.

## Metadata sebelum dan sesudah

Tabel bersumber dari HTML build, bukan string yang diasumsikan dari kode. Description yang panjang tidak otomatis salah; tidak menerapkan batas karakter sebagai aturan ranking. OG/Twitter sesudah mengikuti title/description ini, dengan cover proyek yang sudah ada atau foto profil fallback.

| URL | Title sebelum | Title sesudah | Description sebelum | Description sesudah |
| --- | --- | --- | --- | --- |
'''
def cell(s): return (s or '').replace('|','\\|').replace('\n',' ')
for p in after['pages']:
    b=old[p['route']]
    report+='| '+' | '.join(cell(v) for v in [p['route'],b['title'],p['title'],b['description'],p['description']])+' |\n'
report+='''
## Ilustrasi hasil pencarian

Berikut simulasi teks, bukan tangkapan hasil Google atau jaminan judul/snippet/posisi. Google dapat menulis ulang, memotong, atau memilih cuplikan berbeda sesuai query/perangkat.

'''
for route in ['/','/about','/projects/gestory']:
    p=next(x for x in after['pages'] if x['route']==route)
    report+=f"> rofiporto.vercel.app{route if route!='/' else ''}\n>\n> **{p['title']}**\n>\n> {p['description']}\n\n"
report+='''
## Internal linking dan orphan pages

Regression test mengekstrak anchor dari seluruh HTML dan menjalankan traversal dari beranda. Hasil final **tidak ada orphan page** pada 36 route publik. Graph dan daftar orphanPages tersimpan di evidence/phase3-smoke.json. Sebelum optimasi seluruh detail sudah tersedia melalui arsip; perubahan ini memperbaiki konteks tautan, bukan mengklaim menemukan orphan yang tidak ada. Metadata snapshot menyimpan link sebelum/sesudah untuk review.

## Konfirmasi konten oleh pemilik

| Konten | Konfirmasi yang diperlukan | Perlakuan Phase 3 |
| --- | --- | --- |
| Tahun YPS | Data tampilan Agu 2024 versus sertifikat bertahun 2026 yang pernah diberikan | Tahun tidak diubah otomatis |
| Mawapres FILKOM 2027 | Tahun acara/cohort versus tanggal penetapan prestasi | Mempertahankan label dokumen |
| IPB/LDC 6/IDF | Kesesuaian nama event pada title, description dan sertifikat | Tidak membuat nama kompetisi baru |
| Website EM UB | Sumber angka lebih dari 60.000, definisi audience/pengguna, workflow Agile dan pembagian kontribusi tim | Tidak memperbesar atau memasukkan angka ke metadata baru |
| Bagian Dampak proyek lama | Bukti peningkatan penjualan/engagement/kinerja atau apakah masih tujuan produk | Metadata memakai fungsi produk dan peran yang sudah disebut, bukan klaim hasil baru |
| Proyek baru tanpa role/date | Peran, tahun, tim, status konsep/prototipe/implementasi dan bukti kontribusi | Tidak mengisi role/date/hasil baru |
| CEKAT/SobatAman/NgajiKidz | Batas fitur yang benar-benar berfungsi dan verifikasi klinis/pendamping/sertifikasi pembimbing bila diklaim | Metadata memakai konsep/gambaran; tidak menambah klaim keandalan |
| Publikasi | Judul, daftar penulis, penerbit/DOI dan URL publik jika memang ada | Belum membuat publikasi formal atau klaim terbit |
| Profil akademik/sameAs | Konfirmasi kepemilikan akun dan URL profil kampus jika tersedia | Tidak menambahkan URL dugaan |

Proyek dengan role belum tersedia pada frontmatter saat snapshot akhir:

'''
for p in after['content']:
    if not p.get('role'): report+=f"- {p['slug']} — {p['title']}\n"
report+='''
## Pengujian dan batasan

- npm run build mode production lulus, lima halaman utama statis dan 31 proyek SSG. Log evidence/phase3-build.log.
- npm run lint lulus (exit 0). npm run typecheck lulus (exit 0). Log phase3-lint.log dan phase3-typecheck.log.
- Regression HTTP lulus **36 halaman / 789 pemeriksaan**, termasuk semua pemeriksaan Phase 2, uniqueness metadata, description social konsisten, heading tanpa lompatan dan traversal link. Evidence phase3-smoke.json.
- Lighthouse lokal 12.8.2 mobile untuk accessibility/SEO berjalan. Accessibility 96, SEO 100. Kegagalan kontras yang tersisa hanya tiga angka dekoratif .work-number ber-aria-hidden (1,93:1). Teks proses yang sebelumnya gagal tidak lagi masuk daftar kegagalan. Tidak mengklaim aksesibilitas menyeluruh selesai atau seluruh tema telah divalidasi.
- Pemeriksaan browser Phase 3 belum berjalan. Automatic approval review menolak eksekusi karena batas penggunaan layanan, bukan keputusan bahwa pengujian tidak aman. Akibatnya pemeriksaan visual mobile/desktop, Tab trap, return-focus dan Escape pada modal baru belum terverifikasi manual. Implementasi tersebut lulus build/types dan masih membutuhkan regression browser sebelum dianggap tervalidasi penuh.
- Tidak ada klaim peningkatan ranking, CTR, volume keyword, field CWV, atau skor performance baru dari fase ini. Tidak menjalankan pengujian screen reader.
- Diagnostic NoFallbackError pada negative URL test Next 16.1.6 tetap merupakan batasan dari Phase 2; status 404/noindex lulus.
- Deployment preview Vercel dan data akun eksternal masih pending. Guard preview dari Phase 2 dipertahankan; phase ini menguji build production lokal.

## Referensi

- [Google title links](https://developers.google.com/search/docs/appearance/title-link)
- [Google snippets](https://developers.google.com/search/docs/appearance/snippet)
- [Google link best practices](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)

Tabel metadata, hipotesis keyword dan daftar konfirmasi merupakan deliverable Phase 3. Otorisasi push setelah Phase 3 diberikan pengguna pada pesan lanjutan; hasil push dicatat di implementation log setelah benar-benar berhasil.
'''
(D/'07-on-page-implementation.md').write_text(report,encoding='utf-8')
print(f'Docs generated: {len(after["pages"])} URLs, {title_changes} titles changed, {desc_changes} descriptions changed.')
