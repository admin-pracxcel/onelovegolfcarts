'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Props = {
  label: string;
  items: { id: string; label: string }[];
  cta?: { href: string; label: string };
};

/**
 * Sticky in-page navigation for long pages. Highlights the section in view
 * (aria-current) and slides down under the site header whenever the header
 * is showing. Works as plain anchor links without JS.
 */
export function SectionNav({ label, items, cta }: Props) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const visible = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.set(e.target.id, e.intersectionRatio) : visible.delete(e.target.id)));
        // Topmost visible section wins, so the highlight follows reading order.
        const first = sections.find((s) => visible.has(s.id));
        setActive(first ? first.id : null);
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.01] },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav className="section-nav" aria-label={label}>
      <div className="section-nav__inner">
        <ul>
          {items.map((i) => (
            <li key={i.id}>
              <a href={`#${i.id}`} aria-current={active === i.id ? 'location' : undefined}>
                {i.label}
              </a>
            </li>
          ))}
        </ul>
        {cta && (
          <Link className="btn btn--primary btn--sm section-nav__cta" href={cta.href} prefetch={false}>
            {cta.label}
          </Link>
        )}
      </div>
    </nav>
  );
}
