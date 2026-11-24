# Phase 3 — On-page dan semantic implementation

24 November 2026. Basis perbandingan adalah build lokal Phase 2 versus build lokal Phase 3, bukan perbandingan production sebelum/sesudah deployment. GSC terbaru belum tersedia. Keyword mapping seluruh 36 URL berstatus hipotesis di 06-keyword-mapping.md.

## Perubahan aktual

- Meninjau seluruh 36 halaman, memperbarui 15 title dan 36 description. Title yang sudah spesifik tetap dipertahankan. Semua title/description unik berdasarkan hasil rendered HTML.
- Homepage mempertahankan nama lengkap sebagai title/H1. Teks pengantar menghubungkan pemilik dengan Pendidikan Teknologi Informasi FILKOM Universitas Brawijaya. OG/Twitter description diselaraskan dengan meta description.
- About, arsip karya, pencapaian dan kontak memiliki H1 bertopik jelas. Struktur about dan kontak memakai H2 untuk subbagian; kartu arsip memakai H2, kartu homepage tetap H3 di bawah H2 section.
- Property seoTitle opsional memisahkan judul pencarian deskriptif dari judul kartu/proyek yang sudah dikenal. Description seluruh 31 MDX diperjelas berdasarkan materi yang sudah ada; sertifikasi berbahasa Indonesia pada metadata dan heading bagian.
- About memakai figure/figcaption untuk foto, kontak section berlabel, dan footer detail memakai nav berlabel. Tidak membungkus ulang semua elemen hanya demi menambah tag semantik.
- Lima belas proyek diberi paragraf tautan kontekstual. Tiga halaman EM UB menjelaskan perbedaan konteks peran organisasi dan produk lewat tautan silang; tidak menghapus/menggabungkan URL.
- Seluruh 31 detail memiliki tautan profil pemilik. About menghubungkan langsung case study EM UB dan BCC. Karya/pencapaian saling terhubung. Link demo/kode mendapat accessible name khusus dan rel yang sesuai.
- Filter pencapaian memiliki aria-pressed; thumbnail sertifikat memakai button berlabel. Modal mendapat dialog semantics, judul terhubung, fokus awal, trap Tab/Shift+Tab, Escape, return focus dan scroll lock.
- Token muted text light theme digelapkan sedikit (46,9% → 45% lightness) untuk mengatasi kontras teks proses. Warna brand, layout, font, cover dan animasi desain dipertahankan.

## Halaman yang diperbaiki

Kelima halaman utama diubah sesuai daftar di atas. Seluruh 31 detail di tabel metadata berikut mendapat description, navigasi profil, dan metadata social yang mengikuti template. Paragraf kontekstual ditambahkan pada website-em-ub, emub-2026, em-ub-web-2026, bcc-pm, bcc-website, bios-2025, bios-2026, filkom-league-2026, tehmbois-wcc, pelatihan-ar-sdn-3-dono, kelasin, jaspel-rsud-moh-saleh, cert-java, cert-pbo, cert-pm.

Sitemap masih 36 URL. Tidak ada halaman keyword nama tambahan. Publikasi formal belum didokumentasikan dengan URL penerbit/DOI yang terverifikasi; PHIC diperlakukan sebagai pengalaman kompetisi sesuai data yang ada.

## Metadata sebelum dan sesudah

Tabel bersumber dari HTML build, bukan string yang diasumsikan dari kode. Description yang panjang tidak otomatis salah; tidak menerapkan batas karakter sebagai aturan ranking. OG/Twitter sesudah mengikuti title/description ini, dengan cover proyek yang sudah ada atau foto profil fallback.

