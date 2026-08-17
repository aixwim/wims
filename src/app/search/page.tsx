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
    <section>
      <h1 className="page-title">Cari Artikel</h1>
      <SearchInner searchIndex={searchIndex} />
    </section>
  );
}
