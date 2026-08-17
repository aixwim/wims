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
    images: [
      {
        url: '/wims/og.png',
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
    icon: '/wims/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        <link rel="manifest" href={href('/manifest.json')} />
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
        <main id="main-content" className="container mx-auto px-8 max-w-screen-lg py-5 lg:py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
