---
title: "Cara Setup Termux untuk Pengembangan Web"
date: "2026-08-17"
category: "Termux"
excerpt: "Langkah demi langkah menyiapkan Termux di Android sebagai lingkungan pengembangan web: update paket, install Node.js dan Git, hingga mengakses penyimpanan."
tags: ["termux", "android", "setup", "pengembangan-web"]
---

Termux mengubah ponsel Android menjadi terminal Linux yang bisa digunakan untuk coding serius, termasuk membangun dan me-*build* blog. Namun bagi pemula, langkah awal sering terasa membingungkan. Artikel ini memandu cara setup Termux untuk pengembangan web dari awal, termasuk paket wajib dan izin penyimpanan.

## Instal Termux di Android

Termux tidak tersedia di Google Play Store resmi. Unduh aplikasi dari repositori resmi di F-Droid atau dari GitHub Termux, lalu izinkan instalasi dari sumber tidak dikenal saat diminta.

Pastikan Anda mendapatkan versi terbaru. Versi lama dari toko pihak ketiga sering sudah usang dan tidak kompatibel dengan repositori paket saat ini.

## Update Paket Awal

Setelah terbuka, terminal menampilkan prompt `$`. Jalankan update untuk memastikan daftar paket dan sistem dalam kondisi terbaru:

```bash
pkg update
pkg upgrade
```

Jalankan keduanya secara rutin, karena repositori Termux berkembang cepat. Jika diminta konfirmasi, tekan `y` dan Enter.

## Beri Akses Penyimpanan

Untuk mengakses folder seperti `Download`, jalankan:

```bash
termux-setup-storage
```

Perintah ini membuat folder `~/storage` yang berisi symlink ke direktori penyimpanan ponsel, misalnya `~/storage/downloads`. Izin penyimpanan juga perlu diberikan lewat dialog Android. Detail lengkapnya dijelaskan di [artikel cara akses penyimpanan di Termux](/wims/posts/cara-akses-penyimpanan-di-termux/).

Dengan ini, project bisa dikerjakan di folder biasa dan disimpan ke penyimpanan internal. Tips selengkapnya tentang manajemen penyimpanan ada di artikel [Kiat Menggunakan Termux untuk Pengembangan Web di Android](/wims/posts/termux-tips/).

## Install Paket untuk Pengembangan Web

Paket inti yang paling sering dibutuhkan:

```bash
pkg install nodejs git openssh python
```

- **nodejs** — menjalankan JavaScript, npm, dan framework seperti Astro atau Next.js.
- **git** — kontrol versi dan kolaborasi lewat GitHub.
- **openssh** — koneksi aman dan push ke GitHub memakai SSH.
- **python** — untuk skrip atau tool tambahan bila diperlukan.

Beberapa paket yang belum terpasang bisa dicari dengan `pkg search nama`.

## Buat Project Pertama

Untuk memastikan semuanya berfungsi, buat project Astro sederhana:

```bash
npm create astro@latest blog-saya -- --template minimal
cd blog-saya
npm install
npm run dev
```

Jika skrip `npm` tidak tersedia di PATH, jalankan langsung lewat Node:

```bash
node node_modules/astro/astro.js dev
```

Framework statis seperti Astro cocok untuk Termux karena build-nya ringan dan hasilnya bisa langsung di-upload ke GitHub Pages. Detail pembangunannya dijelaskan di [Membangun Blog Cepat dengan Astro di Termux](/wims/posts/astro-termux/).

## Konfigurasi Git dan SSH

Agar bisa push ke GitHub, atur identitas dan buat SSH key:

```bash
git config --global user.name "Nama Anda"
git config --global user.email "email@contoh.com"
ssh-keygen -t ed25519 -C "email@contoh.com"
```

Lalu salin isi file `~/.ssh/id_ed25519.pub` ke **GitHub → Settings → SSH and GPG keys**. Setelah itu remote GitHub bisa dipakai tanpa memasukkan password berulang kali. Panduan menyeluruh untuk clone, commit, dan push ada di artikel [Menggunakan Git dan GitHub di Termux](/wims/posts/git-dan-github-di-termux/).

## FAQ

### Apakah Termux membutuhkan root?

Tidak. Termux berjalan sebagai aplikasi biasa dan tidak memerlukan akses root.

### Kenapa `pkg` tidak ditemukan?

Kemungkinan Anda menggunakan versi Termux yang sudah usang. Update aplikasi dari F-Droid atau GitHub, lalu jalankan `pkg update` lagi.

### Bisakah Node.js versi terbaru diinstall di Termux?

Biasanya bisa lewat repositori resmi. Bila framework yang dipakai butuh versi tertentu, pastikan mencocokkan dengan versi Node yang tersedia lewat `node -v`.

## Kesimpulan

Setup Termux untuk pengembangan web hanya butuh beberapa langkah: pasang aplikasi versi terbaru, update paket, beri izin penyimpanan, lalu install `nodejs`, `git`, dan `openssh`. Setelah itu Anda bisa membangun project, mengelola versi, dan menerbitkan blog langsung dari ponsel — termasuk [deploy blog Astro ke GitHub Pages](/wims/posts/cara-deploy-blog-astro-ke-github-pages/) tanpa menyentuh komputer.