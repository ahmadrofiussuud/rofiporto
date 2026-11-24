# Phase 2 — Technical SEO engineering

Tanggal 24 November 2026, Asia/Jakarta. Production URL tetap https://rofiporto.vercel.app. Implementasi ada pada working tree lokal, **belum commit/push/deploy**. Production yang online belum menerima perubahan ini.

## Hasil dan cakupan

Prioritas High yang dapat ditangani kode adalah SEO-18 (lampiran hilang) dan mitigasi SEO-04 (preview indexing). SEO-05 memerlukan data akun GSC dan tetap pending. SEO-03 ditangani sebagai Medium terkait Metadata API. Tidak ada Critical terverifikasi dari Phase 1.

| Area | Implementasi |
| --- | --- |
| Identitas URL | `src/lib/site-config.ts` menjadi sumber SITE_URL, nama pemilik, profil dan canonical URL. metadataBase memakai production URL tetap, tidak membaca preview host |
| Metadata API | `src/lib/seo.ts` menyusun title/description, canonical absolut, OG dan Twitter. Dipakai empat halaman utama selain homepage dan seluruh 31 proyek; metadata homepage spesifik tetap dipertahankan |
| GSC | Token verifikasi lama dipertahankan di layout; smoke test mengeceknya pada seluruh 36 halaman |
| Production indexability | Layout menghasilkan index/follow pada production. Tidak ada X-Robots-Tag noindex dari konfigurasi aplikasi untuk production |
| Preview indexability | VERCEL_ENV preview/development menghasilkan meta robots noindex,nofollow dan header X-Robots-Tag pada seluruh path. Canonical tetap production |
| robots.txt | Tetap allow `/` agar halaman dan resources publik dapat dirayapi, termasuk agar crawler bisa membaca directive noindex preview. Sitemap mengarah ke production |
| Sitemap | Production berisi tepat 5 route statis + 31 proyek canonical. Preview menghasilkan XML urlset kosong. Tidak membuat timestamp lastModified dari build/mtime, karena tidak ada data revisi konten yang dapat dipercaya |
| Rendering | Lima halaman utama tetap static prerender; 31 proyek tetap SSG generateStaticParams. dynamicParams=false membatasi route proyek ke slug yang benar-benar ada saat build |
| Invalid pages | Slug tidak dikenal dan alias amora.mdx mendapat 404 + noindex. generateMetadata memanggil notFound untuk proyek yang tidak ditemukan |
| Trailing slash | trailingSlash=false dibuat eksplisit. /about/ dan /projects/ redirect 308 satu langkah |
| Tautan PDF | Tiga href MDX kini membuka gambar sertifikat yang sudah dipakai pada halaman terkait. Label berubah menjadi Lihat sertifikat agar sesuai format. Tiga URL PDF lama redirect permanen 308 langsung ke gambar yang valid |
| Gambar bernama berapostrof | Dua sumber sertifikat diganti nama aman tanpa mengubah byte gambar. Referensi diperbarui dan empat variasi URL lama (apostrof literal/encoded) diberi redirect satu langkah |
| Automated checks | scripts/seo-smoke.mjs menggunakan Node native fetch/assert/fs + gray-matter yang sudah terpasang. Tidak menambah dependency |

Penggantian tujuan PDF memakai **gambar bukti yang sudah tersedia**, bukan file PDF baru. Ini keputusan implementasi untuk memperbaiki link tanpa mengarang sertifikat atau meminta dokumen yang sebenarnya sudah tampil sebagai image. File gambar yang diganti nama tetap memiliki isi yang sama.

## Temuan tambahan saat pengujian

SEO-19 ditemukan ketika pengujian image optimizer lokal. File `sertif finalis web dev'.jpeg` valid menurut Pillow, tetapi varian URL ber-`%27` memberi 404 dan optimizer memberi 400. Berkas workshop PM BCC juga mengandung apostrof pada nama. Keduanya dinormalisasi ke nama tanpa spasi/apostrof dan diuji melalui source URL, optimizer, serta redirect URL lamanya. Ini temuan lingkungan build lokal; tidak mengklaim semua URL tersebut sebelumnya gagal pada Vercel.

## Perbaikan lint yang diperlukan

Baseline lint sebelum implementasi menghasilkan 9 error dan 8 warning. Untuk memenuhi acceptance criteria tanpa menonaktifkan aturan, dilakukan perbaikan terbatas berikut.

