'use server';

/**
 * Pay Now handler: the live site's billing + card form, posted to the payment
 * webhook (PAYMENT_WEBHOOK_URL, HTTPS only, never email). Card number, expiry
 * and CVC are never logged, never stored by the site, and never sent back to
 * the page.
 */

import { deliver } from '@/lib/deliver';
import { CARD_FIELDS, normalizeCard, PAYMENT_FIELDS, validatePayment, type PaymentField, type PaymentValues } from '@/lib/payment';

export type PaymentState = {
  status: 'idle' | 'sent' | 'invalid' | 'error' | 'unconfigured';
  message?: string;
  errors?: Partial<Record<PaymentField, string>>;
  /** Echo of what was typed, minus the card fields. */
  values?: Partial<PaymentValues>;
};

const safeEcho = (v: PaymentValues) => Object.fromEntries(Object.entries(v).filter(([k]) => !CARD_FIELDS.includes(k as PaymentField)));

export async function sendPayment(_prev: PaymentState, formData: FormData): Promise<PaymentState> {
  const v = Object.fromEntries(PAYMENT_FIELDS.map((f) => [f, String(formData.get(f) ?? '').trim()])) as PaymentValues;
  if (String(formData.get('company') ?? '').trim()) return { status: 'sent' };

  const errors = validatePayment(v);
  if (Object.keys(errors).length) return { status: 'invalid', message: 'Please fix the highlighted fields.', errors, values: safeEcho(v) };

  const amount = Number(v.amount).toFixed(2);
  try {
    const result = await deliver({
      form: 'payment',
      subject: `Pay Now: $${amount} USD from ${v.fullName}`,
      text: '',
      replyTo: v.email,
      fields: { ...v, cardNumber: normalizeCard(v.cardNumber), expiry: v.expiry.replace(/\s/g, ''), amount },
    });
    if (result === 'unconfigured') return { status: 'unconfigured', values: safeEcho(v) };
  } catch (err) {
    // Log only the failure, never the submission.
    console.error('[pay] delivery failed:', err instanceof Error ? err.message : 'unknown error');
    return { status: 'error', values: safeEcho(v) };
  }
  return { status: 'sent' };
}
