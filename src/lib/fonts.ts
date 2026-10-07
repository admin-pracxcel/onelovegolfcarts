import localFont from 'next/font/local';

/** Site fonts, shared by the site layout and the global 404 page. */
export const display = localFont({
  src: '../fonts/bricolage-grotesque-var-latin.woff2',
  weight: '500 800',
  variable: '--font-display',
  display: 'swap',
  fallback: ['Arial Narrow', 'Arial', 'sans-serif'],
});

export const body = localFont({
  src: '../fonts/instrument-sans-var-latin.woff2',
  weight: '400 700',
  variable: '--font-body',
  display: 'swap',
  fallback: ['system-ui', 'Arial', 'sans-serif'],
});
