'use server';

/**
 * Pay Now server actions. Orders are created and captured with PayPal on the
 * server, so the amount can't be tampered with after validation and card
 * details only ever go to PayPal. After a capture the business is notified
 * through lib/deliver.ts.
 */

import { deliver } from '@/lib/deliver';
import { formatAmount, PAYMENT_FIELDS, validatePayment, type PaymentValues } from '@/lib/payment';
import { paypalCaptureOrder, paypalConfigured, paypalCreateOrder } from '@/lib/paypal';

const clean = (v: PaymentValues) => Object.fromEntries(PAYMENT_FIELDS.map((f) => [f, String(v[f] ?? '').trim()])) as PaymentValues;

export async function createPaymentOrder(input: PaymentValues): Promise<{ id?: string; error?: string }> {
  if (!paypalConfigured()) return { error: 'Online payment is not switched on yet.' };
  const v = clean(input);
  if (Object.keys(validatePayment(v)).length) return { error: 'Please check the highlighted fields.' };
  try {
    return { id: await paypalCreateOrder(formatAmount(v.amount), `One Love golf cart rental: ${v.fullName}`) };
  } catch (err) {
    console.error('[pay] create failed', err);
    return { error: 'PayPal could not start the payment. Please try again.' };
  }
}

export async function capturePaymentOrder(orderId: string, input: PaymentValues): Promise<{ ok: boolean; captureId?: string; error?: string }> {
  if (!paypalConfigured() || !/^[A-Z0-9-]{5,40}$/i.test(orderId)) return { ok: false, error: 'Payment could not be confirmed.' };
  const v = clean(input);
  try {
    const result = await paypalCaptureOrder(orderId);
    if (!result.ok) return { ok: false, error: 'PayPal did not complete the payment. You have not been charged.' };
    await deliver({
      form: 'payment',
      subject: `Payment received: $${result.amount} from ${v.fullName}`,
      text: [
        `Amount: $${result.amount} USD`,
        `PayPal capture ID: ${result.captureId}`,
        `Name: ${v.fullName}`,
        `Email: ${v.email}`,
        `Phone: ${v.phone}`,
        `Address: ${v.address}, ${v.state}, ${v.country}`,
      ].join('\n'),
      replyTo: v.email,
      fields: { ...v, amount: result.amount, captureId: result.captureId, orderId },
    }).catch((err) => console.error('[pay] notify failed', err));
    return { ok: true, captureId: result.captureId };
  } catch (err) {
    console.error('[pay] capture failed', err);
    return { ok: false, error: 'Payment could not be confirmed. Please message us before trying again.' };
  }
}
