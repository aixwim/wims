import { getAllPosts } from '@/lib/posts';
import SearchInner from '@/components/SearchInner';
import type { Metadata } from 'next';
import { siteUrl, href } from '@/lib/url';

export const metadata: Metadata = {
  title: 'Cari Artikel',
  description: 'Cari artikel di blog aixwim.',
  alternates: { canonical: siteUrl + href('/search/') },
};

export default function SearchPage() {
  const posts = getAllPosts();
  const searchIndex = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    tags: p.tags,
  }));

  return (
    <section className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">Cari Artikel</h1>
      <SearchInner searchIndex={searchIndex} />
    </section>
  );
}
