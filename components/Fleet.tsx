import Image from "next/image";
import { ArrowLink } from "./ArrowLink";
import { FLEET } from "@/lib/content";

export function Fleet() {
  return (
    <section className="bg-paper-2" id="carts">
      <div className="shell">
        <div className="s-head s-head-row">
          <div>
            <p className="mono eyebrow" data-reveal>{FLEET.eyebrow}</p>
            <h2 className="h2" data-reveal style={{ "--d": "60ms" } as React.CSSProperties}>
              {FLEET.headline} <span className="mute">{FLEET.headlineMuted}</span>
            </h2>
          </div>
          <div data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
            <ArrowLink href={FLEET.compare.href}>{FLEET.compare.label}</ArrowLink>
          </div>
        </div>

        <div className="fleet">
          {FLEET.carts.map((cart, i) => (
            <article
              className="cart"
              id={cart.id}
              key={cart.id}
              data-reveal
              style={{ "--d": `${i * 110}ms` } as React.CSSProperties}
            >
              <div className="cart-media">
                <span className={`chip chip-${cart.chipTone}`}>{cart.chip}</span>
                <Image
                  src={`${cart.image}.jpg`}
                  width={cart.width}
                  height={cart.height}
                  alt={cart.alt}
                  sizes="(max-width: 919px) 100vw, 46vw"
                />
              </div>
              <div className="cart-body">
                <div className="cart-top">
                  <h3 className="h3">
                    {cart.title[0]}<br />{cart.title[1]}
                  </h3>
                  <p className="cart-price">
                    {cart.price}<span>{cart.priceUnit}</span>
                  </p>
                </div>
                <div className="cart-specs">
                  {cart.specs.map((s) => (
                    <span className="chip chip-line" key={s}>{s}</span>
                  ))}
                </div>
                <p>{cart.body}</p>
                <ArrowLink href={cart.anchor}>{cart.cta}</ArrowLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
