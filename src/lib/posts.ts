import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
export { formatDate, readingMin } from './format';

export interface Post {
  slug: string;
  title: string;
  date: Date;
  excerpt: string;
  tags: string[];
  category?: string;
  cover?: string;
  metaTitle?: string;
  metaDescription?: string;
  draft?: boolean;
  body: string;
}

const contentDir = path.join(process.cwd(), 'content');

let _cache: Post[] | null = null;
let _postsBySlug: Map<string, Post> | null = null;
let _postsByTag: Map<string, Post[]> | null = null;
let _tags: { tag: string; count: number }[] | null = null;
let _postIndexes: Map<string, number> | null = null;

function readAllPosts(): Post[] {
  if (_cache) return _cache;
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.md'));
  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(contentDir, file), 'utf-8');
    const { data, content } = matter(raw);
    return {
      slug: data.slug ?? file.replace(/\.md$/, ''),
      title: data.title ?? '',
      date: new Date(data.date),
      excerpt: data.excerpt ?? '',
      tags: data.tags ?? [],
      category: data.category,
      cover: data.cover,
      metaTitle: data.meta_title,
      metaDescription: data.meta_description,
      draft: Boolean(data.draft),
      body: content,
    };
  });
  _cache = posts
    .filter((p) => !p.draft)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
  _postsBySlug = new Map(_cache.map((post) => [post.slug, post]));
  _postIndexes = new Map(_cache.map((post, index) => [post.slug, index]));

  _postsByTag = new Map();
  for (const post of _cache) {
    for (const tag of post.tags) {
      const taggedPosts = _postsByTag.get(tag) ?? [];
      taggedPosts.push(post);
      _postsByTag.set(tag, taggedPosts);
    }
  }
  _tags = [..._postsByTag.entries()]
    .map(([tag, taggedPosts]) => ({ tag, count: taggedPosts.length }))
    .sort((a, b) => b.count - a.count);
  return _cache;
}

export function getAllPosts(): Post[] {
  return readAllPosts();
}

export function getPostBySlug(slug: string): Post | undefined {
  readAllPosts();
  return _postsBySlug?.get(slug);
}

export function getAllTags(): { tag: string; count: number }[] {
  readAllPosts();
  return _tags ?? [];
}

export function getPostsByTag(tag: string): Post[] {
  readAllPosts();
  return _postsByTag?.get(tag) ?? [];
}

export function getAdjacentPosts(slug: string): { prev?: Post; next?: Post } {
  const posts = getAllPosts();
  const idx = _postIndexes?.get(slug);
  if (idx === undefined) return {};
  return {
    prev: idx > 0 ? posts[idx - 1] : undefined,
    next: idx >= 0 && idx < posts.length - 1 ? posts[idx + 1] : undefined,
  };
}
