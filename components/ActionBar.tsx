import { Icon } from "./Icon";
import { SiteLink } from "./SiteLink";
import { BUSINESS } from "@/lib/content";

/** Booking stays one tap away on mobile. Square, flush, no floating pill. */
export function ActionBar() {
  return (
    <div className="actionbar">
      <SiteLink href="/book-now/" className="primary">Book now</SiteLink>
      <a href={BUSINESS.whatsapp} rel="noopener" target="_blank">
        <Icon name="whatsapp-logo-bold" /> WhatsApp
      </a>
      <a href={BUSINESS.phoneHref} className="icon" aria-label="Call One Love">
        <Icon name="phone-bold" />
      </a>
    </div>
  );
}
