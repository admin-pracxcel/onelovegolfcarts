/**
 * /contact/ copy: paste-ready strings from Execution Manual §09, verbatim.
 * Inline links use [[anchor|urlKey]] (components/RichText).
 */

export const meta = {
  title: 'Contact One Love Golf Cart Rentals | San Pedro, Belize',
  description:
    'Reach One Love Golf Cart Rentals by WhatsApp, phone, or email. On Barrier Reef Drive in San Pedro Town. Open 9am to 9pm daily.',
  h1: 'Contact One Love Golf Cart Rentals',
};

export const intro =
  'The fastest way to reach us is WhatsApp at +501-634-9559. Messages sent between 9 in the morning and 9 at night get a reply within about 15 minutes. Messages sent outside those hours get a reply first thing the next morning, or sooner if it is a road emergency. Our office is on Barrier Reef Drive across from Belize Chocolate Company in San Pedro Town.';

export const whatsapp = {
  h2: 'WhatsApp us',
  body: 'The fastest way to reach us. Messages during business hours (9 am to 9 pm Belize time, daily) get a reply within about 15 minutes. Outside those hours, expect a reply first thing the next morning, or sooner if the message flags an urgent road issue. Send us your dates, your arrival flight or ferry, and your delivery address, and we handle the rest.',
  cta: 'Open WhatsApp chat',
};

export const phone = {
  h2: 'Call us',
  body: 'Same number as WhatsApp. Voice calls are answered during business hours. If we miss your call, WhatsApp gets a faster response since messages queue and phone lines do not.',
  cta: 'Tap to call',
};

export const email = {
  h2: 'Email us',
  body: 'Suited for longer messages, attachments (license photo, group manifests, event schedules), and any question that needs a written record. Email replies usually come within four business hours. For anything time-sensitive, WhatsApp is still the fastest route.',
};

export const office = {
  h2: 'Visit the office',
  body: '1 Barrier Reef Drive, San Pedro Town, Ambergris Caye, Belize. On the east side of Barrier Reef Drive, directly opposite Belize Chocolate Company. Open in person from 9 am to 9 pm daily.',
  directions: [
    {
      from: 'From San Pedro Airport (SPR)',
      text: 'Walk out the front of the airport terminal, turn left onto Coconut Drive, then right at the second intersection onto Barrier Reef Drive. Continue about half a kilometer north. One Love is on the left at #1 Barrier Reef Drive, opposite Belize Chocolate Company. Total walk time: about 8 minutes.',
    },
    {
      from: 'From the water taxi terminal',
      text: 'Exit the water taxi terminal onto Black Coral Street. Turn left onto Barrier Reef Drive. Walk south for about three minutes. Our office is on the right, opposite Belize Chocolate Company.',
    },
    { from: 'From Belize Chocolate Company', text: 'Cross the street. We are directly opposite.' },
  ],
};

export const hours = {
  h2: 'Open hours',
  body: '9 am to 9 pm, seven days a week. Closed only on Christmas Day and Good Friday. Public holidays otherwise are regular hours. WhatsApp stays monitored outside those hours for urgent road issues and roadside support.',
};

export const social = {
  h2: 'Follow us',
  items: [
    { key: 'facebook', name: 'Facebook', handle: 'One Love Golf Cart Rentals', note: 'Daily photos, seasonal offers, event updates.' },
    { key: 'instagram', name: 'Instagram', handle: '@onelovegolfcarts', note: 'Fleet photos, customer moments, sunset shots.' },
    { key: 'x', name: 'X / Twitter', handle: '@onelovegolfcart', note: '' },
    { key: 'tripadvisor', name: 'TripAdvisor', handle: '104+ reviews at 4.9', note: 'Reviews and traveler questions.' },
    { key: 'yelp', name: 'Yelp', handle: '', note: 'Reviews and business hours.' },
  ] as const,
};

export const roadside = {
  title: 'Roadside support',
  body: "Flat tire, dead battery, cart won't start, missed a turn on the way to Secret Beach. Message us with your location and we reach you within about 45 minutes anywhere on Ambergris Caye. Most issues are resolved on the spot. If we cannot fix it, we swap the cart at no charge.",
};
