---
title: "Cara Membuat Blog Gratis di GitHub Pages"
date: "2026-08-17"
category: "Astro"
excerpt: "Blog statis bisa diterbitkan gratis di GitHub Pages dengan static site generator. Berikut alur lengkap membuat blog gratis dari nol hingga online."
tags: ["github-pages", "blog", "static-site-generator", "gratis"]
---

Tidak perlu membayar hosting untuk memiliki blog. GitHub Pages menyediakan hosting statis gratis, dan bila dikombinasikan dengan static site generator seperti Astro, hasilnya blog yang cepat dengan biaya nol rupiah. Artikel ini menjelaskan cara membuat blog gratis di GitHub Pages dari nol.

## Mengapa GitHub Pages?

Keunggulan utamanya:

- **Gratis** — hosting tanpa biaya selama memenuhi kebijakan penggunaan wajar.
- **Cepat** — didukung CDN dan cache otomatis.
- **Keamanan** — tidak ada server dinamis yang bisa diserang.
- **Integrasi Git** — setiap push bisa memicu deployment otomatis.

Konsep di baliknya dijelaskan di [artikel static site generator](/wims/posts/apa-itu-static-site-generator/).

## Siapkan Alat

Anda butuh:

- Akun **GitHub**.
- **Node.js** untuk menjalankan Astro — di ponsel bisa lewat Termux (lihat [cara install Node.js di Termux](/wims/posts/cara-install-nodejs-di-termux/)).

Komputer atau ponsel sama-sama bisa dipakai untuk seluruh alur ini.

## Buat Project Astro

Jalankan:

```bash
npm create astro@latest blog-saya -- --template minimal
cd blog-saya
npm install
```

Tambahkan artikel ke folder konten, lalu pastikan build berhasil:

```bash
npm run build
```

Perintah ini menghasilkan folder `dist` berisi seluruh file statis.

## Atur Konfigurasi Base

Agar aset dimuat benar, atur `base` di `astro.config.mjs` sesuai lokasi project:

```js
export default defineConfig({
  site: 'https://username.github.io/',
  base: '/nama-repo/',
});
```

Bila blog ditempatkan di `https://username.github.io/`, `base` dikosongkan. Langkah ini sering menjadi sumber masalah saat aset tidak muncul.

## Push ke GitHub dan Deploy

1. Buat repository baru di GitHub.
2. Hubungkan project lokal dengan Git (panduan di [artikel Git dan GitHub di Termux](/wims/posts/git-dan-github-di-termux/)).
3. Push kode sumber ke branch `main`.
4. Aktifkan GitHub Pages di **Settings → Pages**.
5. Pilih sumber deployment — GitHub Actions direkomendasikan karena otomatis.

Alur deployment lengkapnya dijelaskan di [cara deploy blog Astro ke GitHub Pages](/wims/posts/cara-deploy-blog-astro-ke-github-pages/).

## Setelah Online

Situs tidak berhenti di sekadar tampil. Lanjutkan dengan:

- **SEO teknis** — pasang [sitemap dan robots.txt](/wims/posts/sitemap-dan-robots-txt-untuk-blog/) serta metadata.
- **Search Console** — daftarkan situs agar mudah dipantau (lihat [submit sitemap ke Google Search Console](/wims/posts/submit-sitemap-ke-google-search-console/)).
- **Rutin backup** — simpan kode sumber di repo GitHub sudah menjadi backup tersendiri.

## FAQ

### Apakah benar-benar gratis selamanya?

Ya, GitHub Pages tidak memungut biaya untuk penggunaan publik yang wajar. Biaya hanya muncul bila memakai domain kustom yang dibeli sendiri.

### Bisakah memakai domain sendiri di GitHub Pages?

Bisa. Atur custom domain di Settings → Pages, lalu sesuaikan `site` di konfigurasi Astro.

### Apakah GitHub Pages cocok untuk blog SEO?

Sangat cocok. Blog statis di sana cepat, punya struktur URL bersih, dan mendukung sitemap, robots, serta metadata.

## Kesimpulan

Blog gratis di GitHub Pages bisa dibuat dengan tiga langkah: bangun project dengan static site generator, atur `base` dengan benar, lalu push ke repository dan aktifkan Pages. Dengan fondasi ini, selanjutnya tinggal fokus menulis konten yang baik dan mengoptimalkan [SEO](/wims/posts/seo-untuk-situs-astro/).