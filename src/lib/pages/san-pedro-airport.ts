/**
 * /rentals-at-san-pedro-airport/ copy: Execution Manual §17 (location
 * pages), verbatim. Inline links use [[anchor|urlKey]] (components/RichText);
 * anchors follow the manual's internal-link list for this page.
 */

export const meta = {
  title: 'Golf Cart Delivery to San Pedro Airport (SPR) | One Love',
  description:
    'Have a 4 or 6 seater golf cart waiting at San Pedro Airport (SPR) when you land. Free delivery, WhatsApp confirmation, hand-off in under five minutes at the terminal.',
  h1: 'Golf Cart Delivery at San Pedro Airport (SPR)',
};

export const intro =
  'San Pedro Airport (IATA code SPR) sits on Coconut Drive at the south end of San Pedro Town, serving Tropic Air and Maya Island Air flights from Belize City Airport (BZE). We deliver golf carts to the terminal exit door free of charge. Send us your flight number and arrival time the day before, and a cart is waiting when you clear the arrivals door. Hand-off takes under five minutes. Drive straight to your hotel from there. Our office at 1 Barrier Reef Drive is about five minutes from the terminal by cart; deliveries take about the same.';

/** Header facts, restated from the intro. */
export const facts = [
  { value: 'Free', label: 'delivery to the terminal' },
  { value: '< 5 min', label: 'hand-off at the exit door' },
  { value: 'SPR', label: 'Tropic Air and Maya Island Air' },
  { value: 'From $35', label: 'a day, 4-seater' },
];

export const how = {
  h2: 'How airport delivery works',
  body: 'Book a cart on our reservation form or by WhatsApp at least 48 hours before your arrival. Send us your Tropic Air or Maya Island Air flight number 24 hours before landing. We track your inbound flight (flight numbers make this reliable), we leave our office about 15 minutes before you land, and we meet you at the SPR terminal exit door with keys, rental paperwork, and a five-minute walkthrough. You sign, we hand over the keys, and you drive off. If you have luggage that will not fit on the cart, we help you load or arrange to shuttle to your hotel.',
  // Timeline restated from the paragraph above.
  steps: [
    { when: '48 hours before', what: 'Book on the reservation form or by WhatsApp.' },
    { when: '24 hours before', what: 'Send your Tropic Air or Maya Island Air flight number.' },
    { when: '15 minutes before landing', what: 'We leave the office and track your flight.' },
    { when: 'You land', what: 'Keys, paperwork and a five-minute walkthrough at the exit door.' },
  ],
};

export const send = {
  h2: 'What to send us before your flight',
  body: 'Full name of the primary driver, matching the driver\'s license you will present at hand-off. Tropic Air or Maya Island Air flight number and arrival date. Passenger count. Cart preference (4-seater at $35 a day or 6-seater at $60 a day). Delivery destination beyond the airport if you want us to escort you to your resort. Return date and time so we can pre-schedule the pickup. Send all of this in a single WhatsApp message to +501-634-9559 to keep it in one thread.',
  // The same list, as a fill-in WhatsApp template.
  checklist: [
    'Primary driver\'s full name (as on the license)',
    'Flight number and arrival date',
    'Passenger count',
    '4-seater or 6-seater',
    'Resort or hotel, if you want an escort there',
    'Return date and time',
  ],
  whatsappTemplate: [
    'Hi One Love, airport delivery request for San Pedro Airport (SPR).',
    'Primary driver (as on license): ',
    'Airline and flight number (Tropic Air / Maya Island Air): ',
    'Arrival date: ',
    'Passengers: ',
    'Cart (4-seater or 6-seater): ',
    'Escort to resort/hotel (optional): ',
    'Return date and time: ',
  ].join('\n'),
};

export const meet = {
  h2: 'Where we meet you at SPR',
  body: 'The SPR terminal is a single-story building. Passengers exit through one door onto Coconut Drive. We wait at that exit door with a small One Love sign and your name. If you arrive between two flights and the terminal is crowded, look for the cart itself; we usually park directly opposite the exit door on Coconut Drive.',
};

export const delay = {
  h2: 'What if my flight is delayed',
  body: 'Send us the new landing time by WhatsApp as soon as you know. We adjust the delivery timing to match the new arrival. No cancellation fee, no rebooking fee. If the delay is longer than four hours, we can push the delivery to your resort instead of the airport if that suits you better. For flights delayed into the following morning, we hold the cart and meet you at the rebooked landing time.',
};

export const which = {
  h2: 'Which cart to rent for airport arrivals',
  body: 'Two adults with one or two carry-ons and one or two checked bags: the 4-seater handles it. Two adults with more than two checked bags each, or four adults with any luggage: the 6-seater. Families of five or six with airport luggage: the 6-seater, always. The rear cargo well on the 6-seater fits four to six checked suitcases with the rear bench folded flat, and folds back up in about 30 seconds for passenger use once bags are off-loaded at the hotel.',
  // Options restated from the paragraph above.
  options: [
    { cart: '4-Seater', price: '$35 a day', fits: ['Two adults', 'One or two carry-ons', 'One or two checked bags'] },
    { cart: '6-Seater', price: '$60 a day', fits: ['Two adults with more than two checked bags each', 'Four adults with any luggage', 'Families of five or six'], best: true },
  ],
};

export const faq: [string, string][] = [
  ['Is there a fee for airport delivery?', 'No. Delivery to San Pedro Airport (SPR) is free of charge for every rental.'],
  ['How do you know when my flight lands?', 'We track Tropic Air and Maya Island Air flight numbers in real time. Send us the flight number when you book and we do the rest.'],
  ['Can I return the cart at the airport when I fly out?', 'Yes. Drop the cart at the airport at the agreed return time. We collect the keys and confirm return by WhatsApp.'],
  ['What if I miss my flight and need to fly the next day?', 'Message us with the new arrival. We hold the cart and meet you at the rescheduled landing.'],
  ['Can you meet a private charter arrival at SPR?', 'Yes. Send us the tail number or the operator name and estimated arrival, and we meet you the same way.'],
];

/** The manual's internal links for this page. */
export const links = {
  arrival: 'complete San Pedro arrival guide',
  sixSeater: '6-seater cart for airport arrivals with luggage',
  book: 'reserve for airport delivery',
  rates: 'rates for airport delivery rentals',
  bze: 'Belize City airport connections',
  contact: 'send us your flight number',
};
