import Link from 'next/link';
import { href } from '@/lib/url';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 py-8">
      <div className="mx-auto max-w-2xl px-6 flex items-center justify-between text-sm text-gray-500">
        <span>&copy; {new Date().getFullYear()} aixwim</span>
        <span>
          Built with{' '}
          <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 font-medium">Next.js</a>
        </span>
      </div>
    </footer>
  );
}
