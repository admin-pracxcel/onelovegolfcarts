/**
 * Resort delivery pages: Execution Manual §17 ("Resort-specific delivery
 * pages"), copy verbatim. All five share one six-section shell rendered by
 * <ResortPage>. Facts and hand-off rows restate the copy; nothing is added.
 *
 * Only Mahogany Bay has a title tag and meta description in the manual; the
 * other four follow its pattern. VERIFY with the client.
 *
 * No resort photography exists. Images show real One Love carts and are never
 * captioned or described as the resort itself.
 */
import type { UrlKey } from '@/lib/business';
import type { ImageName } from '@/lib/images';

export type Resort = {
  slug: ResortSlug;
  /** Short name used in labels ("Staying at …"). */
  name: string;
  /** Full property name used in schema. */
  fullName: string;
  zone: 'north' | 'south';
  meta: { title: string; description: string; h1: string };
  intro: string;
  hero: { image: ImageName; alt: string };
  facts: { value: string; label: string }[];
  delivery: { h2: string; body: string; handoff: { label: string; value: string }[] };
  routes: { h2: string; body: string; time: string; to: string }[];
  which: { h2: string; body: string; image: ImageName; alt: string };
  faq: [string, string][];
  whatsappTemplate: string;
  /** The manual's internal links. `book` is used for the CTAs. */
  book: string;
  links: { key: UrlKey; label: string }[];
};

export const RESORT_SLUGS = ['mahogany-bay', 'grand-caribe', 'victoria-house', 'belize-yacht-club', 'alaia'] as const;
export type ResortSlug = (typeof RESORT_SLUGS)[number];

const template = (resort: string, extra: string[] = []) =>
  [
    `Hi One Love, I would like a cart delivered to ${resort}.`,
    'Reservation name: ',
    ...extra,
    'Check-in date and time: ',
    'Departure date: ',
    'Cart (4-seater or 6-seater): ',
  ].join('\n');

