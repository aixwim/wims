import Link from 'next/link';
import { formatDate } from '@/lib/posts';
import { href } from '@/lib/url';
import type { Post } from '@/lib/posts';

export default function RelatedPosts({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Artikel Terkait</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <Link key={post.slug} href={href(`/posts/${post.slug}/`)} className="group block p-4 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-900 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-all">
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">{formatDate(post.date)}</p>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors line-clamp-2">
              {post.title}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
