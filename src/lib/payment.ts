/**
 * Pay Now fields: the live site's form (WPForms #1046), in the same order.
 * Shared by the form and its server action ('use server' files may only
 * export async functions).
 */

import { cardLengthOk, cvcLength, luhn, maxCardDigits, onlyDigits } from './card';

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

  const num = onlyDigits(v.cardNumber);
  if (!num) e.cardNumber = 'Please enter your card number.';
  else if (!cardLengthOk(num) && num.length < maxCardDigits(num)) e.cardNumber = 'Your card number is incomplete.';
  else if (!cardLengthOk(num) || !luhn(num)) e.cardNumber = 'Your card number is invalid.';

  const m = /^(\d{2})\s*\/\s*(\d{2})$/.exec(v.expiry);
  const month = Number(onlyDigits(v.expiry).slice(0, 2));
  if (!v.expiry) e.expiry = 'Please enter the expiry date.';
  else if (onlyDigits(v.expiry).length >= 2 && (month < 1 || month > 12)) e.expiry = "Your card's expiry month is invalid.";
  else if (!m) e.expiry = "Your card's expiry date is incomplete.";
  else if (m) {
    const [y, mo] = belizeMonth();
    const ey = 2000 + Number(m[2]);
    if (ey < y || (ey === y && Number(m[1]) < mo)) e.expiry = "Your card's expiry date is in the past.";
    else if (ey > y + 20) e.expiry = "Your card's expiry year is invalid.";
  }
  const cvcLen = cvcLength(num);
  if (!v.cvc) e.cvc = 'Please enter the security code.';
  else if (!new RegExp(`^\\d{${cvcLen}}$`).test(v.cvc)) e.cvc = cvcLen === 4 ? 'Amex security codes are 4 digits.' : "Your card's security code is incomplete.";

  const n = Number(v.amount);
  if (!/^\d+(\.\d{1,2})?$/.test(v.amount) || !(n >= 1)) e.amount = 'Enter the amount in US dollars, for example 175 or 175.50.';
  else if (n > MAX_AMOUNT) e.amount = `For amounts over $${MAX_AMOUNT.toLocaleString('en-US')}, message us on WhatsApp.`;
  return e;
}

export const normalizeCard = onlyDigits;
