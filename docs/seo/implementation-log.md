# Implementation log

## 2026-11-24 — Phase 3 on-page dan semantic SEO

- Menyusun keyword mapping 36 URL sebagai hipotesis tanpa volume pencarian/GSC terverifikasi.
- Snapshot rendered HTML Phase 2 dan Phase 3 menunjukkan 15 title dan 36 description berubah; tabel lengkap di dokumen 07.
- Menjelaskan afiliasi kampus pada profil, memperbaiki H1/subheading, figure/section/nav, dan memberi heading level kartu sesuai konteks.
- Menambahkan 15 paragraf internal link serta link profil di seluruh detail; graph seluruh 36 halaman tanpa orphan.
- Menambahkan accessibility semantics dan pengelolaan fokus modal, keyboard thumbnail, dan aria-pressed filter. Kontras teks proses diperbaiki; tiga angka dekoratif masih dilaporkan Lighthouse.
- Build/lint/types lulus. Regression HTTP 36 halaman/789 pemeriksaan lulus. Lighthouse accessibility 96, SEO 100.
- UI browser regression Phase 3 belum berjalan karena automatic approval review gagal akibat usage limit. Tidak mengklaim pengujian keyboard/visual modal baru lulus.
- Pengguna menginstruksikan push setelah Phase 3, kemudian melanjutkan Phase 4. Perubahan Phase 1–3 masih satu working tree hingga checkpoint push; SHA/status push dicatat setelah berhasil.
- Checkpoint lokal Phase 1–3 tersimpan pada commit 01c7bb9. Push belum dieksekusi: automatic approval review menolak perintah gabungan commit/push karena master memicu deployment Vercel dan meminta persetujuan production tersendiri. Setelah penolakan, hanya staging dan commit lokal yang dilakukan.
- Phase 4 menunggu penyelesaian checkpoint push sesuai urutan pengguna. Tidak ada implementasi Phase 4 atau perubahan akun eksternal pada checkpoint ini.

## 2026-11-24 — Persiapan dokumentasi

- Membuat AGENTS.md berisi aturan proyek dari pengguna. Tidak ada AGENTS.md pada root repository saat pemeriksaan.
- Menyiapkan pusat dokumentasi docs/seo/.
- Tidak mengubah implementasi SEO atau melakukan deployment production.
- Menunggu instruksi Phase 1.

## 2026-11-24 — Phase 1 audit

- Audit repository, 44 respons HTTP, 126 link/resource, 107 aset dan tiga Lighthouse lab run.
- Menyusun empat deliverable bernomor 01–04 beserta bukti di evidence/.
- PageSpeed API memberi 429. Tab GSC lama tidak tersedia. CrUX, GSC terkini, Bing dan validator eksternal belum diperoleh; checklist manual tersedia dalam audit dan roadmap.
- Tidak mengubah kode website, dependency project, melakukan commit/push atau deployment.
- Lighthouse diunduh melalui npx pada cache alat, tanpa perubahan package.json/package-lock.json. Hasil lab bukan field CWV.
- Phase implementasi berikutnya menunggu instruksi pengguna.

## 2026-11-24 — Phase 2 technical SEO

- Otorisasi pengguna mencakup implementasi dan pengujian lokal, tanpa deployment production.
- Membaca audit/issue register/baseline/roadmap Phase 1 serta aturan repository.
- Menambahkan konfigurasi URL bersama, helper Metadata API, social metadata per template, canonical production, dan guard noindex untuk VERCEL_ENV preview/development.
- Sitemap production tetap 36 canonical publik, preview kosong; robots allow-all dan verifikasi GSC dipertahankan. lastModified tidak ditambahkan tanpa sumber revisi yang benar.
- Memperbaiki tiga href PDF yang 404 dengan gambar bukti yang sudah ada; URL lama 308 satu langkah.
- Menemukan SEO-19 pada smoke test image optimizer, menormalisasi dua nama file berapostrof tanpa mengubah isi, memperbarui referensi dan menyediakan redirect lama.
- Mempertahankan static rendering/SSG, menambahkan dynamicParams=false dan notFound pada metadata proyek; unknown slug serta alias .mdx diuji 404/noindex.
- Memperbaiki 9 lint error/8 warning baseline secara terbatas, tanpa mematikan aturan lint. Rincian komponen pada laporan Phase 2.
- Menambahkan npm run typecheck dan npm run test:seo, tanpa dependency baru.
- Build production/preview, lint dan typecheck final lulus. Smoke test production dan preview lokal masing-masing 36 halaman/679 pemeriksaan lulus.
- Memeriksa sampel UI desktop/mobile, theme, navigasi, pencarian karya dan modal sertifikat. Tidak ada error console pada sesi UI tersebut; bukan full visual regression suite.
- Build pertama sempat gagal network Google Fonts; retry dengan akses jaringan lulus. Pembatasan koneksi localhost diatasi dengan akses server/test runner yang sama. Diagnostic NoFallbackError pada negative slug test dicatat pada laporan meski HTTP tetap 404/noindex.
- Bukti disimpan dalam evidence/phase2-* dan laporan docs/seo/05-technical-implementation.md. Tidak ada commit, push atau deployment; validasi platform Vercel dan data akun tetap pending.

