"""Apply evidence-bound case-study edits while preserving route metadata and cover assets."""
from pathlib import Path

ROOT=Path('content/projects')
def body(slug, text):
    p=ROOT/f'{slug}.mdx'
    front=p.read_text(encoding='utf-8').split('---',2)[1]
    p.write_text('---'+front+'---\n\n'+text.strip()+'\n',encoding='utf-8')

body('amora', '''## Gambaran Proyek
Amora mengeksplorasi edukasi dan pendampingan komunikasi pasangan melalui produk digital. Proyek ini dikembangkan bersama tim mahasiswa Pendidikan Teknologi Informasi FILKOM Universitas Brawijaya.

## Masalah dan Konteks
Berita FILKOM tanggal 25 Januari 2026 menjelaskan latar ide berupa persoalan komunikasi dalam hubungan. Konteks ini menjadi arah rancangan produk, bukan bukti bahwa aplikasi telah mengurangi perceraian.

## Peran Saya dan Tim
Berita kampus menyebut saya sebagai ketua tim bersama Syifa Zahra Amelia Shofa dan Shelfina Khayla Anindita. Dalam dokumentasi proyek ini, peran teknis saya dicatat sebagai pengembang utama/arsitek. Hasil kompetisi merupakan capaian tim, bukan pekerjaan saya seorang diri.

## Arah Solusi
Dalam liputan kampus, konsep Amora mencakup mediasi percakapan, pembelajaran komunikasi singkat, dan rekomendasi aktivitas bersama. Demo memperlihatkan eksplorasi produk; tautan demo tidak dengan sendirinya membuktikan efektivitas pendampingan atau kesiapan layanan untuk penggunaan klinis.

## Teknologi
Dokumentasi pengembangan mencatat Next.js, Tailwind CSS, dan Gemini AI. Detail pembagian implementasi tiap fitur belum didokumentasikan pada halaman ini.

## Hasil dan Batas Pengukuran
Tim meraih **Juara 3 Nasional Greennovation Business Plan Competition 2025–2026** yang diselenggarakan Universitas Muhammadiyah Sidoarjo, sebagaimana diberitakan FILKOM. Belum ada data penggunaan atau evaluasi dampak hubungan yang ditampilkan di portofolio ini.

## Sumber dan Dokumentasi
- [Berita resmi FILKOM UB tentang Amora dan hasil kompetisi](https://filkom.ub.ac.id/2026/01/25/inovasi-digital-amora-antarkan-mahasiswa-pti-filkom-ub-sabet-juara-3-nasional-greennovation-business-plan-competition/), terbit 25 Januari 2026.
- [Demo Amora](https://amorateam.vercel.app/).
- [Dokumentasi prestasi dan kompetisi](/competitions#achievements).

Untuk mengenal latar pendidikan dan pengalaman saya, lihat [profil Rofi](/about).
''')

body('tehmbois-wcc', '''## Gambaran Proyek
TehMbois adalah website brand minuman dengan pilihan menu, tampilan produk, dan identitas visual yang ceria.

## Konteks Kompetisi
Proyek ini dibuat untuk Web Creation Competition (WCC) 2026 yang diselenggarakan Universitas Islam Nahdlatul Ulama Jepara. Konteksnya adalah karya kompetisi, bukan klaim layanan komersial yang telah dipakai pelanggan.

## Solusi dan Dokumentasi Visual
Cover proyek memperlihatkan halaman produk pada layar laptop, tablet, dan ponsel. Fokus dokumentasinya adalah penyajian menu dan konsistensi identitas brand pada berbagai ukuran layar.

## Hasil
Karya ini meraih **Juara 1**. Sertifikat WCC mencantumkan nama Muhammad Ahmad Rofi’us Su’ud dan keterangan 1st Winner. Peran individu, pembagian kerja tim, proses riset, dan stack belum dirinci pada dokumentasi ini; kemenangan tidak dipakai untuk menyimpulkan bahwa seluruh pekerjaan dikerjakan sendiri.

## Bukti Pendukung
- [Sertifikat Juara 1 WCC UNISNU Jepara 2026](/images/competitions/sertifikat-wcc-web-development.jpeg).
- [Catatan pencapaian kompetisi](/competitions#achievements).
- [Karya digital lain](/projects).
''')

body('pelatihan-ar-sdn-3-dono', '''## Gambaran dan Konteks
Kolaborasi bersama dosen berupa pelatihan untuk guru **SDN 3 Dono, Tulungagung**, dengan fokus pada pembuatan **media pembelajaran berbasis augmented reality (AR)**.

## Tujuan Kegiatan
Mendukung guru dalam membuat media pembelajaran AR untuk kegiatan belajar mengajar. Tujuan kegiatan dibedakan dari hasil belajar yang sudah terukur.

## Keterlibatan Saya
Saya terlibat dalam kolaborasi bersama dosen. Dokumentasi yang tersedia memperlihatkan kegiatan pelatihan di kelas. Pembagian tugas fasilitasi dan pengembangan materi belum dirinci di halaman ini, sehingga tidak dinyatakan sebagai pekerjaan individu sepenuhnya.

## Dokumentasi dan Batas Hasil
[Foto pelatihan AR di SDN 3 Dono](/images/projects/pelatihan-ar-sdn-3-dono.jpg) menjadi bukti kegiatan yang ditampilkan. Tanggal, jumlah peserta, perangkat AR yang digunakan, serta evaluasi sebelum dan sesudah pelatihan belum dicantumkan karena datanya belum tersedia pada dokumentasi proyek.

Eksplorasi media belajar lainnya dapat dilihat pada [Kelasin untuk pembelajaran SD](/projects/kelasin). Kedua proyek dicatat sebagai pengalaman berbeda; Kelasin bukan hasil pelatihan ini yang telah dikonfirmasi.
''')

