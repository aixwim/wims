import Link from 'next/link';
import { getAllPosts, formatDate, readingMin } from '@/lib/posts';
import { href, siteUrl } from '@/lib/url';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'aixwim — Blog',
  description: 'Blog pribadi aixwim tentang teknologi, pengembangan web, dan catatan harian.',
  alternates: { canonical: siteUrl + href('/') },
  openGraph: { url: siteUrl + href('/') },
};

export default function HomePage() {
  const posts = getAllPosts();
  const latest = posts.slice(0, 5);

  return (
    <section className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
        Halo, saya aixwim
      </h1>
      <p className="text-lg text-gray-600 mb-8 leading-relaxed">
        Saya menulis tentang teknologi, pengembangan web, dan hal-hal yang saya pelajari sepanjang perjalanan.
      </p>

      <div className="flex gap-4 mb-16">
        <Link href={href('/posts/')} className="rounded-full bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-gray-700 transition-colors">
          Lihat Artikel
        </Link>
        <Link href={href('/about/')} className="rounded-full border border-gray-300 px-6 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
          Tentang Saya
        </Link>
      </div>

      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">Artikel Terbaru</h2>
      <ul className="space-y-8">
        {latest.map((post) => (
          <li key={post.slug}>
            <Link href={href(`/posts/${post.slug}/`)} className="group block">
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {formatDate(post.date)} &middot; {readingMin(post.body)} min read
              </p>
              {post.excerpt && (
                <p className="text-gray-600 mt-2 text-sm leading-relaxed">{post.excerpt}</p>
              )}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <Link href={href('/posts/')} className="text-sm font-semibold text-blue-600 hover:text-blue-500">
          Lihat semua artikel &rarr;
        </Link>
      </div>
    </section>
  );
}
