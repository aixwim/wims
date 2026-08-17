import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { href, siteUrl } from '@/lib/url';

export const metadata: Metadata = {
  title: {
    default: 'aixwim — Blog',
    template: '%s | aixwim',
  },
  description: 'Blog pribadi aixwim tentang teknologi, pengembangan web, dan catatan harian.',
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: 'website',
    siteName: 'aixwim',
    locale: 'id_ID',
  },
  twitter: {
    card: 'summary_large_image',
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
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
        <main className="container mx-auto px-8 max-w-screen-lg py-5 lg:py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
