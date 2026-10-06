'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { capturePaymentOrder, createPaymentOrder } from '@/app/pay-now/actions';
import { business, whatsappUrl } from '@/lib/business';
import { PAYMENT_FIELDS, validatePayment, type PaymentField, type PaymentValues } from '@/lib/payment';
import { Icon } from './Icon';

/* Minimal typing for the PayPal JS SDK buttons we use. */
type PayPalButtons = {
  isEligible(): boolean;
  render(el: HTMLElement): Promise<void>;
  close(): Promise<void>;
};
type PayPalSDK = {
  Buttons(opts: {
    style?: Record<string, unknown>;
    onClick?: (data: unknown, actions: { resolve(): Promise<void>; reject(): Promise<void> }) => Promise<void> | void;
    createOrder: () => Promise<string>;
    onApprove: (data: { orderID: string }) => Promise<void>;
    onCancel?: () => void;
    onError?: (err: unknown) => void;
  }): PayPalButtons;
};
declare global {
  interface Window {
    paypal?: PayPalSDK;
  }
}

const LABELS: Record<PaymentField, string> = {
  fullName: 'Full name',
  email: 'Email',
  phone: 'Phone',
  country: 'Country',
  state: 'State',
  address: 'Address',
  amount: 'Amount in $USD',
};
const AUTOCOMPLETE: Record<PaymentField, string> = {
  fullName: 'name',
  email: 'email',
  phone: 'tel',
  country: 'country-name',
  state: 'address-level1',
  address: 'street-address',
  amount: 'off',
};

const empty = Object.fromEntries(PAYMENT_FIELDS.map((f) => [f, ''])) as PaymentValues;

type Status = { kind: 'idle' | 'error' | 'paid' | 'cancelled'; text?: string; captureId?: string };

/**
 * Pay Now: the live site's billing fields, then PayPal's own checkout for the
 * card or PayPal payment. No card number, expiry or CVC is ever entered here.
 * Without PayPal configured, the visitor can request a payment link on
 * WhatsApp with the details already filled in.
 */
