import { Button } from "./Button";
import { BUSINESS, CLOSING, VERIFIED } from "@/lib/content";

export function Closing() {
  return (
    <>
      <div className="close">
        <div className="close-panel on-dark">
          <div className="shell close-grid">
            <div>
              <h2 className="display" data-reveal>
                <span className="ln">{CLOSING.headline}</span>
                <span className="ln mute-d">{CLOSING.headlineMuted}</span>
              </h2>
              <p className="lead" data-reveal style={{ "--d": "70ms" } as React.CSSProperties}>
                {CLOSING.body}
              </p>
            </div>
            <div className="close-actions" data-reveal style={{ "--d": "140ms" } as React.CSSProperties}>
              <Button href="/book-now/" tone="paper" size="lg">{CLOSING.primary}</Button>
              <Button href={BUSINESS.whatsapp} tone="glass" size="lg" knob={false} external icon="whatsapp-logo-bold">
                {CLOSING.secondary}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="verified"><p>{VERIFIED}</p></div>
    </>
  );
}
