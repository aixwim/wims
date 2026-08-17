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
    <section>
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">Tags</h1>
      <div className="flex flex-wrap gap-3">
        {tags.map(({ tag, count }) => (
          <Link
            key={tag}
            href={href(`/tags/${tag}/`)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {tag} <span className="text-gray-400 dark:text-gray-500">({count})</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
