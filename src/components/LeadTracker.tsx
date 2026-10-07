'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { cleanSource, LEAD_SOURCE_COOKIE, LEAD_SOURCE_DAYS } from '@/lib/lead';

/**
 * Remembers utm_source from the landing URL in a first-party cookie, so the
 * forms can send it as Lead Source even after the visitor changes page. A
 * newer utm_source replaces the old one; visits without one leave it alone.
 */
export function LeadTracker() {
  const pathname = usePathname();
  useEffect(() => {
    const source = cleanSource(new URLSearchParams(window.location.search).get('utm_source'));
    if (!source) return;
    const secure = window.location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${LEAD_SOURCE_COOKIE}=${encodeURIComponent(source)}; Max-Age=${LEAD_SOURCE_DAYS * 86400}; Path=/; SameSite=Lax${secure}`;
  }, [pathname]);
  return null;
}
