import { LEDE } from "@/lib/content";

/** The definitional paragraph an AI Overview can lift, set as a statement. */
export function Lede() {
  return (
    <section className="on-paper s-std">
      <div className="shell lede-wrap">
        <p className="lede lede-a" data-reveal>
          {LEDE.big} <span className="mute">{LEDE.bigMuted}</span>
        </p>
        <p className="small lede-b" data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
          {LEDE.rest}
        </p>
      </div>
    </section>
  );
}