- Navbar dan PlasmaBackground menggunakan useHydrated berbasis useSyncExternalStore untuk membedakan server snapshot dan browser snapshot. Menggantikan setState sinkron dalam effect; tema dan tampilan diperiksa pada browser.
- SplitText menunggu document.fonts.ready secara asynchronous dengan cleanup guard; catch binding yang tidak dipakai dihapus.
- Ribbons memiliki tipe RibbonLine dan cleanup memakai container yang di-capture saat effect dimulai.
- plasma.tsx memakai const untuk nilai yang tidak berubah.
- Loader konten menyatakan optional date pada BaseMetadata dan menghapus @ts-ignore. Perilaku sort tetap sama.
- Tailwind config memakai ESM import plugin typography.
- Import Calendar dan import/parameter yang tidak digunakan pada pill-nav dibersihkan. Prop interface initialLoadAnimation tetap tersedia bagi pemanggil.

Tidak ada perubahan CSS, layout, animasi desain, isi prestasi, domain, atau dependency project. Perubahan komponen di atas diperlukan untuk melewati lint yang sudah gagal sebelum Phase 2.

## Pengujian aktual

| Pemeriksaan | Hasil | Bukti |
| --- | --- | --- |
| npm run build, mode production | PASS, Next.js 16.1.6, static + SSG | evidence/phase2-production-build.log |
| npm run build, mode preview | PASS dengan VERCEL_ENV=preview | evidence/phase2-preview-build.log |
| npm run lint | PASS, exit 0 tanpa error/warning final | evidence/phase2-lint.log |
| npm run typecheck | PASS, tsc --noEmit exit 0 | evidence/phase2-typecheck.log |
| npm run test:seo, production lokal | PASS, 36 halaman dan 679 pemeriksaan | evidence/phase2-production-smoke.json |
| npm run test:seo, preview lokal | PASS, 36 halaman dan 679 pemeriksaan | evidence/phase2-preview-smoke.json |
| git diff --check | PASS; hanya advisory LF→CRLF dari Git | Perintah dijalankan saat review diff |
| UI browser desktop | Beranda, pergantian light/dark, navigasi Karya, pencarian Akademirofi menghasilkan satu karya | Observasi browser build lokal port 3101 |
| UI browser mobile 390×844 | Beranda terbaca, menu buka dan navigasi ke Pencapaian; modal Mawapres bisa dibuka dan ditutup | Observasi browser; viewport dikembalikan setelah pemeriksaan |
| Browser console | Tidak ada entry error pada sesi pemeriksaan UI | dev.logs levels error menghasilkan array kosong |

Ini pengujian hasil build lokal dengan next start, **bukan deployment Vercel**. Browser pemeriksaan UI dilakukan sebelum normalisasi dua nama file gambar; gambar hasil rename sesudahnya divalidasi melalui source dan optimizer dalam smoke test final. Tidak menjalankan perbandingan screenshot pixel-by-pixel, audit keyboard penuh, atau semua kombinasi fitur. Tidak ditemukan regresi pada sampel interaksi yang diperiksa; tidak mengklaim seluruh kemungkinan interaksi sudah diuji.

### Cakupan smoke test

- Semua URL sitemap production harus tepat sesuai 36 route konten yang ada, unik dan canonical HTTPS production. Sitemap preview harus kosong.
- Semua halaman harus HTTP 200, lang id, satu H1 dan konten MDX pada HTML server, tanpa menunggu JavaScript.
- Setiap halaman harus memiliki satu canonical yang tepat, title/description, OG/Twitter relevan, social image production dan token GSC lama.
- Production harus bebas noindex; preview harus memiliki meta dan header noindex.
- Semua proyek harus ditautkan sebagai anchor dalam HTML arsip. Href internal dan fragment yang ditemukan diperiksa, termasuk tautan sertifikat dan gambar sumber yang dipakai HTML.
- Tiga URL tidak valid diuji HTTP 404 + noindex. Tracking query beranda tetap canonical root.
- Trailing-slash redirect dan tujuh variasi URL sertifikat lama harus 308 satu langkah ke image 200.
- Dua image optimizer URL sertifikat yang dinormalisasi harus 200 image.

### Cara menjalankan ulang

PowerShell, jalankan build dan server secara berurutan. Server memerlukan terminal terpisah dari test runner.

