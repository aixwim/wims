---
title: "Content Collections di Astro: Mengelola Artikel dengan Skema Ketat"
date: "2026-08-17"
category: "Astro"
excerpt: "Content Collections membantu mengelola artikel markdown dengan skema frontmatter yang divalidasi saat build. Berikut cara menggunakannya."
tags: ["astro", "content-collections", "markdown"]
---

Salah satu fitur unggulan Astro untuk blog adalah content collections. Fitur ini memungkinkan Anda mengelompokkan konten markdown, menetapkan skema frontmatter, dan memvalidasinya saat build sehingga kesalahan struktur terdeteksi sebelum diterbitkan. Artikel ini menjelaskan cara kerja dan penerapannya.

## Apa itu Content Collections?

Content collections adalah cara Astro mengatur dokumen markdown, MDX, atau JSON ke dalam grup yang terstruktur. Setiap koleksi memiliki skema — definisi field apa saja yang boleh dan wajib ada di frontmatter setiap dokumen.

Dengan skema, Anda mendapat:

- **Validasi otomatis** — build gagal bila field wajib hilang atau tipe datanya salah.
- **TypeScript autocomplete** — field dikenali editor secara otomatis.
- **Struktur konsisten** — semua artikel mengikuti pola yang sama.

## Mendefinisikan Koleksi

Koleksi didefinisikan di file konfigurasi konten, misalnya `src/content.config.ts`:

```ts
import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { posts };
```

Setiap artikel adalah file markdown di `src/content/posts/` dengan frontmatter mengikuti skema:

```markdown
---
title: "Judul Artikel"
date: "2026-08-17"
excerpt: "Ringkasan singkat."
tags: ["astro", "seo"]
---
```

Nama file menentukan slug, misalnya `cara-riset-keyword-untuk-blog.md` menjadi URL `posts/cara-riset-keyword-untuk-blog/`.

## Mengambil dan Merender Konten

Untuk mengambil semua artikel dalam satu koleksi:

```ts
import { getCollection } from 'astro:content';

const posts = await getCollection('posts');
```

Untuk mengambil satu artikel dan merendernya:

```ts
import { getCollection, render } from 'astro:content';

const post = (await getCollection('posts')).find((p) => p.slug === 'nama-slug');
const { Content, headings } = await render(post);
```

Variabel `headings` berguna untuk membuat daftar isi otomatis, seperti yang dipakai blog ini.

## Kapan Menggunakan MDX?

Jika artikel memerlukan komponen interaktif di tengah konten, gunakan koleksi tipe `content` dengan file `.mdx`. MDX memungkinkan mengimpor komponen Astro langsung di dalam dokumen. Untuk artikel biasa yang hanya berisi teks dan gambar, markdown standar sudah cukup.

Pertimbangan lain: file MDX membutuhkan penanganan build sedikit berbeda dan sebaiknya hanya dipakai saat benar-benar dibutuhkan komponen.

## Manfaat untuk Blog Multikategori

Dengan skema, Anda bisa menambah field seperti `category` atau `featured` lalu menyaring artikel saat render:

```ts
const seoPosts = posts.filter((p) => p.data.tags.includes('seo'));
```

Ini menjadi dasar pembuatan halaman kategori atau tag otomatis, dan memudahkan penataan [topical cluster](/wims/posts/cara-riset-keyword-untuk-blog/).

## FAQ

### Apa perbedaan content collections dan folder biasa?

Content collections menambahkan skema dan validasi. Folder biasa hanya menampung file tanpa aturan field, sehingga kesalahan frontmatter baru terlihat saat render.

### Bisakah collection berisi file JSON?

Bisa. Dengan `type: 'data'`, koleksi membaca file JSON dan YAML sebagai data terstruktur, berguna untuk data non-artikel seperti testimoni atau pengaturan.

### Apakah content collections memperlambat build?

Tidak signifikan. Validasi terjadi sekali saat build dan hasilnya tetap berupa halaman statis yang cepat.

## Kesimpulan

Content collections membuat pengelolaan artikel lebih aman dan terstruktur. Tentukan skema frontmatter sekali, lalu setiap artikel baru terjamin valid sebelum dipublikasikan. Ini fondasi teknis yang solid untuk blog yang ingin terus bertambah tanpa merusak struktur — dan memudahkan membangun [topical authority lewat riset keyword](/wims/posts/cara-riset-keyword-untuk-blog/).