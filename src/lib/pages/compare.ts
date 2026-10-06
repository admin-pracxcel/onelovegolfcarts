/**
 * /golf-cart-comparison-4-vs-6-seater/ copy: Execution Manual §17 (pillar:
 * "4-Seater vs 6-Seater Golf Cart"), verbatim. Cards, bars and figures restate
 * the copy; nothing is added. Rates come from `business` so they never drift.
 */
import { business } from '@/lib/business';

const four = business.rates['4-seater'];
const six = business.rates['6-seater'];

export const meta = {
  title: '4-Seater vs 6-Seater Golf Cart in Belize | Full Comparison',
  description:
    'A side-by-side comparison of 4-seater and 6-seater golf carts for rent on Ambergris Caye. Group size, luggage space, cost, comfort, and safety.',
  h1: '4-Seater vs 6-Seater Golf Cart: The Full Comparison',
  published: '2026-10-06',
};

export const intro =
  'The 4-seater fits 4 adults, costs $35 a day, and is our most-rented cart. The 6-seater fits 6 adults with a rear-facing bench, costs $60 a day, and pays off for groups of 5 or more, for airport pickups with luggage, and for anyone spending long days on the road. Every other detail (chassis, engine, safety kit, delivery) is the same. This guide covers the trade-offs so you pick right the first time.';

export const short = {
  h2: 'The Short Answer',
  body: 'Two to four adults with light luggage: 4-seater at $35 a day. Five to six adults or a family with airport luggage: 6-seater at $60 a day. Anything larger than six: book two carts and stagger the group. On cost per person, the 6-seater beats two 4-seaters slightly. On flexibility, two 4-seaters win because two drivers can split up. Full trade-offs below.',
  // Restated from the paragraph above.
  picks: [
    { who: 'Two to four adults with light luggage', pick: '4-seater', price: `$${four.day} a day` },
    { who: 'Five to six adults or a family with airport luggage', pick: '6-seater', price: `$${six.day} a day` },
    { who: 'Anything larger than six', pick: 'Two carts', price: 'Stagger the group' },
  ],
};

export const table = {
  h2: 'Side-by-Side Comparison Table',
  body: 'Every meaningful spec, side by side. Both carts share the same chassis material, engine type, safety equipment, and inspection standard. Where they differ is capacity, cargo, and cost.',
  rows: [
    { label: 'Seats', four: '4 forward-facing', six: '4 forward + 2 rear-facing bench', diff: true },
    { label: 'Chassis', four: 'Aluminum', six: 'Aluminum' },
    { label: 'Engine', four: 'Gas-powered Club Car', six: 'Gas-powered Club Car' },
    { label: 'Length', four: '~8 ft', six: '~11 ft', diff: true },
    { label: 'Width', four: '~4 ft', six: '~4 ft' },
    { label: 'Turning radius', four: 'Tight', six: 'Slightly wider', diff: true },
    { label: 'Cargo', four: 'Under-seat storage', six: 'Under-seat plus rear cargo well', diff: true },
    { label: 'Suitcases (checked, standard)', four: '2 to 3', six: '4 to 6', diff: true },
    { label: 'Daily rate USD', four: `$${four.day}`, six: `$${six.day}`, diff: true },
    { label: 'Weekly rate USD', four: `$${four.week}`, six: `$${six.week}`, diff: true },
    { label: 'Delivery', four: 'Free anywhere on the island', six: 'Free anywhere on the island' },
    { label: 'Bridge passes', four: 'Unlimited, included', six: 'Unlimited, included' },
  ],
};

export type Detail = { h3: string; body: string };

