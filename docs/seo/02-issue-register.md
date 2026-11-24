# Phase 1 — Issue register

Audit 24 November 2026. Deskripsi setiap temuan menyimpan kondisi baseline Phase 1. Status implementasi terkini ada pada tabel Phase 2 di bawah. Effort merupakan estimasi pengerjaan, bukan waktu ranking Google. Critical = situs secara luas terblokir/rusak; High = risiko signifikan atau gap keputusan utama; Medium = peningkatan terukur/terbatas; Low = perapian. Severity pada pemeriksaan pending menunjukkan prioritas verifikasi, bukan bukti kerusakan.

## Status Phase 2 — 24 November 2026

| Audit ID | Status | Bukti / pekerjaan tersisa |
| --- | --- | --- |
| SEO-03 | Implemented locally, validated | Metadata/canonical/OG/Twitter 36 halaman lulus smoke. Sharing cache eksternal dan production setelah deploy masih perlu diperiksa |
| SEO-04 | Mitigated locally, platform verification pending | Preview build noindex meta+header, canonical production, sitemap kosong. Production build bebas noindex. Belum diuji pada URL preview Vercel sungguhan |
| SEO-05 | Pending external data | Tetap memerlukan laporan GSC terbaru |
| SEO-18 | Implemented locally, validated | Tiga href langsung ke gambar sertifikat 200, URL PDF lama 308 satu hop. Production belum deploy |
| SEO-19 | Implemented locally, validated | Dua nama image dinormalisasi; source, image optimizer dan legacy redirects lulus lokal |
| SEO-01/02/06–17 | Deferred, except statuses above | Di luar perubahan technical yang dipilih pada Phase 2; tidak diklaim selesai |

Laporan pengujian dan batasan terdapat pada [05-technical-implementation.md](05-technical-implementation.md). Production belum menerima perubahan.

## Status Phase 3 — 24 November 2026

| Audit ID | Status | Bukti / batasan |
| --- | --- | --- |
| SEO-10 | Implemented locally, validated | Hierarki heading seluruh 36 halaman tanpa lompatan pada regression test |
| SEO-11 | Implemented, manual validation pending | Dialog berlabel, fokus awal/trap/restore, Escape dan keyboard thumbnail. Build/lint/types lulus; browser regression terblokir review usage limit |
| SEO-09 | Partially addressed | Teks muted light theme diperbaiki; Lighthouse tinggal melaporkan tiga angka dekoratif aria-hidden; accessibility 96 |
| SEO-12 | Partially addressed | Description 31 proyek dan profil diperjelas tanpa menambah hasil/role yang tidak tersedia. Kedalaman case study menunggu bahan pemilik |
| SEO-13 | Context clarified | Tautan silang EM UB dan BCC ditambah; dugaan cannibalization belum dibuktikan GSC |
| SEO-05/14/15 | Pending evidence | GSC, konfirmasi faktual dan validator eksternal tetap diperlukan |

Metadata before/after, keyword hipotesis dan keterbatasan dicatat di dokumen 06–07. Semua 36 route terjangkau dari anchor beranda; orphanPages kosong pada evidence/phase3-smoke.json.

## SEO-01 — Preferred site name belum dinyatakan lewat WebSite

- Kategori: Entity / branding. Status bukti: terverifikasi kode dan HTML.
- File/URL: `src/app/(site)/page.tsx`, `/`.
- Bukti: JSON-LD homepage hanya ProfilePage dengan Person; tidak ada node WebSite. Screenshot pengguna 23 November menampilkan Vercel sebagai site name.
- Kondisi aktual: og:site_name tersedia tetapi WebSite belum ada; tampilan SERP terkini belum diperiksa.
- Expected condition: satu WebSite dengan name, url, alternateName yang konsisten dengan identitas terlihat.
- Severity: Medium.
- Rekomendasi: tambahkan WebSite terhubung ke identitas pemilik tanpa menghapus ProfilePage/Person. Google tetap menentukan nama yang ditampilkan.
- Estimasi effort: 1–2 jam.
- Metode validasi: parse JSON-LD production setelah deployment disetujui, Schema Markup Validator, URL Inspection; observasi site name setelah recrawl.

