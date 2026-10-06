'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { business, urls } from '@/lib/business';
import { promo } from '@/lib/promo';
import { Icon } from './Icon';

const STORAGE_KEY = `ol-promo-seen:${promo.id}`;

function alreadySeen() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false; // Storage blocked (private mode etc.): just show it.
  }
}

function markSeen() {
  try {
    sessionStorage.setItem(STORAGE_KEY, '1');
  } catch {
    /* ignore */
  }
}

/**
 * Once-per-visit promotion popup (see lib/promo.ts).
 * Rendered client-side only, so the promo prices never enter the page HTML
 * that search engines read. Uses native <dialog> for focus containment,
 * Escape to close and an inert background.
 */
export function PromoModal() {
  const [mounted, setMounted] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!promo.enabled || Date.now() >= Date.parse(promo.endsAt) || alreadySeen()) return;
    // Mark on first page view, not on close: navigating away without closing
    // still counts as having seen it this visit.
    markSeen();
    const t = window.setTimeout(() => {
      // Don't stack on top of the open mobile menu.
      if (!document.body.classList.contains('menu-open')) setMounted(true);
    }, promo.delayMs);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const d = dialog.current;
    if (mounted && d && !d.open) d.showModal();
  }, [mounted]);

  if (!mounted) return null;

  const close = () => dialog.current?.close();

  return (
    <dialog
      ref={dialog}
      className="promo"
      aria-labelledby="promo-title"
      aria-describedby="promo-body"
      onClose={() => window.setTimeout(() => setMounted(false), 400)}
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <div className="promo__card">
        <button type="button" className="promo__close" onClick={close} autoFocus>
          <Icon name="plus" />
          <span className="screen-reader-text">Close</span>
        </button>

        <div className="promo__top">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="promo__logo" src="/img/one-love-logo.webp" width={300} height={110} alt={business.name} />
          <p className="promo__badge">{promo.badge}</p>
        </div>

        <div className="promo__body">
          <h2 id="promo-title" className="promo__title">
            {promo.title}
          </h2>
          <p id="promo-body" className="promo__text">
            {promo.body}
          </p>

          <ul className="promo__prices">
            {promo.prices.map((p) => (
              <li key={p.per}>
                <s>
                  <span className="screen-reader-text">Was </span>${p.was}
                </s>
                <strong>
                  <span className="screen-reader-text">now </span>${p.now}
                </strong>
                <span className="promo__per">{p.per}</span>
              </li>
            ))}
          </ul>

          <Link className="btn btn--primary btn--lg promo__cta" href={urls.book} prefetch={false} onClick={close}>
            {promo.cta} <Icon name="arrow" />
          </Link>
          <p className="promo__terms">{promo.terms}</p>
        </div>
      </div>
    </dialog>
  );
}