| URL | Title sebelum | Title sesudah | Description sebelum | Description sesudah |
| --- | --- | --- | --- | --- |
| / | Muhammad Ahmad Rofi’us Su’ud — Portofolio Resmi | Muhammad Ahmad Rofi’us Su’ud — Portofolio Resmi | Portofolio resmi Muhammad Ahmad Rofi’us Su’ud, mahasiswa FILKOM UB yang berfokus pada product management, kepemimpinan, dan pengembangan produk digital. | Portofolio Muhammad Ahmad Rofi’us Su’ud, mahasiswa FILKOM Universitas Brawijaya. Jelajahi karya produk digital, pengalaman product management, dan organisasi. |
| /about | Tentang — Muhammad Ahmad Rofi’us Su’ud | Profil Muhammad Ahmad Rofi’us Su’ud \| FILKOM UB | Kenali Muhammad Ahmad Rofi’us Su’ud (MARS), pengalaman product management, desain, dan pengembangan produk digital. | Kenali Rofi, mahasiswa Pendidikan Teknologi Informasi FILKOM Universitas Brawijaya, serta pengalamannya dalam product management, EM UB, dan BCC. |
| /projects | Karya — Muhammad Ahmad Rofi’us Su’ud | Karya & Pengalaman — Muhammad Ahmad Rofi’us Su’ud | Proyek digital, pengalaman organisasi, dan eksplorasi Muhammad Ahmad Rofi’us Su’ud. | Jelajahi karya digital, product management, pengalaman organisasi, dan kolaborasi akademik Rofi melalui dokumentasi proyek dan kontribusinya. |
| /competitions | Pencapaian — Muhammad Ahmad Rofi’us Su’ud | Prestasi & Pengalaman Berbagi — Muhammad Ahmad Rofi’us Su’ud | Penghargaan kompetisi, pengalaman berbagi, dan sertifikasi Muhammad Ahmad Rofi’us Su’ud. | Catatan kompetisi, mentoring, pemateri, dan brand ambassador Rofi, mahasiswa FILKOM UB, beserta dokumentasi sertifikat yang tersedia. |
| /contact | Kontak — Muhammad Ahmad Rofi’us Su’ud | Kontak & Kolaborasi — Muhammad Ahmad Rofi’us Su’ud | Hubungi Muhammad Ahmad Rofi’us Su’ud untuk diskusi produk, proyek, dan kolaborasi. | Hubungi Rofi untuk diskusi product management, desain, atau pengembangan produk digital melalui email dan profil profesional yang tercantum. |
| /projects/akademirofi | Akademirofi — Platform Belajar BMC, BPC, dan Essay — Muhammad Ahmad Rofi’us Su’ud | Akademirofi — Belajar BMC, BPC & Essay — Muhammad Ahmad Rofi’us Su’ud | Platform belajar digital yang membantu rekan dan adik tingkat bertumbuh melalui jalur BMC, BPC, dan essay dengan pembelajaran yang reflektif dan terarah. | Platform belajar BMC, BPC, dan essay bagi rekan serta adik tingkat. Kenali konsep jalur belajar dan tampilan Akademirofi dalam dokumentasi proyek ini. |
| /projects/amora | Amora — Muhammad Ahmad Rofi’us Su’ud | Amora — Aplikasi Edukasi Pernikahan — Muhammad Ahmad Rofi’us Su’ud | Aplikasi edukasi pernikahan yang dirancang untuk membangun fondasi hubungan yang kuat dan harmonis bagi pasangan. | Kenali Amora, aplikasi edukasi pernikahan, beserta fitur dan kontribusi Rofi sebagai pengembang utama dalam pengembangan produk ini. |
| /projects/arah-career | ARAH — Platform Eksplorasi Karier — Muhammad Ahmad Rofi’us Su’ud | ARAH — Platform Eksplorasi Karier — Muhammad Ahmad Rofi’us Su’ud | Platform pendamping mahasiswa untuk mengenali potensi diri, menemukan peluang yang relevan, dan menyusun langkah pertumbuhan karier. | Konsep platform ARAH untuk membantu mahasiswa mengenali potensi, menjelajahi peluang, dan merencanakan langkah karier. Lihat gambaran produk dan demonya. |
| /projects/bcc-pm | Product Manager BCC — Muhammad Ahmad Rofi’us Su’ud | Product Manager BCC — Muhammad Ahmad Rofi’us Su’ud | Memimpin strategi produk dan roadmap pengembangan di Basic Computing Community (BCC), organisasi teknologi mahasiswa terkemuka di Fakultas Ilmu Komputer. | Pengalaman Rofi sebagai Product Manager BCC FILKOM UB dalam menyusun strategi produk, roadmap, dan koordinasi pengembangan bersama tim. |
| /projects/bcc-website | Website Resmi BCC (Basic Computing Community) — Muhammad Ahmad Rofi’us Su’ud | Website BCC FILKOM UB — Muhammad Ahmad Rofi’us Su’ud | Pengembangan platform web resmi organisasi Basic Computing Community (BCC) FILKOM UB sebagai pusat inovasi, portofolio proyek, kemitraan, dan kegiatan komunitas. | Pengembangan website Basic Computing Community FILKOM UB. Kenali peran Product Manager, prioritas fitur, dan informasi komunitas yang disajikan. |
| /projects/bios-2025 | Bendahara Futsal BIOS — Muhammad Ahmad Rofi’us Su’ud | Bendahara Futsal BIOS — Muhammad Ahmad Rofi’us Su’ud | Bertanggung jawab atas pengelolaan keuangan tim futsal BIOS, memastikan alokasi dana yang efektif untuk latihan dan kompetisi. | Pengalaman mengelola keuangan tim futsal BIOS sebagai bendahara, mulai dari anggaran latihan dan kompetisi hingga pencatatan serta laporan keuangan. |
| /projects/bios-2026 | Ketua Futsal BIOS — Muhammad Ahmad Rofi’us Su’ud | Ketua Futsal BIOS — Muhammad Ahmad Rofi’us Su’ud | Memimpin dan mengelola tim futsal BIOS, bertanggung jawab atas strategi tim, pengembangan pemain, dan koordinasi turnamen. | Pengalaman Rofi sebagai Ketua Futsal BIOS dalam mengelola tim, mengoordinasikan latihan, dan menyiapkan keikutsertaan dalam turnamen. |
| /projects/cekat | CEKAT — Platform Kesehatan Digital — Muhammad Ahmad Rofi’us Su’ud | CEKAT — Platform Kesehatan Digital — Muhammad Ahmad Rofi’us Su’ud | Platform kesehatan digital untuk membantu mendeteksi risiko penyakit tidak menular lebih dini, mencatat asupan nutrisi, dan menyinkronkan data klinis dari CEKAT Kiosk Station. | Konsep CEKAT menggabungkan pemeriksaan risiko penyakit tidak menular, catatan nutrisi, dan sinkronisasi data Kiosk Station. Lihat gambaran platform dan demonya. |
| /projects/cert-java | Java Fundamental Certificate — Muhammad Ahmad Rofi’us Su’ud | Sertifikasi Dasar Java — Muhammad Ahmad Rofi’us Su’ud | Certification of basic Java programming competency. | Dokumentasi sertifikat dasar Java milik Rofi, mencakup sintaks, struktur data, dan logika pemrograman. Lihat ringkasan materi serta gambar sertifikat. |
| /projects/cert-pbo | Sertifikasi PBO — Muhammad Ahmad Rofi’us Su’ud | Sertifikasi PBO — Muhammad Ahmad Rofi’us Su’ud | Kemahiran yang diakui dalam prinsip Pemrograman Berorientasi Objek. | Dokumentasi sertifikat Pemrograman Berorientasi Objek milik Rofi. Pelajari ringkasan konsep inheritance, polymorphism, encapsulation, dan abstraction. |
| /projects/cert-pm | Sertifikasi Manajemen Proyek — Muhammad Ahmad Rofi’us Su’ud | Sertifikasi Manajemen Proyek — Muhammad Ahmad Rofi’us Su’ud | Keterampilan yang terbukti dalam mengelola siklus hidup pengembangan perangkat lunak. | Dokumentasi sertifikat manajemen proyek milik Rofi, dengan ringkasan perencanaan, koordinasi tim, dan metodologi dasar pengelolaan proyek. |
| /projects/ekspedisi-nusantara | Ekspedisi Nusantara — Math Adventure — Muhammad Ahmad Rofi’us Su’ud | Ekspedisi Nusantara — Math Adventure — Muhammad Ahmad Rofi’us Su’ud | Game edukasi matematika untuk siswa sekolah dasar yang mengajak anak belajar lewat petualangan interaktif di berbagai wilayah Nusantara. | Game edukasi matematika untuk siswa SD dengan petualangan di berbagai wilayah Nusantara. Kenali konsep belajar sambil bermain dalam Ekspedisi Nusantara. |
| /projects/em-ub-web-2026 | Ketua Pelaksana Website EM UB 2026 — Muhammad Ahmad Rofi’us Su’ud | Ketua Pelaksana Website EM UB 2026 — Muhammad Ahmad Rofi’us Su’ud | Memimpin tim pengembangan website resmi Eksekutif Mahasiswa Universitas Brawijaya 2026 sebagai platform informasi dan aspirasi mahasiswa. | Tanggung jawab Rofi sebagai Ketua Pelaksana Website EM UB 2026 dalam merencanakan pekerjaan dan mengoordinasikan tim pengembangan. |
| /projects/emub-2026 | Staff KOMINFO EM UB 2026 — Muhammad Ahmad Rofi’us Su’ud | Staff KOMINFO EM UB 2026 — Muhammad Ahmad Rofi’us Su’ud | Bergabung sebagai Staff di Departemen Komunikasi dan Informasi Eksekutif Mahasiswa Universitas Brawijaya 2026, dengan peran sebagai Product Manager Website. | Pengalaman Rofi sebagai Staf KOMINFO EM UB 2026 dengan peran Product Manager Website, termasuk koordinasi kebutuhan departemen dan pengembangan web. |
| /projects/filkom-league-2026 | Ketua Pelaksana Filkom League 2026 — Muhammad Ahmad Rofi’us Su’ud | Ketua Pelaksana Filkom League 2026 — Muhammad Ahmad Rofi’us Su’ud | Memimpin pelaksanaan Filkom League 2026, ajang kompetisi olahraga dan e-sports terbesar di Fakultas Ilmu Komputer Universitas Brawijaya. | Pengalaman sebagai Ketua Pelaksana Filkom League 2026 di FILKOM Universitas Brawijaya, termasuk koordinasi pelaksanaan kompetisi olahraga dan e-sports. |
| /projects/gestory | Gestory — Muhammad Ahmad Rofi’us Su’ud | Gestory — Edukasi Kesehatan Berbasis Gestur — Muhammad Ahmad Rofi’us Su’ud | Asisten belajar berbasis sensor gerak yang siap melatih fokusmu. Gunakan gestur tangan untuk menaklukkan misi tantangan kesehatan — tanpa keyboard, tanpa mouse! | Gestory mengeksplorasi edukasi kesehatan melalui sensor gerak dan gestur tangan. Kenali fitur serta peran Rofi sebagai pengembang utama dan UI designer. |
| /projects/ifhamkids | IfhamKids — Belajar Bahasa Arab untuk Anak — Muhammad Ahmad Rofi’us Su’ud | IfhamKids — Belajar Bahasa Arab untuk Anak — Muhammad Ahmad Rofi’us Su’ud | Platform belajar Bahasa Arab untuk siswa SD/MI melalui kosakata, pelafalan, dan kalimat sederhana yang dekat dengan keseharian anak. | Konsep belajar bahasa Arab untuk siswa SD/MI melalui kosakata, pelafalan, dan kalimat sederhana. Jelajahi gambaran IfhamKids dan demo yang tersedia. |
| /projects/jaspel-rsud-moh-saleh | Perhitungan Jaspel — RSUD Moh. Saleh Probolinggo — Muhammad Ahmad Rofi’us Su’ud | Jaspel RSUD Moh. Saleh Probolinggo — Muhammad Ahmad Rofi’us Su’ud | Kolaborasi bersama dosen dalam proyek perhitungan jasa pelayanan (Jaspel) RSUD Moh. Saleh Probolinggo, dengan peran sebagai anggota tim IT. | Kolaborasi bersama dosen untuk perhitungan jasa pelayanan RSUD Moh. Saleh Probolinggo. Rofi terlibat sebagai anggota tim IT dalam proyek ini. |
| /projects/kelasin | Kelasin — Platform Digital — Muhammad Ahmad Rofi’us Su’ud | Kelasin — Media Pembelajaran SD dengan AI — Muhammad Ahmad Rofi’us Su’ud | Platform berbasis AI untuk membantu guru membuat media pembelajaran SD yang interaktif dan digunakan langsung di TV kelas. Dikembangkan sebagai karya kompetisi. | Kelasin membantu guru menyiapkan media pembelajaran SD dengan AI untuk TV interaktif kelas. Lihat konsep aktivitas belajar dan demo karya kompetisi ini. |
| /projects/lki-amd | LKI AMD — Muhammad Ahmad Rofi’us Su’ud | LKI AMD — Muhammad Ahmad Rofi’us Su’ud | Anggota aktif dan kontributor organisasi LKI AMD, berfokus pada pengembangan akademik dan moral. | Pengalaman Rofi sebagai anggota dan kontributor LKI AMD melalui kegiatan diskusi, pengabdian masyarakat, serta pengembangan akademik dan kepemimpinan. |
| /projects/mandorin | Mandorin — Platform Pembangunan Hunian — Muhammad Ahmad Rofi’us Su’ud | Mandorin — Platform Pembangunan Hunian — Muhammad Ahmad Rofi’us Su’ud | Prototipe platform pembangunan hunian dengan alur untuk pemilik proyek dan mandor, dikembangkan saat seleksi intern BCC. | Prototipe Mandorin dikembangkan saat seleksi intern BCC, dengan alur bagi pemilik proyek dan mandor. Lihat gambaran platform serta demo yang tersedia. |
| /projects/misra | Profil Sekolah Dasar — Muhammad Ahmad Rofi’us Su’ud | Profil Sekolah Dasar — Muhammad Ahmad Rofi’us Su’ud | Website profil sekolah yang dirancang untuk menjadi pusat informasi digital bagi siswa, wali murid, dan masyarakat umum. | Pengembangan website profil sekolah dasar sebagai pusat informasi bagi siswa, wali murid, dan masyarakat. Kenali fitur dan peran Rofi sebagai web developer. |
| /projects/ngajikidz | NgajiKidz — Belajar Mengaji dengan AI — Muhammad Ahmad Rofi’us Su’ud | NgajiKidz — Belajar Mengaji dengan AI — Muhammad Ahmad Rofi’us Su’ud | Platform belajar Al-Qur’an untuk anak yang memadukan AI, gamifikasi Islami, dan bimbingan Ustadz tersertifikasi. | Konsep NgajiKidz mengeksplorasi pembelajaran Al-Qur’an untuk anak melalui AI, gamifikasi, dan bimbingan mengaji. Lihat gambaran produk serta demo. |
| /projects/pahamin | PahamIn — Muhammad Ahmad Rofi’us Su’ud | PahamIn — Aplikasi Belajar Interaktif — Muhammad Ahmad Rofi’us Su’ud | Aplikasi belajar cerdas interaktif yang mempersonalisasi materi edukasi dengan visualisasi canggih dan asisten belajar berbasis kecerdasan buatan. | PahamIn mengeksplorasi pembelajaran interaktif dengan personalisasi materi dan asisten AI. Kenali fitur serta kontribusi Rofi sebagai frontend engineer. |
| /projects/pelatihan-ar-sdn-3-dono | Pelatihan Media Pembelajaran AR — SDN 3 Dono — Muhammad Ahmad Rofi’us Su’ud | Pelatihan AR untuk Guru SDN 3 Dono — Muhammad Ahmad Rofi’us Su’ud | Kolaborasi bersama dosen dalam pelatihan guru SDN 3 Dono, Tulungagung, untuk membuat media pembelajaran berbasis augmented reality (AR). | Kolaborasi bersama dosen dalam pelatihan guru SDN 3 Dono, Tulungagung, untuk membuat media pembelajaran berbasis augmented reality. Lihat dokumentasinya. |
| /projects/rebite | ReBite Project — Muhammad Ahmad Rofi’us Su’ud | ReBite — Platform Pengelolaan Food Waste — Muhammad Ahmad Rofi’us Su’ud | Platform inovatif untuk pengelolaan sisa makanan (food waste) yang menghubungkan bisnis FnB dengan konsumen untuk mengurangi limbah pangan. | ReBite menghubungkan bisnis FnB dengan konsumen untuk pemanfaatan sisa makanan. Kenali fitur dan peran Rofi sebagai ketua proyek sekaligus pengembang. |
| /projects/sobataman | SobatAman — Platform Pendamping Terverifikasi — Muhammad Ahmad Rofi’us Su’ud | SobatAman — Platform Pendamping Terverifikasi — Muhammad Ahmad Rofi’us Su’ud | Platform yang menghubungkan keluarga dengan pendamping terverifikasi untuk layanan on-demand yang aman dan penuh perhatian. | Konsep SobatAman menghubungkan keluarga dengan pendamping untuk layanan on-demand. Lihat gambaran kebutuhan pengguna, konsep platform, dan demonya. |
| /projects/tehmbois-wcc | TehMbois — Website Brand Minuman — Muhammad Ahmad Rofi’us Su’ud | TehMbois — Website Brand Minuman — Muhammad Ahmad Rofi’us Su’ud | Website brand TehMbois dengan identitas visual yang segar dan tampilan produk responsif. Proyek ini meraih Juara 1 Web Creation Competition (WCC) Universitas Islam Nahdlatul Ulama Jepara 2026. | Website brand minuman TehMbois, karya Juara 1 WCC UNISNU Jepara 2026. Lihat gambaran proyek, eksplorasi antarmuka, dan tampilan lintas perangkat. |
| /projects/telaahkarier | TelaahKarier — Analisis Risiko Lowongan Kerja — Muhammad Ahmad Rofi’us Su’ud | TelaahKarier — Analisis Risiko Lowongan Kerja — Muhammad Ahmad Rofi’us Su’ud | Platform untuk membantu pencari kerja memeriksa lowongan digital, mengenali potensi risiko, dan memahami langkah aman sebelum melamar. | Konsep TelaahKarier membantu meninjau risiko lowongan kerja digital sebelum melamar. Kenali alur pemeriksaan tanda bahaya dan demo platform yang tersedia. |
| /projects/umkm-go | UMKM Go — Muhammad Ahmad Rofi’us Su’ud | UMKM Go — Pasar UMKM Desa — Muhammad Ahmad Rofi’us Su’ud | Platform e-commerce dan digitalisasi Pasar UMKM Desa untuk mempromosikan serta memasarkan produk hasil bumi dan kerajinan tangan khas Desa Caringin. | Website Pasar UMKM Desa Caringin untuk katalog hasil bumi dan kerajinan. Kenali fitur serta peran Rofi sebagai full stack developer dalam proyek UMKM Go. |
| /projects/website-em-ub | Website Resmi EM UB 2026 — Muhammad Ahmad Rofi’us Su’ud | Website Resmi EM UB 2026 — Muhammad Ahmad Rofi’us Su’ud | Pengembangan platform digital utama Eksekutif Mahasiswa Universitas Brawijaya 2026 sebagai pusat informasi, program kerja, dan aspirasi bagi seluruh mahasiswa. | Website Eksekutif Mahasiswa Universitas Brawijaya 2026. Kenali kontribusi Rofi sebagai Product Manager dan Ketua Pelaksana, serta fitur portal mahasiswa. |

