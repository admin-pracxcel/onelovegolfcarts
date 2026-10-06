/**
 * /delivery-to-secret-beach/ copy: Execution Manual §17 (location pages),
 * verbatim. No real Secret Beach photos exist yet; images show real One Love
 * carts and are not captioned as Secret Beach.
 */

export const meta = {
  title: 'Golf Cart Delivery to Secret Beach, Ambergris Caye',
  description:
    'Renting a golf cart to reach Secret Beach on North Ambergris Caye. Free delivery, unlimited bridge passes, and directions from San Pedro Town to Secret Beach.',
  h1: 'Golf Cart Delivery for Secret Beach, Ambergris Caye',
};

export const intro =
  'Secret Beach sits on the west side of North Ambergris Caye, about seven miles north of San Pedro Town and about 25 minutes by golf cart. Every One Love rental includes unlimited passes over the Sir Barry Bowen Bridge to reach it. This page covers the drive, what to expect when you get there, and how to have a cart ready in San Pedro before you start out.';

/** Header facts, restated from the copy. */
export const facts = [
  { value: '~7 miles', label: 'north of San Pedro Town' },
  { value: '20–25 min', label: 'by golf cart' },
  { value: 'Included', label: 'unlimited bridge passes' },
  { value: 'Free', label: 'no entry fee at the beach' },
];

export const what = {
  h2: 'What Secret Beach is',
  body: "Secret Beach is a west-facing stretch of shallow water and sandbars on the far northwest side of Ambergris Caye. The water is warm, chest-deep for a long way out, and sandy underfoot. A cluster of beach bars including Coco Loco's, Blue Bayou, and Pirate's Not So Secret sit along the shore serving cold beer, grilled seafood, and rum drinks. Reaching Secret Beach requires crossing the Sir Barry Bowen Bridge to North Ambergris Caye. The bridge toll is included in every One Love rental as unlimited passes.",
  bars: ["Coco Loco's", 'Blue Bayou', "Pirate's Not So Secret"],
  traits: ['West-facing, sunset side', 'Warm, shallow water', 'Chest-deep a long way out', 'Sandy underfoot'],
};

export const drive = {
  h2: 'How the drive works',
  body: 'Start at our office on Barrier Reef Drive. Head north through San Pedro Town, past the northern end of Barrier Reef Drive where it becomes the road toward Boca del Rio. Cross the Sir Barry Bowen Bridge. Turn left immediately after the bridge and follow the sand road west and north. About 20 to 25 minutes total from town depending on road conditions. In rainy season the last stretch turns muddy; drive slower. Every rental comes with a paper map with the route marked.',
  // Route restated from the paragraph above.
  route: [
    { place: 'Start', step: 'One Love office, Barrier Reef Drive', time: '' },
    { place: 'Town', step: 'North through San Pedro Town toward Boca del Rio', time: '' },
    { place: 'Bridge', step: 'Cross the Sir Barry Bowen Bridge', time: 'Pass included' },
    { place: 'North side', step: 'Turn left, follow the sand road west and north', time: 'Slower in rainy season' },
    { place: 'Secret Beach', step: 'Park at a beach bar', time: '20–25 min total' },
  ],
};

export const delivery = {
  h2: 'How delivery works',
  body: 'Two options. Option one: pick up the cart in town and drive yourself. This is the fastest and what most renters do. You get the cart in San Pedro Town at your hotel or the airport, drive north when you are ready. Option two: we deliver directly to Secret Beach. This takes about an hour of drive time and is only offered for multi-day rentals where the extra shuttle logistics make sense. Message us if you want to explore the direct-delivery option and we will confirm timing and any surcharge.',
  // Options restated from the paragraph above.
  options: [
    {
      title: 'Pick up in town, drive yourself',
      tag: 'What most renters do',
      points: ['Cart delivered to your hotel or the airport', 'Fastest option', 'Drive north when you are ready'],
    },
    {
      title: 'Delivered to Secret Beach',
      tag: 'Multi-day rentals only',
      points: ['About an hour of drive time', 'Message us to confirm timing', 'Any surcharge confirmed up front'],
    },
  ],
};

export const there = {
  h2: 'What to do when you get there',
  body: "Park at one of the beach bars (Coco Loco's has the most parking; Blue Bayou and Pirate's Not So Secret both have their own lots). Order a drink and lunch. Swim, sandbar-walk, take photos on the over-water swings, watch the sunset if you time it right. Bathrooms are at each bar. Wi-Fi is available at Blue Bayou. Bring cash; some bars accept cards but the connection is unreliable. A day at Secret Beach usually runs $30 to $60 US per person on food and drinks.",
  // Practical points restated from the paragraph above.
  tips: [
    { label: 'Parking', value: "Coco Loco's has the most; Blue Bayou and Pirate's Not So Secret have their own lots" },
    { label: 'Bathrooms', value: 'At each bar' },
    { label: 'Wi-Fi', value: 'At Blue Bayou' },
    { label: 'Money', value: 'Bring cash; card connections are unreliable' },
    { label: 'Budget', value: '$30 to $60 US per person on food and drinks' },
  ],
};

export const faq: [string, string][] = [
  ['Is Secret Beach still secret?', 'Not really. It is the most-visited north-side destination on Ambergris Caye. Weekdays are calmer than weekends.'],
  ['How long is the drive from San Pedro to Secret Beach by cart?', '20 to 25 minutes in normal conditions. Up to 35 minutes on a muddy rainy-season afternoon.'],
  ['Is there an entry fee at Secret Beach?', 'No. The beach itself is free. Bars and restaurants charge for food and drinks.'],
  ['Is Secret Beach safe to swim?', 'Yes. Water is shallow and calm, no strong currents, no drop-offs near shore. Watch for boats near the sandbar.'],
  ['Can I drive back to town after dark from Secret Beach?', 'Yes with headlight check before you leave and slower speeds on the sand roads. Two carts driving in convoy is safer than one alone.'],
];

export const whatsappTemplate = [
  'Hi One Love, I would like a cart for a Secret Beach trip.',
  'Dates: ',
  'Hotel / delivery address in San Pedro: ',
  'Passengers: ',
  'Cart (4-seater or 6-seater): ',
  'Interested in direct delivery to Secret Beach (multi-day only)? Yes / No',
].join('\n');

/** The manual's internal links for this page. */
export const links = {
  north: 'North Ambergris Caye delivery zone',
  thingsToDo: 'things to do on Ambergris Caye by cart',
  book: 'reserve a cart for Secret Beach',
  sixSeater: '6-seater for a Secret Beach group day',
  ambergris: 'Ambergris Caye guide',
};
