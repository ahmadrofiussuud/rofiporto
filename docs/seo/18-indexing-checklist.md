# Phase 7 — Indexing & manual operations checklist

24 November 2026. Status **Done** berarti benar-benar diperiksa; Pending bukan hasil gagal. URL-prefix existing dipertahankan. Tidak menambah akun/tracker, deploy atau request indexing pada sesi ini.

| ID | Status / pemilik | Pekerjaan dan URL dashboard resmi | Bukti/tindak lanjut |
|---|---|---|---|
| M01 | Done — sesi browser | [GSC ownership](https://search.google.com/search-console/ownership?resource_id=https%3A%2F%2Frofiporto.vercel.app%2F) | Verified HTML tag. Pertahankan token; jangan membuat ulang property |
| M02 | Done — sesi browser | [Sitemaps](https://search.google.com/search-console/sitemaps?resource_id=https%3A%2F%2Frofiporto.vercel.app%2F) | Success, 36 discovered, last read 24 Nov; resubmit tidak diperlukan |
| M03 | Done report; URL lain pending | [Page Indexing](https://search.google.com/search-console/index?resource_id=https%3A%2F%2Frofiporto.vercel.app%2F) | Report update 16 Nov, 4 crawled currently not indexed; root inspection indexed. Tinjau tiga contoh proyek, jangan simpulkan seluruh situs deindexed |
| M04 | Done root | [URL Inspection melalui GSC](https://search.google.com/search-console?resource_id=https%3A%2F%2Frofiporto.vercel.app%2F) → kolom Inspect URL | Root indexed; canonical Google sesuai inspected URL, fetch/indexing allowed. Detail di 17 |
| M05 | Done root | URL Inspection → Test live URL | Root available/Page can be indexed. Tidak menjamin canonical/indexing semua route |
| M06 | Pending deployment & kebutuhan | URL Inspection → Request indexing | Setelah Phase 4–6 benar-benar live: /about, /projects/amora, /projects/tehmbois-wcc, /projects/pelatihan-ar-sdn-3-dono, root bila berubah substansial. Jangan request localhost/preview/tiap hari tanpa perubahan |
| M07 | Done status; metrics unavailable | [Core Web Vitals](https://search.google.com/search-console/core-web-vitals?resource_id=https%3A%2F%2Frofiporto.vercel.app%2F) | Insufficient data mobile/desktop, bukan passed atau zero; ulangi saat sampel mencukupi |
| M08 | Done | [Manual Actions](https://search.google.com/search-console/manual-actions?resource_id=https%3A%2F%2Frofiporto.vercel.app%2F) | No issues detected |
| M09 | Done | [Security Issues](https://search.google.com/search-console/security-issues?resource_id=https%3A%2F%2Frofiporto.vercel.app%2F) | No issues detected |
| M10 | Done; report limited | [Links](https://search.google.com/search-console/links?resource_id=https%3A%2F%2Frofiporto.vercel.app%2F) | Total 0 external/internal, no detail; bukan bukti tidak ada tautan |
| M11 | Done 28d; 90d UI observed; comparison pending | [Performance](https://search.google.com/search-console/performance/search-analytics?resource_id=https%3A%2F%2Frofiporto.vercel.app%2F) | 28d ZIP tersedia. Simpan export 90d dan pembanding bila history tersedia; Queries kosong, branded/non-branded unknown |
| M12 | Pending pemilik | [Bing Webmaster Tools](https://www.bing.com/webmasters/) | Login sendiri, cek existing property, pilih import GSC atau verifikasi manual. Import perlu keputusan akses pemilik. Tidak ada dashboard Bing dibuka pada sesi ini |
| M13 | Pending setelah Bing verified | Bing → Sitemaps → URL Inspection → Site Scan/SEO report | Submit sitemap bila belum ada, catat tanggal/status/errors. Jangan mengasumsikan import otomatis sukses |
| M14 | Evaluated, not implemented | [IndexNow documentation](https://www.indexnow.org/documentation) | Opsional untuk perubahan canonical setelah deploy; belum perlu key/endpoint baru. Tidak menggunakan Google Indexing API pada portfolio |
| M15 | PSI API attempted; UI pending | [PageSpeed Insights](https://pagespeed.web.dev/) | API429. UI mobile/desktop, simpan field URL/origin dan tanggal atau insufficient data. Lighthouse produksi terpisah di 16 |
| M16 | Done production root; expanded tests pending deploy | [Rich Results Test](https://search.google.com/test/rich-results) | 1 valid Profile page. Ulangi /about + detail setelah Phase 4 live, simpan report |
| M17 | Done production root; local graph pending external | [Schema Validator](https://validator.schema.org/) | 0 errors/0 warnings ProfilePage/Person production. Setelah deploy periksa WebSite/Person/ProfilePage/Breadcrumb/CreativeWork sesuai route |
| M18 | Done 3 production samples | [W3C Nu](https://validator.w3.org/nu/) | /, /about, /projects/amora: 0 errors/warnings. Ulangi konten/DOM berubah setelah deploy |
| M19 | Pending pemilik/alat | [Screaming Frog free](https://www.screamingfrog.co.uk/seo-spider/) | Belum dijalankan; free limit500 termasuk resource/variasi. Export Response Codes, Internal HTML, metadata, canonicals, headings, images/inlinks bila tersedia |
| M20 | Evaluated; setup pending decision | [GA4](https://analytics.google.com/) / [Vercel dashboard](https://vercel.com/dashboard) | Source/HTML tidak menunjukkan marker analytics biasa. Audit dashboard sebelum menambah satu tracker; event/consent proposal pada 16, tidak diimplementasikan |
| M21 | Template done; regular review manual | docs/seo/19-monitoring-template.csv | Catat periode/filter/source/grain dan SHA live; jangan menambah dimensi atau metrik kosong sebagai nol |

## Urutan sesudah deployment yang disetujui

1. Catat SHA/waktu/URL production dan phase yang benar-benar ikut deployed.
2. HTTP smoke canonical/robots/sitemap/404 dan periksa rendered HTML berbahasa Indonesia.
3. Jalankan RRT/Schema/W3C pada halaman berubah; catat actual hasil, bukan mengambil ulang hasil production lama.
4. Inspect URL yang berubah; Live Test dahulu bila dibutuhkan, request indexing sekali bila layak. Tunggu proses, tidak mengklaim tanggal indexing pasti.
5. Bandingkan GSC pada periode setara setelah data cukup. Anotasi deployment dan faktor pengganggu; field CWV tetap unavailable jika volume belum cukup.
6. Jika canonical Google berbeda, lihat isi/redirect/internal links/sitemap dan intent sebelum mengubah kode. Jika noindex tak disengaja atau 5xx, tangani penyebab spesifik; jangan memakai request indexing untuk menutupi masalah.

Tidak ada cron/automation baru dibuat. Semua tindakan akun lanjutan tetap memerlukan sesi/akses pemilik dan izin yang sesuai; jangan mengirim kredensial.
