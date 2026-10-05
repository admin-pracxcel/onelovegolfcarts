"use client";

import { SiteLink } from "./SiteLink";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { Button } from "./Button";
import { BUSINESS, NAV } from "@/lib/content";

/**
 * The floating pill. It starts inside the hero panel and switches to fixed
 * once a sentinel at the top of the document scrolls out, so it rides along
 * without ever changing size or colour.
 *
 * Detachment is driven by IntersectionObserver, not a scroll listener.
 */
export function Nav() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinel.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      ([entry]) => setStuck(!entry.isIntersecting),
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 1080px)");
    const onWide = () => setOpen(false);
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onWide);
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onWide);
    };
  }, []);

  return (
    <>
      <div
        ref={sentinel}
        aria-hidden="true"
        style={{ position: "absolute", top: 0, left: 0, width: 1, height: 90, pointerEvents: "none" }}
      />
      <div className={`navwrap${stuck ? " is-stuck" : ""}`}>
        <nav className="nav" aria-label="Primary">
          <SiteLink className="nav-brand" href="/" aria-label={`${BUSINESS.name}, home`}>
            <picture>
              <source media="(prefers-color-scheme: dark)" srcSet="/img/one-love-logo-light.webp" />
              <Image
                src="/img/one-love-logo.webp"
                width={444}
                height={159}
                alt={BUSINESS.name}
                priority
              />
            </picture>
          </SiteLink>

          <div className={`nav-links${open ? " is-open" : ""}`} id="navLinks">
            {NAV.map((item) => (
              <div className="nav-item" key={item.label}>
                <SiteLink className="nav-link" href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                  {item.children && <Icon name="caret-down-bold" />}
                </SiteLink>
                {item.children && (
                  <div className="submenu">
                    {item.children.map((c) => (
                      <SiteLink key={c.label} href={c.href} onClick={() => setOpen(false)}>
                        {c.label}
                      </SiteLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="nav-cta">
            <a className="nav-phone" href={BUSINESS.phoneHref}>
              <Icon name="phone-bold" />
              <span>{BUSINESS.phoneDisplay}</span>
            </a>
            <Button href="/book-now/" tone="ink" size="sm">Book now</Button>
            <button
              id="burger"
              className="burger"
              type="button"
              aria-expanded={open}
              aria-controls="navLinks"
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
            >
              <Icon name="list-bold" className="ico ico-open" />
              <Icon name="x-bold" className="ico ico-close" />
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}
