import type { Metadata } from 'next';
import { siteUrl, href, canonicalUrl, absoluteUrl } from '@/lib/url';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Hubungi aixwim.',
  alternates: { canonical: canonicalUrl('/contact/') },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact aixwim',
  url: absoluteUrl('/contact/'),
};

export default function ContactPage() {
  return (
    <section className="max-w-screen-md mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">Contact</h1>
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <p>Ada pertanyaan, saran, atau sekadar ingin menyapa? Jangan ragu untuk menghubungi saya melalui:</p>
        <ul>
          <li><strong>Email:</strong> <a href="mailto:hello@aixwim.dev">hello@aixwim.dev</a></li>
          <li><strong>GitHub:</strong> <a href="https://github.com/aixwim" target="_blank" rel="noopener noreferrer">github.com/aixwim</a></li>
        </ul>
        <p>Saya akan berusaha merespons secepat mungkin.</p>
      </div>
    </section>
  );
}
