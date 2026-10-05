import { Stars } from "./Stars";
import { ArrowLink } from "./ArrowLink";
import { BUSINESS, REVIEWS } from "@/lib/content";

function Byline({ name }: { name: string }) {
  return (
    <figcaption className="byline">
      <b>{name}</b>
      <a href={BUSINESS.maps} rel="nofollow noopener" target="_blank">Google review</a>
    </figcaption>
  );
}

export function Reviews() {
  return (
    <section className="bg-paper-2" id="reviews">
      <div className="shell">
        <div className="s-head">
          <h2 className="h2" data-reveal>
            {REVIEWS.headline} <span className="mute">{REVIEWS.headlineMuted}</span>
          </h2>
        </div>

        <div className="quotes">
          <figure className="q-feat on-dark" data-reveal>
            <div>
              <div style={{ marginBottom: "1.5rem" }}><Stars /></div>
              <blockquote>{REVIEWS.featured.quote}</blockquote>
            </div>
            <Byline name={REVIEWS.featured.name} />
          </figure>

          <div className="q-side">
            {REVIEWS.side.map((r, i) => (
              <figure
                className="q"
                key={r.name}
                data-reveal
                style={{ "--d": `${100 + i * 80}ms` } as React.CSSProperties}
              >
                <Stars />
                <blockquote>{r.quote}</blockquote>
                <Byline name={r.name} />
              </figure>
            ))}
          </div>
        </div>

        <p className="q-foot" data-reveal>
          <span className="small" style={{ color: "var(--ink-3)" }}>{REVIEWS.footLine}</span>
          <ArrowLink href={BUSINESS.tripadvisor} up>{REVIEWS.footCta}</ArrowLink>
        </p>
      </div>
    </section>
  );
}