## Ilustrasi hasil pencarian

Berikut simulasi teks, bukan tangkapan hasil Google atau jaminan judul/snippet/posisi. Google dapat menulis ulang, memotong, atau memilih cuplikan berbeda sesuai query/perangkat.

> rofiporto.vercel.app
>
> **Muhammad Ahmad Rofi’us Su’ud — Portofolio Resmi**
>
> Portofolio Muhammad Ahmad Rofi’us Su’ud, mahasiswa FILKOM Universitas Brawijaya. Jelajahi karya produk digital, pengalaman product management, dan organisasi.

> rofiporto.vercel.app/about
>
> **Profil Muhammad Ahmad Rofi’us Su’ud | FILKOM UB**
>
> Kenali Rofi, mahasiswa Pendidikan Teknologi Informasi FILKOM Universitas Brawijaya, serta pengalamannya dalam product management, EM UB, dan BCC.

> rofiporto.vercel.app/projects/gestory
>
> **Gestory — Edukasi Kesehatan Berbasis Gestur — Muhammad Ahmad Rofi’us Su’ud**
>
> Gestory mengeksplorasi edukasi kesehatan melalui sensor gerak dan gestur tangan. Kenali fitur serta peran Rofi sebagai pengembang utama dan UI designer.


## Internal linking dan orphan pages

