import type { Metadata } from 'next';
import { siteUrl, href } from '@/lib/url';

export const metadata: Metadata = {
  title: 'Tentang',
  description: 'Tentang aixwim dan blog ini.',
  alternates: { canonical: siteUrl + href('/about/') },
};

export default function AboutPage() {
  return (
    <section>
      <h1 className="page-title">Tentang</h1>
      <div className="prose">
        <p>Halo! Saya aixwim, seorang pengembang web yang tertarik dengan teknologi, sumber terbuka, dan pembelajaran berkelanjutan.</p>
        <p>Blog ini dibuat sebagai tempat untuk berbagi pengetahuan, catatan, dan pengalaman seputar pengembangan web, terutama yang berkaitan dengan Astro, Tailwind CSS, dan alat-alat modern untuk membangun situs web yang cepat dan ringan.</p>
        <p>Semoga artikel-artikel di sini bermanfaat bagi siapa saja yang sedang belajar atau mengeksplorasi dunia web development.</p>
      </div>
    </section>
  );
}
