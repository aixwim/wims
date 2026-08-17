import Link from 'next/link';
import { href } from '@/lib/url';

export default function NotFound() {
  return (
    <section className="max-w-screen-md mx-auto py-24 text-center">
      <h1 className="text-6xl font-bold tracking-tight text-gray-200 dark:text-gray-800 mb-4">404</h1>
      <p className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Halaman tidak ditemukan</p>
      <p className="text-gray-500 dark:text-gray-400 mb-8">URL yang kamu tuhi tidak ada atau sudah dipindahkan.</p>
      <div className="flex items-center justify-center gap-4">
        <Link href={href('/')} className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
          &larr; Back to Home
        </Link>
        <Link href={href('/posts/')} className="rounded-md border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          Archive
        </Link>
      </div>
    </section>
  );
}
