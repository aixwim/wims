'use client';
import { useEffect, useRef } from 'react';

const GISCUS_BASE = 'https://giscus.app';
const SITE_BASE = 'https://aixwim.github.io/wims';

export default function GiscusComments() {
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    const theme = isDark ? `${SITE_BASE}/giscus-dark.css` : `${SITE_BASE}/giscus-light.css`;

    const script = document.createElement('script');
    script.src = `${GISCUS_BASE}/client.js`;
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.setAttribute('data-repo', 'aixwim/wims');
    script.setAttribute('data-repo-id', 'R_kgDOT5wE7A');
    script.setAttribute('data-category', 'General');
    script.setAttribute('data-category-id', 'DIC_kwDOT5wE7M4DDe8B');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', theme);
    script.setAttribute('data-lang', 'id');
    script.setAttribute('data-loading', 'lazy');
    scriptRef.current = script;
    document.head.appendChild(script);

    const sendTheme = () => {
      const next = document.documentElement.classList.contains('dark') ? `${SITE_BASE}/giscus-dark.css` : `${SITE_BASE}/giscus-light.css`;
      script.setAttribute('data-theme', next);
      const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
      if (iframe) {
        iframe.contentWindow?.postMessage(
          { giscus: { setConfig: { theme: next } } },
          GISCUS_BASE
        );
      }
    };

    const onThemeChange = () => sendTheme();
    document.addEventListener('themechange', onThemeChange);

    return () => {
      document.removeEventListener('themechange', onThemeChange);
      script.remove();
    };
  }, []);

  return (
    <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Komentar</h2>
      <div className="giscus" />
    </div>
  );
}