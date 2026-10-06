'use client';

import { useEffect, useRef, useState } from 'react';
import { Stars } from './Icon';

/** Scroll speed when the strip doesn't fit: readable, but never makes people wait. */
const PX_PER_SECOND = 50;
/** Minimum space either side before the static strip counts as fitting. */
const EDGE = 24;

function Items({ items }: { items: readonly string[] }) {
  return items.map((item, i) => (
    <li key={item}>
      {i === 0 && <Stars />}
      {item}
    </li>
  ));
}

/**
 * USP strip under the hero. Always a single line.
 * - Fits: static and centred.
 * - Doesn't fit: a seamless marquee (the list rendered twice, second copy
 *   hidden from assistive tech). It pauses on hover, keyboard focus and tap
 *   (WCAG 2.2.2).
 * - Reduced motion: no animation; the line scrolls sideways by swipe instead.
 */
export function TrustStrip({ items, label }: { items: readonly string[]; label: string }) {
  const box = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const [marquee, setMarquee] = useState(false);
  const [duration, setDuration] = useState(20);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = box.current;
    const ul = list.current;
    if (!el || !ul) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const measure = () => {
      // The first list holds one full copy of the items. It needs breathing
      // room at both edges to count as fitting. In marquee mode the copy is
      // slightly wider (leading dot), which gives a little hysteresis, so the
      // strip can't flip back and forth at a borderline width.
      const overflow = ul.scrollWidth + EDGE * 2 > el.clientWidth;
      setMarquee(overflow && !reduce.matches);
      setDuration(Math.max(8, ul.scrollWidth / PX_PER_SECOND));
    };
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    ro.observe(ul);
    reduce.addEventListener('change', measure);
    measure();
    return () => {
      ro.disconnect();
      reduce.removeEventListener('change', measure);
    };
  }, []);

  const className = ['trust', marquee && 'trust--marquee', paused && 'is-paused'].filter(Boolean).join(' ');

  return (
    <div
      ref={box}
      className={className}
      role="region"
      aria-label={label}
      tabIndex={0}
      style={{ '--trust-dur': `${duration}s` } as React.CSSProperties}
      onClick={() => marquee && setPaused((p) => !p)}
    >
      <div className="trust__rail">
        <ul ref={list} className="trust__list">
          <Items items={items} />
        </ul>
        {marquee && (
          <ul className="trust__list" aria-hidden="true">
            <Items items={items} />
          </ul>
        )}
      </div>
    </div>
  );
}
