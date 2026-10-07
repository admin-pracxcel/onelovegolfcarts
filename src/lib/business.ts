/**
 * Business / entity data: single source of truth for NAP, rates, ratings and
 * profile URLs. Used by components and JSON-LD so the two never disagree.
 *
 * "VERIFY" marks values where the project documents and the live site
 * disagree (see README). `null` means the client must supply it; anything
 * null is omitted from output rather than printed as a placeholder.
 */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://onelovegolfcartsbelize.com').replace(/\/$/, '');

export const business = {
  name: 'One Love Golf Cart Rentals',
  legalName: null as string | null, // VERIFY: registered business name.
  founded: '2017',
  description:
    'Family-owned golf cart rental on Barrier Reef Drive in San Pedro Town, Ambergris Caye, Belize. 4-seater and 6-seater gas golf carts with free delivery anywhere on the island.',

  phone: '+501-634-9559',
  phoneHref: 'tel:+5016349559',
  whatsapp: '5016349559', // [WHATSAPP NUMBER]: assumed same as phone. VERIFY.
  email: 'onelovecartsrental@hotmail.com',

  street: '1 Barrier Reef Drive',
  locality: 'San Pedro Town',
  region: 'Belize District',
  island: 'Ambergris Caye',
  country: 'BZ',
  lat: 17.9178, // VERIFY: field-report default, not a surveyed pin.
  lng: -87.9631,
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=One+Love+Golf+Cart+Rentals+San+Pedro+Belize',
  gbpUrl: null as string | null, // [GBP LISTING URL]
  gbpReview: null as string | null, // [GBP REVIEW SHORT URL]

  hoursLabel: '9am to 9pm daily',
  opens: '09:00',
  closes: '21:00',

  // USD. Docs and live /rates/ agree on standard rates (live site currently runs an October promo).
  rates: {
    '4-seater': { day: 35, week: 175, seats: 4 },
    '6-seater': { day: 60, week: 350, seats: 6 },
  },

  // TripAdvisor figures from the Aug 2026 field report. VERIFY before launch.
  rating: {
    value: '4.9',
    count: 104,
    source: 'TripAdvisor',
    url: 'https://www.tripadvisor.com/Attraction_Review-g291962-d23212104-Reviews-One_love_golf_cart_rentals-San_Pedro_Ambergris_Caye_Belize_Cayes.html',
  },

  businessReg: null as string | null, // [BUSINESS REG NUMBER]
  insurer: null as string | null, // [INSURANCE CARRIER]

  // Facebook: the live site links the numeric page URL; the field report lists
  // /onelovegolfcartsbelize. Using the URL the live site actually links. VERIFY.
  social: {
    instagram: 'https://www.instagram.com/onelovegolfcarts',
    facebook: 'https://www.facebook.com/One-Love-Golf-Cart-Rentals-106311858296426',
    x: 'https://twitter.com/onelovegolfcart',
    tripadvisor:
      'https://www.tripadvisor.com/Attraction_Review-g291962-d23212104-Reviews-One_love_golf_cart_rentals-San_Pedro_Ambergris_Caye_Belize_Cayes.html',
    yelp: 'https://www.yelp.com/biz/one-love-golf-cart-rentals-san-pedro-belize-2',
  },
} as const;

export type CartKey = keyof typeof business.rates;

export function whatsappUrl(message = ''): string {
  const url = `https://wa.me/${business.whatsapp}`;
  return message ? `${url}?text=${encodeURIComponent(message)}` : url;
}

export const BOOKING_MESSAGE = 'Hi One Love, I would like to book a golf cart.';

/** Planned site architecture (Execution Manual). Paths only; most pages are a later phase. */
export const urls = {
  home: '/',
  book: '/book-now/',
  rates: '/rates/',
  carts: '/our-carts/',
  '4-seater': '/our-carts/#4-seater',
  '6-seater': '/our-carts/#6-seater',
  compare: '/golf-cart-comparison-4-vs-6-seater/',
  fleet: '/how-we-maintain-our-fleet/',
  about: '/about-us/',
  team: '/meet-the-team/',
  gallery: '/gallery/',
  blog: '/blog/',
  contact: '/contact/',
  pay: '/pay-now/',
  terms: '/terms-and-conditions/',
  privacy: '/privacy-policy/',
  ambergris: '/ambergris-caye/',
  'san-pedro': '/exploring-san-pedro-by-golf-cart/', // VERIFY: manual names "San Pedro" in nav but gives no URL.
  spr: '/rentals-at-san-pedro-airport/',
  bze: '/rentals-at-belize-city-airport/',
  'secret-beach': '/delivery-to-secret-beach/',
  north: '/north-ambergris-caye-cart-delivery/',
  south: '/south-ambergris-caye-cart-delivery/',
  resorts: '/south-ambergris-caye-cart-delivery/', // VERIFY: manual names "Resort Delivery" but gives no hub URL.
  'mahogany-bay': '/golf-cart-delivery-mahogany-bay/',
  'grand-caribe': '/golf-cart-delivery-grand-caribe/',
  'victoria-house': '/golf-cart-delivery-victoria-house/',
  'belize-yacht-club': '/golf-cart-delivery-belize-yacht-club/',
  alaia: '/golf-cart-delivery-alaia-belize/',
  weddings: '/wedding-golf-cart-rental-san-pedro/',
  arrival: '/getting-to-san-pedro-belize-arrival-guide/',
  'secret-route': '/secret-beach-route-from-san-pedro/',
  refuel: '/where-to-refuel-your-golf-cart-ambergris-caye/',
  'drive-local': '/how-to-drive-golf-cart-in-san-pedro-like-local/',
  'things-to-do': '/things-to-do-ambergris-caye-golf-cart/',
  sunset: '/best-sunset-drive-routes-ambergris-caye/',
  snorkel: '/snorkel-launches-reachable-by-golf-cart-ambergris/',
  'lobster-crawl': '/the-great-lobster-crawl-a-self-guided-culinary-tour/', // existing blog post on the live site
  events: '/san-pedro-events-golf-cart-guide/',
  'night-fishing': '/night-fishing-bioluminescence-safe-parking-for-night-adventures/', // existing blog post on the live site
  weekend: '/san-pedro-belize-golf-cart-itinerary-weekend-guide/', // existing blog post on the live site
  perseid: '/perseid-meteor-shower-dark-sky-driving-for-stargazing/', // existing blog post on the live site
  'water-taxi': '/water-taxi-belize-city-to-san-pedro-guide/',
  'deep-south': '/the-deep-south-expedition-how-far-can-you-really-go/', // existing blog post on the live site
} as const;

export type UrlKey = keyof typeof urls;
