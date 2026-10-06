import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/business';

// Only routes that exist in this app. Add pages here as they are built.
// (Google ignores priority/changefreq, so they are omitted.)
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, lastModified: new Date('2026-10-06') },
    { url: `${SITE_URL}/our-carts/`, lastModified: new Date('2026-10-06') },
    { url: `${SITE_URL}/rates/`, lastModified: new Date('2026-10-06') },
    { url: `${SITE_URL}/contact/`, lastModified: new Date('2026-10-06') },
    { url: `${SITE_URL}/about-us/`, lastModified: new Date('2026-10-06') },
    { url: `${SITE_URL}/gallery/`, lastModified: new Date('2026-10-06') },
    { url: `${SITE_URL}/ambergris-caye/`, lastModified: new Date('2026-10-06') },
    { url: `${SITE_URL}/rentals-at-san-pedro-airport/`, lastModified: new Date('2026-10-06') },
    { url: `${SITE_URL}/rentals-at-belize-city-airport/`, lastModified: new Date('2026-10-06') },
    { url: `${SITE_URL}/delivery-to-secret-beach/`, lastModified: new Date('2026-10-06') },
    { url: `${SITE_URL}/north-ambergris-caye-cart-delivery/`, lastModified: new Date('2026-10-06') },
    { url: `${SITE_URL}/south-ambergris-caye-cart-delivery/`, lastModified: new Date('2026-10-06') },
    { url: `${SITE_URL}/golf-cart-delivery-mahogany-bay/`, lastModified: new Date('2026-10-06') },
    { url: `${SITE_URL}/golf-cart-delivery-grand-caribe/`, lastModified: new Date('2026-10-06') },
    { url: `${SITE_URL}/golf-cart-delivery-victoria-house/`, lastModified: new Date('2026-10-06') },
    { url: `${SITE_URL}/golf-cart-delivery-belize-yacht-club/`, lastModified: new Date('2026-10-06') },
    { url: `${SITE_URL}/golf-cart-delivery-alaia-belize/`, lastModified: new Date('2026-10-06') },
    { url: `${SITE_URL}/getting-to-san-pedro-belize-arrival-guide/`, lastModified: new Date('2026-10-06') },
    { url: `${SITE_URL}/golf-cart-comparison-4-vs-6-seater/`, lastModified: new Date('2026-10-06') },
    { url: `${SITE_URL}/how-we-maintain-our-fleet/`, lastModified: new Date('2026-10-06') },
    { url: `${SITE_URL}/meet-the-team/`, lastModified: new Date('2026-10-06') },
  ];
}
