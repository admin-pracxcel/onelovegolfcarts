import { Icon } from "./Icon";
import { TRUST } from "@/lib/content";

export function TrustRail() {
  return (
    <div className="trust">
      <div className="shell">
        <ul>
          {TRUST.map((t) => (
            <li key={t.value}>
              {t.icon && <Icon name={t.icon} />}
              <b>{t.value}</b>
              {t.rest && ` ${t.rest}`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
