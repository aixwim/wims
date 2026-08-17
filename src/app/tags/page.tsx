import Link from 'next/link';
import { getAllTags } from '@/lib/posts';
import { href, siteUrl } from '@/lib/url';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tags',
  description: 'Semua tag di blog aixwim.',
  alternates: { canonical: siteUrl + href('/tags/') },
};

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <section className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Tags</h1>
      <p className="text-gray-600 mb-10">Semua topik yang dibahas di blog ini.</p>
      <div className="flex flex-wrap gap-3">
        {tags.map(({ tag, count }) => (
          <Link
            key={tag}
            href={href(`/tags/${tag}/`)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-full px-4 py-2 hover:bg-gray-200 transition-colors"
          >
            {tag} <span className="text-gray-400">({count})</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
