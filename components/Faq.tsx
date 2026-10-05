import { Icon } from "./Icon";
import { Button } from "./Button";
import { BUSINESS, FAQ } from "@/lib/content";

/** Native <details>, so it opens with JavaScript disabled. */
export function Faq() {
  return (
    <section className="bg-paper-2" id="faq">
      <div className="shell faq">
        <div className="faq-aside">
          <h2 className="h2" data-reveal>
            {FAQ.headline} <span className="mute">{FAQ.headlineMuted}</span>
          </h2>
          <p className="small" data-reveal style={{ "--d": "60ms" } as React.CSSProperties}>
            {FAQ.aside}
          </p>
          <div data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
            <Button href={BUSINESS.whatsapp} tone="line" knob={false} external icon="whatsapp-logo-bold">
              {FAQ.cta}
            </Button>
          </div>
        </div>

        <div className="faq-list" data-reveal style={{ "--d": "100ms" } as React.CSSProperties}>
          {FAQ.items.map((item) => (
            <details className="fq" key={item.q}>
              <summary>
                {item.q}
                <span className="fq-sign">
                  <Icon name="plus-bold" className="ico i-p" />
                  <Icon name="minus-bold" className="ico i-m" />
                </span>
              </summary>
              <div className="fq-a"><p>{item.a}</p></div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
