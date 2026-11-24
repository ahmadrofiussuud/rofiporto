# Phase 5 — Performance, mobile & image SEO

Tanggal: 24 November 2026. Implementasi dan benchmark build production lokal (Next 16.1.6, `VERCEL_ENV=production`, `next start`, port 3101), **belum dipush atau deployed**. Baseline mencakup Phase 4 lokal, bukan hanya versi production publik Phase 3. Tidak mengganti domain, hosting, desain atau animasi penting.

## Metode dan hasil sebelum/sesudah

Lighthouse 12.8.2, Chrome lokal headless, mobile default simulated throttling, desktop preset. Dua route dipilih: beranda dan pencapaian yang sebelumnya memiliki gap LCP. Build bukan dev server. JSON lengkap menyimpan versi browser, hardware/configuration, timestamp, request dan audit detail. Satu pasangan run utama per route/perangkat bukan eksperimen statistik atau hasil seluruh 36 route. Ada aktivitas mesin/browser lain pada sesi ini; perubahan kecil dan TBT dapat berfluktuasi. Tidak mengklaim peningkatan yang berada dalam noise pengukuran.

| Route | Device | Kondisi | Perf | SEO | A11y | BP | LCP s | FCP s | SI s | CLS | TBT ms | Total KiB | JS transfer KiB |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| home | mobile | before | 96 | 100 | 96 | 100 | 2.83 | 0.91 | 0.91 | 0.000 | 33 | 382.7 | 141.3 |
| home | mobile | after | 93 | 100 | 96 | 100 | 2.89 | 0.92 | 1.59 | 0.000 | 165 | 383.0 | 141.3 |
| home | desktop | before | 100 | 100 | 96 | 100 | 0.62 | 0.25 | 0.30 | 0.000 | 0 | 463.7 | 215.4 |
| home | desktop | after | 100 | 100 | 96 | 100 | 0.62 | 0.25 | 0.33 | 0.000 | 0 | 444.6 | 196.0 |
| competitions | mobile | before | 89 | 100 | 96 | 100 | 3.37 | 0.91 | 1.16 | 0.000 | 205 | 647.4 | 208.3 |
| competitions | mobile | after | 92 | 100 | 96 | 100 | 3.30 | 1.45 | 1.48 | 0.000 | 50 | 572.8 | 194.9 |
| competitions | desktop | before | 100 | 100 | 96 | 100 | 0.70 | 0.25 | 0.33 | 0.000 | 0 | 1122.3 | 209.4 |
| competitions | desktop | after | 99 | 100 | 96 | 100 | 0.86 | 0.27 | 0.53 | 0.000 | 57 | 699.9 | 196.0 |

Total adalah transfer halaman yang benar-benar diamati Lighthouse, termasuk prefetch, bukan jumlah byte seluruh public/. JS transfer berbeda dari ukuran decoded dan ukuran semua chunk. Detail decoded tersedia pada `phase5-performance-summary.json`; seluruh chunk final beserta gzip/Brotli hasil perhitungan ada pada `phase5-bundle-cache.json`. Kompresi hitungan lokal bukan ukuran transfer yang diklaim terjadi di jaringan.

## Penyebab yang terukur dan perubahan

1. **SEO-07 / responsive image oversizing.** Baseline pencapaian mobile mengestimasi 137 KiB pemborosan gambar. `100vw` pada kartu sebenarnya selebar viewport dikurangi shell/padding memilih varian 750px. `sizes` diperbaiki mengikuti shell, kolom, padding dan batas maksimum kartu. Modal dibatasi 896px. Detail hero sebelumnya tanpa sizes; sekarang mengikuti lebar konten maksimum 856px. MdxImage sebelumnya mengiklankan 33vw meski tampil lebar, kini mengikuti konten 856px. Portrait dan kartu proyek juga memakai perhitungan lebar/layout yang lebih sesuai. Image fit/rasio dan cover tidak diubah.
2. **JavaScript.** Framer Motion hanya diperlukan untuk modal pencapaian. Mengganti motion dengan m + LazyMotion/domAnimation mengurangi fitur yang masuk bundle sambil mempertahankan backdrop fade, spring/scale/y, dan exit. Tidak menghapus animasi pembuka/hover yang penting. MdxImage tidak memakai hook/event; boundary use client dihapus agar wrapper dapat dirender di server. Interaksi filter/modal tetap client, route/content tetap static/SSG. Tidak menambahkan dependency atau mematikan script framework.
3. **Mobile accessibility.** Tombol tutup modal minimal 44×44px. Warna badge amber/sky/orange/emerald mode terang digelapkan setelah audit menunjukkan contrast 2.8 untuk label kecil; warna identitas dan mode gelap dipertahankan. Skor 96 pada beranda masih memiliki angka dekoratif work-number berkontras rendah; tidak diklaim seluruh WCAG lulus.

