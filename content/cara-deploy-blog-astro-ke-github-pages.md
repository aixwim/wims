---
title: "Cara Deploy Blog Astro ke GitHub Pages (Gratis)"
date: "2026-08-17"
category: "Astro"
excerpt: "Panduan lengkap menerbitkan blog Astro ke GitHub Pages secara gratis, termasuk pengaturan base URL dan deployment lewat GitHub Actions."
tags: ["astro", "github-pages", "deploy", "termux"]
---

Setelah selesai membangun blog dengan Astro, langkah berikutnya adalah menerbitkannya agar bisa diakses publik. GitHub Pages menjadi pilihan populer karena [gratis](/wims/posts/blog-gratis-di-github-pages/) dan terhubung langsung dengan repository. Artikel ini menjelaskan cara deploy blog Astro ke GitHub Pages, termasuk mengatur `base` URL yang benar agar seluruh aset dan halaman termuat dengan baik.

## Persiapkan Repository

Pastikan project Astro sudah di-commit ke repository GitHub. Repository ini akan menampung kode sumber sekaligus menjadi sumber deployment GitHub Pages.

Jika belum ada repository, buat satu di GitHub lalu hubungkan dengan project lokal:

```bash
git remote add origin git@github.com:username/repository.git
git branch -M main
git push -u origin main
```

Bagi yang mengerjakan dari ponsel, seluruh alur Git ini bisa dijalankan di Termux — panduan lengkapnya ada di artikel [Menggunakan Git dan GitHub di Termux](/wims/posts/git-dan-github-di-termux/).

## Atur Base URL di Astro

GitHub Pages menyajikan project pada jalur `/` (untuk *user* atau *organization* pages) atau `/<nama-repository>/` (untuk *project* pages). Nilai ini harus cocok dengan konfigurasi `base` di `astro.config.mjs`.

Contoh untuk project pages bernama `wims`:

```js
export default defineConfig({
  site: 'https://username.github.io/',
  base: '/wims/',
});
```

Jika blog berada di `https://username.github.io/` (user pages), `base` bisa dikosongkan atau diisi `/`. Kesalahan paling umum adalah lupa mengisi `base`, sehingga CSS dan gambar tidak ditemukan setelah di-deploy.

## Build Project

Generate file statis dengan:

```bash
npm run build
```

Perintah ini menghasilkan folder `dist/` yang berisi seluruh HTML, CSS, JavaScript, gambar, sitemap, dan robots.txt yang siap diunggah.

## Opsi 1: Deploy dengan GitHub Actions

Cara paling direkomendasikan karena otomatis setiap kali ada perubahan di branch `main`. Buat file `.github/workflows/deploy.yml`:

```yaml
name: Deploy ke GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - name: Install & Build
        run: |
          npm ci
          npm run build
      - name: Setup Pages
        uses: actions/configure-pages@v5
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy
        id: deployment
        uses: actions/deploy-pages@v4
```

Aktifkan GitHub Pages di **Settings → Pages**, pilih source **GitHub Actions**, lalu push perubahan. Deployment berjalan otomatis setiap ada commit baru.

## Opsi 2: Push Folder dist ke Branch gh-pages

Alternatif tanpa GitHub Actions adalah mengunggah hasil build ke branch `gh-pages`. Anda bisa menggunakan paket `gh-pages`:

```bash
npm install -D gh-pages
npx gh-pages -d dist
```

Setelah itu atur **Settings → Pages → Branch** menjadi `gh-pages`. Metode ini praktis untuk pengujian cepat, tetapi deployment harus dijalankan manual setiap kali konten berubah.

## Verifikasi Hasil Deploy

Setelah berhasil, periksa beberapa hal:

1. **URL utama** — pastikan halaman beranda bisa diakses tanpa 404.
2. **Halaman artikel** — coba buka beberapa URL artikel.
3. **Aset statis** — CSS dan gambar harus termuat. Jika tidak, cek kembali nilai `base`.
4. **sitemap.xml dan robots.txt** — pastikan keduanya dapat diakses, karena penting untuk [SEO teknis blog Anda](/wims/posts/sitemap-dan-robots-txt-untuk-blog/).
5. **Hreflang dan canonical** — pastikan menunjuk ke domain yang benar.

Perlu beberapa menit bagi GitHub Pages untuk menerbitkan perubahan pertama kali.

## FAQ

### Apakah GitHub Pages benar-benar gratis?

Ya. GitHub Pages menyediakan hosting statis gratis selama situs Anda mematuhi kebijakan penggunaan wajar GitHub.

### Bisakah blog Astro di-deploy ke GitHub Pages dari ponsel?

Bisa, selama ponsel memiliki Node.js. Di Termux Anda tinggal menjalankan `npm run build` lalu push ke repository. Panduan lebih lengkap ada di artikel [Membangun Blog Cepat dengan Astro di Termux](/wims/posts/astro-termux/).

### Kenapa hasil build tidak tampil stylenya?

Biasanya karena nilai `base` di `astro.config.mjs` tidak sesuai nama repository atau subdomain tempat project di-host.

### Apakah bisa memakai custom domain?

Bisa. GitHub Pages mendukung custom domain melalui pengaturan di tab Pages, lalu tambahkan `domain` pada `astro.config.mjs` agar canonical dan sitemap mengikuti.

## Kesimpulan

Menerbitkan blog Astro ke GitHub Pages cukup mudah: atur `base` dengan benar, build project, lalu pilih antara GitHub Actions (otomatis) atau push manual ke branch `gh-pages`. Setelah online, fokus berikutnya adalah memastikan [sitemap, robots.txt](/wims/posts/sitemap-dan-robots-txt-untuk-blog/), dan [meta tag Open Graph](/wims/posts/open-graph-meta-tag-untuk-blog/) terpasang dengan benar agar blog lebih mudah ditemukan dan dibagikan.