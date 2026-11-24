# Phase 1 — Baseline metrics

Tanggal 24 November 2026 (Asia/Jakarta). Repository HEAD f34a987. Semua nilai di bawah diambil pada audit ini kecuali yang secara eksplisit ditandai historis/pending. Tidak ada perubahan production.

## Lighthouse lab

Lighthouse CLI 12.8.2, Chrome headless lokal. Satu run per URL/config, cache browser direset oleh Lighthouse. Mobile memakai simulated throttling RTT 150 ms, throughput 1638,4 Kbps, CPU slowdown 4×, viewport 412×823. Desktop memakai preset desktop. Ini baseline indikatif, bukan median multi-run atau field data. Dua run lanjutan desktop/pencapaian sempat berjalan bersamaan sehingga noise host dapat memengaruhi hasil. File JSON mencatat waktu, environment, config dan setiap audit.

| URL / form factor | Performance | Accessibility | Best Practices | SEO | FCP | LCP | TBT | CLS | Transfer total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| / mobile | 98 | 96 | 100 | 100 | 1.2 s | 2.3 s | 20 ms | 0 | 389,839 byte |
| / desktop | 100 | 96 | 100 | 100 | 0.3 s | 0.5 s | 0 ms | 0 | 468,735 byte |
| /competitions mobile | 90 | 96 | 100 | 100 | 1.7 s | 3.2 s | 170 ms | 0 | 635,065 byte |

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
| Lampiran internal | Tiga link PDF sertifikasi diperiksa terpisah, semuanya 404; evidence/internal-attachments.json |
| Link/resource audit | 126 URL, hasil lengkap di evidence; 403 EM UB dan 999 LinkedIn dibatasi bot |
| Jumlah halaman indexed saat ini | Belum tersedia dari GSC |
| Clicks / impressions / CTR / average position | Belum tersedia dari GSC |
| Peringkat nama lengkap | Posisi 4 pada screenshot pengguna 23 November; historis, bukan pengukuran independen |
| Sitemap GSC | Success dengan 35 URL pada pemeriksaan percakapan sebelumnya; historis. XML audit saat ini 36 URL |

## Inventaris per halaman

Panjang karakter termasuk spasi, bukan estimasi pixel SERP. Description panjang/pendek tidak otomatis salah. Semua detail meta/header/image/link disimpan pada http-audit.json. Tabel title tidak memasukkan URL variasi redirect dan 404.

