/**
 * Pay Now fields: the live site's form (WPForms #1046), in the same order.
 * Shared by the form and its server action ('use server' files may only
 * export async functions).
 */

export type PaymentField =
  | 'fullName'
  | 'email'
  | 'phone'
  | 'country'
  | 'state'
  | 'address'
  | 'cardholder'
  | 'cardNumber'
  | 'expiry'
  | 'cvc'
  | 'amount';
export type PaymentValues = Record<PaymentField, string>;

export const PAYMENT_FIELDS: PaymentField[] = ['fullName', 'email', 'phone', 'country', 'state', 'address', 'cardholder', 'cardNumber', 'expiry', 'cvc', 'amount'];
/** Never echoed back to the page, logged, or kept after a submit. */
export const CARD_FIELDS: PaymentField[] = ['cardNumber', 'expiry', 'cvc'];

export const MAX_AMOUNT = 5000;

const digits = (s: string) => s.replace(/[\s-]/g, '');

function luhn(num: string) {
  let sum = 0;
  for (let i = 0; i < num.length; i++) {
    let d = Number(num[num.length - 1 - i]);
    if (i % 2 === 1) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
  }
  return sum % 10 === 0;
}

/** Today in Belize (UTC-6) as [year, month]. */
function belizeMonth() {
  const d = new Date(Date.now() - 6 * 3600 * 1000);
  return [d.getUTCFullYear(), d.getUTCMonth() + 1];
}

export function validatePayment(v: PaymentValues) {
  const e: Partial<Record<PaymentField, string>> = {};
  if (v.fullName.length < 2) e.fullName = 'Please enter your full name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'Please enter a valid email address.';
  if (!/^[+()\d\s.-]{6,}$/.test(v.phone)) e.phone = 'Please enter a phone number.';
  if (v.country.length < 2) e.country = 'Please enter your country.';
  if (v.state.length < 2) e.state = 'Please enter your state or province.';
  if (v.address.length < 4) e.address = 'Please enter your address.';
  if (v.cardholder.length < 2) e.cardholder = 'Please enter the name on the card.';

  const num = digits(v.cardNumber);
  if (!/^\d{12,19}$/.test(num) || !luhn(num)) e.cardNumber = 'Please check the card number.';

  const m = /^(\d{2})\s*\/\s*(\d{2})$/.exec(v.expiry);
  if (!m || Number(m[1]) < 1 || Number(m[1]) > 12) e.expiry = 'Enter the expiry date as MM/YY.';
  else {
    const [y, mo] = belizeMonth();
    const ey = 2000 + Number(m[2]);
    if (ey < y || (ey === y && Number(m[1]) < mo)) e.expiry = 'This card has expired.';
  }
  if (!/^\d{3,4}$/.test(v.cvc)) e.cvc = 'Enter the 3 or 4 digit security code.';

  const n = Number(v.amount);
  if (!/^\d+(\.\d{1,2})?$/.test(v.amount) || !(n >= 1)) e.amount = 'Enter the amount in US dollars, for example 175 or 175.50.';
  else if (n > MAX_AMOUNT) e.amount = `For amounts over $${MAX_AMOUNT.toLocaleString('en-US')}, message us on WhatsApp.`;
  return e;
}

export const normalizeCard = digits;
