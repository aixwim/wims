import Link from 'next/link';
import { getAllPosts, formatDate } from '@/lib/posts';
import { href, canonicalUrl } from '@/lib/url';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Archive',
  description: 'Semua artikel di blog aixwim.',
  alternates: { canonical: canonicalUrl('/posts/') },
};

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <section>
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">Archive</h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.slug} className="group">
            <Link href={href(`/posts/${post.slug}/`)} prefetch={false} className="block">
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
    </section>
  );
}
