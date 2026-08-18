'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { href } from '@/lib/url';
import Logo from './Logo';

const navLinks = [
  { href: href('/'), label: 'Home' },
  { href: href('/posts/'), label: 'Archive' },
  { href: href('/tags/'), label: 'Tags' },
  { href: href('/about/'), label: 'About' },
  { href: href('/contact/'), label: 'Contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    const onScroll = () => {
      const el = headerRef.current;
      if (!el) return;
      const scrolled = window.scrollY > 10;
      el.classList.toggle('is-scrolled', scrolled);
    };
    document.addEventListener('keydown', onKey);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setMobileOpen(false);
  }

  const toggleTheme = () => {
    const root = document.documentElement;
    const isDark = root.classList.contains('dark');
    const next = !isDark;
    if (next) root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('theme', next ? 'dark' : 'light');
    document.querySelector('meta[name="color-scheme"]')?.setAttribute('content', next ? 'dark' : 'light');
    document.dispatchEvent(new CustomEvent('themechange', { detail: { dark: next } }));
  };

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b transition-all duration-300 border-transparent bg-white/60 backdrop-blur-sm dark:bg-gray-950/60 is-scrolled:border-gray-200 is-scrolled:bg-white/85 is-scrolled:backdrop-blur-md dark:is-scrolled:border-gray-800 dark:is-scrolled:bg-gray-950/85"
    >
      <div className="mx-auto max-w-screen-lg px-5 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Logo />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium" aria-label="Navigasi utama">
            {navLinks.map((link) => {
              const active = link.href === href('/') ? pathname === link.href : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={false}
                  aria-current={active ? 'page' : undefined}
                  className={`rounded-lg px-3 py-2 transition-colors ${
                    active
                      ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1.5">
            <Link
              href={href('/search/')}
              prefetch={false}
              className="hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white transition-colors"
              aria-label="Cari artikel"
              title="Search"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
                <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" />
              </svg>
            </Link>

            <button
              onClick={toggleTheme}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white transition-colors"
              aria-label="Ubah tema terang/gelap"
              title="Ubah tema"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="hidden dark:block h-5 w-5" aria-hidden="true">
                <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="block dark:hidden h-5 w-5" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            </button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              {mobileOpen ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav id="mobile-nav" className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white/95 backdrop-blur-md dark:bg-gray-950/95">
          <div className="mx-auto max-w-screen-lg px-5 py-3 space-y-1">
            <Link
              href={href('/search/')}
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              onClick={() => setMobileOpen(false)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5 text-gray-400" aria-hidden="true">
                <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" />
              </svg>
              Search
            </Link>
            {navLinks.map((link) => {
              const active = link.href === href('/') ? pathname === link.href : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
                    active
                      ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}