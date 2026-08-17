import type { Metadata } from 'next';
import { siteUrl, href } from '@/lib/url';

export const metadata: Metadata = {
  title: 'About',
  description: 'Tentang aixwim dan blog ini.',
  alternates: { canonical: siteUrl + href('/about/') },
};

export default function AboutPage() {
  return (
    <section className="max-w-screen-md mx-auto">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">About</h1>
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <p>Haloo! Saya aixwim, seorang pengembang web yang tertarik dengan teknologi, sumber terbuka, dan pembelajaran berkelanjutan.</p>
        <p>Blog ini dibuat sebagai tempat untuk berbagi pengetahuan, catatan, dan pengalaman seputar pengembangan web, terutama yang berkaitan dengan framework modern untuk membangun situs web yang cepat dan ringan.</p>
        <p>Semoga artikel-artikel di sini bermanfaat bagi siapa saja yang sedang belajar atau mengeksplorasi dunia web development.</p>
      </div>
    </section>
  );
}
