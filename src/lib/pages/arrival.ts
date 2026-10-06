/**
 * /getting-to-san-pedro-belize-arrival-guide/ copy: Execution Manual §17
 * (pillar: "How to Get to San Pedro, Belize"), verbatim. Fares, schedules and
 * immigration details are third-party facts that change; VERIFY before launch.
 * Cards, matrices and figures restate the copy; nothing is added.
 */

export const meta = {
  title: 'How to Get to San Pedro, Belize | Flight, Water Taxi, Arrival',
  description:
    'Complete arrival guide to San Pedro on Ambergris Caye. Flight from Belize City, water taxi, connections, timing, and how to have a golf cart waiting at the airport.',
  h1: 'How to Get to San Pedro, Belize',
  published: '2026-10-06',
};

export const intro =
  'Every visitor to San Pedro arrives one of three ways: a 15-minute Tropic Air or Maya Island Air flight from Belize City airport, an 80-minute water taxi from downtown Belize City, or a private charter. This guide walks through the trade-offs, the real costs, the schedule catches most first-timers hit, and how to have a golf cart waiting at the airport or the water taxi terminal so you skip the taxi line and drive straight to your hotel.';

export const ways = {
  h2: 'The Three Ways to Reach San Pedro',
  body: 'San Pedro sits on Ambergris Caye, a 25-mile-long island off the coast of Belize. There is no bridge to the mainland. Every visitor arrives by air, by water taxi, or by private charter. Domestic flight from Belize City takes 15 minutes and costs around $80 US round trip. Water taxi from downtown Belize City takes 75 to 90 minutes and costs about $35 US round trip. Private charter runs from a few hundred dollars for a boat to over a thousand for a private plane. Each option has trade-offs on time, cost, luggage handling, and seasickness risk. Full breakdowns below.',
  // Restated from the paragraph above.
  cards: [
    { id: 'flight', name: 'Domestic flight', from: 'From Belize City Airport (BZE)', time: '15 min', cost: 'Around $80 US round trip' },
    { id: 'water-taxi', name: 'Water taxi', from: 'From downtown Belize City', time: '75–90 min', cost: 'About $35 US round trip' },
    { id: 'charter', name: 'Private charter', from: 'Boat or plane', time: '', cost: 'A few hundred dollars for a boat to over a thousand for a private plane' },
  ],
};

export type Block = { h3: string; body: string };

export const flight: { h2: string; blocks: Block[] } = {
  h2: 'Option 1: Domestic Flight from Belize City (BZE) to San Pedro (SPR)',
  blocks: [
    { h3: 'Tropic Air', body: 'Tropic Air operates roughly hourly flights between Belize City Airport (BZE) and San Pedro Airport (SPR) from 7 am to 6 pm daily. Fleet is Cessna Grand Caravan turboprops seating 12 to 14 passengers. Round-trip fares run $80 to $110 US depending on season and how far in advance you book. Book at tropicair.com or through your travel agent.' },
    { h3: 'Maya Island Air', body: 'Maya Island Air runs a similar schedule with similar aircraft and comparable fares. Both airlines are safe, both are on-time to within 15 minutes almost always, and both fly from the same terminal at BZE. Book at mayaislandair.com. Which you pick usually comes down to schedule availability at your arrival window.' },
    { h3: 'Cost', body: "Round-trip fare $80 to $110 US per adult. Children under 2 fly free on a parent's lap; children 2 to 11 pay a reduced fare (about 75% of the adult fare). Weight-based luggage fees apply beyond the base allowance (see the luggage section below)." },
    { h3: 'Duration', body: 'Flight time 12 to 15 minutes. Boarding starts 20 minutes before scheduled departure. Total gate-to-gate time is about 45 minutes from arrival at BZE domestic terminal to bags in hand at SPR.' },
    { h3: 'Luggage limits', body: 'Base allowance is 30 pounds checked plus a small carry-on. Overage runs $1 to $2 US per pound. Oversized items (surfboards, dive equipment cases, wedding dress boxes) need advance clearance and sometimes a separate cargo flight; call the airline directly.' },
    { h3: 'Booking and connection timing', body: 'Book at least 24 hours ahead in high season; same-day availability exists but is not guaranteed. Allow at least 90 minutes between your international arrival at BZE and your domestic departure to San Pedro to clear immigration and customs. Two hours is safer.' },
  ],
};

