---
title: "Breadcrumb Schema untuk Blog: Panduan JSON-LD"
date: "2026-08-17"
category: "SEO"
excerpt: "Breadcrumb schema membantu Google menampilkan jalur navigasi di hasil pencarian. Berikut cara memasang JSON-LD BreadcrumbList di blog."
tags: ["seo", "structured-data", "breadcrumb"]
---

Breadcrumb adalah jalur navigasi yang menunjukkan posisi halaman, misalnya "Beranda > Artikel > Judul Artikel". Dengan menambahkan breadcrumb schema (BreadcrumbList), Google bisa menampilkan jalur ini di hasil pencarian, membuat link tampak lebih informatif dan membantu pengguna memahami struktur situs. Artikel ini menjelaskan cara memasangnya.

## Apa itu BreadcrumbList?

BreadcrumbList adalah tipe structured data dari schema.org yang mendeskripsikan hierarki posisi halaman. Mesin pencari membaca data ini untuk menampilkan breadcrumb di hasil pencarian dan memahami hubungan antar halaman.

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Beranda",
      "item": "https://contoh.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Artikel",
      "item": "https://contoh.com/posts/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Judul Artikel",
      "item": "https://contoh.com/posts/judul/"
    }
  ]
}
```

Setiap item membutuhkan `position` yang berurutan dimulai dari 1, `name` yang ditampilkan, dan `item` berupa URL resmi halaman.

## Memasang di Astro

Di Astro, breadcrumb schema paling mudah diletakkan di halaman artikel, karena di situlah posisi hierarkinya jelas. Tambahkan blok JSON-LD di komponen halaman:

```astro
<script type="application/ld+json" set:html={JSON.stringify(breadcrumb)} />
```

Nilai `name` dan `item` diambil dari data artikel dan URL saat ini. Untuk memastikan URL yang dipakai benar, ikuti pola canonical yang dibahas di [SEO untuk Situs Astro](/wims/posts/seo-untuk-situs-astro/).

## Tampilan di Google

Saat breadcrumb schema valid, Google dapat menampilkan jalur navigasi di bawah judul hasil pencarian, seperti:

> Beranda › Artikel › Judul Artikel

Meskipun tampilan ini tidak otomatis muncul untuk semua situs, data yang valid memberi peluang hasil pencarian yang lebih jelas dan mengundang klik.

## Pedoman yang Perlu Diperhatikan

- **Gunakan URL yang bisa diakses** — setiap `item` harus merupakan URL nyata.
- **Sesuaikan dengan navigasi asli** — schema harus mencerminkan breadcrumb yang tampil di halaman.
- **Mulai dari beranda** — posisi pertama selalu halaman utama.
- **Jangan mengarang jalur** — hanya tampilkan hierarki yang benar-benar ada.

## Validasi Structured Data

Setelah memasang, periksa dengan alat validasi seperti Rich Results Test dari Google. Alat ini menunjukkan apakah schema terbaca, berapa item yang terdeteksi, dan ada peringatan atau error. Validasi juga membantu memastikan JSON yang dihasilkan benar.

## FAQ

### Apakah breadcrumb schema memengaruhi peringkat?

Secara langsung tidak besar, tetapi membuat hasil pencarian lebih menarik dan membantu Google memahami struktur situs.

### Apakah bisa menggabungkan beberapa schema dalam satu halaman?

Bisa. Satu halaman boleh memiliki beberapa blok JSON-LD, misalnya `Article`, `BreadcrumbList`, dan `Person`.

### Apakah breadcrumb visual di halaman wajib?

Tidak wajib, tetapi sangat disarankan agar konsisten dengan schema yang dipasang.

## Kesimpulan

Breadcrumb schema adalah structured data yang ringan namun bermanfaat: Google bisa menampilkan jalur navigasi di hasil pencarian, dan pemahaman struktur situs menjadi lebih baik. Pasang BreadcrumbList dengan posisi yang benar, validasi hasilnya, dan pastikan URL konsisten — ini pelengkap penting dari [pengaturan SEO teknis](/wims/posts/sitemap-dan-robots-txt-untuk-blog/) blog Anda.