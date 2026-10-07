/**
 * /things-to-do-ambergris-caye-golf-cart/ copy: Execution Manual §17 (pillar
 * "Things to Do on Ambergris Caye by Golf Cart"), verbatim. Area tags, times
 * and step lists restate the copy; nothing is added. The manual promises
 * "twenty stops" but its copy lists 21; all 21 are shown. Local facts are
 * the manual's and need checking (see the client questions checklist).
 */

export const meta = {
  title: 'Things to Do on Ambergris Caye by Golf Cart | Local Guide',
  description:
    'Twenty things worth driving to on Ambergris Caye. Secret Beach, Truck Stop, snorkel launches, sunset spots, and food stops mapped by golf cart route.',
  h1: 'Things to Do on Ambergris Caye by Golf Cart',
  published: '2026-10-07',
};

export const intro =
  'Ambergris Caye is about 25 miles long and roughly a mile wide at the wide part. You can reach every worthwhile stop on the island by golf cart, and most of them by golf cart alone. This guide lists twenty stops worth the drive, three itineraries built around them, and the routes we recommend to renters who ask us the same question every week: what should we actually do while we are here?';

export const why = {
  h2: 'Why Doing It by Cart Beats Every Alternative',
  body: 'Ambergris Caye is designed around the golf cart. Cars are rare, taxis are limited, bikes cover a fraction of the island, and every restaurant, resort, beach, and dive shop is laid out with cart parking. The cart lets you leave the beach at 3 pm without hunting for a ride, drive north over the Sir Barry Bowen Bridge to Secret Beach and back the same afternoon, and string together restaurant hops that would take three separate taxi fares. Rentals include unlimited bridge passes, and free delivery to your resort or the airport means you never lose vacation time on logistics.',
};

export type Area = 'north' | 'town' | 'south';
export const AREAS: Record<Area, string> = {
  north: 'North of the bridge',
  town: 'San Pedro Town',
  south: 'South along Coconut Drive',
};

export type Stop = { id: string; name: string; area: Area; body: string };

export const stopsH2 = 'The Twenty Stops Worth the Drive';

