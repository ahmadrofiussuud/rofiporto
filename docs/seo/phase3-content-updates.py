"""Explicit editorial changes sourced from existing project content; no new claims."""
import json
import re
from pathlib import Path

updates = {
 'akademirofi': ('Akademirofi — Belajar BMC, BPC & Essay', 'Platform belajar BMC, BPC, dan essay bagi rekan serta adik tingkat. Kenali konsep jalur belajar dan tampilan Akademirofi dalam dokumentasi proyek ini.'),
 'amora': ('Amora — Aplikasi Edukasi Pernikahan', 'Kenali Amora, aplikasi edukasi pernikahan, beserta fitur dan kontribusi Rofi sebagai pengembang utama dalam pengembangan produk ini.'),
 'arah-career': (None, 'Konsep platform ARAH untuk membantu mahasiswa mengenali potensi, menjelajahi peluang, dan merencanakan langkah karier. Lihat gambaran produk dan demonya.'),
 'bcc-pm': (None, 'Pengalaman Rofi sebagai Product Manager BCC FILKOM UB dalam menyusun strategi produk, roadmap, dan koordinasi pengembangan bersama tim.'),
 'bcc-website': ('Website BCC FILKOM UB', 'Pengembangan website Basic Computing Community FILKOM UB. Kenali peran Product Manager, prioritas fitur, dan informasi komunitas yang disajikan.'),
 'bios-2025': (None, 'Pengalaman mengelola keuangan tim futsal BIOS sebagai bendahara, mulai dari anggaran latihan dan kompetisi hingga pencatatan serta laporan keuangan.'),
 'bios-2026': (None, 'Pengalaman Rofi sebagai Ketua Futsal BIOS dalam mengelola tim, mengoordinasikan latihan, dan menyiapkan keikutsertaan dalam turnamen.'),
 'cekat': (None, 'Konsep CEKAT menggabungkan pemeriksaan risiko penyakit tidak menular, catatan nutrisi, dan sinkronisasi data Kiosk Station. Lihat gambaran platform dan demonya.'),
 'cert-java': ('Sertifikasi Dasar Java', 'Dokumentasi sertifikat dasar Java milik Rofi, mencakup sintaks, struktur data, dan logika pemrograman. Lihat ringkasan materi serta gambar sertifikat.'),
 'cert-pbo': (None, 'Dokumentasi sertifikat Pemrograman Berorientasi Objek milik Rofi. Pelajari ringkasan konsep inheritance, polymorphism, encapsulation, dan abstraction.'),
 'cert-pm': (None, 'Dokumentasi sertifikat manajemen proyek milik Rofi, dengan ringkasan perencanaan, koordinasi tim, dan metodologi dasar pengelolaan proyek.'),
 'ekspedisi-nusantara': (None, 'Game edukasi matematika untuk siswa SD dengan petualangan di berbagai wilayah Nusantara. Kenali konsep belajar sambil bermain dalam Ekspedisi Nusantara.'),
 'em-ub-web-2026': (None, 'Tanggung jawab Rofi sebagai Ketua Pelaksana Website EM UB 2026 dalam merencanakan pekerjaan dan mengoordinasikan tim pengembangan.'),
 'emub-2026': (None, 'Pengalaman Rofi sebagai Staf KOMINFO EM UB 2026 dengan peran Product Manager Website, termasuk koordinasi kebutuhan departemen dan pengembangan web.'),
 'filkom-league-2026': (None, 'Pengalaman sebagai Ketua Pelaksana Filkom League 2026 di FILKOM Universitas Brawijaya, termasuk koordinasi pelaksanaan kompetisi olahraga dan e-sports.'),
 'gestory': ('Gestory — Edukasi Kesehatan Berbasis Gestur', 'Gestory mengeksplorasi edukasi kesehatan melalui sensor gerak dan gestur tangan. Kenali fitur serta peran Rofi sebagai pengembang utama dan UI designer.'),
 'ifhamkids': (None, 'Konsep belajar bahasa Arab untuk siswa SD/MI melalui kosakata, pelafalan, dan kalimat sederhana. Jelajahi gambaran IfhamKids dan demo yang tersedia.'),
 'jaspel-rsud-moh-saleh': ('Jaspel RSUD Moh. Saleh Probolinggo', 'Kolaborasi bersama dosen untuk perhitungan jasa pelayanan RSUD Moh. Saleh Probolinggo. Rofi terlibat sebagai anggota tim IT dalam proyek ini.'),
 'kelasin': ('Kelasin — Media Pembelajaran SD dengan AI', 'Kelasin membantu guru menyiapkan media pembelajaran SD dengan AI untuk TV interaktif kelas. Lihat konsep aktivitas belajar dan demo karya kompetisi ini.'),
 'lki-amd': (None, 'Pengalaman Rofi sebagai anggota dan kontributor LKI AMD melalui kegiatan diskusi, pengabdian masyarakat, serta pengembangan akademik dan kepemimpinan.'),
 'mandorin': (None, 'Prototipe Mandorin dikembangkan saat seleksi intern BCC, dengan alur bagi pemilik proyek dan mandor. Lihat gambaran platform serta demo yang tersedia.'),
 'misra': (None, 'Pengembangan website profil sekolah dasar sebagai pusat informasi bagi siswa, wali murid, dan masyarakat. Kenali fitur dan peran Rofi sebagai web developer.'),
 'ngajikidz': (None, 'Konsep NgajiKidz mengeksplorasi pembelajaran Al-Qur’an untuk anak melalui AI, gamifikasi, dan bimbingan mengaji. Lihat gambaran produk serta demo.'),
 'pahamin': ('PahamIn — Aplikasi Belajar Interaktif', 'PahamIn mengeksplorasi pembelajaran interaktif dengan personalisasi materi dan asisten AI. Kenali fitur serta kontribusi Rofi sebagai frontend engineer.'),
 'pelatihan-ar-sdn-3-dono': ('Pelatihan AR untuk Guru SDN 3 Dono', 'Kolaborasi bersama dosen dalam pelatihan guru SDN 3 Dono, Tulungagung, untuk membuat media pembelajaran berbasis augmented reality. Lihat dokumentasinya.'),
 'rebite': ('ReBite — Platform Pengelolaan Food Waste', 'ReBite menghubungkan bisnis FnB dengan konsumen untuk pemanfaatan sisa makanan. Kenali fitur dan peran Rofi sebagai ketua proyek sekaligus pengembang.'),
 'sobataman': (None, 'Konsep SobatAman menghubungkan keluarga dengan pendamping untuk layanan on-demand. Lihat gambaran kebutuhan pengguna, konsep platform, dan demonya.'),
 'tehmbois-wcc': (None, 'Website brand minuman TehMbois, karya Juara 1 WCC UNISNU Jepara 2026. Lihat gambaran proyek, eksplorasi antarmuka, dan tampilan lintas perangkat.'),
 'telaahkarier': (None, 'Konsep TelaahKarier membantu meninjau risiko lowongan kerja digital sebelum melamar. Kenali alur pemeriksaan tanda bahaya dan demo platform yang tersedia.'),
 'umkm-go': ('UMKM Go — Pasar UMKM Desa', 'Website Pasar UMKM Desa Caringin untuk katalog hasil bumi dan kerajinan. Kenali fitur serta peran Rofi sebagai full stack developer dalam proyek UMKM Go.'),
 'website-em-ub': (None, 'Website Eksekutif Mahasiswa Universitas Brawijaya 2026. Kenali kontribusi Rofi sebagai Product Manager dan Ketua Pelaksana, serta fitur portal mahasiswa.'),
}

