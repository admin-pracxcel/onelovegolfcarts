'use client';

import { useActionState, useEffect, useRef } from 'react';
import { sendContact, type ContactState } from '@/lib/actions/contact';
import { business, whatsappUrl } from '@/lib/business';
import { Icon } from './Icon';

const initial: ContactState = { status: 'idle' };

/**
 * Contact form (Name, Email, Phone, Message). Works without JavaScript
 * (server action as the form action); with JS it validates inline and keeps
 * what was typed. Errors are announced and linked to their fields.
 */
export function ContactForm() {
  const [state, action, pending] = useActionState(sendContact, initial);
  const status = useRef<HTMLDivElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const v = state.values;
  const e = state.errors ?? {};

  useEffect(() => {
    if (state.status === 'sent') form.current?.reset();
    if (state.status === 'invalid') {
      const first = form.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
      first?.focus();
    } else if (state.status !== 'idle') {
      status.current?.focus();
    }
  }, [state]);

  const field = (name: 'name' | 'email' | 'phone' | 'message') => ({
    id: `cf-${name}`,
    name,
    'aria-invalid': e[name] ? true : undefined,
    'aria-describedby': e[name] ? `cf-${name}-error` : undefined,
    defaultValue: v?.[name] ?? '',
  });

  const fallback = (
    <>
      Email <a href={`mailto:${business.email}`}>{business.email}</a> or{' '}
      <a href={whatsappUrl()}>message us on WhatsApp</a>.
    </>
  );

  return (
    <form ref={form} action={action} className="contact-form" noValidate>
      <div className="contact-form__row">
        <div className="field">
          <label htmlFor="cf-name">Name</label>
          <input {...field('name')} type="text" autoComplete="name" required />
          {e.name && <p id="cf-name-error" className="field__error">{e.name}</p>}
        </div>
        <div className="field">
          <label htmlFor="cf-email">Email</label>
          <input {...field('email')} type="email" autoComplete="email" required />
          {e.email && <p id="cf-email-error" className="field__error">{e.email}</p>}
        </div>
      </div>
      <div className="field">
        <label htmlFor="cf-phone">Phone</label>
        <input {...field('phone')} type="tel" autoComplete="tel" inputMode="tel" />
        {e.phone && <p id="cf-phone-error" className="field__error">{e.phone}</p>}
      </div>
      <div className="field">
        <label htmlFor="cf-message">Message</label>
        <textarea {...field('message')} rows={5} required />
        {e.message && <p id="cf-message-error" className="field__error">{e.message}</p>}
      </div>

      {/* Honeypot: hidden from people and assistive tech. */}
      <div className="contact-form__hp" aria-hidden="true">
        <label htmlFor="cf-company">Company</label>
        <input id="cf-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="contact-form__foot">
        <button className="btn btn--primary" type="submit" disabled={pending}>
          {pending ? 'Sending…' : 'Send message'} {!pending && <Icon name="arrow" />}
        </button>
        <div ref={status} className={`contact-form__status is-${state.status}`} role="status" aria-live="polite" tabIndex={-1}>
          {state.status === 'sent' && <p>Thanks, your message is on its way. We usually reply by email within four business hours.</p>}
          {state.status === 'invalid' && <p>{state.message}</p>}
          {state.status === 'unconfigured' && <p>Our contact form isn&apos;t connected yet. {fallback}</p>}
          {state.status === 'error' && <p>Sorry, your message didn&apos;t go through. {fallback}</p>}
        </div>
      </div>
    </form>
  );
}
