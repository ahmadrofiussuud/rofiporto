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
