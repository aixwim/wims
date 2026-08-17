---
title: "Cara Backup Blog Astro di Termux"
date: "2026-08-17"
category: "Termux"
excerpt: "Backup blog Astro cukup dengan menyimpan kode sumber ke repository. Berikut strategi backup aman dari Termux: git, penyimpanan, dan otomatisasi."
tags: ["termux", "backup", "astro", "manajemen"]
---

Ponsel bisa hilang, rusak, atau aplikasi tidak sengaja dihapus. Untuk blog yang dikerjakan dari Termux, backup bukan opsional — kode sumber adalah satu-satunya hal yang tidak bisa dibangun ulang. Artikel ini menjelaskan cara backup blog Astro di Termux dengan beberapa lapis strategi.

## Kenapa Git Adalah Backup Utama

Backup terbaik untuk blog adalah menyimpan seluruh kode sumber di repository seperti GitHub. Keuntungannya:

- **Riwayat lengkap** — setiap perubahan tersimpan dan bisa dikembalikan.
- **Akses dari mana saja** — cukup clone ulang di perangkat baru.
- **Redundansi otomatis** — server GitHub menyimpan salinan di banyak lokasi.

Semua file yang perlu dibangun ulang ada di repo: konten markdown, konfigurasi, dan template. Jangan lupa memakai `.gitignore` agar `node_modules` dan hasil build tidak ikut ter-commit.

## Menyimpan ke GitHub dari Termux

Pastikan project sudah menjadi repositori dan terhubung ke remote:

```bash
git status
git add .
git commit -m "Backup konten"
git push origin main
```

Jika belum pernah menghubungkan project ke GitHub, ikuti panduan di [artikel Git dan GitHub di Termux](/wims/posts/git-dan-github-di-termux/).

## Backup ke Penyimpanan Lokal

Selain GitHub, simpan salinan langsung ke penyimpanan ponsel sebagai cadangan kedua:

```bash
termux-setup-storage
cp -r ~/blog-saya ~/storage/downloads/backup-blog-$(date +%Y%m%d)
```

Perintah `termux-setup-storage` membuat folder `~/storage` yang menunjuk ke penyimpanan internal. Salinan ini berguna saat repo di GitHub tidak dapat diakses. Izin penyimpanan dibahas di [cara setup Termux untuk pengembangan web](/wims/posts/cara-setup-termux-untuk-pengembangan-web/).

## Otomatisasi dengan Git Hook

Agar tidak lupa, buat *post-commit hook* yang otomatis menyalin ke penyimpanan setiap kali commit:

```bash
mkdir -p ~/blog-saya/.git/hooks
echo 'rsync -a --delete ~/blog-saya/ ~/storage/downloads/backup-blog/' > ~/blog-saya/.git/hooks/post-commit
chmod +x ~/blog-saya/.git/hooks/post-commit
```

Dengan hook ini, backup lokal mengikuti setiap commit secara otomatis.

## Memulihkan di Perangkat Baru

Bila perangkat diganti, pemulihan cukup sederhana:

```bash
pkg install nodejs git
git clone git@github.com:username/blog.git
cd blog
npm install
npm run dev
```

Pastikan Node.js terpasang — panduannya ada di [cara install Node.js di Termux](/wims/posts/cara-install-nodejs-di-termux/).

## Yang Perlu Diperhatikan

- **Jangan commit `node_modules`** — bisa diinstall ulang dengan `npm install`.
- **Backup `.env` bila ada** — file kredensial tidak ikut masuk repository publik.
- **Catat versi Node** — tulis di README agar pemulihan di perangkat baru memakai versi yang sama.

## FAQ

### Apakah backup di GitHub cukup?

Untuk kode sumber, ya — karena konten, template, dan konfigurasi semuanya ada di repo. Salinan lokal menambah keamanan bila repo tidak dapat diakses.

### Bagaimana jika lupa commit?

Kebiasaan commit setelah selesai menulis artikel adalah disiplin paling penting. Hook otomatis bisa membantu mengurangi risiko lupa.

### Apakah hasil build `dist` perlu di-backup?

Tidak perlu, karena bisa dibangun ulang dari kode sumber dengan `npm run build`. Menyimpannya hanya membuang ruang.

## Kesimpulan

Backup blog Astro di Termux paling efektif lewat repository Git — setiap commit adalah titik pemulihan yang bisa diakses dari mana saja. Lengkapi dengan salinan lokal di penyimpanan ponsel dan, bila perlu, hook otomatis. Dengan strategi ini, blog aman meski perangkat berganti atau rusak.