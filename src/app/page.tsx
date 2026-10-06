import type { Metadata } from 'next';
import { preload } from 'react-dom';
import { BookBar } from '@/components/BookBar';
import { Carts } from '@/components/sections/Carts';
import { Delivery } from '@/components/sections/Delivery';
import { Explore } from '@/components/sections/Explore';
import { Faq } from '@/components/sections/Faq';
import { FinalCta } from '@/components/sections/FinalCta';
import { HERO_IMAGE, HERO_SIZES, Hero } from '@/components/sections/Hero';
import { Intro } from '@/components/sections/Intro';
import { Reviews } from '@/components/sections/Reviews';
import { Steps } from '@/components/sections/Steps';
import { Why } from '@/components/sections/Why';
import { business } from '@/lib/business';
import { homeMeta, lastVerified } from '@/lib/content';
import { imageInfo } from '@/lib/images';
import { homeSchema, jsonLd } from '@/lib/schema';

// Strings from Execution Manual §04 (owned by the SEO professional).
export const metadata: Metadata = {
  title: { absolute: homeMeta.title },
  description: homeMeta.description,
  alternates: {
    canonical: '/',
    languages: { 'en-US': '/', 'x-default': '/' },
  },
  openGraph: {
    type: 'website',
    siteName: business.name,
    title: homeMeta.title,
    description: homeMeta.description,
    url: '/',
    locale: 'en_US',
    images: [{ url: '/img/og-golf-cart-rental-san-pedro-belize.jpg', width: 1200, height: 630, alt: homeMeta.ogAlt }],
  },
  twitter: { card: 'summary_large_image' },
};

export default function HomePage() {
  // LCP: start fetching the hero AVIF before the stylesheet is parsed.
  preload(imageInfo(HERO_IMAGE).src, {
    as: 'image',
    type: 'image/avif',
    imageSrcSet: imageInfo(HERO_IMAGE).srcset('avif'),
    imageSizes: HERO_SIZES,
    fetchPriority: 'high',
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(homeSchema())} />
      <main id="main" className="home">
        <Hero />
        <Intro />
        <Carts />
        <Why />
        <Delivery />
        <Steps />
        <Reviews />
        <Explore />
        <Faq />
        <FinalCta />
        <p className="last-verified container">
          Last verified {lastVerified}. Rates, hours, and delivery zones on this page are checked and updated at least monthly.
        </p>
      </main>
      <BookBar />
    </>
  );
}