## SEO-02 — Favicon belum mencerminkan identitas pemilik

- Kategori: Branding / image. Status: terverifikasi visual dan HTTP.
- File/URL: `src/app/favicon.ico`, `/favicon.ico`, `evidence/favicon.png`.
- Bukti: ikon segitiga putih pada latar hitam; HTTP 200.
- Kondisi aktual: ikon yang menyerupai Vercel, terpisah dari identitas mars pada navbar.
- Expected condition: favicon milik portofolio, terbaca pada ukuran kecil dan konsisten dengan brand.
- Severity: Low.
- Rekomendasi: siapkan favicon MARS dari identitas yang disetujui pemilik, tanpa redesign situs.
- Estimasi effort: 1–2 jam.
- Metode validasi: preview ukuran 16/32/48 px, HTTP 200 dan rel icon pada HTML; recrawl sebelum mengevaluasi Google.

## SEO-03 — Social metadata belum mencakup halaman selain beranda

- Kategori: On-page / social. Status: terverifikasi.
- File/URL: root layout, about/projects/competitions/contact dan `projects/[slug]/page.tsx`.
- Bukti: tidak ada OG/Twitter di HTML `/about`; metadata generator proyek hanya title, description dan canonical. Homepage memiliki OG/Twitter sendiri.
- Kondisi aktual: preview proyek bergantung pada ekstraksi platform.
- Expected condition: fallback global dan metadata khusus proyek, termasuk URL/canonical, cover, alt, title dan description relevan.
- Severity: Medium.
- Rekomendasi: gunakan Metadata API dengan fallback konsisten dan data MDX yang tersedia. Jangan mengarang image yang tidak ada.
- Estimasi effort: 2–4 jam.
- Metode validasi: GET HTML seluruh tipe halaman, periksa OG/Twitter absolut; preview sharing manual setelah persetujuan deployment.

## SEO-04 — Indexability preview belum dapat dipastikan

- Kategori: Technical / deployment. Status: risiko, belum diperiksa di preview.
- File/URL: `src/app/robots.ts`, layout metadataBase, Vercel project settings.
- Bukti: robots allow-all dan canonical production hardcoded; tidak ada override berbasis environment di kode. Belum ada URL preview yang diketahui.
- Kondisi aktual: kondisi produksi sehat; perlindungan preview bisa dikelola Vercel namun belum terverifikasi.
- Expected condition: production crawlable; preview dilindungi/noindex dengan header atau mekanisme platform yang terverifikasi.
- Severity: High (prioritas verifikasi).
- Rekomendasi: minta satu preview URL dan periksa header/protection sebelum memilih perubahan. Jangan menambah noindex global yang berisiko memblokir production.
- Estimasi effort: 30–60 menit verifikasi; implementasi hanya bila diperlukan.
- Metode validasi: GET preview dan production, X-Robots-Tag/meta robots/protection serta canonical; bandingkan keduanya.

## SEO-05 — Data Search Console belum menjadi baseline terbaru

- Kategori: Monitoring / external. Status: belum dapat diperiksa.
- File/URL: properti GSC `https://rofiporto.vercel.app/`.
- Bukti: tab inspeksi lama tidak ditemukan pada audit; tidak ada export performance/coverage terkini.
- Kondisi aktual: hanya ada bukti historis posisi 4 dan verifikasi. Tidak ada clicks, impressions, CTR, posisi rata-rata atau cakupan indeks saat ini.
- Expected condition: baseline bertanggal berdasarkan query/page/device/country dan status indeks.
- Severity: High (gap pengukuran).
- Rekomendasi: ambil export gratis dan URL Inspection sesuai checklist; simpan periode dan filter.
- Estimasi effort: 1–2 jam dengan akses pemilik.
- Metode validasi: cocokkan periode/export, Google-selected canonical, sitemap dan pages indexed; hindari membandingkan screenshot personal dengan average position.

