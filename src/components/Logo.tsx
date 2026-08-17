import Link from 'next/link';
import { href } from '@/lib/url';

export default function Logo() {
  return (
    <Link
      href={href('/')}
      prefetch={false}
      className="group flex items-center gap-2.5"
      aria-label="aixwim — Home"
    >
      <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-500 shadow-md shadow-indigo-500/30 transition-transform duration-300 group-hover:scale-105">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 2l2.4 7.2H22l-6.2 4.5 2.4 7.3L12 16.5 5.8 21l2.4-7.3L2 9.2h7.6z" />
        </svg>
      </span>
      <span className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
        aix<span className="text-gradient">wim</span>
      </span>
    </Link>
  );
}