export const fourDetail: { h2: string; blocks: Detail[] } = {
  h2: 'The 4-Seater in Detail',
  blocks: [
    { h3: 'Best for', body: "Couples on a honeymoon. Solo travelers with a friend meeting them mid-week. Families of three or four with school-age kids. Anyone staying at a San Pedro Town hotel who plans mostly local drives and one or two north-of-the-bridge day trips. Also the default choice for renters spending more than 10 days on the island where the weekly rate math tips further in the 4-seater's favor." },
    { h3: 'Dimensions', body: 'About 8 feet long by 4 feet wide. Turns inside most San Pedro Town intersections without a three-point maneuver. Parks in every hotel lot on the island. Fits four adults comfortably; five is beyond the seat count and not permitted.' },
    { h3: 'Luggage capacity', body: 'Under-seat storage holds two beach bags or one grocery haul comfortably. Behind the rear seats stack two standard 24-inch checked suitcases or one 28-inch and a carry-on. Four adults with a full airport luggage load will not fit; that group should book the 6-seater.' },
    { h3: 'Cost', body: '$35 US a day, $175 US a week. Weekly rate averages to $25 a day, a 29% discount on the daily rate. Any rental of six or more days should book the weekly rate. Two-week and monthly rates available on request.' },
    { h3: 'Downsides', body: 'Cargo capacity limits airport arrivals for four adults. No rear bench for the flexibility of carrying additional passengers on a short hop. Slightly less shade coverage than the 6-seater canopy.' },
  ],
};

export const sixDetail: { h2: string; blocks: Detail[] } = {
  h2: 'The 6-Seater in Detail',
  blocks: [
    { h3: 'Best for', body: 'Groups of five or six adults. Families with airport luggage. Wedding parties needing to move the whole party between ceremony and reception. Multi-generational trips where grandparents ride forward and kids get the rear bench. Anyone doing a lot of grocery hauls or beach-gear runs.' },
    { h3: 'Dimensions', body: 'About 11 feet long by 4 feet wide. Turns in most intersections but needs slightly more room at tight Middle Street corners. Fits in all standard hotel parking spots. Rear bench folds flat when cargo takes priority.' },
    { h3: 'Luggage capacity', body: 'Under-seat plus a proper rear cargo well behind the bench that fits four to six checked suitcases with the bench folded. With the bench up for passengers, still handles four carry-on bags in the rear.' },
    { h3: 'Cost', body: '$60 US a day, $350 US a week. Weekly rate averages to $50 a day, a 17% discount on the daily rate. Groups of five or more usually beat the cost of two 4-seaters. Six of you paying $60 a day is $10 a person; two 4-seaters at $35 each split six ways is $12 a person.' },
    { h3: 'Downsides', body: 'Slightly wider turning radius shows on the tightest Middle Street corners. Rear-facing bench passengers feel every bump. Not the right choice for two adults doing a low-luggage romantic week.' },
  ],
};

export const groups = {
  h2: 'Group-Size Decision Guide',
  // H3s and copy verbatim; `size` and `pick` restate them.
  items: [
    { h3: 'Couple (2 adults)', size: '2', pick: '4-seater', body: '4-seater. Always. Two spare seats for the occasional friend or two. Half the cost of the 6-seater.' },
    { h3: 'Family of 3 to 4', size: '3–4', pick: '4- or 6-seater', body: '4-seater if the kids are small and luggage is modest. 6-seater if the kids need booster seats or the family expects grocery hauls.' },
    { h3: 'Family of 5 to 6', size: '5–6', pick: '6-seater', body: '6-seater. No question. Two 4-seaters splits the family into two carts and multiplies the coordination overhead.' },
    { h3: 'Group of 6+', size: '6+', pick: 'Two carts', body: 'Two carts. A 6-seater plus a 4-seater covers up to 10. Two 6-seaters cover 12. Rent both and coordinate on WhatsApp for the group.' },
  ],
};

export const luggage = {
  h2: 'Luggage & Airport Runs',
  h3: 'Suitcase capacity by model',
  body: '4-seater handles two adults with two 24-inch checked bags plus two carry-ons. Beyond that the space runs out. 6-seater handles a family of four with four checked bags and four carry-ons, bench down or split with bench up depending on the load. For a full 6-adult airport arrival with 6 checked bags, plan on two carts total.',
};

