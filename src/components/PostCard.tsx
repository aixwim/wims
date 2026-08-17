import Link from 'next/link';
import { href } from '@/lib/url';
import { formatDate, readingMin } from '@/lib/posts';

interface Post {
  slug: string;
  title: string;
  date: Date;
  excerpt: string;
  tags: string[];
  body: string;
}

export default function PostCard({ post }: { post: Post }) {
  return (
    <li>
      <Link href={href(`/posts/${post.slug}/`)} className="group block">
        <h3 className="font-bold leading-snug text-heading transition-colors group-hover:text-accent [overflow-wrap:break-word]">
          {post.title}
        </h3>
        <p className="mt-1 text-[0.8rem] font-semibold uppercase tracking-[0.07em] text-muted">
          {formatDate(post.date)} · {readingMin(post.body)} menit baca
        </p>
        {post.excerpt && (
          <p className="mt-2 text-[0.9rem] text-muted leading-relaxed [overflow-wrap:break-word]" data-excerpt>
            {post.excerpt}
          </p>
        )}
      </Link>
      {post.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={href(`/tags/${tag}/`)}
              className="text-[0.78rem] font-semibold text-accent hover:text-accent-hover transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}
    </li>
  );
}
