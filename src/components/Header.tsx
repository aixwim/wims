import Link from 'next/link';
import { href } from '@/lib/url';

export default function Header() {
  return (
    <header className="border-b border-gray-200">
      <div className="mx-auto max-w-2xl px-6 py-6 flex items-center justify-between">
        <Link href={href('/')} className="text-xl font-bold tracking-tight text-gray-900 hover:text-gray-600">
          aixwim
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href={href('/posts/')} className="hover:text-gray-900">Artikel</Link>
          <Link href={href('/about/')} className="hover:text-gray-900">Tentang</Link>
          <Link href={href('/contact/')} className="hover:text-gray-900">Kontak</Link>
        </nav>
      </div>
    </header>
  );
}
