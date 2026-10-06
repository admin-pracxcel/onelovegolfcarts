/**
 * /ambergris-caye/ copy: Execution Manual §07 (pillar page), verbatim.
 * H2s are the manual's entity-anchored rewrites. Inline links use
 * [[anchor|urlKey]] (components/RichText); anchors follow the manual's
 * "Internal links from this page" list.
 */

export const meta = {
  title: 'Golf Cart Rental Ambergris Caye | Free Delivery | One Love',
  description:
    'Rent a 4 or 6 seater golf cart on Ambergris Caye from $35 a day. Free delivery to your hotel, resort, or the San Pedro Airport. Serving the island since 2017.',
  h1: 'Golf Cart Rental on Ambergris Caye',
};

export const intro =
  'Ambergris Caye is the largest island in Belize, about 25 miles long, less than a mile wide at most points, and reachable from the mainland only by short flight from Belize City Airport (BZE) or by water taxi. Golf carts are the primary vehicle on the island. Cars are rare, the roads are narrow and largely sand-and-crushed-coral above the bridge, and every hotel, restaurant, gas station, grocery store, dive shop, and beach on Ambergris Caye is reachable by cart. One Love Golf Cart Rentals sits at 1 Barrier Reef Drive in San Pedro Town, opposite Belize Chocolate Company, and rents 4-seater and 6-seater gas-powered Club Car golf carts from $35 a day with free delivery anywhere on the island.';

/** Header facts, restated from the intro and rates (no new claims). */
export const facts = [
  { value: '25 miles', label: 'long, less than a mile wide' },
  { value: 'By cart', label: 'every hotel, beach and restaurant' },
  { value: 'Included', label: 'unlimited bridge passes' },
  { value: 'From $35', label: 'a day, delivered free' },
];

export const driving = {
  h2: 'What Driving a Golf Cart on Ambergris Caye Is Actually Like',
  paragraphs: [
    'Speeds top out around 25 miles per hour in San Pedro Town and dip to 15 or 20 on the sandy stretches north of the Sir Barry Bowen Bridge. The three main streets of San Pedro Town are Front Street (formally Barrier Reef Drive), Middle Street (formally Pescador Drive), and Back Street (formally Angel Coral Street). Front Street runs one-way heading south. Middle Street runs one-way heading north. Back Street handles most of the north-south traffic and is where most residents drive. First-time visitors get this backward for about 20 minutes and then the pattern locks in.',
    'North of San Pedro Town, the road becomes the Boca del Rio corridor, crosses the bridge, and turns into a mostly-sand road heading up the west side of the island toward Secret Beach and Truck Stop. Cell service holds for most of the length. Signage is minimal past the bridge. Every rental from One Love comes with a paper map with the useful stops marked, and drivers have our WhatsApp for real-time route questions.',
  ],
  // Cheat sheet restated from the first paragraph.
  streets: [
    { local: 'Front Street', formal: 'Barrier Reef Drive', flow: 'One-way, heading south', dir: 'south' },
    { local: 'Middle Street', formal: 'Pescador Drive', flow: 'One-way, heading north', dir: 'north' },
    { local: 'Back Street', formal: 'Angel Coral Street', flow: 'Most north-south traffic', dir: 'both' },
  ],
  more: { text: 'how to drive a golf cart in San Pedro like a local', key: 'drive-local' },
};

export const family = {
  h2: 'Renting from a Local Family Business on Barrier Reef Drive',
  body: 'The office sits at 1 Barrier Reef Drive, on the east side of the street, directly opposite Belize Chocolate Company. Walking from San Pedro Airport takes about eight minutes. Walking from the Marine Terminal water taxi dock takes about four minutes. The person who answers the WhatsApp is the same person who confirms your booking, and often the same person who delivers your cart. One Love opened in 2017 after the founding family spent years running a grocery shop on Ambergris Caye. The full founding story is on our [[about page|about]].',
};

