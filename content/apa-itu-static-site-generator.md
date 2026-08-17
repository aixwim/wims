---
title: "Apa itu Static Site Generator?"
date: "2026-08-17"
category: "Astro"
excerpt: "Static site generator (SSG) mengubah markdown menjadi HTML statis yang cepat dan SEO-friendly. Berikut penjelasan konsep, cara kerja, dan kapan menggunakannya."
tags: ["astro", "static-site-generator", "konsep"]
---

Static site generator, atau SSG, adalah tool yang mengubah file sumber — biasanya markdown — menjadi halaman HTML statis yang siap diunggah. Berbeda dengan situs dinamis yang merender halaman setiap kali pengunjung datang, SSG membuat semuanya terlebih dahulu saat build. Artikel ini menjelaskan konsepnya secara sederhana.

## Bagaimana SSG Bekerja?

Alur kerjanya kira-kira begini:

1. Anda menulis konten dalam file markdown atau MDX.
2. SSG menggabungkan konten dengan template untuk menghasilkan HTML.
3. Hasil build berupa kumpulan file statis di satu folder, misalnya `dist`.
4. Folder itu diunggah ke hosting mana pun, termasuk GitHub Pages.

Karena tidak ada server yang perlu merender halaman, situs hasil SSG dimuat sangat cepat.

## Perbedaan dengan Situs Dinamis

Situs dinamis seperti WordPress atau situs berbasis PHP merender halaman di server setiap kali diminta. Sedangkan SSG merender semua halaman sekali saat build. Dampaknya:

| Aspek | SSG | Dinamis |
|---|---|---|
| Kecepatan | Sangat cepat, HTML siap pakai | Bergantung server |
| Biaya hosting | Murah, bisa gratis | Perlu server |
| Interaktivitas | Perlu JavaScript tambahan | Bisa langsung |
| Update konten | Perlu rebuild | Langsung tampil |

Untuk blog, kecepatan dan biaya murah menjadikan SSG pilihan yang sangat menarik.

## Contoh SSG Populer

Beberapa SSG yang banyak dipakai:

- **Astro** — framework modern yang mengirim HTML statis dengan hampir tanpa JavaScript. Blog ini sendiri dibangun dengan [Astro di Termux](/wims/posts/astro-termux/).
- **Next.js** — framework React dengan mode SSG yang juga mendukung rendering dinamis.
- **Hugo** — SSG Go yang sangat cepat untuk situs besar.
- **Eleventy** — ringan dan sederhana, cocok untuk yang menyukai pendekatan minimal.

Pilihan terbaik bergantung kebutuhan, bukan sekadar popularitas.

## Kapan Menggunakan SSG?

SSG sangat cocok bila:

- Konten tidak berubah terlalu sering, seperti blog atau dokumentasi.
- Perlu kecepatan dan skor SEO yang tinggi.
- Ingin hosting murah atau gratis.
- Ingin keamanan tinggi karena tidak ada server yang bisa diserang.

Sebaliknya, situs yang butuh data real-time per pengguna (misalnya dashboard) lebih cocok menggunakan pendekatan dinamis.

## Keunggulan SEO

HTML statis langsung bisa diindeks tanpa menunggu JavaScript dieksekusi. Ditambah kecepatan muat yang tinggi, SSG memenuhi dua hal yang disukai mesin pencari. Fondasi ini kemudian dilengkapi dengan metadata, [sitemap dan robots.txt](/wims/posts/sitemap-dan-robots-txt-untuk-blog/), serta [structured data](/wims/posts/seo-untuk-situs-astro/) untuk hasil yang optimal.

## FAQ

### Apakah SSG hanya untuk blog?

Tidak. SSG juga dipakai untuk dokumentasi, portofolio, landing page, hingga situs korporat yang kontennya jarang berubah.

### Bagaimana cara meng-update konten di situs SSG?

Anda mengubah file sumber lalu menjalankan build lagi. Hasilnya menggantikan halaman lama, atau diunggah ulang ke hosting.

### Apakah situs SSG bisa memiliki fitur dinamis?

Bisa, lewat JavaScript di sisi klien atau integrasi layanan eksternal seperti sistem komentar dan formulir.

## Kesimpulan

Static site generator mengubah markdown menjadi HTML statis yang cepat, murah, dan ramah SEO. Cocok untuk blog dan situs dengan konten yang tidak berubah setiap detik. Karena mudah di-build dan diunggah, SSG juga praktis dikerjakan dari ponsel lewat Termux — lalu diterbitkan gratis di [GitHub Pages](/wims/posts/cara-deploy-blog-astro-ke-github-pages/).