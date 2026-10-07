/**
 * Card input formatting, modelled on hosted payment fields (Stripe, PayPal):
 * brand detection from the first digits, brand-specific grouping and length,
 * MM / YY expiry, and CVC length. Pure functions, shared by the Pay Now form
 * and its server-side validation.
 */

export type Brand = 'visa' | 'mastercard' | 'amex' | 'discover' | 'diners' | 'jcb' | 'unionpay';

export const BRAND_LABELS: Record<Brand, string> = {
  visa: 'Visa',
  mastercard: 'Mastercard',
  amex: 'Amex',
  discover: 'Discover',
  diners: 'Diners',
  jcb: 'JCB',
  unionpay: 'UnionPay',
};

const RULES: { brand: Brand; re: RegExp; groups: number[]; lengths: number[]; cvc: number }[] = [
  { brand: 'amex', re: /^3[47]/, groups: [4, 6, 5], lengths: [15], cvc: 4 },
  { brand: 'diners', re: /^3(0[0-5]|[689])/, groups: [4, 6, 4], lengths: [14], cvc: 3 },
  { brand: 'jcb', re: /^35/, groups: [4, 4, 4, 4], lengths: [16], cvc: 3 },
  { brand: 'visa', re: /^4/, groups: [4, 4, 4, 4], lengths: [13, 16], cvc: 3 },
  { brand: 'mastercard', re: /^(5[1-5]|2(2[2-9]|[3-6]\d|7[01]|720))/, groups: [4, 4, 4, 4], lengths: [16], cvc: 3 },
  { brand: 'discover', re: /^(6011|65|64[4-9])/, groups: [4, 4, 4, 4], lengths: [16], cvc: 3 },
  { brand: 'unionpay', re: /^62/, groups: [4, 4, 4, 4, 3], lengths: [16, 17, 18, 19], cvc: 3 },
];
const DEFAULT = { groups: [4, 4, 4, 4], lengths: [16], cvc: 3 };

export const onlyDigits = (s: string) => s.replace(/\D/g, '');

function rule(digits: string) {
  return RULES.find((r) => r.re.test(digits));
}

export function cardBrand(digits: string): Brand | null {
  return rule(digits)?.brand ?? null;
}

/** Longest number this brand allows. */
export function maxCardDigits(digits: string) {
  return Math.max(...(rule(digits)?.lengths ?? DEFAULT.lengths));
}

export function cardLengthOk(digits: string) {
  return (rule(digits)?.lengths ?? DEFAULT.lengths).includes(digits.length);
}

export function cvcLength(cardDigits: string) {
  return rule(cardDigits)?.cvc ?? DEFAULT.cvc;
}

/** "4242424242424242" → "4242 4242 4242 4242" (Amex: 4-6-5). */
export function formatCardNumber(digits: string) {
  const groups = rule(digits)?.groups ?? DEFAULT.groups;
  const out: string[] = [];
  let i = 0;
  for (const g of groups) {
    if (i >= digits.length) break;
    out.push(digits.slice(i, i + g));
    i += g;
  }
  if (i < digits.length) out.push(digits.slice(i));
  return out.join(' ');
}

export function luhn(num: string) {
  let sum = 0;
  for (let i = 0; i < num.length; i++) {
    let d = Number(num[num.length - 1 - i]);
    if (i % 2 === 1) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
  }
  return num.length > 0 && sum % 10 === 0;
}

/**
 * Expiry digits → "MM / YY". A single 2–9 becomes "0N / " and "13"–"19"
 * become "01 / 3"… (no month starts that way). `deleting` keeps the separator from reappearing on backspace.
 */
export function formatExpiry(raw: string, deleting = false) {
  let d = onlyDigits(raw).slice(0, 4);
  if (d.length === 1 && Number(d) > 1) d = `0${d}`;
  // "13" can't be a month: read it as "01 / 3".
  if (d.length >= 2 && d[0] === '1' && Number(d[1]) > 2) d = `0${d}`.slice(0, 4);
  if (d.length < 2) return d;
  if (d.length === 2) return deleting ? d : `${d} / `;
  return `${d.slice(0, 2)} / ${d.slice(2)}`;
}

/** Position in `formatted` just after its `n`-th digit. */
export function caretAfterDigits(formatted: string, n: number) {
  if (n <= 0) return 0;
  let seen = 0;
  for (let i = 0; i < formatted.length; i++) {
    if (/\d/.test(formatted[i]) && ++seen === n) return i + 1;
  }
  return formatted.length;
}
