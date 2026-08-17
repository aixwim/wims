---
title: "Menggunakan Git dan GitHub di Termux: Panduan Lengkap"
date: "2026-08-17"
category: "Termux"
excerpt: "Kelola repositori dan sinkronkan project langsung dari ponsel. Berikut cara setup Git, membuat SSH key, dan push ke GitHub dari Termux."
tags: ["termux", "git", "github", "android"]
---

Git dan GitHub adalah pasangan wajib bagi siapa pun yang mengembangkan project, termasuk dari ponsel. Dengan Termux, Anda bisa melakukan clone, commit, dan push repositori tanpa komputer. Artikel ini memandu pengaturan Git dan GitHub di Termux dari awal.

## Instal dan Konfigurasi Git

Pastikan Git sudah terpasang, lalu atur identitas sekali saja:

```bash
pkg install git
git config --global user.name "Nama Anda"
git config --global user.email "email@contoh.com"
```

Identitas ini tercatat pada setiap commit. Gunakan email yang sama dengan akun GitHub agar kontribusi Anda dikaitkan dengan benar.

## Membuat SSH Key untuk GitHub

Menggunakan SSH lebih aman dan tidak perlu memasukkan password setiap push. Buat key dengan:

```bash
ssh-keygen -t ed25519 -C "email@contoh.com"
```

Ikuti prompt dengan menekan Enter untuk lokasi default. Untuk mengamankan key, bisa ditambah passphrase. Selanjutnya tampilkan public key:

```bash
cat ~/.ssh/id_ed25519.pub
```

Salin seluruh isi output, lalu tambahkan di **GitHub → Settings → SSH and GPG keys → New SSH key**. Untuk memastikan koneksi berhasil:

```bash
ssh -T git@github.com
```

Respons pertama kali akan menanyakan konfirmasi host; ketik `yes`.

## Clone dan Push Project

Sekarang repositori bisa dikloning dan dikelola:

```bash
git clone git@github.com:username/repository.git
cd repository
# edit file ...
git add .
git commit -m "Perbarui konten"
git push origin main
```

Alih-alih menyalin remote setiap kali, repositori hasil `clone` sudah terhubung otomatis ke remote `origin`.

## Menghubungkan Project yang Sudah Ada

Untuk project lokal yang belum terhubung ke GitHub:

```bash
git init
git remote add origin git@github.com:username/repository.git
git branch -M main
git add .
git commit -m "Initial commit"
git push -u origin main
```

Dari sini, seluruh alur kerja biasa bisa dipakai langsung dari Termux.

## Mengelola Multi Repositori

Beberapa kiat untuk kenyamanan sehari-hari:

- **Simpan passphrase key** — aktifkan agent agar tidak diminta passphrase berulang: `ssh-add ~/.ssh/id_ed25519`.
- **Gunakan alias** — singkat perintah yang sering dipakai dengan `git config --global alias.co checkout`.
- **Perhatikan line ending** — pada project bersama, atur `git config --global core.autocrlf` sesuai platform rekan kerja.

Ruang penyimpanan Termux terbatas, jadi bersihkan cache dan hapus clone yang tidak terpakai. Detail lebih lanjut ada di [Kiat Menggunakan Termux untuk Pengembangan Web di Android](/wims/posts/termux-tips/).

## Alur Kerja untuk Blog

Alur paling umum di ponsel adalah: edit artikel, commit, lalu push — deployment berjalan otomatis. Jika blog Anda dibangun dengan Astro, kombinasi Termux + Git + GitHub Pages memungkinkan seluruh proses, mulai dari [setup Termux](/wims/posts/cara-setup-termux-untuk-pengembangan-web/) hingga [deploy blog Astro ke GitHub Pages](/wims/posts/cara-deploy-blog-astro-ke-github-pages/), dilakukan tanpa komputer.

## FAQ

### Apakah aman menyimpan SSH key di ponsel?

Ya, selama perangkat terkunci dan key dilindungi passphrase. Jangan pernah membagikan private key ke siapa pun.

### Kenapa `git push` diminta password padahal sudah pakai SSH?

Pastikan remote memakai URL SSH (`git@github.com:...`), bukan URL HTTPS. Periksa dengan `git remote -v`.

### Bisakah menangani konflik merge di Termux?

Bisa. Saat konflik terjadi, edit file yang bertanda `<<<<<<<`, pilih hasil yang benar, lalu commit ulang.

## Kesimpulan

Git dan GitHub di Termux memungkinkan pengembangan penuh dari ponsel: install Git, buat SSH key, hubungkan ke GitHub, lalu clone dan push repositori. Untuk project blog, alur edit–commit–push langsung memicu deployment. Dengan setup yang benar, tidak ada lagi alasan menunggu komputer untuk menerbitkan konten.