# Phase 8 — Final issue register

24 November 2026, deployed checkpoint fa08c14. Severity menunjukkan dampak/urgensi, bukan kesulitan ranking. Closed berarti kondisi teknis dalam scope tes sudah diperbaiki; tidak menjanjikan efek Google. Tidak ditemukan Critical/High teknis yang masih terbuka pada pemeriksaan ini. Register02 menyimpan sejarah baseline, tabel ini status konsolidasi terakhir.

| ID / severity | Kategori / URL atau file | Status dan bukti aktual | Rekomendasi / validasi berikutnya | Effort / pemilik |
|---|---|---|---|---|
| SEO-01 Medium | Entity, structured-data.ts/root | Closed technical: WebSite live, stable publisher; entity: 469 | Pantau pilihan site name Google setelah recrawl; bukan code fix tambahan sekarang | Review15m / owner |
| SEO-02 Low | Branding, favicon.ico/apple-icon | Closed asset: hash production cocok repo;200 | Pantau favicon Google; jangan mengganti URL terus-menerus | Review15m / owner |
| SEO-03 Medium | Metadata semua36 route | Closed: OG/Twitter/canonical konsisten, smoke791 | Regression bila metadata berubah; cache social eksternal dapat berbeda | Automated / developer |
| SEO-04 Medium | Preview guard/Vercel | Partial: local preview meta/header noindex dan sitemap kosong791 lulus; actual preview protection belum diperiksa | Berikan satu URL preview nyata, uji response/auth/noindex dan canonical; jangan klaim guard lokal sama dengan password protection | 30–60m / owner+developer |
| SEO-05 Medium | GSC baseline | Partial: 28d CSV dan90dUI, data7hari2clicks15impressions | Query/branded split dan pembanding belum tersedia; export periode setara setelah cukup history | 30m/review / owner |
| SEO-06 Medium | /competitions mobile | Open: main LCP3.19s/TBT349ms; repeat2.43s/291ms; baselineTBT170ms | Profiling long tasks/text LCP secara terisolasi; uji beberapa run sebanding dan field jika tersedia. Jangan menghapus animasi tanpa bukti | 2–4h profiling / developer |
| SEO-07 Medium | Image sizes templates | Closed in tested scope: sizes diperbaiki,110 elements/73 sources WebP 200 | Periksa perubahan layout/ukuran baru; original source tetap tersedia | 30m per layout / developer |
| SEO-08 Low | public image originals | Partial:98raster inventory; source besar bukan berarti transfer besar | Jangan kompres lossy massal. Tinjau sumber besar yang benar-benar dimuat atau perlu thumbnail baru | 1–2h bila terukur / developer |
| SEO-09 Medium | Contrast/UI | Partial: teks proses dan badge tertentu diperbaiki; A11y96, masih ada kontras gagal | Audit elemen gagal Lighthouse, light/dark dan assistive tech. FullWCAG belum lulus | 1–2h / developer |
| SEO-10 Medium | Heading/semantic templates | Closed automated: satu H1/no skipped levels semua36; visible breadcrumb | Pertahankan hierarchy saat menambah artikel/konten | Automated / developer |
| SEO-11 Medium | Competitions modal | Closed sampled interaction: Tab trap, Escape/focus return production berfungsi;44px close | Screen reader/background isolation belum full audit; uji bila dialog berubah | 30–60m / developer |
| SEO-12 Medium | Case-study content | Partial:13MDX, attribution/source/bounds dan content: 11 lulus | D1–D9 pemilik: research, keputusan, timeline, outcome dan lessons nyata sebelum ekspansi | 1–2h per case / owner |
| SEO-13 Low | Tiga halaman EM UB | Open editorial: intent dipisahkan dan contextual links ada | Tunggu query/page data sebelum merge/redirect, jangan menyalin isi | 1h setelah data / owner+developer |
| SEO-14 Medium | Dates/claims | Partial: angka60k/>50panitia/dampak tak terukur tertentu dibatasi | Konfirmasi YPS2024/2026, Mawapres2027, labelIPB, peran/stack dan izin materi institusi; jangan mengarang | Bergantung bukti / owner |
| SEO-15 Medium | External validators/field CWV | Partial: RRT about: 2 valid, SchemaValidator: 0 error/warning; field insufficient, PSI429 | Pantau CrUX/GSC; jangan mengganti INP dengan TBT. Validator tidak menjamin rich result | 30m/review / owner |
| SEO-16 Low | External links/profiles | Partial: sumber resmi ditaut; beberapa endpoint menolak bot/login | Verifikasi manual sumber dan ownership URL profesional. Tidak menandai403/999 otomatis broken | 30–60m / owner |
| SEO-17 Low | Hero resource priority | Reviewed: eager portrait dipertahankan, sizes lebih tepat; kandidat LCP tergantung viewport | Sesuaikan fetch priority hanya berdasarkan trace; jangan preload semua gambar | 1h bila terukur / developer |
| SEO-18 High (baseline) | Tiga PDF sertifikasi lama | Closed: legacy308 satu hop menuju gambar200, href diperbaiki | Pertahankan redirects dan source bukti | Automated / developer |
| SEO-19 Medium | Dua apostrophe image paths | Closed: safe names, source/optimizer dan legacyvariants lulus | URL lama tetap redirect; jangan menormalkan semua file tanpa alasan | Automated / developer |
| SEO-20 Medium (new) | /about indexing | Open: Discovered currently not indexed; LiveTestavailable2valid; request ditolakQuotaExceeded | Retry setelah kuota pulih, mulai cek25 Nov sesuai reset layanan; terima antrean bukan jaminan indexed. Jangan bypass kuota/akun | 10–15 m / owner |
| QA-21 Low (new) | Next negative slug diagnostics | Open diagnostic: NoFallbackError pada local logs, HTTP404/noindex tetap benar | Reproduce terisolasi, cek framework/upstream; jangan mengubah status 404 menjadi200 demi log bersih | 1–2h / developer |
| QA-22 Low (new) | Coverage test | Coverage gap: tidak ada unit/pixel suite; native integration dan manual samples lulus | Tambah tes hanya untuk risiko/fitur yang membutuhkannya; jangan mengklaim visual regression otomatis sudah ada | Scoped / developer |

## Deployment risk classification

Tidak ada bukti production diblokir crawl/noindex, canonical salah, route utama gagal atau aset branding tidak sesuai. Risiko terbuka di atas tetap nyata: performance belum konsisten, indexing belum merata, data/fakta belum lengkap dan platform preview belum diverifikasi. Status layak produksi bersyarat bukan klaim seluruh acceptance nonteknis sudah selesai. Tidak melakukan perubahan fitur baru pada Phase 8 untuk menyembunyikan temuan audit.

Pekerjaan akun lain tetap di checklist18: Bing, Screaming Frog, pengambilan data/identity dan keputusan analytics. Tidak membeli backlink, memasang tracker ganda atau membuat otomatisasi indexing. Jadwal review23 manual; outcome ranking baru belum tersedia.
