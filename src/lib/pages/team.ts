/**
 * /meet-the-team/ copy: Execution Manual §19 (utility page "Meet the One Love
 * Team"), verbatim.
 *
 * Every team card in the manual is a [PLACEHOLDER] template. Cards render only
 * for people whose details are filled in; until then the team grid is hidden
 * and no placeholder reaches the page. Founders come from the About page data
 * and the mechanic from the Fleet page data, so each person is entered once.
 */
import type { ImageName } from '@/lib/images';
import { founders, type Founder } from './about';
import { mechanic } from './fleet';

export type StaffMember = { name: string; year: string; photo?: ImageName };

/** Fill these in to show their cards. */
export const bookings = null as StaffMember | null;
export const driver = null as StaffMember | null;

export const meta = {
  title: 'Meet the One Love Team | Family Rental Business, San Pedro',
  description:
    'The people behind One Love Golf Cart Rentals in San Pedro, Belize. Founders, mechanics, delivery drivers, and the family that runs it all.',
  h1: 'Meet the One Love Team',
};

export const intro =
  'One Love is a small team, all based on Ambergris Caye, most of us related. The people below are the ones you meet when you rent a cart, message our WhatsApp, or come by the office at 1 Barrier Reef Drive. No call center. No franchise. No dispatcher between you and the people whose name is on the sign.';

export type TeamCard = { id: string; name: string; role: string; bio: string; photo?: ImageName };

/** The manual's founder card template (adds "With the family since day one." to the About bio). */
function founderCard(f: Founder, i: number): TeamCard {
  return {
    id: `founder-${i + 1}`,
    name: `${f.firstName} ${f.lastName}`,
    role: f.role,
    bio: `Born and raised in ${f.place}. ${f.before} Co-founded One Love in 2017 and today handles ${f.handles}. Speaks English, Spanish, and Kriol. With the family since day one. When not working, spends time ${f.interest}.`,
    photo: f.photo,
  };
}

export const team: TeamCard[] = [
  ...founders.map(founderCard),
  ...(mechanic
    ? [
        {
          id: 'mechanic',
          name: `${mechanic.firstName} ${mechanic.lastName}`,
          role: 'Fleet Mechanic',
          bio: `Runs the workshop and services every cart in the fleet. Joined the team in ${mechanic.year}.${mechanic.certification ? ` Certified on Club Car systems by ${mechanic.certification}.` : ''} On the road whenever a renter needs roadside help. See the full workshop process on our [[Fleet Maintenance page|fleet]].`,
          photo: mechanic.photo,
        },
      ]
    : []),
  ...(bookings
    ? [
        {
          id: 'bookings',
          name: bookings.name,
          role: 'Bookings and Customer Relations',
          bio: `Answers WhatsApp messages, confirms bookings, coordinates delivery timing with arriving flights. On the front line of every rental. Joined the team in ${bookings.year}. Speaks English, Spanish, and Kriol.`,
          photo: bookings.photo,
        },
      ]
    : []),
  ...(driver
    ? [
        {
          id: 'driver',
          name: driver.name,
          role: 'Delivery Driver',
          bio: `Delivers carts to San Pedro Airport, resort front desks, and the water taxi terminal. Grew up on Ambergris Caye. Knows every street, every gate code, every resort back entrance. Joined the team in ${driver.year}.`,
          photo: driver.photo,
        },
      ]
    : []),
];

export const credo = {
  h2: 'How we work',
  body: 'Small team means one thing above all: the same person who books your rental is often the person who delivers your cart, and the person who answers your late-night WhatsApp is someone you have already met. That is the reason our reviews mention names, why our repeat customers ask for specific team members by first name, and why the family behind One Love is not a marketing line.',
};

/** The manual's internal links for this page. */
export const links = {
  about: 'the One Love founding story',
  fleet: 'how our mechanic services the fleet',
  contact: 'message the team on WhatsApp',
  book: 'book with the family behind One Love',
};
