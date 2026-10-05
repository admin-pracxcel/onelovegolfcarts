"use client";

import { useEffect } from "react";

/**
 * Sequences sections in as they enter, so the eye lands on the headline
 * before the supporting detail.
 *
 * One observer for the whole page rather than a wrapper component per
 * element: the markup stays server-rendered and this is the only client
 * island it needs. Elements opt in with `data-reveal`, and an optional
 * `--d` inline custom property staggers them.
 *
 * There is no scroll listener anywhere on the page.
 */
export function Reveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("in");
          obs.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
