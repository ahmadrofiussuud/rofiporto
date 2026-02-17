# Portfolio Content Guide

Panduan ini menjelaskan cara mengelola gambar dan konten di portofolio kamu secara manual tanpa bergantung pada generator gambar otomatis.

## 1. Struktur Folder Gambar
Semua gambar harus diletakkan di folder `/public/images/`.

| Kebutuhan | Lokasi Folder | Nama File Rekomendasi |
| :--- | :--- | :--- |
| **Hero Background** | `public/images/hero/` | `hero.jpg` |
| **Cover Project** | `public/images/projects/[slug]/` | `cover.jpg` |
| **Gallery Project** | `public/images/projects/[slug]/` | `01.jpg`, `02.jpg`, dst |

> [!TIP]
> **Cara Cepat Ganti Hero:**
> Cukup timpa file `public/images/hero/hero.jpg` dengan fotomu sendiri (pastikan namanya tetap sama), lalu refresh browser.

---

## 2. Mengatur Gambar di Project (MDX)
Setiap project memiliki file `.mdx` di folder `content/projects/`.

### Metadata (Frontmatter)
Di bagian paling atas file MDX, kamu bisa menentukan gambar cover dan hero project:

```yaml
---
title: "Nama Project Kamu"
date: "2026-02-17"
thumbnail: "/images/projects/nama-slug/cover.jpg"
heroImage: "/images/projects/nama-slug/cover.jpg"
---
```

### Gallery di Dalam Konten
Untuk menambahkan gambar di tengah-tengah tulisan case study, gunakan komponen `<MdxImage />`:

```tsx
<MdxImage 
  src="/images/projects/nama-slug/01.jpg" 
  alt="Tampilan Dashboard" 
  aspectRatio="video" 
/>
```

**Pilihan `aspectRatio`:**
- `video` (16:9) - Cocok untuk screenshot aplikasi.
- `square` (1:1) - Cocok untuk logo atau icon.
- `wide` (21:9) - Cocok untuk banner lebar.

---

## 3. Tips Optimasi Gambar
Agar website tetap cepat, ikuti tips berikut:
1. **Format:** Gunakan `.jpg` untuk foto pemandangan, `.webp` untuk semua kebutuhan lain (sangat direkomendasikan).
2. **Ukuran File:** Usahakan di bawah **400KB** per gambar.
3. **Dimensi:**
   - Hero: Minimal lebar 1920px.
   - Project Cover: Minimal lebar 1200px.
4. **Alat Kompresi:** Bisa gunakan [Squoosh.app](https://squoosh.app/) atau [TinyPNG](https://tinypng.com/).

---

## 4. Cara Cek Path Gambar
Jika gambar tidak muncul, pastikan kamu bisa membukanya langsung di browser.
Contoh: Buka `http://localhost:3000/images/hero/hero.jpg`. 
Jika muncul, berarti path-nya sudah benar.
