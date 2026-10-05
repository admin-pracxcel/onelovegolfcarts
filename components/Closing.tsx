import { Btn } from "./Bits";
import { BUSINESS, CLOSING, VERIFIED } from "@/lib/content";

/** The destination of the route. The one place brand red fills the page. */
export function Closing() {
  return (
    <>
      <section className="on-red s-loose close-sec">
        <div className="shell close-grid">
          <div className="close-a">
            <h2 className="display" data-lines>
              <span className="ln"><span>Ready when</span></span>
              <span className="ln"><span>you are.</span></span>
            </h2>
          </div>
          <div className="close-b">
            <p className="small" data-reveal
               style={{ color: "rgba(255,255,255,.88)", maxWidth: "34ch", marginBottom: "1.5rem" }}>
              {CLOSING.body}
            </p>
            <div className="close-cta" data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
              <Btn href="/book-now/" tone="paper" size="lg">Book now</Btn>
              <Btn href={BUSINESS.whatsapp} tone="line" size="lg" external icon="whatsapp-logo-bold">WhatsApp</Btn>
            </div>
          </div>
        </div>
      </section>
      <div className="on-paper verified">
        <div className="shell"><p className="mono">{VERIFIED}</p></div>
      </div>
    </>
  );
}