export const stops: Stop[] = [
  { id: 'secret-beach', name: 'Secret Beach', area: 'north', body: "On the west side of North Ambergris Caye, about 25 minutes north of San Pedro Town by cart. Shallow warm water, sandbars extending 100 yards offshore, and a strip of beach bars (Coco Loco's, Blue Bayou, Pirate's Not So Secret) serving cold beer and grilled seafood. The most-visited north-side destination on the island. Every cart rental includes bridge passes so you can go and come back at will." },
  { id: 'truck-stop', name: 'Truck Stop food park', area: 'north', body: 'A collection of shipping-container restaurants north of the Sir Barry Bowen Bridge. Thai, sushi, burgers, tacos, and cocktails in one open-air food court with pool tables, cornhole, and live music some nights. Cart parking on-site. Best time to visit: sunset, when the food-park crowd peaks and the light hits the water just right.' },
  { id: 'hidden-reef', name: 'Hidden Reef', area: 'north', body: 'A snorkel-accessible stretch of reef north of the bridge, reachable by short boat trip from Grand Caribe or Coco Beach Resort. Not a cart destination by itself; the cart gets you to the launch. Bring a snorkel and fins from town before heading north.' },
  { id: 'bridge', name: 'Sir Barry Bowen Bridge and Boca del Rio', area: 'north', body: 'The single vehicle bridge connecting central Ambergris Caye to the north end. Named for a prominent Belizean businessman. Crossing takes seconds. The Boca del Rio area on the south side of the bridge is worth a stop for the view; several small restaurants sit near the bridge foot.' },
  { id: 'northern-beaches', name: 'Northern beaches', area: 'north', body: "Between the bridge and Bacalar Chico, the west-side beaches run largely undeveloped with a few resorts and residential stretches. Pull-offs along the road let you park and walk down. Bring your own shade; beach chair rentals are not universal north of Coco Loco's." },
  { id: 'palapa-bar', name: 'Palapa Bar', area: 'town', body: "An over-water bar on a dock off the beach north of San Pedro Town. Swim up to the bar directly, or park your cart on Barrier Reef Drive and walk down. Live music most weekends. The bar's dock swings are the most-photographed feature." },
  { id: 'wayos', name: "Wayo's Beach Bar", area: 'south', body: 'South of San Pedro Town along Coconut Drive. Beachfront palapa, live music several nights a week, casual food, and reliably strong drinks. Sunday brunch is a fixture in the expat calendar. Cart parking along the road.' },
  { id: 'estels', name: "Estel's Dine by the Sea", area: 'town', body: 'Barrier Reef Drive, at the north end of downtown San Pedro. The classic island breakfast spot, family-run since the 1970s. Open early. Fry jacks and stewed chicken are the signature order. Small; expect a short wait during peak season.' },
  { id: 'chocolate', name: 'Belize Chocolate Company', area: 'town', body: 'Directly opposite our office at 1 Barrier Reef Drive. Locally-made chocolate, cacao tastings, and a small cafe. Good stop for gifts, souvenirs, or an afternoon break. Cart parking on the street directly outside.' },
  { id: 'central-park', name: 'San Pedro Central Park', area: 'town', body: 'The town square in the middle of San Pedro. Bandstand at the center, benches under the trees, and the Catholic Church on the north side. Community gathering point for Dia de San Pedro, Emancipation Day, and holiday events. Cart parking around the perimeter.' },
  { id: 'fidos', name: "Fido's Courtyard", area: 'town', body: 'An open courtyard with restaurants, bars, and a stage for live music. Middle of San Pedro Town, one block off Barrier Reef Drive. Reliable dinner-and-show combo, especially Friday and Saturday nights. Cart parking on Middle Street.' },
  { id: 'elvis', name: "Elvi's Kitchen", area: 'south', body: "Belizean cuisine, family-owned. Coconut Drive, south of Central Park. Lobster in season, stewed chicken, rice and beans, and Belize's national dish (fry jacks with beans and cheese for breakfast, or a full plate for dinner). Cart parking in front." },
  { id: 'blue-water', name: 'Blue Water Grill', area: 'south', body: 'Beachfront restaurant at the SunBreeze Hotel, one of the most consistent kitchens on the island. Sunday brunch, fresh fish menu, sunset dinner. Cart parking at the SunBreeze lot.' },
  { id: 'house-of-culture', name: 'San Pedro House of Culture', area: 'town', body: 'Small local museum and cultural center on the northern edge of town. Belizean art, historical exhibits, and rotating cultural programming. Free entry. Worth an hour on a rainy afternoon or before an Emancipation Day event.' },
  { id: 'marine-terminal', name: 'Marine Terminal (water taxi dock)', area: 'town', body: 'The main water taxi arrival and departure point in San Pedro. Even if you flew in, worth a stop to see the boats coming and going. Cafes and shops line the terminal.' },
  { id: 'xanadu', name: 'Xanadu Island Resort area', area: 'south', body: 'Just south of San Pedro Town along Coconut Drive. Quiet beach access, sunset views to the west, and a good area for a low-key afternoon away from the town crowds.' },
  { id: 'ramons', name: "Ramon's Village beach", area: 'south', body: 'South of the airport, a wide beach with public-facing access. Beach chairs at the resort, restaurant on-site, and one of the most reliable sunset viewing spots along the south beach.' },
  { id: 'coco-locos', name: "Coco Loco's at Secret Beach", area: 'north', body: 'The most popular of the Secret Beach bars. Open-air, hammocks over the water, seafood platters, and the iconic Coco Loco cocktail. Cart parking directly at the venue.' },
  { id: 'blue-bayou', name: 'Blue Bayou (Secret Beach)', area: 'north', body: "Neighbor to Coco Loco's, quieter vibe, over-water hammocks, and reliable Wi-Fi (rare at Secret Beach). Good afternoon stop between longer beach sessions." },
  { id: 'pirates', name: "Pirate's Not So Secret Beach Bar", area: 'north', body: 'Third of the Secret Beach anchor bars. Themed decor, live music some nights, and swings hung over the water. Cart parking on the roadside.' },
  { id: 'airport-sunset', name: 'The sunset lookout at the airport', area: 'south', body: "The observation deck at San Pedro Airport faces west and gives an unobstructed sunset view over the island's west side. Free access. Park your cart in the airport lot." },
];

export type DayPlan = { label?: string; items: string[] };

