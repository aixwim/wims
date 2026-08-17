---
title: "Cara Mengoptimasi Gambar di Astro"
date: "2026-08-17"
category: "Astro"
excerpt: "Gambar adalah bobot terbesar halaman. Astro menyediakan komponen Image untuk resizing, format modern, dan lazy loading. Berikut cara menggunakannya."
tags: ["astro", "gambar", "optimasi", "performa"]
---

Gambar menyumbang sebagian besar bobot sebuah halaman, dan blog biasanya penuh gambar. Astro menyediakan komponen `Image` yang mengotomatiskan optimasi: menyesuaikan ukuran, mengubah format, dan menerapkan lazy loading. Artikel ini menjelaskan cara mengoptimasi gambar di Astro agar blog tetap cepat.

## Komponen Image di Astro

Komponen `Image` adalah cara termudah untuk optimasi. Contoh penggunaannya:

```astro
---
import { Image } from 'astro:assets';
import artikelGambar from '../assets/artikel.png';
---

<Image src={artikelGambar} alt="Ilustrasi artikel" width={800} height={450} />
```

Komponen ini menghasilkan gambar dengan dimensi dan format yang dioptimalkan saat build.

## Manfaat yang Didapat Otomatis

Dengan komponen `Image`, Anda memperoleh:

- **Resizing** — gambar disesuaikan dengan dimensi yang diminta.
- **Format modern** — output dalam format terkompresi seperti WebP bila browser mendukung.
- **Atribut lebar/tinggi** — mencegah layout shift, mendukung skor Core Web Vitals yang baik.
- **Lazy loading** — gambar di bawah layar dimuat belakangan secara default.

Semua ini otomatis, tanpa menulis kode tambahan.

## Gambar Responsif dengan Sizes

Untuk gambar yang menyesuaikan layar, kombinasikan atribut `sizes` dengan breakpoint:

```astro
<Image
  src={artikelGambar}
  alt="Gambar responsif"
  widths={[480, 768, 1200]}
  sizes="(max-width: 768px) 100vw, 768px"
/>
```

Astro menghasilkan beberapa versi ukuran, dan browser memilih yang paling sesuai dengan layar pengunjung. Ini mengurangi pengunduhan gambar yang lebih besar dari kebutuhan.

## Menentukan Kualitas Output

Astro menyediakan opsi kualitas:

```astro
<Image src={artikelGambar} alt="Foto" width={800} quality={80} />
```

Nilai kualitas 75–85 umumnya memberi keseimbangan terbaik antara bobot dan tampilan. Menurunkan kualitas dari 100 ke 80 bisa mengurangi ukuran file secara signifikan tanpa perbedaan visual yang jelas.

## Mengoptimasi Gambar di Markdown

Untuk gambar yang ditulis langsung di artikel markdown, komponen `Image` tidak tersedia langsung. Alternatifnya:

- **Optimasi manual dulu** — gunakan tool kompresi sebelum mengunggah, lalu set dimensi di markdown.
- **Komponen custom** — buat komponen pendek yang membungkus `Image` dan pakai di MDX.

Apa pun caranya, prinsipnya sama: ukuran tepat, format modern, dan dimensi ditetapkan agar tidak bergeser.

## Hubungan dengan Performa Blog

Optimasi gambar berdampak langsung pada LCP — metrik terbesar di [Core Web Vitals](/wims/posts/core-web-vitals-untuk-blog/). Gabungkan dengan prinsip lain seperti meminimalkan JavaScript dan font yang efisien untuk hasil maksimal, seperti dibahas di [artikel mempercepat blog statis](/wims/posts/cara-mempercepat-blog-statis/).

## FAQ

### Apakah komponen Image tersedia di semua proyek Astro?

Komponen `astro:assets` membutuhkan konfigurasi adapter dan dukungan build. Periksa versi Astro yang dipakai; untuk versi tertentu bisa memakai integrasi gambar.

### Apakah WebP otomatis dipakai?

Bila didukung, Astro menghasilkan format modern secara otomatis melalui komponen Image.

### Apa itu alt text dan kenapa penting?

Alt text menjelaskan isi gambar bagi pembaca dengan screen reader dan memberi konteks tambahan bagi mesin pencari. Selalu isi `alt` dengan deskripsi yang bermakna.

## Kesimpulan

Mengoptimasi gambar di Astro sangat mudah lewat komponen `Image`: ukuran otomatis, format modern, lazy loading, dan dimensi tetap — semua menunjang performa tanpa kerja manual berlebihan. Untuk gambar di markdown, kompresi manual dengan ukuran tepat tetap diperlukan. Hasilnya, halaman blog lebih ringan dan pembaca tidak menunggu lama.