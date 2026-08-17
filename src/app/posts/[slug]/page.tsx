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
      <article>
        <header className="mb-8">
          <h1 className="page-title">{post.title}</h1>
          <p className="text-[0.85rem] font-semibold uppercase tracking-[0.07em] text-muted">
            {formatDate(post.date)} · {readingMin(post.body)} menit baca
          </p>
          {post.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={href(`/tags/${tag}/`)}
                  className="text-[0.78rem] font-semibold text-accent hover:text-accent-hover transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </header>
        <div className="prose">
          <MDXRemote source={post.body} />
        </div>
        <div className="mt-12 border-t border-border pt-6">
          <Link href={href('/posts/')}>← Kembali ke semua artikel</Link>
        </div>
      </article>
    </>
  );
}
