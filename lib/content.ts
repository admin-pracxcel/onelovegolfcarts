/**
 * Every visible string on the homepage.
 *
 * The Web Developer Brief gives all page copy, H1s, H2s, meta tags, alt text
 * and schema values to the SEO professional, not to engineering. Keeping the
 * strings in one typed module means they can be edited without touching a
 * component, and a diff on this file is a copy review.
 *
 * Source: Execution Manual section 04 (Homepage), verbatim unless noted in
 * docs/DESIGN-NOTES.md under "Decisions you should know about".
 */

import type { IconName } from "@/components/IconSprite";

export type Zone = {
  title: string;
  body: string;
  time: string;
  /** Delivery zones with a dedicated landing page link out; the rest do not. */
  href?: string;
};

/** An image and everything needed to render it, so the fields travel together. */
export type Media = { src: string; width: number; height: number; alt: string };

export type WhyCell = {
  tone: "navy" | "aqua" | "plain";
  title: string;
  body: string;
  icon?: IconName;
  media?: Media;
};

export type GuideCard = {
  slot: "a" | "b" | "c" | "d";
  tone: "photo" | "tint" | "aqua";
  href: string;
  title: string;
  body: string;
  cta: string;
  icon?: IconName;
  media?: Media;
};

export type Cart = {
  id: string;
  anchor: string;
  chip: string;
  chipTone: "aqua" | "onphoto";
  title: [string, string];
  price: string;
  priceUnit: string;
  specs: string[];
  body: string;
  cta: string;
  image: string;
  width: number;
  height: number;
  alt: string;
};

export const BUSINESS = {
  name: "One Love Golf Cart Rentals",
  phone: "+501-634-9559",
  phoneDisplay: "+501 634-9559",
  phoneHref: "tel:+5016349559",
  whatsapp: "https://wa.me/5016349559",
  email: "onelovecartsrental@hotmail.com",
  street: "1 Barrier Reef Drive",
  locality: "San Pedro Town",
  region: "Ambergris Caye",
  country: "BZ",
  lat: 17.9178392,
  lng: -87.9631848,
  founded: "2017",
  hours: "9:00 am to 9:00 pm, every day",
  opens: "09:00",
  closes: "21:00",
  rating: "4.9",
  reviewCount: "104",
  maps:
    "https://www.google.com/maps/place/One+Love+Golf+Cart+Rental/@17.9178392,-87.9631848,15z",
  tripadvisor:
    "https://www.tripadvisor.com/Attraction_Review-g291962-d23212104-Reviews-One_love_golf_cart_rentals-San_Pedro_Ambergris_Caye_Belize_Cayes.html",
  facebook:
    "https://www.facebook.com/One-Love-Golf-Cart-Rentals-106311858296426",
  instagram: "https://www.instagram.com/onelovegolfcarts/",
  x: "https://twitter.com/onelovegolfcart",
} as const;

export const META = {
  title: "Golf Cart Rental San Pedro Belize | One Love Golf Cart Rentals",
  description:
    "Family-owned 4 and 6 seater golf cart rental in San Pedro Belize from $35 a day. Free delivery to your hotel or the airport. Book online in two minutes.",
  canonical: "https://onelovegolfcartsbelize.com/",
  ogImageAlt:
    "Branded One Love 6-seater golf cart parked on the beachfront in San Pedro, Belize with the Caribbean visible in the background.",
} as const;

export const RIBBON = {
  lead: "Unlimited bridge passes",
  wide: " to North Ambergris",
  mid: " included",
  wideTail: " with every rental",
} as const;

export const HERO = {
  eyebrow: "San Pedro · Ambergris Caye",
  headline: "Golf Cart Rental",
  headlineMuted: "in San Pedro, Belize",
  sub: "Family-owned since 2017. 4-seater from $35 a day. 6-seater from $60 a day. Free delivery anywhere on Ambergris Caye.",
  primary: "Book now",
  secondary: "See rates",
  image: {
    wide: "/img/hero-one-love-golf-cart-beachfront-san-pedro",
    tall: "/img/hero-one-love-golf-cart-beachfront-san-pedro-portrait",
    alt: META.ogImageAlt,
  },
} as const;

