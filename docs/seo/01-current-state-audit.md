# Phase 1 — Current-state SEO audit

Tanggal audit 24 November 2026, Asia/Jakarta. Production https://rofiporto.vercel.app. Repository HEAD saat audit `f34a987`. Ini audit baca-saja website. Tidak ada perubahan implementasi, commit, push, atau deployment.

## Metode dan cakupan

- Membaca AGENTS.md, package.json, konfigurasi Next.js, deployment guide, seluruh pola route, loader MDX, metadata, schema, komponen utama, CSS responsif, dan sampel konten.
- Mengambil 44 respons HTTP melalui GET. Cakupan mencakup seluruh 36 halaman dalam sitemap, robots, sitemap, favicon, dua URL tidak valid, serta variasi HTTP dan trailing slash. Redirect diikuti pada pengambilan awal dan dicatat terpisah pada pemeriksaan link.
- Memeriksa 126 URL link/resource hasil ekstraksi HTML, termasuk URL image optimizer, CSS, JS, link eksternal dan variasi redirect. Ini bukan crawler semua kemungkinan URL atau pengujian semua srcset.
- Menginventarisasi 107 file public beserta ukuran dan dimensi image melalui Pillow. Inventaris ini mencakup aset yang tidak dipakai.
- Menjalankan Lighthouse CLI 12.8.2 menggunakan Chrome headless, satu run per konfigurasi untuk beranda mobile, beranda desktop, dan pencapaian mobile. Tidak melakukan interaksi pengguna atau pengujian keyboard end-to-end.
- Mencoba PageSpeed API. Respons 429 RESOURCE_EXHAUSTED, sehingga data CrUX/field belum diperoleh. Mencoba mengakses tab Search Console lama, tetapi tab tidak tersedia. Tidak ada laporan akun terbaru yang berhasil diambil.
- JSON-LD diperiksa dengan JSON parser dan inspeksi properti. Rich Results Test dan Schema Markup Validator belum dijalankan. Valid secara sintaks bukan klaim kelayakan rich result.

## Klasifikasi bukti

**Terverifikasi** berarti diamati pada kode, HTTP, aset, atau hasil Lighthouse yang disimpan. **Asumsi/risiko** berarti inferensi dengan alasan, belum terbukti pada pengguna atau indeks Google. **Belum diperiksa** berarti memerlukan data/akses/pengujian tambahan. Issue register menjabarkan setiap temuan beserta expected condition dan validasinya.

## A. Arsitektur repository

| Area | Kondisi terverifikasi |
| --- | --- |
| Framework | Next.js 16.1.6, React/React DOM 19.2.3, TypeScript 5, Tailwind CSS 4 |
| Routing | App Router, route group `(site)`, root layout di `src/app/(site)/layout.tsx` |
| Content | 31 file MDX dalam `content/projects`; gray-matter + next-mdx-remote/RSC; tidak ada database/CMS eksternal |
| Rendering | Halaman server + client islands. `generateStaticParams` untuk semua slug proyek; file-system read pada server. Header production `X-Nextjs-Prerender: 1` pada beranda mengonfirmasi prerender beranda. Tidak menjalankan build baru untuk mengklaim klasifikasi seluruh route |
| Interaksi | Navbar, theme, pencarian/filter karya, filter pencapaian dan modal adalah client components; konten awal karya/pencapaian tetap ada pada HTML server |
| Dependencies | Framer Motion, GSAP/@gsap/react, OGL, lucide-react, next-themes, Radix slot, CVA, clsx, tailwind-merge; adanya dependency tidak membuktikan semuanya masuk bundle beranda |
| Deployment | Vercel terverifikasi dari header HTTP; next.config.ts hanya mengatur remote image Unsplash. Tidak ada vercel.json/proxy/middleware dalam inventaris. DEPLOY.md mendeskripsikan default Next build; production branch, protection dan overrides dashboard belum diverifikasi |
| Pemeriksaan lokal | Scripts dev/build/start/lint tersedia. Build/lint tidak dijalankan karena fase ini audit kondisi, bukan validasi perubahan aplikasi |

### Peta route dan komponen

