import Image from "next/image";
import { Num } from "./Bits";
import { WHY } from "@/lib/content";

/**
 * Numbered editorial rows. Each row is a DIFFERENT composition on purpose:
 * if all four were the same shape this would just be icon cards with the
 * icons removed. Row 1 carries an image bleeding off the right, row 2 goes
 * big on the numeral with no image, row 3 is standard, row 4 runs the
 * headline full width.
 */
const VARIANTS = ["why-row--img", "why-row--big", "", "why-row--wide"];

export function Why() {
  const { band } = WHY;
  return (
    <section className="on-paper s-std">
      <div className="shell">
        <div className="s-head">
          <h2 className="h2" data-reveal>
            Why rent <span className="mute">from One Love</span>
          </h2>
        </div>

        {WHY.cells.map((cell, i) => (
          <div className={`why-row ${VARIANTS[i]}`} key={cell.title} data-reveal>
            <div className="why-n"><Num outline>{String(i + 1).padStart(2, "0")}</Num></div>
            <div className="why-h"><h3 className="h3">{cell.title}</h3></div>
            <div className="why-b"><p className="small">{cell.body}</p></div>
            {i === 0 && (
              <div className="why-media" data-clip style={{ "--d": "140ms" } as React.CSSProperties}>
                <Image src="/img/guests-driving-one-love-golf-cart-san-pedro.jpg" width={1000} height={667}
                       alt="Guests riding a One Love 6-seater golf cart along a busy street in San Pedro Town."
                       sizes="(max-width: 899px) 100vw, 28vw" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* the fleet gets a lineup-shaped frame, full bleed */}
      <figure className="why-band rail" data-scale style={{ marginTop: "clamp(2.5rem,5vw,4.5rem)" }}>
        <Image src={`${band.media.src}.jpg`} width={band.media.width} height={band.media.height}
               alt={band.media.alt} sizes="100vw" />
      </figure>
      <div className="shell" style={{ marginTop: "clamp(1.5rem,3vw,2.5rem)" }}>
        <div className="why-row" style={{ borderTop: 0, paddingTop: 0 }}>
          <div className="why-n"><Num outline>04</Num></div>
          <div className="why-h"><h3 className="h3">{band.title}</h3></div>
          <div className="why-b"><p className="small">{band.body}</p></div>
        </div>
      </div>
    </section>
  );
}
