import Link from 'next/link';
import { getAllPosts, formatDate, readingMin } from '@/lib/posts';
import { href, siteUrl } from '@/lib/url';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Artikel',
  description: 'Semua artikel di blog aixwim.',
  alternates: { canonical: siteUrl + href('/posts/') },
};

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <section className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Artikel</h1>
      <p className="text-gray-600 mb-10">Semua artikel yang telah saya tulis.</p>
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
              {post.tags.length > 0 && (
                <div className="mt-2 flex gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-xs font-medium text-gray-500 bg-gray-100 rounded-full px-2.5 py-0.5">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
