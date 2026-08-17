---
title: "Cara Membuat Dark Mode di Blog"
date: "2026-08-17"
category: "Astro"
excerpt: "Dark mode mengurangi silau dan disukai banyak pembaca. Berikut cara membuat toggle tema terang/gelap yang menghormati preferensi sistem."
tags: ["dark-mode", "frontend", "css"]
---

Dark mode bukan lagi fitur bonus — banyak pembaca secara default memakai tema gelap. Menyediakan toggle yang menghormati preferensi sistem meningkatkan kenyamanan membaca blog Anda. Artikel ini menjelaskan cara membuat dark mode di blog dengan CSS dan sedikit JavaScript.

## Pendekatan dengan CSS Custom Properties

Cara paling mudah adalah mendefinisikan warna lewat custom properties, lalu menukar nilainya berdasarkan tema:

```css
:root {
  --bg: #ffffff;
  --text: #1a1a1a;
}

[data-theme="dark"] {
  --bg: #111111;
  --text: #f0f0f0;
}

body {
  background: var(--bg);
  color: var(--text);
}
```

Dengan pola ini, seluruh komponen cukup memakai `var(--bg)` dan `var(--text)` — mengganti tema hanya mengubah satu atribut di `<html>`.

## Toggle dengan JavaScript

Tombol toggle cukup mengubah atribut dan menyimpan pilihan:

```js
const btn = document.getElementById('theme-toggle');
const root = document.documentElement;

btn.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  localStorage.setItem('theme', next);
});
```

Penyimpanan di `localStorage` membuat pilihan pengguna bertahan di kunjungan berikutnya.

## Menghormati Preferensi Sistem

Gunakan media query `prefers-color-scheme` sebagai nilai awal saat pengguna belum pernah memilih:

```js
const saved = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const theme = saved || (prefersDark ? 'dark' : 'light');
document.documentElement.dataset.theme = theme;
```

Idealnya skrip ini dijalankan sebelum halaman dirender (inline di `<head>`) agar tidak terjadi kilatan warna salah saat memuat.

## Menghindari Flicker Saat Load

Untuk mencegah tema yang salah tampil sekejap, terapkan tema sebelum konten dirender — misalnya lewat skrip kecil inline di `<head>` yang membaca `localStorage` dan mengatur atribut. Pola inilah yang dipakai banyak framework modern, termasuk [Astro](/wims/posts/content-collections-astro/), karena mencegah layout shift visual.

## Konsistensi dengan Gambar

Perhatikan elemen non-CSS:

- **Gambar** — gunakan format dengan transparansi atau siapkan versi gelap bila diperlukan.
- **Kode blok** — pastikan sintaks berwarna kontras di kedua tema.
- **SVG ikon** — pakai `currentColor` agar mengikuti warna teks.

Periksa kontras warna di kedua tema agar tetap terbaca, karena kegelapan tidak boleh mengorbankan keterbacaan.

## Tema dan Komponen Pihak Ketiga

Layanan seperti sistem komentar biasanya menyediakan tema tersendiri. Untuk Giscus misalnya, gunakan `preferred_color_scheme` agar mengikuti tema blog. Integrasinya dibahas di [cara menambahkan komentar di blog Astro](/wims/posts/cara-menambahkan-komentar-di-blog-astro/).

## FAQ

### Apakah dark mode memengaruhi SEO?

Tidak langsung. Dampaknya pada pengalaman pengguna dan kenyamanan membaca, yang bisa menurunkan rasio pentalan.

### Bagaimana jika pengguna memakai mode kontras tinggi?

Bila memungkinkan, hormati juga `prefers-contrast` untuk aksesibilitas. Yang terpenting, pastikan kontras warna cukup di semua mode.

### Perlukah gambar versi gelap?

Hanya bila gambar berwarna terang yang besar menyilaukan. Sebagian besar blog cukup dengan ikon dan kode yang disesuaikan.

## Kesimpulan

Dark mode bisa dibangun hanya dengan CSS custom properties dan sedikit JavaScript: definisikan variabel warna per tema, tambahkan tombol toggle, simpan pilihan di `localStorage`, dan gunakan `prefers-color-scheme` sebagai default. Terapkan sebelum render untuk menghindari flicker, dan sesuaikan gambar serta komponen pihak ketiga agar kedua tema tetap nyaman dibaca.