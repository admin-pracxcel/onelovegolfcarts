import { Stars, TLink } from "./Bits";
import { BUSINESS, REVIEWS } from "@/lib/content";

/** One quote dominates at display scale. No cards, no marquee. */
export function Reviews() {
  return (
    <section className="on-ink s-std" id="reviews">
      <div className="shell">
        <div className="s-head">
          <h2 className="h2" data-reveal>
            {REVIEWS.headline} <span className="mute-d">{REVIEWS.headlineMuted}</span>
          </h2>
        </div>
        <div className="rev">
          <figure className="rev-feat" data-reveal>
            <Stars />
            <blockquote className="q-big">{REVIEWS.featured.quote}</blockquote>
            <figcaption className="byline">
              <b>{REVIEWS.featured.name}</b>
              <a className="wlink" href={BUSINESS.maps} rel="nofollow noopener" target="_blank">Google review</a>
            </figcaption>
          </figure>

          <div className="rev-side">
            {REVIEWS.side.map((r, i) => (
              <figure key={r.name} data-reveal style={{ "--d": `${120 + i * 90}ms` } as React.CSSProperties}>
                <p className="q-sm">{r.quote}</p>
                <figcaption className="byline">
                  <b>{r.name}</b>
                  <a className="wlink" href={BUSINESS.maps} rel="nofollow noopener" target="_blank">Google review</a>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="rev-agg" data-reveal>
            <span className="price-n">{BUSINESS.rating}</span>
            <div>
              <p className="mono">Out of 5 &middot; {BUSINESS.reviewCount}+ reviews on Tripadvisor</p>
              <div style={{ marginTop: ".75rem" }}>
                <TLink href={BUSINESS.tripadvisor} up>{REVIEWS.footCta}</TLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
