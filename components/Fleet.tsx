import Image from "next/image";
import { Num, TLink } from "./Bits";
import { FLEET } from "@/lib/content";

/**
 * One composition split by a single rule, not two cards.
 *
 * Both photographs are offset so their GROUND PLANES land on one baseline:
 * measured at 72% and 91% of their respective frames, so without the offset
 * the carts cannot stand on the same line. See globals.css for why this
 * stops short of claiming a to-scale length comparison.
 *
 * On mobile the two spec lists collapse into one table with two value
 * columns, which compares better than two lists side by side.
 */
export function Fleet() {
  const [four, six] = FLEET.carts;
  const specRows = [
    ["Seats", "4 adults", "6 adults"],
    ["Engine", "Gas", "Gas"],
    ["Chassis", "Aluminum", "Aluminum"],
    ["Weekly", "$175", "$350"],
  ];

  return (
    <section className="on-ink s-std" id="carts">
      <div className="shell">
        <div className="s-head s-head-row">
          <div>
            <p className="mono" data-reveal>The fleet</p>
            <h2 className="h2" data-reveal style={{ "--d": "60ms" } as React.CSSProperties}>
              Two carts.<br /><span className="mute-d">Both gas Club Car.</span>
            </h2>
          </div>
          <div data-reveal style={{ "--d": "140ms" } as React.CSSProperties}>
            <TLink href={FLEET.compare.href}>{FLEET.compare.label}</TLink>
          </div>
        </div>
      </div>

      <div className="shell">
        <div className="fleet">
          {[four, six].map((cart, i) => (
            <div className="fleet-col" key={cart.id} id={cart.id}>
              <div className="fleet-num" data-reveal style={{ "--d": `${i * 90}ms` } as React.CSSProperties}>
                <Num outline={i === 0}>{i === 0 ? "04" : "06"}</Num>
              </div>
              <div className={`fleet-media fleet-media--${i === 0 ? "4" : "6"}`}
                   data-clip
                   style={{ "--d": `${160 + i * 90}ms`,
                            "--ground": i === 0 ? "72%" : "91%" } as React.CSSProperties}>
                <Image src={`${cart.image}.jpg`} width={cart.width} height={cart.height}
                       alt={cart.alt} sizes="(max-width: 760px) 50vw, 40vw" />
              </div>
            </div>
          ))}
          {/* the shared baseline both carts stand on */}
        </div>
        <hr className="fleet-base" />

        <div className="fleet">
          {[four, six].map((cart) => (
            <div className="fleet-col" key={cart.id + "-b"}>
              <div className="fleet-body">
                <h3 className="h3">{cart.title[0]}<br />{cart.title[1]}</h3>
                <div className="fleet-price">
                  <span className="price-n">{cart.price}</span>
                  <span className="price-l"><span className="mono">per</span><span className="mono">day</span></span>
                </div>
                <p className="small" style={{ maxWidth: "40ch" }}>{cart.body}</p>
                <div className="fleet-cta"><TLink href={cart.anchor}>{cart.cta}</TLink></div>
              </div>
            </div>
          ))}
        </div>

        <div className="spec spec-compare" data-reveal>
          <div className="sc-h mono">Specification</div>
          <div className="sc-h mono" style={{ textAlign: "right" }}>04</div>
          <div className="sc-h mono" style={{ textAlign: "right" }}>06</div>
          {specRows.map((r) => (
            <div key={r[0]} style={{ display: "contents" }}>
              <div className="sc-l mono">{r[0]}</div>
              <div className="sc-c mono-v">{r[1]}</div>
              <div className="sc-c mono-v">{r[2]}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