export const places = {
  h2: 'Where a Golf Cart Takes You: Secret Beach, Truck Stop, and North of the Bridge',
  body: "Everything worth reaching on Ambergris Caye sits on a cart route. Inside San Pedro Town: Belize Chocolate Company, Estel's Dine by the Sea, Wayo's Beach Bar, Fido's Courtyard, Elvi's Kitchen, the San Pedro House of Culture, Central Park, and the entire beachfront strip from the Marine Terminal south to the airport. South of town along Coconut Drive: Mahogany Bay Resort, Victoria House, Belize Yacht Club, Alaia Belize, Ramon's Village, Xanadu Island Resort, and the residential condos. North of the Sir Barry Bowen Bridge: Grand Caribe, Coco Beach Resort, Las Terrazas, Costa Blu, Coco Loco's, Blue Bayou, Palapa Bar, and the long stretch of beach up to Bacalar Chico National Park. Secret Beach and Truck Stop food park sit on the northwestern edge of the island, both reachable on any One Love rental since bridge passes come included.",
  // Areas restated from the paragraph above, for scanning.
  areas: [
    {
      name: 'Inside San Pedro Town',
      stops: ["Belize Chocolate Company", "Estel's Dine by the Sea", "Wayo's Beach Bar", "Fido's Courtyard", "Elvi's Kitchen", 'San Pedro House of Culture', 'Central Park', 'The beachfront strip'],
    },
    {
      name: 'South along Coconut Drive',
      stops: ['Mahogany Bay Resort', 'Victoria House', 'Belize Yacht Club', 'Alaia Belize', "Ramon's Village", 'Xanadu Island Resort'],
    },
    {
      name: 'North of the bridge',
      stops: ['Grand Caribe', 'Coco Beach Resort', 'Las Terrazas', 'Costa Blu', "Coco Loco's", 'Blue Bayou', 'Palapa Bar', 'Secret Beach', 'Truck Stop'],
    },
  ],
  more: [
    { text: 'things to do on Ambergris Caye by golf cart', key: 'things-to-do' },
    { text: 'Ambergris Caye events by golf cart', key: 'events' },
    { text: 'dark-sky drives for stargazing on Ambergris Caye', key: 'perseid' },
  ],
};

export const routes = {
  h2: 'Popular routes',
  cards: [
    {
      title: 'The Secret Beach Route',
      body: "Down Barrier Reef Drive, north to Boca del Rio, over the Sir Barry Bowen Bridge, left on the north road, straight to Coco Loco's. 25 minutes each way.",
      link: 'full Secret Beach route guide',
      key: 'secret-route',
    },
    {
      title: 'The Sunset Drive Route',
      body: 'South from San Pedro Town along Coconut Drive, past the airport, all the way to the residential south end. Turn around by 5:30 pm. Sunset views from any west-facing beach.',
      link: 'full sunset drive route',
      key: 'sunset',
    },
    {
      title: 'The Snorkel Launches Route',
      body: 'Six morning dive-shop pickups mapped: Amigos del Mar, Belize Diving Adventures, Ecologic Divers, and three more. From every San Pedro Town hotel, all reachable by 6:30 am.',
      link: 'full snorkel launches guide',
      key: 'snorkel',
    },
    {
      title: 'The Food-Tour Route',
      body: "Wayo's, Palapa Bar, Estel's Dine by the Sea, Elvi's Kitchen, Truck Stop, plus five more stops. A full day loop or a three-night crawl.",
      link: 'full lobster crawl guide',
      key: 'lobster-crawl',
    },
  ] as const,
};

