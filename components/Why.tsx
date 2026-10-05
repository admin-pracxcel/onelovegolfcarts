import Image from "next/image";
import { Icon } from "./Icon";
import { WHY } from "@/lib/content";

/**
 * Three reasons as equal columns, then the fleet as a full-width band.
 *
 * The photo used to be a fourth cell in a 2x2 grid. It was the only
 * bottom-anchored cell among three top-anchored ones and it set the row
 * height, which left the shortest text cell with a large orphan void and
 * meant nothing in the grid aligned. Pulling it into its own band fixes both
 * and gives a lineup photograph the lineup-shaped frame it wants.
 */
export function Why() {
  const { band } = WHY;
  return (
    <section className="bg-paper">
      <div className="shell">
        <div className="s-head">
          <h2 className="h2" data-reveal>
            {WHY.headline} <span className="mute">{WHY.headlineMuted}</span>
          </h2>
        </div>

        <div className="why">
          {WHY.cells.map((cell, i) => (
            <div
              className={`cell cell-${cell.tone}`}
              key={cell.title}
              data-reveal
              style={{ "--d": `${i * 80}ms` } as React.CSSProperties}
            >
              {cell.icon && (
                <span className="cell-icon">
                  <Icon name={cell.icon} className="ico ico-l" />
                </span>
              )}
              <div className="cell-text">
                <h3 className="h3">{cell.title}</h3>
                <p>{cell.body}</p>
              </div>
            </div>
          ))}

          <div className="why-band" data-reveal style={{ "--d": "240ms" } as React.CSSProperties}>
            <div className="why-band-copy">
              <h3 className="h3">{band.title}</h3>
              <p>{band.body}</p>
            </div>
            <div className="why-band-media">
              <Image
                src={`${band.media.src}.jpg`}
                width={band.media.width}
                height={band.media.height}
                alt={band.media.alt}
                sizes="(max-width: 899px) 100vw, 62vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
