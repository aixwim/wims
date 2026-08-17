'use client';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

const ThemeCtx = createContext<{ theme: string; toggle: () => void }>({ theme: 'light', toggle: () => {} });
export const useTheme = () => useContext(ThemeCtx);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('theme');
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initial = stored || preferred;
    setTheme(initial);
    document.documentElement.setAttribute('data-theme', initial);
    const meta = document.getElementById('theme-color');
    if (meta) meta.setAttribute('content', initial === 'dark' ? '#0f0f1a' : '#ffffff');
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.setAttribute('data-theme', next);
    const meta = document.getElementById('theme-color');
    if (meta) meta.setAttribute('content', next === 'dark' ? '#0f0f1a' : '#ffffff');
  };

  if (!mounted) return <>{children}</>;
  return <ThemeCtx.Provider value={{ theme, toggle }}>{children}</ThemeCtx.Provider>;
}
