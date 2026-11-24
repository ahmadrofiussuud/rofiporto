# Phase 7 — Search Console analysis

Diambil 24 November 2026 melalui sesi browser terautentikasi yang sudah tersedia. Property URL-prefix yang dipertahankan: **https://rofiporto.vercel.app/**. Ini pemeriksaan akun aktual, bukan asumsi dari screenshot SERP. Tidak ada kredensial/cookie yang diminta atau disimpan. Pemilik semula menjawab belum punya export dan meminta panduan; export 28 hari kemudian berhasil diambil lewat UI yang sudah login.

## Dataset dan cakupan

- `evidence/phase7-gsc-28days.zip` dan folder CSV hasil ekstraksinya. Filters.csv: Last 28 days, Search type Web (text-based), tidak ada filter negara/perangkat/query tambahan. Empat metrik dipilih.
- Chart.csv hanya memuat 16–22 November 2026; enam hari pertama tercatat 0 clicks/0 impressions dengan CTR/position kosong. 22 November tercatat 2 clicks/15 impressions. Jangan mengisi hari di luar export atau masa sebelum property sebagai nol.
- Rentang **90 hari tepat** dicoba melalui More → Custom, **25 Agustus–22 November 2026** inclusive, bukan label 3 months. UI tetap hanya menyediakan chart 16–22 November dan total yang sama. Ini observasi UI, belum export ZIP 90 hari terpisah.
- Property added pada Settings: 17 November 2026. Tanggal chart dan property yang tidak persis sama disimpan apa adanya; tidak disimpulkan sebagai 90 hari lengkap. Data pembanding valid belum diperoleh. Perubahan sebelumnya yang belum deployed tidak boleh dijadikan penyebab performa pada data ini.

## Ringkasan aktual

| Metrik | 28 hari dipilih (data tersedia 16–22 Nov) | Custom 90 hari (UI, coverage sama) | Periode pembanding |
|---|---|---|---|
| Total clicks | 2 | 2 | Belum tersedia |
| Total impressions | 15 | 15 | Belum tersedia |
| Average CTR | 13.33% export / 13.3% UI | 13.3% UI | Belum tersedia |
| Average position | 5.1 | 5.1 | Belum tersedia |

CTR 2/15 sesuai 13.33%. Posisi rata-rata 5.1 bukan posisi tetap untuk pencarian nama lengkap dan bukan bukti GitHub menggantikan portfolio. Satu impression/click baru akan mengubah angka secara besar pada sampel sekecil ini. Tidak menghitung growth, statistical significance atau uplift sebelum ada pembanding yang layak.

## Queries dan branded/non-branded

Queries.csv hanya header, UI Queries “No data”. Search appearance juga hanya header. **Tidak ada query yang bisa diklasifikasikan**, bukan berarti branded/non-branded masing-masing 0 atau tidak ada pencarian. Query yang tidak ditampilkan dapat terkait keterbatasan/privasi data; penyebab khusus tidak terverifikasi.

Aturan klasifikasi untuk data berikutnya: normalisasi lowercase/apostrof/spasi; nama lengkap, variasi nama yang benar, ahmadrofiussuud dan rofiporto = branded personal. MARS/Rofi pendek harus ditinjau konteks karena ambigu. Nama produk (Amora/Kelasin/dll.) diberi kelas product-branded tersendiri bila konteks jelas; jangan otomatis memasukkan semua query pendek ke personal-branded. Query umum tanpa identitas yang jelas = non-branded; sisanya ambiguous. Anonymized/hidden = unknown. Hitung share hanya atas query yang benar-benar tersedia dan tampilkan coverage; jangan menggunakan total impressions property sebagai denominator query lengkap tanpa peringatan.

## Landing pages (CSV 28 hari)

| URL | Clicks | Impressions | CTR | Position |
|---|---|---|---|---|
| https://rofiporto.vercel.app/ | 2 | 14 | 14.29% | 4.86 |
| https://rofiporto.vercel.app/projects/emub-2026 | 0 | 2 | 0% | 5.5 |
| https://rofiporto.vercel.app/projects/bcc-website | 0 | 1 | 0% | 10 |

Semua klik yang dilaporkan berada di beranda. Jangan merangking kualitas tiga halaman dari jumlah sangat kecil ini. Jumlah page impressions 17 berbeda dari total property 15 karena laporan dapat memakai aggregation berbeda. Jangan menjumlahkan baris dimensi untuk mengganti headline atau membuat posisi rata-rata baru dari tiga nilai halaman. Prioritasnya memperjelas halaman profil/karya dan discovery, bukan membuat thin pages untuk mengejar query yang belum terlihat.

