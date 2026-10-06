'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { business, urls, whatsappUrl } from '@/lib/business';
import { primaryNav } from '@/lib/nav';
import { Icon } from './Icon';

const MENU_ANIM_MS = 600;

export function Header() {
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [openSub, setOpenSub] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [panelHidden, setPanelHidden] = useState(true);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const menuOpenRef = useRef(false);

  /* Solid after leaving the top; hide on scroll down, return on scroll up. */
  useEffect(() => {
    const root = document.documentElement;
    const hasHero = !!document.querySelector('.hero');
    const topbar = document.querySelector<HTMLElement>('[data-topbar]');
    let barH = topbar?.offsetHeight ?? 0;
    let lastY = window.scrollY;
    let ticking = false;
    /* Keep the header pinned directly under the announcement bar until the
       bar has scrolled out of view. */
    const pin = (y: number) => root.style.setProperty('--hdr-offset', `${Math.max(0, barH - y)}px`);
    const update = () => {
      const y = window.scrollY;
      pin(y);
      if (!menuOpenRef.current) {
        setSolid(!hasHero || y > barH + 40);
        if (y > lastY + 4 && y > 480) setHidden(true);
        else if (y < lastY - 4 || y < 480) setHidden(false);
      }
      lastY = y;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };
    const measure = () => {
      barH = topbar?.offsetHeight ?? 0;
      root.style.setProperty('--topbar-h', `${barH}px`);
      pin(window.scrollY);
    };
    const ro = topbar ? new ResizeObserver(measure) : null;
    if (topbar) ro?.observe(topbar);
    measure();
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      ro?.disconnect();
    };
  }, []);

  /* Desktop dropdowns: close on outside click / Escape. */
  useEffect(() => {
    if (openSub === null) return;
    const onClick = (e: MouseEvent) => {
      if (!(e.target as Element).closest('.nav__item')) setOpenSub(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      const btn = document.querySelector<HTMLButtonElement>(`#sub-${openSub}`)?.previousElementSibling as HTMLButtonElement | null;
      setOpenSub(null);
      btn?.focus();
    };
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [openSub]);

  /* Mobile menu: modal panel with focus containment. */
  const setMenu = useCallback((open: boolean) => {
    menuOpenRef.current = open;
    setMenuOpen(open);
    document.body.classList.toggle('menu-open', open);
    if (open) {
      setPanelHidden(false);
      setHidden(false);
      requestAnimationFrame(() => panel.current?.querySelector<HTMLElement>('a, summary')?.focus({ preventScroll: true }));
    } else {
      setTimeout(() => {
        if (!menuOpenRef.current) setPanelHidden(true);
      }, MENU_ANIM_MS);
      menuBtn.current?.focus({ preventScroll: true });
    }
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return setMenu(false);
      if (e.key !== 'Tab' || !panel.current || !menuBtn.current) return;
      const items = [menuBtn.current, ...panel.current.querySelectorAll<HTMLElement>('a, summary, button')].filter(
        (el) => el.offsetParent !== null,
      );
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const mq = window.matchMedia('(min-width: 1100px)');
    const onMq = (m: MediaQueryListEvent) => m.matches && setMenu(false);
    document.addEventListener('keydown', onKey);
    mq.addEventListener('change', onMq);
    return () => {
      document.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onMq);
    };
  }, [menuOpen, setMenu]);

  useEffect(() => () => document.body.classList.remove('menu-open'), []);

  const headerClass = ['site-header', solid && 'is-solid', hidden && !menuOpen && 'is-hidden'].filter(Boolean).join(' ');

  return (
    <>
      <header className={headerClass}>
        <div className="site-header__bar">
          <Link className="brand" href="/" rel="home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="brand__logo brand__logo--light" src="/img/one-love-logo-reversed.webp" width={300} height={110} alt={business.name} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="brand__logo brand__logo--dark" src="/img/one-love-logo.webp" width={300} height={110} alt="" aria-hidden="true" />
          </Link>

          <nav className="nav" aria-label="Primary">
            <ul className="nav__list">
              {primaryNav.map((item, i) => (
                <li key={item.label} className={`nav__item${item.children ? ' has-sub' : ''}`}>
                  <Link className="nav__link" href={item.href} prefetch={false}>
                    {item.label}
                  </Link>
                  {item.children && (
                    <>
                      <button
                        className="nav__toggle"
                        type="button"
                        aria-expanded={openSub === i}
                        aria-controls={`sub-${i}`}
                        onClick={() => setOpenSub(openSub === i ? null : i)}
                      >
                        <span className="screen-reader-text">Show {item.label} submenu</span>
                        <Icon name="chevron" />
                      </button>
                      <ul className="nav__sub" id={`sub-${i}`}>
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <Link href={child.href} prefetch={false}>
                              <span>{child.label}</span>
                              {child.note && <small>{child.note}</small>}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-header__actions">
            <a className="header-phone" href={business.phoneHref}>
              <Icon name="phone" />
              <span className="header-phone__num">{business.phone}</span>
              <span className="screen-reader-text header-phone__sr">Call us</span>
            </a>
            <Link className="btn btn--primary btn--sm header-book" href={urls.book} prefetch={false}>
              Book now
            </Link>
            <button
              ref={menuBtn}
              className="menu-btn"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenu(!menuOpen)}
            >
              <span className="menu-btn__lines" aria-hidden="true">
                <span />
                <span />
              </span>
              <span className="screen-reader-text">Menu</span>
            </button>
          </div>
        </div>
      </header>

      <div
        ref={panel}
        className="mnav"
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        hidden={panelHidden}
        onClick={(e) => (e.target as Element).closest('a') && setMenu(false)}
      >
        <div className="mnav__inner">
          <nav aria-label="Mobile">
            <ul className="mnav__list">
              {primaryNav.map((item) => (
                <li key={item.label} className="mnav__item">
                  {item.children ? (
                    <details>
                      <summary>
                        {item.label}
                        <Icon name="plus" />
                      </summary>
                      <ul>
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <Link href={child.href} prefetch={false}>
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ) : (
                    <Link href={item.href} prefetch={false}>
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
              <li className="mnav__item">
                <Link href={urls.contact} prefetch={false}>
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
          <div className="mnav__foot">
            <Link className="btn btn--primary btn--block" href={urls.book} prefetch={false}>
              Book now <Icon name="arrow" />
            </Link>
            <div className="mnav__contact">
              <a href={business.phoneHref}>
                <Icon name="phone" /> {business.phone}
              </a>
              <a href={whatsappUrl()}>
                <Icon name="chat" /> WhatsApp us
              </a>
            </div>
            <p className="mnav__meta">
              {business.street}, {business.locality} · {business.hoursLabel}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
