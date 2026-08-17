import type { Metadata } from 'next';
import { siteUrl, href } from '@/lib/url';

export const metadata: Metadata = {
  title: 'Kontak',
  description: 'Hubungi aixwim.',
  alternates: { canonical: siteUrl + href('/contact/') },
};

export default function ContactPage() {
  return (
    <section>
      <h1 className="page-title">Kontak</h1>
      <div className="prose">
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
