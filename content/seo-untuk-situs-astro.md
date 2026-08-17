---
title: "SEO untuk Situs Astro: Checklist Lengkap"
date: "2026-08-17"
category: "SEO"
excerpt: "Astro sangat ramah SEO karena menghasilkan HTML statis. Berikut checklist lengkap SEO untuk situs Astro: metadata, sitemap, structured data, dan performa."
tags: ["astro", "seo"]
---

Astro menghasilkan HTML statis tanpa JavaScript default, sehingga fondasi SEO-nya sudah kuat. Namun kecepatan saja tidak cukup. Artikel ini menyusun checklist SEO untuk situs Astro: dari metadata dan sitemap hingga structured data dan performa, agar situs mudah ditemukan dan berperingkat baik.

## Metadata Dasar

Setiap halaman wajib punya judul dan deskripsi yang unik. Di Astro, pasang di layout agar otomatis mewarisinya ke semua halaman:

```astro
<title>{title}</title>
<meta name="description" content={description} />
```

Pastikan judul memuat keyword utama secara natural, dan deskripsi menjelaskan manfaat halaman, bukan sekadar mengulang judul.

## Canonical dan Hreflang

Situs dengan beberapa penamaan URL (misalnya berakhiran `/` dan tanpa `/`) perlu menetapkan URL kanonik agar Google tidak menganggapnya halaman duplikat:

```astro
<link rel="canonical" href={url} />
<link rel="alternate" hrefLang="id" href={url} />
```

Canonical mengarah ke URL resmi, sedangkan hreflang membantu versi bahasa yang berbeda. Keduanya diletakkan di `<head>` layout — panduan canonical yang lebih lengkap ada di [artikel canonical URL untuk blog](/wims/posts/canonical-url-untuk-blog/).

## Sitemap dan Robots.txt

Astro mendukung pembuatan sitemap dan robots.txt sebagai file statis. Pastikan:

- `sitemap.xml` memuat semua URL artikel dengan `lastmod`.
- `robots.txt` mengizinkan crawler dan menunjuk ke sitemap.
- URL di dalamnya konsisten dengan `site` dan `base` di `astro.config.mjs`.

Panduan lengkapnya ada di artikel [Sitemap dan Robots.txt untuk Blog](/wims/posts/sitemap-dan-robots-txt-untuk-blog/).

## Structured Data (JSON-LD)

Structured data membantu mesin pencari memahami jenis konten. Untuk artikel, gunakan schema `Article` dan `BreadcrumbList` — panduan untuk yang terakhir ada di [artikel breadcrumb schema untuk blog](/wims/posts/breadcrumb-schema-untuk-blog/):

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Judul Artikel",
  "author": { "@type": "Person", "name": "Nama Penulis" },
  "datePublished": "2026-08-17"
}
```

Di Astro, blok JSON-LD ditambahkan lewat `<script type="application/ld+json" set:html={...} />` di halaman artikel.

## Open Graph dan Twitter Card

Saat link dibagikan, pratinjau yang rapi meningkatkan klik. Pasang Open Graph dan Twitter card di layout dengan gambar ukuran 1200×630. Detail penerapannya ada di artikel [Open Graph Meta Tag untuk Blog](/wims/posts/open-graph-meta-tag-untuk-blog/).

## Internal Linking dan Konten

Halaman statis tidak otomatis saling terhubung. Bangun [internal linking](/wims/posts/internal-linking-untuk-blog/) antar artikel dan gunakan halaman tag atau kategori untuk memperkuat topik. Sebelum menulis, lakukan [riset keyword untuk blog](/wims/posts/cara-riset-keyword-untuk-blog/) agar topik menjawab kebutuhan pembaca.

## Performa dan Core Web Vitals

Astro sudah ringan, tetapi tetap perhatikan:

- Kompresi gambar agar tidak membebani LCP.
- Hindari font yang memblokir render.
- Jangan menambahkan JavaScript ke halaman tanpa alasan.

Optimasi lebih rinci dijelaskan di artikel [Core Web Vitals untuk Blog](/wims/posts/core-web-vitals-untuk-blog/).

## Verifikasi dengan Google Search Console

Terakhir, daftarkan situs di Google Search Console, submit sitemap, dan pantau laporan indeksasi. Langkah ini memberi tahu Anda halaman mana yang terindeks dan mana yang bermasalah.

## FAQ

### Apakah Astro otomatis SEO-friendly?

Astro memberi fondasi kuat lewat HTML statis dan kecepatan, tetapi metadata, sitemap, dan structured data tetap harus dipasang manual.

### Perlu JavaScript untuk SEO di Astro?

Tidak. Justru keunggulan Astro adalah konten dirender sebagai HTML sehingga bisa diindeks tanpa JavaScript.

### Bagaimana menangani situs Astro multi-bahasa?

Gunakan hreflang dan URL terpisah per bahasa, lalu pastikan canonical menunjuk ke versi yang tepat.

## Kesimpulan

SEO untuk situs Astro adalah menyusun bagian yang sudah baik menjadi lengkap: metadata unik, canonical dan hreflang, sitemap dan robots.txt, structured data, Open Graph, internal linking, serta performa. Dengan checklist ini, situs statis yang cepat bisa sekaligus mudah ditemukan dan bersaing di mesin pencari.