## Image audit menyeluruh

- Inventaris 98 aset raster public dengan ukuran file, format dan dimensi: `phase5-image-inventory.json`. SVG/icon dan dokumen PDF bukan raster; tidak dikonversi sembarangan. Nama URL lama dan berkas asli dipertahankan agar tautan sertifikat tidak rusak.
- Semua 36 HTML diperiksa: 110 elemen gambar, semua mempunyai alt dan sizes atau dimensi. 73 sumber lokal unik mengembalikan HTTP 200; seluruh 73 varian optimizer diuji 640px quality 75 dengan Accept image/webp dan mengembalikan WebP 200. Bukti: `phase5-image-render-audit.json`.
- Next Image sudah menyajikan WebP sesuai negosiasi Accept. Tidak mengubah semua sumber menjadi lossy WebP atau menambahkan AVIF tanpa bukti manfaat/biaya encoding. Resolusi sertifikat asli tetap tersedia, transparansi portrait dipertahankan. Crop/object-contain cover yang sebelumnya diminta pemilik tetap sama.
- Kartu di luar viewport memakai lazy loading bawaan Next Image; hero utama/detail tetap prioritas. Gambar placeholder memakai teks, dekorasi memakai CSS/aria-hidden, bukan alt keyword. Alt sertifikat dan tampilan proyek dibuat deskriptif; foto profil memakai nama pemilik. Tidak ada keyword stuffing.
- Container hero/kartu/MDX memiliki rasio/aspect ratio tetap sehingga ruang disiapkan sebelum unduhan. Tidak menghapus konten penting di mobile. Image src/srcset terdapat di HTML server, dapat ditemukan crawler.

## Font, dependencies, caching dan compression

Geist/Geist Mono memakai next/font, disajikan lokal dari /_next/static/media, fallback dan font-display swap sudah tersedia. Dua font request terlihat pada run. Tidak menambahkan Google Fonts runtime atau preload semua gambar. LCP kandidat mobile pada baseline adalah teks: brand beranda dan page-summary pencapaian, dengan render delay sekitar 84%/86%; bukan alasan mem-preload semua sertifikat. Font/CSS dan kerja rendering masih perlu profiling lebih lanjut untuk LCP mobile.

Audit import: halaman/layout/content utama server; Navbar/theme, grid pencarian dan filter/modal adalah client untuk interaksi yang diperlukan. Paket GSAP/OGL dan komponen visual lama tidak dihapus hanya karena ada di package.json; keberadaan dependency tidak sama dengan byte yang dimuat route. Lighthouse mencatat unused JS, termasuk runtime/framework; pengurangan lebih lanjut tidak dilakukan dengan mematikan hydration/prefetch global tanpa pembuktian UX. Tidak ada analytics/third-party script baru.

Header aktual dicatat di `phase5-bundle-cache.json`: produksi publik HTML must-revalidate + Vercel HIT, JS hash immutable setahun, Brotli; lokal next start HTML/JS gzip. Tidak menambahkan cache panjang pada HTML yang dapat menyimpan metadata lama. Original public image memakai kebijakan default; varian optimizer cache diperiksa per sumber. Tidak menyamakan cache localhost dengan CDN Vercel.

## Mobile dan regresi

CUA berhasil tersedia kembali pada sesi Phase 5. Enam halaman (`/`, `/about`, `/projects`, `/competitions`, `/contact`, `/projects/kelasin`) diperiksa pada viewport 390, 768 dan 1440px; pemeriksaan tambahan build final pada 320 dan 480px. Semua scrollWidth <= innerWidth (selisih 15px scrollbar), tidak ada horizontal overflow pada sampel. Semua gambar yang telah selesai dimuat pada sampel tidak rusak dan tidak ada missing alt. Ini bukan jaminan setiap kondisi semua browser.

Pemeriksaan visual aktual: beranda mobile/desktop setelah animasi selesai, Kelasin tablet dengan banner utuh, kartu Kelasin mobile mode terang/gelap, dan modal HOLOGY mobile object-contain. Menu mobile buka -> Karya menutup menu dan berpindah; pencarian kelasin menghasilkan satu karya; filter Brand Ambassador menampilkan dua item; modal terbuka dengan fokus tombol tutup; Tab tertahan di dialog, Escape menutup dan mengembalikan fokus ke pemicu. Console error yang dicatat pada sesi browser kosong. Tidak ada baseline screenshot otomatis pixel-diff atau pengujian pada perangkat fisik; tidak mengklaim keduanya dijalankan.

