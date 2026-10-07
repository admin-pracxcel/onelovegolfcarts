/**
 * /book-now/ copy: Execution Manual §10 ("Book a Golf Cart Rental"),
 * verbatim. The form itself mirrors the live site's reservation form
 * (WPForms #308) field for field, at the client's request; the manual's
 * suggested form changes (resort dropdown, licence upload…) are not applied.
 */

export const meta = {
  title: 'Book a Golf Cart in San Pedro Belize | One Love Rentals',
  description:
    'Reserve a 4 or 6 seater golf cart in two minutes. Free delivery anywhere on Ambergris Caye. Confirmation by WhatsApp within 15 minutes.',
  h1: 'Reserve a Golf Cart in San Pedro',
};

export const intro =
  'Fill out the form below and we confirm your booking by WhatsApp within 15 minutes during business hours. You do not pay until the cart is in your hands. We deliver free to the San Pedro Airport, every resort and hotel on Ambergris Caye, the water taxi terminal, or any Ambergris Caye address you provide.';

export const steps = [
  { title: 'Tell us what you need.', body: 'Pick a cart, tell us where and when. Under two minutes.' },
  { title: 'We confirm on WhatsApp.', body: 'A real person from the family confirms your reservation within about 15 minutes.' },
  { title: 'Cart at your door.', body: 'Free delivery to the airport, your hotel, or the address you gave us. Pay on delivery or via our secure Pay Now page.' },
];

/** The manual's trust strip above the form. */
export const trust = ['104+ five-star reviews', 'Established 2017', 'Free cancellation up to 48 hours before pickup'];

export const bring = {
  h2: 'What to bring',
  body: "A valid driver's license from your home country for every person planning to drive the cart. A credit card in the primary driver's name for the deposit hold. Your booking confirmation on your phone (WhatsApp message is fine). If arriving at San Pedro Airport or the Marine Terminal, your arrival time. Nothing else. We handle the walk-around, the paperwork, and the keys at hand-off.",
  // The four items from the paragraph above.
  items: [
    "A valid driver's license from your home country for every person planning to drive the cart",
    "A credit card in the primary driver's name for the deposit hold",
    'Your booking confirmation on your phone (WhatsApp message is fine)',
    'If arriving at San Pedro Airport or the Marine Terminal, your arrival time',
  ],
};

export const cancellation = {
  h2: 'Cancellation policy',
  body: 'Free cancellation up to 48 hours before pickup. Cancellations inside 48 hours are refundable minus a $10 US administrative fee. Weather-related cancellations refunded in full regardless of timing. No-shows forfeit the deposit. Full policy is on the [[rates page|rates]]. Send cancellation requests by WhatsApp for the fastest processing.',
};

export const faq: [string, string][] = [
  ['Do I pay when I book?', 'No. Payment happens at cart hand-off, or by advance deposit through the Pay Now page if you prefer. The booking form charges nothing.'],
  ['How far in advance should I book?', '48 hours minimum for off-peak dates. Two weeks minimum for peak weeks (mid-December through early January, Easter week, Costa Maya Festival weekend in early August).'],
  ['Can I change the pickup location after I book?', 'Yes. Send the change by WhatsApp any time before the day of pickup. Free of charge.'],
  ['What if my flight is delayed?', 'Message us with the new landing time. We hold the cart and re-time the delivery to match your new arrival. No fee.'],
];

/** The manual's internal links for this page. */
export const links = {
  rates: 'review rates before booking',
  carts: 'choose your cart',
  terms: 'rental terms and conditions',
  pay: 'pay a deposit online',
  contact: 'questions before you book',
};
