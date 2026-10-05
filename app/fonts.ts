import localFont from "next/font/local";

/**
 * Self-hosted through next/font so the @font-face, preload hints and
 * font-display are generated at build time and there is no render-blocking
 * request to a third-party font host.
 *
 * Each face is exposed as a CSS variable and consumed in globals.css, so the
 * stylesheet never names a font file directly.
 */

export const bricolage = localFont({
  src: "./fonts/bricolage.woff2",
  weight: "300 700",
  display: "swap",
  variable: "--font-display",
  // Bricolage is narrow; a slightly condensed fallback keeps the swap quiet.
  fallback: ["Georgia", "serif"],
  adjustFontFallback: false,
});

export const schibsted = localFont({
  src: "./fonts/schibsted.woff2",
  weight: "400 900",
  display: "swap",
  variable: "--font-body",
  fallback: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
  adjustFontFallback: false,
});

export const plexMono = localFont({
  src: [
    { path: "./fonts/plexmono.woff2", weight: "400", style: "normal" },
    { path: "./fonts/plexmono-500.woff2", weight: "500", style: "normal" },
  ],
  display: "swap",
  variable: "--font-mono",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
  adjustFontFallback: false,
});

export const fontVars = [bricolage.variable, schibsted.variable, plexMono.variable].join(" ");