Regression test mengekstrak anchor dari seluruh HTML dan menjalankan traversal dari beranda. Hasil final **tidak ada orphan page** pada 36 route publik. Graph dan daftar orphanPages tersimpan di evidence/phase3-smoke.json. Sebelum optimasi seluruh detail sudah tersedia melalui arsip; perubahan ini memperbaiki konteks tautan, bukan mengklaim menemukan orphan yang tidak ada. Metadata snapshot menyimpan link sebelum/sesudah untuk review.

## Konfirmasi konten oleh pemilik

| Konten | Konfirmasi yang diperlukan | Perlakuan Phase 3 |
| --- | --- | --- |
| Tahun YPS | Data tampilan Agu 2024 versus sertifikat bertahun 2026 yang pernah diberikan | Tahun tidak diubah otomatis |
| Mawapres FILKOM 2027 | Tahun acara/cohort versus tanggal penetapan prestasi | Mempertahankan label dokumen |
| IPB/LDC 6/IDF | Kesesuaian nama event pada title, description dan sertifikat | Tidak membuat nama kompetisi baru |
| Website EM UB | Sumber angka lebih dari 60.000, definisi audience/pengguna, workflow Agile dan pembagian kontribusi tim | Tidak memperbesar atau memasukkan angka ke metadata baru |
| Bagian Dampak proyek lama | Bukti peningkatan penjualan/engagement/kinerja atau apakah masih tujuan produk | Metadata memakai fungsi produk dan peran yang sudah disebut, bukan klaim hasil baru |
| Proyek baru tanpa role/date | Peran, tahun, tim, status konsep/prototipe/implementasi dan bukti kontribusi | Tidak mengisi role/date/hasil baru |
| CEKAT/SobatAman/NgajiKidz | Batas fitur yang benar-benar berfungsi dan verifikasi klinis/pendamping/sertifikasi pembimbing bila diklaim | Metadata memakai konsep/gambaran; tidak menambah klaim keandalan |
| Publikasi | Judul, daftar penulis, penerbit/DOI dan URL publik jika memang ada | Belum membuat publikasi formal atau klaim terbit |
| Profil akademik/sameAs | Konfirmasi kepemilikan akun dan URL profil kampus jika tersedia | Tidak menambahkan URL dugaan |

