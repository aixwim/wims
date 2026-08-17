import type { Metadata } from 'next';
import { siteUrl, href } from '@/lib/url';

export const metadata: Metadata = {
  title: 'Tentang',
  description: 'Tentang aixwim dan blog ini.',
  alternates: { canonical: siteUrl + href('/about/') },
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">Tentang</h1>
      <div className="prose prose-gray max-w-none">
        <p>Haloo! Saya aixwim, seorang pengembang web yang tertarik dengan teknologi, sumber terbuka, dan pembelajaran berkelanjutan.</p>
        <p>Blog ini dibuat sebagai tempat untuk berbagi pengetahuan, catatan, dan pengalaman seputar pengembangan web, terutama yang berkaitan dengan Astro, Tailwind CSS, dan alat-alat modern untuk membangun situs web yang cepat dan ringan.</p>
        <p>Semoga artikel-artikel di sini bermanfaat bagi siapa saja yang sedang belajar atau mengeksplorasi dunia web development.</p>
      </div>
    </section>
  );
}
