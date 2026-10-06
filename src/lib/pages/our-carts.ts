/**
 * /our-carts/ copy: paste-ready strings from Execution Manual §06, verbatim.
 * Inline links use [[anchor|urlKey]] (see components/RichText.tsx); anchors
 * follow the manual's "Internal links from this page" list.
 */
import type { ImageName } from '../images';

export const meta = {
  title: '4-Seater & 6-Seater Golf Carts | One Love Golf Cart Rentals',
  description:
    'Club Car 4-seater and 6-seater golf carts for rent in San Pedro, Belize. Aluminum chassis, headlights, wipers, and safety belts. Free delivery to any Ambergris Caye address.',
  h1: 'Our Fleet: 4-Seater and 6-Seater Golf Carts',
};

export const intro =
  'Our fleet is entirely Club Car gas-powered golf carts, chosen because the aluminum chassis handles salt air better than steel and gas power runs longer between refuels than electric on the sandy roads of Ambergris Caye. We rent two configurations: a 4-seater for couples and small families at $35 a day, and a 6-seater with a rear bench for groups and larger families at $60 a day. Both models come with headlights, windshield wipers, parking brakes, and seat belts. Both include free delivery anywhere on Ambergris Caye and unlimited passes over the Sir Barry Bowen Bridge to North Ambergris Caye.';

export type CartDetail = {
  id: '4-seater' | '6-seater';
  h2: string;
  tagline: string;
  seats: number;
  usd: { day: number; week: number };
  bzd: { day: number; week: number };
  paragraphs: string[];
  cta: string;
  images: { main: ImageName; mainAlt: string; detail: ImageName; detailAlt: string };
};

export const cartDetails: CartDetail[] = [
  {
    id: '4-seater',
    h2: '4-Seater Club Car',
    tagline: 'Most rented',
    seats: 4,
    usd: { day: 35, week: 175 },
    bzd: { day: 70, week: 350 },
    paragraphs: [
      'The 4-seater is our most-rented cart and the default recommendation for couples, small families, and anyone with a single suitcase apiece. Four forward-facing seats, aluminum chassis, gas-powered engine, standard headlights and windshield wipers, seat belts on every position, parking brake, and a small under-seat storage bay for a beach bag or a grocery run. Street legal on Ambergris Caye. Rate is $35 a day or $175 a week in US dollars, $70 or $350 in Belize dollars.',
      'Renters who pick the 4-seater are usually here for four to seven days, staying at a hotel in San Pedro Town or a small resort south of town along Coconut Drive, and doing a mix of restaurant runs, beach days at Secret Beach, and daily grocery stops. The 4-seater turns easier on the narrow San Pedro streets than the 6-seater, parks in every spot the town has, and holds two full suitcases plus a beach bag between the trunk and the under-seat storage. On highway 3 north of the bridge it holds 25 mph comfortably.',
      'Where the 4-seater comes up short is on airport runs with more than two adults and full luggage. Two adults with checked bags and carry-ons can make it work if the bags stack behind the rear seats. Four adults with luggage should be booking the 6-seater. Free delivery to San Pedro Airport, any resort, or your home address is included, and every 4-seater rental includes unlimited passes over the Sir Barry Bowen Bridge to Secret Beach and North Ambergris Caye.',
    ],
    cta: 'Reserve the 4-seater',
    images: {
      main: 'red-4-seater-club-car-bougainvillea-resort',
      mainAlt: 'Red lifted 4-seater Club Car golf cart parked on white sand beside pink bougainvillea at a San Pedro resort',
      detail: 'teal-4-seater-golf-cart-side-profile',
      detailAlt: 'Side profile of a teal One Love 4-seater golf cart with lifted wheels and black canopy',
    },
  },
  {
    id: '6-seater',
    h2: '6-Seater Club Car',
    tagline: 'Groups, luggage & airport runs',
    seats: 6,
    usd: { day: 60, week: 350 },
    bzd: { day: 120, week: 700 },
    paragraphs: [
      'The 6-seater carries four adults forward-facing plus two more on a rear-facing bench that folds flat when you need cargo space. Same aluminum chassis, same gas engine, same safety kit as the 4-seater, plus a rear cargo well behind the bench that fits airport luggage for a family of six with room to spare. Rate is $60 a day or $350 a week in US dollars, $120 or $700 in Belize dollars.',
      'The 6-seater pays off in three scenarios. First, groups of five or more, where two 4-seaters cost more and split the group into two carts that then have to convoy every trip. Second, airport arrivals, where luggage volume matters more than fuel economy and the rear cargo well takes what the under-seat storage cannot. Third, wedding parties, family reunions, and anyone renting a single cart for shared use across a week where the extra two seats mean the group never has to split.',
      'Downside on the 6-seater is a slightly wider turning radius, which shows up on Middle Street and Back Street where the shoulders narrow. Everywhere else it drives like the 4-seater. Free delivery included. Unlimited bridge passes included. Same roadside support number on WhatsApp.',
    ],
    cta: 'Reserve the 6-seater',
    images: {
      main: 'orange-6-seater-golf-cart-san-pedro-street',
      mainAlt: 'Orange One Love 6-seater golf cart with two forward rows and a rear bench parked on a paved San Pedro street',
      detail: 'navy-6-seater-golf-cart-rear-bench-profile',
      detailAlt: 'Side profile of a navy One Love 6-seater golf cart showing the rear-facing bench',
    },
  },
];

