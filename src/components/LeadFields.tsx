'use client';

import { useEffect, useRef, useState } from 'react';
import { cleanCountry, cleanSource, LEAD_INPUTS, LEAD_SOURCE_COOKIE, leadDate } from '@/lib/lead';

const COUNTRY_KEY = 'ol-lead-country';

const readCookie = (name: string) => {
  const raw = document.cookie.split('; ').find((c) => c.startsWith(`${name}=`))?.slice(name.length + 1) ?? '';
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
};

/**
 * Hidden Lead Country / Lead Source / Lead Date inputs (see lib/lead.ts).
 * Country is looked up once per browser session; the date is stamped when the
 * form is submitted. The server fills anything left empty and sets the final
 * date itself, so these are never trusted for timing.
 */
export function LeadFields() {
  const anchor = useRef<HTMLSpanElement>(null);
  const [lead, setLead] = useState({ country: '', source: '', date: '' });
  const latest = useRef(lead);
  useEffect(() => {
    latest.current = lead;
  }, [lead]);

  useEffect(() => {
    let cancelled = false;
    let stored = '';
    try {
      stored = cleanCountry(sessionStorage.getItem(COUNTRY_KEY));
    } catch {}
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reads browser-only state once on mount
    setLead({ country: stored, source: cleanSource(readCookie(LEAD_SOURCE_COOKIE)), date: leadDate() });
    if (!stored) {
      fetch('/api/lead-country/', { cache: 'no-store' })
        .then((r) => (r.ok ? r.json() : null))
        .then((d: { country?: string } | null) => {
          const country = cleanCountry(d?.country);
          if (cancelled || !country) return;
          try {
            sessionStorage.setItem(COUNTRY_KEY, country);
          } catch {}
          setLead((l) => ({ ...l, country }));
        })
        .catch(() => {});
    }

    // Stamp the values into the submitted FormData itself, so they survive
    // React resetting the form after an action.
    const form = anchor.current?.closest('form');
    const onFormData = (e: FormDataEvent) => {
      const now = { ...latest.current, date: leadDate() };
      e.formData.set(LEAD_INPUTS.country, now.country);
      e.formData.set(LEAD_INPUTS.source, cleanSource(readCookie(LEAD_SOURCE_COOKIE)) || now.source);
      e.formData.set(LEAD_INPUTS.date, now.date);
    };
    form?.addEventListener('formdata', onFormData);
    return () => {
      cancelled = true;
      form?.removeEventListener('formdata', onFormData);
    };
  }, []);

  return (
    <span ref={anchor} hidden>
      <input type="hidden" name={LEAD_INPUTS.country} value={lead.country} />
      <input type="hidden" name={LEAD_INPUTS.source} value={lead.source} />
      <input type="hidden" name={LEAD_INPUTS.date} value={lead.date} />
    </span>
  );
}
