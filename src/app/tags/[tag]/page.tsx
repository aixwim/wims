import Link from 'next/link';
import { getPostsByTag, getAllTags } from '@/lib/posts';
import { href, siteUrl } from '@/lib/url';
import PostCard from '@/components/PostCard';
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
    <section>
      <h1 className="page-title">#{tag}</h1>
      <p className="intro">{posts.length} artikel dengan tag ini.</p>
      <ul className="posts-list">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </ul>
      <div className="mt-8">
        <Link href={href('/tags/')}>← Semua tag</Link>
      </div>
    </section>
  );
}