export const waterTaxi: { h2: string; blocks: Block[] } = {
  h2: 'Option 2: Water Taxi from Belize City',
  blocks: [
    { h3: 'San Pedro Belize Express', body: 'The larger of the two water taxi operators. Departs the Marine Terminal in downtown Belize City about six times a day. Fares $30 to $40 US round trip. Boats seat 60 to 100 passengers indoors and outdoors. Book at belizewatertaxi.com or in person at the terminal.' },
    { h3: 'Ocean Ferry Belize', body: 'Second operator, smaller fleet, comparable schedule. Fares similar. Same terminal in Belize City, same Marine Terminal in San Pedro. Book at oceanferrybelize.com or in person.' },
    { h3: 'Cost', body: 'Round-trip fare $30 to $40 US per adult. Children pay a reduced fare. Two large checked bags typically included; additional bags may incur a small fee.' },
    { h3: 'Duration', body: '75 to 90 minutes each way, depending on sea conditions. Add 30 minutes at each end for terminal arrival, boarding, and disembarkation. Total door-to-door from downtown Belize City to your San Pedro hotel: about 2.5 to 3 hours.' },
    { h3: 'Schedule and seasickness', body: 'First boat around 8 am, last boat around 5:30 pm. Seas are calmest in the morning; the afternoon crossing can get bumpy in windy season (November to February). If you get seasick easily, take the morning boat, sit in the middle of the vessel, and skip the coffee before boarding.' },
  ],
};

export const charter: { h2: string; blocks: Block[] } = {
  h2: 'Option 3: Private Charter',
  blocks: [
    { h3: 'When it makes sense', body: 'A private charter (plane or boat) makes sense for groups arriving at BZE outside the domestic flight window (after 6 pm), for parties too large for a scheduled flight without splitting, for wedding parties needing to arrive together, or for anyone with schedule flexibility they value more than the fare difference.' },
    { h3: 'Cost range', body: 'Private plane charter from BZE to SPR: $500 to $900 US for the aircraft (not per person), split among the group. Private boat charter from Belize City to San Pedro: $400 to $700 US for the boat, up to 6 to 10 passengers. Book through Tropic Air (charter desk), Maya Island Air (charter desk), or Belize charter boat companies at least 48 hours ahead.' },
  ],
};

export const choose = {
  h2: 'Which to Choose',
  // The manual's paragraph, split by traveler profile. Wording unchanged.
  rows: [
    { who: 'Solo traveler or couple, arriving during flight hours', pick: 'Fly', why: 'Fastest, easiest, only 15 minutes airborne.' },
    { who: 'Family of four with luggage and school-age kids', pick: 'Fly or water taxi', why: 'Fly if the connection window permits, water taxi if you have hours to kill or if you want the boat ride as part of the experience.' },
    { who: 'Groups of six or more with heavy luggage', pick: 'Charter or two water taxis', why: 'Consider a private charter or split into two water taxis.' },
    { who: 'Anyone arriving after 6 pm at BZE', pick: 'Overnight or sunset boat', why: 'Overnight in Belize City and fly first thing, or take the sunset water taxi if the schedule aligns.' },
    { who: 'Anyone prone to seasickness', pick: 'Fly', why: '' },
  ],
};

