/**
 * /gallery/ copy: Execution Manual §11. Intro and section intros verbatim
 * (one intro sentence omitted, see below). Every photo is a real One Love
 * cart from the client's existing site; the AI-looking blog images are
 * excluded. Alt text follows the manual's templates and describes what is
 * actually in each photo; captions are shorter and add context.
 */
import type { ImageName } from '../images';

export const meta = {
  title: 'Golf Cart Photo Gallery | One Love Rentals, San Pedro Belize',
  description:
    'See our fleet of 4-seater and 6-seater golf carts in action across Ambergris Caye. Real photos of our Club Car rentals in San Pedro.',
  h1: 'Photos of Our Golf Cart Fleet on Ambergris Caye',
};

// Manual sentence omitted until those photos exist: "Cart glamour shots,
// customer moments at hand-off, delivery runs at San Pedro Airport, and
// workshop shots of our mechanic servicing the fleet all sit in the
// sections below." (no hand-off or workshop photos have been supplied).
export const intro =
  'Every photo below shows a real One Love cart on Ambergris Caye. We keep the fleet clean, well-maintained, and ready to hand off. Click any image to see it full-size. To reserve a specific cart or ask about a specific feature, message us on WhatsApp at +501-634-9559.';

export type Photo = { image: ImageName; alt: string; caption: string; top?: boolean };
export type GallerySection = { id: string; title: string; intro: string; links?: { text: string; key: string }[]; photos: Photo[] };