- `/` → page.tsx → HeroProfile, ProjectCard, tiga karya pilihan, proses, kontak.
- `/about` → profil, pengalaman organisasi, ambassador; Image dan tautan proyek.
- `/projects` → semua metadata MDX → ProjectsGrid → ProjectCard. Kategori/filter hanya state client, tidak membuat route indeks tambahan.
- `/projects/[slug]` → 31 slug hasil MDX → generateMetadata, MDXRemote, MdxImage, demo/repository links.
- `/competitions` → CompetitionsView → enam kelompok pencapaian/pengalaman/seminar, filter dan modal; SpotlightCard dan Framer Motion.
- `/contact` → email, CopyEmail, LinkedIn/GitHub/Instagram.
- `/robots.txt`, `/sitemap.xml`, `/favicon.ico` → metadata file routes.
- Layout bersama → Navbar, ThemeProvider, Footer; skip link dan main landmark.
- Komponen tambahan dalam repository termasuk hero.tsx, theme-toggle, SplitText, TextType, Ribbons, plasma/plasma-background, pill-nav, button, badge. Beberapa komponen visual lama tidak terlihat di entry point beranda sekarang. Jangan menghapus hanya berdasarkan dugaan.
- Peta lengkap URL, heading, meta, link dan image per route tersedia pada `evidence/http-audit.json`. Peta seluruh aset tersedia di `evidence/assets.json`.

## B. Technical SEO

| Pemeriksaan | Hasil dan batasan |
| --- | --- |
| HTTP | 36/36 URL konten sitemap mengembalikan 200; total 44 request menghasilkan 42 respons akhir 200 dan dua 404; tidak ada 5xx dalam sampel |
| robots | 200 text/plain, `User-Agent: *`, `Allow: /`, sitemap absolut HTTPS |
| sitemap | 200, XML berisi 36 loc, sesuai 5 route statis + 31 MDX. Tidak mencantumkan lastmod. Tidak dianggap invalid karena lastmod opsional |
| Canonical | Seluruh 36 halaman konten memiliki canonical. Host production konsisten. Root canonical tanpa trailing slash diterima. Pemeriksaan canonical bukan bukti Google memilih canonical tersebut |
| Index directives | Tidak ditemukan blokir noindex pada halaman valid dalam snapshot; 404 mengandung meta robots noindex. Tidak adanya meta robots index bukan error. X-Robots-Tag produksi tidak memblokir pada snapshot yang diperiksa |
| Redirect | HTTP → HTTPS 308 satu langkah; /about/ → /about 308; /projects/ → /projects 308. Tidak ada loop pada variasi ini; variasi host lain tidak dienumerasi |
| Broken/soft 404 | Dua URL uji mengembalikan 404 nyata. Tidak ditemukan halaman sitemap dengan respons 404. Soft 404 menurut klasifikasi Google belum dapat dipastikan tanpa GSC |
| Internal links | Seluruh slug karya dapat ditemukan pada HTML `/projects`; about juga menghubungkan pengalaman. Tiga lampiran PDF yang ditautkan pada halaman sertifikasi diperiksa terpisah dan semuanya 404. Seluruh fragment belum diuji |
| External links | EM UB membalas 403 dengan Cloudflare challenge; LinkedIn 999. Ini keterbatasan akses bot audit, bukan bukti link mati. URL lain dalam pemeriksaan tercatat pada evidence resource |
| Duplicate content | Tidak ditemukan title duplikat antar-36 halaman utama. Tiga halaman EM UB memiliki konteks bertumpang tindih tetapi isi berbeda; risiko intent overlap perlu review, bukan duplicate penalty terkonfirmasi |
| SSR/JS | Nama, heading, metadata, kartu karya dan pencapaian terbaca di HTML tanpa eksekusi JS. Lighthouse beranda tidak mencatat console error. Belum menguji semua interaksi/hydration di semua route |
| Preview | Canonical dan robots hardcoded production; perlindungan preview via Vercel belum diverifikasi. Tidak menyimpulkan preview terindeks. Minta satu URL preview dan respons X-Robots-Tag/protection aktual |
| Verification | google-site-verification tersedia di layout dan HTML. Status kepemilikan akun terbaru belum diperiksa ulang |
| Mobile | Viewport width=device-width dan responsive CSS tersedia. Lighthouse mobile menjalankan viewport 412×823. Tidak ada hasil uji seluruh breakpoint atau perangkat fisik |

## C. On-page dan semantic

