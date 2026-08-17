'use client';
import Link from 'next/link';
import { useState } from 'react';
import { href } from '@/lib/url';

const navLinks = [
  { href: href('/'), label: 'Home' },
  { href: href('/about/'), label: 'About' },
  { href: href('/contact/'), label: 'Contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="border-b border-gray-100 dark:border-gray-800">
      <div className="container mx-auto px-8 max-w-screen-lg">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Left nav - desktop */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-400">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-blue-500 transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Center logo */}
          <Link href={href('/')} className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            aixwim
          </Link>

          {/* Right nav - desktop */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-400">
            <Link href={href('/posts/')} className="hover:text-blue-500 transition-colors">Archive</Link>
            <Link href={href('/tags/')} className="hover:text-blue-500 transition-colors">Tags</Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-gray-600 dark:text-gray-400"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <nav className="md:hidden pb-4 space-y-3 text-sm font-medium text-gray-600 dark:text-gray-400">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="block hover:text-blue-500" onClick={() => setMobileOpen(false)}>
                {link.label}
              </Link>
            ))}
            <Link href={href('/posts/')} className="block hover:text-blue-500" onClick={() => setMobileOpen(false)}>Archive</Link>
            <Link href={href('/tags/')} className="block hover:text-blue-500" onClick={() => setMobileOpen(false)}>Tags</Link>
          </nav>
        )}
      </div>
    </header>
  );
}
