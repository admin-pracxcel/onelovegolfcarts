/**
 * /about-us/ copy: paste-ready strings from Execution Manual §05, verbatim.
 * Inline links use [[anchor|urlKey]] (components/RichText).
 *
 * FOUNDERS: the manual requires real names, roles, bios and portraits
 * ([FOUNDER …] placeholders). Until `founders` is filled in, the "Meet the
 * family" section and the story paragraph that names them are not rendered,
 * so no placeholder ever reaches the page. Fill this array (and add 800x800
 * portraits to assets/source + npm run images) to switch both on; Person
 * JSON-LD is generated automatically.
 */
import type { ImageName } from '../images';

export type Founder = {
  firstName: string;
  lastName: string;
  role: string; // e.g. "Co-Founder"
  place: string; // "Born and raised in [PLACE]"
  before: string; // one sentence about pre-2017 work
  handles: string; // e.g. "fleet maintenance and bookings"
  interest: string; // "When not working, spends time [ONE HOBBY OR INTEREST]"
  photo?: ImageName;
  linkedin?: string;
};

/**
 * The manual's placeholder founders, shown as written until the client
 * supplies real details. Placeholders are kept out of structured data.
 */
export const founders: Founder[] = [
  {
    firstName: '[FOUNDER 1 FIRST NAME]',
    lastName: '[FOUNDER 1 LAST NAME]',
    role: '[FOUNDER 1 ROLE]',
    place: '[PLACE]',
    before: '[ONE SENTENCE ABOUT PRE-2017 WORK].',
    handles: '[SPECIFIC ROLE, e.g. fleet maintenance, customer relations, bookings]',
    interest: '[ONE HOBBY OR INTEREST]',
  },
  {
    firstName: '[FOUNDER 2 FIRST NAME]',
    lastName: '[FOUNDER 2 LAST NAME]',
    role: '[FOUNDER 2 ROLE]',
    place: '[PLACE]',
    before: '[ONE SENTENCE ABOUT PRE-2017 WORK].',
    handles: '[SPECIFIC ROLE, e.g. fleet maintenance, customer relations, bookings]',
    interest: '[ONE HOBBY OR INTEREST]',
  },
];

/** True for a value still holding the manual's [PLACEHOLDER]. */
export const isPlaceholder = (s?: string) => !!s && s.trim().startsWith('[');

export const meta = {
  title: 'About One Love Golf Cart Rentals | San Pedro, Ambergris Caye',
  description:
    'Meet the family behind One Love Golf Cart Rentals in San Pedro, Belize. Founded in 2017 on Barrier Reef Drive, we rent Club Car golf carts to visitors and locals across Ambergris Caye.',
  h1: 'About One Love Golf Cart Rentals',
};

// First mention links home with the branded anchor (manual's link list).
export const intro =
  '[[One Love Golf Cart Rentals|home]] is a family-owned rental service in San Pedro Town, on Ambergris Caye, Belize. We opened in 2017 on Barrier Reef Drive after years of running a small grocery shop on the island. Today we rent 4-seater and 6-seater gas-powered Club Car golf carts to visitors and residents, deliver them free anywhere on Ambergris Caye, and answer messages from nine in the morning until nine at night, every day of the year.';

export const story = {
  h2: 'Our story',
  paragraphs: [
    'Before there was One Love Golf Cart Rentals, there was a family grocery shop. Running a shop on Ambergris Caye taught us how a small island economy works. Everyone knows everyone. Reputation travels fast. Getting things right matters more than getting them cheap.',
    'In 2017 we bought our first cart, put a hand-lettered sign on Barrier Reef Drive, and rented it to a family staying two doors down at a small hotel. They came back the next day and rented it again for a week. Word spread the way things spread on an island of six thousand people. By the end of that first season we had four carts. By the end of year two, a full fleet.',
    // Index 2 is built from `founders` (see familyParagraph); omitted until filled.
    'That grocery-shop background still shapes how we run the rental business. We publish honest prices. We deliver free because a family arriving after a long flight should not have to lug bags to a rental lot. We keep our WhatsApp on because a flat tire at ten at night should not ruin your vacation. When a cart is not right, we swap it, we do not argue with you about it.',
  ],
  pullQuote: 'Getting things right matters more than getting them cheap.',
  // Milestones restated from the story above (no new facts).
  timeline: [
    { when: 'Before 2017', what: 'A family grocery shop on Ambergris Caye.' },
    { when: '2017', what: 'The first cart and a hand-lettered sign on Barrier Reef Drive.' },
    { when: 'First season', what: 'Four carts.' },
    { when: 'Year two', what: 'A full fleet.' },
    { when: 'Today', what: '4-seater and 6-seater carts, delivered free anywhere on Ambergris Caye.' },
  ],
};