export const resorts: Record<ResortSlug, Resort> = {
  'mahogany-bay': {
    slug: 'mahogany-bay',
    name: 'Mahogany Bay',
    fullName: 'Mahogany Bay Resort',
    zone: 'south',
    meta: {
      title: 'Golf Cart Delivery to Mahogany Bay Resort, San Pedro',
      description:
        'Have a golf cart waiting at Mahogany Bay Resort when you check in. Free delivery, WhatsApp confirmation, and directions from the resort to Secret Beach and downtown San Pedro.',
      h1: 'Golf Cart Delivery to Mahogany Bay Resort',
    },
    intro:
      'Mahogany Bay Resort sits south of San Pedro Town along Coconut Drive, part of the Hilton Curio Collection and one of the larger destination resorts on Ambergris Caye. We deliver golf carts to the Mahogany Bay front desk free of charge. Send us your check-in date and time, and a cart is waiting when you arrive. About 15 to 20 minutes drive from our office at 1 Barrier Reef Drive.',
    hero: {
      image: 'gallery-four-colourful-golf-carts-line-up',
      alt: 'Four One Love golf carts in teal, red, yellow and blue lined up side by side',
    },
    facts: [
      { value: 'Free', label: 'delivery to the front desk' },
      { value: '15–20 min', label: 'from our office' },
      { value: '40–50 min', label: 'to Secret Beach' },
      { value: '15 min', label: 'to downtown San Pedro' },
    ],
    delivery: {
      h2: 'How delivery works to Mahogany Bay',
      body: 'Send us your reservation name and check-in date by WhatsApp at least 24 hours ahead. We coordinate with the Mahogany Bay bell desk to drop the cart at the porte-cochere at your check-in time. Front desk holds the keys until you arrive. Rental agreement signed at the resort. Return the cart to the same spot at your agreed departure time; we pick up.',
      handoff: [
        { label: 'Notice', value: 'At least 24 hours ahead, by WhatsApp' },
        { label: 'Drop-off', value: 'The porte-cochere, at your check-in time' },
        { label: 'Keys', value: 'Held at the front desk until you arrive' },
        { label: 'Paperwork', value: 'Rental agreement signed at the resort' },
        { label: 'Return', value: 'Same spot, at your agreed departure time; we pick up' },
      ],
    },
    routes: [
      {
        h2: 'Directions from Mahogany Bay to Secret Beach',
        to: 'Secret Beach',
        time: '40–50 min',
        body: 'Exit the resort onto Coconut Drive and head north toward San Pedro Town. Pass San Pedro Airport on your right. Continue north through downtown, past our office at 1 Barrier Reef Drive on the right. Continue to the north end of town where the road turns toward Boca del Rio. Cross the Sir Barry Bowen Bridge. Turn left immediately after the bridge and follow the sand road west and north to Secret Beach. About 40 to 50 minutes each way from Mahogany Bay.',
      },
      {
        h2: 'Directions from Mahogany Bay to downtown San Pedro',
        to: 'Downtown San Pedro',
        time: '15 min',
        body: 'North on Coconut Drive from the resort. Pass the airport on your right. Continue about five minutes to Central Park in the middle of San Pedro Town. Belize Chocolate Company is directly opposite our office at 1 Barrier Reef Drive. Cart parking is available on Middle Street or at Central Park. About 15 minutes each way.',
      },
    ],
    which: {
      h2: 'Which cart to rent at Mahogany Bay',
      body: 'Couples staying at Mahogany Bay usually book the 4-seater at $35 a day. Families with kids or groups of five or six book the 6-seater at $60 a day. For arrival day with airport luggage, the 6-seater carries a family of four with checked bags comfortably.',
      image: 'gallery-maroon-6-seater-one-love-golf-cart',
      alt: 'Maroon One Love 6-seater golf cart with a rear-facing bench, parked on a paved lot',
    },
    faq: [
      ['Does Mahogany Bay rent carts on-site?', 'The resort offers cart rental through in-house arrangements. Our rates are usually lower and delivery is free.'],
      ["Can I park the cart in the resort's lot?", 'Yes. Mahogany Bay has cart-designated parking.'],
      ['Are bridge passes included when I go to Secret Beach from Mahogany Bay?', 'Yes. Unlimited bridge passes are included in every rental.'],
    ],
    whatsappTemplate: template('Mahogany Bay Resort'),
    book: 'reserve for Mahogany Bay delivery',
    links: [
      { key: 'south', label: 'South Ambergris delivery zone details' },
      { key: 'secret-beach', label: 'Secret Beach delivery specifics' },
      { key: 'rates', label: 'current rental rates' },
      { key: 'things-to-do', label: 'things to do from Mahogany Bay' },
    ],
  },

  'grand-caribe': {
    slug: 'grand-caribe',
    name: 'Grand Caribe',
    fullName: 'Grand Caribe Belize Resort & Condominiums',
    zone: 'north',
    meta: {
      // VERIFY: manual gives no title or description for this page.
      title: 'Golf Cart Delivery to Grand Caribe, Ambergris Caye',
      description:
        'Have a golf cart delivered to Grand Caribe when you check in. WhatsApp confirmation, delivery across the bridge, and directions from the resort to Secret Beach and downtown San Pedro.',
      h1: 'Golf Cart Delivery to Grand Caribe',
    },
    intro:
      'Grand Caribe Belize Resort & Condominiums sits on North Ambergris Caye, about seven miles north of San Pedro Town, on a stretch of west-facing beach. We deliver golf carts across the Sir Barry Bowen Bridge to the Grand Caribe front desk. Send your check-in date and we time the delivery to your arrival. About 30 to 40 minutes drive from our office.',
    hero: {
      image: 'gallery-pink-4-seater-golf-cart-sand',
      alt: 'Pink One Love 4-seater golf cart parked on sand beside a fence',
    },
    facts: [
      { value: 'Front desk', label: 'delivery across the bridge' },
      { value: '30–40 min', label: 'from our office' },
      { value: '20 min', label: 'to Secret Beach' },
      { value: '25–30 min', label: 'to downtown San Pedro' },
    ],
    delivery: {
      h2: 'How delivery works to Grand Caribe',
      body: 'Send your reservation name and check-in time by WhatsApp 24 hours ahead. We coordinate with the Grand Caribe front desk to drop the cart on-property. Keys held at reception until you arrive. Return the cart to the same spot at your agreed departure time; we drive back across the bridge to pick up.',
      handoff: [
        { label: 'Notice', value: '24 hours ahead, by WhatsApp' },
        { label: 'Drop-off', value: 'On-property, coordinated with the front desk' },
        { label: 'Keys', value: 'Held at reception until you arrive' },
        { label: 'Return', value: 'Same spot, at your agreed departure time; we drive back across the bridge to pick up' },
      ],
    },
    routes: [
      {
        h2: 'Directions from Grand Caribe to Secret Beach',
        to: 'Secret Beach',
        time: '20 min',
        body: "Exit Grand Caribe onto the main north-side road. Head west (away from the beach). Continue about 15 minutes on the sand road toward Coco Loco's and the Secret Beach cluster. About 20 minutes each way from Grand Caribe.",
      },
      {
        h2: 'Directions from Grand Caribe to downtown San Pedro',
        to: 'Downtown San Pedro',
        time: '25–30 min',
        body: 'Head south from Grand Caribe on the main road. Cross the Sir Barry Bowen Bridge. Continue south into San Pedro Town on Barrier Reef Drive. Our office at 1 Barrier Reef Drive is on your right about 5 minutes past the bridge. Central Park and Belize Chocolate Company are steps away. About 25 to 30 minutes each way.',
      },
    ],
    which: {
      h2: 'Which cart to rent at Grand Caribe',
      body: 'Grand Caribe skews toward families and small groups. The 6-seater is the popular choice for the typical booking. Couples staying in a smaller unit book the 4-seater. Both handle the sand roads north of the bridge.',
      image: 'gallery-yellow-6-seater-golf-cart-white-fence',
      alt: 'Yellow One Love 6-seater golf cart parked in front of a white picket fence',
    },
    faq: [
      ['Do I need a cart if I stay at Grand Caribe?', 'Yes if you plan to leave the resort. The nearest restaurants and shops outside the resort are 10 to 15 minutes away by cart.'],
      ['Is the bridge crossing rough on the cart?', 'No. Paved surface, no rougher than any road on the island.'],
      ['Can I drive to Truck Stop from Grand Caribe?', 'Yes. Truck Stop is about 15 minutes south, just north of the bridge.'],
    ],
    whatsappTemplate: template('Grand Caribe'),
    book: 'reserve for Grand Caribe delivery',
    links: [
      { key: 'north', label: 'North Ambergris delivery zone' },
      { key: 'secret-beach', label: 'Secret Beach delivery' },
      { key: 'things-to-do', label: 'things to do from Grand Caribe' },
    ],
  },

  'victoria-house': {
    slug: 'victoria-house',
    name: 'Victoria House',
    fullName: 'Victoria House',
    zone: 'south',
    meta: {
      // VERIFY: manual gives no title or description for this page.
      title: 'Golf Cart Delivery to Victoria House, San Pedro',
      description:
        'Have a golf cart waiting at Victoria House when you check in. Free delivery, WhatsApp confirmation, and directions from the resort to Secret Beach and downtown San Pedro.',
      h1: 'Golf Cart Delivery to Victoria House',
    },
    intro:
      'Victoria House sits about two miles south of San Pedro Town along Coconut Drive, a long-standing beachfront resort with a reputation for quiet luxury. We deliver golf carts to Victoria House free of charge. Send us your check-in date and time, and a cart is waiting when you arrive at reception. About 15 to 20 minutes drive from our office.',
    hero: {
      image: 'gallery-light-blue-4-seater-golf-cart-street',
      alt: 'Light blue One Love 4-seater golf cart parked on a paved street beside a wooden fence',
    },
    facts: [
      { value: 'Free', label: 'delivery to reception' },
      { value: '15–20 min', label: 'from our office' },
      { value: '45 min', label: 'to Secret Beach' },
      { value: '15 min', label: 'to downtown San Pedro' },
    ],
    delivery: {
      h2: 'How delivery works',
      body: 'Send your reservation name and check-in time by WhatsApp 24 hours ahead. We coordinate with Victoria House reception to drop the cart at the front of the property. Keys held at reception until you arrive. Same process on return.',
      handoff: [
        { label: 'Notice', value: '24 hours ahead, by WhatsApp' },
        { label: 'Drop-off', value: 'The front of the property, coordinated with reception' },
        { label: 'Keys', value: 'Held at reception until you arrive' },
        { label: 'Return', value: 'Same process on return' },
      ],
    },
    routes: [
      {
        h2: 'Directions from Victoria House to Secret Beach',
        to: 'Secret Beach',
        time: '45 min',
        body: 'North on Coconut Drive from the resort. Past San Pedro Airport, past our office on Barrier Reef Drive, through the north end of town. Cross the Sir Barry Bowen Bridge and follow the sand road west and north. About 45 minutes each way from Victoria House.',
      },
      {
        h2: 'Directions from Victoria House to downtown San Pedro',
        to: 'Downtown San Pedro',
        time: '15 min',
        body: 'North on Coconut Drive from the resort. Pass the airport on the right. Continue five more minutes to Central Park in the middle of San Pedro Town. About 15 minutes each way. Belize Chocolate Company and our office are on Barrier Reef Drive one block west of Central Park.',
      },
    ],
    which: {
      h2: 'Which cart at Victoria House',
      body: 'Victoria House hosts a lot of couples and small families. The 4-seater is the default recommendation. Wedding parties staying at the resort often book multiple carts; ask about a group booking discount.',
      image: 'teal-4-seater-golf-cart-side-profile',
      alt: 'Teal One Love 4-seater golf cart in side profile',
    },
    faq: [
      ['Does Victoria House have cart parking?', 'Yes. Designated cart parking near reception.'],
      ['Is Coconut Drive lit at night between town and Victoria House?', 'Partially. Drive with headlights on and stay to the right.'],
      ["Can I drive to Elvi's Kitchen from Victoria House?", "Yes. Elvi's is about 10 minutes north on Coconut Drive."],
    ],
    whatsappTemplate: template('Victoria House'),
    book: 'reserve for Victoria House delivery',
    links: [
      { key: 'south', label: 'South Ambergris delivery zone' },
      { key: 'mahogany-bay', label: 'delivery to Mahogany Bay Resort' },
    ],
  },

  'belize-yacht-club': {
    slug: 'belize-yacht-club',
    name: 'Belize Yacht Club',
    fullName: 'Belize Yacht Club',
    zone: 'south',
    meta: {
      // VERIFY: manual gives no title or description for this page.
      title: 'Golf Cart Delivery to Belize Yacht Club, San Pedro',
      description:
        'Have a golf cart waiting at Belize Yacht Club when you check in. Free delivery, WhatsApp confirmation, and directions from the resort to Secret Beach and downtown San Pedro.',
      h1: 'Golf Cart Delivery to Belize Yacht Club',
    },
    intro:
      'Belize Yacht Club sits along Coconut Drive at the south end of San Pedro Town, a beachfront condo resort with easy access to both downtown and the south beaches. We deliver golf carts to the Belize Yacht Club reception free of charge. Send us your check-in date and time, and a cart is waiting on arrival. About 5 to 10 minutes drive from our office.',
    hero: {
      image: 'gallery-white-4-seater-one-love-golf-cart',
      alt: 'White One Love 4-seater golf cart with a rear-facing seat, parked on sand',
    },
    facts: [
      { value: 'Free', label: 'delivery to reception' },
      { value: '5–10 min', label: 'from our office' },
      { value: '40 min', label: 'to Secret Beach' },
      { value: '5 min', label: 'to downtown San Pedro' },
    ],
    delivery: {
      h2: 'How delivery works',
      body: 'Standard: send reservation name and check-in time by WhatsApp 24 hours before arrival. We drop the cart at reception, keys held for you.',
      handoff: [
        { label: 'Notice', value: '24 hours before arrival, by WhatsApp' },
        { label: 'Drop-off', value: 'Reception' },
        { label: 'Keys', value: 'Held for you' },
      ],
    },
    routes: [
      {
        h2: 'Directions from Belize Yacht Club to Secret Beach',
        to: 'Secret Beach',
        time: '40 min',
        body: 'North on Coconut Drive, past the airport, through downtown, over the Sir Barry Bowen Bridge, then west on the sand road. About 40 minutes each way.',
      },
      {
        h2: 'Directions from Belize Yacht Club to downtown San Pedro',
        to: 'Downtown San Pedro',
        time: '5 min',
        body: 'North on Coconut Drive for about 5 minutes. Central Park and Belize Chocolate Company are on Barrier Reef Drive one block west of the main north-south corridor.',
      },
    ],
    which: {
      h2: 'Which cart at Belize Yacht Club',
      body: 'Popular with couples and small families booking condo units. 4-seater is the default. 6-seater for larger groups renting multi-bedroom units.',
      image: 'gallery-yellow-4-seater-one-love-golf-cart-lot',
      alt: 'Yellow One Love 4-seater golf cart parked on a paved lot',
    },
    faq: [
      ['Is Belize Yacht Club walkable to town?', 'Yes, about 15 minutes on foot to Central Park. Cart is faster and works in any weather.'],
      ['Does Belize Yacht Club have cart parking?', 'Yes, at the condo units.'],
    ],
    whatsappTemplate: template('Belize Yacht Club'),
    book: 'reserve for Belize Yacht Club delivery',
    links: [{ key: 'south', label: 'South Ambergris delivery zone' }],
  },

  alaia: {
    slug: 'alaia',
    name: 'Alaia Belize',
    fullName: 'Alaia Belize, Autograph Collection',
    zone: 'south',
    meta: {
      // VERIFY: manual gives no title or description for this page.
      title: 'Golf Cart Delivery to Alaia Belize, San Pedro',
      description:
        'Have a golf cart waiting at Alaia Belize when you check in. Free delivery, WhatsApp confirmation, and directions from the resort to Secret Beach and downtown San Pedro.',
      h1: 'Golf Cart Delivery to Alaia Belize',
    },
    intro:
      'Alaia Belize, part of the Marriott Autograph Collection, sits south of San Pedro Town on Coconut Drive with a beachfront setting and full-service resort amenities. We deliver golf carts to the Alaia porte-cochere free of charge. Send us your Marriott confirmation number and check-in time, and a cart is waiting when you arrive. About 15 minutes drive from our office.',
    hero: {
      image: 'gallery-red-white-6-seater-golf-cart',
      alt: 'Red One Love 6-seater golf cart with red and white seats, parked by a white fence',
    },
    facts: [
      { value: 'Free', label: 'delivery to the porte-cochere' },
      { value: '15 min', label: 'from our office' },
      { value: '45 min', label: 'to Secret Beach' },
      { value: '15 min', label: 'to downtown San Pedro' },
    ],
    delivery: {
      h2: 'How delivery works',
      body: 'Standard delivery to the Alaia bell desk. Coordinate through WhatsApp 24 hours ahead. Keys held at reception. Same process on return.',
      handoff: [
        { label: 'Notice', value: '24 hours ahead, by WhatsApp' },
        { label: 'Drop-off', value: 'The Alaia bell desk' },
        { label: 'Keys', value: 'Held at reception' },
        { label: 'Return', value: 'Same process on return' },
      ],
    },
    routes: [
      {
        h2: 'Directions from Alaia Belize to Secret Beach',
        to: 'Secret Beach',
        time: '45 min',
        body: 'North on Coconut Drive from the resort, past the airport, through town, over the bridge, west on the sand road. About 45 minutes each way.',
      },
      {
        h2: 'Directions from Alaia Belize to downtown San Pedro',
        to: 'Downtown San Pedro',
        time: '15 min',
        body: 'North on Coconut Drive. Pass the airport. Continue five minutes to Central Park. Belize Chocolate Company and our office are on Barrier Reef Drive. About 15 minutes each way.',
      },
    ],
    which: {
      h2: 'Which cart at Alaia',
      body: 'Alaia hosts a lot of destination weddings and couples. The 4-seater is the default. Wedding parties often book multiple carts; message us for a group booking arrangement.',
      image: 'gallery-golf-carts-resort-entrance-sunset',
      alt: 'A pink and a yellow One Love golf cart parked at a building entrance in evening light',
    },
    faq: [
      ['Can I use Marriott Bonvoy points toward the cart rental?', 'No. Our rental is a separate transaction from the resort stay.'],
      ['Does Alaia offer cart rental on-property?', 'The resort offers cart service. Our rates are usually lower and delivery is free.'],
      ['Can we rent multiple carts for a wedding party staying at Alaia?', 'Yes. Message us the number of carts and dates and we hold inventory.'],
    ],
    whatsappTemplate: template('Alaia Belize', ['Marriott confirmation number: ']),
    book: 'reserve for Alaia Belize delivery',
    links: [
      { key: 'south', label: 'South Ambergris delivery zone' },
      { key: 'weddings', label: 'wedding cart rental in San Pedro' },
    ],
  },
};
