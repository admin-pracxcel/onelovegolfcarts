import { cookies, headers } from 'next/headers';
import { cleanCountry, cleanSource, LEAD_INPUTS, LEAD_SOURCE_COOKIE, leadDate } from '@/lib/lead';

/**
 * Server side of the lead fields (see lib/lead.ts).
 *
 * Country comes from a CDN/proxy geo header when the host adds one
 * (Cloudflare, CloudFront, Vercel…); otherwise the visitor's IP is looked up
 * on country.is (free, no key, open source). Only the IP is sent, never form
 * data. Lookups are cached in memory and time out after two seconds, so a
 * slow lookup can never block a submission: the field is just left empty.
 */

const GEO_HEADERS = ['cf-ipcountry', 'cloudfront-viewer-country', 'x-vercel-ip-country', 'x-country-code', 'x-geo-country'];
const cache = new Map<string, string>();

function clientIp(h: Headers): string {
  const forwarded = h.get('x-forwarded-for')?.split(',')[0]?.trim();
  return forwarded || h.get('cf-connecting-ip')?.trim() || h.get('x-real-ip')?.trim() || '';
}

const isPrivateIp = (ip: string) =>
  /^(127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|169\.254\.|0\.)/.test(ip) || ip === '::1' || /^(fc|fd|fe80)/i.test(ip) || ip.startsWith('::ffff:127.');

export async function countryFromRequest(h: Headers): Promise<string> {
  for (const name of GEO_HEADERS) {
    const code = cleanCountry(h.get(name));
    if (code) return code;
  }
  const ip = clientIp(h);
  if (!ip || isPrivateIp(ip)) return '';
  const hit = cache.get(ip);
  if (hit !== undefined) return hit;
  try {
    const res = await fetch(`https://api.country.is/${encodeURIComponent(ip)}`, { cache: 'no-store', signal: AbortSignal.timeout(2000) });
    const code = res.ok ? cleanCountry(((await res.json()) as { country?: string }).country) : '';
    if (cache.size > 2000) cache.clear();
    cache.set(ip, code);
    return code;
  } catch {
    return '';
  }
}

const safeDecode = (v: string) => {
  try {
    return decodeURIComponent(v);
  } catch {
    return v;
  }
};

/**
 * The three lead fields for a submission. The hidden inputs are used when
 * filled; anything missing (no JavaScript, blocked lookup) is filled here.
 * The date is always the server's submission time, in Belize time.
 */
export async function leadFields(formData: FormData) {
  const [h, jar] = await Promise.all([headers(), cookies()]);
  const leadCountry = cleanCountry(String(formData.get(LEAD_INPUTS.country) ?? '')) || (await countryFromRequest(h));
  const leadSource = cleanSource(String(formData.get(LEAD_INPUTS.source) ?? '')) || cleanSource(safeDecode(jar.get(LEAD_SOURCE_COOKIE)?.value ?? ''));
  return { leadCountry, leadSource, leadDate: leadDate() };
}

/** Plain-text lines for the email fallback. */
export const leadLines = (l: Awaited<ReturnType<typeof leadFields>>) =>
  `\n\nLead Country: ${l.leadCountry || 'unknown'}\nLead Source: ${l.leadSource || 'none'}\nLead Date: ${l.leadDate}`;
