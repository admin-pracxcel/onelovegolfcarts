/** Shared by the Pay Now form and its server actions. Billing fields = the live site's form, minus card fields. */

export type PaymentField = 'fullName' | 'email' | 'phone' | 'country' | 'state' | 'address' | 'amount';
export type PaymentValues = Record<PaymentField, string>;
export const PAYMENT_FIELDS: PaymentField[] = ['fullName', 'email', 'phone', 'country', 'state', 'address', 'amount'];

export const MAX_AMOUNT = 5000;

export function validatePayment(v: PaymentValues) {
  const e: Partial<Record<PaymentField, string>> = {};
  if (v.fullName.trim().length < 2) e.fullName = 'Please enter your full name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = 'Please enter a valid email address.';
  if (!/^[+()\d\s.-]{6,}$/.test(v.phone.trim())) e.phone = 'Please enter a phone number.';
  if (v.country.trim().length < 2) e.country = 'Please enter your country.';
  if (v.state.trim().length < 2) e.state = 'Please enter your state or province.';
  if (v.address.trim().length < 4) e.address = 'Please enter your address.';
  const n = Number(v.amount);
  if (!/^\d+(\.\d{1,2})?$/.test(v.amount.trim()) || !(n >= 1)) e.amount = 'Enter the amount in US dollars, for example 175 or 175.50.';
  else if (n > MAX_AMOUNT) e.amount = `For amounts over $${MAX_AMOUNT.toLocaleString('en-US')}, message us on WhatsApp.`;
  return e;
}

export const formatAmount = (v: string) => Number(v).toFixed(2);
