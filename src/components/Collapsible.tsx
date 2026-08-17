'use client';
import { useState, type ReactNode } from 'react';

interface Props {
  title: string;
  children: ReactNode;
}

export default function Collapsible({ title, children }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`collapsible${open ? ' open' : ''}`}>
      <button
        type="button"
        className="collapsible-toggle section-title inline-flex items-center gap-2"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {title}
        <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <div className="collapsible-panel">
        {children}
      </div>
    </div>
  );
}