export const bze = {
  h2: 'Connecting from an International Flight into BZE',
  body: 'International flights land at Belize City Airport (BZE, formal name Philip S.W. Goldson International Airport), about 10 miles northwest of downtown Belize City. Deplane, walk into the terminal, clear immigration (line time varies from 5 minutes to 45 minutes depending on the arrival wave), collect your checked bags, and pass through customs. Then either walk across the terminal to the domestic gates (about 3 minutes) for your Tropic Air or Maya Island Air flight to San Pedro, or grab a taxi to the downtown water taxi terminal (about 25 minutes, $25 US flat fare). Allow at least 90 minutes total between international arrival and domestic departure; 2 hours is safer on peak arrival days.',
  // Restated from the paragraph above.
  journey: [
    { place: 'BZE', step: 'Deplane, clear immigration', time: '5–45 min' },
    { place: 'Customs', step: 'Collect checked bags, pass through customs', time: '' },
    { place: 'Domestic gates', step: 'Walk across the terminal to your Tropic Air or Maya Island Air flight', time: '3 min' },
  ],
  waterTaxi: 'Or grab a taxi to the downtown water taxi terminal: about 25 minutes, $25 US flat fare.',
};

export const baggage = {
  h2: 'Baggage on Domestic Flights',
  body: 'Tropic Air and Maya Island Air both use small aircraft with tight weight budgets. Base allowance is around 30 pounds of checked luggage plus a small carry-on. Overage runs $1 to $2 US per pound. Oversized items (surfboards, dive tanks, oversized wedding boxes) require advance notice and sometimes a separate cargo flight. If you are traveling with more than the base allowance, call the airline the day before or use the water taxi instead.',
};

export const spr = {
  h2: 'What Actually Happens When You Land at SPR',
  body: 'SPR is a small airport. The terminal is a single-story building with a baggage area, a small bar and gift shop, and a taxi stand outside. You deplane on the tarmac, walk about 30 yards to the terminal, and collect checked bags from a single carousel. From there you exit through a single door onto Coconut Drive. Cart delivery meets you at this door; message us your arrival time and we are waiting with keys in hand. If you booked a taxi to a resort, the taxi stand is 20 feet outside the terminal exit.',
};

export const cart = {
  h2: 'Getting a Golf Cart Waiting on Arrival',
  how: {
    h3: 'How airport delivery works',
    body: 'Send us your arrival flight number by WhatsApp at least 24 hours before you land. We track the flight, we arrive at the SPR terminal about 10 minutes before you land, and we meet you at the terminal exit door with the keys, the rental agreement, and a five-minute walkthrough of the cart. Hand-off takes under five minutes. You drive off toward your hotel.',
  },
  timing: {
    h3: 'How to time the request',
    body: 'Book the cart at least 48 hours in advance. Send your flight number 24 hours before landing. If your flight moves (delay or reschedule), send us the update as soon as you know. We adjust the delivery time and you never wait at the airport.',
  },
  need: {
    h3: 'What we need to know',
    body: 'Full name of the primary driver. Arrival flight number and airline (Tropic Air or Maya Island Air). Number of passengers. Cart preference (4-seater or 6-seater). Delivery target beyond the airport if you want us to escort you to your hotel. Return date and time so we can pre-schedule the pickup.',
    items: [
      'Full name of the primary driver',
      'Arrival flight number and airline (Tropic Air or Maya Island Air)',
      'Number of passengers',
      'Cart preference (4-seater or 6-seater)',
      'Delivery target beyond the airport if you want us to escort you to your hotel',
      'Return date and time so we can pre-schedule the pickup',
    ],
  },
  // Restated from the two blocks above; also the HowTo schema steps.
  steps: [
    { when: '48 hours before', what: 'Book the cart at least 48 hours in advance.' },
    { when: '24 hours before', what: 'Send your arrival flight number by WhatsApp at least 24 hours before you land.' },
    { when: 'If your flight moves', what: 'Send us the update as soon as you know. We adjust the delivery time.' },
    { when: 'On landing', what: 'We meet you at the terminal exit door with the keys, the rental agreement, and a five-minute walkthrough of the cart.' },
  ],
};