## 2026-11-24 — Checkpoint deployment dan Phase 4

- Setelah penolakan awal, pengguna memberi persetujuan eksplisit push master dan deploy production. Push cd05aa6 berhasil; status integrasi Vercel success. Production lulus 36 halaman/789 pemeriksaan (evidence/phase3-production-deployed.json). Catatan pending push sebelumnya adalah riwayat, bukan status terkini.
- Phase 4 dikerjakan setelah checkpoint tersebut: graph Person/WebSite/CollegeOrUniversity/WebPage, ProfilePage hanya /about, CreativeWork untuk karya relevan dan BreadcrumbList dengan navigasi terlihat.
- Identitas stabil; sameAs lama dipertahankan dengan checklist verifikasi ownership. Award WCC memakai bukti sertifikat; publikasi/SoftwareApplication dan penghargaan belum terverifikasi tidak dibuat.
- Menambahkan favicon monogram, Apple icon dan gambar sosial 1200×630 memakai aset kode. Site name memakai nama lengkap; tidak menjanjikan Google menampilkan pilihan ini.
- Build, lint, typecheck lulus. SEO smoke 789 dan entity smoke 469 pemeriksaan pada 36 halaman lulus. Gambar sosial diperiksa visual. Validator resmi/tes interaksi browser dan data akun masih pending (lihat 09).
- Dokumentasi 08–10 selesai. Tidak mengubah akun eksternal. Phase 4 belum dipush atau deployed; persetujuan checkpoint sebelumnya diterapkan pada Phase 3 sebelum Phase 4.

## 2026-11-24 — Phase 5 performance, mobile dan image SEO

- Mengambil baseline Lighthouse build production lokal yang sudah mencakup Phase 4, untuk beranda/pencapaian mobile dan desktop. Seluruh raw JSON sebelum/sesudah disimpan; variasi TBT dicatat, tanpa klaim hasil field.
- Memperbaiki sizes portrait, kartu, hero detail, MDX dan modal. Mempertahankan original source, image fit, URL, animasi dan Next Image/WebP. Menghapus boundary client yang tidak perlu pada MdxImage; memakai m/LazyMotion/domAnimation untuk animasi modal.
- Menambah ukuran touch target tombol tutup modal dan memperbaiki kontras badge terang tertentu berdasarkan audit aktual.
- Inventaris 98 raster; 36 HTML memiliki 110 image element dengan atribut responsif/alt. Semua 73 sumber lokal unik dan varian WebP diuji HTTP 200. Ukuran seluruh JS chunk dan cache/compression lokal/produksi dicatat.
- CUA tersedia kembali: enam route diperiksa pada 390/768/1440px dan tambahan 320/480px, tanpa overflow horizontal pada sampel. Menu, pencarian, filter, modal, Tab/Escape/focus restoration dan theme diuji. Browser error log kosong pada sesi. Ini bukan full pixel regression suite atau tes perangkat fisik.
- Build, lint, typecheck, SEO smoke 789, entity smoke 469, image audit lulus. CLS lab tetap 0. LCP mobile masih belum memenuhi 2.5s; PSI field API 429 sehingga INP belum bisa dinilai. Temuan SEO-06/15 tetap terbuka.
- Laporan docs/seo/11-performance-report.md dan issue register diperbarui. Tidak melakukan push/deployment atau perubahan akun eksternal.

## 2026-11-24 — Phase 6 content, authority dan off-page