export const taxi = {
  h2: 'Why a Golf Cart Beats a Taxi or a Bike on Ambergris Caye',
  paragraphs: [
    'Taxis on Ambergris Caye run about $10 to $25 US per trip depending on distance. A single day of taxi use for a family of four visiting a beach south of town, a restaurant in town, and a bar north of the bridge easily runs $60 to $90 in cab fares. The 4-seater rents for $35 a day. The math tips fast, and taxi routes stop working for anyone wanting to be north of the bridge past 10 pm when many cabs stop crossing.',
    'Bikes are cheaper still, and they work for renters who plan to stay in San Pedro Town and never go past the airport. Anyone who plans to reach Secret Beach, do a Coconut Drive resort dinner, or run to the grocery store in the rain gives up on the bike within 48 hours. The cart is the vehicle the island is designed around. Renting the cart matches how the island actually works.',
  ],
  // Figures restated from the paragraphs above.
  compare: [
    { label: 'Taxis, family of four, one day', value: '$60–90', note: '$10 to $25 per trip' },
    { label: '4-seater golf cart, one day', value: '$35', note: 'Free delivery, bridge passes included', highlight: true },
  ],
};

export const uses = {
  h2: 'What People Rent Our Carts For: Weddings, Snorkel Trips, Grocery Runs, Airport Transfers',
  items: [
    { title: 'Weddings.', body: 'Destination weddings on Ambergris Caye routinely rent five to ten of our carts for wedding-party transport between the ceremony and reception venues. The 6-seater carries the wedding party plus the photographer. The 4-seaters carry the family.' },
    { title: 'Snorkel and dive days.', body: 'Renters staying at Grand Caribe or Las Terrazas north of the bridge use their cart to reach Amigos del Mar and other dive shops in town at 6 am for the morning boats. The cart holds fins, masks, and dry bags without complaint.' },
    { title: 'Grocery runs.', body: 'Long-stay renters use the cart to shop at the SuperBuy or Wine de Vine in town twice a week. The under-seat storage takes about six standard grocery bags. The rear well on the 6-seater takes twice that.' },
    { title: 'Airport transfers.', body: 'Families arriving on Tropic Air or Maya Island Air rent the 6-seater for the airport-to-hotel run and then keep the cart for the week. Free delivery to SPR makes this the default for anyone arriving with a group.' },
    { title: 'Restaurant crawls.', body: "Wayo's, Palapa Bar, Estel's, Elvi's, and the Truck Stop food park form the informal restaurant map. Renters build multi-stop nights and use the cart to string them together." },
  ],
};

export const zones = {
  h2: 'Delivery zones on Ambergris Caye',
  intro: 'The office is on Barrier Reef Drive. Delivery times below are typical, not guaranteed, and get faster with 24-hour notice.',
  rows: [
    { zone: 'San Pedro Town hotels', time: '10 to 15 minutes', link: 'See San Pedro Town delivery details', key: 'san-pedro' },
    { zone: 'San Pedro Airport (SPR)', time: '5 to 10 minutes', link: 'San Pedro Airport (SPR) delivery', key: 'spr' },
    { zone: 'Marine Terminal (water taxi)', time: '5 minutes', link: 'See water taxi arrival guide', key: 'water-taxi' },
    { zone: 'South Ambergris resorts (Mahogany Bay, Victoria House, Belize Yacht Club, Alaia)', time: '15 to 25 minutes', link: 'See South Ambergris delivery page', key: 'south' },
    { zone: 'North of the Bridge (Grand Caribe, Coco Beach, Las Terrazas)', time: '30 to 45 minutes', link: 'North Ambergris Caye delivery zone', key: 'north' },
    { zone: 'Secret Beach and Truck Stop', time: '60+ minutes when we deliver, or self-drive from town', link: 'delivery to Secret Beach', key: 'secret-beach' },
  ] as const,
  arrivals: [
    { text: 'Belize City Airport arrivals', key: 'bze' },
    { text: 'how to reach San Pedro from Belize City', key: 'arrival' },
  ] as const,
};

export const booking = {
  h2: 'How to Book a Cart Before You Arrive on Ambergris Caye',
  body: 'Book at least 48 hours before your arrival to guarantee cart availability, and up to 30 days ahead if traveling during peak weeks (December 20 through January 5, Easter week, Costa Maya Festival weekend in August). Fill out the reservation form on our [[book now page|book]] or WhatsApp us at +501-634-9559 with your dates, arrival flight number if applicable, and delivery address. We confirm within about 15 minutes during business hours. Send arrival details 24 hours before you land and we time the delivery to your flight.',
};

