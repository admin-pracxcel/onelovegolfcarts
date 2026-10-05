import { Icon } from "./Icon";
import { TRUST } from "@/lib/content";

/** The arrival beat. Thin, dark, still. */
export function TrustRail() {
  return (
    <div className="trust on-ink">
      <ul>
        {TRUST.map((t) => (
          <li key={t.value}>
            {t.icon && <Icon name={t.icon} />}
            <b>{t.value}</b>{t.rest && <span>&nbsp;{t.rest}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
