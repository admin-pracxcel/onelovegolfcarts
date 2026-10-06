/**
 * /rentals-at-belize-city-airport/ copy: Execution Manual §17 (location
 * pages), verbatim. One Love does not deliver at BZE (mainland); the page is
 * about having a cart waiting at SPR after the domestic connection.
 */

export const meta = {
  title: 'Golf Cart from Belize City Airport to San Pedro | One Love',
  description:
    'Flying into Belize City Airport (BZE) then connecting to San Pedro? Have a golf cart waiting at San Pedro Airport (SPR) when you land. Free delivery, WhatsApp confirmation.',
  h1: 'Belize City Airport Connections and Golf Cart Pickup in San Pedro',
};

export const intro =
  'Belize City Airport (IATA code BZE, formally Philip S.W. Goldson International) sits on the mainland about 10 miles northwest of downtown Belize City. Most visitors to San Pedro connect from BZE to SPR on Tropic Air or Maya Island Air, a flight of about 15 minutes. We meet you at the SPR terminal with your golf cart ready. Send us your BZE arrival flight and your connecting flight, and we time the delivery to your San Pedro landing.';

/** Header facts, restated from the intro and sections. */
export const facts = [
  { value: 'BZE → SPR', label: 'about a 15-minute flight' },
  { value: '90 min', label: 'minimum connection to allow' },
  { value: 'At SPR', label: 'your cart waits at the terminal' },
  { value: 'Free', label: 'delivery, WhatsApp confirmation' },
];

export const connection = {
  h2: 'How the connection actually works',
  body: 'Land at BZE. Clear immigration (5 to 45 minutes depending on the arrival wave). Collect checked bags. Pass through customs. Walk across the terminal to the domestic gates (three-minute walk). Board your Tropic Air or Maya Island Air flight to SPR. Fly 12 to 15 minutes. Deplane at SPR, walk 30 yards to the small terminal, collect any checked bags from the single carousel, walk out the exit door onto Coconut Drive. Our cart is there with keys. Total elapsed time from BZE landing to keys in hand at SPR: usually 90 minutes on a smooth arrival, up to two hours on a busy arrival wave.',
  // Journey restated from the paragraph above.
  journey: [
    { place: 'BZE', step: 'Land and clear immigration', time: '5–45 min' },
    { place: 'BZE', step: 'Bags and customs', time: '' },
    { place: 'BZE', step: 'Walk to the domestic gates', time: '3 min' },
    { place: 'In the air', step: 'Tropic Air or Maya Island Air to SPR', time: '12–15 min' },
    { place: 'SPR', step: 'Exit onto Coconut Drive: keys in hand', time: '' },
  ],
  total: 'Usually 90 minutes from BZE landing to keys in hand; up to two hours on a busy arrival wave.',
};

export const allow = {
  h2: 'How much time to allow between international and domestic',
  body: 'Minimum 90 minutes between your international arrival at BZE and your domestic departure to SPR. Two hours is safer during peak arrival waves (mid-morning international flights from the US land in clusters). If you have less than 90 minutes, take the water taxi from downtown Belize City instead; it runs later into the evening and does not depend on the domestic flight schedule.',
};

export const send = {
  h2: 'What to send us before you fly',
  body: 'Two flight numbers this time: the international flight into BZE and the connecting domestic flight to SPR. Send both by WhatsApp at least 24 hours before you fly. We monitor both. If your international flight is delayed and you miss the planned domestic, message us with the new domestic flight number as soon as you know and we re-time delivery.',
  checklist: ['International flight into BZE', 'Connecting flight to SPR', 'Arrival date', 'Primary driver and passenger count', '4-seater or 6-seater'],
  whatsappTemplate: [
    'Hi One Love, cart pickup at San Pedro Airport (SPR) after a Belize City (BZE) connection.',
    'International flight into BZE: ',
    'Connecting flight to SPR (Tropic Air / Maya Island Air): ',
    'Arrival date: ',
    'Primary driver (as on license): ',
    'Passengers: ',
    'Cart (4-seater or 6-seater): ',
    'Return date and time: ',
  ].join('\n'),
};

export const missed = {
  h2: 'What to do if you miss the last domestic flight',
  body: 'The last domestic flight to SPR usually leaves around 6 pm. If your international arrival puts you past that window, two options: overnight in Belize City and fly first thing (several hotels near BZE, ask the airline counter for a recommendation), or take the last water taxi from downtown Belize City if the schedule permits. Message us the plan and we time the cart delivery to your rescheduled arrival, whether that is the next morning at SPR or an afternoon boat at the Marine Terminal in San Pedro.',
  // Options restated from the paragraph above.
  options: [
    { title: 'Overnight in Belize City', body: 'Fly first thing in the morning. We meet you at SPR.' },
    { title: 'Last water taxi', body: 'If the schedule permits. We meet you at the Marine Terminal in San Pedro.' },
  ],
};

export const which = {
  h2: 'Which cart for a connecting arrival',
  body: 'Same guidance as any airport arrival: 4-seater for two adults with modest luggage, 6-seater for families or groups with checked-bag loads. International arrivals often bring more luggage than domestic-only trips, so lean toward the 6-seater if you are on the fence.',
};

export const faq: [string, string][] = [
  ['Can you meet me at BZE instead of SPR?', 'No. We operate on Ambergris Caye. BZE is on the mainland. We meet you at SPR after your domestic flight.'],
  ["Is my checked luggage transferred through from BZE to SPR?", "Sometimes. Depends on your international airline's arrangement with Tropic Air or Maya Island Air. Confirm at check-in at your origin."],
  ['What if my international flight arrives after the last domestic flight?', 'Overnight in Belize City and fly first thing, or take the water taxi if the last boat is still running. Message us the plan and we hold the cart.'],
  ['Do you charge for the delay window if my international flight is late?', 'No. Send us the update and we adjust delivery. No fee.'],
];

/** The manual's internal links for this page. */
export const links = {
  spr: 'meet at San Pedro Airport (SPR)',
  arrival: 'full arrival guide from BZE to SPR',
  book: 'book for airport connection',
  sixSeater: '6-seater for family and luggage',
  contact: 'send your BZE and SPR flight numbers',
};
