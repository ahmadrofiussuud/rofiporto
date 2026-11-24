# Phase 7 — External tools guide

24 November 2026. Domain/hosting tetap, budget Rp0. Situs production masih checkpoint Phase 3; Phase 4–6 ada di working tree lokal. Phase ini tidak deploy. Dokumentasi 01–15, issue register, implementation log, metadata/robots/sitemap dan penanda analytics ditinjau. Data akun yang awalnya belum tersedia ternyata dapat dibuka lewat sesi browser yang sudah login; tidak meminta password/cookie/token dan tidak menyimpan identitas akun privat dalam laporan.

## Hasil yang benar-benar dilakukan

| Tool / URL / tanggal | Hasil aktual | Rekomendasi / batas |
|---|---|---|
| GSC URL-prefix https://rofiporto.vercel.app/; 24 Nov | Verified owner, HTML tag; sitemap Success, 36 discovered; beranda indexed dan live test available; laporan 17 | Pertahankan property/token. Tidak submit ulang sitemap yang sudah Success |
| HTTP /, /robots.txt, /sitemap.xml; 24 Nov | Semua 200; token verifikasi ditemukan; robots allow /; 36 URL sitemap | Ini akses HTTP, bukan bukti seluruh URL indexed |
| [Rich Results Test beranda](https://search.google.com/test/rich-results/result?id=zgV2pZ0jRW9f-hOqxdIGsw); 24 Nov 22:40 tampilan UI | Crawled successfully, Profile page 1 valid item | Hasil untuk production lama, bukan graph Phase 4 lokal. Eligibility bukan jaminan tampilan rich result |
| [Schema Validator beranda](https://validator.schema.org/#url=https%3A%2F%2Frofiporto.vercel.app%2F); 24 Nov | ProfilePage + nested Person, 0 error, 0 warning | Semantik Schema.org berbeda dari eligibility Google. Ulangi setelah deployment Phase 4 |
| W3C Nu: /, /about, /projects/amora; 24 Nov | API resmi HTTP 200: 0 error/warning pada ketiganya; ada info tentang trailing slash pada void elements | Info dicatat, bukan diklaim messages kosong. Cek ulang setelah deploy; bukan kelulusan SEO/a11y penuh |
| PSI API beranda mobile; 24 Nov | 429 RESOURCE_EXHAUSTED, tidak ada field metric | Gunakan UI gratis; jangan menyamakan quota error dengan situs lambat |
| Lighthouse production beranda mobile/desktop; 24 Nov | Hasil numerik ditambahkan di bagian bawah setelah run selesai; raw JSON phase7-production-* | Satu lab run per perangkat, bukan INP field atau hasil lokal Phase 5 |
| Screaming Frog free; 24 Nov | Tidak ditemukan pada dua lokasi instalasi standar; tidak dijalankan | Belum membuktikan tidak ada instalasi di lokasi lain. Checklist manual di bawah; crawler internal bukan hasil Screaming Frog |
| Bing; 24 Nov | Landing page Sign In; dashboard belum tersedia | Pemilik login/import dan memeriksa laporan sesuai panduan |

Bukti: `evidence/phase7-public-tools.json`, `phase7-dashboard-observations.json`, ZIP/CSV GSC, dan JSON Lighthouse. Pengujian publik hanya mengirim URL publik ke layanan validator yang diminta; tidak mengirim data klien atau kredensial.

## A. Google Search Console: langkah berurutan

Mulai di [Search Console](https://search.google.com/search-console). Pilih **URL-prefix https://rofiporto.vercel.app/** yang sudah ada, bukan membuat property baru atau mencoba verifikasi seluruh vercel.app.

1. **Ownership:** Settings → Ownership verification. Kondisi sesi ini “You are a verified owner”, HTML tag “Successfully verified”. Cocokkan token pada rendered head; pertahankan verifikasi lama. Jangan menghapus token/property/user.
2. **Sitemap:** Indexing → Sitemaps → /sitemap.xml. Catat submitted, last read, status dan discovered. Saat ini submitted 17 Nov, last read 24 Nov, Success, 36 halaman.
3. **Submit hanya jika belum ada:** pastikan https://rofiporto.vercel.app/sitemap.xml HTTP 200 dan XML valid, lalu isikan `sitemap.xml` pada kolom suffix dengan prefix situs dan Submit. Bila sudah Success, jangan spam resubmit. Jika Couldn't fetch muncul, catat detail/tanggal, uji HTTP/robots, periksa host/protocol dan coba lagi setelah masalah nyata selesai. Tidak submit pada sesi ini.
4. **Page Indexing:** Indexing → Pages, pilih scope All known pages atau sitemap yang sama, catat last update, indexed, not indexed dan reasons. Jangan samakan jumlah sitemap dengan indexed.
5. **Reason drilldown:** klik alasan → contoh URL → URL Inspection. 404/redirect/noindex yang memang disengaja tidak harus dipaksa indexed. Untuk crawled/discovered currently not indexed, evaluasi konten/internal links/canonical dan waktu crawl; bukan otomatis hukuman. Validate fix hanya jika masalah yang relevan memang diperbaiki.
6. **URL Inspection:** masukkan URL lengkap pada kolom atas. Simpan status, last crawl, crawler, fetch dan indexing allowed. Root sesi ini “URL is on Google”. Pemeriksaan URL individual lebih sesuai untuk menjawab status URL itu daripada angka agregat lama.
7. **Canonical:** expand Page indexing pada hasil **Google Index**, bandingkan user-declared dengan Google-selected. Root user canonical https://rofiporto.vercel.app/; Google “Inspected URL”. Root canonical tanpa slash pada head dan / pada inspector menunjuk homepage yang sama; jangan membuat redirect berantai karena perbedaan representasi root ini.
8. **Live URL Test:** klik Test live URL → tunggu selesai → View tested page untuk HTML/screenshot/resource. Hasil root sesi ini available/Page can be indexed. Live test tidak menentukan pilihan canonical Google atau menjamin indexing.
9. **Request indexing:** hanya URL penting yang baru/berubah substansial dan **sudah live**, setelah live test/metadata benar. Prioritas setelah deployment disetujui: /about, /projects/amora, /projects/tehmbois-wcc, /projects/pelatihan-ar-sdn-3-dono dan beranda bila sinyal identitasnya berubah. Tidak request sekarang karena perubahan Phase 4–6 belum tayang; root sudah indexed. Ikuti kuota, bukan submit 36 URL berulang atau menekan Request again tanpa kebutuhan.
10. **CWV:** Experience → Core Web Vitals → mobile/desktop. Catat source, last updated, URL/origin/group, periode dan p75 jika ada. Saat ini insufficient data kedua perangkat, update 23 Nov. LCP/INP/CLS kosong, bukan 0 atau passed. TBT Lighthouse tidak menggantikan INP.
11. **Manual Actions/Security:** buka kedua laporan terpisah. Keduanya “No issues detected” pada sesi ini; ini bukan audit keamanan aplikasi penuh.
12. **Links:** catat external/internal/top linking sites/pages/text dan tanggal. Saat ini total 0/No data. Itu keadaan laporan, bukan bukti web tidak punya tautan; HTML internal links ada.
13. **Export Performance:** pilih Search type yang sama (sesi ini Web text-based), pilih 28 days, aktifkan clicks/impressions/CTR/position, lalu Export → Download CSV (ZIP). Simpan Filters, Chart, Queries, Pages, Devices, Countries, Search appearance. Untuk **90 hari tepat**, More → Custom dan pilih rentang inclusive 90 hari, jangan menganggap 3 calendar months selalu 90 hari. Pada sesi ini diuji 25 Agustus–22 November 2026. Untuk perbandingan, gunakan rentang sebelumnya yang sama panjang dan hindari data preliminary. Simpan negara/device/search type/filter yang sama.

GSC memakai tanggal pelaporan layanannya; catat batas tanggal yang diekspor, jangan menggeser harian menjadi WIB tanpa sumber. ZIP 28 hari berhasil diunduh; data tersedia hanya 16–22 Nov. User menyatakan export sebelumnya belum tersedia; panduan tetap disediakan. Jendela custom 90 hari diperiksa UI, belum diunduh ZIP terpisah. Sebelum memberi kesimpulan tren, butuh history pembanding yang memang tersedia, bukan mengisi masa sebelum property dengan nol.

## B. Checklist validator gratis

- [PageSpeed Insights](https://pagespeed.web.dev/): masukkan URL production, Analyze mobile dan desktop, simpan link/tanggal/field availability. Pisahkan URL field dari origin fallback dan lab. Jika data tidak cukup, tulis insufficient data.
- [Rich Results Test](https://search.google.com/test/rich-results): test beranda, /about dan satu detail setelah deploy. Simpan URL hasil/type/error/warning; Code mode bisa menguji HTML lokal tanpa mengklaim URL production sudah berubah. Jangan mengirim HTML yang mengandung rahasia.
- [Schema Markup Validator](https://validator.schema.org/): fetch URL atau kode JSON-LD publik, simpan jumlah tipe/error/warning. Tidak semua tipe Schema.org punya rich result Google.
- Lighthouse: Chrome DevTools → Lighthouse, navigation/mobile atau desktop, simpan JSON. Metode CLI phase ini memakai Lighthouse 12.8.2, Chrome headless, masing-masing satu run URL production. Jangan membandingkan cold/warm/server/perangkat berbeda sebagai efek kode tunggal.
- [Screaming Frog free](https://www.screamingfrog.co.uk/seo-spider/): pemilik instal versi resmi gratis bila diinginkan. Mode Spider, URL https://rofiporto.vercel.app/, Start. Batas gratis 500 URL; resource/variasi URL dapat ikut menghabiskan batas meski hanya ada 36 halaman. Gunakan HTML crawling yang tersedia dalam edisi gratis; tidak meminta lisensi/JavaScript rendering berbayar. Review Internal HTML, Response Codes, canonicals, titles/descriptions, H1/H2, Images, inlinks/outlinks. Export tabel yang tersedia. Catat apakah crawl mentok limit; jangan menyebutnya full crawl jika limit tercapai.
- [W3C Nu HTML Checker](https://validator.w3.org/nu/): masukkan URL, simpan hasil. Endpoint reproduksi misalnya `https://validator.w3.org/nu/?doc=https%3A%2F%2Frofiporto.vercel.app%2F&out=json`. Uji metadata/DOM tetap perlu terpisah dari validasi schema.

## C. Bing Webmaster Tools

1. Pemilik buka [Bing Webmaster Tools](https://www.bing.com/webmasters/), login sendiri; saat diperiksa sesi ini hanya landing Sign In. Tidak membuat akun atau menerima grant akses atas nama pemilik.
2. Jika **Import from Google Search Console** tersedia, pilih akun/property yang benar, baca scope akses dan pilih hanya situs ini. Import memberi Bing akses ke informasi GSC; pemilik memutuskan grant. Alternatif Add site manual URL dan metode verifikasi yang tersedia. Jangan mencoba DNS vercel.app yang bukan domain milik pemilik.
3. Pertahankan property bila ternyata sudah ada. Setelah verified, Sitemaps → submit https://rofiporto.vercel.app/sitemap.xml hanya jika belum terdaftar. Catat fetch dan discovered.
4. URL Inspection beranda dan satu proyek, catat indexing/crawl/SEO warnings. Jalankan Site Scan atau laporan SEO yang tersedia gratis, simpan report/tanggal; accepted submission bukan ranking.
5. **IndexNow:** layak secara teknis untuk Next static/SSG dengan public key file dan proses post-deploy yang hanya mengirim canonical URL yang berubah. Situs kecil/jarang berubah cukup dimulai dengan sitemap; belum perlu menambah endpoint/paket/key/automation saat ini. Jika nanti diaktifkan, hanya setelah deployment sukses, verifikasi host/key, deduplikasi dan catat response; HTTP 200 berarti diterima, bukan pasti indexed. Jangan mengirim preview/localhost.
6. **Google Indexing API tidak digunakan:** halaman portfolio bukan JobPosting atau livestream BroadcastEvent yang memenuhi cakupannya.

## D. Analytics dan privasi

Pencarian source/package serta HTML production tidak menemukan GA4/GTM/Vercel Analytics/Plausible marker yang lazim. Dashboard Vercel/GA belum diaudit; tidak mengklaim tidak ada metrik server-side. **Tidak memasang tracking baru** agar tidak menggandakan setup tak terlihat. Untuk pencarian organik, GSC sudah cukup menjadi sumber awal gratis.

Jika pemilik memilih GA4 gratis: audit ID/property/data stream yang sudah ada melalui [Google Analytics](https://analytics.google.com/), pilih satu jalur pemasangan (direct tag atau GTM), satu page_view per initial/navigation; hindari history enhanced measurement + manual router event sekaligus. Verifikasi DebugView/Realtime dan network setelah consent yang diperlukan. Tinjau disclosure/consent sesuai pengunjung dan penggunaan; tidak membuat kesimpulan hukum universal atau menambah banner/tracking tanpa keputusan.

| Event usulan (belum diimplementasikan) | Parameter aman | Catatan |
|---|---|---|
| page_view | pathname canonical tanpa query pribadi | Pastikan hanya sekali per navigasi |
| project_demo_click | slug, link_domain | Bisa map dari outbound click bawaan; jangan kirim event duplikat |
| project_repository_click | slug, link_domain | Hanya repo publik |
| contact_click | method (email/linkedin), placement | Niat menghubungi, bukan successful lead |
| certificate_open | item identifier publik | Jangan kirim isi sertifikat/nama pribadi pengunjung |
| project_filter | kategori | Tidak merekam teks pencarian bebas yang bisa mengandung PII |

Jangan mengirim email, nomor telepon, input formulir, IP manual, session replay atau data rahasia ke parameter. Event bukan pengganti data GSC dan bukan sinyal yang dijanjikan menaikkan ranking.

## E. Sumber dan operasional monitoring

[Ownership](https://support.google.com/webmasters/answer/7687615), [URL Inspection](https://support.google.com/webmasters/answer/9012289), [Performance data](https://support.google.com/webmasters/answer/17011364), [Bing import](https://www.bing.com/webmasters/help/add-and-verify-site-12184f8b), [Bing sitemap](https://www2.bing.com/webmasters/help/sitemaps-3b5cf6ed), [IndexNow](https://www.indexnow.org/documentation), [Google Indexing API scope](https://developers.google.com/search/apis/indexing-api/v3/using-api), [GA4 enhanced measurement](https://support.google.com/analytics/answer/9216061).

Template CSV 19 menggunakan UTF-8 dan blank untuk unknown. Satu row adalah satu grain/dimensi, periode dan sumber. CTR = clicks/impressions ×100 bila impressions >0, jangan merata-ratakan CTR baris; average position mengikuti GSC aggregation, bukan rata-rata posisi pages sembarangan. Review manual mingguan sesudah deployment dan bulanan setelah stabil; tidak membuat scheduled automation. Anotasi SHA/deploy/tanggal perubahan, bedakan lab dengan field, jangan mengklaim kausalitas dari sampel kecil.

## Lighthouse production aktual — 24 November 2026

| Device | Performance | SEO | Accessibility | Best Practices | LCP s | FCP s | Speed Index s | TBT ms | CLS | Page KiB |
|---|---|---|---|---|---|---|---|---|---|---|
| Desktop | 100 | 100 | 96 | 100 | 0.51 | 0.27 | 0.45 | 0.0 | 0.000 | 460.4 |
| Mobile | 99 | 100 | 96 | 100 | 2.12 | 0.93 | 1.28 | 32.5 | 0.000 | 380.9 |

URL: https://rofiporto.vercel.app/ . Run terpisah berurutan, tidak bersamaan dengan pengujian CUA. Raw phase7-production-mobile.json dan phase7-production-desktop.json. Hasil ini production Phase 3, bukan hasil deployment Phase 4–6 atau bukti peningkatan kausal terhadap Phase 5 lokal. Tidak memasukkan metrik lab ini ke kolom p75 field pada CSV.

## Verifikasi dokumentasi Phase 7

Template CSV divalidasi 27 kolom dan 9 observasi aktual (property/page/device/country, tidak boleh dijumlahkan lintas grain); field p75 unknown kosong. Script eksternal lolos Node syntax check. Lint Phase7 dijalankan, bukti phase7-lint.log. Tidak ada kode website/dependency/tracking yang diubah pada phase ini, sehingga tidak menjalankan build ulang yang tidak diperlukan; hasil build Phase6 tetap bukti phase berbeda. Tidak ada klaim peningkatan ranking atau otomatisasi monitoring aktif.
