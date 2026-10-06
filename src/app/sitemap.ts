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
  ];
}
