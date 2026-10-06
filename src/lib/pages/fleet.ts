/**
 * /how-we-maintain-our-fleet/ copy: Execution Manual §19 (utility page
 * "How We Maintain Our Golf Cart Fleet"), verbatim.
 *
 * The manual leaves [FLEET SIZE], the mechanic's details and [INSURANCE
 * CARRIER] as placeholders, and no workshop photos exist yet. Until they are
 * supplied:
 * - the fleet size is left out of the H2 and first sentence;
 * - the mechanic section (and its Person schema) is hidden;
 * - the carrier name is left out of the insurance sentence;
 * - "Real photos of the workshop are below." / "Real photos of the workshop."
 *   are dropped, because there are none.
 * VERIFY all of the above with the client, plus the insurance claim itself.
 */
import { business } from '@/lib/business';
import type { ImageName } from '@/lib/images';

/** Fill these in to complete the page. */
export const FLEET_SIZE: number | null = null;
export const INSURANCE_CARRIER = business.insurer;
export const WORKSHOP_PHOTOS = false;
export type Mechanic = {
  firstName: string;
  lastName: string;
  year: string;
  certification?: string;
  photo?: ImageName;
};
export const mechanic: Mechanic | null = null;

const WORKSHOP_LINE = ' Real photos of the workshop are below.';

export const meta = {
  title: 'How We Service Our Golf Cart Fleet | One Love Belize',
  description: `Behind the scenes at One Love: our Club Car maintenance schedule, pre-rental inspection, in-house mechanic, and insurance coverage.${WORKSHOP_PHOTOS ? ' Real photos of the workshop.' : ''}`,
  h1: 'How We Maintain Our Golf Cart Fleet',
};

export const intro = `Every cart in the One Love fleet goes through a checklist before it leaves the lot and again when it comes back. Our in-house mechanic services each cart on a rolling schedule tied to hours and mileage. This page shows exactly what happens between rentals, who does the work, and why we run gas-powered Club Cars instead of the electric alternatives you see elsewhere on the island.${WORKSHOP_PHOTOS ? WORKSHOP_LINE : ''}`;

/** Header facts, restated from the copy. */
export const facts = [
  { value: '9-point', label: 'check before every rental' },
  { value: '30 rentals', label: 'or 100 engine hours: basic service' },
  { value: '90 rentals', label: 'or 400 engine hours: full service' },
  { value: '~45 min', label: 'roadside, anywhere on the island' },
];

export const fleet = {
  h2: FLEET_SIZE ? `Our Fleet: ${FLEET_SIZE} Club Car Golf Carts` : 'Our Fleet: Club Car Golf Carts',
  body: `Our fleet is ${FLEET_SIZE ? `${FLEET_SIZE} ` : ''}Club Car golf carts, split between 4-seater and 6-seater configurations. Every cart in the fleet is gas-powered with an aluminum chassis. The choice of aluminum over steel is deliberate: salt air corrodes steel fast on Ambergris Caye, and aluminum holds up for years of daily rental service where steel would rust through in a fraction of the time. The chassis alone extends the useful life of each cart from three or four seasons on a steel-frame competitor to eight or more on ours.`,
};

export const inspection = {
  h2: 'The Pre-Rental Inspection',
  body: 'Every cart runs through a nine-point check before it leaves the lot for a new rental. Tire pressure and sidewall inspection on all four tires. Front and rear headlight function. Brake pedal firmness and brake light response. Windshield wiper motor and blade condition. Seat belt retractor and lock on every seat position. Parking brake hold on a slight incline. Canopy bolt torque check. Fuel gauge reading noted on the hand-off sheet. A 30-second test drive around the lot to catch anything the static check missed. The check takes about five minutes per cart and catches most problems before they reach a renter.',
  // The nine checks from the paragraph above, wording unchanged.
  checks: [
    'Tire pressure and sidewall inspection on all four tires',
    'Front and rear headlight function',
    'Brake pedal firmness and brake light response',
    'Windshield wiper motor and blade condition',
    'Seat belt retractor and lock on every seat position',
    'Parking brake hold on a slight incline',
    'Canopy bolt torque check',
    'Fuel gauge reading noted on the hand-off sheet',
    'A 30-second test drive around the lot to catch anything the static check missed',
  ],
  time: 'About five minutes per cart.',
};

export const schedule = {
  h2: 'Rolling Service Schedule',
  body: 'Every cart in the fleet runs on a schedule tied to engine hours and rental cycles. Basic services (oil check, tire rotation, brake pad wear check) happen every 30 rentals or 100 engine hours, whichever comes first. Full services (oil and filter change, spark plug replacement, drive belt inspection, chassis wash, canopy hardware check) happen every 90 rentals or 400 engine hours. Major services (engine tune-up, transmission service, full body inspection) happen annually. We log every service by cart in a shared workshop record so nothing gets skipped.',
  // Restated from the paragraph above.
  tiers: [
    { name: 'Basic', when: 'Every 30 rentals or 100 engine hours', items: ['Oil check', 'Tire rotation', 'Brake pad wear check'] },
    { name: 'Full', when: 'Every 90 rentals or 400 engine hours', items: ['Oil and filter change', 'Spark plug replacement', 'Drive belt inspection', 'Chassis wash', 'Canopy hardware check'] },
    { name: 'Major', when: 'Annually', items: ['Engine tune-up', 'Transmission service', 'Full body inspection'] },
  ],
};

