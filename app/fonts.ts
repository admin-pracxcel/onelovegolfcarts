import localFont from "next/font/local";

/**
 * Three voices, three jobs. Loaded through next/font/local so the @font-face
 * rules and preload hints are generated at build time, with no request to a
 * third-party font host.
 *
 * Clash Display was chosen over Bricolage, Cabinet Grotesk and Archivo after
 * rendering all four at 300px solid and outline. It has the most presence at
 * display scale, and crucially its "4" has a closed counter, which holds up
 * as an outline where Bricolage's open counter goes spindly. The oversized
 * 04 / 06 numerals are the signature of this design, so that mattered.
 */

export const display = localFont({
  src: "./fonts/clash.woff2",
  weight: "400 700",
  display: "swap",
  variable: "--font-display",
  fallback: ["Impact", "Haettenschweiler", "sans-serif"],
  adjustFontFallback: false,
});

export const body = localFont({
  src: "./fonts/schibsted.woff2",
  weight: "400 900",
  display: "swap",
  variable: "--font-body",
  fallback: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
  adjustFontFallback: false,
});

export const mono = localFont({
  src: [
    { path: "./fonts/plexmono.woff2", weight: "400", style: "normal" },
    { path: "./fonts/plexmono-500.woff2", weight: "500", style: "normal" },
  ],
  display: "swap",
  variable: "--font-mono",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
  adjustFontFallback: false,
});

export const fontVars = [display.variable, body.variable, mono.variable].join(" ");