export const QUICK_BOOK = {
  cartLabel: "Cart",
  fromLabel: "Pick-up",
  toLabel: "Return",
  submit: "Check availability",
  options: [
    { value: "4-seater", label: "4-seater · from $35 a day" },
    { value: "6-seater", label: "6-seater · from $60 a day" },
  ],
} as const;

export const TRUST: { icon?: IconName; value: string; rest: string }[] = [
  { icon: "star-fill", value: BUSINESS.rating, rest: "Tripadvisor" },
  { value: "104+", rest: "five-star reviews" },
  { value: "Est. 2017", rest: "family-owned" },
  { icon: "map-pin-bold", value: "Barrier Reef Drive", rest: "" },
  { icon: "shield-check-bold", value: "Licensed", rest: "and insured" },
];

export const LEDE = {
  big: "One Love Golf Cart Rentals is a family-owned rental service on Barrier Reef Drive in San Pedro Town,",
  bigMuted: "Ambergris Caye.",
  rest: "We rent street-legal 4-seater and 6-seater gas-powered Club Car golf carts from $35 a day and $175 a week, deliver free to your hotel or the airport, and answer WhatsApp messages every day from nine in the morning until nine at night. We have been renting to visitors and locals on Ambergris Caye since 2017.",
} as const;

export const FLEET: {
  eyebrow: string; headline: string; headlineMuted: string;
  compare: { label: string; href: string };
  carts: Cart[];
} = {
  eyebrow: "The fleet",
  headline: "Two carts.",
  headlineMuted: "Both gas Club Car.",
  compare: { label: "Compare the two", href: "/golf-cart-comparison-4-vs-6-seater/" },
  carts: [
    {
      id: "cart-4",
      anchor: "/our-carts/#4-seater",
      chip: "Most rented",
      chipTone: "aqua",
      title: ["4-Seater", "Club Car"],
      price: "$35",
      priceUnit: "per day · $175 wk",
      specs: ["Seats 4", "Gas", "Aluminum chassis", "Seat belts"],
      body: "Seats four adults, gas-powered, aluminum chassis, headlights, wipers, seat belts. Our most-rented cart, and the right pick for couples, small families, and anyone with a single suitcase apiece. Weekly rate $175. Free delivery to your hotel or the airport.",
      cta: "See the 4-seater",
      image: "/img/green-golf-cart-palms-san-pedro-town",
      width: 1000,
      height: 667,
      alt: "Side view of a green 4-seater Club Car golf cart with black canopy, rented by One Love, parked on a palm-lined street in San Pedro Town.",
    },
    {
      id: "cart-6",
      anchor: "/our-carts/#6-seater",
      chip: "For groups",
      chipTone: "onphoto",
      title: ["6-Seater", "Club Car"],
      price: "$60",
      priceUnit: "per day · $350 wk",
      specs: ["Seats 6", "Rear bench", "Gas", "Luggage room"],
      body: "Seats six adults with a rear-facing bench, gas-powered, same chassis and safety kit as the 4-seater. The right pick for groups of five or more, families with luggage, and airport runs. Weekly rate $350. Free delivery included.",
      cta: "See the 6-seater",
      image: "/img/six-seater-club-car-golf-cart-ambergris-caye",
      width: 1100,
      height: 733,
      alt: "Six-seater Club Car golf cart with rear-facing bench seat, One Love rental in Ambergris Caye.",
    },
  ],
};

