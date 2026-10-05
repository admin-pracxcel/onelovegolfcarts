import { Btn } from "./Bits";
import { BUSINESS, FAQ } from "@/lib/content";

/** The calm after the loudest run of sections. Native details, zero JS. */
export function Faq() {
  return (
    <section className="on-paper s-std" id="faq">
      <div className="shell faq-grid">
        <div className="faq-aside">
          <h2 className="h2" data-reveal>
            {FAQ.headline} <span className="mute">{FAQ.headlineMuted}</span>
          </h2>
          <p className="small" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>{FAQ.aside}</p>
          <div data-reveal style={{ "--d": "140ms" } as React.CSSProperties}>
            <Btn href={BUSINESS.whatsapp} tone="line" external icon="whatsapp-logo-bold">{FAQ.cta}</Btn>
          </div>
        </div>
        <div data-reveal style={{ "--d": "100ms" } as React.CSSProperties}>
          {FAQ.items.map((item) => (
            <details className="fq" key={item.q}>
              <summary>{item.q}<span className="fq-sign" aria-hidden="true" /></summary>
              <div className="fq-a"><p>{item.a}</p></div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
