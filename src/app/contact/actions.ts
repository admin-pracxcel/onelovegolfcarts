'use server';

/**
 * Contact form handler. Validates on the server, drops obvious spam, then
 * delivers through whichever channel is configured:
 *
 *   CONTACT_WEBHOOK_URL   POST JSON to any form backend / automation
 *                         (Formspree, Zapier, Make, n8n, a CRM inbox…)
 *   RESEND_API_KEY        Send an email through Resend, to CONTACT_TO_EMAIL
 *   + CONTACT_TO_EMAIL    (defaults to the business email) from
 *                         CONTACT_FROM_EMAIL (must be a verified sender).
 *
 * With neither configured the action returns `unconfigured` and the form
 * points people to email and WhatsApp, so a message is never silently lost.
 */

import { business } from '@/lib/business';

export type ContactState = {
  status: 'idle' | 'sent' | 'invalid' | 'error' | 'unconfigured';
  message?: string;
  errors?: Partial<Record<'name' | 'email' | 'phone' | 'message', string>>;
  values?: { name: string; email: string; phone: string; message: string };
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const values = {
    name: String(formData.get('name') ?? '').trim(),
    email: String(formData.get('email') ?? '').trim(),
    phone: String(formData.get('phone') ?? '').trim(),
    message: String(formData.get('message') ?? '').trim(),
  };

  // Honeypot: real people never see or fill this field. Pretend success.
  if (String(formData.get('company') ?? '').trim()) return { status: 'sent' };

  const errors: ContactState['errors'] = {};
  if (values.name.length < 2) errors.name = 'Please enter your name.';
  if (!EMAIL_RE.test(values.email)) errors.email = 'Please enter a valid email address.';
  if (values.phone && !/^[+()\d\s.-]{6,}$/.test(values.phone)) errors.phone = 'Please check the phone number.';
  if (values.message.length < 10) errors.message = 'Please tell us a little more (at least 10 characters).';
  if (values.message.length > 5000) errors.message = 'Please keep your message under 5,000 characters.';
  if (Object.keys(errors).length) {
    return { status: 'invalid', message: 'Please fix the highlighted fields.', errors, values };
  }

  const subject = `Website enquiry from ${values.name}`;
  const text = `Name: ${values.name}\nEmail: ${values.email}\nPhone: ${values.phone || 'n/a'}\n\n${values.message}`;

  try {
    const webhook = process.env.CONTACT_WEBHOOK_URL;
    const resendKey = process.env.RESEND_API_KEY;

    if (webhook) {
      const res = await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...values, subject, source: 'onelovegolfcarts.com/contact' }),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } else if (resendKey && process.env.CONTACT_FROM_EMAIL) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL,
          to: [process.env.CONTACT_TO_EMAIL || business.email],
          reply_to: values.email,
          subject,
          text,
        }),
      });
      if (!res.ok) throw new Error(`Resend responded ${res.status}`);
    } else {
      return { status: 'unconfigured', values };
    }
  } catch (err) {
    console.error('[contact] delivery failed', err);
    return { status: 'error', values };
  }

  return { status: 'sent' };
}
