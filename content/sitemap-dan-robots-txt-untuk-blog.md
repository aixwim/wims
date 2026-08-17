---
title: "Sitemap dan Robots.txt untuk Blog: Panduan Lengkap"
date: "2026-08-17"
category: "SEO"
excerpt: "Sitemap membantu mesin pencari menemukan semua halaman blog, sedangkan robots.txt mengatur apa saja yang boleh dirayapi. Berikut cara membuat keduanya di Astro."
tags: ["seo", "technical-seo", "sitemap", "robots-txt"]
---

Sitemap dan robots.txt adalah dua file teknis yang menentukan seberapa mudah mesin pencari memahami struktur blog Anda. Tanpa keduanya yang benar, halaman baru bisa lama terindeks atau bahkan tidak ditemukan sama sekali. Artikel ini menjelaskan apa itu sitemap dan robots.txt, serta cara menyiapkannya untuk blog statis seperti Astro.

## Apa itu sitemap?

Sitemap adalah file XML yang berisi daftar URL halaman penting di situs, lengkap dengan informasi pendukung seperti tanggal modifikasi dan prioritas. Fungsinya memberi tahu mesin pencari: "inilah semua halaman yang ingin saya indeks".

Untuk blog, pastikan sitemap memuat:

- URL beranda
- Halaman arsip artikel
- Setiap URL artikel dengan `lastmod`
- Halaman pendukung seperti *tentang* dan *kontak*

Di Astro, sitemap bisa dibuat dengan integrasi resmi `@astrojs/sitemap`, atau ditulis manual sebagai endpoint seperti contoh berikut:

```ts
export async function GET() {
  const posts = await getCollection('posts');
  const urls = posts.map((post) => ({
    url: `https://contoh.com/posts/${post.slug}/`,
    lastmod: post.data.date,
  }));
  // render menjadi XML
}
```

Yang terpenting: setiap kali artikel baru diterbitkan, sitemap ikut diperbarui.

## Apa itu robots.txt?

Robots.txt adalah file teks yang memberi instruksi kepada crawler tentang halaman mana yang boleh dirayapi. Aturannya sederhana: jangan digunakan untuk menyembunyikan halaman dari indeks (itu tugas `noindex`), gunakan untuk mencegah pengunjung bot membuang waktu di halaman yang tidak berguna.

Contoh minimal untuk blog:

```text
User-agent: *
Allow: /

Sitemap: https://contoh.com/sitemap.xml
```

Baris `Sitemap` penting karena menjadi jalur alternatif bagi Google untuk menemukan sitemap Anda.

## Membuat Sitemap dan Robots di Astro

Di Astro, kedua file biasanya dibuat sebagai endpoint di folder `src/pages/`:

- `src/pages/robots.txt.ts` — menghasilkan `robots.txt`
- `src/pages/sitemap.xml.ts` — menghasilkan `sitemap.xml`

Keduanya dirender sebagai file statis saat build, sehingga cepat dan tidak perlu server dinamis.

Untuk blog berbasis Astro di GitHub Pages, pastikan URL di dalam sitemap menggunakan domain dan base yang sama dengan konfigurasi deployment, misalnya `https://username.github.io/wims/`. Kesalahan di sini membuat URL sitemap mengarah ke halaman yang tidak ada. Panduan lengkap menerbitkan blog ada di artikel [Cara Deploy Blog Astro ke GitHub Pages](/wims/posts/cara-deploy-blog-astro-ke-github-pages/). Kedua file ini adalah bagian dari [checklist SEO untuk situs Astro](/wims/posts/seo-untuk-situs-astro/).

## Verifikasi dengan Search Console

Setelah sitemap aktif, daftarkan di [Google Search Console](/wims/posts/submit-sitemap-ke-google-search-console/):

1. Verifikasi kepemilikan situs.
2. Masuk ke menu **Sitemap**, lalu submit URL `sitemap.xml`.
3. Pantau laporan indeksasi untuk melihat halaman mana yang terindeks dan mana yang bermasalah.

Pengiriman sitemap tidak menjamin semua halaman terindeks, tetapi mempercepat proses penemuan dan memudahkan pelacakan.

## FAQ

### Apakah sitemap wajib untuk blog?

Tidak wajib, tetapi sangat disarankan. Blog dengan banyak artikel baru mendapat manfaat besar karena sitemap mempercepat penemuan konten.

### Bisakah robots.txt memblokir Google sepenuhnya?

Bisa, dengan menulis `Disallow: /`, tetapi nyaris tidak ada alasan untuk melakukannya pada blog yang ingin ditemukan. Gunakan `noindex` untuk halaman tertentu.

### Haruskah setiap artikel masuk ke sitemap?

Ya, selama artikel tersebut layak diindeks. Halaman seperti hasil pencarian atau halaman duplikat sebaiknya tidak dimasukkan.

## Kesimpulan

Sitemap memberi peta halaman pada mesin pencari, sedangkan robots.txt mengatur arah crawler. Untuk blog statis seperti Astro, keduanya mudah dibuat sebagai endpoint yang diperbarui otomatis saat build. Pastikan URL-nya konsisten dengan domain dan base deployment, lalu daftarkan di Google Search Console agar konten baru cepat terindeks.