'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function DisqusComments({ slug }: { slug: string }) {
  const pathname = usePathname();
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;

    const pageUrl = `https://aixwim.github.io/wims/posts/${slug}/`;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).disqus_config = function () {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (this as any).page = { url: pageUrl, identifier: slug };
    };

    const s = document.createElement('script');
    s.src = 'https://aixwim.disqus.com/embed.js';
    s.setAttribute('data-timestamp', String(+new Date()));
    s.async = true;
    document.head.appendChild(s);
  }, [slug, pathname]);

  return (
    <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Komentar</h2>
      <div id="disqus_thread" />
      <noscript>
        Please enable JavaScript to view the{' '}
        <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a>
      </noscript>
    </div>
  );
}