import Link from 'next/link';
import { href } from '@/lib/url';

export default function NotFound() {
  return (
    <section className="max-w-screen-md mx-auto py-24 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">404</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">Page not found.</p>
      <Link href={href('/')} className="rounded-md border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
        &larr; Back to Home
      </Link>
    </section>
  );
}
