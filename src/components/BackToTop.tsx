'use client';
import { useEffect, useRef } from 'react';

export default function BackToTop() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frame = 0;
    let visible = false;

    const update = () => {
      frame = 0;
      const shouldShow = window.scrollY > 500;
      if (shouldShow === visible) return;
      visible = shouldShow;
      const button = buttonRef.current;
      button?.toggleAttribute('data-visible', visible);
      button?.setAttribute('aria-hidden', String(!visible));
      if (button) button.tabIndex = visible ? 0 : -1;
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="pointer-events-none fixed bottom-6 right-6 z-50 scale-90 p-3 opacity-0 bg-gradient-to-br from-brand to-brand2 text-white rounded-full shadow-lg shadow-brand/30 transition-[opacity,transform,box-shadow] data-visible:pointer-events-auto data-visible:scale-100 data-visible:opacity-100 hover:shadow-xl hover:scale-105"
      aria-label="Kembali ke atas"
      aria-hidden="true"
      tabIndex={-1}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}
