---
title: "Membangun Blog Cepat dengan Astro di Termux"
date: "2026-08-12"
category: "Astro"
excerpt: "Astro menghasilkan situs statis yang sangat cepat dan mudah dibangun langsung dari ponsel Android via Termux."
tags: ["astro", "termux", "framework"]
---

Astro adalah framework untuk membangun situs yang cepat dengan mengirimkan hampir tanpa JavaScript. Situs blog ini sendiri dibangun dengan Astro langsung dari ponsel Android menggunakan Termux.

## Kenapa Astro?

Astro melakukan "pengiriman nol JavaScript secara default". Halaman dirender sebagai HTML statis pada saat build, sehingga:

- Waktu muat sangat cepat
- Skor performa dan SEO tinggi
- Mudah di-host di GitHub Pages

## Astro di Termux

Termux adalah emulator terminal untuk Android yang memungkinkan menjalankan lingkungan Linux ringan. Dengan `pkg install nodejs` lalu `npm create astro@latest`, Anda bisa membangun dan me-*build* situs Astro langsung di ponsel.

Satu hal yang perlu diperhatikan: pastikan memakai versi Node yang kompatibel, dan gunakan perintah `node node_modules/astro/astro.js build` bila skrip `astro` tidak tersedia di PATH. Panduan langkah demi langkah ada di artikel [cara setup Termux untuk pengembangan web](/wims/posts/cara-setup-termux-untuk-pengembangan-web/).

## Content Collections

Astro memiliki fitur *content collections* untuk mengelola artikel markdown dengan skema frontmatter yang ketat, sehingga struktur konten tetap rapi dan dapat divalidasi saat build.

Kesimpulannya, Astro adalah pilihan bagus untuk blog cepat, dan Termux membuatnya bisa dikerjakan dari mana saja. Setelah selesai membangun, pelajari [cara deploy blog Astro ke GitHub Pages](/wims/posts/cara-deploy-blog-astro-ke-github-pages/) agar blog bisa dibuka publik.