'use client';

import { useActionState, useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import { sendPayment, type PaymentState } from '@/app/pay-now/actions';
import { business, whatsappUrl } from '@/lib/business';
import {
  BRAND_LABELS,
  caretAfterDigits,
  cardBrand,
  cardLengthOk,
  cvcLength,
  formatCardNumber,
  formatExpiry,
  luhn,
  maxCardDigits,
  onlyDigits,
  type Brand,
} from '@/lib/card';
import { PAYMENT_FIELDS, validatePayment, type PaymentField, type PaymentValues } from '@/lib/payment';
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
  cardNumber: { label: 'Card number', autoComplete: 'cc-number', inputMode: 'numeric', placeholder: '1234 1234 1234 1234' },
  expiry: { label: 'Expiry date', autoComplete: 'cc-exp', inputMode: 'numeric', placeholder: 'MM / YY' },
  cvc: { label: 'CVC', autoComplete: 'cc-csc', inputMode: 'numeric', placeholder: 'CVC' },
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
  const [brand, setBrand] = useState<Brand | null>(null);
  // Errors from leaving a card field; null hides a server error the visitor is fixing.
  const [live, setLive] = useState<Partial<Record<PaymentField, string | null>>>({});
  const [seen, setSeen] = useState(state);
  if (seen !== state) {
    setSeen(state);
    setLive({});
    setBrand(null);
  }
  const e: Partial<Record<PaymentField, string>> = { ...state.errors };
  for (const [k, msg] of Object.entries(live) as [PaymentField, string | null][]) {
    if (msg) e[k] = msg;
    else delete e[k];
  }

  const el = (name: PaymentField) => form.current?.querySelector<HTMLInputElement>(`[name="${name}"]`) ?? null;
  const fieldError = (name: PaymentField) => {
    const fd = new FormData(form.current!);
    const vals = Object.fromEntries(PAYMENT_FIELDS.map((f) => [f, String(fd.get(f) ?? '').trim()])) as PaymentValues;
    return validatePayment(vals)[name] ?? null;
  };
  const clearError = (name: PaymentField) => setLive((l) => (l[name] === null ? l : { ...l, [name]: null }));
  // Card fields: say what's wrong once the visitor leaves a field they've started.
  const onCardBlur = (name: PaymentField) => () => {
    if (!el(name)?.value) return clearError(name);
    setLive((l) => ({ ...l, [name]: fieldError(name) }));
  };

  // Backspace/Delete step over the formatting characters instead of getting stuck on them.
  const skipSeparators = (ev: KeyboardEvent<HTMLInputElement>) => {
    const i = ev.currentTarget;
    const pos = i.selectionStart ?? 0;
    if (pos !== i.selectionEnd) return;
    if (ev.key === 'Backspace') {
      let p = pos;
      while (p > 0 && /[\s/]/.test(i.value[p - 1])) p--;
      if (p !== pos) i.setSelectionRange(p, p);
    } else if (ev.key === 'Delete') {
      let p = pos;
      while (p < i.value.length && /[\s/]/.test(i.value[p])) p++;
      if (p !== pos) i.setSelectionRange(p, p);
    }
  };

  const reformat = (i: HTMLInputElement, formatted: string, digitsBeforeCaret: number) => {
    i.value = formatted;
    if (document.activeElement === i) {
      const c = caretAfterDigits(formatted, digitsBeforeCaret);
      i.setSelectionRange(c, c);
    }
  };
  const digitsBefore = (i: HTMLInputElement) => onlyDigits(i.value.slice(0, i.selectionStart ?? i.value.length)).length;

  const onCardNumber = (ev: FormEvent<HTMLInputElement>) => {
    const i = ev.currentTarget;
    const before = digitsBefore(i);
    let d = onlyDigits(i.value);
    d = d.slice(0, maxCardDigits(d));
    reformat(i, formatCardNumber(d), Math.min(before, d.length));
    setBrand(cardBrand(d));
    clearError('cardNumber');
    const cvc = el('cvc');
    if (cvc && cvc.value.length > cvcLength(d)) cvc.value = cvc.value.slice(0, cvcLength(d));
    if (d.length === maxCardDigits(d) && cardLengthOk(d) && luhn(d)) el('expiry')?.focus();
  };

  const onExpiry = (ev: FormEvent<HTMLInputElement>) => {
    const i = ev.currentTarget;
    const deleting = ((ev.nativeEvent as InputEvent).inputType ?? '').startsWith('delete');
    const before = digitsBefore(i);
    const typed = onlyDigits(i.value);
    const formatted = formatExpiry(i.value, deleting);
    // A leading "0" added to "4" counts as a digit before the caret.
    reformat(i, formatted, Math.min(onlyDigits(formatted).length, before + (onlyDigits(formatted).length - Math.min(typed.length, 4))));
    if (!deleting && formatted.endsWith(' / ') && document.activeElement === i) i.setSelectionRange(formatted.length, formatted.length);
    clearError('expiry');
    const d = onlyDigits(formatted);
    if (d.length === 4 && Number(d.slice(0, 2)) >= 1 && Number(d.slice(0, 2)) <= 12) el('cvc')?.focus();
  };

  const onCvc = (ev: FormEvent<HTMLInputElement>) => {
    const i = ev.currentTarget;
    const before = digitsBefore(i);
    const d = onlyDigits(i.value).slice(0, cvcLength(onlyDigits(el('cardNumber')?.value ?? '')));
    reformat(i, d, Math.min(before, d.length));
    clearError('cvc');
  };

  const CARD_HANDLERS: Partial<Record<PaymentField, (ev: FormEvent<HTMLInputElement>) => void>> = {
    cardNumber: onCardNumber,
    expiry: onExpiry,
    cvc: onCvc,
  };

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
        <div className={name === 'amount' ? 'pay-form__money' : card ? 'pay-form__card' : undefined}>
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
            {...(card
              ? { 'data-card': '', defaultValue: '', onInput: CARD_HANDLERS[name], onKeyDown: skipSeparators, onBlur: onCardBlur(name), spellCheck: false, autoCorrect: 'off' }
              : { defaultValue: v?.[name] ?? '' })}
            aria-invalid={e[name] ? true : undefined}
            aria-describedby={e[name] ? `pf-${name}-error` : undefined}
          />
          {name === 'cardNumber' && (
            <span className={`pay-form__brand${brand ? ' is-known' : ''}`} aria-live="polite">
              {brand ? BRAND_LABELS[brand] : ''}
            </span>
          )}
        </div>
        {name === 'cvc' && brand === 'amex' && !e.cvc && <p className="field__hint">4 digits on the front of the card.</p>}
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
