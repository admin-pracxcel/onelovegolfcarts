import type { Metadata, Viewport } from 'next';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { PromoModal } from '@/components/PromoModal';
import { SiteEffects, revealBootScript } from '@/components/SiteEffects';
import { TopBar } from '@/components/TopBar';
import { business, SITE_URL } from '@/lib/business';
import { ALLOW_INDEXING } from '@/lib/seo';
import { body, display } from '@/lib/fonts';
import '@/styles/globals.css';

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
        <TopBar />
        <Header />
        {children}
        <Footer />
        <SiteEffects />
        <PromoModal />
      </body>
    </html>
  );
}