## Devices dan countries (CSV 28 hari)

| Device | Clicks | Impressions | CTR | Position |
|---|---|---|---|---|
| Mobile | 1 | 8 | 12.5% | 6.12 |
| Tablet | 1 | 1 | 100% | 3 |
| Desktop | 0 | 6 | 0% | 4 |

Country: Indonesia 2 clicks, 15 impressions, CTR 13.33%, position 5.07. Tidak ada negara lain di export. Tablet 100% berasal dari satu impression, bukan keberhasilan UX atau rekomendasi memprioritaskan tablet. Mobile tetap penting untuk pengujian teknis, bukan karena satu klik membuktikan tren.

## Ownership, sitemap dan indexing

- Ownership **verified**, metode HTML tag. Public head juga memuat token yang sama. Tidak mengganti property/verifikasi.
- Sitemap /sitemap.xml: **Success**, submitted 17 Nov, last read 24 Nov, **36 discovered pages**, 0 videos. Tidak disubmit ulang.
- Page Indexing: UI last update **16 Nov**, 0 indexed/4 not indexed, reason **Crawled - currently not indexed**, validation Not Started. Contoh: /projects/bcc-website, /projects/em-ub-web-2026, /projects/cert-pbo (last crawled 18 Nov) dan / (17 Nov). Timestamp update vs contoh tampak tidak selaras; catat sebagai keterbatasan laporan, jangan menebak koreksi tanggal.
- **URL Inspection root lebih spesifik:** URL is on Google, Page is indexed; last crawl tampilan **17 Nov 2026 20:56:17**, Googlebot smartphone, crawl allowed Yes, fetch Successful, indexing allowed Yes. User-declared canonical https://rofiporto.vercel.app/; Google-selected **Inspected URL**. Tidak ada mismatch canonical yang teramati pada beranda.
- Inspection menampilkan No referring sitemaps detected walaupun laporan sitemap Success. Kedua laporan punya konteks/waktu berbeda; bukan alasan menghapus sitemap atau memaksa submit ulang.
- Live Test 24 Nov **22:47** tampilan UI: **URL is available to Google / Page can be indexed**. Ini akses dan indexability saat uji, bukan janji indexing atau penentu canonical.
- Tidak melakukan Request indexing pada sesi ini; halaman root sudah indexed dan pekerjaan Phase 4–6 belum live. Setelah deployment disetujui, utamakan URL yang berubah substansial, sesuai checklist 18.

## CWV, keamanan dan link

- CWV update 23 Nov: mobile dan desktop **Not enough usage data in the last 90 days**. Tidak ada LCP/INP/CLS p75 yang dapat dilaporkan. Angka Lighthouse/TBT tidak menggantikan field CWV/INP.
- Manual Actions: **No issues detected**. Security Issues: **No issues detected**. Hasil kedua laporan bukan jaminan bebas seluruh masalah keamanan/algoritmik.
- Links: external total **0**, internal total **0**, tabel No data. Ini isi laporan saat diamati. HTML/smoke punya internal links; jangan menghapus navigasi karena laporan belum merefleksikannya atau mengklaim seluruh web tidak punya backlink.

## Tindakan berbasis data dan data yang masih diminta

1. Pertahankan sitemap/property, tidak ada perbaikan fetch atau canonical beranda yang terbukti dibutuhkan sekarang.
2. Periksa contoh URL lama satu per satu lewat URL Inspection setelah perubahan disetujui/deployed; status 4 contoh tidak dapat digeneralisasi ke 36 URL atau dianggap mutakhir.
3. Prioritaskan bukti/peran konten Phase 6 dan tautan profil organik; jangan menyatakan pekerjaan lokal sudah memberi uplift pencarian.
4. Simpan export **28 hari, 90 hari, dan periode sebelumnya yang setara** ketika data tersedia. Export custom 90 belum diunduh; UI totals telah diperiksa. Jangan menganggap data sebelum tracking sebagai performa nol.
5. Query, branded split, previous-period clicks/impressions/CTR/position dan field CWV tetap kosong/belum tersedia. Tidak meminta password; cukup file CSV/ZIP atau hasil laporan yang boleh disamarkan.

Bukti observasi: `phase7-dashboard-observations.json`. Panduan reproduksi langkah lengkap pada 16, checklist pada 18, template CSV pada 19. [Penjelasan URL Inspection](https://support.google.com/webmasters/answer/9012289) dan [GSC Performance data](https://support.google.com/webmasters/answer/17011364).
