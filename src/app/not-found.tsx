import Link from 'next/link';
import { href } from '@/lib/url';

export default function NotFound() {
  return (
    <section className="notfound">
      <h1 className="page-title">404</h1>
      <p className="text-muted mb-6">Halaman yang kamu cari tidak ditemukan.</p>
      <Link className="hero-btn primary" href={href('/')}>Kembali ke Beranda</Link>
    </section>
  );
}
