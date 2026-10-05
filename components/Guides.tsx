import { SiteLink } from "./SiteLink";
import Image from "next/image";
import { Icon } from "./Icon";
import { ArrowLink } from "./ArrowLink";
import { GUIDES } from "@/lib/content";

export function Guides() {
  return (
    <section className="bg-paper">
      <div className="shell">
        <div className="s-head">
          <h2 className="h2" data-reveal>
            {GUIDES.headline} <span className="mute">{GUIDES.headlineMuted}</span>
          </h2>
        </div>

        <div className="guides">
          {GUIDES.cards.map((card, i) => (
            <SiteLink
              className={`g g-${card.tone} g-${card.slot}`}
              href={card.href}
              key={card.slot}
              data-reveal
              style={{ "--d": `${i * 85}ms` } as React.CSSProperties}
            >
              {card.media && (
                <Image
                  src={`${card.media.src}.jpg`}
                  width={card.media.width}
                  height={card.media.height}
                  alt={card.media.alt}
                  sizes="(max-width: 919px) 100vw, 58vw"
                />
              )}
              {card.icon && (
                <span className="g-mark"><Icon name={card.icon} /></span>
              )}
              <h3 className="h3">{card.title}</h3>
              <p>{card.body}</p>
              {/* the whole card is the anchor, so this is affordance only */}
              <ArrowLink as="span">{card.cta}</ArrowLink>
            </SiteLink>
          ))}
        </div>
      </div>
    </section>
  );
}
