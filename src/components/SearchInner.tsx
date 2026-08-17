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
        className="w-full rounded-full border border-gray-300 px-5 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors mb-8"
        placeholder="Ketik judul, tag, atau kata kunci..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        autoFocus
      />
      {query && results.length === 0 && (
        <p className="text-gray-500 text-center py-10">Tidak ditemukan artikel untuk &ldquo;{q}&rdquo;</p>
      )}
      {results.length > 0 && (
        <ul className="space-y-6">
          {results.map((post) => (
            <li key={post.slug}>
              <Link href={href(`/posts/${post.slug}/`)} className="group block">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{post.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
