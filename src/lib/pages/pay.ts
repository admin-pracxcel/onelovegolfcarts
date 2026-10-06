/**
 * /pay-now/ copy: Execution Manual §12 ("Pay Your Rental Online"), verbatim.
 * Billing fields mirror the live site's Pay Now form (WPForms #1046). Its card
 * number / expiry / CVC fields are deliberately NOT reproduced: card details go
 * to PayPal's checkout, as the manual's own copy describes.
 */

export const meta = {
  title: 'Pay Your Golf Cart Rental Online | One Love Belize',
  description:
    'Secure online payment for your One Love golf cart rental in San Pedro, Belize. Visa, Mastercard, American Express, and PayPal accepted.',
  h1: 'Pay Your Rental Online',
};

export const intro =
  "Pay your One Love rental deposit or full rental amount by credit card or PayPal on this page. Payments run through PayPal's secure gateway, which handles the card processing on our behalf. We never see or store your card details. You do not need a PayPal account to pay by card; PayPal accepts guest checkout with Visa, Mastercard, and American Express. If you prefer to pay in cash on arrival, skip this page and pay at cart hand-off.";

export const options = [
  { label: 'Accepted', value: 'Visa · Mastercard · American Express · PayPal balance' },
  { label: 'Currencies', value: 'USD and BZD (fixed at 2 BZD to 1 USD)' },
  { label: 'Processing time', value: 'Card confirmations arrive by email within a few minutes. Refunds take 3 to 5 business days depending on your card issuer.' },
];

export const trustBlock =
  'Your card details stay with PayPal. We use PayPal\'s merchant gateway so card numbers, CVV codes, and expiration dates never touch our servers. Our site holds only your booking record, delivery address, and payment status. Full details on how we handle data are on our [[privacy policy|privacy]]. Cancellation and refund terms are on our [[rates page|rates]] and [[terms and conditions|terms]].';

export const support =
  'Payment did not go through? Wrong amount? Refund question? Message +501-634-9559 on WhatsApp with your booking name and we sort it in the same business day.';
