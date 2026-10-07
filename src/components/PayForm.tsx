'use client';

import { useActionState, useEffect, useRef } from 'react';
import { sendPayment, type PaymentState } from '@/app/pay-now/actions';
import { business, whatsappUrl } from '@/lib/business';
import type { PaymentField } from '@/lib/payment';
import { Icon } from './Icon';

const initial: PaymentState = { status: 'idle' };

type Spec = { label: string; type?: string; autoComplete: string; inputMode?: 'tel' | 'numeric' | 'decimal' | 'email'; placeholder?: string; maxLength?: number };

const SPECS: Record<PaymentField, Spec> = {
  fullName: { label: 'Full name', autoComplete: 'name' },
  email: { label: 'Email', type: 'email', autoComplete: 'email', inputMode: 'email' },
  phone: { label: 'Phone', type: 'tel', autoComplete: 'tel', inputMode: 'tel' },
  country: { label: 'Country', autoComplete: 'country-name' },
  state: { label: 'State', autoComplete: 'address-level1' },
  address: { label: 'Address', autoComplete: 'street-address' },
  cardholder: { label: 'Cardholder name', autoComplete: 'cc-name' },
  cardNumber: { label: 'Card number', autoComplete: 'cc-number', inputMode: 'numeric', placeholder: 'XXXX XXXX XXXX XXXX', maxLength: 23 },
  expiry: { label: 'Expiry date', autoComplete: 'cc-exp', inputMode: 'numeric', placeholder: 'MM/YY', maxLength: 7 },
  cvc: { label: 'CVC', autoComplete: 'cc-csc', inputMode: 'numeric', placeholder: 'CVC', maxLength: 4 },
  amount: { label: 'Amount in $USD', autoComplete: 'off', inputMode: 'decimal', placeholder: '175.00' },
};

/**
 * Pay Now: the live site's form (billing information, then payment
 * information). Works without JavaScript. Card fields are never re-filled
 * from the server and are cleared after every submit.
 */
export function PayForm() {
  const [state, action, pending] = useActionState(sendPayment, initial);
  const form = useRef<HTMLFormElement>(null);
  const status = useRef<HTMLDivElement>(null);
  const v = state.values;
  const e = state.errors ?? {};

  useEffect(() => {
    if (state.status === 'sent') form.current?.reset();
    form.current?.querySelectorAll<HTMLInputElement>('[data-card]').forEach((i) => (i.value = ''));
    if (state.status === 'invalid') form.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
    else if (state.status !== 'idle') status.current?.focus();
  }, [state]);

  const input = (name: PaymentField, card = false) => {
    const s = SPECS[name];
    return (
      <div className={`field${name === 'amount' ? ' pay-form__amount' : ''}`}>
        <label htmlFor={`pf-${name}`}>
          {s.label} <span className="field__req" aria-hidden="true">*</span>
        </label>
        <div className={name === 'amount' ? 'pay-form__money' : undefined}>
          {name === 'amount' && <span aria-hidden="true">$</span>}
          <input
            id={`pf-${name}`}
            name={name}
            type={s.type ?? 'text'}
            autoComplete={s.autoComplete}
            inputMode={s.inputMode}
            placeholder={s.placeholder}
            maxLength={s.maxLength}
            required
            {...(card ? { 'data-card': '', defaultValue: '' } : { defaultValue: v?.[name] ?? '' })}
            aria-invalid={e[name] ? true : undefined}
            aria-describedby={e[name] ? `pf-${name}-error` : undefined}
          />
        </div>
        {e[name] && (
          <p id={`pf-${name}-error`} className="field__error">
            {e[name]}
          </p>
        )}
      </div>
    );
  };

  const help = (
    <>
      Message us on WhatsApp at <a href={whatsappUrl('Hi One Love, I have a question about a payment.')}>{business.phone}</a> or pay at cart hand-off.
    </>
  );

  return (
    <form ref={form} action={action} className="contact-form pay-form" noValidate autoComplete="on">
      <fieldset className="form-group">
        <legend>Billing information</legend>
        {input('fullName')}
        <div className="field-pair">
          {input('email')}
          {input('phone')}
        </div>
        <div className="field-pair">
          {input('country')}
          {input('state')}
        </div>
        {input('address')}
      </fieldset>
      <fieldset className="form-group">
        <legend>Payment information</legend>
        {input('cardholder')}
        {input('cardNumber', true)}
        <div className="field-pair">
          {input('expiry', true)}
          {input('cvc', true)}
        </div>
        {input('amount')}
      </fieldset>

      <div className="contact-form__hp" aria-hidden="true">
        <label htmlFor="pf-company">Company</label>
        <input id="pf-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="contact-form__foot">
        <button className="btn btn--primary" type="submit" disabled={pending}>
          {pending ? 'Sending…' : 'Submit payment'} {!pending && <Icon name="arrow" />}
        </button>
      </div>
      <div ref={status} className={`contact-form__status is-${state.status}`} role="status" aria-live="polite" tabIndex={-1}>
        {state.status === 'sent' && <p>Thanks, your payment details have been sent to us.</p>}
        {state.status === 'invalid' && <p>{state.message}</p>}
        {state.status === 'unconfigured' && <p>Online payment isn&apos;t available right now. {help}</p>}
        {state.status === 'error' && <p>Sorry, your payment details didn&apos;t go through. Nothing was charged. {help}</p>}
      </div>
    </form>
  );
}
