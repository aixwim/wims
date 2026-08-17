---
title: "Cara Install Node.js di Termux"
date: "2026-08-17"
category: "Termux"
excerpt: "Node.js adalah fondasi untuk menjalankan framework seperti Astro dan Next.js di Termux. Berikut cara memasangnya, memeriksa versi, dan menangani masalah umum."
tags: ["termux", "nodejs", "npm"]
---

Node.js memungkinkan menjalankan JavaScript di luar browser, termasuk framework web seperti Astro dan Next.js. Memasangnya di Termux cukup mudah, tetapi ada beberapa hal yang perlu diperhatikan agar semua berjalan lancar. Artikel ini menjelaskan cara install Node.js di Termux beserta masalah umum yang sering muncul.

## Memasang Node.js

Pertama, pastikan Termux dalam kondisi terbaru:

```bash
pkg update
pkg upgrade
```

Lalu install Node.js dan npm (yang disertakan bersamanya):

```bash
pkg install nodejs
```

Periksa hasil instalasi:

```bash
node -v
npm -v
```

Jika kedua perintah menampilkan versi, instalasi berhasil.

## Memasang Versi Node Tertentu

Repositori Termux menyediakan versi Node bawaan. Jika project membutuhkan versi tertentu, gunakan manajer versi:

```bash
pkg install nodejs-lts
```

Untuk pengaturan lebih fleksibel, `nvm` bisa dipakai mengelola beberapa versi secara paralel. Pilih versi sesuai kebutuhan project — periksa dokumentasi framework yang dipakai untuk melihat rentang versi Node yang didukung.

## Menjalankan npm di Termux

Setelah Node terpasang, framework bisa diinstall:

```bash
npm create astro@latest blog-saya -- --template minimal
cd blog-saya
npm install
npm run dev
```

Bila perintah `npm` tidak ditemukan padahal Node terpasang, coba jalankan lewat jalur lengkap:

```bash
node node_modules/astro/astro.js dev
```

## Masalah Umum dan Solusinya

Beberapa kendala yang sering muncul:

- **Perintah tidak ditemukan** — pastikan package `nodejs` benar-benar terpasang dengan `pkg list-installed`.
- **Biner tidak tersedia untuk arsitektur** — sebagian paket (seperti sharp atau modul SWC) tidak punya biner untuk arsitektur Android. Cari alternatif murni JavaScript atau pilih framework yang lebih ringan seperti Astro.
- **Build terhenti karena memori** — Termux berjalan di perangkat dengan memori terbatas. Tutup aplikasi lain, atau naikkan limit memori Node saat build.
- **`npm ci` gagal** — bersihkan cache dengan `npm cache clean --force` lalu ulangi instalasi.

Detail soal paket biner dibahas lebih lanjut di [Kiat Menggunakan Termux untuk Pengembangan Web di Android](/wims/posts/termux-tips/).

## Setelah Node Terpasang

Dengan Node.js aktif, Anda bisa mulai membangun project dan mengelola repositori. Pastikan juga sudah menyiapkan [Git dan GitHub di Termux](/wims/posts/git-dan-github-di-termux/) agar project bisa disinkronkan. Untuk pemula, ikuti alur lengkap di [Cara Setup Termux untuk Pengembangan Web](/wims/posts/cara-setup-termux-untuk-pengembangan-web/).

## FAQ

### Apakah `pkg install nodejs` cukup untuk semua framework?

Belum tentu. Framework seperti Next.js membutuhkan versi Node tertentu. Periksa dokumentasi framework dan sesuaikan versi yang diinstall.

### Apakah npm tersedia setelah install nodejs?

Ya, npm disertakan dalam paket `nodejs` Termux.

### Kenapa build gagal dengan error modul biner?

Karena paket itu tidak menyediakan biner untuk arsitektur Android. Gunakan alternatif murni JavaScript atau turunkan versi paket.

## Kesimpulan

Memasang Node.js di Termux cukup sederhana: update paket, `pkg install nodejs`, lalu verifikasi dengan `node -v`. Kendala yang muncul biasanya seputar versi dan biner arsitektur. Setelah Node aktif, seluruh alur pengembangan web — dari membangun hingga menerbitkan blog — bisa dikerjakan langsung dari ponsel.