export const WHY: {
  headline: string;
  headlineMuted: string;
  cells: WhyCell[];
  band: { title: string; body: string; media: Media };
} = {
  headline: "Why rent",
  headlineMuted: "from One Love",
  cells: [
    {
      tone: "navy",
      icon: "truck-bold",
      title: "Free delivery, anywhere on the island.",
      body: "We meet you at San Pedro Airport, at the water taxi, at your hotel front desk, or at any address on Ambergris Caye. Pickup is free too. You keep both hands on your suitcase, we handle the cart.",
    },
    {
      tone: "aqua",
      icon: "ticket-bold",
      title: "Unlimited bridge passes included.",
      body: "Every rental comes with unlimited passes over the Sir Barry Bowen Bridge to North Ambergris Caye. Secret Beach, Truck Stop, and everything above the bridge stays open to you at no extra cost.",
    },
    {
      tone: "plain",
      icon: "lifebuoy-bold",
      title: "Twenty-four seven roadside support.",
      body: "A flat tire on the way back from dinner, a low battery at the beach, a question about the route. Message our WhatsApp at any hour and we come to you.",
    },
  ],
  band: {
    title: "Fleet you can trust.",
    body: "Our carts are all Club Car with aluminum chassis suited to salt air. Every cart gets serviced on a rolling schedule and inspected before it leaves the lot. Fewer breakdowns, safer drives, less time lost.",
    media: {
      src: "/img/one-love-golf-cart-fleet-lineup-san-pedro",
      width: 1600,
      height: 685,
      alt: "Five One Love Club Car golf carts lined up under palms in San Pedro, in red, yellow, camouflage, pink and white, each with a Belize licence plate.",
    },
  },
};

export const DELIVERY: {
  eyebrow: string; headline: string; intro: string;
  photo: { src: string; width: number; height: number; alt: string };
  zones: Zone[];
} = {
  eyebrow: "Delivery zones",
  headline: "Where we deliver",
  intro:
    "Our office sits at 1 Barrier Reef Drive in San Pedro Town, opposite Belize Chocolate Company, halfway between the Marine Terminal and San Pedro Airport. We deliver golf carts free to every address on Ambergris Caye. That includes the SPR airport gate for Tropic Air and Maya Island Air arrivals, the water taxi terminal for San Pedro Belize Express and Ocean Ferry passengers, every resort south of town along Coconut Drive, every hotel and condo in San Pedro Town itself, and everything north of the Sir Barry Bowen Bridge including Secret Beach, Truck Stop, and the long stretch up toward Bacalar Chico. Unlimited bridge passes come with every rental. There is no route on the island we cannot reach.",
  photo: {
    src: "/img/golf-cart-delivery-san-pedro-airport-tropic-air",
    width: 860,
    height: 1075,
    alt: "One Love golf cart waiting outside the Tropic Air terminal at San Pedro Airport for a delivery handover.",
  },
  zones: [
    {
      title: "San Pedro Airport (SPR)",
      body: "Meet at the terminal entrance.",
      time: "5 min away",
      href: "/rentals-at-san-pedro-airport/",
    },
    {
      title: "Water Taxi terminal",
      body: "San Pedro Belize Express and Ocean Ferry passengers, meet us at the Marine Terminal.",
      time: "4 min away",
    },
    {
      title: "San Pedro Town hotels",
      body: "Ramon’s Village, SunBreeze, Mayan Princess, and every guesthouse in town.",
      time: "To your front desk",
    },
    {
      title: "South Ambergris Caye",
      body: "Mahogany Bay, Victoria House, Belize Yacht Club, Alaia Belize and Xanadu, along Coconut Drive.",
      time: "15 to 25 min",
      href: "/south-ambergris-delivery/",
    },
    {
      title: "North Ambergris Caye",
      body: "Grand Caribe, Coco Beach Resort, Las Terrazas and Costa Blu. Cross the bridge, timing depends on the address.",
      time: "30 to 45 min",
      href: "/north-ambergris-delivery/",
    },
    {
      title: "Secret Beach and Truck Stop",
      body: "The northwestern edge of the island. Most renters pick up in San Pedro Town and drive north themselves.",
      time: "About 1 hr",
      href: "/delivery-to-secret-beach/",
    },
  ],
};

export const PROCESS = {
  headline: "How it works",
  steps: [
    {
      n: "01",
      title: "Pick your cart and dates.",
      body: "Fill in the reservation form or send a WhatsApp message to +501-634-9559 with your arrival date, departure date, and where you are staying. Under two minutes either way.",
    },
    {
      n: "02",
      title: "We confirm within 15 minutes.",
      body: "A real person from the family, not an automated system, replies to confirm cart availability, delivery timing, and any questions about your delivery location. If you have a flight or ferry arrival time, send it, and we work backward from there.",
    },
    {
      n: "03",
      title: "Cart at your door on arrival day.",
      body: "We meet you at the airport gate, the water taxi terminal, or your hotel with the keys, a quick walkthrough of the cart controls, and a paper map with the roads marked. You sign, we hand over the keys, you drive off.",
    },
  ],
} as const;

