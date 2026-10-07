'use server';

/**
 * Reservation form handler. Same fields as the live site's WPForms booking
 * form. Validates on the server, drops obvious spam, then delivers through the
 * configured channel (lib/deliver.ts) with the lead fields (lib/lead.ts), then
 * sends the visitor to /book-thank-you/. Nothing is charged or stored here.
 */

import { BOOKING_FIELDS, bookingLines, CART_LABELS, MODE_LABELS, type BookingField, type BookingValues } from '@/lib/booking';
import { redirect } from 'next/navigation';
import { deliver } from '@/lib/deliver';
import { leadFields, leadLines } from '@/lib/lead-server';

const THANK_YOU = '/book-thank-you/';

export type BookingState = {
  status: 'idle' | 'invalid' | 'error' | 'unconfigured';
  message?: string;
  errors?: Partial<Record<BookingField, string>>;
  values?: BookingValues;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^\d{2}:\d{2}$/;

/** Today's date in Belize (UTC-6, no daylight saving). */
function belizeToday() {
  return new Date(Date.now() - 6 * 3600 * 1000).toISOString().slice(0, 10);
}

export async function sendBooking(_prev: BookingState, formData: FormData): Promise<BookingState> {
  const values = Object.fromEntries(BOOKING_FIELDS.map((f) => [f, String(formData.get(f) ?? '').trim()])) as BookingValues;

  if (String(formData.get('company') ?? '').trim()) redirect(THANK_YOU);

  const e: BookingState['errors'] = {};
  if (values.firstName.length < 1) e.firstName = 'Please enter your first name.';
  if (values.lastName.length < 1) e.lastName = 'Please enter your last name.';
  if (!/^[+()\d\s.-]{6,}$/.test(values.phone)) e.phone = 'Please enter a phone number we can reach on WhatsApp.';
  if (!EMAIL_RE.test(values.email)) e.email = 'Please enter a valid email address.';
  if (values.hotel.length < 2) e.hotel = 'Please tell us where you are staying.';
  if (!DATE_RE.test(values.startDate)) e.startDate = 'Please choose a start date.';
  else if (values.startDate < belizeToday()) e.startDate = 'The start date has already passed.';
  if (!TIME_RE.test(values.startTime)) e.startTime = 'Please choose a time.';
  if (!DATE_RE.test(values.returnDate)) e.returnDate = 'Please choose a return date.';
  if (!TIME_RE.test(values.returnTime)) e.returnTime = 'Please choose a time.';
  if (!e.startDate && !e.startTime && !e.returnDate && !e.returnTime && `${values.returnDate}T${values.returnTime}` <= `${values.startDate}T${values.startTime}`) {
    e.returnDate = 'The return has to be after the start.';
  }
  if (!CART_LABELS[values.cart]) e.cart = 'Please choose a cart size.';
  if (!MODE_LABELS[values.mode]) e.mode = 'Please choose delivery or pickup.';
  if (values.mode === 'delivery' && values.deliverTo.length < 3) e.deliverTo = 'Please tell us where to deliver the cart.';
  if (values.message.length > 3000) e.message = 'Please keep your message under 3,000 characters.';
  if (Object.keys(e).length) return { status: 'invalid', message: 'Please fix the highlighted fields.', errors: e, values };

  const name = `${values.firstName} ${values.lastName}`;
  const lines = bookingLines(values);
  const lead = await leadFields(formData);

  try {
    const result = await deliver({
      form: 'booking',
      subject: `Golf cart reservation: ${name}, ${values.startDate} to ${values.returnDate}`,
      text: lines.join('\n') + leadLines(lead),
      replyTo: values.email,
      fields: { ...values, name, cart: CART_LABELS[values.cart], mode: MODE_LABELS[values.mode], ...lead },
    });
    if (result === 'unconfigured') return { status: 'unconfigured', values };
  } catch (err) {
    console.error('[booking] delivery failed', err);
    return { status: 'error', values };
  }
  // Outside the try: redirect() works by throwing.
  redirect(THANK_YOU);
}
