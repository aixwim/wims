import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
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
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" id="theme-color" content="#ffffff" />
        <link rel="icon" type="image/svg+xml" href={href('/favicon.svg')} />
        <link rel="manifest" href={href('/manifest.json')} />
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            var t = localStorage.getItem('theme');
            if (t === 'light' || t === 'dark') {
              document.documentElement.setAttribute('data-theme', t);
            }
            var dark = t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches);
            var m = document.getElementById('theme-color');
            if (m) m.setAttribute('content', dark ? '#0f0f1a' : '#ffffff');
          })();
        `}} />
      </head>
      <body>
        <ThemeProvider>
          <a href="#main-content" className="skip-link">Langsung ke konten</a>
          <Header />
          <main id="main-content" className="container pt-[clamp(1.5rem,_5vw,_3.5rem)] pb-16">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
