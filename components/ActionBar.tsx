import { Icon } from "./Icon";
import { Button } from "./Button";
import { BUSINESS } from "@/lib/content";

/** Fixed booking rail, mobile only. */
export function ActionBar() {
  return (
    <div className="actionbar">
      <Button href="/book-now/" tone="primary" knob={false}>Book now</Button>
      <Button href={BUSINESS.whatsapp} tone="glass" knob={false} external icon="whatsapp-logo-bold">
        WhatsApp
      </Button>
      <a className="btn btn-glass btn-icon" href={BUSINESS.phoneHref} aria-label="Call One Love">
        <Icon name="phone-bold" />
      </a>
    </div>
  );
}
