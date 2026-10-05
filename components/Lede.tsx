import { LEDE } from "@/lib/content";

/** The definitional opening paragraph, the one an AI Overview can lift. */
export function Lede() {
  return (
    <section className="lede bg-paper">
      <div className="shell lede-grid">
        <p className="big" data-reveal>
          {LEDE.big} <span className="mute">{LEDE.bigMuted}</span>
        </p>
        <aside data-reveal style={{ "--d": "90ms" } as React.CSSProperties}>
          <p className="small">{LEDE.rest}</p>
        </aside>
      </div>
    </section>
  );
}
