"use client";
import { useEffect } from "react";

/**
 * One observer for the whole page. Elements opt in with a data attribute and
 * an optional `--d` delay; the markup stays server-rendered and this is the
 * only client island it needs.
 *
 * Four techniques, matching the CSS: fade-up, line mask, clip reveal, image
 * scale. There is no scroll listener anywhere on the page.
 */
export function Reveal() {
  useEffect(() => {
    const sel = "[data-reveal],[data-lines],[data-clip],[data-scale],[data-draw]";
    const els = document.querySelectorAll<HTMLElement>(sel);

    // route lines need their own length before they can be dashed
    document.querySelectorAll<SVGPathElement>("[data-draw] path, .isle-route").forEach((p) => {
      try { p.style.setProperty("--len", String(Math.ceil(p.getTotalLength()))); } catch {}
    });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries, obs) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("in");
          obs.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
