'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { sendBooking, type BookingState } from '@/lib/actions/booking';
import { business, whatsappUrl } from '@/lib/business';
import { bookingLines, type BookingField, type BookingValues } from '@/lib/booking';
import { announcement } from '@/lib/content';
import { Icon } from './Icon';
import { LeadFields } from './LeadFields';

const initial: BookingState = { status: 'idle' };

/** Today in Belize (UTC-6), for the date pickers' minimum. */
const belizeToday = () => new Date(Date.now() - 6 * 3600 * 1000).toISOString().slice(0, 10);

/**
 * Reservation form: the live site's fields (name, phone, email, hotel, start
 * and return date/time, cart size, delivery or pickup, deliver to, message).
 * Works without JavaScript; with JS it validates inline and keeps what was
 * typed. If the form can't be delivered, the visitor gets the same details
 * as a ready-to-send WhatsApp message, so no booking is lost.
 */
export function BookingForm() {
  const [state, action, pending] = useActionState(sendBooking, initial);
  const form = useRef<HTMLFormElement>(null);
  const status = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState(state.values?.mode || 'delivery');
  const [seen, setSeen] = useState(state);
  const v = state.values;
  const e = state.errors ?? {};

  // Keep the delivery/pickup choice in step with each server response.
  if (seen !== state) {
    setSeen(state);
    setMode(state.values?.mode || mode);
  }

  // Date pickers can't start before today in Belize (set after load, since the page is prerendered).
  useEffect(() => {
    form.current?.querySelectorAll<HTMLInputElement>('input[type="date"]').forEach((i) => (i.min = belizeToday()));
  }, []);
  useEffect(() => {
    if (state.status === 'invalid') form.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
    else if (state.status !== 'idle') status.current?.focus();
  }, [state]);

  const field = (name: BookingField) => ({
    id: `bf-${name}`,
    name,
    'aria-invalid': e[name] ? true : undefined,
    'aria-describedby': e[name] ? `bf-${name}-error` : undefined,
    defaultValue: v?.[name] ?? '',
  });
  const err = (name: BookingField) => e[name] && <p id={`bf-${name}-error`} className="field__error">{e[name]}</p>;
  const req = <span className="field__req" aria-hidden="true">*</span>;

  const whatsappFallback = (values?: BookingValues) => (
    <a className="btn btn--primary" href={whatsappUrl(['Hi One Love, I would like to book a golf cart.', ...(values ? bookingLines(values) : [])].join('\n'))}>
      <Icon name="chat" /> Send these details on WhatsApp
    </a>
  );

  return (
    <form ref={form} action={action} className="contact-form booking-form" noValidate>
      <fieldset className="form-group">
        <legend>Your details</legend>
        <div className="field-pair">
          <div className="field">
            <label htmlFor="bf-firstName">First name {req}</label>
            <input {...field('firstName')} type="text" autoComplete="given-name" required />
            {err('firstName')}
          </div>
          <div className="field">
            <label htmlFor="bf-lastName">Last name {req}</label>
            <input {...field('lastName')} type="text" autoComplete="family-name" required />
            {err('lastName')}
          </div>
        </div>
        <div className="field-pair">
          <div className="field">
            <label htmlFor="bf-phone">Phone {req}</label>
            <input {...field('phone')} type="tel" autoComplete="tel" inputMode="tel" required />
            <p className="field__hint">We confirm by WhatsApp, so a WhatsApp number is best.</p>
            {err('phone')}
          </div>
          <div className="field">
            <label htmlFor="bf-email">Email {req}</label>
            <input {...field('email')} type="email" autoComplete="email" required />
            {err('email')}
          </div>
        </div>
        <div className="field">
          <label htmlFor="bf-hotel">Hotel name {req}</label>
          <input {...field('hotel')} type="text" required />
          {err('hotel')}
        </div>
      </fieldset>

      <fieldset className="form-group">
        <legend>Your rental</legend>
        <p className="field__hint booking-form__note">{announcement}</p>
        <div className="field-pair">
          <div className="field">
            <label htmlFor="bf-startDate">Expected rental start date {req}</label>
            <input {...field('startDate')} type="date" required />
            {err('startDate')}
          </div>
          <div className="field">
            <label htmlFor="bf-startTime">Start time {req}</label>
            <input {...field('startTime')} type="time" required />
            {err('startTime')}
          </div>
        </div>
        <div className="field-pair">
          <div className="field">
            <label htmlFor="bf-returnDate">Expected rental return date {req}</label>
            <input {...field('returnDate')} type="date" required />
            {err('returnDate')}
          </div>
          <div className="field">
            <label htmlFor="bf-returnTime">Return time {req}</label>
            <input {...field('returnTime')} type="time" required />
            {err('returnTime')}
          </div>
        </div>
        <fieldset className="choice-group" aria-describedby={e.cart ? 'bf-cart-error' : undefined}>
          <legend>Golf cart rental size {req}</legend>
          <div className="choice-row">
            {[
              ['4-seater', `4 Seater · $${business.rates['4-seater'].day}/day`],
              ['6-seater', `6 Seater · $${business.rates['6-seater'].day}/day`],
            ].map(([value, label]) => (
              <label key={value} className="choice">
                <input type="radio" name="cart" value={value} defaultChecked={(v?.cart || '4-seater') === value} />
                <span>{label}</span>
              </label>
            ))}
          </div>
          {err('cart')}
        </fieldset>
        <fieldset className="choice-group" aria-describedby={e.mode ? 'bf-mode-error' : undefined}>
          <legend>Delivery or pickup {req}</legend>
          <div className="choice-row">
            {[
              ['delivery', 'Delivery (free)'],
              ['pickup', 'Pickup at our office'],
            ].map(([value, label]) => (
              <label key={value} className="choice">
                <input type="radio" name="mode" value={value} checked={mode === value} onChange={() => setMode(value)} />
                <span>{label}</span>
              </label>
            ))}
          </div>
          {err('mode')}
        </fieldset>
        <div className="field">
          <label htmlFor="bf-deliverTo">
            {mode === 'pickup' ? 'Anything we should know about pickup?' : <>Deliver to {req}</>}
          </label>
          <textarea {...field('deliverTo')} rows={3} required={mode === 'delivery'} />
          <p className="field__hint">
            {mode === 'pickup'
              ? `Our office is at ${business.street}, ${business.locality}.`
              : 'Airport (with your flight number), resort or hotel, water taxi terminal, or an address.'}
          </p>
          {err('deliverTo')}
        </div>
        <div className="field">
          <label htmlFor="bf-message">Message (optional)</label>
          <textarea {...field('message')} rows={4} />
          {err('message')}
        </div>
      </fieldset>

      <LeadFields />

      <div className="contact-form__hp" aria-hidden="true">
        <label htmlFor="bf-company">Company</label>
        <input id="bf-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="contact-form__foot">
        <button className="btn btn--primary" type="submit" disabled={pending}>
          {pending ? 'Sending…' : 'Request my booking'} {!pending && <Icon name="arrow" />}
        </button>
        <p className="field__hint">Nothing is charged. You pay at hand-off or on our Pay Now page.</p>
      </div>
      <div ref={status} className={`contact-form__status booking-form__status is-${state.status}`} role="status" aria-live="polite" tabIndex={-1}>
        {state.status === 'invalid' && <p>{state.message}</p>}
        {(state.status === 'unconfigured' || state.status === 'error') && (
          <>
            <p>
              {state.status === 'error' ? "Sorry, your booking didn't go through." : "Our booking form isn't connected yet."} Send the same details to us
              on WhatsApp instead, or call <a href={business.phoneHref}>{business.phone}</a>.
            </p>
            {whatsappFallback(state.values)}
          </>
        )}
      </div>
    </form>
  );
}
