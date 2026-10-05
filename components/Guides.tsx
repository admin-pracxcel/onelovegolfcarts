import Image from "next/image";
import { SiteLink } from "./SiteLink";
import { GUIDES } from "@/lib/content";

/**
 * A travel feature, not a card grid. Four entries, four different aspect
 * ratios, offset from each other and two of them bleeding off the page edge.
 * Ratios are preserved on mobile so the asymmetry survives the stack.
 */
const SLOT = ["g-a", "g-b", "g-c", "g-d"];
const META = ["Secret Beach · 25 min north", "Island-wide · 3 stations",
              "San Pedro Town", "Island-wide · 20 stops"];

export function Guides() {
  return (
    <section className="on-paper s-loose">
      <div className="shell">
        <div className="s-head">
          <h2 className="h2" data-reveal>
            {GUIDES.headline} <span className="mute">{GUIDES.headlineMuted}</span>
          </h2>
        </div>
      </div>
      <div className="shell guides">
        {GUIDES.cards.map((c, i) => (
          <SiteLink key={c.slot} href={c.href} className={`g ${SLOT[i]}`}
                    data-reveal style={{ "--d": `${i * 90}ms` } as React.CSSProperties}>
            <div className="g-media" data-scale>
              <Image src={`${(c.media?.src) ?? "/img/golf-cart-parked-beach-palms-ambergris-caye"}.jpg`}
                     width={c.media?.width ?? 1000} height={c.media?.height ?? 667}
                     alt={c.media?.alt ?? ""} sizes="(max-width: 899px) 100vw, 45vw" />
            </div>
            <div className="g-body">
              <p className="mono">{META[i]}</p>
              <h3 className="g-title">{c.title}</h3>
              <p>{c.body}</p>
            </div>
          </SiteLink>
        ))}
      </div>
    </section>
  );
}