```powershell
$env:VERCEL_ENV = 'production'
npm run build
npm run start -- --port 3101 --hostname 127.0.0.1
```

```powershell
npm run test:seo -- --base-url http://127.0.0.1:3101 --mode production
npm run lint
npm run typecheck
```

Untuk preview, hentikan server terlebih dahulu, build dengan VERCEL_ENV=preview, start dengan environment preview, lalu test --mode preview. Metadata hasil prerender menyimpan environment pada saat build. Mengubah environment saat next start saja tidak mengganti HTML yang sudah diprerender. Jangan menjalankan dua build pada direktori .next yang sama secara bersamaan. Setelah pengujian preview, build production kembali sebelum menyiapkan release production.

## Kegagalan awal dan batasan

1. Build awal gagal mengambil Geist/Geist Mono karena jaringan pada sesi terbatas. Build diulang dengan akses jaringan dan lulus; font/desain tidak diganti.
2. Test runner awal tidak dapat menjangkau server lokal lintas pembatasan sesi (EACCES/timeout). Server dan test runner kemudian dijalankan dengan akses yang sama dan seluruh smoke test lulus.
3. Pemeriksaan image optimizer tambahan sempat gagal pada nama file apostrof dan memicu perbaikan SEO-19. Hasil gagal tidak disembunyikan sebagai PASS awal; evidence final berisi run setelah perbaikan.
4. Server Next 16.1.6 mencatat diagnostic Internal: NoFallbackError ketika negative test meminta beberapa slug tidak terdaftar dengan dynamicParams=false. Respons pengguna tetap 404/noindex dan tidak ada 5xx pada test. Ini observasi log framework yang belum ditelusuri lebih lanjut, bukan klaim bahwa semua log server bebas error.
5. Preview Vercel sungguhan, deployment settings dan proteksi platform belum diverifikasi karena belum ada deployment/preview URL yang diberikan. Mitigasi kode dibuktikan pada build lokal VERCEL_ENV=preview; verifikasi platform tetap pending SEO-04.
6. Baseline GSC terbaru, field CrUX/INP, validator eksternal dan pengaruh ranking tetap pending. Tidak mengubah status tersebut menjadi selesai hanya karena smoke test lulus.

## Acceptance matrix

| Kriteria | Status saat Phase 2 selesai |
| --- | --- |
| Public pages HTTP 200 | Lulus untuk seluruh 36 route pada build production lokal |
| Canonical valid dan bukan preview | Lulus pada production dan preview lokal |
| robots/sitemap dapat diakses | Lulus HTTP 200 kedua mode |
| Tidak ada accidental noindex production | Lulus seluruh 36 halaman mode production |
| Invalid URL status benar | Lulus tiga negative URL 404/noindex |
| Konten utama rendered HTML | Lulus H1/MDX/anchor arsip tanpa JavaScript |
| Fitur/visual | Pemeriksaan sampel desktop/mobile lulus; batas cakupan di atas |
| Build/lint/types | Lulus final |
| Production rollout | Belum dilakukan; memerlukan persetujuan |
| Preview platform aktual | Pending URL/deployment yang disetujui |

## Issue yang ditangani dan ditunda

- SEO-18 diperbaiki lokal dan lulus HTTP test; verifikasi production menunggu deployment.
- SEO-04 dimitigasi dan diuji dua mode lokal; verifikasi preview Vercel tetap pending.
- SEO-03 metadata seluruh tipe halaman diperbaiki lokal; cache/preview platform social eksternal belum dites.
- SEO-19 dinormalisasi dan diuji source, optimizer, dan redirect lokal.
- SEO-05 tetap menunggu laporan GSC. SEO-01/02 (WebSite/favicon), performance, kontras/dialog, dan konten tetap pada phase relevan berikutnya. Tidak ada schema/branding baru yang ditambahkan pada Phase 2 ini.

## Referensi resmi

- [Next.js generateMetadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Next.js sitemap](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)
- [Next.js headers](https://nextjs.org/docs/app/api-reference/config/next-config-js/headers)
- [Next.js dynamicParams](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams)
- [Vercel X-Robots-Tag](https://vercel.com/docs/headers/response-headers#x-robots-tag)
- [Google robots meta directives](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag)

Dokumentasi Next online dapat menampilkan minor release yang lebih baru. Implementasi divalidasi melalui build dan type definitions Next 16.1.6 yang benar-benar terpasang.
