import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug, getAllPosts, formatDate, readingMin } from '@/lib/posts';
import { href, siteUrl } from '@/lib/url';
import DisqusComments from '@/components/DisqusComments';
import ShareButtons from '@/components/ShareButtons';
import RelatedPosts from '@/components/RelatedPosts';
import ReadingProgress from '@/components/ReadingProgress';
import BackToTop from '@/components/BackToTop';
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

function getRelatedPosts(currentSlug: string, tags: string[]) {
  const allPosts = getAllPosts();
  return allPosts
    .filter((p) => p.slug !== currentSlug && p.tags.some((t) => tags.includes(t)))
    .slice(0, 4);
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const url = siteUrl + href(`/posts/${slug}/`);
  const relatedPosts = getRelatedPosts(slug, post.tags);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date.toISOString(),
    author: { '@type': 'Person', name: 'aixwim' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    image: siteUrl + '/wims/og.png',
  };

  return (
    <>
      <ReadingProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="max-w-screen-md mx-auto">
        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <time dateTime={post.date.toISOString()}>{formatDate(post.date)}</time>
            <span>&middot;</span>
            <span>{readingMin(post.body)} min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold tracking-tight text-gray-900 dark:text-white leading-[1.2] mb-5">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">{post.excerpt}</p>
          )}

          {/* Author + Share */}
          <div className="flex items-center justify-between mt-8 pb-8 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                A
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">aixwim</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Web Developer</p>
              </div>
            </div>
            <ShareButtons title={post.title} url={url} />
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={href(`/tags/${tag}/`)}
                  className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full px-3 py-1 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </header>

        {/* Cover image placeholder */}
        <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-xl mb-10 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700" />
        </div>

        {/* Content */}
        <div className="prose prose-lg prose-gray dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-strong:text-gray-900 dark:prose-strong:text-white prose-code:text-pink-600 dark:prose-code:text-pink-400 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-li:text-gray-700 dark:prose-li:text-gray-300 max-w-none">
          <MDXRemote source={post.body} />
        </div>

        {/* Share bottom */}
        <div className="mt-12 pt-6 border-t border-gray-100 dark:border-gray-800">
          <ShareButtons title={post.title} url={url} />
        </div>

        {/* Related posts */}
        <RelatedPosts posts={relatedPosts} />

        {/* Back to archive */}
        <div className="mt-8">
          <Link href={href('/posts/')} className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors">
            &larr; Back to all posts
          </Link>
        </div>

        {/* Disqus */}
        <DisqusComments />
      </article>

      <BackToTop />
    </>
  );
}