Build final, lint dan typecheck lulus (log phase5-*). SEO smoke final 36 halaman/789 pemeriksaan lulus; entity smoke 469 lulus; image audit 73 sumber/optimized WebP lulus. Diagnostic NoFallbackError pada negative slug tetap diketahui dari Phase 2; HTTP 404/noindex lulus. Tidak mengklaim log server sepenuhnya bersih.

## Target CWV dan batas hasil

- CLS lab tetap 0 pada keempat pasangan; tidak ada peningkatan layout shift yang terukur.
- LCP desktop <2.5s. **LCP mobile masih di atas 2.5s**; target belum tercapai, SEO-06 tetap terbuka. Pengurangan payload tidak otomatis memperbaiki kandidat LCP teks.
- **INP field belum tersedia.** API resmi PSI mencoba diakses pada phase ini tetapi HTTP 429; bukti `phase5-field-attempt.json`. Minta laporan GSC Core Web Vitals/PSI CrUX bila tersedia. TBT adalah metrik lab blocking, bukan INP dan bukan bukti INP <=200ms. Kepatuhan CWV memerlukan p75 field mobile/desktop, bukan satu Lighthouse run.
- Tidak menyatakan skor localhost sebagai skor production terbaru, atau menjamin ranking. Phase 4/5 belum deployed; setelah persetujuan deployment ulangi uji produksi dan pantau field data.

## Prioritas berikutnya

1. Profiling font/text LCP dan CPU pada mobile dengan trace terisolasi, termasuk pengukuran berulang; hindari mengganti font/animasi demi skor tanpa bukti.
2. Ambil data CrUX/GSC untuk INP/LCP/CLS, bila sampel mencukupi; catat insufficient data jika memang tidak ada.
3. Setelah deployment disetujui, ulangi smoke dan Lighthouse URL produksi. Evaluasi badge lain/dekorasi serta perangkat fisik tanpa redesign.

## Acuan resmi

[Next Image](https://nextjs.org/docs/app/api-reference/components/image), [Next font](https://nextjs.org/docs/app/api-reference/components/font), [Google Web Vitals dan ambang p75](https://web.dev/articles/vitals), [Lighthouse performance scoring](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring).

## Run tambahan karena variasi TBT beranda

Run utama dipertahankan di atas; tidak memilih skor terbaik untuk menggantinya. Run ulang ini menguji ketidakstabilan lab, bukan membuktikan kausalitas perubahan kode. Aktivitas mesin tidak sepenuhnya terisolasi.

| File | Performance | LCP s | TBT ms | CLS |
|---|---|---|---|---|
| phase5-after-home-mobile-repeat2.json | 74 | 2.93 | 928 | 0.000 |
| phase5-after-home-mobile-repeat3.json | 95 | 2.93 | 45 | 0.000 |

## Integritas run dan acceptance criteria

Run pencapaian yang bertepatan dengan aktivitas pengujian disimpan sebagai `phase5-exploratory-competitions-{mobile,desktop}.json` (performance 88/96, LCP 3.94/0.85s). Run utama pencapaian pada tabel adalah pengukuran berikutnya tanpa pengujian CUA bersamaan, bukan angka terbaik yang dipilih. Run beranda repeat2 juga sempat beririsan dengan akhir run desktop; TBT 927.5ms menunjukkan noise/contending workload dan tetap dilaporkan. Run repeat3 beranda performance 95 dengan TBT 45ms. Tidak ada klaim statistik median atau causal improvement dari dataset ini.

Perbandingan, build/lint/typecheck, broken image checks, CLS dan sampel fungsi/visual telah diperiksa. **Acceptance performa belum sepenuhnya terpenuhi:** target LCP mobile belum tercapai dan tidak semua skor/waktu membaik. Beranda run utama performance turun 96 ke 93, LCP 2.83 ke 2.89s; repeat3 score 95 dan LCP 2.93s. JS transfer beranda mobile hampir sama dan payload naik sekitar 0.3KiB. Karena variasi mesin, data belum cukup untuk menyatakan regresi kode kausal maupun memastikan tidak ada regresi performa. CLS tetap 0 dan tidak ada regresi fungsi/visual yang ditemukan pada sampel yang benar-benar diuji. Jangan menandai SEO-06 selesai hanya karena payload turun.

Seluruh 16 emitted JS chunks final berjumlah 746151 byte mentah, 235360 byte gzip dan 205278 byte Brotli (perhitungan lokal). Ini mencakup semua chunk hasil build, bukan initial bundle tiap halaman; byte per route yang benar-benar dimuat ada pada tabel dan summary JSON.