## SEO-06 — LCP mobile halaman pencapaian perlu optimasi terarah

- Kategori: Performance / image. Status: terverifikasi lab, belum field.
- File/URL: `/competitions`, `competitions-view.tsx`.
- Bukti: Lighthouse mobile Performance 90, LCP 3,2 s, TBT 170 ms; audit lcp-lazy-loaded gagal; image-delivery estimasi 239 KiB.
- Kondisi aktual: kandidat LCP dalam pengujian terlambat dimuat; tidak ada INP/CrUX.
- Expected condition: kandidat LCP aktual tidak lazy-loaded, image sesuai ukuran, target lab LCP ≤2,5 s pada kondisi sebanding tanpa regresi desain.
- Severity: Medium.
- Rekomendasi: identifikasi image LCP dari report lalu atur ukuran/prioritas khusus image tersebut, kurangi kerja client hanya bila terbukti relevan.
- Estimasi effort: 3–6 jam.
- Metode validasi: Lighthouse mobile ulang setelah perubahan, bandingkan waterfall/LCP; uji filter/modal dan visual; konfirmasi CWV field bila tersedia.

## SEO-07 — Responsive image sizing belum sesuai semua konteks

- Kategori: Image / performance. Status: terverifikasi kode + lab.
- File/URL: `ui/project-card.tsx`, `projects/[slug]/page.tsx`, `MdxImage.tsx`.
- Bukti: kartu default sizes 40vw meski arsip lg tiga kolom; hero detail Image fill tidak memiliki sizes. Lighthouse responsive-images beranda estimasi 16 KiB, pencapaian 137 KiB.
- Kondisi aktual: browser dapat memilih gambar lebih besar dari tampilan. Mode MdxImage auto memakai fill + aspect-auto, tetapi penggunaan mode auto belum terkonfirmasi.
- Expected condition: sizes sesuai lebar render per template dan container stabil.
- Severity: Medium.
- Rekomendasi: audit konteks grid/detail dahulu, sesuaikan sizes, pertahankan contain/crop yang diminta pemilik. Jangan memasang priority pada semua gambar.
- Estimasi effort: 2–4 jam.
- Metode validasi: currentSrc dan rendered width pada 390/768/1440 px; network transfer dan Lighthouse; bandingkan visual.

## SEO-08 — Source image besar memerlukan inventaris pemakaian

- Kategori: Image / asset management. Status: terverifikasi ukuran, dampak transfer bersifat risiko.
- File/URL: `public/images`, `evidence/assets.json`.
- Bukti: 107 file total 108.182.470 byte; best-pm-raion.png dan mars-profile.png masing-masing 16.617.349 byte, 6000×4242.
- Kondisi aktual: sumber PNG besar; pengguna umumnya menerima image optimizer. Total source bukan payload halaman.
- Expected condition: sumber berukuran wajar, dokumen asli tersimpan bila diperlukan, keterbacaan sertifikat tetap baik.
- Severity: Low.
- Rekomendasi: petakan aset aktif, bandingkan WebP/AVIF/PNG lossless untuk dokumen dan foto; simpan original, ukur ukuran hasil serta kualitas sebelum penggantian.
- Estimasi effort: 3–6 jam.
- Metode validasi: dimensi/byte before-after, crop/teks sertifikat, optimizer content-type dan transfer aktual.

## SEO-09 — Kontras teks proses kurang dari ambang aksesibilitas

