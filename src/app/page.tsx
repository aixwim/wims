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

const categoryColors: Record<string, string> = {
  'Perkenalan': 'text-purple-600 dark:text-purple-400',
  'Tutorial': 'text-blue-600 dark:text-blue-400',
  'Tips': 'text-green-600 dark:text-green-400',
  'SEO': 'text-orange-600 dark:text-orange-400',
  'default': 'text-blue-600 dark:text-blue-400',
};

export default function HomePage() {
  const posts = getAllPosts();
  const featured = posts.slice(0, 2);
  const rest = posts.slice(2);

  return (
    <section>
      {/* Featured posts - 2 column */}
      <div className="grid gap-10 md:grid-cols-2 lg:gap-10 mb-10">
        {featured.map((post) => (
          <article key={post.slug} className="group cursor-pointer">
            <Link href={href(`/posts/${post.slug}/`)}>
              <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden mb-4">
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700" />
              </div>
              <p className={`text-xs font-medium tracking-wider uppercase mb-2 ${categoryColors[post.category || ''] || categoryColors.default}`}>
                {post.category || 'Article'}
              </p>
              <h2 className="text-lg font-semibold leading-snug tracking-tight text-gray-900 dark:text-white group-hover:bg-gradient-to-r group-hover:from-green-200 group-hover:to-green-100 dark:group-hover:from-purple-800 dark:group-hover:to-purple-900 group-hover:bg-[length:100%_25%] group-hover:bg-no-repeat group-hover:bg-left-bottom transition-[background-size] duration-500">
                {post.title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center gap-2 mt-4 text-sm text-gray-500 dark:text-gray-400">
                <span>aixwim</span>
                <span className="text-gray-300 dark:text-gray-600">&middot;</span>
                <span>{formatDate(post.date)}</span>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {/* Grid posts - 2/3 column */}
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {rest.map((post) => (
          <article key={post.slug} className="group cursor-pointer">
            <Link href={href(`/posts/${post.slug}/`)}>
              <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden mb-4">
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 group-hover:scale-105 transition-all duration-300" />
              </div>
              <p className={`text-xs font-medium tracking-wider uppercase mb-2 ${categoryColors[post.category || ''] || categoryColors.default}`}>
                {post.category || 'Article'}
              </p>
              <h2 className="text-lg font-semibold leading-snug tracking-tight text-gray-900 dark:text-white group-hover:bg-gradient-to-r group-hover:from-green-200 group-hover:to-green-100 dark:group-hover:from-purple-800 dark:group-hover:to-purple-900 group-hover:bg-[length:100%_25%] group-hover:bg-no-repeat group-hover:bg-left-bottom transition-[background-size] duration-500">
                {post.title}
              </h2>
              <div className="flex items-center gap-2 mt-4 text-sm text-gray-500 dark:text-gray-400">
                <span>aixwim</span>
                <span className="text-gray-300 dark:text-gray-600">&middot;</span>
                <span>{formatDate(post.date)}</span>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {/* View all button */}
      <div className="mt-10 flex justify-center">
        <Link href={href('/posts/')} className="rounded-md border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          View all Posts &rarr;
        </Link>
      </div>
    </section>
  );
}