export const itineraries = {
  h2: 'Suggested Itineraries',
  // Each body is the manual's paragraph; `plan` restates it as steps, wording unchanged.
  items: [
    {
      h3: 'One perfect day',
      body: "Breakfast at Estel's Dine by the Sea. Cart to Belize Chocolate Company for a quick cacao stop. Beach morning at Ramon's Village. Lunch at Blue Water Grill. Cart over the bridge in early afternoon to Secret Beach for the afternoon. Sunset drink at Coco Loco's. Drive back to town before full dark. Dinner at Fido's Courtyard or Elvi's Kitchen. Nightcap at Palapa Bar.",
      plan: [
        {
          items: [
            "Breakfast at Estel's Dine by the Sea.",
            'Cart to Belize Chocolate Company for a quick cacao stop.',
            "Beach morning at Ramon's Village.",
            'Lunch at Blue Water Grill.',
            'Cart over the bridge in early afternoon to Secret Beach for the afternoon.',
            "Sunset drink at Coco Loco's.",
            'Drive back to town before full dark.',
            "Dinner at Fido's Courtyard or Elvi's Kitchen.",
            'Nightcap at Palapa Bar.',
          ],
        },
      ] as DayPlan[],
    },
    {
      h3: 'One perfect weekend',
      body: "Day one: town day. Estel's for breakfast, San Pedro House of Culture, Central Park, and the beach at SunBreeze. Sunset at the airport observation deck. Dinner at Blue Water Grill. Day two: north day. Early drive over the bridge, breakfast at Coco Loco's, snorkel from Grand Caribe, lunch at Truck Stop, afternoon at Secret Beach, sunset drink at Blue Bayou, dinner back in town at Fido's Courtyard.",
      plan: [
        { label: 'Day one: town day', items: ["Estel's for breakfast, San Pedro House of Culture, Central Park, and the beach at SunBreeze.", 'Sunset at the airport observation deck.', 'Dinner at Blue Water Grill.'] },
        { label: 'Day two: north day', items: ["Early drive over the bridge, breakfast at Coco Loco's, snorkel from Grand Caribe, lunch at Truck Stop, afternoon at Secret Beach, sunset drink at Blue Bayou, dinner back in town at Fido's Courtyard."] },
      ] as DayPlan[],
    },
    {
      h3: 'One perfect week',
      body: "Days one and two above. Day three: dive day. Morning boat from Amigos del Mar to Hol Chan and Shark Ray Alley. Beach afternoon. Dinner at Palapa Bar. Day four: south exploration. Drive south to the Xanadu area and the residential south end, lunch at Wayo's, back to town by sunset. Day five: repeat Secret Beach with a different bar (Pirate's Not So Secret this time). Day six: local day. San Pedro House of Culture, Central Park, dinner at Elvi's Kitchen. Day seven: departure and airport delivery.",
      plan: [
        { label: 'Days one and two', items: ['The weekend above.'] },
        { label: 'Day three: dive day', items: ['Morning boat from Amigos del Mar to Hol Chan and Shark Ray Alley.', 'Beach afternoon.', 'Dinner at Palapa Bar.'] },
        { label: 'Day four: south exploration', items: ["Drive south to the Xanadu area and the residential south end, lunch at Wayo's, back to town by sunset."] },
        { label: 'Day five', items: ["Repeat Secret Beach with a different bar (Pirate's Not So Secret this time)."] },
        { label: 'Day six: local day', items: ["San Pedro House of Culture, Central Park, dinner at Elvi's Kitchen."] },
        { label: 'Day seven', items: ['Departure and airport delivery.'] },
      ] as DayPlan[],
    },
  ],
};

export const sunset = {
  h2: 'Sunset Drive Routes',
  body: 'Route 1: South Coconut Drive. From town, drive south past the airport to the Xanadu area, park at any west-facing pull-off, sunset over the water. About 15 minutes each way. Route 2: North bridge and back. Cross the Sir Barry Bowen Bridge, drive 10 minutes north, park at any west-side pullout, sunset over the mangroves. Return before full dark. Route 3: San Pedro Airport observation deck. West-facing free public view, five minutes from downtown, ideal if the day ran late and you did not leave time for a longer drive.',
  // The three routes from the paragraph above, wording unchanged.
  routes: [
    { name: 'South Coconut Drive', time: '15 min each way', body: 'From town, drive south past the airport to the Xanadu area, park at any west-facing pull-off, sunset over the water. About 15 minutes each way.' },
    { name: 'North bridge and back', time: '10 min past the bridge', body: 'Cross the Sir Barry Bowen Bridge, drive 10 minutes north, park at any west-side pullout, sunset over the mangroves. Return before full dark.' },
    { name: 'San Pedro Airport observation deck', time: '5 min from downtown', body: 'West-facing free public view, five minutes from downtown, ideal if the day ran late and you did not leave time for a longer drive.' },
  ],
};

export const snorkel = {
  h2: 'Snorkel & Dive Launches Reachable by Cart',
  body: 'Amigos del Mar in downtown San Pedro, right on Barrier Reef Drive. Belize Diving Adventures a few blocks south. Ecologic Divers just south of the airport. Chuck & Robbie\'s south along Coconut Drive. Amigos del Mar and the two downtown shops all have cart parking on the street. Coconut Drive shops have on-site parking. Morning boats leave between 8 and 9 am for Hol Chan Marine Reserve and Shark Ray Alley. Bring your own snorkel and fins if you have them; rentals are available but cost adds up over a week.',
  // Restated from the paragraph above.
  shops: [
    { label: 'Amigos del Mar', value: 'Downtown San Pedro, right on Barrier Reef Drive' },
    { label: 'Belize Diving Adventures', value: 'A few blocks south' },
    { label: 'Ecologic Divers', value: 'Just south of the airport' },
    { label: "Chuck & Robbie's", value: 'South along Coconut Drive' },
  ],
};