- Kategori: Accessibility / UX. Status: terverifikasi Lighthouse.
- File/URL: `/`, globals.css, `.approach-section .text-muted-foreground`.
- Bukti: Lighthouse color-contrast 4,47:1 untuk body text versus target 4,5:1. Angka dekoratif .work-number juga ditandai 1,93:1.
- Kondisi aktual: Accessibility 96 pada ketiga lab run; dekorasi aria-hidden harus dinilai terpisah dari teks informatif.
- Expected condition: teks normal ≥4,5:1, large text ≥3:1; tampilan tetap sesuai desain.
- Severity: Medium.
- Rekomendasi: koreksi token/warna teks yang gagal dengan perubahan kecil dan verifikasi dua tema.
- Estimasi effort: 1–2 jam.
- Metode validasi: contrast calculator/Lighthouse dan visual light/dark, jangan klaim aksesibilitas penuh hanya dari skor.

## SEO-10 — Heading arsip dan about melewati level

- Kategori: Semantic / accessibility. Status: terverifikasi kode + HTML.
- File/URL: `/projects`, `/about`, ProjectCard.
- Bukti: H1 di arsip diikuti H3 judul kartu tanpa H2; about H2 profil diikuti H3 keterampilan sebelum H2 area tersebut.
- Kondisi aktual: satu H1 per halaman sudah benar, struktur subbagian kurang eksplisit.
- Expected condition: heading mengikuti struktur informasi yang logis pada tiap template.
- Severity: Low.
- Rekomendasi: dukung level heading per konteks atau heading section yang memang berguna; jangan mengubah ukuran visual.
- Estimasi effort: 1–2 jam.
- Metode validasi: outline HTML seluruh template dan screen-reader heading navigation.

## SEO-11 — Modal pencapaian belum memiliki pengelolaan fokus lengkap

- Kategori: Accessibility / interaction. Status: terverifikasi inspeksi kode; uji keyboard pending.
- File/URL: `competitions-view.tsx`, modal selectedItem.
- Bukti: tersedia handler Escape dan close aria-label, tetapi tidak ditemukan role dialog, aria-modal, focus trap atau return-focus eksplisit.
- Kondisi aktual: alur keyboard berisiko keluar modal; kegagalan interaksi belum direproduksi manual.
- Expected condition: fokus berpindah ke dialog, judul terhubung, fokus terkurung dan kembali ke pemicu saat ditutup.
- Severity: Medium.
- Rekomendasi: gunakan pola dialog aksesibel, pertahankan visual dan Escape; cek aria-pressed pada filter pencapaian.
- Estimasi effort: 2–4 jam.
- Metode validasi: Tab/Shift+Tab/Escape, screen reader, klik dan filter di mobile/desktop.

## SEO-12 — Kedalaman konten dan konteks kontribusi belum merata

- Kategori: Content / search intent / personal branding. Status: terverifikasi konten, dampak ranking merupakan asumsi.
- File/URL: MDX CEKAT, SobatAman, ARAH, IfhamKids, TelaahKarier, Akademirofi.
- Bukti: sebagian isi hanya overview; metadata role/date kosong atau tidak tersedia pada proyek baru.
- Kondisi aktual: fungsi produk dijelaskan, tetapi kontribusi pemilik dan bukti proses belum konsisten.
- Expected condition: pengunjung memahami masalah, peran, keputusan, hasil dan batasan berdasarkan bukti pemilik.
- Severity: Medium.
- Rekomendasi: lengkapi 2–3 proyek prioritas dengan bahan asli. Jangan mengarang metrik, status, stack, tim atau tanggal. Tidak ada minimal word count wajib.
- Estimasi effort: 2–4 jam per proyek setelah bahan tersedia.
- Metode validasi: persetujuan faktual pemilik, kecocokan demo/dokumen, title-description-body sesuai intent.

## SEO-13 — Tumpang tindih intent tiga halaman EM UB

