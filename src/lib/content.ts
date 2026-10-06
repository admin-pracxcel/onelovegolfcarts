/**
 * Homepage copy: paste-ready strings from the Execution Manual (Section 04),
 * kept verbatim. Components only lay this out.
 */
import type { UrlKey } from './business';
import type { ImageName } from './images';

export const homeMeta = {
  title: 'Golf Cart Rental San Pedro Belize | One Love Golf Cart Rentals',
  description:
    'Family-owned 4 and 6 seater golf cart rental in San Pedro Belize from $35 a day. Free delivery to your hotel or the airport. Book online in two minutes.',
  ogAlt: 'Guests driving One Love golf carts in a convoy along the beachfront street in San Pedro, Belize',
};

export const hero = {
  eyebrow: 'San Pedro · Ambergris Caye · Belize',
  // Required H1, exact text. The line break is presentational only.
  h1: ['Golf Cart Rental', 'in San Pedro, Belize'] as const,
  subhead:
    'Family-owned since 2017. 4-seater from $35 a day. 6-seater from $60 a day. Free delivery anywhere on Ambergris Caye.',
  trust: [
    'Rated 4.9 on TripAdvisor',
    '104+ five-star reviews',
    'Established 2017',
    'Barrier Reef Drive, San Pedro',
    'Belize licensed and insured',
  ],
};

export const intro =
  'One Love Golf Cart Rentals is a family-owned rental service on Barrier Reef Drive in San Pedro Town, Ambergris Caye. We rent street-legal 4-seater and 6-seater gas-powered Club Car golf carts from $35 a day and $175 a week, deliver free to your hotel or the airport, and answer WhatsApp messages every day from nine in the morning until nine at night. We have been renting to visitors and locals on Ambergris Caye since 2017.';

export type Cart = {
  id: '4-seater' | '6-seater';
  name: string;
  seats: number;
  day: number;
  week: number;
  body: string;
  best: string;
  cta: string;
  image: ImageName;
  alt: string;
};

export const carts: Cart[] = [
  {
    id: '4-seater',
    name: '4-Seater Club Car',
    seats: 4,
    day: 35,
    week: 175,
    body: 'Seats four adults, gas-powered, aluminum chassis, headlights, wipers, seat belts. Our most-rented cart, and the right pick for couples, small families, and anyone with a single suitcase apiece. Weekly rate $175. Free delivery to your hotel or the airport.',
    best: 'Couples & small families',
    cta: 'See the 4-seater',
    image: 'red-4-seater-club-car-bougainvillea-resort',
    alt: 'Red lifted 4-seater Club Car golf cart parked on white sand beside pink bougainvillea at a San Pedro resort',
  },
  {
    id: '6-seater',
    name: '6-Seater Club Car',
    seats: 6,
    day: 60,
    week: 350,
    body: 'Seats six adults with a rear-facing bench, gas-powered, same chassis and safety kit as the 4-seater. The right pick for groups of five or more, families with luggage, and airport runs. Weekly rate $350. Free delivery included.',
    best: 'Groups, luggage & airport runs',
    cta: 'See the 6-seater',
    image: 'maroon-6-seater-golf-cart-beachfront-park',
    alt: 'Maroon One Love 6-seater golf cart with rear-facing bench parked by the colourful beachfront park in San Pedro, Belize',
  },
];

export const why: [string, string][] = [
  ['Free delivery, anywhere on the island.', 'We meet you at San Pedro Airport, at the water taxi, at your hotel front desk, or at any address on Ambergris Caye. Pickup is free too. You keep both hands on your suitcase, we handle the cart.'],
  ['Unlimited bridge passes included.', 'Every rental comes with unlimited passes over the Sir Barry Bowen Bridge to North Ambergris Caye. Secret Beach, Truck Stop, and everything above the bridge stays open to you at no extra cost.'],
  ['Twenty-four seven roadside support.', 'A flat tire on the way back from dinner, a low battery at the beach, a question about the route. Message our WhatsApp at any hour and we come to you.'],
  ['Fleet you can trust.', 'Our carts are all Club Car with aluminum chassis suited to salt air. Every cart gets serviced on a rolling schedule and inspected before it leaves the lot. Fewer breakdowns, safer drives, less time lost.'],
];

