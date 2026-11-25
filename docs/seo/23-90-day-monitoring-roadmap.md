# Phase 8 — Continuous optimization roadmap

D0: deployment fa08c14, 24 November 2026. Ini rencana review manual, bukan automation atau janji peringkat. Gunakan template 19 dan catat periode, filter, sumber, environment serta SHA yang benar-benar live. Jangan mengisi data yang hilang dengan nol.

| Horizon / tanggal target | Evaluasi dan tindakan | Bukti dan batas keputusan |
|---|---|---|
| D+7 / 1 Desember 2026 | Periksa root, /about dan dua case study melalui URL Inspection; cek sitemap, canonical, HTTP dan recrawl. Tinjau tujuh hari lengkap data pencarian | Catat status, last crawl, kedua canonical dan hasil request indexing. About yang available belum berarti indexed. Bandingkan hanya periode tujuh hari yang setara jika tersedia |
| D+14 / 8 Desember 2026 | Tinjau halaman yang sudah recrawl, rich results, site name/favicon, query nama dan tautan relevan yang benar-benar dipasang. Siapkan satu insight dari pengalaman nyata | Bandingkan 14 hari lengkap dengan 14 hari sebelumnya. Jika history atau query tidak tersedia, analisis tetap deskriptif; screenshot SERP tidak menjadi rank tetap |
| D+30 / 24 Desember 2026 | Export 28 hari lengkap vs 28 hari sebelumnya: clicks, impressions, CTR, position, pages, devices, countries. Review indexing reasons, CWV dan overlap tiga halaman EM UB bila data cukup | Jangan merata-ratakan CTR atau posisi antar halaman. Bedakan field p75 dari lab. Profiling pencapaian mobile diarahkan pada CPU/text LCP berdasarkan trace, bukan redesign untuk skor |
| D+60 / 23 Januari 2027 | Review periode 28 hari yang setara, konten baru, bukti pengalaman dan tautan profil. Periksa Manual Actions/Security Issues | Anotasi deployment berikutnya dan faktor pengganggu. Laporan Links kosong tidak membuktikan tidak ada backlink. Pertahankan atribusi organik tanpa transaksi atau spam |
| D+90 / 22 Februari 2027 | Export 90 hari tepat vs 90 hari sebelumnya jika ada, serta trend 28 hari. Audit route baru, redirect, schema, CWV dan peluang konten; perbarui issue register | Bila history pembanding belum ada, jangan membuat angka pertumbuhan. Simpan cakupan query/hidden data dan rekomendasi audit terarah |

## Metrik dan interpretasi

- **Branded rankings:** nama lengkap dengan apostrof lurus/curly, variasi nama yang benar, handle dan rofiporto. Rofi/MARS pendek perlu konteks; nama produk dipisahkan sebagai product-branded. Catat query, page, device, country dan periode. Average position bukan rank konstan; query kosong berarti unknown.
- **Organic clicks, impressions, CTR:** pisahkan property, page dan dimensi lain. Klik tidak otomatis menjadi lead. Gunakan filter Search type yang sama dan data lengkap; jangan mencampur preliminary data dengan periode final.
- **Index coverage:** 36 URL ditemukan dari sitemap tidak sama dengan 36 indexed. Gunakan inspection individual untuk status URL dan pilihan canonical. Redirect, gambar dan PDF tidak harus dipaksa indexed.
- **Core Web Vitals:** nilai field p75 hanya jika tersedia: LCP <=2.5s, INP <=200ms, CLS <=0.1. TBT bukan INP. Catat URL/origin, perangkat dan periode; data insufficient tetap kosong. Simpan Lighthouse beserta konfigurasi secara terpisah.
- **Relevant backlinks:** simpan URL sumber publik, konteks atribusi, izin/ownership, target dan tanggal pemeriksaan. Prioritaskan profil nyata, kampus dan organisasi terkait. Jumlah link mentah bukan sasaran spam.
- **Search appearance:** catat title/snippet/site name/favicon dan hasil validator dengan tanggal/query/perangkat. Pilihan tampilan tetap di Google; tidak menjanjikan Knowledge Panel.
- **Content opportunities:** gunakan query yang benar-benar tersedia dan backlog 13. Lengkapi brief, keputusan, proses, hasil serta pelajaran nyata. Jangan membuat halaman tipis untuk variasi nama atau keyword AI.

## Alert dan tindak lanjut

Tangani segera jika ada noindex tak disengaja, canonical ke host lain, banyak 5xx, sitemap berulang gagal fetch, verifikasi hilang, atau Manual Actions/Security Issues. Jalankan pemeriksaan terarah dan ikuti rollback plan 22 bila regresi kode utama terbukti. Penurunan ranking/CTR perlu pemeriksaan volume, query mix, perubahan situs dan periode sebelum kesimpulan; satu screenshot bukan alasan rollback.

Baseline GSC yang tersedia hanya 16–22 November: 2 clicks/15 impressions, query kosong dan field CWV insufficient. Belum ada hasil organik pascadeploy yang dapat diatribusikan pada fa08c14. Retry request indexing /about setelah kuota pulih; percobaan Phase 8 ditolak, bukan diterima antrean.