/**
 * Verbatim Google reviews from the live listing. The Trustindex widget does
 * not expose review dates, so the Manual's "name, month, year, source" format
 * ships without dates until the SEO professional supplies them. Do not invent
 * them and do not edit review text.
 */
export const REVIEWS = {
  headline: "What our customers",
  headlineMuted: "say",
  featured: {
    quote:
      "“Junior was very punctual and great with communication. He was waiting for us at the airport upon arrival, went over the rules of the road and how to use the golf carts. They were well maintained and reliable for our time on the island.”",
    name: "Emily L.",
  },
  side: [
    {
      quote:
        "“Honest company, the price includes everything but gas, don’t get stuck paying 2-3 times the cost to rent at a resort. We will definitely rent from Junior and One Love again!”",
      name: "Josh A.",
    },
    {
      quote:
        "“If you need a golf cart on San Pedro you can’t go wrong with One Love Golf Cart. They were great from start to finish! I’ll definitely use them again.”",
      name: "Curtis M.",
    },
  ],
  footLine: "Rated 4.9 on Tripadvisor across 104+ reviews",
  footCta: "Read them all",
} as const;

export const GUIDES: {
  headline: string; headlineMuted: string; cards: GuideCard[];
} = {
  headline: "Explore Ambergris Caye",
  headlineMuted: "by cart",
  cards: [
    {
      slot: "a",
      tone: "photo",
      href: "/the-secret-beach-route/",
      title: "The Secret Beach Route",
      body: "Turn-by-turn from San Pedro Town over the Sir Barry Bowen Bridge to Coco Loco’s, Blue Bayou, and the sandbar beyond. About 25 minutes each way.",
      cta: "Read the route guide",
      media: {
        src: "/img/golf-cart-parked-beach-palms-ambergris-caye",
        width: 1000,
        height: 667,
        alt: "One Love golf cart parked beside palms on the beachfront at Ambergris Caye.",
      },
    },
    {
      slot: "b",
      tone: "tint",
      href: "/where-to-refuel-ambergris-caye/",
      icon: "gas-pump-bold",
      title: "Where to Refuel",
      body: "Three gas stations on Ambergris Caye, when each opens, what you pay per gallon, and how far a full tank actually gets you.",
      cta: "Read the fuel guide",
    },
    {
      slot: "c",
      tone: "aqua",
      href: "/how-to-drive-a-golf-cart-like-a-local/",
      icon: "map-trifold-bold",
      title: "How to Drive Like a Local",
      body: "Official rules, unwritten local etiquette, the one-way streets in San Pedro Town, and the mistakes tourists usually make in their first hour.",
      cta: "Read the driving guide",
    },
    {
      slot: "d",
      tone: "photo",
      href: "/twenty-stops-worth-the-drive/",
      title: "Twenty Stops Worth the Drive",
      body: "Secret Beach, Truck Stop, Wayo’s Beach Bar, Estel’s Dine by the Sea, Palapa Bar, Fido’s Courtyard, and fifteen more places worth the cart ride.",
      cta: "Read the things-to-do guide",
      media: {
        src: "/img/guests-driving-one-love-golf-cart-san-pedro",
        width: 1000,
        height: 667,
        alt: "Guests riding a One Love 6-seater golf cart along a busy street in San Pedro Town.",
      },
    },
  ],
};

