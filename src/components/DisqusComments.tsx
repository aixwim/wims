'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

declare global {
  interface Window {
    DISQUS?: { reset: (config: Record<string, unknown>) => void };
    disqus_config?: (this: { page: Record<string, unknown> }) => void;
  }
}

export default function DisqusComments() {
  const pathname = usePathname();

  useEffect(() => {
    const pageUrl = `https://aixwim.github.io/wims${pathname}`;

    if (window.DISQUS) {
      window.DISQUS.reset({
        config: {
          page: { url: pageUrl, identifier: pathname },
        },
      });
    } else {
      window.disqus_config = function () {
        this.page.url = pageUrl;
        this.page.identifier = pathname;
      };

      const d = document;
      const s = d.createElement('script');
      s.src = 'https://aixwim.disqus.com/embed.js';
      s.setAttribute('data-timestamp', String(+new Date()));
      (d.head || d.body).appendChild(s);
    }
  }, [pathname]);

  return <div id="disqus_thread" className="mt-12" />;
}