- Kategori: Content / internal linking. Status: overlap terverifikasi, cannibalization belum terbukti.
- File/URL: MDX website-em-ub, em-ub-web-2026, emub-2026.
- Bukti: ketiganya membahas PM/pengembangan website EM UB dengan judul dan isi berbeda.
- Kondisi aktual: satu case study produk dan dua konteks organisasi/peran belum saling menjelaskan relasinya dengan kuat.
- Expected condition: tiap URL memiliki intent jelas dan tautan kontekstual; konsolidasi hanya jika data mendukung.
- Severity: Low.
- Rekomendasi: pisahkan narasi organisasi dan produk lewat konten yang spesifik, tautkan silang; periksa GSC sebelum mempertimbangkan redirect/canonical silang.
- Estimasi effort: 2–3 jam.
- Metode validasi: review konten dan query/page GSC; tidak menghapus halaman valid hanya karena topik sama.

## SEO-14 — Tahun acara dan klaim kuantitatif perlu konfirmasi

- Kategori: Credibility / editorial. Status: kebutuhan verifikasi teridentifikasi; kebenaran klaim belum ditetapkan.
- File/URL: competitions-view.tsx YPS/Mawapres; MDX website-em-ub.
- Bukti: YPS data date Agu 2024 versus sertifikat yang pernah diberikan bertahun 2026; Mawapres berlabel 2027; narasi EM UB menyebut lebih dari 60.000 mahasiswa tanpa sumber.
- Kondisi aktual: ada potensi ketidakselarasan konteks tahun dan audience versus pengguna aktual.
- Expected condition: tanggal/tahun acara dan metrik terdefinisi, dapat ditelusuri ke dokumen valid.
- Severity: Medium.
- Rekomendasi: minta pemilik mengonfirmasi tahun acara dan sumber angka; bedakan cohort/event year, target audience, dan pemakaian aktual. Pertahankan data valid.
- Estimasi effort: 1–3 jam setelah konfirmasi.
- Metode validasi: cocokkan sertifikat asli, sumber resmi, dan penjelasan pemilik sebelum revisi.

## SEO-15 — Field CWV dan validasi schema eksternal belum tersedia

- Kategori: Monitoring / external validation. Status: belum dapat diperiksa.
- File/URL: PSI API, Rich Results Test, Schema Markup Validator, Bing Webmaster Tools.
- Bukti: PSI API 429 disimpan; JSON-LD parse lokal sukses; belum ada laporan validator atau Bing.
- Kondisi aktual: INP/p75 CWV dan rich-result eligibility belum diketahui.
- Expected condition: laporan bertanggal atau label insufficient data yang nyata; validasi schema sesuai type.
- Severity: Medium.
- Rekomendasi: lengkapi data manual sesuai current-state bagian F. WebSite diperiksa di Schema Validator karena Rich Results Test tidak mendukung semua schema/site names.
- Estimasi effort: 1–2 jam dengan akses laporan.
- Metode validasi: simpan export/link/hasil error warning, lingkup URL versus origin dan periode CrUX.

## SEO-16 — External link status belum seluruhnya dapat diverifikasi

- Kategori: Off-page / links. Status: HTTP terverifikasi, validity profile pending.
- File/URL: https://em.ub.ac.id/, LinkedIn sameAs.
- Bukti: EM UB 403 Cloudflare challenge, LinkedIn 999; evidence resource JSON.
- Kondisi aktual: akses otomatis dibatasi; bukan alasan menghapus tautan.
- Expected condition: link dapat dikunjungi pengguna dan profil memang milik pemilik; rujukan kredibilitas relevan.
- Severity: Low.
- Rekomendasi: cek manual profil/link dan backlink portofolio di akun yang dikelola pemilik; jangan melakukan posting/backlink tanpa otorisasi.
- Estimasi effort: 30–60 menit.
- Metode validasi: pemeriksaan manual akun dan export GSC Links; tidak menjadikan status bot sebagai broken-link final.

## SEO-17 — Prioritas fetch foto LCP beranda dapat ditinjau

