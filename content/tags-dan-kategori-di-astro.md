---
title: "Tags dan Kategori di Astro: Cara Membuatnya"
date: "2026-08-17"
category: "Astro"
excerpt: "Tags dan kategori membantu pembaca menemukan konten terkait dan memperkuat struktur topik. Berikut cara mengelompokkan dan membuat halaman tag di Astro."
tags: ["astro", "tags", "kategori"]
---

Menandai artikel dengan tags dan kategori membuat blog lebih mudah dijelajahi: pembaca bisa menemukan semua tulisan dalam satu topik, dan struktur situs terlihat jelas bagi mesin pencari. Artikel ini menjelaskan cara membuat tags dan kategori di Astro memakai content collections.

## Definisikan Field di Skema

Pertama, tambahkan field `tags` pada skema koleksi di `src/content.config.ts`:

```ts
const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});
```

Dengan skema ini, setiap artikel bisa diberi tags pada frontmatter:

```markdown
---
title: "Judul Artikel"
date: "2026-08-17"
tags: ["seo", "astro"]
---
```

Konsep content collections dijelaskan lengkap di [artikel Content Collections di Astro](/wims/posts/content-collections-astro/).

## Menampilkan Tags di Halaman Artikel

Untuk menampilkan tags pada setiap artikel, baca field dari frontmatter lalu render sebagai tautan:

```astro
{post.data.tags.map((t: string) => (
  <a href={`/tags/${t}/`}>#{t}</a>
))}
```

Tautan ini mengarah ke halaman tag yang menampilkan semua artikel bertag sama.

## Membuat Halaman Tag Dinamis

Buat halaman dinamis di `src/pages/tags/[tag]/index.astro` dengan `getStaticPaths` agar satu halaman dihasilkan untuk setiap tag:

```ts
export async function getStaticPaths() {
  const posts = await getCollection('posts');
  const tags = [...new Set(posts.flatMap((p) => p.data.tags))];
  return tags.map((tag) => ({
    params: { tag },
    props: { posts: posts.filter((p) => p.data.tags.includes(tag)) },
  }));
}
```

Halaman ini akan menampilkan semua artikel yang memakai tag tertentu.

## Kategori vs Tags

Keduanya mengelompokkan konten, tetapi perannya berbeda:

- **Kategori** — kelompok besar dan tetap, misalnya "SEO" atau "Astro". Biasanya hanya satu per artikel.
- **Tags** — label spesifik dan fleksibel, bisa lebih dari satu per artikel.

Untuk blog kecil, tags saja sudah cukup. Kategori berguna saat konten mulai banyak dan butuh hirarki. Bedanya dengan pillar dan cluster pada [riset keyword](/wims/posts/cara-riset-keyword-untuk-blog/) adalah hierarki konten yang dirancang, bukan sekadar pelabelan.

## Menampilkan Daftar Semua Tags

Buat halaman indeks tag yang menampilkan semua tag beserta jumlah artikel:

```astro
{tags.map((t) => (
  <a href={`/tags/${t}/`}>#{t} ({count})</a>
))}
```

Halaman ini membantu pembaca menelusuri seluruh topik dan memberi jalur navigasi tambahan untuk mesin pencari.

## Hubungan dengan SEO

Tags memberi beberapa manfaat SEO:

- **Internal linking** — setiap tag menghubungkan semua artikel bertopik sama.
- **Struktur topik** — membantu Google memahami cakupan topik situs.
- **Halaman indeks** — halaman tag ikut terindeks dan masuk sitemap.

Pastikan halaman tag juga masuk [sitemap](/wims/posts/sitemap-dan-robots-txt-untuk-blog/) dan gunakan tags secara konsisten, tidak asal menambah label yang sama maknanya.

## FAQ

### Berapa banyak tags per artikel?

Gunakan secukupnya — umumnya dua hingga lima tags yang benar-benar mewakili isi.

### Apakah halaman tag bisa membuat konten duplikat?

Bisa bila terlalu banyak halaman tag dengan isi hampir sama. Gunakan tags yang bermakna dan gabungkan yang sinonim.

### Apakah kategori wajib di Astro?

Tidak wajib. Anda bisa memakai tags saja, atau menambahkan field `category` pada skema bila butuh hirarki yang lebih besar.

## Kesimpulan

Tags dan kategori di Astro dimulai dari skema frontmatter, lalu diwujudkan lewat halaman dinamis untuk setiap tag dan halaman indeks tags. Fitur ini mempermudah navigasi pembaca, memperkuat internal linking, dan membantu struktur topik situs — pelengkap yang baik untuk strategi [konten bercluster](/wims/posts/cara-riset-keyword-untuk-blog/).