export const mechanicSection = {
  h2: 'Our In-House Mechanic',
  body: (m: Mechanic) =>
    `${m.firstName} runs our workshop and services every cart in the fleet. Trained on small-engine mechanics before joining One Love in ${m.year}.${m.certification ? ` Certified on Club Car systems by ${m.certification}.` : ''} On-staff, not contracted, which means the same person who services the cart at 2 pm is available for a roadside call at 7 pm the same day.${m.photo ? ` Photo below shows ${m.firstName} at the workshop.` : ''}`,
};

export const breakdown = {
  h2: 'How We Handle a Breakdown',
  body: 'Breakdowns happen even on a well-maintained fleet. When one happens, the process runs the same every time. The renter messages our WhatsApp at +501-634-9559 with their location. Someone from our team reaches them within about 45 minutes anywhere on Ambergris Caye. Most on-island issues (flat tire, dead battery, stuck starter) get resolved on the spot. Where a spot fix is not possible, we swap the cart for a replacement at no charge. Renters do not pay for roadside support or for a swap caused by mechanical failure. Renters do pay for damage caused by driver error or negligence.',
  // Restated from the paragraph above.
  steps: [
    { when: 'You message', what: 'Our WhatsApp at +501-634-9559 with your location.' },
    { when: 'About 45 minutes', what: 'Someone from our team reaches you, anywhere on Ambergris Caye.' },
    { when: 'On the spot', what: 'Most issues (flat tire, dead battery, stuck starter) get resolved.' },
    { when: 'Or a swap', what: 'A replacement cart at no charge.' },
  ],
  pay: [
    { label: 'You do not pay for', value: 'Roadside support, or a swap caused by mechanical failure' },
    { label: 'You do pay for', value: 'Damage caused by driver error or negligence' },
  ],
};

export const insurance = {
  h2: 'Insurance and Liability',
  body: `Every cart in the fleet is insured${INSURANCE_CARRIER ? ` with ${INSURANCE_CARRIER}` : ''} for third-party liability and basic collision. The renter is responsible for the deductible on any claim arising from the rental period, up to the amount of the security deposit. Coverage does not extend to driving under the influence, driving off designated roads, or driving by an undisclosed driver. Full rental terms are on our [[terms and conditions page|terms]].`,
  // Restated from the paragraph above.
  tips: [
    { label: 'Covered', value: 'Third-party liability and basic collision' },
    { label: 'Your share', value: 'The deductible, up to the amount of the security deposit' },
    { label: 'Not covered', value: 'Driving under the influence, off designated roads, or by an undisclosed driver' },
  ],
};

export const chassis = {
  h2: 'The Aluminum Chassis Argument for Salt Air',
  body: 'Ambergris Caye is a barrier island. Every road on the island runs within a mile of the Caribbean. Salt air is present in the atmosphere at all times, and steel oxidizes fast in salt air. A steel-chassis golf cart on this island shows rust within a year and structural corrosion within three. Aluminum does not oxidize the same way; a properly-maintained aluminum-chassis cart holds structural integrity for a decade or more. The choice of Club Car for our fleet is driven by this single fact, and it is the reason our fleet stays serviceable at a scale that would bankrupt a steel-chassis operator.',
  // Restated from the paragraph above.
  timeline: [
    { when: 'Within a year', what: 'Steel chassis shows rust', steel: true },
    { when: 'Within three', what: 'Steel chassis shows structural corrosion', steel: true },
    { when: 'A decade or more', what: 'Aluminum chassis holds structural integrity', steel: false },
  ],
};

export const renters = {
  h2: 'What This Means for Renters',
  body: "Every cart you rent from us has been inspected within days of your rental. The mechanic who did that inspection is the same person answering the WhatsApp if something goes wrong at 10 pm on a Thursday. The chassis under the cart will outlast most tourists' entire time on the island. This is what you are paying for when you pick a real operator over a bargain rental with a rented photocopied license and a phone that stops answering after the deposit clears.",
};

/** The manual's internal links for this page. */
export const links = {
  carts: 'the Club Car 4-seater and 6-seater we service',
  about: 'about One Love Golf Cart Rentals',
  team: 'meet the team behind the fleet',
  rates: 'rates for a well-maintained cart',
  book: 'reserve a serviced cart',
  terms: 'rental terms and liability',
};

export const roadsideMessage = 'Hi One Love, I need roadside help with my cart.\nMy location: \nWhat is happening: ';
