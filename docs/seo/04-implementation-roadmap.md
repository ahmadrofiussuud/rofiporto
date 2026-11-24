# Phase 1 — Implementation roadmap

Tanggal 24 November 2026. Dokumen ini rencana berbasis audit, bukan otorisasi implementasi. Budget tambahan Rp0. Domain dan hosting tetap. Tunggu instruksi phase berikutnya; setiap deployment production memerlukan persetujuan eksplisit. Estimasi tidak mencakup waktu menunggu bahan pemilik atau recrawl Google.

## Urutan prioritas dan gerbang persetujuan

| Tahap usulan | Issue | Deliverable | Effort | Kriteria selesai |
| --- | --- | --- | --- | --- |
| 2A — Perbaikan link bukti | SEO-18 | Tiga link PDF diganti dengan dokumen/bukti yang benar setelah review | 1–2 jam | Tiga href valid 200 dan isi sesuai sertifikat |
| 2A — Tutup gap data dan akses | SEO-04/05/15/16 | Export GSC, satu preview URL/headers, status PSI/CrUX, validator/Bing yang tersedia | 2–4 jam dengan pemilik | Data bertanggal, status terverifikasi atau pending eksplisit; production dan preview dibedakan |
| 2B — Entity dan search appearance | SEO-01/02/03 | WebSite + Person/ProfilePage tetap valid, favicon personal yang disetujui, OG/Twitter per template | 4–8 jam | JSON-LD dapat diparse/validator sesuai jenis; meta absolut dan cover benar; perubahan siap review tanpa deploy |
| 3 — Performance dan aksesibilitas | SEO-06/07/09/10/11/17 | LCP pencapaian, responsive sizes, kontras, heading dan dialog | 1–2 hari | Lab sebanding membaik tanpa regresi visual/filter/modal, keyboard diuji, tidak mengklaim field CWV bila belum tersedia |
| 4 — Konten dan kredibilitas | SEO-12/13/14 | Dua atau tiga case study prioritas, konsistensi tahun, definisi metrik, relasi halaman EM UB | 1–2 hari + bahan | Fakta dikonfirmasi pemilik, konten unik sesuai peran, link sumber/demo relevan |
| 5 — Optimasi aset dan off-page | SEO-08/16 | Peta aset aktif, konversi terukur, profil publik menautkan portofolio bila disetujui | 0,5–1 hari | Sertifikat tetap terbaca; ukuran aktual turun; tindakan akun hanya atas otorisasi |
| 6 — Monitoring berkelanjutan | SEO-05/15 | Review manual mingguan awal, evaluasi bulanan berbasis GSC | 20–45 menit per review | Catatan periode, query, halaman, perubahan dan tindakan; tanpa layanan berbayar |

Urutan 2A dan persiapan 2B dapat berjalan dalam phase yang disetujui tanpa menunggu data field yang memang tidak cukup trafiknya. Jangan memblokir semua pekerjaan karena CrUX tidak tersedia. Jangan membuat schema tanggal/award/pekerjaan baru tanpa data valid.

## Rencana validasi sebelum deployment

1. Review diff dan jalankan pemeriksaan tipe/build yang sesuai perubahan pada phase implementasi. Catat kegagalan network font terpisah dari bug kode bila terjadi.
2. Ambil HTML build/preview. Periksa title, description, canonical, robots, schema, alt dan HTTP error routes.
3. Pastikan tidak ada noindex pada production candidate dan preview memiliki perlindungan yang dapat dibuktikan.
4. Periksa visual mobile/desktop, contain cover yang sudah benar, theme, navbar, filter karya, modal sertifikat dan keyboard.
5. Lighthouse menggunakan versi/config dan kondisi host yang sama. Untuk perbandingan performance penting, lakukan beberapa run berurutan dan bandingkan median; baseline Phase 1 adalah satu run per konfigurasi.
6. Sampaikan perubahan dan hasil uji untuk review pemilik. Deploy/push branch pemicu production hanya setelah persetujuan.
7. Sesudah deployment yang disetujui, verifikasi URL production. Satu request recrawl bila relevan; tidak mengulang submit sitemap tanpa alasan.

## Data manual yang diperlukan