export const FAQ = {
  headline: "Frequently",
  headlineMuted: "asked",
  aside:
    "Still not sure about something? Message us on WhatsApp and a real person answers, nine in the morning until nine at night.",
  cta: "Message on WhatsApp",
  items: [
    {
      q: "Do I need a driver’s license to rent a golf cart in San Pedro?",
      a: "Yes. Belize law requires a valid driver’s license from your home country. All primary drivers must be at least 18. We keep a copy of your license on file for the length of the rental.",
    },
    {
      q: "How much does a golf cart cost per day in San Pedro?",
      a: "Our 4-seater is $35 a day or $175 a week in US dollars. Our 6-seater is $60 a day or $350 a week. Prices include free delivery on Ambergris Caye and unlimited bridge passes to North Ambergris Caye.",
    },
    {
      q: "Can you deliver a cart to my hotel or the airport?",
      a: "Yes. We deliver free anywhere on Ambergris Caye, including San Pedro Airport (SPR), every resort, and every water taxi arrival point. Message us the day before with your arrival time and location.",
    },
    {
      q: "Can I drive the cart over the bridge to Secret Beach?",
      a: "Yes. Every rental includes unlimited passes over the Sir Barry Bowen Bridge to North Ambergris Caye, which is how you reach Secret Beach, Truck Stop, and the northern end of the island.",
    },
    {
      q: "What happens if the cart breaks down?",
      a: "Message our WhatsApp at +501-634-9559 and someone will reach you. Most on-island issues get fixed in under an hour. If we cannot fix it on the spot, we swap the cart at no charge.",
    },
    {
      q: "Do you rent by the hour, or only by the day?",
      a: "Daily and weekly. One-day bookings are subject to fleet availability and need to be confirmed the day before you arrive. Multi-day and weekly bookings can be reserved anytime.",
    },
  ],
} as const;

export const CLOSING = {
  headline: "Ready",
  headlineMuted: "when you are.",
  body: "Fill in the reservation form or send a WhatsApp to +501-634-9559. Confirmation in under 15 minutes during business hours. Free delivery anywhere on Ambergris Caye.",
  primary: "Book now",
  secondary: "Message on WhatsApp",
} as const;

export const VERIFIED =
  "Last verified September 2026. Rates, hours, and delivery zones on this page are checked and updated at least monthly.";

export const NAV = [
  {
    label: "Golf Carts",
    href: "/our-carts/",
    children: [
      { label: "4-Seater", href: "/our-carts/#4-seater" },
      { label: "6-Seater", href: "/our-carts/#6-seater" },
      { label: "Compare Carts", href: "/golf-cart-comparison-4-vs-6-seater/" },
      { label: "Fleet Maintenance", href: "/how-we-maintain-our-fleet/" },
    ],
  },
  {
    label: "Locations",
    href: "/ambergris-caye/",
    children: [
      { label: "San Pedro", href: "/golf-cart-rental-san-pedro/" },
      { label: "Ambergris Caye", href: "/ambergris-caye/" },
      { label: "Secret Beach", href: "/delivery-to-secret-beach/" },
      { label: "Airport Delivery", href: "/rentals-at-san-pedro-airport/" },
      { label: "Resort Delivery", href: "/resort-delivery/" },
    ],
  },
  { label: "Rates", href: "/rates/" },
  {
    label: "About",
    href: "/about-us/",
    children: [
      { label: "Our Story", href: "/about-us/" },
      { label: "Meet the Team", href: "/about-us/#team" },
      { label: "Gallery", href: "/gallery/" },
    ],
  },
  { label: "Blog", href: "/blog/" },
];

export const FOOTER = {
  blurb:
    "Street-legal 4-seater and 6-seater Club Car golf carts, delivered free anywhere on Ambergris Caye.",
  established: "Established 2017 in San Pedro, Ambergris Caye, Belize.",
  explore: [
    { label: "Golf Carts", href: "/our-carts/" },
    { label: "Rates", href: "/rates/" },
    { label: "Locations", href: "/ambergris-caye/" },
    { label: "Blog", href: "/blog/" },
    { label: "Fleet Maintenance", href: "/how-we-maintain-our-fleet/" },
    { label: "About", href: "/about-us/" },
  ],
  book: [
    { label: "Book now", href: "/book-now/" },
    { label: "Pay Now", href: "/pay-now/" },
    { label: "Contact", href: "/contact/" },
    { label: "Airport Delivery", href: "/rentals-at-san-pedro-airport/" },
    { label: "Resort Delivery", href: "/resort-delivery/" },
    { label: "WhatsApp us", href: BUSINESS.whatsapp, external: true },
  ],
  legal: [
    { label: "Terms & Conditions", href: "/terms-conditons/" },
    { label: "Privacy Policy", href: "/privacy-policy-2/" },
    { label: "Sitemap", href: "/sitemap_index.xml" },
  ],
  copyright:
    "© 2026 One Love Golf Cart Rentals. San Pedro Town, Ambergris Caye, Belize.",
} as const;