export const sections: GallerySection[] = [
  {
    id: 'four-seaters',
    title: 'Our 4-Seater Fleet',
    intro:
      'Our 4-seater Club Cars are the most-rented cart in the fleet. Every one has a canopy, headlights, seat belts, and the aluminum chassis that handles the salt air. Rate $35 a day, $175 a week.',
    links: [{ text: '4-seater specifications and pricing', key: '4-seater' }],
    photos: [
      { image: 'red-4-seater-club-car-bougainvillea-resort', top: true, alt: 'Red lifted 4-seater Club Car golf cart with black canopy parked on white sand beside pink bougainvillea in San Pedro, Belize', caption: 'Red 4-seater by the bougainvillea' },
      { image: 'one-love-fleet-lineup-under-palms', top: true, alt: 'Yellow, pink, orange, grey and yellow One Love 4-seater golf carts lined up under palm trees in San Pedro, Belize', caption: 'Part of the fleet, lined up under the palms' },
      { image: 'green-golf-cart-san-pedro-central-park', top: true, alt: 'Green lifted 4-seater golf cart with black canopy parked beside the San Pedro town park and flamboyant tree in San Pedro, Belize', caption: 'Green 4-seater by the town park' },
      { image: 'gallery-pink-4-seater-golf-cart-sand', top: true, alt: 'Pink 4-seater golf cart with pink and black seats and a pink canopy parked on sand in San Pedro, Belize', caption: 'The pink 4-seater' },
      { image: 'gallery-navy-4-seater-one-love-golf-cart', alt: 'Navy One Love 4-seater golf cart with cream seats and a rear-facing flip seat parked on a street in San Pedro, Belize', caption: 'Navy 4-seater with rear flip seat' },
      { image: 'teal-4-seater-golf-cart-side-profile', alt: 'Teal One Love 4-seater golf cart with lifted wheels, side profile, parked on a street in San Pedro, Belize', caption: 'Teal 4-seater, side profile' },
      { image: 'gallery-golf-cart-line-up-turquoise-house', alt: 'Red, yellow, camouflage, pink and white 4-seater golf carts lined up in front of a turquoise house in San Pedro, Belize', caption: 'Five colours, one line-up' },
      { image: 'gallery-light-blue-4-seater-golf-cart-street', alt: 'Light blue One Love 4-seater golf cart parked on a paved street in San Pedro, Belize', caption: 'Light blue 4-seater in town' },
      { image: 'camo-golf-cart-colourful-san-pedro-street', alt: 'Camouflage-print 4-seater golf cart parked outside a yellow and lime-green building in San Pedro, Belize', caption: 'Camo 4-seater outside a lime-green door' },
      { image: 'gallery-blue-4-seater-golf-cart-seaside', alt: 'Blue One Love 4-seater golf cart parked by the sea under a palm tree in San Pedro, Belize', caption: 'Blue 4-seater by the water' },
      { image: 'gallery-red-4-seater-golf-cart-san-pedro-street', alt: 'Red 4-seater golf cart with black and red seats parked on a narrow paved street in San Pedro Town, Belize', caption: 'Red 4-seater on a San Pedro street' },
      { image: 'gallery-yellow-4-seater-one-love-golf-cart-lot', alt: 'Yellow One Love 4-seater golf cart with black seats parked among the fleet in San Pedro, Belize', caption: 'Yellow 4-seater ready to go' },
      { image: 'gallery-lime-green-4-seater-golf-cart', alt: 'Lime green 4-seater golf cart with black canopy parked under a building in San Pedro, Belize', caption: 'Lime green 4-seater' },
      { image: 'gallery-blue-4-seater-golf-cart-street', alt: 'Blue One Love 4-seater golf cart with lifted wheels parked on a paved street in San Pedro, Belize', caption: 'Blue 4-seater, lifted' },
      { image: 'gallery-white-4-seater-one-love-golf-cart', alt: 'White One Love 4-seater golf cart with black seats and a rear-facing flip seat parked at the One Love lot in San Pedro', caption: 'White 4-seater at the lot' },
      { image: 'gallery-maroon-4-seater-one-love-golf-cart', alt: 'Maroon One Love 4-seater golf cart with cream seats parked at the One Love lot in San Pedro', caption: 'Maroon 4-seater at the lot' },
      { image: 'blue-golf-cart-one-love-lot', alt: 'Blue One Love 4-seater golf cart with blue and black seats parked under the shade at the One Love lot in San Pedro', caption: 'Blue 4-seater in the shade' },
      { image: 'gallery-yellow-4-seater-golf-cart-close-up', alt: 'Yellow 4-seater golf cart with a yellow canopy and windshield, front three-quarter view, in San Pedro, Belize', caption: 'Yellow 4-seater, front view' },
      { image: 'gallery-four-colourful-golf-carts-line-up', alt: 'Four lifted golf carts in silver, red, yellow and blue with matching canopies lined up in San Pedro, Belize', caption: 'Silver, red, yellow and blue' },
    ],
  },
  {
    id: 'six-seaters',
    title: 'Our 6-Seater Fleet',
    intro:
      'Our 6-seater Club Cars carry four adults forward-facing plus two more on a rear bench. Same chassis, same safety kit. Rate $60 a day, $350 a week.',
    links: [{ text: '6-seater specifications and pricing', key: '6-seater' }],
    photos: [
      { image: 'orange-6-seater-golf-cart-san-pedro-street', top: true, alt: 'Orange One Love 6-seater golf cart with two forward rows and a rear bench parked on a paved street in San Pedro, Belize', caption: 'Orange 6-seater on a San Pedro street' },
      { image: 'maroon-6-seater-golf-cart-beachfront-park', top: true, alt: 'Maroon One Love 6-seater golf cart parked by the colourful beachfront park in San Pedro, Belize, with the sea behind', caption: 'Maroon 6-seater at the beachfront' },
      { image: 'navy-6-seater-golf-cart-rear-bench-profile', top: true, alt: 'Navy One Love 6-seater golf cart side profile showing two forward benches and the rear-facing bench in San Pedro, Belize', caption: 'Navy 6-seater, side profile' },
      { image: 'gallery-yellow-6-seater-golf-cart-white-fence', alt: 'Yellow 6-seater golf cart with black and gold seats parked in front of a white picket fence in San Pedro, Belize', caption: 'Yellow 6-seater by the picket fence' },
      { image: 'gallery-maroon-6-seater-one-love-golf-cart', alt: 'Maroon One Love 6-seater golf cart with red and blue seats parked on a street in San Pedro, Belize', caption: 'Maroon 6-seater, lifted' },
      { image: 'gallery-red-white-6-seater-golf-cart', alt: 'Red One Love 6-seater golf cart with red and white seats parked beside steps on a street in San Pedro, Belize', caption: 'Red and white 6-seater' },
    ],
  },
  {
    id: 'delivery',
    title: 'Delivery in Action',
    intro:
      'Carts delivered to San Pedro Airport arrivals, the Marine Terminal water taxi dock, and resorts along Coconut Drive. Every delivery is free anywhere on Ambergris Caye.',
    photos: [
      { image: 'golf-cart-tropic-air-terminal-san-pedro-airport', top: true, alt: 'Red lifted One Love golf cart parked outside the Tropic Air terminal at San Pedro Airport on Ambergris Caye', caption: 'Waiting at the Tropic Air terminal, San Pedro Airport' },
      { image: 'guests-luggage-golf-carts-village-mart', top: true, alt: 'Guests with luggage setting off in a line of One Love golf carts outside Village Mart on Ambergris Caye', caption: 'Bags loaded, heading off from Village Mart' },
      { image: 'gallery-golf-carts-tropic-air-terminal', alt: 'Yellow and orange golf carts parked outside the Tropic Air terminal at San Pedro Airport on Ambergris Caye', caption: 'Two carts at the Tropic Air terminal' },
      { image: 'gallery-golf-carts-resort-entrance-sunset', alt: 'Pink and yellow One Love golf carts parked at a resort entrance at sunset on Ambergris Caye', caption: 'Delivered to a resort entrance at sunset' },
    ],
  },
  {
    id: 'customers',
    title: 'Customers & Occasions',
    intro: 'Wedding parties, family reunions, snorkel days, sunset runs, grocery hauls. What the fleet actually does out on the island.',
    links: [{ text: 'rental rates for the fleet', key: 'rates' }],
    photos: [
      { image: 'guests-golf-cart-convoy-beachfront-san-pedro', top: true, alt: 'Visitors in a convoy of One Love golf carts on the beachfront street in San Pedro, Ambergris Caye, under palm trees', caption: 'A group convoy on the beachfront street' },
      { image: 'gallery-guests-golf-carts-san-pedro-street', alt: 'Guests driving a line of One Love golf carts down a street in San Pedro, Ambergris Caye', caption: 'Out exploring San Pedro Town' },
      { image: 'gallery-blue-golf-cart-parked-shop', alt: 'Blue One Love golf cart parked in a customer parking spot outside a shop in San Pedro, Ambergris Caye', caption: 'Parked up for a shop stop' },
    ],
  },
];