export type Zone = { name: string; detail: string; time: string; link?: UrlKey; anchor?: string };

export const delivery = {
  intro:
    'Our office sits at 1 Barrier Reef Drive in San Pedro Town, opposite Belize Chocolate Company, halfway between the Marine Terminal and San Pedro Airport. We deliver golf carts free to every address on Ambergris Caye. That includes the SPR airport gate for Tropic Air and Maya Island Air arrivals, the water taxi terminal for San Pedro Belize Express and Ocean Ferry passengers, every resort south of town along Coconut Drive, every hotel and condo in San Pedro Town itself, and everything north of the Sir Barry Bowen Bridge including Secret Beach, Truck Stop, and the long stretch up toward Bacalar Chico. Unlimited bridge passes come with every rental. There is no route on the island we cannot reach.',
  zones: [
    { name: 'San Pedro Airport (SPR)', detail: 'Meet at the terminal entrance.', time: 'About 5 min', link: 'spr', anchor: 'San Pedro Airport delivery' },
    { name: 'Water Taxi', detail: 'San Pedro Belize Express and Ocean Ferry. Meet at the Marine Terminal.', time: 'About 4 min' },
    { name: 'San Pedro Town hotels', detail: "Ramon's Village, SunBreeze, Mayan Princess, and every guesthouse. Delivered to your front desk.", time: 'Front desk' },
    { name: 'South Ambergris Caye resorts', detail: 'Mahogany Bay, Victoria House, Belize Yacht Club, Alaia Belize, Xanadu. Along Coconut Drive.', time: '15–25 min', link: 'south', anchor: 'South Ambergris delivery' },
    { name: 'North Ambergris Caye', detail: 'Grand Caribe, Coco Beach Resort, Las Terrazas, Costa Blu. Cross the bridge.', time: '30–45 min', link: 'north', anchor: 'North Ambergris delivery' },
    { name: 'Secret Beach and Truck Stop', detail: 'The northwestern edge of the island. Most renters pick up in San Pedro Town and drive north themselves.', time: 'About 1 hr', link: 'secret-beach', anchor: 'Secret Beach delivery' },
  ] satisfies Zone[],
};

export const steps: [string, string][] = [
  ['Pick your cart and dates.', 'Fill in the reservation form or send a WhatsApp message to +501-634-9559 with your arrival date, departure date, and where you are staying. Under two minutes either way.'],
  ['We confirm within 15 minutes.', 'A real person from the family, not an automated system, replies to confirm cart availability, delivery timing, and any questions about your delivery location. If you have a flight or ferry arrival time, send it, and we work backward from there.'],
  ['Cart at your door on arrival day.', 'We meet you at the airport gate, the water taxi terminal, or your hotel with the keys, a quick walkthrough of the cart controls, and a paper map with the roads marked. You sign, we hand over the keys, you drive off.'],
];

export type Review = { text: string; author: string; source: string; date?: string; url?: string };

// Genuine Google reviews, verbatim, as published on the live homepage
// (Trustindex widget, Oct 2026). The widget does not expose dates. VERIFY
// and add month/year + direct review links before launch.
export const reviews: Review[] = [
  {
    text: 'Junior was very punctual and great with communication. He was waiting for us at the airport upon arrival, went over the rules of the road and how to use the golf carts. They were well maintained and reliable for our time on the island.',
    author: 'Emily L.',
    source: 'Google',
  },
  {
    text: "Absolutely painless experience, we met Junior on a Friday afternoon and had paid and got the keys to the cart within like 15 minutes. Then when leaving via the ferry they met us here so we didn't have to worry about walking across town with all our bags! Super fair price for the cart we got",
    author: 'Dylan P.',
    source: 'Google',
  },
  {
    text: "One love had a cart to me within 30 minutes of my phone call. The cart they brought out was newer and very nice! We arranged pickup when we were done and we couldn't be happier!! Great price great service! Highly recommend",
    author: 'Scott G.',
    source: 'Google',
  },
];