export const marine = {
  h2: 'Getting from Water Taxi Terminal to Your Hotel',
  body: 'The Marine Terminal in San Pedro is a two-minute walk from the center of San Pedro Town and about four minutes from our office on Barrier Reef Drive. Cart delivery to the terminal works the same as airport delivery: send us your ferry schedule the day before, and we meet you at the dock. Taxi to any hotel is $5 to $15 US depending on distance. Walking to a downtown hotel is often faster than waiting for a taxi.',
  // Restated from the paragraph above.
  tips: [
    { label: 'Town centre', value: 'A two-minute walk' },
    { label: 'Our office', value: 'About four minutes, on Barrier Reef Drive' },
    { label: 'Cart delivery', value: 'Send your ferry schedule the day before; we meet you at the dock' },
    { label: 'Taxi', value: '$5 to $15 US to any hotel, depending on distance' },
  ],
};

export const practical = {
  h2: 'Currency, Immigration, Local SIM',
  body: 'Belize dollars (BZD) are pegged 2-to-1 to US dollars. US dollars are accepted everywhere on Ambergris Caye. Change is often given in a mix of both. Immigration at BZE gives you a 30-day tourist stamp on arrival; extend at the Immigration Department in Belize City if you plan to stay longer. Local SIM cards are available from Digi and Smart at BZE, at the water taxi terminal, and at every convenience store on Ambergris Caye. A basic 30-day plan with local calls and 5 GB of data runs about $25 US.',
  // The paragraph above, split by topic. Wording unchanged.
  cards: [
    { name: 'Currency', figure: '2 : 1', body: 'Belize dollars (BZD) are pegged 2-to-1 to US dollars. US dollars are accepted everywhere on Ambergris Caye. Change is often given in a mix of both.' },
    { name: 'Immigration', figure: '30 days', body: 'Immigration at BZE gives you a 30-day tourist stamp on arrival; extend at the Immigration Department in Belize City if you plan to stay longer.' },
    { name: 'Local SIM', figure: '~$25 US', body: 'Local SIM cards are available from Digi and Smart at BZE, at the water taxi terminal, and at every convenience store on Ambergris Caye. A basic 30-day plan with local calls and 5 GB of data runs about $25 US.' },
  ],
};

export const faq: [string, string][] = [
  ['How much does it cost to get from Belize City to San Pedro?', 'Round-trip flight $80 to $110 US per person. Round-trip water taxi $30 to $40 US per person. Both add taxi or shuttle time from your international arrival gate at BZE to the departure terminal.'],
  ['Is it faster to fly or take the water taxi?', 'Fly. 12 to 15 minutes airborne versus 75 to 90 minutes by boat. Adding gate transitions, flight still wins by an hour or more.'],
  ['Can I check my luggage all the way through to San Pedro on Tropic Air?', 'Depends on your international airline. Some (American, Delta) can check through to SPR. Ask at your origin airport.'],
  ['What if my international flight is delayed and I miss the last domestic flight?', "Overnight in Belize City and fly first thing. Several hotels near BZE handle exactly this situation; ask the domestic carrier's counter for a recommendation."],
  ['Do I need a return ticket to enter Belize?', 'Yes. Immigration at BZE requires proof of onward travel. A return flight or a documented tour continuing to another country satisfies this.'],
  ['Can I bring dive gear on a Tropic Air flight?', 'Yes with advance notice and possibly additional weight fees. Dive tanks (empty only) usually travel as regular checked baggage. Call the airline 48 hours ahead.'],
];

export const whatsappTemplate = [
  'Hi One Love, I would like a cart waiting when I arrive in San Pedro.',
  'Primary driver full name: ',
  'Arrival flight number and airline (or ferry time): ',
  'Number of passengers: ',
  'Cart (4-seater or 6-seater): ',
  'Escort to hotel? Hotel name: ',
  'Return date and time: ',
].join('\n');

/** The manual's internal links for this page. */
export const links = {
  bze: 'golf cart delivery from Belize City Airport connections',
  spr: 'San Pedro Airport (SPR) golf cart pickup',
  book: 'book a cart for your arrival day',
  ambergris: 'Ambergris Caye golf cart guide',
  sixSeater: '6-seater cart for airport arrivals with luggage',
  contact: 'message us with your arrival flight number',
};
