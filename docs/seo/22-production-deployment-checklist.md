# Phase 8 — Production deployment checklist & rollback

24 November 2026. Pengguna meminta “push lalu Jalankan PHASE8”; pesan pembuka menjelaskan bahwa master memicu Vercel. Checkpoint fa08c14 dipush dan deployment sukses. Tidak menganggap izin ini sebagai izin semua deployment masa depan. Laporan Phase 8/utility-only changes yang dibuat sesudah checkpoint belum dipush.

## Gate sebelum checkpoint (aktual)

- [x] Diff source/content/config diperiksa: tidak menghapus route/cover/fitur utama, domain/hosting tetap.
- [x] Build production, lint dan typecheck pass.
- [x] Local smoke36/791, entity: 469, content: 11, image73 source/variant200.
- [x] Production URL/canonical/metadataBase benar; GSC token lama dipertahankan.
- [x] Tidak ada .env tracked; ignore .env*/.vercel/*.pem tetap. Scan pola private key/token umum pada source/scripts/docs tidak menemukan hit; ini bukan audit seluruh history atau secret dashboard.
- [x] User explicit push authorization; commit fa08c14, master push sukses.
- [x] Vercel commit check success: [deployment](https://vercel.com/ahmadrofiussuuds-projects/rofiporto/FGdfKugNKqedryRjt437jZjAH1rK).
- [ ] Vercel dashboard environment/protection seluruh setting belum ditinjau; jangan menampilkan nilai secret. VERCEL_ENV disediakan platform, bukan env buatan yang dibalik ke preview.

## Verifikasi sesudah deployment (aktual)

- [x] Production36 route/791 checks:200, canonical, indexability, heading, nav/links, sourceimages, redirects, 404.
- [x] Entity 469, content: 11, images110 element/73 source+WebP 200.
- [x] ICO/Apple bytehash sesuai repository; OGimage1200×630, HTTP 200, root WebSite graph baru, verification token ada.
- [x] Manual responsive dan interaksi sampel; tidak ada consoleerror pada sesi yang tercatat.
- [x] RRT profil: 2 valid items, SchemaValidator graph0error0warning.
- [x] Lighthouse production di21; performance pencapaian mobile tetap isu terbuka.
- [x] Preview build lokal noindex meta/header dan sitemap kosong: 791 checks; dikembalikan ke build production sesudahnya.
- [ ] Preview deployment nyata: owner memberikan URL yang memang preview; uji apakah protected atau X-Robots-Tag/meta noindex dan canonical production. Lokal bukan pengganti validasi platform.
- [x] Sitemap daftar URL tetap36; GSC Phase 7 Success, tidak submit ulang tanpa kebutuhan.
- [x] /about LiveTestavailable, schema2valid, indexstatusdiscovered, not indexed dicatat.
- [ ] **Request indexing /about gagal: Quota Exceeded**, bukan queued. Retry setelah batas harian pulih (mulai pemeriksaan25 Nov; waktu reset mengikuti layanan). Jangan retry massal/gantiakun. Setelah berhasil, pilih satu URL substansial berikutnya seperti /projects/amora bila perlu dan kuota mengizinkan.
- [ ] Pastikan Google-selected canonical dan lastcrawl baru setelah recrawl; LiveTest tidak menentukan pilihan Google.

## Release readiness

Tidak ada blocker Critical/High teknis terverifikasi pada tes yang dijalankan. Checkpoint layak production dengan open Medium issues: performance pencapaian, field data, konfirmasi fakta serta validasi preview platform. Tidak menyebut readiness sebagai perfect SEO atau seluruh 36URL indexed. Jika deployment lain direncanakan, ulangi gate relevan dan peroleh persetujuan production untuk deployment tersebut.

## Rollback plan (disiapkan, tidak dieksekusi)

- Last known good sebelum checkpoint: **cd05aa6** (Phase 1–3). Checkpoint kini: **fa08c14**. Simpan deployment URL/SHA dan alasan sebelum tindakan.
- Trigger: accidental noindex/canonical non-production, banyak 5xx/broken routes, hilangnya fitur/cover atau gangguan UX utama. Fluktuasi ranking satu hari/kuota GSC bukan trigger rollback kode otomatis.
- Pilihan dashboard: pemilik memilih deployment known-good yang tepat pada Vercel dan rollback/promote bila fitur tersedia pada paketnya. Verifikasi tindakan dan dampak; jangan mengubah domain.
- Pilihan Git: setelah izin rollback production, buat revert commit spesifik yang menyebabkan regresi (atau revert fa08c14 jika seluruh checkpoint bermasalah), review diff, build/lint/types/smoke, lalu push master yang memicu deployment. **Tidak reset --hard, forcepush, atau menghapus history.**
- Rollback penuh akan mengembalikan beberapa perbaikan identitas/konten/gambar; pertahankan patch yang sudah terbukti bila memungkinkan. Metadata/canonical/verification token harus tetap benar. Tidak ada migrasi database atau perubahan secret pada checkpoint ini.
- Setelah rollback: pastikan commit check success, HTTP/meta/robots/sitemap/indexing intent, image/redirect/404 dan interaksi penting; catat ke log. Request indexing hanya bila konten live berubah substansial, tidak spam.

## Dokumen/utility Phase 8

Tidak ada perubahan kode website setelah checkpoint. Hanya parameter utility test, evidence dan laporan 20–24. Diff tersisa perlu direview sebelum push berikutnya; push master tetap memicu Vercel walaupun docs-only. Tidak mengeksekusi rollback/deployment kedua tanpa kebutuhan atau menganggapnya sudah disetujui.