- Title dan description tersedia pada seluruh 36 halaman; detail per URL dan panjang karakter ada di baseline. Nama lengkap ada di judul proyek. Panjang title/deskripsi merupakan sinyal review keterbacaan, bukan batas ranking mutlak.
- Setiap halaman konten memiliki satu H1. `/projects` melompat H1 → H3 untuk kartu karena ProjectCard selalu h3; `/about` memuat H3 sebelum H2 area keterampilan. Ini perbaikan hierarki aksesibilitas, bukan penghalang indeks.
- HTML memakai header/nav/main/section/article/footer, `<html lang="id">`, skip link, alt image dan aria-label navigasi. Sebagian title/deskripsi sertifikasi berbahasa Inggris pada situs Indonesia perlu penyeragaman editorial.
- Nama beranda cocok intent pencarian nama lengkap. Halaman about/karya/contacts memakai H1 naratif yang menarik namun kurang deskriptif bila berdiri sendiri. Pertahankan desain dan pertimbangkan konteks tambahan yang berguna, bukan pengulangan keyword.
- Proyek baru seperti CEKAT, SobatAman, ARAH, IfhamKids dan TelaahKarier berisi overview singkat; peran dan bukti hasil belum merata. Tidak menerapkan minimal word count. Prioritaskan kontribusi nyata, batasan, dokumentasi, demo dan hasil yang dapat diverifikasi.
- Semua 31 route proyek punya backlink ke arsip/kontak. Relasi antarkarya dan tautan sumber kredibilitas bisa diperkuat secara editorial.
- Lighthouse menemukan kontras teks proses 4,47:1 (target 4,5:1); angka dekoratif 1,93:1 juga dilaporkan namun aria-hidden dan perlu triage konteks. Modal pencapaian memiliki Escape/close, tetapi kode belum menyediakan dialog semantics/focus trap/return focus lengkap. Belum dilakukan audit aksesibilitas manual penuh.

## D. Entity dan branding

- Homepage memuat satu ProfilePage dengan mainEntity Person, @id stabil `/#person`, nama, alternateName apostrof lurus dan MARS, deskripsi, URL/foto dan tiga sameAs LinkedIn/GitHub/Instagram. JSON parse berhasil; bukti pada HTTP JSON.
- Tidak ada WebSite schema pada homepage. OG siteName saja bukan pengganti WebSite. Screenshot pengguna 23 November menampilkan nama situs Vercel, merupakan bukti historis, bukan pengukuran SERP hari ini.
- Favicon lokal memperlihatkan segitiga putih di atas hitam; production favicon 200. Identitas favicon saat ini lebih menyerupai Vercel daripada pemilik; lihat `evidence/favicon.png`.
- Homepage memiliki OG profile + Twitter summary_large_image. Halaman selain homepage tidak mendefinisikan OG/Twitter sendiri dan root layout tidak memberikan fallback. Preview proyek belum dapat membawa cover dan deskripsi spesifik secara konsisten.
- Nama curly apostrophe pada UI dan straight apostrophe di alternateName adalah variasi ejaan yang sudah ditangani. Tidak perlu keyword stuffing. Keabsahan kepemilikan sameAs dan backlink profil perlu review akun/manual; LinkedIn membatasi bot.
- Prestasi dan sertifikat ditampilkan sebagai image dengan title/description. Tanggal YPS di data `Agu 2024` perlu dicocokkan dengan tahun pada sertifikat yang pengguna pernah berikan (2026). Mawapres 2027 mungkin nama angkatan acara, jangan otomatis mengganti. Issue validasi editorial, bukan tuduhan data salah.
- Angka seperti lebih dari 60.000 mahasiswa pada proyek EM UB belum disertai sumber/definisi cakupan. Bedakan sasaran audiens dari pengguna aktual dan minta konfirmasi pemilik. Audit tidak mengesahkan prestasi atau metrik tersebut.

## E. Performance dan image

Baseline numerik lengkap ada di 03-baseline-metrics.md dan tiga JSON Lighthouse. Beranda mobile Performance 98, desktop 100; pencapaian mobile 90. LCP pencapaian 3,2 s dan TBT 170 ms merupakan peluang paling jelas. Tidak ada hasil INP atau kelulusan field CWV yang dapat diklaim.