export const compare = {
  h2: 'Which cart is right for you',
  body: 'Short version: two to four adults with modest luggage, book the 4-seater. Five to six adults or a family with a full luggage load, book the 6-seater. Groups over six should book two carts and coordinate. If the cost difference is the deciding factor, the 4-seater is $175 a week versus $350 for the 6-seater, and two 4-seaters cost $350 the same as one 6-seater without the second-driver flexibility. Full side-by-side comparison across dimensions, luggage capacity, and per-person cost is on our [[4-seater vs 6-seater comparison guide|compare]].',
  // Distilled from the paragraph above (no new claims).
  picks: [
    { id: '4-seater', title: 'Book the 4-seater', points: ['Two to four adults', 'Modest luggage', '$175 a week'] },
    { id: '6-seater', title: 'Book the 6-seater', points: ['Five to six adults', 'A family with a full luggage load', '$350 a week'] },
  ],
  groups: 'Groups over six: book two carts and coordinate.',
};

/** Merged from the manual's two paste-ready spec tables. `diff` rows differ between carts. */
export const specs: { label: string; four: string; six: string; diff?: boolean }[] = [
  { label: 'Seating', four: '4 adults, front-facing', six: '6 adults, 4 forward-facing plus rear bench', diff: true },
  { label: 'Chassis', four: 'Aluminum, corrosion-resistant', six: 'Aluminum, corrosion-resistant' },
  { label: 'Power', four: 'Gas engine', six: 'Gas engine' },
  { label: 'Headlights', four: 'Yes, front and rear', six: 'Yes, front and rear' },
  { label: 'Windshield wipers', four: 'Yes', six: 'Yes' },
  { label: 'Parking brake', four: 'Yes', six: 'Yes' },
  { label: 'Seat belts', four: '4', six: '6', diff: true },
  { label: 'Cargo', four: 'Small under-seat storage', six: 'Under-seat storage plus rear cargo behind bench', diff: true },
  { label: 'Street legal on Ambergris Caye', four: 'Yes', six: 'Yes' },
  { label: 'Daily rate (USD / BZD)', four: '$35 / $70', six: '$60 / $120', diff: true },
  { label: 'Weekly rate (USD / BZD)', four: '$175 / $350', six: '$350 / $700', diff: true },
  { label: 'Delivery', four: 'Free, anywhere on Ambergris Caye', six: 'Free, anywhere on Ambergris Caye' },
  { label: 'Bridge passes', four: 'Unlimited, included', six: 'Unlimited, included' },
];

export const maintenance = {
  h2: 'How our fleet is maintained',
  paragraphs: [
    'Every cart runs a rolling service schedule tied to engine hours and mileage. Basic checks (tire pressure, brake pads, headlights, wipers, seat belt retractors, canopy bolts, fluid levels) happen before every rental, not once a week. Full services (oil change, spark plug replacement, drive belt inspection, chassis wash) happen at fixed intervals whether the cart looks like it needs them or not.',
    "The mechanic doing the work is on-staff and works out of our own shop, not a shared island garage. That means we control the parts, the schedule, and the standard. Full workshop tour, service log samples, and our mechanic's bio are on [[how we service and inspect every cart|fleet]].",
  ],
};

export const booking = {
  h2: 'How to book',
  paragraphs: [
    'Two paths, both easy. Path one: fill out the reservation form on our [[book now page|book]]. Give us your dates, your delivery address, and your cart preference. We confirm by WhatsApp within about 15 minutes during business hours. Path two: send a WhatsApp to +501-634-9559 with the same information and skip the form. Both paths get you to the same place.',
    'Payment happens at cart hand-off unless you prefer to pay a deposit in advance through our [[pay now page|pay]]. We accept Visa, Mastercard, American Express, and cash in US or Belize dollars. Cancellation is free up to 48 hours before pickup. Full policy is on the [[rates page|rates]].',
  ],
  related: [
    { text: 'airport pickup and delivery', key: 'spr' },
    { text: 'Secret Beach delivery', key: 'secret-beach' },
    { text: 'where you can drive on Ambergris Caye', key: 'ambergris' },
    { text: 'questions about a specific cart', key: 'contact' },
  ] as const,
};
