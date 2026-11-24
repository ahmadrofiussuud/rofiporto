# Phase 4 — Structured data dan branding validation

Tanggal: 24 November 2026. Kondisi: build production lokal, bukan deployment Phase 4.

## Pengujian aktual

| Pemeriksaan | Hasil |
|---|---|
| Next.js production build | Lulus; 36 halaman konten tetap static/SSG |
| npm run lint | Lulus, exit 0 |
| npm run typecheck | Lulus, exit 0 |
| SEO regression smoke | 36 halaman, 789 pemeriksaan lulus |
| Entity smoke | 36 halaman, 469 pemeriksaan lulus |
| Social image | HTTP 200, PNG 1200×630; diperiksa visual utuh |
| favicon.ico dan apple-icon.png | HTTP 200, image content type |
| Phase 3 production setelah deployment | 36 halaman, 789 pemeriksaan lulus |

Bukti: `evidence/phase4-seo-smoke.json`, `evidence/phase4-entity-smoke.json` (termasuk seluruh graph aktual), `evidence/phase4-social.png`, `evidence/phase3-production-deployed.json`. Entity runner: `node scripts/entity-smoke.mjs [base-url]`. SEO runner: `node scripts/seo-smoke.mjs --base-url http://127.0.0.1:3101`.

Entity test memeriksa parsing JSON, satu graph, ID unik, nama/ID pemilik stabil, relasi publisher/afiliasi, cakupan ProfilePage, breadcrumb canonical/posisi/navigasi terlihat, batasan award dan tidak adanya data sensitif maupun Article/SoftwareApplication yang belum didukung. Ini assertion proyek, bukan validator seluruh vocabulary Schema.org. Bukti sertifikat dan validitas konten diperiksa terpisah.

## Branding

Nama situs WebSite dan og:site_name disamakan dengan nama lengkap. Logo favicon bawaan diganti monogram M berwarna identitas situs, dibuat sebagai aset kode melalui `scripts/generate-brand-icons.py`, tanpa layanan berbayar. ICO berisi beberapa ukuran termasuk 48px dan 256px; Apple icon 180px. Aset publik stabil pada /favicon.ico dan /apple-icon.png.

Gambar sosial default dibuat dengan Next ImageResponse pada /branding/opengraph-image. Tidak mengganti cover proyek yang sudah tersedia. Tidak ada watermark atau metadata vendor yang ditambahkan; hostname Vercel tetap domain canonical yang diminta pemilik. Tulisan “Vercel” pada screenshot Google historis kemungkinan akibat pilihan site name/favicon oleh Google ketika sinyal brand awal belum lengkap; penyebab tepat tidak dapat dipastikan dari screenshot. Hosting Vercel sendiri tidak berarti nama situs wajib Vercel.

## Pemeriksaan belum dijalankan / keterbatasan

- Rich Results Test dan Schema Markup Validator resmi belum dijalankan. Kirim URL setelah Phase 4 deployed atau masukkan rendered JSON-LD sebagai kode. Catat tanggal, hasil deteksi, error/warning dan eligibility; jangan menyamakan local smoke dengan hasil resmi.
- Pemeriksaan interaksi browser/keyboard/visual lintas viewport belum diulang: automatic approval review sebelumnya menolak CUA karena usage limit. Tidak digantikan dengan klaim pengujian visual penuh. Gambar sosial lokal diperiksa memakai image viewer.
- Field CWV, data Search Console, perubahan site name Google dan Knowledge Panel tidak diuji/dijanjikan. Phase ini tidak melakukan benchmark Lighthouse baru.
- Preview guard tidak diubah; rebuild preview khusus Phase 4 belum dijalankan. Tes preview Phase 2 terdokumentasi terpisah.
- Diagnostic NoFallbackError pada negative slug test tetap merupakan catatan Phase 2; respons 404/noindex sudah diuji, bukan klaim log sepenuhnya bersih.

## Acuan dan validasi eksternal

[Google site names](https://developers.google.com/search/docs/appearance/site-names), [favicon](https://developers.google.com/search/docs/appearance/favicon-in-search), [Next ImageResponse](https://nextjs.org/docs/app/api-reference/functions/image-response), [Rich Results Test](https://search.google.com/test/rich-results), [Schema Markup Validator](https://validator.schema.org/).
