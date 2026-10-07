/**
 * Blog copy: Execution Manual §15 (blog index), §20 (taxonomy), §22 (anchor
 * bank) and §24 (related posts, pillar and money-page callouts), verbatim.
 * Category names, card text and pillar links live in Sanity (seeded from
 * scripts/sanity/seed.mjs) so editors can change them.
 */
import type { Category } from '@/lib/sanity';
import seed from '../../../sanity/seed-data.json';

export const blogMeta = {
  title: 'Ambergris Caye Golf Cart Blog | Local Guides, Routes, Events',
  description:
    'Local guides written by the family behind One Love: San Pedro events by cart, driving tips, Secret Beach routes, and seasonal itineraries.',
  h1: 'Ambergris Caye by Golf Cart: Guides, Routes, and Events',
};

export const blogIntro =
  'The One Love blog is where we write down what we tell every renter face-to-face at cart hand-off. Guides to festivals happening the week you arrive. Turn-by-turn routes to Secret Beach and the sunset spots south of town. Where to refuel, where to park at Lobster Fest, how to handle the sand roads after a rainy-season storm, which restaurants north of the bridge are worth the drive. Everything on this page is written by the family who runs the rental office on Barrier Reef Drive, not an outside content writer. Pick a category below or scroll for the most recent posts.';

/** Book Now anchors from the manual's anchor bank, rotated per post. */
export const bookAnchors = [
  'reserve your cart',
  'book your golf cart',
  'reserve a cart for your stay',
  'secure your reservation',
  'book a golf cart in San Pedro',
  'reserve a golf cart',
  'book with One Love',
  'reserve with our team',
  'get a cart waiting on arrival',
  'book direct with us',
];

export function pickAnchor(seed: string) {
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return bookAnchors[h % bookAnchors.length];
}

/** "Month Day, Year" in Belize time. */
export function formatDate(iso?: string) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'America/Belize' });
}

export const blogPath = (page = 1) => (page > 1 ? `/blog/page/${page}/` : '/blog/');
export const categoryPath = (slug: string, page = 1) => (page > 1 ? `/category/${slug}/page/${page}/` : `/category/${slug}/`);
export const postPath = (slug: string) => `/${slug}/`;
export const authorPath = (slug: string, page = 1) => (page > 1 ? `/author/${slug}/page/${page}/` : `/author/${slug}/`);
export const tagPath = (slug: string, page = 1) => (page > 1 ? `/tag/${slug}/page/${page}/` : `/tag/${slug}/`);

/** Categories from Sanity, or the seed list (no posts yet) before Sanity is connected. */
export function withFallback(cats: Category[]): Category[] {
  if (cats.length) return cats;
  return seed.categories.map((c) => ({ ...c, _id: `category-${c.slug}`, count: 0 }));
}