- Kategori: Performance / loading. Status: terverifikasi lab.
- File/URL: `/`, hero-profile.tsx.
- Bukti: Lighthouse menemukan foto sebagai LCP, eager/discoverable lulus tetapi priorityHinted false; kode memakai priority.
- Kondisi aktual: LCP mobile 2,3 s dalam satu run, sudah baik pada sampel tersebut.
- Expected condition: hint prioritas cocok API Next 16 dan tidak memicu double-download/preload berlebihan.
- Severity: Low.
- Rekomendasi: setelah optimasi pencapaian, evaluasi fetchPriority/preload menurut dokumentasi versi yang dipakai; hindari perubahan bila tidak memberi manfaat terukur.
- Estimasi effort: 1–2 jam.
- Metode validasi: waterfall network dan Lighthouse beranda dengan kondisi sama; periksa regresi request/image.

## SEO-18 — Tiga link PDF sertifikasi mengembalikan 404

- Kategori: Technical / broken internal links / credibility. Status: terverifikasi repository dan HTTP production.
- File/URL: content/projects/cert-java.mdx, cert-pm.mdx, cert-pbo.mdx; `/images/projects/Sertif%20JAVA%20dasar.pdf`, `/images/projects/Sertif%20PM%20dasar.pdf`, `/images/projects/Sertifikat%20PBO.pdf`.
- Bukti: file tidak ditemukan dalam public dan ketiga GET URL membalas 404. Detail di evidence/internal-attachments.json.
- Kondisi aktual: pengunjung yang menekan View Certificate (PDF) menemui lampiran hilang, meski gambar sertifikat tersedia.
- Expected condition: tautan sertifikat membuka file valid yang sesuai atau bukti image yang sudah tersedia dan disetujui.
- Severity: High.
- Rekomendasi: cari dokumen asli yang benar atau arahkan link ke bukti image yang relevan setelah review. Jangan mengarang file PDF/sertifikat.
- Estimasi effort: 1–2 jam setelah sumber bukti ditentukan.
- Metode validasi: HTTP 200 pada setiap href, Content-Type sesuai, dan cocokkan nama/isi sertifikat secara visual.

## Ringkasan prioritas

Tidak ada Critical terverifikasi. SEO-18 adalah High terverifikasi. Dua High lainnya merupakan gap verifikasi preview dan baseline GSC, bukan klaim production rusak. Perbaikan pertama yang layak diusulkan ialah SEO-18, dilanjutkan SEO-01/03/09 dan SEO-06/07 setelah persetujuan phase implementasi. SEO-14 memerlukan konfirmasi pemilik sebelum perubahan fakta.

## SEO-19 — Image optimizer lokal gagal untuk path berapostrof

- Kategori: Technical / image URL. Status: terverifikasi pada build lokal Phase 2, diperbaiki lokal; kondisi Vercel sebelum deployment belum diverifikasi.
- File/URL: competitions-view.tsx; public/images/competitions/sertif finalis web dev'.jpeg; sumber workshop PM BCC dengan apostrof pada nama pemilik.
- Bukti: file JPEG valid menurut Pillow, tetapi GET path encoded %27 menghasilkan 404 dan image optimizer untuk sertifikat web dev menghasilkan 400. Smoke test tambahan gagal sebelum normalisasi nama.
- Kondisi aktual setelah perbaikan: kedua file memakai nama aman dengan isi gambar tetap, empat variasi URL lama redirect 308; dua optimizer image mengembalikan 200.
- Expected condition: gambar sumber dan image optimizer berfungsi konsisten tanpa bergantung representasi apostrof dalam URL.
- Severity: Medium.
- Rekomendasi: gunakan nama aset yang aman dan pertahankan redirect legacy saat deployment disetujui.
- Estimasi effort: 1–2 jam, telah dikerjakan lokal.
- Metode validasi: phase2-production-smoke.json dan phase2-preview-smoke.json, masing-masing 679 pemeriksaan lulus termasuk image/redirect. Verifikasi Vercel setelah deployment masih diperlukan.
