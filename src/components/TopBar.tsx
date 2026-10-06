import { announcement } from '@/lib/content';

/**
 * Announcement bar above the header, on every page. It sits in normal flow
 * and scrolls away; the fixed header follows it up (see Header.tsx), so the
 * header never overlaps it and never leaves a gap.
 */
export function TopBar() {
  return (
    <aside className="topbar" aria-label="Booking notice" data-topbar="">
      <p>{announcement}</p>
    </aside>
  );
}
