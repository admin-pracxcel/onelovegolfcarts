import { Nav } from "./Nav";
import { Button } from "./Button";
import { HERO, QUICK_BOOK } from "@/lib/content";

/**
 * Inset rounded panel. The nav pill sits inside it and detaches on scroll.
 *
 * The hero image is a plain <picture> rather than next/image on purpose:
 * this is art direction, a different crop on mobile (4:5) from desktop
 * (16:9), which next/image cannot express without downloading both. The
 * files are already hand-cropped and compressed, and both are preloaded
 * behind the same media queries in layout.tsx.
 */
export function Hero() {
  return (
    <section className="hero">
      <Nav />

      <div className="hero-panel">
        <picture>
          <source media="(max-width: 640px)" type="image/webp" srcSet={`${HERO.image.tall}.webp`} />
          <source media="(max-width: 640px)" srcSet={`${HERO.image.tall}.jpg`} />
          <source type="image/webp" srcSet={`${HERO.image.wide}.webp`} />
          <img
            className="hero-img"
            src={`${HERO.image.wide}.jpg`}
            width={1440}
            height={810}
            fetchPriority="high"
            decoding="async"
            alt={HERO.image.alt}
          />
        </picture>

        <div className="hero-copy">
          <p className="mono eyebrow">{HERO.eyebrow}</p>
          <h1 className="display">
            <span className="ln">{HERO.headline}</span>
            <span className="ln mute-d">{HERO.headlineMuted}</span>
          </h1>
          <p className="hero-sub">{HERO.sub}</p>
          <div className="hero-actions">
            <Button href="/book-now/" tone="primary" size="lg">{HERO.primary}</Button>
            <Button href="/rates/" tone="glass" size="lg" knob={false}>{HERO.secondary}</Button>
          </div>
        </div>

        {/* Hands off to the full reservation form with the values prefilled. */}
        <form className="qbook" action="/book-now/" method="get">
          <div className="qfield">
            <label htmlFor="q-cart">{QUICK_BOOK.cartLabel}</label>
            <select id="q-cart" name="cart" defaultValue={QUICK_BOOK.options[0].value}>
              {QUICK_BOOK.options.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
          <div className="qfield">
            <label htmlFor="q-from">{QUICK_BOOK.fromLabel}</label>
            <input id="q-from" name="from" type="date" />
          </div>
          <div className="qfield">
            <label htmlFor="q-to">{QUICK_BOOK.toLabel}</label>
            <input id="q-to" name="to" type="date" />
          </div>
          <Button tone="paper" type="submit">{QUICK_BOOK.submit}</Button>
        </form>
      </div>
    </section>
  );
}