/** The manual's third story paragraph, with founder names filled in. Null until two founders exist. */
export function familyParagraph(f: Founder[]) {
  if (f.length < 2) return null;
  return `We are still a family business. The person who answers your WhatsApp is ${f[0].firstName}. The person who delivers your cart to your hotel is often ${f[1].firstName} or one of our team. The person who inspects the cart before it goes out is one of us. There is no call center, no franchise, no third-party dispatcher between you and the people whose name is on the sign.`;
}

/** The manual's founder bio template. */
export function founderBio(f: Founder) {
  return `Born and raised in ${f.place}. ${f.before} Co-founded One Love in 2017 and today handles ${f.handles}. Speaks English, Spanish, and Kriol. When not working, spends time ${f.interest}.`;
}

export const beliefs = {
  h2: 'What we believe about renting',
  intro:
    'A rental business is easy to run badly and hard to run well. The temptation is to over-promise the online listing, under-deliver the cart, and hope reviews average out. That approach works for a while and then it does not. Three principles guide how we run One Love, and every operational decision comes back to one of them.',
  principles: [
    {
      title: 'Honest pricing.',
      body: 'The rate on the site is the rate you pay. No surge for holidays, no hidden fuel fee, no delivery upcharge if your resort is further south than the last one. Bridge passes to North Ambergris Caye are included. Roadside support is included. The deposit is refundable and refunds are processed within 48 hours of a clean return. If we ever change a rate on the site, we change it for everyone, all at once, and we date the change.',
    },
    {
      title: 'Real availability.',
      body: 'When our booking form says a cart is available, it is available. We do not oversell the fleet during peak season and hope for cancellations. If we cannot fulfill a booking, you find out within 15 minutes of submitting the form, not when you land at San Pedro Airport. This is the reason we ask for arrival flight numbers up front.',
    },
    {
      title: 'Fix problems on the spot.',
      body: 'A flat tire, a dead battery, a cart that will not start on the second morning of the rental. Message our WhatsApp and someone reaches you. Most issues are resolved in under an hour on the island. If they are not, we swap the cart at no charge and no argument. Roadside support is not a marketing line. It is the reason we keep our WhatsApp open past business hours.',
    },
  ],
};

export const fleet = {
  h2: 'Our fleet',
  paragraphs: [
    'Every cart in the One Love fleet is a Club Car. We picked Club Car for one specific reason: the chassis is aluminum, and aluminum handles salt air the way steel does not. On an island 25 miles long and less than a mile wide at most points, every road is a salt-air road. A steel-chassis cart corrodes faster than the rental economics support. Aluminum lasts, holds paint, and keeps a resale value that lets us cycle the fleet without a subsidy.',
    'All our carts are gas-powered rather than electric. Gas covers more miles per refuel, matters on sandy roads, and does not leave a renter stranded when the battery drops faster than expected in July heat. Every cart in the fleet gets serviced on a rolling schedule tied to hours and mileage, inspected before it leaves the lot, and inspected again when it comes back. The full workshop process is documented on [[how we maintain our fleet|fleet]].',
  ],
};

export const delivery = {
  h2: 'Where we deliver',
  body: 'Delivery is free anywhere on Ambergris Caye. That covers San Pedro Airport (SPR) for arrivals on Tropic Air or Maya Island Air, the Marine Terminal for San Pedro Belize Express and Ocean Ferry water taxi passengers, every resort along Coconut Drive from Mahogany Bay to Victoria House to Alaia Belize, every San Pedro Town hotel, and every address north of the Sir Barry Bowen Bridge including Grand Caribe, Coco Beach Resort, Las Terrazas, and Secret Beach. Full delivery zones and directions from each are on our [[Ambergris Caye guide|ambergris]].',
  zones: [
    { label: 'San Pedro Airport', key: 'spr' },
    { label: 'South Ambergris Caye', key: 'south' },
    { label: 'North Ambergris Caye', key: 'north' },
    { label: 'Secret Beach', key: 'secret-beach' },
  ] as const,
};

export const community = {
  h2: 'Community',
  body: 'One Love is a San Pedro business. Our team lives on the island. Our mechanic learned the trade here. Our delivery drivers grew up on Ambergris Caye. We sponsor the Costa Maya Festival each August and buy an ad in the Lobster Fest program every June. When Emancipation Day rolls around on August 1, our office closes and our team is at the ceremonies. The business runs on tourism and we take seriously that the money circles back to the people who live where the tourists visit.',
};

export const getInTouch = {
  h2: 'Get in touch',
  body: 'The fastest way to reach us is WhatsApp at +501-634-9559. The office is at 1 Barrier Reef Drive in San Pedro Town, opposite Belize Chocolate Company. We answer messages every day from nine in the morning until nine at night. Email us at onelovecartsrental@hotmail.com. Reserve a cart on our [[booking page|book]]. Rates for both cart types are on our [[rates page|rates]].',
};