- Audit 31 MDX dan struktur 5 route utama; mempertahankan arsitektur tanpa halaman kosong baru. Menyusun kerangka 11 bagian studi kasus dengan evidence/missing-data matrix dan permintaan D1–D9.
- Memperbarui 13 MDX dengan bukti, atribusi individu/tim dan pembedaan tujuan dari hasil terukur. Menautkan berita FILKOM Amora (hasil terindeks tersedia, open langsung 403), sertifikat WCC dan foto pelatihan AR. Tidak menambah riset, metrik atau testimoni fiktif.
- Menyusun dokumen 12–15: strategi konten, 12 ide backlog dengan audience/intent/keyword hipotesis/nilai/bukti/internal links/prioritas, off-page Rp0 dan 15 checklist authority manual. Tidak membuat publikasi/HKI/artikel kosong atau schema AI/llms.txt.
- Live HTTP read-only menunjukkan Rofiporto 200/lang=id dan GitHub 200/lang=en dengan bio undergraduate; HTML profil yang terbaca belum menampilkan URL portfolio. Tidak menyimpulkan penyebab urutan Google dari screenshot, tidak mengubah bio/profil akun.
- Build, lint, typecheck lulus; SEO smoke 36 halaman/791 checks, entity 469, content 11 lulus. Render snapshot semua 36 disimpan. CUA memeriksa sampel Amora/WCC/AR mobile dan isi Amora desktop; tidak ditemukan overflow/broken loaded images/console error pada sampel.
- Tidak mengirim pesan/outreach, mengubah akun, melakukan push atau deployment. Perubahan Phase 4–6 tetap lokal. GSC, permissions, research/metrik/refleksi dan bukti tambahan menunggu pemilik.

## 2026-11-24 — Phase 7 external tools, indexing dan monitoring

- Meninjau dokumentasi phase sebelumnya dan konfigurasi verification/robots/sitemap/analytics. Menyusun deliverable 16–19 beserta daftar 21 pekerjaan akun/manual dengan URL resmi.
- Sesi browser yang tersedia dapat mengakses property GSC existing tanpa meminta kredensial. Ownership HTML tag verified, sitemap Success36/last read24Nov. Tidak membuat property/resubmit sitemap.
- Mengunduh CSV ZIP Performance28d: chart tersedia16–22Nov, 2 clicks/15 impressions/CTR13.33%/position5.1. Queries hanya header; branded split unknown. Custom90d25Aug–22Nov diperiksa UI dengan coverage/totals sama; ZIP90 dan pembanding belum diperoleh. User meminta panduan karena belum punya export sebelumnya.
- Memeriksa Page Indexing report lama0indexed/4notindexed, root Inspection indexed/canonicalGoogle sesuai inspectedURL, last crawl17Nov. LiveTest24Nov available. Mencatat konflik freshness daripada menyimpulkan root deindexed. Tidak request indexing karena perubahan lokal belum deployed dan root sudah indexed.
- GSC CWV insufficient data kedua perangkat; ManualActions dan SecurityIssues no issues; Links report0/no data. Menyimpan observasi tanpa identitas akun privat di phase7-dashboard-observations.json.
- RRT production root1validProfilepage; SchemaValidator ProfilePage/Person0error0warning; W3C root/about/amora0error0warning dengan informational trailing-slash notices. PSIAPI429. Lighthouse production99mobile/100desktop SEO100, A11y96, BP100, CLS0; raw JSON disimpan dan tidak dicampur hasil lokalPhase5.
- Bing hanya landing SignIn, tidak login/import/grantakses. ScreamingFrog tidak ditemukan pada lokasi instalasi standar, belum dijalankan. Panduan gratis500URL dan checklist disediakan. IndexNow dievaluasi opsional, GoogleIndexingAPI tidak digunakan untuk portfolio.
- Tidak menemukan analytics marker lazim pada source/HTML; dashboard analytics belum diaudit. Tidak memasang tracker/consent baru atau eventganda. Konfigurasi event usulan dan privasi didokumentasikan.
- CSV monitoring27kolom/9observasi aktual divalidasi; metrik/query/p75/pembanding yang tak tersedia kosong. Template manual, tanpa scheduler baru. Node syntax check dan lint dijalankan; kode website tidak diubah pada Phase7 sehingga build Phase6 yang sudah lulus tidak diklaim dijalankan ulang. Tidak commit/push/deploy.
