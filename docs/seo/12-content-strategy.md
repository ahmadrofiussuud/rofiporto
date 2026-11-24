# Phase 6 — Content strategy & authority

24 November 2026. Perubahan lokal, tidak ada push/deployment atau perubahan akun eksternal. Baseline keyword tetap hipotesis; belum ada export Search Console untuk mengukur volume, posisi rata-rata atau perubahan traffic. Screenshot SERP adalah pengamatan satu query/sesi, bukan diagnosis ranking.

## Arsitektur yang dipertahankan

Situs memiliki 5 route utama dan 31 detail karya MDX: 16 kategori lomba, 8 organisasi, 3 skill, 2 akademik, 2 kerja (kategori merupakan pengelompokan editorial, bukan bukti kontrak kerja atau status semua karya). Inventaris awal: `evidence/phase6-content-inventory.json`. Render tetap server/static. Tidak menambah route artikel, publikasi, paten atau halaman kosong.

| Kebutuhan | Tujuan sekarang | Keputusan |
|---|---|---|
| Profil | /about | Pusat identitas, pendidikan dan konteks peran |
| Karya/case study | /projects dan detail | Perkaya detail yang punya bukti; jangan pecah variasi keyword nama |
| Prestasi/mentoring | /competitions + fragment | Sertifikat, hasil dan konteks; jangan menyamakan finalis dengan publikasi |
| Profesional | /projects kategori kerja, /about | Pertahankan pada arsip, belum perlu landing page baru yang mengulang kartu |
| Organisasi | /about, filter organisasi, detail | Pisahkan pengalaman jabatan dari produk yang dikerjakan; EM UB 3 URL saling menaut dengan intent berbeda |
| Publikasi/HKI | Belum terbukti | Tunggu DOI/URL penerbit atau nomor dan tautan registrasi resmi; tidak membuat halaman kosong |
| Artikel/insights | Belum ada artikel orisinal siap terbit | Backlog di dokumen 13; buat route hanya setelah naskah substantif dan bukti siap |

EM UB: /website-em-ub membahas produk; /emub-2026 peran KOMINFO; /em-ub-web-2026 koordinasi ketua pelaksana. Jangan menyalin case study lengkap ke ketiganya. Konsolidasi/redirect hanya setelah evaluasi query dan peran konten, bukan di phase ini.

## Kualitas bukti dan implementasi

1. **Terverifikasi sumber eksternal:** berita FILKOM Amora muncul dalam hasil pencarian terindeks, 25 Januari 2026. Halaman langsung membalas 403 pada alat web; teks sumber tersedia melalui hasil pencarian. Verifikasi manual halaman utuh tetap disarankan. Sertifikat WCC lokal sudah diperiksa visual pada Phase 4.
2. **Diberikan pemilik:** AR SDN 3 Dono, Jaspel tim IT, Kelasin tidak juara, Mandorin seleksi intern BCC, dokumentasi foto/cover. Ini bukan bukti riset/metrik yang belum pernah diberikan.
3. **Tercatat repository:** peran, stack, fitur EM UB/BCC dan proyek lainnya. Layak menjelaskan catatan proyek, bukan konfirmasi independen semua implementasi atau status live.
4. **Belum tersedia:** wawancara/riset pengguna, alasan keputusan rinci, kronologi sprint, metrik outcome, testimoni, lessons learned pribadi. Simpan sebagai permintaan data; jangan mengarang narasi retrospektif.

Perubahan pada 13 MDX: amora, tehmbois-wcc, pelatihan-ar-sdn-3-dono, website-em-ub, bcc-website, kelasin, mandorin, gestory, pahamin, rebite, umkm-go, misra, filkom-league-2026. Tidak mengubah cover, layout atau tanggal acara agar terlihat baru.

