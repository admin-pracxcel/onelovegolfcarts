import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { SiteEffects, revealBootScript } from '@/components/SiteEffects';
import { business, SITE_URL } from '@/lib/business';
import { ALLOW_INDEXING } from '@/lib/seo';
import './globals.css';

const display = localFont({
  src: '../fonts/bricolage-grotesque-var-latin.woff2',
  weight: '500 800',
  variable: '--font-display',
  display: 'swap',
  fallback: ['Arial Narrow', 'Arial', 'sans-serif'],
});

const body = localFont({
  src: '../fonts/instrument-sans-var-latin.woff2',
  weight: '400 700',
  variable: '--font-body',
  display: 'swap',
  fallback: ['system-ui', 'Arial', 'sans-serif'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: business.name, template: `%s | ${business.name}` },
  description: business.description,
  applicationName: business.name,
  // Blocked while this is a preview. See lib/seo.ts.
  robots: ALLOW_INDEXING
    ? { index: true, follow: true }
    : { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false, noimageindex: true } },
};

export const viewport: Viewport = {
  themeColor: '#0a1a3a',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-US" className={`${display.variable} ${body.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealBootScript }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
        <SiteEffects />
      </body>
    </html>
  );
}