| Route | Status | Title | Karakter title | Karakter description | H1 | Canonical |
| --- | --- | --- | --- | --- | --- | --- |
| / | 200 | Muhammad Ahmad Rofi’us Su’ud — Portofolio Resmi | 47 | 152 | 1 | https://rofiporto.vercel.app |
| /about | 200 | Tentang — Muhammad Ahmad Rofi’us Su’ud | 38 | 115 | 1 | https://rofiporto.vercel.app/about |
| /projects | 200 | Karya — Muhammad Ahmad Rofi’us Su’ud | 36 | 83 | 1 | https://rofiporto.vercel.app/projects |
| /competitions | 200 | Pencapaian — Muhammad Ahmad Rofi’us Su’ud | 41 | 88 | 1 | https://rofiporto.vercel.app/competitions |
| /contact | 200 | Kontak — Muhammad Ahmad Rofi’us Su’ud | 37 | 82 | 1 | https://rofiporto.vercel.app/contact |
| /projects/akademirofi | 200 | Akademirofi — Platform Belajar BMC, BPC, dan Essay — Muhammad Ahmad Rofi’us Su’ud | 81 | 153 | 1 | https://rofiporto.vercel.app/projects/akademirofi |
| /projects/amora | 200 | Amora — Muhammad Ahmad Rofi’us Su’ud | 36 | 113 | 1 | https://rofiporto.vercel.app/projects/amora |
| /projects/arah-career | 200 | ARAH — Platform Eksplorasi Karier — Muhammad Ahmad Rofi’us Su’ud | 64 | 132 | 1 | https://rofiporto.vercel.app/projects/arah-career |
| /projects/bcc-pm | 200 | Product Manager BCC — Muhammad Ahmad Rofi’us Su’ud | 50 | 153 | 1 | https://rofiporto.vercel.app/projects/bcc-pm |
| /projects/bcc-website | 200 | Website Resmi BCC (Basic Computing Community) — Muhammad Ahmad Rofi’us Su’ud | 76 | 161 | 1 | https://rofiporto.vercel.app/projects/bcc-website |
| /projects/bios-2025 | 200 | Bendahara Futsal BIOS — Muhammad Ahmad Rofi’us Su’ud | 52 | 126 | 1 | https://rofiporto.vercel.app/projects/bios-2025 |
| /projects/bios-2026 | 200 | Ketua Futsal BIOS — Muhammad Ahmad Rofi’us Su’ud | 48 | 122 | 1 | https://rofiporto.vercel.app/projects/bios-2026 |
| /projects/cekat | 200 | CEKAT — Platform Kesehatan Digital — Muhammad Ahmad Rofi’us Su’ud | 65 | 175 | 1 | https://rofiporto.vercel.app/projects/cekat |
| /projects/cert-java | 200 | Java Fundamental Certificate — Muhammad Ahmad Rofi’us Su’ud | 59 | 51 | 1 | https://rofiporto.vercel.app/projects/cert-java |
| /projects/cert-pbo | 200 | Sertifikasi PBO — Muhammad Ahmad Rofi’us Su’ud | 46 | 67 | 1 | https://rofiporto.vercel.app/projects/cert-pbo |
| /projects/cert-pm | 200 | Sertifikasi Manajemen Proyek — Muhammad Ahmad Rofi’us Su’ud | 59 | 85 | 1 | https://rofiporto.vercel.app/projects/cert-pm |
| /projects/ekspedisi-nusantara | 200 | Ekspedisi Nusantara — Math Adventure — Muhammad Ahmad Rofi’us Su’ud | 67 | 136 | 1 | https://rofiporto.vercel.app/projects/ekspedisi-nusantara |
| /projects/em-ub-web-2026 | 200 | Ketua Pelaksana Website EM UB 2026 — Muhammad Ahmad Rofi’us Su’ud | 65 | 137 | 1 | https://rofiporto.vercel.app/projects/em-ub-web-2026 |
| /projects/emub-2026 | 200 | Staff KOMINFO EM UB 2026 — Muhammad Ahmad Rofi’us Su’ud | 55 | 156 | 1 | https://rofiporto.vercel.app/projects/emub-2026 |
| /projects/filkom-league-2026 | 200 | Ketua Pelaksana Filkom League 2026 — Muhammad Ahmad Rofi’us Su’ud | 65 | 136 | 1 | https://rofiporto.vercel.app/projects/filkom-league-2026 |
| /projects/gestory | 200 | Gestory — Muhammad Ahmad Rofi’us Su’ud | 38 | 160 | 1 | https://rofiporto.vercel.app/projects/gestory |
| /projects/ifhamkids | 200 | IfhamKids — Belajar Bahasa Arab untuk Anak — Muhammad Ahmad Rofi’us Su’ud | 73 | 132 | 1 | https://rofiporto.vercel.app/projects/ifhamkids |
| /projects/jaspel-rsud-moh-saleh | 200 | Perhitungan Jaspel — RSUD Moh. Saleh Probolinggo — Muhammad Ahmad Rofi’us Su’ud | 79 | 139 | 1 | https://rofiporto.vercel.app/projects/jaspel-rsud-moh-saleh |
| /projects/kelasin | 200 | Kelasin — Platform Digital — Muhammad Ahmad Rofi’us Su’ud | 57 | 160 | 1 | https://rofiporto.vercel.app/projects/kelasin |
| /projects/lki-amd | 200 | LKI AMD — Muhammad Ahmad Rofi’us Su’ud | 38 | 96 | 1 | https://rofiporto.vercel.app/projects/lki-amd |
| /projects/mandorin | 200 | Mandorin — Platform Pembangunan Hunian — Muhammad Ahmad Rofi’us Su’ud | 69 | 120 | 1 | https://rofiporto.vercel.app/projects/mandorin |
| /projects/misra | 200 | Profil Sekolah Dasar — Muhammad Ahmad Rofi’us Su’ud | 51 | 120 | 1 | https://rofiporto.vercel.app/projects/misra |
| /projects/ngajikidz | 200 | NgajiKidz — Belajar Mengaji dengan AI — Muhammad Ahmad Rofi’us Su’ud | 68 | 112 | 1 | https://rofiporto.vercel.app/projects/ngajikidz |
| /projects/pahamin | 200 | PahamIn — Muhammad Ahmad Rofi’us Su’ud | 38 | 146 | 1 | https://rofiporto.vercel.app/projects/pahamin |
| /projects/pelatihan-ar-sdn-3-dono | 200 | Pelatihan Media Pembelajaran AR — SDN 3 Dono — Muhammad Ahmad Rofi’us Su’ud | 75 | 136 | 1 | https://rofiporto.vercel.app/projects/pelatihan-ar-sdn-3-dono |
| /projects/rebite | 200 | ReBite Project — Muhammad Ahmad Rofi’us Su’ud | 45 | 139 | 1 | https://rofiporto.vercel.app/projects/rebite |
| /projects/sobataman | 200 | SobatAman — Platform Pendamping Terverifikasi — Muhammad Ahmad Rofi’us Su’ud | 76 | 123 | 1 | https://rofiporto.vercel.app/projects/sobataman |
| /projects/tehmbois-wcc | 200 | TehMbois — Website Brand Minuman — Muhammad Ahmad Rofi’us Su’ud | 63 | 192 | 1 | https://rofiporto.vercel.app/projects/tehmbois-wcc |
| /projects/telaahkarier | 200 | TelaahKarier — Analisis Risiko Lowongan Kerja — Muhammad Ahmad Rofi’us Su’ud | 76 | 134 | 1 | https://rofiporto.vercel.app/projects/telaahkarier |
| /projects/umkm-go | 200 | UMKM Go — Muhammad Ahmad Rofi’us Su’ud | 38 | 148 | 1 | https://rofiporto.vercel.app/projects/umkm-go |
| /projects/website-em-ub | 200 | Website Resmi EM UB 2026 — Muhammad Ahmad Rofi’us Su’ud | 55 | 159 | 1 | https://rofiporto.vercel.app/projects/website-em-ub |