export const family = {
  h2: 'Family-Friendly Loops',
  body: "Loop A (half day, morning): Belize Chocolate Company (cacao tasting), Central Park (playground and shade), Ramon's Village beach (calm swimming), lunch at Elvi's Kitchen. Home for nap. Loop B (half day, afternoon): SunBreeze beach, ice cream at Palapa Bar, sunset at the airport observation deck. Loop C (full day): Cross the bridge in morning cool, breakfast at Coco Loco's, Secret Beach until 2 pm, drive back with an ice cream stop, home by 4. Both loops fit comfortably on a 4-seater with two adults and two kids.",
  // The three loops from the paragraph above, wording unchanged.
  loops: [
    { name: 'Loop A', when: 'Half day, morning', stops: ['Belize Chocolate Company (cacao tasting)', 'Central Park (playground and shade)', "Ramon's Village beach (calm swimming)", "Lunch at Elvi's Kitchen", 'Home for nap'] },
    { name: 'Loop B', when: 'Half day, afternoon', stops: ['SunBreeze beach', 'Ice cream at Palapa Bar', 'Sunset at the airport observation deck'] },
    { name: 'Loop C', when: 'Full day', stops: ['Cross the bridge in morning cool', "Breakfast at Coco Loco's", 'Secret Beach until 2 pm', 'Drive back with an ice cream stop', 'Home by 4'] },
  ],
  note: 'Both loops fit comfortably on a 4-seater with two adults and two kids.',
};

export const foodie = {
  h2: 'Foodie Loops',
  body: "The classic evening: dinner at Estel's, drinks at Palapa Bar, dessert at Fido's Courtyard. The seafood tour: lobster tail lunch at Blue Water Grill, snapper dinner at Elvi's Kitchen, ceviche late-night at Wayo's. The Belizean cuisine tour: fry jack breakfast at Estel's, rice and beans lunch at Elvi's, stewed chicken dinner at a local spot near Central Park. The Secret Beach food day: breakfast in town, drive north for lunch at Truck Stop, afternoon and grilled seafood at Coco Loco's, back in town for a late nightcap.",
  // The four loops from the paragraph above, wording unchanged.
  loops: [
    { name: 'The classic evening', stops: ["Dinner at Estel's", 'Drinks at Palapa Bar', "Dessert at Fido's Courtyard"] },
    { name: 'The seafood tour', stops: ['Lobster tail lunch at Blue Water Grill', "Snapper dinner at Elvi's Kitchen", "Ceviche late-night at Wayo's"] },
    { name: 'The Belizean cuisine tour', stops: ["Fry jack breakfast at Estel's", "Rice and beans lunch at Elvi's", 'Stewed chicken dinner at a local spot near Central Park'] },
    { name: 'The Secret Beach food day', stops: ['Breakfast in town', 'Drive north for lunch at Truck Stop', "Afternoon and grilled seafood at Coco Loco's", 'Back in town for a late nightcap'] },
  ],
};

export const faq: [string, string][] = [
  ['What is the number-one thing to do on Ambergris Caye?', 'Snorkel or dive at Hol Chan Marine Reserve. It is the most visited attraction in the country and reachable by short boat from any San Pedro dive shop.'],
  ['How long does it take to drive from town to Secret Beach by cart?', '25 to 30 minutes with normal traffic. Add 10 minutes on a rainy-season afternoon.'],
  ['Can you swim at every beach on the island?', 'Most of them. The west-side beaches at Secret Beach are the calmest. East-side beaches have reef about 100 yards offshore that breaks most surf but drop-offs can be sudden; swim between marked flags.'],
  ['Are the restaurants open every day of the year?', 'Most yes, some no. Christmas Day and Good Friday close many kitchens. Confirm with the venue if visiting on either day.'],
  ["Is there a cover charge at Coco Loco's or the other Secret Beach bars?", 'No cover during the day. Some bars charge a small cover on live music nights.'],
  ['Can I take my cart on the dive boat?', 'No. Park your cart at the dive shop lot. Every shop has cart parking.'],
];

/** The manual's internal links for this page. */
export const links = {
  secretBeach: 'Secret Beach delivery from San Pedro Town',
  north: 'North Ambergris Caye zone delivery',
  lobster: 'the great lobster crawl food tour',
  nightFishing: 'night fishing and bioluminescence spots',
  perseid: 'dark-sky drive for stargazing',
  exploring: 'exploring San Pedro Town by cart',
  weekend: 'three-day weekend itinerary',
  book: 'reserve a cart for your itinerary',
  carts: 'pick the right cart for your route',
};
