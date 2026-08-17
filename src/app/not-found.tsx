import Link from 'next/link';
import { href } from '@/lib/url';

export default function NotFound() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">404</h1>
      <p className="text-gray-600 mb-8">Halaman yang kamu cari tidak ditemukan.</p>
      <Link href={href('/')} className="rounded-full bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-gray-700 transition-colors">
        Kembali ke Beranda
      </Link>
    </section>
  );
}