export type Guide = { title: string; body: string; cta: string; link: UrlKey; image: ImageName; alt: string; tag: string };

export const explore: Guide[] = [
  {
    title: 'The Secret Beach Route',
    body: "Turn-by-turn from San Pedro Town over the Sir Barry Bowen Bridge to Coco Loco's, Blue Bayou, and the sandbar beyond. About 25 minutes each way.",
    cta: 'Read the route guide',
    link: 'secret-route',
    image: 'blog-sand-road-golf-cart-coast',
    alt: 'Golf cart driving a sandy coastal road lined with palms on Ambergris Caye',
    tag: 'North of the bridge',
  },
  {
    title: 'Where to Refuel',
    body: 'Three gas stations on Ambergris Caye, when each opens, what you pay per gallon, and how far a full tank actually gets you.',
    cta: 'Read the fuel guide',
    link: 'refuel',
    image: 'camo-golf-cart-colourful-san-pedro-street',
    alt: 'Lifted golf cart parked outside a yellow and lime-green building on a San Pedro street',
    tag: 'Practical',
  },
  {
    title: 'How to Drive Like a Local',
    body: 'Official rules, unwritten local etiquette, the one-way streets in San Pedro Town, and the mistakes tourists usually make in their first hour.',
    cta: 'Read the driving guide',
    link: 'drive-local',
    image: 'green-golf-cart-san-pedro-central-park',
    alt: 'Green One Love 4-seater golf cart parked beside the San Pedro town park and flamboyant tree',
    tag: 'San Pedro Town',
  },
  {
    title: 'Twenty Stops Worth the Drive',
    body: "Secret Beach, Truck Stop, Wayo's Beach Bar, Estel's Dine by the Sea, Palapa Bar, Fido's Courtyard, and fifteen more places worth the cart ride.",
    cta: 'Read the things-to-do guide',
    link: 'things-to-do',
    image: 'blog-beach-restaurant-lobster',
    alt: 'Couple sharing grilled lobster at a beachfront palapa restaurant with a golf cart parked on the sand',
    tag: 'Eat, swim, explore',
  },
];

export const faq: [string, string][] = [
  ["Do I need a driver's license to rent a golf cart in San Pedro?", "Yes. Belize law requires a valid driver's license from your home country. All primary drivers must be at least 18. We keep a copy of your license on file for the length of the rental."],
  ['How much does a golf cart cost per day in San Pedro?', 'Our 4-seater is $35 a day or $175 a week in US dollars. Our 6-seater is $60 a day or $350 a week. Prices include free delivery on Ambergris Caye and unlimited bridge passes to North Ambergris Caye.'],
  ['Can you deliver a cart to my hotel or the airport?', 'Yes. We deliver free anywhere on Ambergris Caye, including San Pedro Airport (SPR), every resort, and every water taxi arrival point. Message us the day before with your arrival time and location.'],
  ['Can I drive the cart over the bridge to Secret Beach?', 'Yes. Every rental includes unlimited passes over the Sir Barry Bowen Bridge to North Ambergris Caye, which is how you reach Secret Beach, Truck Stop, and the northern end of the island.'],
  ['What happens if the cart breaks down?', 'Message our WhatsApp at +501-634-9559 and someone will reach you. Most on-island issues get fixed in under an hour. If we cannot fix it on the spot, we swap the cart at no charge.'],
  ['Do you rent by the hour, or only by the day?', 'Daily and weekly. One-day bookings are subject to fleet availability and need to be confirmed the day before you arrive. Multi-day and weekly bookings can be reserved anytime.'],
];

export const finalCta = {
  eyebrow: 'Reserve your cart',
  title: 'Ready when you are.',
  body: 'Fill in the reservation form or send a WhatsApp to +501-634-9559. Confirmation in under 15 minutes during business hours. Free delivery anywhere on Ambergris Caye.',
};

// Manual: "Last verified [Month] [Year]". Update when rates/hours are re-checked.
export const lastVerified = 'October 2026';
