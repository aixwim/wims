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
      <h1 className="page-title">Tags</h1>
      <p className="intro">Semua topik yang dibahas di blog ini.</p>
      <div className="flex flex-wrap gap-3">
        {tags.map(({ tag, count }) => (
          <Link
            key={tag}
            href={href(`/tags/${tag}/`)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border bg-surface text-[0.9rem] font-medium text-ink transition-colors hover:border-accent hover:text-accent"
          >
            #{tag} <span className="text-[0.78rem] font-semibold text-muted">({count})</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
