import Link from 'next/link';
import { getPostsByTag, getAllTags, formatDate } from '@/lib/posts';
import { href, siteUrl, canonicalUrl } from '@/lib/url';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `#${tag}`,
    description: `Artikel dengan tag ${tag}.`,
    alternates: { canonical: canonicalUrl(`/tags/${tag}/`) },
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);
  if (posts.length === 0) notFound();

  return (
    <section>
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">#{tag}</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">{posts.length} articles</p>
      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.slug} className="group">
            <Link href={href(`/posts/${post.slug}/`)} className="block">
              <p className="text-xs font-medium text-gray-400 dark:text-gray-500 mb-1">{formatDate(post.date)}</p>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
                {post.title}
              </h2>
              {post.excerpt && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{post.excerpt}</p>
              )}
            </Link>
          </article>
        ))}
      </div>
      <div className="mt-8">
        <Link href={href('/tags/')} className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors">
          &larr; All tags
        </Link>
      </div>
    </section>
  );
}
