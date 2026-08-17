---
title: "Cara Menambahkan Sistem Komentar di Blog Astro"
date: "2026-08-17"
category: "Astro"
excerpt: "Blog statis tidak punya server untuk komentar. Giscus memanfaatkan diskusi GitHub sebagai backend. Berikut cara memasangnya di Astro."
tags: ["astro", "komentar", "giscus"]
---

Blog statis tidak memiliki database server, sehingga komentar tidak bisa disimpan seperti di blog dinamis. Solusinya: memakai layanan pihak ketiga. Giscus menjadi pilihan populer karena memanfaatkan GitHub Discussions sebagai backend — gratis, tanpa iklan, dan data tersimpan di repository Anda. Artikel ini menjelaskan cara menambahkan sistem komentar di blog Astro dengan Giscus.

## Pilihan Layanan Komentar

Beberapa opsi umum:

- **Giscus** — berbasis GitHub Discussions, gratis, ringan.
- **Utterances** — mirip, berbasis GitHub Issues.
- **Disqus** — fitur lengkap, tetapi beriklan dan membebani halaman.

Untuk blog di GitHub Pages, Giscus adalah pilihan yang paling alami karena seluruh ekosistemnya sudah berada di GitHub.

## Aktifkan GitHub Discussions

Giscus membutuhkan repository dengan fitur Discussions aktif:

1. Buka repository di GitHub.
2. Masuk ke **Settings → General → Features**.
3. Centang **Discussions** dan simpan.

Tanpa langkah ini, Giscus tidak bisa menyimpan komentar.

## Atur Konfigurasi Giscus

Buka aplikasi Giscus di situs resminya, pilih repository, dan atur kategori *announcement* (dibuat otomatis oleh Giscus). Aplikasi akan menghasilkan snippet dengan parameter seperti `data-repo`, `data-repo-id`, `data-category`, dan `data-category-id`.

Salah satu konsep penting adalah **mapping**:

- **Pathname** — setiap halaman mendapat thread komentar sendiri berdasarkan URL.
- **Specific term** — semua halaman berbagi satu thread (jarang dipakai).
- **Og:title atau lainnya** — cocokkan berdasar atribut lain.

`pathname` adalah pilihan paling praktis untuk blog.

## Membuat Komponen Giscus di Astro

Buat komponen, misalnya `src/components/Giscus.astro`:

```astro
---
const { slug } = Astro.props;
const url = `https://contoh.com/posts/${slug}/`;
---

<section class="comments">
  <h2>Komentar</h2>
  <script is:inline src="https://giscus.app/client.js"
    data-repo="username/repository"
    data-repo-id="..."
    data-category="Announcements"
    data-category-id="..."
    data-mapping="specific"
    data-term={url}
    data-theme="preferred_color_scheme"
    data-loading="lazy"
    async>
  </script>
</section>
```

Perhatikan penggunaan `data-mapping="specific"` dengan `data-term` berisi URL artikel — ini memastikan setiap artikel punya thread tersendiri, tidak tergantung pada struktur URL yang mungkin berubah.

Lalu panggil komponen di halaman artikel:

```astro
<Giscus slug={post.slug} />
```

## Mengoptimalkan Tema dan Kinerja

Giscus mendukung tema sesuai preferensi pengguna (`preferred_color_scheme`) yang cocok untuk blog dengan [mode gelap](/wims/posts/cara-membuat-dark-mode-di-blog/). Untuk kinerja, gunakan `data-loading="lazy"` agar skrip hanya dimuat saat pengguna mendekati area komentar — sejalan dengan prinsip meminimalkan beban di [artikel mempercepat blog statis](/wims/posts/cara-mempercepat-blog-statis/).

## Hubungan dengan SEO

Komentar menambah konten unik di setiap halaman dan bisa memperpanjang waktu kunjungan pembaca. Pastikan area komentar ikut terindeks dan halaman [sitemap dan robots.txt](/wims/posts/sitemap-dan-robots-txt-untuk-blog/) tetap memuat semua artikel.

## FAQ

### Apakah Giscus benar-benar gratis?

Ya. Giscus memakai GitHub Discussions yang tersedia gratis pada repository publik.

### Apakah komentar bisa moderasi?

Bisa. Karena berbasis GitHub Discussions, moderasi dilakukan lewat pengaturan repository, termasuk siapa yang boleh berkomentar.

### Apakah pembaca perlu akun GitHub untuk berkomentar?

Ya, Giscus mewajibkan login GitHub untuk berkomentar. Ini pertimbangan penting bila audiens Anda tidak terbiasa dengan GitHub.

## Kesimpulan

Menambahkan sistem komentar di blog Astro mudah dengan Giscus: aktifkan GitHub Discussions, dapatkan konfigurasi dari aplikasi Giscus, lalu pasang sebagai komponen di halaman artikel. Dengan `data-mapping="specific"` dan loading lazy, komentar berfungsi baik tanpa memperlambat blog statis Anda.