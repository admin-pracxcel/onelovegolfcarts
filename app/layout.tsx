import type { Metadata, Viewport } from "next";
import { fontVars } from "./fonts";
import { IconSprite } from "@/components/IconSprite";
import { Reveal } from "@/components/Reveal";
import { HERO, META } from "@/lib/content";
import { ALLOW_INDEXING } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(META.canonical),
  title: META.title,
  description: META.description,
  alternates: {
    canonical: "/",
    languages: { "en-US": "/", "x-default": "/" },
  },
  openGraph: {
    type: "website",
    siteName: "One Love Golf Cart Rentals",
    title: META.title,
    description: META.description,
    url: "/",
    images: [
      {
        url: `${HERO.image.wide}.jpg`,
        alt: META.ogImageAlt,
        width: 1440,
        height: 810,
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  // Blocked while this is a preview. See lib/seo.ts.
  robots: ALLOW_INDEXING
    ? { index: true, follow: true }
    : {
        index: false,
        follow: false,
        nocache: true,
        googleBot: { index: false, follow: false, noimageindex: true },
      },
};

export const viewport: Viewport = {
  themeColor: "#041331",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={fontVars}>
      <head>
        {/* Art-directed hero: preload the crop the viewport will actually use. */}
        <link
          rel="preload"
          as="image"
          href={`${HERO.image.wide}.webp`}
          media="(min-width: 641px)"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href={`${HERO.image.tall}.webp`}
          media="(max-width: 640px)"
          fetchPriority="high"
        />
      </head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <IconSprite />
        {children}
        <Reveal />
      </body>
    </html>
  );
}