export const cost = {
  h2: 'Cost Analysis',
  blocks: [
    { h3: 'Day', body: '4-seater $35. 6-seater $60. Cost per person on the 4-seater at full 4-adult occupancy is $8.75. Cost per person on the 6-seater at full 6-adult occupancy is $10. Nearly a wash on per-person cost at full capacity.' },
    { h3: 'Week', body: '4-seater $175 (~$25 a day). 6-seater $350 (~$50 a day). Weekly rate math further favors the 4-seater on a per-day basis; per-person math holds roughly the same as the daily comparison.' },
    { h3: 'Multi-day (3 to 6 days)', body: "Daily rate applies for stays under 7 days. Ask about a multi-day discount if the stay is 5 or 6 days; sometimes we round to a weekly rate for the customer's benefit." },
    { h3: 'When the 6-seater beats two 4-seaters', body: 'Any time your group is five or more. Two 4-seaters at $35 each daily is $70; a single 6-seater is $60. Two 4-seaters at $175 each weekly is $350; a single 6-seater weekly is $350. The 6-seater wins on daily rate and ties on weekly rate, and it saves you the coordination overhead of running two carts around the island.' },
  ],
  // Restated from the blocks above.
  bars: [
    {
      period: 'A day',
      rows: [
        { label: 'One 4-seater', value: four.day, note: '$8.75 a person, 4 aboard' },
        { label: 'One 6-seater', value: six.day, note: '$10 a person, 6 aboard', best: true },
        { label: 'Two 4-seaters', value: four.day * 2, note: '' },
      ],
    },
    {
      period: 'A week',
      rows: [
        { label: 'One 4-seater', value: four.week, note: '~$25 a day' },
        { label: 'One 6-seater', value: six.week, note: '~$50 a day', best: true },
        { label: 'Two 4-seaters', value: four.week * 2, note: 'Ties the 6-seater' },
      ],
    },
  ],
};

export const safety = {
  h2: 'Safety Considerations for Kids and Pets',
  body: "Seat belts on every seat, front and rear (rear-bench included on the 6-seater). Children under age 5 should ride on an adult's lap in the front seat only, never on the rear bench where the ride is bumpier and the belt geometry is designed for adults. Pets are allowed but must be leashed. Dogs of any size ride in the cargo well of the 6-seater or on a passenger's lap in the 4-seater. Do not leave pets alone in a parked cart; the canopy shade does not prevent heat buildup in Belize afternoons.",
  // Restated from the paragraph above.
  tips: [
    { label: 'Seat belts', value: 'Every seat, front and rear, including the 6-seater rear bench' },
    { label: 'Under 5', value: "On an adult's lap in the front seat only, never on the rear bench" },
    { label: 'Pets', value: 'Allowed, leashed. Cargo well of the 6-seater or a lap in the 4-seater' },
    { label: 'Never', value: 'Leave pets alone in a parked cart' },
  ],
};

export const gas = {
  h2: 'Gas vs Electric on Ambergris Caye',
  body: 'Both models in our fleet are gas-powered. Electric carts exist on the island and work fine for short in-town use, but they run out of range on the north-side sand roads and take too long to recharge to be useful for a full-day itinerary. Gas covers more miles per refuel, does not lose range in July heat, and refuels at any of the three gas stations on Ambergris Caye in under three minutes. We considered adding electric to the fleet in 2022 and reviewed the range and charging math against actual renter itineraries. Gas won. That decision holds today.',
};

export const reviewsHead = { eyebrow: 'From renters', title: 'What Real Renters Say' };

export const faq: [string, string][] = [
  ['Can a 4-seater cart legally carry 5 people?', "No. Belize law and our rental agreement both limit cart occupancy to the manufacturer's rated capacity. 4-seater carries 4. 6-seater carries 6."],
  ['Is the 6-seater harder to drive than the 4-seater?', 'Slightly wider turning radius on tight corners. Otherwise the driving experience is the same.'],
  ['Can I switch from a 4-seater to a 6-seater mid-rental if my group grows?', 'Yes if we have inventory. Message WhatsApp with 24 hours notice and we swap the cart at your address. Rate change applies from the swap date.'],
  ['Which cart is easier to park in San Pedro Town?', 'Both fit in all standard parking. The 4-seater is easier to slot into tight spots along Middle Street or Back Street. The 6-seater fits every hotel lot without issue.'],
  ['Do you rent 8-seater carts?', 'No. We stock 4-seater and 6-seater only. Two carts covers any group larger than 6.'],
  ['Do the rear-bench seats face forward or backward on the 6-seater?', 'The rear bench faces backward. Kids often prefer it. Adults who get motion-sick should ride forward-facing.'],
];

/** The manual's internal links for this page. */
export const links = {
  four: 'reserve the 4-seater',
  six: 'reserve the 6-seater',
  rates: 'complete rate breakdown',
  book: 'book your chosen cart',
  fleet: 'how we service every Club Car',
  spr: 'airport pickup with luggage',
};
