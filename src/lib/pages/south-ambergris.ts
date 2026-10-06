/**
 * /south-ambergris-caye-cart-delivery/ copy: Execution Manual §17
 * (location pages), verbatim.
 */

import { urls } from '@/lib/business';

export const meta = {
  title: 'South Ambergris Caye Golf Cart Delivery | One Love',
  description:
    'Golf cart delivery to resorts, condos, and residential addresses south of San Pedro Town. Free delivery to Mahogany Bay, Victoria House, Belize Yacht Club, and more.',
  h1: 'Golf Cart Delivery on South Ambergris Caye',
};

export const intro =
  'South Ambergris Caye stretches from San Pedro Airport south along Coconut Drive, passing Mahogany Bay Resort, Victoria House, Belize Yacht Club, Alaia Belize, and quieter residential condos. We deliver golf carts to every resort address south of town, hand off at your unit, and pick up at the end of your rental.';

/** Header facts, restated from the copy. */
export const facts = [
  { value: 'Every resort', label: 'south of town, along Coconut Drive' },
  { value: '10–25 min', label: 'typical delivery from our office' },
  { value: 'At your unit', label: 'hand-off and pickup' },
  { value: 'From $35', label: 'a day, 4-seater' },
];

export const what = {
  h2: 'What South Ambergris Caye is',
  body: "South Ambergris Caye covers everything from San Pedro Airport south along Coconut Drive to the southern tip of the island. The area holds most of the established resorts (Ramon's Village, SunBreeze Hotel, Mahogany Bay Resort, Victoria House, Belize Yacht Club, Alaia Belize, Xanadu Island Resort), residential condos, quieter beaches, and the Belize Diving Adventures and Ecologic Divers shops. Roads are paved along Coconut Drive as far as the main resort strip.",
  zone: [
    { label: 'From', value: 'San Pedro Airport' },
    { label: 'To', value: 'The southern tip of the island' },
    { label: 'Roads', value: 'Paved along Coconut Drive as far as the main resort strip' },
  ],
};

export const delivery = {
  h2: 'How delivery works',
  body: "Send us the resort name and your check-in time. Typical delivery time from our office to Ramon's Village or SunBreeze: 10 to 15 minutes. To Mahogany Bay: 15 to 20 minutes. To Victoria House, Belize Yacht Club, Alaia Belize, or Xanadu: 20 to 25 minutes. If you are landing at SPR and staying south, meeting you at the airport (five minutes from the terminal) is often the easiest arrangement; ask us either way and we make it work.",
  // Times restated from the paragraph above.
  times: [
    { to: 'San Pedro Airport (SPR)', time: '5 min', note: 'Often the easiest if you are landing and staying south' },
    { to: "Ramon's Village, SunBreeze", time: '10–15 min' },
    { to: 'Mahogany Bay', time: '15–20 min' },
    { to: 'Victoria House, Belize Yacht Club, Alaia Belize, Xanadu', time: '20–25 min' },
  ],
};

export const south = {
  h2: "What's on the south side",
  body: "Resorts as listed above. Restaurants: Elvi's Kitchen (Coconut Drive south of Central Park, Belizean classic), Wayo's Beach Bar (further south, casual, live music), Blue Water Grill at SunBreeze, and the resort dining rooms at Mahogany Bay and Victoria House. Beaches: quieter than town beaches, with public access at Ramon's Village, SunBreeze, and further south. Dive shops: Belize Diving Adventures and Ecologic Divers along Coconut Drive. Sunset spots: any west-facing pull-off along Coconut Drive past the airport.",
  // Categories restated from the copy above.
  groups: <{ name: string; items: { name: string; note: string; href?: string }[] }[]>[
    {
      name: 'Resorts',
      items: [
        { name: "Ramon's Village", note: '' },
        { name: 'SunBreeze Hotel', note: '' },
        { name: 'Mahogany Bay Resort', note: '', href: urls['mahogany-bay'] },
        { name: 'Victoria House', note: '', href: urls['victoria-house'] },
        { name: 'Belize Yacht Club', note: '', href: urls['belize-yacht-club'] },
        { name: 'Alaia Belize', note: '', href: urls['alaia'] },
        { name: 'Xanadu Island Resort', note: '' },
      ],
    },
    {
      name: 'Restaurants',
      items: [
        { name: "Elvi's Kitchen", note: 'Belizean classic' },
        { name: "Wayo's Beach Bar", note: 'Casual, live music' },
        { name: 'Blue Water Grill', note: 'At SunBreeze' },
        { name: 'Resort dining rooms', note: 'Mahogany Bay and Victoria House' },
      ],
    },
    {
      name: 'Beaches and dive shops',
      items: [
        { name: 'Quieter beaches', note: "Public access at Ramon's Village, SunBreeze and further south" },
        { name: 'Belize Diving Adventures', note: 'Along Coconut Drive' },
        { name: 'Ecologic Divers', note: 'Along Coconut Drive' },
      ],
    },
    {
      name: 'Sunset spots',
      items: [{ name: 'West-facing pull-offs', note: 'Anywhere along Coconut Drive past the airport' }],
    },
  ],
};

export const faq: [string, string][] = [
  ["How long from Ramon's Village to San Pedro Town?", '10 minutes by cart on Coconut Drive.'],
  ['Is Coconut Drive paved all the way to the south end?', 'Paved through the main resort strip. Beyond Mahogany Bay it becomes packed coral. Passable by any cart.'],
  ["Can I drive south from my resort to Elvi's Kitchen for dinner?", "Yes. Elvi's has cart parking, Coconut Drive is well-lit for the return drive."],
  ['Do you deliver to Xanadu Island Resort?', 'Yes. About 20 minutes from our office. Send the check-in time and we deliver to the resort front desk.'],
];

export const whatsappTemplate = [
  'Hi One Love, I would like a cart delivered on South Ambergris Caye.',
  'Resort: ',
  'Check-in date and time: ',
  'Arriving at San Pedro Airport? Flight number: ',
  'Passengers: ',
  'Cart (4-seater or 6-seater): ',
].join('\n');

/** The manual's internal links for this page. */
export const links = {
  spr: 'San Pedro Airport pickup',
  book: 'reserve for South Ambergris delivery',
  thingsToDo: 'things to do south of town',
  deepSouth: 'the deep south expedition',
};
