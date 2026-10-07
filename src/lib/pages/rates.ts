/**
 * /rates/ copy: paste-ready strings from Execution Manual §08, verbatim
 * except where noted. Inline links use [[anchor|urlKey]] (components/RichText).
 */

export const meta = {
  // Exact title from the manual (it intentionally omits the brand suffix).
  title: 'Golf Cart Rental Prices San Pedro Belize | From $35 a Day',
  description:
    '4-seater golf cart from $35 a day or $175 a week. 6-seater from $60 a day or $350 a week. USD and BZD prices, free delivery, no hidden fees.',
  h1: 'Golf Cart Rental Prices in San Pedro, Belize',
};

// Manual's final sentence ("Prices below reflect current rates as of the
// 'Last verified' date at the bottom of this page.") is omitted: the
// Last verified line was removed from the site at the client's request.
export const intro =
  'Rental rates at One Love are the same all year and posted in both US dollars and Belize dollars. A 4-seater Club Car is $35 a day or $175 a week in US dollars. A 6-seater is $60 a day or $350 a week. Every rate includes free delivery anywhere on Ambergris Caye, unlimited passes over the Sir Barry Bowen Bridge, and roadside support on WhatsApp at any hour. Carts are provided with gas and should be returned with the same amount.';

/**
 * Rates table. The manual's 3-day, 2-week and monthly tiers are [TBD]; per
 * its instruction ("if discounts are not offered, remove those columns") only
 * day and week are priced. Monthly is shown as "on request", which the
 * multi-day copy states.
 */
export const rateRows = [
  { cart: '4-Seater', id: '4-seater', usd: { day: 35, week: 175 }, bzd: { day: 70, week: 350 } },
  { cart: '6-Seater', id: '6-seater', usd: { day: 60, week: 350 }, bzd: { day: 120, week: 700 } },
] as const;

export const cardLinks = {
  '4-seater': 'see the 4-seater in detail',
  '6-seater': 'see the 6-seater in detail',
} as const;

/** "Included in every rental": the manual's paragraph, one sentence per item. */
export const included = [
  'Free delivery anywhere on Ambergris Caye.',
  'Free pickup at the end of your rental.',
  'Unlimited passes over the Sir Barry Bowen Bridge to North Ambergris Caye.',
  'Roadside support via WhatsApp from 9 in the morning to 9 at night, and a return call within an hour outside those hours.',
  'A cart swap at no charge if the vehicle develops a mechanical problem we cannot resolve on the spot.',
  'All standard safety equipment: headlights, seat belts, parking brake, windshield wipers.',
];

export const notIncluded = [
  'Fuel for the cart. All carts are provided with gas and should be returned with the same amount. A 10% surcharge will be applied to carts returned without the right amount. Fuel is available at Puma and Shell stations on the island.',
  'Damage to your rental cart. Insurance is for third-party accidents only; if you crash into another golf cart, you are required to incur all damage costs.',
  'Bridge toll for passengers other than the cart driver is a personal cost.',
];

export const multiDay = {
  h2: 'Multi-day and weekly pricing',
  body: 'The weekly rate on the 4-seater ($175) works out to $25 a day, a 29% discount on the daily rate of $35. The weekly rate on the 6-seater ($350) works out to $50 a day, a 17% discount on the $60 daily rate. Any rental of six or more days should book the weekly rate. Rentals of eight to 13 days pay the weekly rate plus additional daily rates; rentals of 14 or more days should ask about the two-week rate on WhatsApp. Monthly rentals for long-stay visitors and residents are available at a further discount; message us for a quote.',
  // Figures restated from the paragraph above.
  bars: [
    { cart: '4-Seater', daily: 35, weeklyPerDay: 25, saving: '29%' },
    { cart: '6-Seater', daily: 60, weeklyPerDay: 50, saving: '17%' },
  ],
};

export const policies = [
  {
    // Live site Terms take precedence over the manual's $200 / $300 deposit.
    id: 'deposit',
    h2: 'Security and damage policy',
    figures: [
      { label: 'Due when you book', value: '$0' },
      { label: 'At pick-up', value: 'Card imprint' },
    ],
    body: "Reserve now and pay later. An open credit card imprint is required on the pick-up date for security reasons and in the event of accidental damages or injuries. Insurance is for third-party accidents only. If you crash into another golf cart, you will be required to incur all damage costs, and the insurance company will pay for the other cart's damages. If somebody crashes into you, they are liable for the damages; however, you are required by law to file a police report.",
  },
  {
    id: 'payment',
    h2: 'Payment methods accepted',
    chips: ['Visa', 'Mastercard', 'American Express', 'Cash USD', 'Cash BZD'],
    body: "We accept Visa, Mastercard, American Express, cash in US dollars, and cash in Belize dollars. Cash payments happen at cart hand-off. To pay in advance by card, use our [[pay now page|pay]] after receiving your booking confirmation.",
  },
  {
    id: 'cancellation',
    h2: 'Cancellation policy',
    figures: [
      { label: 'Free cancellation', value: '48 hrs' },
      { label: 'Inside 48 hours', value: '$10 fee' },
    ],
    body: 'Cancel free of charge up to 48 hours before your scheduled pickup. Cancellations inside the 48-hour window are refundable minus a $10 US administrative fee. No-shows forfeit any amount paid in advance. Weather-related cancellations (tropical storms, hurricane advisories) are always refunded in full regardless of timing. Send cancellation requests by WhatsApp; we confirm the cancellation and any refund amount by return message within business hours.',
  },
  {
    id: 'seasons',
    h2: 'Peak season vs off-season',
    seasons: {
      peak: ['Mid-December to the first week of January', 'Easter week', 'Costa Maya Festival weekend, early August'],
      off: ['Mid-January to mid-March', 'Mid-April through May', 'September to mid-November'],
    },
    body: 'Rates on this page hold year-round. Cart availability does not. Peak weeks on Ambergris Caye run from mid-December through the first week of January, Easter week, and the Costa Maya Festival weekend in early August. During peak weeks the fleet books out several days ahead and same-week reservations are not always possible. Off-peak (mid-January through mid-March, mid-April through May, and September through mid-November), same-week availability is usually fine. Booking early hurts nothing and locks in your cart preference.',
  },
] as const;

export const faq: [string, string][] = [
  ['How much does a golf cart cost to rent per day in San Pedro?', 'A 4-seater is $35 USD per day. A 6-seater is $60 USD per day. Prices include free delivery and pickup anywhere on Ambergris Caye.'],
  ['Do you offer weekly discounts?', 'Yes. A 4-seater weekly rate is $175 USD (about a 30% discount on the daily rate). A 6-seater weekly rate is $350 USD (about a 17% discount).'],
  ['Are your prices in US dollars or Belize dollars?', 'Both, at the fixed 2-to-1 official exchange rate. $35 USD equals $70 BZD. You can pay in either currency.'],
  ['What payment methods do you accept?', 'Visa, Mastercard, American Express, and cash in USD or BZD. See our [[Pay Now page|pay]] to pay online.'],
  ['Is there a security deposit?', 'There is no fixed deposit. An open credit card imprint is required on the pick-up date for security reasons and in the event of accidental damages or injuries. Nothing is charged when you book.'],
  ['What is your cancellation policy?', 'Cancel free up to 48 hours before the start of your rental. Cancellations inside 48 hours are refundable minus a $10 admin fee. No-shows forfeit any amount paid in advance.'],
];