Proyek dengan role belum tersedia pada frontmatter saat snapshot akhir:

- akademirofi — Akademirofi — Platform Belajar BMC, BPC, dan Essay
- arah-career — ARAH — Platform Eksplorasi Karier
- cekat — CEKAT — Platform Kesehatan Digital
- ekspedisi-nusantara — Ekspedisi Nusantara — Math Adventure
- ifhamkids — IfhamKids — Belajar Bahasa Arab untuk Anak
- kelasin — Kelasin — Platform Digital
- ngajikidz — NgajiKidz — Belajar Mengaji dengan AI
- sobataman — SobatAman — Platform Pendamping Terverifikasi
- tehmbois-wcc — TehMbois — Website Brand Minuman
- telaahkarier — TelaahKarier — Analisis Risiko Lowongan Kerja

## Pengujian dan batasan

- npm run build mode production lulus, lima halaman utama statis dan 31 proyek SSG. Log evidence/phase3-build.log.
- npm run lint lulus (exit 0). npm run typecheck lulus (exit 0). Log phase3-lint.log dan phase3-typecheck.log.
- Regression HTTP lulus **36 halaman / 789 pemeriksaan**, termasuk semua pemeriksaan Phase 2, uniqueness metadata, description social konsisten, heading tanpa lompatan dan traversal link. Evidence phase3-smoke.json.
- Lighthouse lokal 12.8.2 mobile untuk accessibility/SEO berjalan. Accessibility 96, SEO 100. Kegagalan kontras yang tersisa hanya tiga angka dekoratif .work-number ber-aria-hidden (1,93:1). Teks proses yang sebelumnya gagal tidak lagi masuk daftar kegagalan. Tidak mengklaim aksesibilitas menyeluruh selesai atau seluruh tema telah divalidasi.
- Pemeriksaan browser Phase 3 belum berjalan. Automatic approval review menolak eksekusi karena batas penggunaan layanan, bukan keputusan bahwa pengujian tidak aman. Akibatnya pemeriksaan visual mobile/desktop, Tab trap, return-focus dan Escape pada modal baru belum terverifikasi manual. Implementasi tersebut lulus build/types dan masih membutuhkan regression browser sebelum dianggap tervalidasi penuh.
- Tidak ada klaim peningkatan ranking, CTR, volume keyword, field CWV, atau skor performance baru dari fase ini. Tidak menjalankan pengujian screen reader.
- Diagnostic NoFallbackError pada negative URL test Next 16.1.6 tetap merupakan batasan dari Phase 2; status 404/noindex lulus.
- Deployment preview Vercel dan data akun eksternal masih pending. Guard preview dari Phase 2 dipertahankan; phase ini menguji build production lokal.

## Referensi

- [Google title links](https://developers.google.com/search/docs/appearance/title-link)
- [Google snippets](https://developers.google.com/search/docs/appearance/snippet)
- [Google link best practices](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)

Tabel metadata, hipotesis keyword dan daftar konfirmasi merupakan deliverable Phase 3. Otorisasi push setelah Phase 3 diberikan pengguna pada pesan lanjutan; hasil push dicatat di implementation log setelah benar-benar berhasil.

Checkpoint lokal 01c7bb9 sudah dibuat. Push masih tertahan automatic approval review karena memicu production Vercel; diminta persetujuan eksplisit deployment. Tidak ada push yang berhasil atau deployment yang diklaim. Phase 4 belum dimulai sesuai urutan yang diminta pengguna.

## Update checkpoint production — 24 November 2026

Pengguna kemudian menyetujui push master dan production. Commit cd05aa6 berhasil dipush, integrasi Vercel success, dan production lulus 36 halaman/789 pemeriksaan (evidence/phase3-production-deployed.json). Catatan penolakan awal di atas adalah riwayat yang telah terselesaikan. Phase 4 kini selesai lokal, didokumentasikan pada 08–10; belum dideploy.
