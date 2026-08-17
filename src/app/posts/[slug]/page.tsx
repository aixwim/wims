import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug, getAllPosts, formatDate, readingMin } from '@/lib/posts';
import { href, siteUrl } from '@/lib/url';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const url = siteUrl + href(`/posts/${slug}/`);
  return {
    title: post.metaTitle || post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.excerpt,
      url,
      type: 'article',
      publishedTime: post.date.toISOString(),
      tags: post.tags,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date.toISOString(),
    author: { '@type': 'Person', name: 'aixwim' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': siteUrl + href(`/posts/${slug}/`) },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="mx-auto max-w-2xl px-6 py-16">
        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">{post.title}</h1>
          <p className="text-sm text-gray-500">
            {formatDate(post.date)} &middot; {readingMin(post.body)} min read
          </p>
          {post.tags.length > 0 && (
            <div className="mt-3 flex gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={href(`/tags/${tag}/`)}
                  className="text-xs font-medium text-gray-500 bg-gray-100 rounded-full px-2.5 py-0.5 hover:bg-gray-200 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </header>
        <div className="prose prose-gray prose-headings:font-semibold prose-a:text-blue-600 prose-strong:text-gray-900 max-w-none">
          <MDXRemote source={post.body} />
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link href={href('/posts/')} className="text-sm font-semibold text-blue-600 hover:text-blue-500">
            &larr; Kembali ke semua artikel
          </Link>
        </div>
      </article>
    </>
  );
}