- Amora: sumber berita kampus dan capaian tim ditambahkan; peran ketua tim dibedakan dari peran teknis yang tercatat di repo. Klaim penurunan perceraian tidak lagi disajikan sebagai hasil terbukti. Model fitur diarahkan pada konsep yang diberitakan, bukan klaim kemampuan layanan klinis.
- WCC: tautan langsung sertifikat; hasil Juara 1 dibedakan dari pembagian kontribusi yang belum tersedia.
- AR: tujuan, keterlibatan, foto dan batas hasil; tidak membuat jumlah guru/tanggal/perangkat.
- EM UB/BCC: sumber produk, status dan batas pengukuran; menghapus angka jangkauan 60.000 dan klaim audit performa/keamanan yang belum dibuktikan. Detail tugas repository dipertahankan.
- Kelasin/Mandorin: prototipe/konteks kompetisi dan demo, tanpa klaim pengguna/transaksi/hasil belajar.
- Lima karya lain: bagian dampak diubah menjadi tujuan dan batas hasil karena tak ada metrik evaluasi. Filkom League: jumlah >50 panitia yang belum dibuktikan tidak dipertahankan sebagai fakta.

## Kerangka case study dan kesiapan data

Kerangka lengkap berikut adalah alat editorial, bukan 11 subjudul kosong yang wajib diterbitkan. R = repository, O = pemilik, E = bukti eksternal/sertifikat; tanda ? memerlukan data.

| Bagian | EM UB | BCC website | Amora | TehMbois | AR Dono | Kelasin | Mandorin |
|---|---|---|---|---|---|---|---|
| Overview | R portal kabinet | R platform komunitas | R/E konsep komunikasi | O/R brand minuman | O pelatihan guru | O media SD/AI | O prototipe hunian |
| Problem | R kebutuhan informasi | R struktur informasi | E konteks komunikasi | ? brief lomba | O pembuatan media AR | O penyiapan media | O transparansi alur |
| Context | R EM UB 2026 | R BCC FILKOM | E kompetisi | E WCC 2026 | O kolaborasi dosen | O kompetisi tanpa juara | O seleksi intern BCC |
| Role | R PM/ketua | R PM | E ketua; R teknis | ? rincian individu | O kolaborasi | ? | ? rincian individu |
| Research/decisions | R prioritas fitur; ? artefak | R roadmap; ? artefak | ? | ? | ? | ? | ? |
| Solution | R fitur portal | R katalog/kemitraan | E konsep fitur | O/R cover menu | O media AR | O/R aktivitas belajar | O/R pilihan dua peran |
| Development process | R koordinasi; ? timeline | R koordinasi; ? timeline | ? | ? | ? langkah pelatihan | ? | ? |
| Technology | R stack | R stack | R stack | ? | ? perangkat/tools | ? | ? |
| Outcomes | ? penggunaan | R ongoing; ? metrik | E Juara 3 tim | E Juara 1 | O foto; ? evaluasi | O tidak juara | O prototipe; ? evaluasi |
| Lessons learned | ? refleksi pemilik | ? | ? | ? | ? | ? | ? |
| Evidence | R demo/cover | R demo/cover | E berita, R demo | E sertifikat, O cover | O foto | O demo/cover | O demo/cover |

ReBite, Gestory, PahamIn, UMKM Go dan Profil Sekolah memiliki overview/fitur/peran/stack di repository, tetapi belum punya riset, kronologi, outcome terukur dan refleksi. Perbaikan phase ini membatasi klaim, bukan menambahkan cerita proses fiktif. Organisasi/sertifikasi tidak dipaksa menjadi studi kasus software. Proyek baru ARAH/CEKAT/SobatAman/IfhamKids/NgajiKidz/TelaahKarier/Akademirofi dan lainnya menunggu peran serta bukti proses sebelum ekspansi panjang.

## Permintaan data pemilik

Untuk setiap proyek prioritas (EM UB, BCC, Amora, WCC, AR): (D1) tanggal/status yang benar; (D2) peran pribadi vs tim; (D3) satu masalah/brief asli; (D4) satu keputusan nyata dan alasan/alternatif; (D5) tahapan kerja; (D6) tools yang benar-benar dipakai; (D7) outcome berikut cara ukur atau nyatakan belum diukur; (D8) satu pelajaran pribadi; (D9) 1–3 bukti publik/tersamarkan beserta izin. Tidak perlu kirim kredensial, data siswa/pasien, anggaran internal atau data pengguna.

