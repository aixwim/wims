import Link from 'next/link';
import { href } from '@/lib/url';

const navItems = [
  { href: href('/'), label: 'Beranda' },
  { href: href('/posts/'), label: 'Artikel' },
  { href: href('/about/'), label: 'Tentang' },
  { href: href('/contact/'), label: 'Kontak' },
];

export default function Footer() {
  return (
    <footer className="site-footer text-muted">
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-6">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-heading">aixwim</span>
            <span className="text-[0.85rem]">Blog pribadi tentang teknologi & pengembangan web</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-[0.85rem]">
            {navItems.map((item) => (
              <Link key={item.href} className="transition-colors hover:text-accent" href={item.href}>{item.label}</Link>
            ))}
            <a className="transition-colors hover:text-accent" href="https://github.com/aixwim" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="transition-colors hover:text-accent" href={href('/rss.xml')}>RSS</a>
          </div>
        </div>
        <div className="border-t border-border py-3 text-[0.8rem] flex flex-wrap items-center justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} aixwim</span>
          <span>
            Dibangun dengan{' '}
            <a className="font-semibold text-heading transition-colors hover:text-accent" href="https://nextjs.org" target="_blank" rel="noopener noreferrer">Next.js</a>
            {' & '}
            <a className="font-semibold text-heading transition-colors hover:text-accent" href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer">Tailwind CSS</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