# Add compact evidence and measurement boundaries rather than empty template sections.
for slug, text in {
'website-em-ub': '''
## Dokumentasi dan Batas Hasil
[Website resmi EM UB](https://em.ub.ac.id/) dan visual Rajut Wijaya pada halaman ini menjadi rujukan tampilan produk. Pekerjaan pengembangan melibatkan tim; peran saya berfokus pada arah produk dan koordinasi pelaksanaan sebagaimana dijelaskan di atas. Belum ada data pengguna aktif, pengukuran aksesibilitas, atau hasil audit keamanan proyek EM UB yang dipublikasikan di portofolio ini.
''',
'bcc-website': '''
## Dokumentasi dan Status
[Website BCC FILKOM UB](https://bccfilkom.ub.ac.id/) adalah tautan produk yang tersedia. Status dokumentasi ini masih dalam pengembangan. Peran saya sebagai Product Manager dibedakan dari implementasi desain dan kode oleh tim; halaman ini tidak mengklaim saya mengerjakan seluruh fitur sendiri. Belum ada metrik penggunaan atau hasil evaluasi produk yang disajikan.
''',
'kelasin': '''
## Dokumentasi dan Batas Hasil
[Demo Kelasin](https://manifestingdapetjuara.bccdev.id/) dan cover pada halaman ini memperlihatkan konsep produk. Proyek tidak meraih juara; belum ada data hasil belajar atau adopsi sekolah yang ditampilkan. Peran individu, susunan tim, dan pengujian dengan guru perlu dilengkapi sebelum menjadi case study proses yang lebih rinci.
''',
'mandorin': '''
## Dokumentasi Prototipe
[Demo Mandorin](https://mandorin-fe.vercel.app/beranda) dan cover proyek menjadi dokumentasi alur produk. Statusnya dicatat sebagai prototipe seleksi intern BCC, bukan bukti transaksi konstruksi atau verifikasi mandor yang sudah berjalan di dunia nyata. Pembagian peran tim, stack, dan hasil pengujian belum dirinci dalam dokumentasi ini.
''',
}.items():
    p=ROOT/f'{slug}.mdx'; s=p.read_text(encoding='utf-8')
    if text.strip().splitlines()[0] not in s:
        s+='\n'+text.strip()+'\n'
    if slug=='website-em-ub':
        s=s.replace('bagi lebih dari 60.000 mahasiswa Universitas Brawijaya','bagi mahasiswa Universitas Brawijaya')
        s=s.replace('untuk memastikan performa website yang optimal, aksesibilitas tinggi, dan integrasi API yang aman','untuk mendukung kebutuhan pengembangan website')
    p.write_text(s,encoding='utf-8')

# Intent is not a measured outcome. Preserve the product intent without invented results.
for slug, goal in {
    'gestory': 'Mengeksplorasi pembelajaran kesehatan yang melibatkan gerak dan interaksi tanpa sentuhan.',
    'pahamin': 'Mendukung pemahaman materi dan kemandirian belajar melalui eksplorasi antarmuka serta bantuan AI.',
    'rebite': 'Mendukung pemanfaatan makanan surplus dan mempertemukan penawaran bisnis FnB dengan konsumen.',
    'umkm-go': 'Memudahkan penyajian katalog dan penemuan produk UMKM Desa Caringin.',
    'misra': 'Memudahkan akses terhadap profil, pengumuman, dan informasi kegiatan sekolah.',
}.items():
    p=ROOT/f'{slug}.mdx'; s=p.read_text(encoding='utf-8')
    s=s.split('## Dampak')[0].rstrip() if '## Dampak' in s else s.split('## Tujuan dan Batas Hasil')[0].rstrip()
    s+='\n\n## Tujuan dan Batas Hasil\n'+goal+' Tujuan tersebut belum disertai data evaluasi atau metrik penggunaan pada dokumentasi portofolio ini. Peran pribadi tercantum pada ringkasan proyek; rincian pembagian tugas, proses riset, dan pelajaran dari pengembangan masih perlu dilengkapi.\n'
    p.write_text(s,encoding='utf-8')
p=ROOT/'filkom-league-2026.mdx'; s=p.read_text(encoding='utf-8')
s=s.replace('Memimpin lebih dari 50 staf panitia','Memimpin panitia')
p.write_text(s,encoding='utf-8')
