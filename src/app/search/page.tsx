import { getAllPosts } from '@/lib/posts';
import SearchInner from '@/components/SearchInner';
import type { Metadata } from 'next';
import { canonicalUrl } from '@/lib/url';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Cari artikel di blog aixwim.',
  alternates: { canonical: canonicalUrl('/search/') },
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
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">Search</h1>
      <SearchInner searchIndex={searchIndex} />
    </section>
  );
}
