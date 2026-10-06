import { business } from '@/lib/business';

/**
 * Sends a form submission through whichever channel is configured:
 *
 *   CONTACT_WEBHOOK_URL   POST JSON to any form backend / automation
 *                         (Formspree, Zapier, Make, n8n, a CRM inbox…)
 *   RESEND_API_KEY        Send an email through Resend, to CONTACT_TO_EMAIL
 *   + CONTACT_FROM_EMAIL  (defaults to the business email) from a verified sender.
 *
 * Resolves 'sent' or 'unconfigured'; throws when a configured channel fails.
 */
export async function deliver(msg: {
  form: 'contact' | 'booking' | 'payment';
  subject: string;
  text: string;
  replyTo?: string;
  fields: Record<string, string>;
}): Promise<'sent' | 'unconfigured'> {
  const webhook = process.env.CONTACT_WEBHOOK_URL;
  const resendKey = process.env.RESEND_API_KEY;

  if (webhook) {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ...msg.fields, form: msg.form, subject: msg.subject, source: `onelovegolfcartsbelize.com/${msg.form}` }),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return 'sent';
  }
  if (resendKey && process.env.CONTACT_FROM_EMAIL) {
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