export function PayForm({ clientId }: { clientId?: string }) {
  const form = useRef<HTMLFormElement>(null);
  const buttonsEl = useRef<HTMLDivElement>(null);
  const statusEl = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<PaymentValues>(empty);
  const [values, setValues] = useState<PaymentValues>(empty);
  const [errors, setErrors] = useState<Partial<Record<PaymentField, string>>>({});
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [sdk, setSdk] = useState<'loading' | 'ready' | 'failed' | 'off'>(clientId ? 'loading' : 'off');

  const read = useCallback(() => {
    const fd = new FormData(form.current!);
    const v = Object.fromEntries(PAYMENT_FIELDS.map((f) => [f, String(fd.get(f) ?? '').trim()])) as PaymentValues;
    valuesRef.current = v;
    return v;
  }, []);

  const check = useCallback(() => {
    const e = validatePayment(read());
    setErrors(e);
    if (Object.keys(e).length) {
      requestAnimationFrame(() => form.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return false;
    }
    return true;
  }, [read]);

  // Load the PayPal SDK once.
  useEffect(() => {
    if (!clientId) return;
    if (window.paypal) return setSdk('ready');
    const s = document.createElement('script');
    s.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(clientId)}&currency=USD&intent=capture&components=buttons&enable-funding=card`;
    s.async = true;
    s.onload = () => setSdk('ready');
    s.onerror = () => setSdk('failed');
    document.body.appendChild(s);
  }, [clientId]);

  // Render the buttons.
  useEffect(() => {
    if (sdk !== 'ready' || !window.paypal || !buttonsEl.current || status.kind === 'paid') return;
    const buttons = window.paypal.Buttons({
      style: { layout: 'vertical', shape: 'pill', label: 'pay', height: 48 },
      onClick: (_d, actions) => (check() ? actions.resolve() : actions.reject()),
      createOrder: async () => {
        setStatus({ kind: 'idle' });
        const r = await createPaymentOrder(valuesRef.current);
        if (!r.id) throw new Error(r.error || 'Could not start the payment.');
        return r.id;
      },
      onApprove: async ({ orderID }) => {
        const r = await capturePaymentOrder(orderID, valuesRef.current);
        setStatus(r.ok ? { kind: 'paid', captureId: r.captureId } : { kind: 'error', text: r.error });
      },
      onCancel: () => setStatus({ kind: 'cancelled', text: 'Payment cancelled. You have not been charged.' }),
      onError: (err) => setStatus({ kind: 'error', text: err instanceof Error ? err.message : 'Something went wrong with PayPal. You have not been charged.' }),
    });
    if (buttons.isEligible()) buttons.render(buttonsEl.current).catch(() => setSdk('failed'));
    return () => {
      buttons.close().catch(() => {});
    };
  }, [sdk, check, status.kind]);

  useEffect(() => {
    if (status.kind !== 'idle') statusEl.current?.focus();
  }, [status]);

  const field = (name: PaymentField) => ({
    id: `pf-${name}`,
    name,
    autoComplete: AUTOCOMPLETE[name],
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `pf-${name}-error` : undefined,
  });
  const input = (name: PaymentField, type = 'text', extra: Record<string, string> = {}) => (
    <div className="field">
      <label htmlFor={`pf-${name}`}>
        {LABELS[name]} <span className="field__req" aria-hidden="true">*</span>
      </label>
      <input {...field(name)} type={type} required {...extra} />
      {errors[name] && (
        <p id={`pf-${name}-error`} className="field__error">
          {errors[name]}
        </p>
      )}
    </div>
  );

  const linkMessage = [
    'Hi One Love, please send me a payment link.',
    `Name: ${values.fullName}`,
    `Email: ${values.email}`,
    `Amount: ${values.amount ? `$${values.amount} USD` : ''}`,
  ].join('\n');

  if (status.kind === 'paid') {
    return (
      <div ref={statusEl} className="pay-done" role="status" tabIndex={-1}>
        <span className="pay-done__icon" aria-hidden="true">
          <Icon name="check" />
        </span>
        <p className="pay-done__title">Payment received. Thank you.</p>
        <p>
          PayPal is emailing your receipt to {valuesRef.current.email}. Your PayPal reference is <strong>{status.captureId}</strong>. Questions? Message us on WhatsApp at{' '}
          {business.phone}.
        </p>
      </div>
    );
  }

  return (
    <form ref={form} className="contact-form pay-form" noValidate onSubmit={(e) => e.preventDefault()} onInput={() => setValues(read())}>
      <fieldset className="form-group">
        <legend>Billing information</legend>
        {input('fullName')}
        <div className="field-pair">
          {input('email', 'email')}
          {input('phone', 'tel', { inputMode: 'tel' })}
        </div>
        <div className="field-pair">
          {input('country')}
          {input('state')}
        </div>
        {input('address')}
      </fieldset>
      <fieldset className="form-group">
        <legend>Payment</legend>
        <div className="field pay-form__amount">
          <label htmlFor="pf-amount">
            {LABELS.amount} <span className="field__req" aria-hidden="true">*</span>
          </label>
          <div className="pay-form__money">
            <span aria-hidden="true">$</span>
            <input {...field('amount')} type="text" inputMode="decimal" placeholder="175.00" required />
          </div>
          <p className="field__hint">Your deposit or the full rental, as agreed with us.</p>
          {errors.amount && (
            <p id="pf-amount-error" className="field__error">
              {errors.amount}
            </p>
          )}
        </div>

        {sdk === 'off' || sdk === 'failed' ? (
          <div className="pay-form__fallback">
            <p>
              {sdk === 'failed' ? "PayPal didn't load." : 'Online card payment is being set up.'} Message us and we send you a secure PayPal payment link, or pay at
              cart hand-off.
            </p>
            <a className="btn btn--primary" href={whatsappUrl(linkMessage)}>
              <Icon name="chat" /> Ask for a payment link
            </a>
          </div>
        ) : (
          <div className="pay-form__buttons">
            {sdk === 'loading' && <p className="field__hint">Loading secure PayPal checkout…</p>}
            <div ref={buttonsEl} />
          </div>
        )}
      </fieldset>
      <div ref={statusEl} className={`contact-form__status is-${status.kind === 'cancelled' ? 'unconfigured' : status.kind}`} role="status" aria-live="polite" tabIndex={-1}>
        {status.text && <p>{status.text}</p>}
      </div>
    </form>
  );
}
