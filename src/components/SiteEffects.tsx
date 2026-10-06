'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Scroll reveals (with sibling stagger) and the restrained CTA parallax.
 * Progressive enhancement: content is visible without JS; the reveal
 * state only applies once the inline head script adds .js-reveal.
 */
export function SiteEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    (window as unknown as { __olReveal: boolean }).__olReveal = true;
    if (!root.classList.contains('js-reveal') || !('IntersectionObserver' in window)) {
      root.classList.remove('js-reveal');
      return;
    }
    const els = [...document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)')];
    els.forEach((el) => {
      const sibs = [...(el.parentElement?.children ?? [])].filter((c) => c.hasAttribute('data-reveal'));
      const i = sibs.indexOf(el);
      if (i > 0) el.style.setProperty('--d', `${Math.min(i * 0.08, 0.4)}s`);
    });
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  useEffect(() => {
    const media = document.querySelector<HTMLElement>('.final-cta__media');
    if (!media || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !window.matchMedia('(min-width: 900px)').matches) return;
    let raf = 0;
    const move = () => {
      const r = media.parentElement!.getBoundingClientRect();
      const p = Math.max(-1, Math.min(1, (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight));
      media.style.transform = `translate3d(0, ${(p * -6).toFixed(2)}%, 0)`;
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(move);
    };
    move();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  return null;
}

/** Runs before first paint (no flash). Fails safe after 3s if hydration never happens. */
export const revealBootScript = `(function(d){if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver' in window){d.classList.add('js-reveal');setTimeout(function(){if(!window.__olReveal)d.classList.remove('js-reveal')},3000)}})(document.documentElement)`;
