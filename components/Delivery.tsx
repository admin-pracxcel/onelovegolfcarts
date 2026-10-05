import { SiteLink } from "./SiteLink";
import Image from "next/image";
import { Icon } from "./Icon";
import { DELIVERY } from "@/lib/content";

/** Numbered editorial rows rather than a card grid: denser and scannable. */
export function Delivery() {
  return (
    <section className="bg-paper-2" id="delivery">
      <div className="shell">
        <div className="deliver-top">
          <div>
            <p className="mono eyebrow" data-reveal>{DELIVERY.eyebrow}</p>
            <h2 className="h2" data-reveal style={{ "--d": "60ms" } as React.CSSProperties}>
              {DELIVERY.headline}
            </h2>
            <p className="small measure" style={{ marginTop: "1.25rem" }} data-reveal>
              {DELIVERY.intro}
            </p>
          </div>
          <div className="deliver-photo" data-reveal style={{ "--d": "140ms" } as React.CSSProperties}>
            <Image
              src={`${DELIVERY.photo.src}.jpg`}
              width={DELIVERY.photo.width}
              height={DELIVERY.photo.height}
              alt={DELIVERY.photo.alt}
              sizes="(max-width: 959px) 100vw, 38vw"
            />
          </div>
        </div>

        <div className="zones" data-reveal>
          {DELIVERY.zones.map((zone, i) => {
            const body = (
              <>
                <span className="zone-n">{String(i + 1).padStart(2, "0")}</span>
                <span className="zone-main">
                  <span className="h3">{zone.title}</span>
                  <span><p>{zone.body}</p></span>
                  <span className="zone-meta">
                    <span className="chip">{zone.time}</span>
                    {zone.href && (
                      <span className="knob"><Icon name="arrow-right-bold" /></span>
                    )}
                  </span>
                </span>
              </>
            );
            return zone.href ? (
              <SiteLink className="zone" href={zone.href} key={zone.title}>{body}</SiteLink>
            ) : (
              <div className="zone" key={zone.title}>{body}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
