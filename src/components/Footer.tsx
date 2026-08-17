'use client';
import { useEffect, useState } from 'react';

export default function Footer() {
  const [theme, setTheme] = useState('system');

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    setTheme(stored || 'system');
  }, []);

  const applyTheme = (value: string) => {
    setTheme(value);
    localStorage.setItem('theme', value);
    const root = document.documentElement;
    if (value === 'dark' || (value === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  return (
    <footer className="border-t border-gray-100 dark:border-gray-800 mt-10">
      <div className="container mx-auto px-8 max-w-screen-lg py-5 lg:py-8">
        <div className="text-center text-sm text-gray-500 dark:text-gray-600 space-y-2">
          <p>&copy; {new Date().getFullYear()} aixwim. All rights reserved.</p>
          <p>
            Made with Next.js &middot; Theme by{' '}
            <a href="https://web3templates.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">Web3Templates</a>
          </p>
          <div className="flex items-center justify-center gap-2 pt-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
            <label htmlFor="theme-select" className="sr-only">Pilih tema</label>
            <select
              id="theme-select"
              value={theme}
              onChange={(e) => applyTheme(e.target.value)}
              className="bg-transparent text-sm text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="system">System</option>
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
}
