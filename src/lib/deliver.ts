import { business } from '@/lib/business';

/**
 * Sends a form submission to that form's webhook (n8n):
 *
 *   CONTACT_WEBHOOK_URL   contact form
 *   BOOKING_WEBHOOK_URL   Book Now reservations
 *   PAYMENT_WEBHOOK_URL   Pay Now (carries card details: webhook only, HTTPS only)
 *
 * Contact and booking can fall back to email through Resend (RESEND_API_KEY +
 * CONTACT_FROM_EMAIL, to CONTACT_TO_EMAIL or the business email). Payments
 * never go by email.
 *
 * Resolves 'sent' or 'unconfigured'; throws when a configured channel fails.
 * Errors never include the submitted data.
 */
const WEBHOOKS = {
  contact: 'CONTACT_WEBHOOK_URL',
  booking: 'BOOKING_WEBHOOK_URL',
  payment: 'PAYMENT_WEBHOOK_URL',
} as const;

export async function deliver(msg: {
  form: keyof typeof WEBHOOKS;
  subject: string;
  text: string;
  replyTo?: string;
  fields: Record<string, string>;
}): Promise<'sent' | 'unconfigured'> {
  const webhook = process.env[WEBHOOKS[msg.form]];

  if (webhook) {
    if (msg.form === 'payment' && !/^https:\/\/|^http:\/\/(localhost|127\.0\.0\.1)[:/]/.test(webhook)) throw new Error('Payment webhook must use HTTPS');
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ...msg.fields, form: msg.form, subject: msg.subject, submittedAt: new Date().toISOString(), source: `onelovegolfcartsbelize.com/${msg.form}` }),
      cache: 'no-store',
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return 'sent';
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (msg.form !== 'payment' && resendKey && process.env.CONTACT_FROM_EMAIL) {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL,
        to: [process.env.CONTACT_TO_EMAIL || business.email],
        ...(msg.replyTo ? { reply_to: msg.replyTo } : {}),
        subject: msg.subject,
        text: msg.text,
      }),
    });
    if (!res.ok) throw new Error(`Resend responded ${res.status}`);
    return 'sent';
  }
  return 'unconfigured';
}
