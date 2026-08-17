'use client';
import { useState } from 'react';
import Link from 'next/link';
import { href } from '@/lib/url';
import type { Post } from '@/lib/posts';

export default function SearchClient({ searchIndex }: { searchIndex: Pick<Post, 'slug' | 'title' | 'excerpt' | 'tags'>[] }) {
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
        className="search-input"
        placeholder="Ketik judul, tag, atau kata kunci..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        autoFocus
      />
      {query && results.length === 0 && (
        <p className="no-results">Tidak ditemukan artikel untuk &ldquo;{q}&rdquo;</p>
      )}
      {results.length > 0 && (
        <ul className="posts-list">
          {results.map((post) => (
            <li key={post.slug}>
              <Link href={href(`/posts/${post.slug}/`)} className="group block">
                <h3 className="font-bold leading-snug text-heading transition-colors group-hover:text-accent [overflow-wrap:break-word]">
                  {post.title}
                </h3>
                <p className="mt-1 text-[0.8rem] font-semibold uppercase tracking-[0.07em] text-muted">
                  {post.excerpt}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
