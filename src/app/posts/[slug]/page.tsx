import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug, getAllPosts, formatDate, readingMin } from '@/lib/posts';
import { href, siteUrl } from '@/lib/url';
import DisqusComments from '@/components/DisqusComments';
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
      images: [{ url: '/wims/og.png', width: 1200, height: 630, alt: post.title }],
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
      <article className="max-w-screen-md mx-auto">
        <header className="mb-10">
          <p className="text-xs font-medium text-gray-400 dark:text-gray-500 mb-3">
            {formatDate(post.date)} &middot; {readingMin(post.body)} min read
          </p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight mb-4">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">{post.excerpt}</p>
          )}
          <div className="flex items-center gap-3 mt-6">
            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">aixwim</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(post.date)}</p>
            </div>
          </div>
          {post.tags.length > 0 && (
            <div className="flex gap-2 mt-4">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={href(`/tags/${tag}/`)}
                  className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full px-3 py-1 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </header>

        <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-md mb-10">
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-md" />
        </div>

        <div className="prose prose-gray dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-strong:text-gray-900 dark:prose-strong:text-white max-w-none">
          <MDXRemote source={post.body} />
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
          <Link href={href('/posts/')} className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors">
            &larr; Back to all posts
          </Link>
        </div>

        <DisqusComments />
      </article>
    </>
  );
}
