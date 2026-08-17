---
title: "Canonical URL untuk Blog: Panduan Lengkap"
date: "2026-08-17"
category: "SEO"
excerpt: "Canonical URL menetapkan versi resmi sebuah halaman agar Google tidak menganggapnya duplikat. Berikut cara memasang dan mengelolanya di blog."
tags: ["seo", "canonical", "technical-seo"]
---

Canonical URL memberi tahu mesin pencari halaman mana yang dianggap sebagai versi resmi ketika sebuah konten bisa diakses dari beberapa URL. Tanpa canonical, Google bisa membuang-buang *crawl budget* pada versi duplikat dan membagi sinyal peringkat. Artikel ini menjelaskan cara memasang canonical URL di blog.

## Kapan Duplikat Terjadi?

Sebuah blog sering menghasilkan beberapa URL untuk isi yang sama, misalnya:

- URL dengan dan tanpa garis miring di akhir: `/blog` dan `/blog/`.
- Parameter pelacakan: `?utm_source=...`.
- Versi dengan dan tanpa `www`.
- Konten yang sama tampil di beberapa kategori.

Canonical memastikan semua variasi itu menunjuk ke satu URL resmi.

## Tag Canonical

Tambahkan tag di bagian `<head>` halaman:

```html
<link rel="canonical" href="https://contoh.com/posts/judul-artikel/" />
```

Halaman yang dikunjungi menunjuk ke dirinya sendiri (self-canonical) adalah pola paling umum. Bila sebuah halaman adalah salinan, `href` menunjuk ke URL asli.

## Memasang di Astro

Di Astro, tag canonical paling baik diletakkan di layout dan dihitung dari URL saat ini:

```astro
---
const url = new URL(Astro.url.pathname, Astro.site);
---
<link rel="canonical" href={url} />
```

Pastikan konfigurasi `site` dan `base` di `astro.config.mjs` benar, karena `new URL` memakai keduanya untuk membangun URL lengkap. Kesalahan di sini membuat canonical menunjuk ke alamat yang salah — langkah verifikasi pasca-deploy ada di [cara deploy blog Astro ke GitHub Pages](/wims/posts/cara-deploy-blog-astro-ke-github-pages/).

## Aturan Canonical yang Benar

Terapkan pedoman berikut:

- **Pakai URL absolut** — jangan memakai URL relatif.
- **Satu canonical per halaman** — memasang lebih dari satu membingungkan mesin pencari.
- **Arahkan ke halaman yang bisa diakses** — jangan menunjuk ke halaman yang di-blokir.
- **Self-canonical untuk versi resmi** — halaman utama menunjuk ke dirinya sendiri.
- **Konsisten dengan sitemap** — URL di sitemap sebaiknya sama dengan canonical.

## Canonical vs Redirect

Canonical adalah petunjuk, bukan instruksi paksa — Google bisa mengabaikannya bila dinilai tidak tepat. Redirect 301 lebih tegas karena benar-benar memindahkan pengunjung ke URL baru. Gunakan:

- **Redirect 301** saat halaman dipindah permanen.
- **Canonical** saat dua versi perlu tetap ada, seperti parameter URL atau versi bahasa.

Perbedaannya penting untuk [pengelolaan sitemap dan robots.txt](/wims/posts/sitemap-dan-robots-txt-untuk-blog/).

## Memeriksa dengan Search Console

Setelah memasang, verifikasi lewat:

- **Inspeksi URL** di Search Console — lihat apakah canonical yang dipilih diterima Google.
- **Laporan Indeksasi** — periksa halaman yang ditandai sebagai duplikat.

Jika Google memilih canonical yang berbeda, perbaiki konsistensi antara canonical, sitemap, dan tautan internal.

## FAQ

### Apakah canonical wajib untuk setiap halaman?

Sangat disarankan, terutama bila situs menghasilkan beberapa URL untuk konten yang sama. Tanpa canonical, Google menebak sendiri versi resminya.

### Apakah canonical bisa diabaikan Google?

Bisa, bila Google menilai pilihan Anda kurang tepat. Pastikan canonical selalu menunjuk ke halaman yang paling layak ditampilkan.

### Berapa banyak canonical yang boleh di satu halaman?

Satu. Lebih dari satu tag canonical dianggap konflik dan tidak valid.

## Kesimpulan

Canonical URL adalah pengaman dari masalah konten duplikat: pilih satu URL resmi, pasang tag di layout, dan pastikan konsisten dengan sitemap serta tautan internal. Dengan canonical yang benar, sinyal peringkat tidak terpecah dan indeksasi lebih sehat — bagian dari [fondasi SEO teknis](/wims/posts/seo-untuk-situs-astro/) yang baik.