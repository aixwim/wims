import Link from 'next/link';
import { getAllPosts, popularityOf, formatDate, readingMin } from '@/lib/posts';
import { href, siteUrl } from '@/lib/url';
import PostCard from '@/components/PostCard';
import Collapsible from '@/components/Collapsible';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'aixwim — Blog',
  description: 'Blog pribadi aixwim tentang teknologi, pengembangan web, dan catatan harian.',
  alternates: { canonical: siteUrl + href('/') },
  openGraph: { url: siteUrl + href('/') },
};

export default function HomePage() {
  const posts = getAllPosts();
  const totalPosts = posts.length;
  const latest = posts.slice(0, 5);

  const score = popularityOf(posts);
  const popularTop = [...posts].sort((a, b) => score(b) - score(a)).slice(0, 5);

  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  const allTags = [...counts.entries()].sort((a, b) => b[1] - a[1]);

  return (
    <section>
      <div className="hero">
        <p className="hero-eyebrow">Selamat datang di blog saya</p>
        <h1 className="hero-title">Halo, saya <span className="hero-name">aixwim</span></h1>
        <p className="hero-desc">
          Saya menulis tentang teknologi, pengembangan web, dan hal-hal yang saya
          pelajari sepanjang perjalanan. {totalPosts} artikel telah dipublikasikan.
        </p>
        <div className="hero-actions">
          <Link className="hero-btn primary" href={href('/posts/')}>Lihat Artikel</Link>
          <Link className="hero-btn" href={href('/about/')}>Tentang Saya</Link>
        </div>
      </div>

      <h2 className="section-title">Artikel Terbaru</h2>
      <ul className="posts-list">
        {latest.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </ul>
      <p className="mt-6 font-semibold text-[0.95rem]"><Link href={href('/posts/')}>Lihat semua artikel →</Link></p>

      <h2 className="section-title">Paling Populer</h2>
      <ol className="flex flex-col">
        {popularTop.map((post, i) => (
          <li key={post.slug} className="flex items-center gap-4 py-3 border-b border-border last:border-0">
            <span className="w-8 shrink-0 text-center text-xl font-extrabold tabular-nums text-muted/40">
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <Link href={href(`/posts/${post.slug}/`)} className="group block">
                <h3 className="font-bold leading-snug text-heading transition-colors group-hover:text-accent [overflow-wrap:break-word]">
                  {post.title}
                </h3>
                <p className="mt-1 text-[0.8rem] font-semibold uppercase tracking-[0.07em] text-muted">
                  {formatDate(post.date)} · {readingMin(post.body)} menit baca
                </p>
              </Link>
            </div>
          </li>
        ))}
      </ol>

      <Collapsible title="Jelajahi Tag">
        <div className="flex flex-wrap gap-x-4 gap-y-2 pb-1">
          {allTags.map(([tag, count]) => (
            <Link
              key={tag}
              className="inline-flex items-center gap-1.5 text-[0.9rem] font-medium text-ink transition-colors hover:text-accent"
              href={href(`/tags/${tag}/`)}
            >
              #{tag} <span className="text-[0.78rem] font-semibold text-muted">({count})</span>
            </Link>
          ))}
        </div>
      </Collapsible>
    </section>
  );
}
