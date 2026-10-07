/**
 * Lead tracking fields sent with every form (contact, booking, payment):
 *
 *   Lead Country  ISO country code from the visitor's IP (see lead-server.ts)
 *   Lead Source   utm_source from the landing URL, kept in a cookie so it
 *                 survives page changes (last utm_source seen wins)
 *   Lead Date     submission time in Belize, "07 October, 2026 at 01:59 PM"
 *
 * Safe to import in the browser and on the server.
 */

export const LEAD_SOURCE_COOKIE = 'ol_lead_source';
export const LEAD_SOURCE_DAYS = 30;

/** Hidden input names on the forms. */
export const LEAD_INPUTS = { country: 'lead_country', source: 'lead_source', date: 'lead_date' } as const;

/** "07 October, 2026 at 01:59 PM" in Belize time (America/Belize, UTC-6 all year). */
export function leadDate(d: Date = new Date()): string {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Belize',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
      .formatToParts(d)
      .map((x) => [x.type, x.value]),
  );
  return `${p.day} ${p.month}, ${p.year} at ${p.hour}:${p.minute} ${p.dayPeriod.toUpperCase()}`;
}

/** utm_source as stored and sent: trimmed, single-line, at most 100 characters. */
export function cleanSource(value: string | null | undefined): string {
  return (value ?? '').replace(/[\u0000-\u001f\u007f]/g, '').trim().slice(0, 100);
}

/** Two-letter country code, or '' (Cloudflare uses XX / T1 for unknown / Tor). */
export function cleanCountry(value: string | null | undefined): string {
  const v = (value ?? '').trim().toUpperCase();
  return /^[A-Z]{2}$/.test(v) && v !== 'XX' && v !== 'T1' ? v : '';
}
