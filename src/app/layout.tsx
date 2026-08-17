import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { href, siteUrl, basePath, absoluteUrl } from '@/lib/url';

export const metadata: Metadata = {
  title: {
    default: 'aixwim — Blog',
    template: '%s | aixwim',
  },
  description: 'Blog pribadi aixwim tentang teknologi, pengembangan web, dan catatan harian.',
  metadataBase: new URL(siteUrl + basePath),
  openGraph: {
    type: 'website',
    siteName: 'aixwim',
    locale: 'id_ID',
    images: [
      {
        url: absoluteUrl('/og.png'),
        width: 1200,
        height: 630,
        alt: 'aixwim Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@aixwim',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    types: {
      'application/rss+xml': [{ title: 'aixwim', url: href('/rss.xml') }],
    },
  },
  icons: {
    icon: basePath + '/favicon.svg',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'aixwim',
  url: absoluteUrl('/'),
  description: 'Blog pribadi aixwim tentang teknologi, pengembangan web, dan catatan harian.',
  publisher: {
    '@type': 'Person',
    name: 'aixwim',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: absoluteUrl('/search/') + '?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="manifest" href={basePath + '/manifest.json'} />
        <link rel="dns-prefetch" href="https://aixwim.disqus.com" />
        <link rel="preconnect" href="https://aixwim.disqus.com" crossOrigin="anonymous" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            var t = localStorage.getItem('theme');
            if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
          })();
        `}} />
      </head>
      <body className="bg-white dark:bg-black text-gray-800 dark:text-gray-400 antialiased">
        <Header />
        <main id="main-content" className="mx-auto max-w-screen-lg px-5 py-5 lg:px-8 lg:py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
