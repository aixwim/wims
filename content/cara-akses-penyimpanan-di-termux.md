---
title: "Cara Akses Penyimpanan di Termux"
date: "2026-08-17"
category: "Termux"
excerpt: "Termux terisolasi dari penyimpanan Android secara default. Berikut cara memberi akses penyimpanan dan menggunakan folder bersama seperti Download."
tags: ["termux", "penyimpanan", "android"]
---

Salah satu kebingungan pertama pengguna Termux adalah mengapa folder Android tidak terlihat. Secara default Termux berjalan dalam lingkungan terisolasi, sehingga penyimpanan ponsel perlu dihubungkan secara eksplisit. Artikel ini menjelaskan cara akses penyimpanan di Termux dengan `termux-setup-storage`.

## Kenapa Perlu Setup Penyimpanan?

Untuk alasan keamanan, Termux tidak bisa langsung membaca penyimpanan ponsel. Perintah khusus disediakan untuk membuka akses, karena berhubungan dengan data pribadi. Setelah diaktifkan, Anda bisa:

- Membaca dan menulis file di folder seperti `Download`.
- Menyimpan backup project di penyimpanan bersama.
- Mengirim file yang dihasilkan Termux ke aplikasi lain.

## Menggunakan termux-setup-storage

Jalankan perintah berikut di terminal:

```bash
termux-setup-storage
```

Lalu izinkan dialog izin penyimpanan yang muncul di Android. Setelah itu, folder `~/storage` dibuat berisi symlink:

```text
~/storage/shared    → penyimpanan bersama
~/storage/downloads → folder Download
~/storage/dcim      → folder DCIM
~/storage/music     → folder Music
```

Nama folder bisa sedikit berbeda tergantung versi Android.

## Akses dari Dalam Termux

Untuk menyalin project ke folder Download:

```bash
cp -r ~/blog-saya ~/storage/downloads/backup
```

Untuk menulis file langsung di Download:

```bash
echo "catatan" > ~/storage/downloads/catatan.txt
```

Perlu diingat: performa membaca dari penyimpanan bersama lebih lambat daripada direktori internal Termux (`$HOME`). Untuk kerja harian, simpan project di `$HOME` dan hanya pindahkan ke penyimpanan bersama saat perlu.

## Menulis ke Aplikasi Lain

Setelah akses aktif, file di folder seperti Download bisa diakses aplikasi pengelola file atau aplikasi lain yang memerlukan izin penyimpanan. Ini berguna untuk mengirim hasil build atau backup ke layanan cloud, email, atau aplikasi catatan.

## Keamanan dan Izin

Beberapa catatan penting:

- **Izin harus diberikan lewat dialog** — tanpa persetujuan, `termux-setup-storage` tidak berfungsi.
- **Sesuaikan dengan kebutuhan** — jangan membagikan akses lebih dari yang diperlukan.
- **Perbarui aplikasi** — versi Termux usang bisa gagal membuat symlink. Pastikan aplikasi dari sumber resmi.

Setelah akses penyimpanan lancar, seluruh alur pengembangan di ponsel bisa dimulai — baca [cara setup Termux untuk pengembangan web](/wims/posts/cara-setup-termux-untuk-pengembangan-web/) untuk langkah berikutnya.

## FAQ

### Apakah `termux-setup-storage` butuh root?

Tidak. Perintah ini hanya meminta izin penyimpanan normal dari Android.

### Kenapa folder Download tidak muncul setelah perintah dijalankan?

Periksa apakah dialog izin sudah diizinkan, dan pastikan folder `~/storage` benar-benar dibuat dengan `ls ~/storage`. Versi Termux yang usang juga bisa menjadi penyebab.

### Apakah file di penyimpanan bersama aman?

File di folder bersama bisa diakses aplikasi lain yang memiliki izin. Untuk data sensitif, simpan di direktori internal Termux.

## Kesimpulan

Akses penyimpanan di Termux dibuka dengan `termux-setup-storage`, yang membuat folder `~/storage` terhubung ke penyimpanan Android. Gunakan direktori internal Termux untuk kerja sehari-hari agar cepat, dan pindahkan file ke penyimpanan bersama hanya saat perlu berbagi atau backup. Pola inilah yang dipakai banyak pengembang untuk [backup blog dari Termux](/wims/posts/cara-backup-blog-astro-di-termux/).