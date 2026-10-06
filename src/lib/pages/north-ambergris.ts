/**
 * /north-ambergris-caye-cart-delivery/ copy: Execution Manual §17
 * (location pages), verbatim. No north-side photos exist yet; images show
 * real One Love carts and are not presented as North Ambergris Caye.
 */

import { urls } from '@/lib/business';

export const meta = {
  title: 'North Ambergris Caye Golf Cart Delivery | One Love',
  description:
    'Golf cart delivery to any address on North Ambergris Caye. Free bridge passes, roadside support, and rates from $35 a day for 4-seater carts.',
  h1: 'Golf Cart Delivery on North Ambergris Caye',
};

export const intro =
  "North Ambergris Caye is everything above the Sir Barry Bowen Bridge: Secret Beach, Truck Stop, Grand Caribe, Coco Beach Resort, Las Terrazas, Coco Loco's, and the long stretch of beach up to Bacalar Chico. We deliver golf carts to any address on the north side, and every rental includes unlimited passes over the bridge in both directions.";

/** Header facts, restated from the copy. */
export const facts = [
  { value: 'Any address', label: 'north of the bridge' },
  { value: '30–45 min', label: 'typical delivery to the main resorts' },
  { value: 'Both ways', label: 'unlimited bridge passes' },
  { value: 'From $35', label: 'a day, 4-seater' },
];

export const what = {
  h2: 'What North Ambergris Caye is',
  body: 'North Ambergris Caye is everything on the island north of the Sir Barry Bowen Bridge, from the bridge itself all the way up to Bacalar Chico National Park at the extreme northern tip. The area holds most of the newer resorts (Grand Caribe, Coco Beach Resort, Las Terrazas, Costa Blu), the Truck Stop food park, Secret Beach on the west side, and a long stretch of quiet residential and beachfront property. Roads north of the bridge are largely sand and packed coral. Drive slower than you would in town.',
  // Restated from the paragraph above.
  zone: [
    { label: 'From', value: 'The Sir Barry Bowen Bridge' },
    { label: 'To', value: 'Bacalar Chico National Park, the northern tip' },
    { label: 'Roads', value: 'Sand and packed coral; drive slower than in town' },
  ],
};

export const delivery = {
  h2: 'How delivery works',
  body: 'Send us the resort or address name and any gate code or check-in instructions the resort requires. We drive the cart from our office on Barrier Reef Drive, cross the bridge, and deliver to your unit. Typical delivery time is 30 to 45 minutes from our office to Grand Caribe, Coco Beach, or Las Terrazas. Longer to properties further north. If you are landing at SPR and staying north-side, we can either meet you at the airport (5-minute delivery there) or drop the cart at your resort ahead of your arrival if the resort permits.',
  // Steps restated from the paragraph above.
  steps: [
    { when: 'You send', what: 'Resort or address, plus any gate code or check-in instructions.' },
    { when: 'We drive', what: 'From Barrier Reef Drive, over the bridge.' },
    { when: '30–45 minutes', what: 'Delivered to your unit at Grand Caribe, Coco Beach or Las Terrazas; longer further north.' },
  ],
  arrival: [
    { title: 'Meet at San Pedro Airport', body: 'About a 5-minute delivery from our office. Drive north from the airport yourself.' },
    { title: 'Waiting at your resort', body: 'Dropped off ahead of your arrival, if the resort permits.' },
  ],
};

export const upThere = {
  h2: "What's actually up there",
  body: "Resorts: Grand Caribe (large, family-friendly, west-side), Coco Beach Resort (mid-size), Las Terrazas (upscale condo-style), Costa Blu (adults-oriented), and residential rentals throughout. Food and drink: Truck Stop food park (multi-vendor, most popular), Rojo Beach Bar (upscale), Palapa Bar on the way out from town, and the Secret Beach bar cluster (Coco Loco's, Blue Bayou, Pirate's Not So Secret). Beaches: quiet public-access beach at every resort front and along many undeveloped stretches. Snorkel launches: dive shops at Grand Caribe and independent operators along the reef.",
  // Categories restated from the paragraph above.
  groups: <{ name: string; items: { name: string; note: string; href?: string }[] }[]>[
    {
      name: 'Resorts',
      items: [
        { name: 'Grand Caribe', note: 'Large, family-friendly, west-side', href: urls['grand-caribe'] },
        { name: 'Coco Beach Resort', note: 'Mid-size' },
        { name: 'Las Terrazas', note: 'Upscale condo-style' },
        { name: 'Costa Blu', note: 'Adults-oriented' },
      ],
    },
    {
      name: 'Food and drink',
      items: [
        { name: 'Truck Stop food park', note: 'Multi-vendor, most popular' },
        { name: 'Rojo Beach Bar', note: 'Upscale' },
        { name: 'Palapa Bar', note: 'On the way out from town' },
        { name: 'Secret Beach bars', note: "Coco Loco's, Blue Bayou, Pirate's Not So Secret" },
      ],
    },
    {
      name: 'Beaches',
      items: [{ name: 'Public-access beach', note: 'At every resort front and along many undeveloped stretches' }],
    },
    {
      name: 'Snorkel launches',
      items: [{ name: 'Dive shops', note: 'At Grand Caribe and independent operators along the reef' }],
    },
  ],
};

export const faq: [string, string][] = [
  ['Is the bridge open 24 hours?', 'Yes. Cross freely at any time. Bridge passes are included in every rental.'],
  ['How long is the drive from North Ambergris back into San Pedro Town?', '15 to 25 minutes from most resort addresses, longer from Secret Beach.'],
  ['Can I drive to Bacalar Chico National Park?', 'The road ends before the park boundary. Access is by boat from a small dock north of Costa Blu. Ask locally for current arrangements.'],
  ['Are the north-side roads paved?', 'No. Sand and packed coral. Drive slower, especially in rainy season.'],
];

export const whatsappTemplate = [
  'Hi One Love, I would like a cart delivered on North Ambergris Caye.',
  'Resort or address: ',
  'Gate code / check-in instructions: ',
  'Dates: ',
  'Arriving at San Pedro Airport? Flight number: ',
  'Cart (4-seater or 6-seater): ',
].join('\n');

/** The manual's internal links for this page. */
export const links = {
  secretBeach: 'Secret Beach delivery specifics',
  thingsToDo: 'things to do north of the bridge',
  book: 'reserve for North Ambergris delivery',
  ambergris: 'Ambergris Caye guide',
};