context = {
 'website-em-ub': 'Konteks peran organisasi ini juga dicatat pada [pengalaman Staf KOMINFO EM UB 2026](/projects/emub-2026) dan [tanggung jawab Ketua Pelaksana Website EM UB](/projects/em-ub-web-2026).',
 'emub-2026': 'Untuk fitur dan keputusan produk, lihat [pengembangan Website Resmi EM UB 2026](/projects/website-em-ub).',
 'em-ub-web-2026': 'Dokumentasi produk dan fitur tersedia pada [case study Website Resmi EM UB 2026](/projects/website-em-ub).',
 'bcc-pm': 'Penerapan peran ini dapat dilihat pada [pengembangan Website BCC FILKOM UB](/projects/bcc-website).',
 'bcc-website': 'Baca juga [pengalaman Product Manager BCC](/projects/bcc-pm) untuk konteks peran dalam organisasi.',
 'bios-2025': 'Lihat juga [pengalaman sebagai Ketua Futsal BIOS](/projects/bios-2026) pada periode berikutnya.',
 'bios-2026': 'Pengalaman sebelumnya dicatat pada [peran Bendahara Futsal BIOS](/projects/bios-2025).',
 'filkom-league-2026': 'Pengalaman organisasi olahraga lainnya tersedia pada [peran Ketua Futsal BIOS](/projects/bios-2026).',
 'tehmbois-wcc': 'Dokumentasi penghargaan WCC tersedia pada [catatan pencapaian kompetisi](/competitions#achievements).',
 'pelatihan-ar-sdn-3-dono': 'Eksplorasi media belajar lainnya dapat dilihat pada [Kelasin untuk pembelajaran SD](/projects/kelasin).',
 'kelasin': 'Untuk konteks kegiatan pendidikan lainnya, lihat [pelatihan media pembelajaran AR di SDN 3 Dono](/projects/pelatihan-ar-sdn-3-dono).',
 'jaspel-rsud-moh-saleh': 'Kolaborasi akademik lainnya dicatat pada [pelatihan AR bersama dosen di SDN 3 Dono](/projects/pelatihan-ar-sdn-3-dono).',
 'cert-java': 'Dokumentasi materi terkait tersedia pada [sertifikasi Pemrograman Berorientasi Objek](/projects/cert-pbo).',
 'cert-pbo': 'Baca juga [dokumentasi sertifikasi dasar Java](/projects/cert-java).',
 'cert-pm': 'Penerapan manajemen produk dalam portofolio dapat dilihat pada [pengalaman Product Manager BCC](/projects/bcc-pm).',
}

for slug, (title, description) in updates.items():
    path = Path('content/projects') / (slug+'.mdx')
    source = path.read_text(encoding='utf-8')
    source = re.sub(r'^description:.*$', 'description: '+json.dumps(description,ensure_ascii=False), source, count=1, flags=re.M)
    if title:
        if re.search(r'^seoTitle:', source, re.M):
            source = re.sub(r'^seoTitle:.*$', 'seoTitle: '+json.dumps(title,ensure_ascii=False),source,count=1,flags=re.M)
        else:
            source = re.sub(r'^(title:.*)$', r'\1\nseoTitle: '+json.dumps(title,ensure_ascii=False),source,count=1,flags=re.M)
    if slug in ['cert-java','cert-pbo','cert-pm']:
        source=source.replace('## Overview','## Tentang Sertifikasi')
    if slug in context and context[slug] not in source:
        source=source.rstrip()+'\n\n'+context[slug]+'\n'
    path.write_text(source,encoding='utf-8')
print(f'Updated descriptions for {len(updates)} projects; {len(context)} contextual link paragraphs.')