export const safety = {
  h2: 'Cart Safety Features and Ambergris Caye Road Conditions',
  body: 'Every One Love cart ships with headlights (front and rear), seat belts on every position, parking brake, windshield wipers, and a canopy. The chassis is aluminum, which handles the salt-air corrosion that steel chassis on the island suffer from. Every cart is inspected before it leaves our lot and re-inspected on return. Road conditions vary. Paved streets in San Pedro Town are in good shape. The Coconut Drive corridor south of the airport is paved and well-maintained. North of the bridge, expect sand, packed coral, and stretches of dirt that turn to mud in rainy season. Drive slower than you think you need to on the north-side roads. Every rental comes with a five-minute walk-around at hand-off covering the specific quirks of the cart you are taking.',
  // Restated from the paragraph above.
  roads: [
    { where: 'San Pedro Town', what: 'Paved, in good shape' },
    { where: 'Coconut Drive, south of the airport', what: 'Paved and well-maintained' },
    { where: 'North of the bridge', what: 'Sand, packed coral, dirt; mud in rainy season' },
  ],
};

export const week = {
  h2: 'The Case for Skipping Taxis and Renting the Full Week',
  body: 'The weekly rate on the 4-seater is $175. That works out to $25 a day averaged across seven days. Two cab trips a day at typical fares cover the daily cost before you factor in what taxis cost on Coconut Drive after sunset or north of the bridge on a Friday. Renters who plan a mix of resort meals, town dinners, Secret Beach days, and airport runs end up saving money on the weekly rental compared with piecing together cab fares, and gain the freedom to leave a beach at 3 pm or a dinner at 11 pm without hunting for a ride.',
};

export const faqTitle = 'Common Questions About Renting on Ambergris Caye';

export const faq: [string, string][] = [
  ['Do I need to book a golf cart in advance for Ambergris Caye?', 'During peak weeks (mid-December to early January, Easter, Costa Maya Festival weekend), yes, book at least two weeks ahead. Off-peak, 48 hours is usually enough. Same-day availability exists but is not guaranteed.'],
  ['What is the golf cart speed limit on Ambergris Caye?', '25 miles per hour in San Pedro Town, lower on the sand roads north of the bridge. Speed limits are enforced by Belize Traffic Police, and fines are payable on the spot.'],
  ['Can two golf carts pass each other on the streets in San Pedro Town?', 'Yes on Barrier Reef Drive and Coconut Drive. Middle Street and Back Street are tight; the standard etiquette is that the cart heading toward the wider stretch yields.'],
  ['Is the bridge to North Ambergris Caye open 24 hours?', 'Yes. Bridge toll is included in every One Love rental via unlimited passes. Cross freely, at any hour.'],
  ['Can I drive a golf cart on the beach?', 'No. Belize law restricts carts to designated roads. Driving on the beach damages the sand ecosystem and results in fines. Every legal route to a beach stops at a parking area near the beach.'],
  ['What happens if I get a flat tire on the way to Secret Beach?', 'Message our WhatsApp. Roadside support reaches you within about 45 minutes on the north side. Swap or repair on the spot.'],
  ['Is there parking at Secret Beach for golf carts?', "Yes. Every bar and restaurant at Secret Beach has cart parking. Coco Loco's, Blue Bayou, and Pirate's Not So Secret all offer parking directly at the venue."],
  ['Can I return the cart at San Pedro Airport when I fly out?', 'Yes. Drop the cart at the airport at the time you send us the day before. We collect the keys and confirm return by WhatsApp.'],
];

export const moneyLinks = [
  { text: 'rental rates for the island', key: 'rates' },
  { text: 'see the 4-seater and 6-seater options', key: 'carts' },
] as const;
