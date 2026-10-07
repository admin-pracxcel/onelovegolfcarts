import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/business';
import { getSitemapEntries } from '@/lib/sanity';

// Code pages are listed here; blog posts, categories, authors and tags (3+
// posts) come from Sanity. (Google ignores priority/changefreq.)
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cms = await getSitemapEntries();
  return [
    { url: `${SITE_URL}/`, lastModified: new Date('2026-10-06') },
    { url: `${SITE_URL}/our-carts/`, lastModified: new Date('2026-10-06') },
    { url: `${SITE_URL}/rates/`, lastModified: new Date('2026-10-06') },
    { url: `${SITE_URL}/contact/`, lastModified: new Date('2026-10-06') },
    { url: `${SITE_URL}/about-us/`, lastModified: new Date('2026-10-06') },
    { url: `${SITE_URL}/gallery/`, lastModified: new Date('2026-10-06') },
    { url: `${SITE_URL}/locations/`, lastModified: new Date('2026-10-07') },
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
    { url: `${SITE_URL}/book-now/`, lastModified: new Date('2026-10-06') },
    { url: `${SITE_URL}/pay-now/`, lastModified: new Date('2026-10-06') },
    { url: `${SITE_URL}/terms-and-conditions/`, lastModified: new Date('2026-10-06') },
    { url: `${SITE_URL}/privacy-policy/`, lastModified: new Date('2026-10-06') },
    { url: `${SITE_URL}/things-to-do-ambergris-caye-golf-cart/`, lastModified: new Date('2026-10-07') },
    { url: `${SITE_URL}/blog/`, lastModified: new Date(cms.posts[0]?.date ?? '2026-10-07') },
    ...cms.posts.map((p) => ({ url: `${SITE_URL}/${p.slug}/`, lastModified: new Date(p.date) })),
    ...cms.categories.map((s) => ({ url: `${SITE_URL}/category/${s}/` })),
    ...cms.authors.map((s) => ({ url: `${SITE_URL}/author/${s}/` })),
    ...cms.tags.map((s) => ({ url: `${SITE_URL}/tag/${s}/` })),
  ];
}
