import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { href, siteUrl } from '@/lib/url';
import PostCard from '@/components/PostCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Artikel',
  description: 'Semua artikel di blog aixwim.',
  alternates: { canonical: siteUrl + href('/posts/') },
  openGraph: { url: siteUrl + href('/posts/') },
};

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <section>
      <h1 className="page-title">Artikel</h1>
      <p className="intro">Semua artikel yang telah saya tulis.</p>
      <ul className="posts-list">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </ul>
    </section>
  );
}
