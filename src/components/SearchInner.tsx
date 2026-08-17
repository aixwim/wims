'use client';
import { useState } from 'react';
import Link from 'next/link';
import { href } from '@/lib/url';
import type { Post } from '@/lib/posts';

export default function SearchInner({ searchIndex }: { searchIndex: Pick<Post, 'slug' | 'title' | 'excerpt' | 'tags'>[] }) {
  const [q, setQ] = useState('');

  const query = q.toLowerCase().trim();
  const results = query
    ? searchIndex.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.excerpt.toLowerCase().includes(query) ||
          p.tags.some((t) => t.includes(query))
      )
    : [];

  return (
    <>
      <input
        type="search"
        className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors mb-8"
        placeholder="Search articles..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        autoFocus
      />
      {query && results.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400 text-center py-10">No articles found for &ldquo;{q}&rdquo;</p>
      )}
      {results.length > 0 && (
        <div className="space-y-6">
          {results.map((post) => (
            <article key={post.slug} className="group">
              <Link href={href(`/posts/${post.slug}/`)} className="block">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{post.excerpt}</p>
              </Link>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
