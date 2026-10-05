import { Btn } from "./Bits";
import { BUSINESS, HERO } from "@/lib/content";

/**
 * A composed poster, not a photograph with text on it.
 *
 * The H1 is broken across four short lines and the photograph is placed in the
 * same grid rows, so on desktop the type runs in front of its left edge while
 * the image runs in front on the right. The required SEO string is intact and
 * fully crawlable; only the line breaks are art-directed.
 *
 * Price is set as information, not a badge: FROM / $35 / A DAY, with the
 * numeral at display scale.
 */
export function Hero() {
  return (
    <section className="hero">
      <div className="wide hero-in">
        <div className="hero-grid">
          <div className="hero-meta" data-reveal>
            <p className="mono">{BUSINESS.region} &mdash; Belize</p>
            <p className="mono">{BUSINESS.lat.toFixed(4)}&deg; N / {Math.abs(BUSINESS.lng).toFixed(4)}&deg; W</p>
            <p className="mono">Est. {BUSINESS.founded}</p>
          </div>

          <h1 className="display hero-h1" data-lines>
            <span className="ln"><span>Golf Cart</span></span>
            <span className="ln"><span>Rental in</span></span>
            <span className="ln"><span>San Pedro,</span></span>
            <span className="ln"><span>Belize</span></span>
          </h1>

          <div className="hero-media" data-clip style={{ "--d": "260ms" } as React.CSSProperties}>
            <picture>
              <source media="(max-width: 979px)" srcSet="/img/hero-one-love-golf-cart-beachfront-san-pedro-portrait.webp" type="image/webp" />
              <source media="(max-width: 979px)" srcSet="/img/hero-one-love-golf-cart-beachfront-san-pedro-portrait.jpg" />
              <source srcSet="/img/hero-one-love-golf-cart-beachfront-san-pedro.webp" type="image/webp" />
              {/* Art direction: a 4:5 crop on mobile against 16:9 on desktop.
                  next/image cannot express that without fetching both. */}
              <img src="/img/hero-one-love-golf-cart-beachfront-san-pedro.jpg"
                   width={1440} height={810} fetchPriority="high" decoding="async"
                   alt={HERO.image.alt} />
            </picture>
          </div>

          <div className="hero-foot">
            <div data-reveal style={{ "--d": "420ms" } as React.CSSProperties}>
              <p className="mono" style={{ marginBottom: ".4rem" }}>From</p>
              <div className="price">
                <span className="price-n">$35</span>
                <span className="price-l"><span className="mono">a day</span></span>
              </div>
            </div>
            <div className="hero-cta" data-reveal style={{ "--d": "520ms" } as React.CSSProperties}>
              <Btn href="/book-now/" tone="primary" size="lg">Book now</Btn>
              <Btn href="/rates/" tone="line" size="lg">See rates</Btn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
