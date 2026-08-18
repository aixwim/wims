'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function DisqusComments({ slug }: { slug: string }) {
  const pathname = usePathname();
  const loaded = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loaded.current) return;

    const container = containerRef.current;
    if (!container) return;

    const loadDisqus = () => {
      if (loaded.current) return;
      loaded.current = true;

      const preconnect = document.createElement('link');
      preconnect.rel = 'preconnect';
      preconnect.href = 'https://aixwim.disqus.com';
      preconnect.crossOrigin = 'anonymous';
      document.head.appendChild(preconnect);
      const dns = document.createElement('link');
      dns.rel = 'dns-prefetch';
      dns.href = 'https://aixwim.disqus.com';
      document.head.appendChild(dns);

      const pageUrl = `https://aixwim.github.io/wims/posts/${slug}/`;

      (window as { disqus_config?: unknown }).disqus_config = function () {
        (this as { page?: { url: string; identifier: string } }).page = { url: pageUrl, identifier: slug };
      };

      const s = document.createElement('script');
      s.src = 'https://aixwim.disqus.com/embed.js';
      s.setAttribute('data-timestamp', String(+new Date()));
      s.async = true;
      document.head.appendChild(s);
    };

    const onThemeChange = () => {
      const disqus = (window as { DISQUS?: { reset: (opts: { reload: boolean }) => void } }).DISQUS;
      if (disqus) {
        disqus.reset({ reload: true });
      }
    };
    document.addEventListener('themechange', onThemeChange);

    if (typeof IntersectionObserver === 'undefined') {
      loadDisqus();
      return () => document.removeEventListener('themechange', onThemeChange);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          observer.disconnect();
          loadDisqus();
        }
      },
      { rootMargin: '600px' }
    );
    observer.observe(container);
    return () => {
      observer.disconnect();
      document.removeEventListener('themechange', onThemeChange);
    };
  }, [slug, pathname]);

  return (
    <div ref={containerRef} className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Komentar</h2>
      <div id="disqus_thread" />
      <noscript>
        Please enable JavaScript to view the{' '}
        <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a>
      </noscript>
    </div>
  );
}