'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Icon } from './Icon';

export type LightboxItem = { avif: string; webp: string; jpg: string; src: string; alt: string; caption: string; width: number; height: number };

/**
 * Full-size viewer for the gallery. Progressive enhancement: every thumbnail
 * is a plain link to the full-size JPEG ([data-lightbox="i"]); with JS, clicks
 * open this native <dialog> instead (focus contained, Escape closes, focus
 * returns to the thumbnail). Arrow keys and swipe move between photos.
 */
export function Lightbox({ items }: { items: LightboxItem[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const touchX = useRef<number | null>(null);
  const [index, setIndex] = useState<number | null>(null);

  const go = useCallback((delta: number) => setIndex((i) => (i === null ? i : (i + delta + items.length) % items.length)), [items.length]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element).closest<HTMLElement>('[data-lightbox]');
      if (!link) return;
      e.preventDefault();
      opener.current = link;
      setIndex(Number(link.dataset.lightbox));
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    const d = dialog.current;
    if (index !== null && d && !d.open) d.showModal();
  }, [index]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [index, go]);

  const item = index === null ? null : items[index];

  return (
    <dialog
      ref={dialog}
      className="lightbox"
      aria-label="Photo viewer"
      onClose={() => {
        setIndex(null);
        opener.current?.focus();
      }}
      onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      {item && (
        <div className="lightbox__inner">
          <button type="button" className="lightbox__close" onClick={() => dialog.current?.close()} autoFocus>
            <Icon name="plus" />
            <span className="screen-reader-text">Close</span>
          </button>
          <figure className="lightbox__figure">
            <picture key={item.src}>
              <source type="image/avif" srcSet={item.avif} sizes="100vw" />
              <source type="image/webp" srcSet={item.webp} sizes="100vw" />
              <img src={item.src} srcSet={item.jpg} sizes="100vw" width={item.width} height={item.height} alt={item.alt} decoding="async" />
            </picture>
            <figcaption>
              <span>{item.caption}</span>
              <span className="lightbox__count" aria-live="polite">
                {index! + 1} / {items.length}
              </span>
            </figcaption>
          </figure>
          <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={() => go(-1)}>
            <Icon name="arrow" />
            <span className="screen-reader-text">Previous photo</span>
          </button>
          <button type="button" className="lightbox__nav lightbox__nav--next" onClick={() => go(1)}>
            <Icon name="arrow" />
            <span className="screen-reader-text">Next photo</span>
          </button>
        </div>
      )}
    </dialog>
  );
}
