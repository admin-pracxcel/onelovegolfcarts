/**
 * Site-wide promotion popup. Copy matches the popup on the live WordPress site.
 *
 * Shown once per visit: the first page a visitor opens in a browser tab.
 * Navigating to other pages doesn't show it again; closing the tab and coming
 * back does (sessionStorage). Stops automatically when the offer ends, so an
 * expired price is never shown. To run a new offer, update this object;
 * changing `id` makes it show again for visitors who already saw the old one.
 */
export const promo = {
  id: 'october-special-2026',
  enabled: true,
  // Offer valid through 31 October (Belize time, UTC−6).
  endsAt: '2026-11-01T00:00:00-06:00',
  badge: 'October special',
  title: 'Cruise the island for less',
  body: 'Book your golf cart this October and save on daily and weekly rentals. Free delivery and pickup included.',
  prices: [
    { was: 35, now: 30, per: 'Per day' },
    { was: 175, now: 165, per: 'Per week' },
  ],
  cta: 'Book now',
  terms: 'Offer valid through 31 October. Subject to availability.',
  delayMs: 1200,
} as const;
