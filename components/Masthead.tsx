"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { SiteLink } from "./SiteLink";
import { BUSINESS, NAV } from "@/lib/content";

/**
 * A thin sticky rail with the booking control as a square block flush to the
 * corner. Deliberately not a floating pill: that has become the default
 * Webflow masthead and reads as a template.
 */
export function Masthead() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 1080px)");
    const close = () => setOpen(false);
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", close);
    return () => { document.removeEventListener("keydown", onKey); mq.removeEventListener("change", close); };
  }, []);

  return (
    <header className="mast">
      <div className="mast-in">
        <SiteLink href="/" className="mast-brand" aria-label={`${BUSINESS.name}, home`}>
          <picture>
            <source media="(prefers-color-scheme: dark)" srcSet="/img/one-love-logo-light.webp" />
            <Image src="/img/one-love-logo.webp" width={444} height={159} alt={BUSINESS.name} priority />
          </picture>
        </SiteLink>

        <nav className={`mast-nav${open ? " is-open" : ""}`} id="nav" aria-label="Primary">
          {NAV.map((item) => (
            <div className="mast-item" key={item.label}>
              <SiteLink href={item.href} className="mast-link" onClick={() => setOpen(false)}>
                {item.label}
                {item.children && <Icon name="caret-down-bold" />}
              </SiteLink>
              {item.children && (
                <div className="submenu">
                  {item.children.map((c) => (
                    <SiteLink key={c.label} href={c.href} onClick={() => setOpen(false)}>{c.label}</SiteLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="mast-end">
          <a className="mast-phone" href={BUSINESS.phoneHref}>
            <Icon name="phone-bold" /><span>{BUSINESS.phoneDisplay}</span>
          </a>
          <SiteLink href="/book-now/" className="mast-book">
            Book now <Icon name="arrow-right-bold" />
          </SiteLink>
          <button className="burger" type="button" id="burger" aria-expanded={open}
                  aria-controls="nav" aria-label="Menu" onClick={() => setOpen((v) => !v)}>
            <Icon name="list-bold" className="ico ico-open" />
            <Icon name="x-bold" className="ico ico-close" />
          </button>
        </div>
      </div>
    </header>
  );
}