- Next/Image optimizer dipakai; srcset/sizes dan fill dengan wrapper aspect ratio membantu stabilitas. Seluruh img hasil ekstraksi HTML punya alt nonkosong. Kecocokan alt dengan semua dokumen belum divalidasi manual.
- Source asset total 108.182.470 byte tidak sama dengan transfer halaman. Dua file 16,6 MB adalah best-pm-raion.png dan mars-profile.png; kedua file besar perlu dikaitkan dengan pemakaian aktual sebelum optimasi. Jangan mengubah desain cover atau menghapus sumber.
- `sizes` ProjectCard desktop 40vw kurang cocok dengan grid tiga kolom; hero detail fill tidak punya sizes, fallback dapat meminta image terlalu besar. MdxImage auto memakai fill tanpa tinggi intrinsik; belum ada bukti mode auto digunakan saat ini.
- Lighthouse image-delivery memperkirakan penghematan beranda sekitar 105 KiB dan pencapaian 239 KiB. Estimasi ini bukan hasil optimasi yang sudah dicapai.
- Foto beranda priority sudah eager/preload; Lighthouse tetap menandai fetchpriority=high belum tersedia. Pencapaian memiliki LCP image lazy-loaded. Optimasi prioritas harus spesifik kandidat LCP terukur.
- next/font/google Geist + Geist Mono digunakan; lab beranda memuat dua font. Resource berhash JS/CSS memakai public max-age=31536000 immutable; HTML cache must-revalidate dengan Vercel cache HIT. Tidak ada bukti caching HTML rusak.
- Lighthouse mendeteksi CSS render blocking dengan estimasi kecil (20 ms beranda, 50 ms pencapaian). Tidak menjadi alasan menulis ulang CSS atau menghapus animasi.
- GSAP/OGL dan komponen lama dalam dependencies bukan bukti overhead beranda. Profil bundle berdasarkan network Lighthouse dulu. Tidak menjalankan bundle analyzer/build baru.

## F. Data eksternal dan batas audit

| Layanan | Status aktual | Data yang perlu disediakan manual |
| --- | --- | --- |
| Search Console | Tab lama tidak tersedia; tidak ada export baru | Performance Search results, 28 hari dan 3 bulan, query/page/device/country, clicks/impressions/CTR/average position; query nama dan variasinya; URL Inspection beranda + 3 proyek, canonical Google, last crawl; Pages indexing; Sitemaps; CWV; Links; Manual actions/Security |
| Bing Webmaster Tools | Tidak ada akses akun dalam audit ini | Status verifikasi, sitemap, URL Inspection beranda, Search Performance, crawl errors dan Site Scan jika pernah dijalankan. Jangan membuat akun/submit tanpa instruksi |
| PageSpeed Insights/CrUX | API publik dicoba, HTTP 429 | Hasil mobile/desktop dengan tanggal dan field URL/origin, p75 LCP/INP/CLS, periode 28 hari dan apakah insufficient data. Lampirkan JSON/link hasil jika tersedia |
| Rich Results Test | Belum dijalankan | URL hasil untuk beranda dan satu proyek, detected types, error/warning, screenshot rendered HTML. Tidak semua schema eligible rich result |
| Schema Markup Validator | Belum dijalankan | Hasil parse homepage ProfilePage/Person; setelah phase implementasi, WebSite. Simpan types dan error/warning |
| Vercel | Production HTTP dapat diakses, dashboard belum | Production branch, deployment SHA, satu preview URL, protection/noindex response, cache/analytics yang sudah tersedia gratis |

Tidak meminta password, cookie sesi atau credential. Data laporan boleh diekspor/disamarkan. Peringkat ke-4 dan sitemap Success 35 URL dari percakapan sebelumnya tetap historis; sitemap aktual sekarang 36 URL. Tidak menyamakan penemuan URL dengan jumlah halaman terindeks.

## Bukti dan referensi

- [HTTP audit](evidence/http-audit.json), [resource/link audit](evidence/link-resource-audit.json), [assets](evidence/assets.json), [HTML beranda](evidence/home.html).
- [Lighthouse mobile](evidence/lighthouse-mobile.json), [desktop](evidence/lighthouse-desktop.json), [pencapaian](evidence/lighthouse-competitions.json), [PSI API error](evidence/pagespeed-api.json).
- `missing-source-assets.json` merupakan hasil regex kandidat awal. Dua entri terpotong pada nama berapostrof adalah false positives dan tidak digunakan sebagai temuan missing asset.
- [Google site names](https://developers.google.com/search/docs/appearance/site-names), [Google SEO starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide), [Google Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals).
- [Next.js Metadata](https://nextjs.org/docs/app/api-reference/file-conventions/metadata), [Next.js Image](https://nextjs.org/docs/app/api-reference/components/image), [Schema.org ProfilePage](https://schema.org/ProfilePage), [Schema.org Person](https://schema.org/Person), [Schema.org WebSite](https://schema.org/WebSite).
- [Vercel environments](https://vercel.com/docs/deployments/environments), [Vercel response headers](https://vercel.com/docs/headers/response-headers).
