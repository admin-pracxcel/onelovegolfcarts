'use server';

/**
 * Contact form handler. Validates on the server, drops obvious spam, then
 * delivers through the configured channel (see lib/deliver.ts), with the lead
 * fields (lib/lead.ts), then sends the visitor to /contact-thank-you/.
 *
 * With neither configured the action returns `unconfigured` and the form
 * points people to email and WhatsApp, so a message is never silently lost.
 */

import { redirect } from 'next/navigation';
import { deliver } from '@/lib/deliver';
import { leadFields, leadLines } from '@/lib/lead-server';

const THANK_YOU = '/contact-thank-you/';

export type ContactState = {
  status: 'idle' | 'invalid' | 'error' | 'unconfigured';
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
  if (String(formData.get('company') ?? '').trim()) redirect(THANK_YOU);

  const errors: ContactState['errors'] = {};
  if (values.name.length < 2) errors.name = 'Please enter your name.';
  if (!EMAIL_RE.test(values.email)) errors.email = 'Please enter a valid email address.';
  if (values.phone && !/^[+()\d\s.-]{6,}$/.test(values.phone)) errors.phone = 'Please check the phone number.';
  if (!values.message) errors.message = 'Please enter a message.';
  if (values.message.length > 5000) errors.message = 'Please keep your message under 5,000 characters.';
  if (Object.keys(errors).length) {
    return { status: 'invalid', message: 'Please fix the highlighted fields.', errors, values };
  }

  const subject = `Website enquiry from ${values.name}`;
  const lead = await leadFields(formData);
  const text = `Name: ${values.name}\nEmail: ${values.email}\nPhone: ${values.phone || 'n/a'}\n\n${values.message}${leadLines(lead)}`;

  try {
    const result = await deliver({ form: 'contact', subject, text, replyTo: values.email, fields: { ...values, ...lead } });
    if (result === 'unconfigured') return { status: 'unconfigured', values };
  } catch (err) {
    console.error('[contact] delivery failed', err);
    return { status: 'error', values };
  }

  // Outside the try: redirect() works by throwing.
  redirect(THANK_YOU);
}