| Sumber | Detail yang diminta | Penggunaan |
| --- | --- | --- |
| GSC Search results | Export 28 hari dan 3 bulan, tanggal lengkap, search type Web, clicks/impressions/CTR/position; query dan pages, filter nama lengkap/variasi, device/country | Baseline branded/non-branded, identifikasi query dan halaman relevan |
| GSC Indexing | Pages reasons, sitemap last-read/status, URL Inspection `/`, `/about`, satu proyek unggulan dan Akademirofi | Coverage, selected canonical, discovery/crawl, validasi 36 sitemap URL |
| GSC CWV/Links | Mobile/desktop groups dan insufficient data bila ada; top linking sites/pages; manual actions/security status | Field experience, rujukan digital dan kondisi akun |
| Vercel | Satu preview URL + current deployment SHA dan production branch/protection setting | Validasi preview, identitas build yang dibandingkan |
| PSI | URL/origin, tanggal, perangkat, CrUX 28 hari, p75 LCP/INP/CLS atau insufficient data; link report | Field baseline, bukan mengganti lab dengan nilai asumsi |
| Rich Results Test | URL hasil homepage dan satu detail, error/warning/types | Kelayakan fitur yang didukung Google |
| Schema Validator | Homepage result types dan error/warning | Kebenaran struktur ProfilePage/Person; WebSite setelah implementasi |
| Bing | Verifikasi/sitemap/inspection/search performance/site scan bila tersedia | Discovery dan issue mesin pencari kedua, tanpa klaim setup sudah dilakukan |
| Pemilik | Tahun acara YPS/Mawapres, sumber angka audiens EM UB, peran/status/tim/tanggal/demo proyek baru, bukti kontribusi | Memperbaiki konten hanya berdasarkan fakta yang disetujui |

Export/screenshot boleh disamarkan. Jangan mengirim password, token privat, atau cookie sesi. Untuk akun yang belum digunakan, catat belum tersedia; pembuatan akun atau perubahan setting bukan bagian Phase 1.

## Monitoring dan evaluasi

- Baseline pengukuran berkas 03. Setiap review simpan tanggal, rentang data, filter, device, query/page, perubahan sejak review terakhir dan kemungkinan faktor pengganggu.
- Awal setelah perubahan, review GSC mingguan selama empat minggu bila data tersedia. Sesudah itu evaluasi bulanan. Ini prosedur yang diusulkan, belum ada automation atau jadwal yang dibuat.
- Pantau nama lengkap apostrof lurus/curly, Muhammad Ahmad Rofi'us Su'ud, variasi Rofi'us Su'ud, dan nama proyek yang memang tercantum. Nilai branded queries memakai konteks impressions/CTR/page, bukan janji posisi 1.
- Core metrics gratis adalah clicks, impressions, CTR, average position, halaman terindeks/reasons, sitemap fetch dan field CWV bila tersedia. Page/origin dengan insufficient data tetap pending.
- Bandingkan periode setara dan anotasi perubahan. Situs baru memiliki sedikit data, sehingga perubahan posisi harian tidak cukup membuktikan dampak implementasi.
- Crawl ulang setelah penambahan route/perubahan metadata penting atau jika ada 4xx/5xx, canonical/noindex tak terduga, link aset gagal atau performance regression. Jangan menjalankan tes berulang tanpa perubahan atau pertanyaan yang belum terjawab.

## Pengendalian perubahan

- Simpan implementation log per phase dengan issue ID, file, perubahan, bukti pengujian dan persetujuan deployment.
- Pertahankan rendering server, metadata/verifikasi yang berfungsi, responsive design dan cover contain.
- Tidak mengganti domain, hosting, membeli backlink, memakai trafik buatan atau keyword stuffing.
- Tidak menambah dependency/alat berbayar untuk menyelesaikan rekomendasi ini.
- Tidak menghapus konten/route atau menambahkan canonical silang sebelum intent, link dan dampak URL dikaji.
- Jika perubahan bermasalah setelah deployment yang disetujui, kembalikan perubahan spesifik melalui commit biasa setelah menilai bukti. Hindari operasi Git destruktif.

Phase 1 selesai pada audit dan dokumentasi. Pelaksanaan roadmap menunggu instruksi pengguna.
