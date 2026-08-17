import Link from 'next/link';
import { getPostsByTag, getAllTags } from '@/lib/posts';
import { href, siteUrl } from '@/lib/url';
import { formatDate, readingMin } from '@/lib/posts';
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
    title: `Tag: ${tag}`,
    description: `Artikel dengan tag ${tag}.`,
    alternates: { canonical: siteUrl + href(`/tags/${tag}/`) },
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);
  if (posts.length === 0) notFound();

  return (
    <section className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">#{tag}</h1>
      <p className="text-gray-600 mb-10">{posts.length} artikel dengan tag ini.</p>
      <ul className="space-y-8">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={href(`/posts/${post.slug}/`)} className="group block">
              <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {formatDate(post.date)} &middot; {readingMin(post.body)} min read
              </p>
              {post.excerpt && (
                <p className="text-gray-600 mt-2 text-sm leading-relaxed">{post.excerpt}</p>
              )}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <Link href={href('/tags/')} className="text-sm font-semibold text-blue-600 hover:text-blue-500">
          &larr; Semua tag
        </Link>
      </div>
    </section>
  );
}
