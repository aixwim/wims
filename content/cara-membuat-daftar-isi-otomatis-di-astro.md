---
title: "Cara Membuat Daftar Isi Otomatis di Blog Astro"
date: "2026-08-17"
category: "Astro"
excerpt: "Daftar isi memudahkan pembaca menavigasi artikel panjang dan memberi peluang tampil di hasil pencarian. Berikut cara membuatnya otomatis di Astro."
tags: ["astro", "daftar-isi", "toc"]
---

Artikel panjang yang terstruktur dengan heading baik, tetapi tanpa daftar isi pembaca harus menggulir untuk menemukan bagian yang dicari. Daftar isi (table of contents) memecahkan masalah ini dan memberi manfaat SEO tambahan. Artikel ini menjelaskan cara membuat daftar isi otomatis di blog Astro dari heading artikel.

## Manfaat Daftar Isi

Daftar isi memberi beberapa keuntungan:

- **Navigasi cepat** — pembaca langsung melompat ke bagian yang dibutuhkan.
- **Struktur visual** — menunjukkan cakupan topik sebelum membaca.
- **SEO** — jika dijadikan tautan anchor, membantu mesin pencari memahami struktur heading.
- **Featured snippet** — heading yang jelas meningkatkan peluang muncul di hasil pencarian.

Blog Anda sendiri sudah memakai pola ini — perhatikan cara artikel menampilkan daftar bagian di awal.

## Mengambil Heading dari Artikel

Di Astro, fungsi `render` menyediakan data heading setiap artikel:

```astro
---
import { getCollection, render } from 'astro:content';

const { Content, headings } = await render(post);
---
```

Variabel `headings` berisi array dengan `depth`, `slug`, dan `text`. Inilah bahan baku daftar isi.

## Membuat Komponen Daftar Isi

Buat komponen yang menerima headings dan merendernya sebagai tautan anchor:

```astro
---
const { headings } = Astro.props;
---

<nav class="toc">
  <strong>Daftar Isi</strong>
  <ul>
    {
      headings.filter((h) => h.depth === 2 || h.depth === 3).map((h) => (
        <li>
          <a href={`#${h.slug}`}>{h.text}</a>
        </li>
      ))
    }
  </ul>
</nav>
```

Tautan `#slug` mengarah ke heading dengan id yang sama di dalam artikel.

## Memastikan Heading Punya ID

Agar tautan anchor bekerja, setiap heading harus memiliki atribut `id` yang sesuai. Astro menghasilkan slug otomatis untuk heading dalam banyak konfigurasi. Bila belum ada, tambahkan id secara dinamis lewat sedikit JavaScript setelah halaman dirender, misalnya membuat id dari teks heading yang diubah menjadi lowercase dan mengganti spasi dengan tanda hubung.

## Menyaring Tingkat Heading

Tidak semua heading perlu masuk daftar isi. Filter yang umum:

- **H2 dan H3** — cukup untuk sebagian besar artikel.
- **Hanya H2** — untuk artikel pendek agar daftar tidak panjang.

Memilih kedalaman yang tepat membuat daftar isi tetap ringkas. Struktur heading yang baik dibahas di [artikel menulis konten blog yang SEO-friendly](/wims/posts/cara-menulis-konten-blog-seo-friendly/).

## Daftar Isi dan SEO

Daftar isi memperkuat sinyal struktur: heading ber-anchor menegaskan hierarki dan topik yang dicakup. Bila artikel panjang, ini membantu Google menilai kelengkapan — sejalan dengan prinsip [topical coverage lewat riset keyword](/wims/posts/cara-riset-keyword-untuk-blog/).

## FAQ

### Apakah daftar isi wajib di semua artikel?

Tidak wajib. Gunakan untuk artikel dengan beberapa bagian; untuk tulisan pendek justru mengganggu.

### Apakah tautan daftar isi masuk ke sitemap?

Tidak langsung. Tautan anchor adalah bagian dari halaman yang sama, bukan URL terpisah.

### Bisakah daftar isi dibuat sticky?

Bisa. Beri posisi fixed di sidebar untuk artikel panjang, tetapi pastikan tidak menutupi konten di layar kecil.

## Kesimpulan

Daftar isi otomatis di Astro mudah dibuat dari data `headings` yang disediakan `render`: filter H2/H3, render sebagai tautan anchor, dan pastikan heading punya id. Fitur kecil ini meningkatkan kenyamanan membaca sekaligus menegaskan struktur artikel di mata mesin pencari.