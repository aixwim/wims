---
title: "Open Graph Meta Tag untuk Blog: Panduan Lengkap"
date: "2026-08-17"
category: "SEO"
excerpt: "Open Graph mengontrol tampilan link blog saat dibagikan di WhatsApp, Facebook, dan X. Pelajari tag wajib, ukuran gambar, dan cara memasangnya di Astro."
tags: ["seo", "open-graph", "meta-tag", "astro"]
---

Ketika link artikel dibagikan di WhatsApp, Facebook, atau X, muncul pratinjau dengan judul, deskripsi, dan gambar. Tampilan itu dikontrol oleh Open Graph meta tag. Artikel ini menjelaskan apa itu Open Graph, tag mana yang wajib dipasang, serta cara menerapkannya di blog Astro.

## Apa itu Open Graph?

Open Graph adalah protokol dari Meta yang memungkinkan halaman web mendeskripsikan dirinya saat dibagikan di media sosial dan aplikasi pesan. Tanpa tag ini, platform hanya menebak judul dan memilih gambar secara acak — hasilnya sering tidak menarik dan tidak akurat.

Karena pratinjau menentukan apakah orang mengklik link Anda, Open Graph adalah bagian penting dari SEO dan distribusi konten.

## Tag Wajib Open Graph

Setidaknya pasang enam tag dasar berikut:

```html
<meta property="og:type" content="article" />
<meta property="og:title" content="Judul Artikel" />
<meta property="og:description" content="Ringkasan menarik tentang isi artikel." />
<meta property="og:url" content="https://contoh.com/posts/slug/" />
<meta property="og:image" content="https://contoh.com/og-image.png" />
<meta property="og:site_name" content="Nama Blog" />
```

- **og:type** — `article` untuk artikel, `website` untuk halaman beranda.
- **og:title** — judul yang ditampilkan saat dibagikan.
- **og:description** — ringkasan singkat; platform biasanya memotong sekitar dua baris.
- **og:url** — URL kanonik halaman, agar semua metrik terpusat pada satu URL.
- **og:image** — gambar pratinjau dengan ukuran rekomendasi 1200×630 piksel.
- **og:site_name** — nama situs yang muncul di pratinjau.

## Aturan Gambar yang Benar

Gambar pratinjau adalah elemen paling berpengaruh. Gunakan:

- Ukuran **1200×630 piksel** atau rasio mendekati 1.91:1.
- Format PNG atau JPG.
- Ukuran file di bawah sekitar 300 KB agar cepat dimuat.
- Pastikan gambar benar-benar tersedia lewat URL publik (bukan URL lokal).

Cek pratinjau hasilnya dengan tool validasi dari platform yang bersangkutan, misalnya Facebook Sharing Debugger, sebelum menyebarkan link.

## Memasang Open Graph di Astro

Di Astro, tag Open Graph idealnya diletakkan di layout agar otomatis muncul di semua halaman. Layout ini mengisi nilai dari frontmatter masing-masing halaman:

```astro
---
const { title, description, image } = Astro.props;
const url = new URL(Astro.url.pathname, Astro.site);
---
<meta property="og:type" content="article" />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:url" content={url} />
<meta property="og:image" content={image} />
<meta property="og:site_name" content="Nama Blog" />
```

Dengan pendekatan ini, setiap halaman mendapat Open Graph yang benar tanpa menulis tag berulang-ulang. Pastikan nilai `image` memakai URL absolut, karena sebagian platform menolak URL relatif.

Untuk Twitter/X, tambahkan juga tag pendamping:

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Judul Artikel" />
<meta name="twitter:description" content="Ringkasan singkat" />
<meta name="twitter:image" content="https://contoh.com/og-image.png" />
```

## Hubungan dengan SEO

Open Graph tidak langsung memengaruhi peringkat pencarian, tetapi mendukung SEO secara tidak langsung: pratinjau yang menarik meningkatkan klik dan pembagian, yang berdampak pada lalu lintas dan keterlibatan. Letakkan bersama [sitemap dan robots.txt](/wims/posts/sitemap-dan-robots-txt-untuk-blog/) sebagai bagian dari pengaturan teknis blog yang menyeluruh — cek juga [checklist SEO untuk situs Astro](/wims/posts/seo-untuk-situs-astro/) untuk memastikan tidak ada bagian yang terlewat.

## FAQ

### Apakah Open Graph sama dengan meta description?

Tidak. Meta description digunakan mesin pencari di hasil pencarian, sedangkan Open Graph digunakan saat link dibagikan di platform sosial. Keduanya bisa dipasang berdampingan.

### Kenapa gambar Open Graph tidak muncul saat dibagikan?

Platform menyimpan cache pratinjau. Setelah mengubah gambar, gunakan validasi platform untuk membersihkan cache. Pastikan juga URL gambar dapat diakses publik dan ukurannya sesuai.

### Apakah wajib menyediakan og:image?

Tidak wajib, tetapi sangat disarankan. Halaman tanpa `og:image` biasanya ditampilkan tanpa gambar atau memakai gambar acak, sehingga kurang menarik untuk diklik.

## Kesimpulan

Open Graph meta tag menentukan bagaimana link blog Anda tampil saat dibagikan. Pasang tag dasar seperti `og:title`, `og:description`, `og:url`, dan `og:image` dengan ukuran gambar 1200×630, lalu letakkan di layout Astro agar otomatis diterapkan ke semua halaman. Pratinjau yang rapi membuat konten lebih mudah diklik dan dibagikan.