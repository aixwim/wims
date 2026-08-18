import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { href, siteUrl, basePath, absoluteUrl } from '@/lib/url';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#020617',
  colorScheme: 'dark',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl + basePath),
  title: {
    default: 'aixwim — Blog Teknologi & Web Development',
    template: '%s | aixwim',
  },
  description: 'Blog pribadi aixwim tentang teknologi, pengembangan web, SEO, dan catatan harian.',
  keywords: ['blog', 'teknologi', 'web development', 'nextjs', 'seo', 'aixwim'],
  authors: [{ name: 'aixwim', url: absoluteUrl('/about/') }],
  creator: 'aixwim',
  publisher: 'aixwim',
  formatDetection: { telephone: false },
  openGraph: {
    type: 'website',
    siteName: 'aixwim',
    locale: 'id_ID',
    url: absoluteUrl('/'),
    title: 'aixwim — Blog Teknologi & Web Development',
    description: 'Blog pribadi aixwim tentang teknologi, pengembangan web, SEO, dan catatan harian.',
    images: [
      {
        url: absoluteUrl('/og.png'),
        width: 1200,
        height: 630,
        alt: 'aixwim — Blog Teknologi & Web Development',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'aixwim — Blog Teknologi & Web Development',
    description: 'Blog pribadi aixwim tentang teknologi, pengembangan web, SEO, dan catatan harian.',
    images: [absoluteUrl('/og.png')],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  alternates: {
    types: {
      'application/rss+xml': [{ title: 'aixwim', url: href('/rss.xml') }],
    },
  },
  icons: {
    icon: [
      { url: basePath + '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: basePath + '/favicon.svg', sizes: '180x180' }],
  },
  manifest: basePath + '/manifest.json',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'aixwim',
  alternateName: 'aixwim Blog',
  url: absoluteUrl('/'),
  description: 'Blog pribadi aixwim tentang teknologi, pengembangan web, SEO, dan catatan harian.',
  inLanguage: 'id-ID',
  publisher: {
    '@type': 'Person',
    name: 'aixwim',
    url: absoluteUrl('/about/'),
    email: 'mailto:hello@aixwim.dev',
    sameAs: ['https://github.com/aixwim'],
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
    <html lang="id" className="dark" suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="min-h-screen bg-gray-950 text-gray-300 antialiased flex flex-col">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] bg-indigo-600 text-white px-4 py-2 rounded-md">
          Lewati ke konten
        </a>
        <Header />
        <main id="main-content" className="flex-1 w-full mx-auto max-w-screen-lg px-5 py-6 lg:px-8 lg:py-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}