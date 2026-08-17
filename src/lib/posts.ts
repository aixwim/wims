import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Post {
  slug: string;
  title: string;
  date: Date;
  excerpt: string;
  tags: string[];
  category?: string;
  metaTitle?: string;
  body: string;
}

const contentDir = path.join(process.cwd(), 'content');

let _cache: Post[] | null = null;

function readAllPosts(): Post[] {
  if (_cache) return _cache;
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.md'));
  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(contentDir, file), 'utf-8');
    const { data, content } = matter(raw);
    return {
      slug: file.replace(/\.md$/, ''),
      title: data.title ?? '',
      date: new Date(data.date),
      excerpt: data.excerpt ?? '',
      tags: data.tags ?? [],
      category: data.category,
      metaTitle: data.meta_title,
      body: content,
    };
  });
  _cache = posts.sort((a, b) => b.date.getTime() - a.date.getTime());
  return _cache;
}

export function getAllPosts(): Post[] {
  return readAllPosts();
}

export function getPostBySlug(slug: string): Post | undefined {
  return readAllPosts().find((p) => p.slug === slug);
}

export function formatDate(d: Date | string): string {
  return new Date(d).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function readingMin(body: string): number {
  const words = body.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function getAllTags(): { tag: string; count: number }[] {
  const posts = getAllPosts();
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((p) => p.tags.includes(tag));
}

export function popularityOf(posts: Post[]) {
  const bodyBySlug = new Map(posts.map((p) => [p.slug, p.body]));
  return (post: Post) => {
    let backlinks = 0;
    for (const [slug, body] of bodyBySlug) {
      if (slug !== post.slug && body.includes(`/posts/${post.slug}/`)) backlinks++;
    }
    return backlinks * 3 + Math.min(readingMin(post.body), 15);
  };
}