## Aset dan payload

Total sumber public 107 file, 108.182.470 byte (sekitar 103,17 MiB). Ini storage sumber, bukan transfer halaman. Inventaris 107 file beserta dimensi/format ada di assets.json. next/image menyediakan varian optimizer yang berbeda dari file asli.

| Aset sumber terbesar | Byte | Dimensi | Format |
| --- | --- | --- | --- |
| public/images/competitions/best-pm-raion.png | 16,617,349 | 6000×4242 | PNG |
| public/images/profile/mars-profile.png | 16,617,349 | 6000×4242 | PNG |
| public/images/competitions/Sertifikat Pembicara StudiLanjut Universe.png | 3,811,562 | 2000×1414 | PNG |
| public/images/competitions/JUARA 1 BPC UIN MADURA.png | 2,889,618 | 6250×4419 | PNG |
| public/images/projects/arah-career-path.png | 1,986,767 | 1671×941 | PNG |
| public/images/projects/akademirofi-learning.png | 1,945,472 | 1672×941 | PNG |
| public/images/projects/umkmgo-pasar-desa-banner.png | 1,922,623 | 1671×941 | PNG |
| public/images/competitions/mawapres-filkom-2027-juara-1.png | 1,883,893 | 1448×1086 | PNG |
| public/images/projects/amora-platform-banner.png | 1,824,741 | 1671×941 | PNG |
| public/images/projects/PM - BCC.png | 1,813,320 | 2880×1620 | PNG |
| public/images/projects/bcc-website-cover.png | 1,764,418 | 1672×941 | PNG |
| public/images/projects/ngajikidz-ai-learning.png | 1,719,857 | 1672×941 | PNG |

## JavaScript, font, cache dan render blocking

| Run | Requests | Scripts | CSS | Fonts | Main document transfer | Total task time |
| --- | --- | --- | --- | --- | --- | --- |
| lighthouse-mobile.json | 27 | 9 | 1 | 2 | 9641 | 227.15 |
| lighthouse-desktop.json | 49 | 15 | 1 | 2 | 9642 | 342.31 |
| lighthouse-competitions.json | 30 | 12 | 1 | 2 | 14055 | 326.94 |

Total request/script dapat mencakup prefetch yang dipicu viewport. Ini network per run, bukan ukuran seluruh dependency terpasang. Daftar bundle dan byte transfer per URL ada di link-resource-audit.json; Lighthouse network-requests menyimpan network run sebenarnya. Production JS/CSS berhash mengirim Cache-Control public,max-age=31536000,immutable. HTML beranda must-revalidate dengan X-Vercel-Cache HIT dan prerender header. next/font menyajikan Geist/Geist Mono; font requests teramati dua pada setiap run.

Beranda lab tidak memiliki console error. Responsive/mobile layout penuh, keyboard navigation, modal interaction, semua route hydration, dark theme, visual social preview dan preview deployment tetap memerlukan pemeriksaan lanjutan. Build/analyzer tidak dijalankan pada phase ini.

## Cara reproduksi dan integritas

- `python docs/seo/collect_phase1.py` membaca HTTP/asset inventory dengan Python + Pillow yang tersedia.
- `python docs/seo/collect_links.py` membaca link/resource; beberapa layanan menolak bot. Regex kandidat source asset dapat menghasilkan false positive pada apostrof, dan tidak dipakai sebagai bug tanpa verifikasi.
- `npx --yes lighthouse@12.8.2 https://rofiporto.vercel.app/ --chrome-flags="--headless --no-sandbox" --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=docs/seo/evidence/lighthouse-mobile.json --quiet`.
- Desktop menambahkan `--preset=desktop`; pencapaian mengganti URL dan output path. CHROME_PATH diarahkan ke Chrome lokal.
- HTTP audit mengekstrak HTML dengan HTMLParser; line break h1 dapat tergabung pada teks hasil ekstraksi meski visual tetap terpisah. Hasil binary favicon pada body HTTP tidak dipakai untuk menilai encoding. Verifikasi byte UTF-8 terpisah pada beranda menunjukkan nama dan title benar tanpa replacement character.
- GET internal dan status link bukan bukti semua URL terindeks. JSON parse bukan hasil Rich Results Test. Tidak ada benchmark sebelum/sesudah karena belum ada perubahan implementasi.
