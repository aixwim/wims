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
    <html lang="id">
      <body className="bg-white text-gray-900 antialiased">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
