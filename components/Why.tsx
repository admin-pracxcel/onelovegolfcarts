import Image from "next/image";
import { Icon } from "./Icon";
import { WHY } from "@/lib/content";

export function Why() {
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
              {cell.media && (
                <Image
                  src={`${cell.media.src}.jpg`}
                  width={cell.media.width}
                  height={cell.media.height}
                  alt={cell.media.alt}
                  sizes="(max-width: 879px) 100vw, 42vw"
                />
              )}
              {cell.icon && (
                <span className="cell-icon">
                  <Icon name={cell.icon} className="ico ico-l" />
                </span>
              )}
              <h3 className="h3">{cell.title}</h3>
              <p>{cell.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
