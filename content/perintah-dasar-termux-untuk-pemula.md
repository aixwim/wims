---
title: "Perintah Dasar Termux untuk Pemula"
date: "2026-08-17"
category: "Termux"
excerpt: "Kumpulan perintah Linux yang paling sering dipakai di Termux untuk pengembangan: navigasi, file, paket, dan kontrol versi. Disertai penjelasan singkat."
tags: ["termux", "linux", "perintah-dasar"]
---

Termux memberi terminal Linux lengkap di Android, tetapi bagi pemula tumpukan perintah bisa terasa menakutkan. Artikel ini merangkum perintah dasar Termux yang paling sering dipakai dalam pengembangan, lengkap dengan contoh singkat — cocok sebagai referensi awal sebelum mendalami [setup Termux untuk pengembangan web](/wims/posts/cara-setup-termux-untuk-pengembangan-web/).

## Navigasi Direktori

Pindah dan lihat lokasi:

```bash
pwd            # lokasi saat ini
ls             # daftar file
ls -la         # daftar lengkap dengan detail
cd blog-saya   # pindah ke folder
cd ..          # pindah ke folder induk
cd ~           # pindah ke direktori rumah
```

`~` selalu merujuk ke folder utama Termux, tempat project biasanya disimpan.

## Mengelola File

Buat, salin, pindahkan, dan hapus:

```bash
touch catatan.md      # buat file kosong
mkdir project         # buat folder
cp catatan.md backup  # salin
mv catatan.md arsip   # pindahkan/ubah nama
rm catatan.md         # hapus file
rm -r folder          # hapus folder beserta isinya
```

Hati-hati dengan `rm -r` — penghapusan di terminal tidak bisa dibatalkan.

## Melihat dan Mengedit Isi File

Baca dan edit file teks:

```bash
cat catatan.md        # tampilkan isi
less catatan.md       # baca dengan scroll (tekan q untuk keluar)
nano catatan.md       # editor sederhana
```

`nano` adalah editor yang ramah pemula; simpan dengan `Ctrl+O`, keluar dengan `Ctrl+X`.

## Manajemen Paket

Instal dan hapus aplikasi lewat `pkg`:

```bash
pkg update            # perbarui daftar paket
pkg upgrade           # perbarui paket terpasang
pkg search node       # cari paket
pkg install nodejs    # pasang paket
pkg list-installed    # lihat paket terpasang
pkg clean             # bersihkan cache
```

Selalu jalankan `pkg update` sebelum menginstal paket baru.

## Kontrol Versi dengan Git

Perintah Git yang sering dipakai:

```bash
git status            # kondisi repo
git add .             # tandai perubahan
git commit -m "pesan" # simpan perubahan
git push              # kirim ke remote
git pull              # ambil perubahan dari remote
```

Alur lengkap Git di ponsel dibahas di [artikel Git dan GitHub di Termux](/wims/posts/git-dan-github-di-termux/).

## Izin dan Bantuan

Jangan lupa dua perintah berikut:

```bash
man perintah    # dokumentasi lengkap (tekan q untuk keluar)
perintah --help # bantuan singkat
```

`--help` adalah cara tercepat memahami opsi sebuah perintah.

## Menggabungkan Perintah

Tanda `&&` menjalankan perintah berurutan hanya jika sebelumnya berhasil:

```bash
cd blog-saya && npm install && npm run build
```

Pola ini menghemat waktu untuk alur yang sering diulang.

## FAQ

### Apakah harus hafal semua perintah?

Tidak. Cukup kuasai navigasi dan file terlebih dahulu, lalu pelajari perintah lain saat dibutuhkan.

### Apa bedanya `pkg` dan `apt`?

Termux memakai `pkg` sebagai pembungkus `apt` yang lebih ramah pengguna. Keduanya mengelola paket di repositori Termux.

### Bagaimana jika perintah tidak ditemukan?

Paket yang menyediakan perintah itu mungkin belum terpasang, atau namanya berbeda di Termux. Gunakan `pkg search`.

## Kesimpulan

Perintah dasar Termux berkisar pada navigasi (`cd`, `ls`), pengelolaan file, manajemen paket (`pkg`), dan Git. Kuasai yang sering dipakai, manfaatkan `--help`, dan gabungkan perintah dengan `&&` untuk alur efisien. Dari dasar ini, seluruh pengembangan web di ponsel — termasuk [membangun blog dengan Astro](/wims/posts/astro-termux/) — menjadi lebih mudah dikuasai.