Khusus Jaspel: konfirmasi izin publikasi nama instansi/peran dan contoh tampilan sintetis yang boleh dibagikan. Jangan mengunggah data pasien, remunerasi pegawai, formula internal atau data keuangan. Untuk HKI/publikasi, berikan tautan registrasi/DOI, judul, penulis/inventor dan status, bukan hanya sertifikat lomba. Tanggal YPS/Mawapres/IPB dan klaim lama lain pada SEO-14 tetap perlu konfirmasi.

## Generative search dan bahasa

Gunakan ringkasan faktual di awal, subjudul yang menjawab pertanyaan pembaca, atribusi peran, sumber dekat klaim, serta tautan antar profil/karya/bukti. Structured data harus selaras teks. Tidak membuat llms.txt atau schema AI sebagai syarat ranking, tidak menjanjikan sitasi AI.

Screenshot pemilik: bio GitHub/Instagram berbahasa Inggris, cuplikan Rofiporto Indonesia. Live HTML Rofiporto HTTP 200, lang=id; GitHub HTTP 200, lang=en dan mengandung undergraduate. Observasi read-only belum menemukan URL portfolio di HTML GitHub; bukan audit semua repository. Bukti `phase6-live-observations.json`. Label “Translate this page” adalah fasilitas Google, bukan bukti situs mengganti bahasa. Metadata situs tidak mengendalikan cuplikan profil layanan lain.

GitHub yang tampil di atas portfolio tidak membuktikan canonical salah, penalty, atau perubahan algoritma tertentu. Posisi dinamis; bandingkan query/page GSC pada rentang sebanding sebelum diagnosis. Phase 4–6 masih lokal sehingga belum dapat memberi pengaruh production/index. Jangan menurunkan/menghapus GitHub demi memindahkan ranking; gunakan profil nyata sebagai jalur menuju portfolio melalui tautan relevan. Google tetap menentukan hasil.

## Referensi

[Berita FILKOM Amora](https://filkom.ub.ac.id/2026/01/25/inovasi-digital-amora-antarkan-mahasiswa-pti-filkom-ub-sabet-juara-3-nasional-greennovation-business-plan-competition/), [Google snippets](https://developers.google.com/search/docs/appearance/snippet), [translated results](https://developers.google.com/search/docs/appearance/translated-results), [ranking systems](https://developers.google.com/search/docs/appearance/ranking-systems-guide), [AI search guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).

## Validasi implementasi Phase 6

Build production lokal, lint dan typecheck final lulus, log di evidence/phase6-*. SEO smoke: 36 halaman/791 pemeriksaan lulus (termasuk canonical, bahasa Indonesia, heading, link internal, gambar, 404); entity smoke 469 lulus; content-smoke 11 lulus. Snapshot rendered 36 halaman tersedia pada phase6-rendered-pages.json. Test konten memeriksa adanya atribusi/sumber dan pembatasan klaim, bukan sertifikasi kebenaran semua isi sumber eksternal.

CUA: Amora, TehMbois dan AR diperiksa pada mobile 390px; scrollWidth 375px pada ketiganya, tidak ada broken image yang sudah selesai dimuat, heading baru terbaca. Isi Amora diperiksa visual pada desktop 1440px. Tidak ada console error pada sesi yang dicatat. Layout/cover/template tidak diubah. Tidak menjalankan Lighthouse ulang karena perubahan hanya MDX; hasil Phase 5 tetap merupakan pengukuran yang berbeda dan tidak diklaim sebagai hasil Phase 6. Tidak mengklaim pengujian semua interaksi/perangkat fisik diulang. Diagnostic NoFallbackError untuk negative slug tetap catatan lama meski respons 404/noindex benar.

Status akhir: perubahan konten, strategi dan checklist selesai lokal; research/lessons learned/metrik yang belum ada tetap menunggu D1–D9. Semua pekerjaan akun/editor/off-page tetap manual dan belum dilaksanakan. Phase ini tidak melakukan push atau deployment.
