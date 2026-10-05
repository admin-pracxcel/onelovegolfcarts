"use client";
import { useEffect, useRef, useState } from "react";
import { ISLAND, WAYPOINTS } from "@/lib/island";
import { DELIVERY } from "@/lib/content";
import { SiteLink } from "./SiteLink";

/**
 * Ambergris Caye, drawn from real OpenStreetMap coastline.
 *
 * Two landmasses, because that is what the island actually is: the Boca del
 * Rio channel separates San Pedro from north Ambergris, and the Sir Barry
 * Bowen Bridge crosses it. Drawing that honestly is also what makes
 * "unlimited bridge passes" legible as a product feature rather than a claim.
 *
 * Every waypoint was checked point-in-polygon against the real coastline so
 * nothing floats in the sea. The bridge is the one exception and is drawn as
 * a crossing, because it is over water.
 *
 * The active waypoint is driven by IntersectionObserver on the zone list, not
 * by a scroll handler, and nothing is scroll-jacked: the section scrolls
 * normally and the map is simply sticky beside it.
 */
export function IslandMap() {
  const [active, setActive] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rows = listRef.current?.querySelectorAll<HTMLElement>("[data-zone]");
    if (!rows?.length || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (vis) setActive((vis.target as HTMLElement).dataset.zone ?? null);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    rows.forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, []);

  const stops = WAYPOINTS.filter((w) => w.kind === "stop");
  const bridge = WAYPOINTS.find((w) => w.kind === "bridge")!;

  return (
    <section className="on-navy s-loose map-sec" id="delivery">
      <div className="shell map-grid">
        <div className="map-text">
          <p className="mono" data-reveal>{DELIVERY.eyebrow}</p>
          <h2 className="h2" data-reveal style={{ "--d": "60ms" } as React.CSSProperties}>
            {DELIVERY.headline}
          </h2>
          <p className="small measure" style={{ marginTop: "1.25rem" }} data-reveal>
            {DELIVERY.intro}
          </p>

          <div className="zone-list" ref={listRef} style={{ marginTop: "clamp(2rem,4vw,3rem)" }}>
            {stops.map((w) => {
              const zone = DELIVERY.zones.find((z) =>
                z.title.toLowerCase().includes(w.key),
              );
              const inner = (
                <>
                  <span className="zone-t">{w.label}</span>
                  <span className="mono zone-time">{w.time}</span>
                  {zone?.body && <span className="zone-d">{zone.body}</span>}
                </>
              );
              return zone?.href ? (
                <SiteLink key={w.key} href={zone.href} className="zone" data-zone={w.key}>
                  {inner}
                </SiteLink>
              ) : (
                <div key={w.key} className="zone" data-zone={w.key}>{inner}</div>
              );
            })}
          </div>
        </div>

        <figure className="map-figure" data-draw>
          <svg
            viewBox={ISLAND.viewBox}
            role="img"
            aria-label="Map of Ambergris Caye showing One Love golf cart delivery zones from San Pedro Airport north to Secret Beach."
          >
            {ISLAND.cayes.map((d, i) => <path key={i} className="isle-caye" d={d} />)}
            <path className="isle" d={ISLAND.north} />
            <path className="isle" d={ISLAND.south} />
            <path className="isle-route" d={ISLAND.route} />
            {/* the bridge is drawn as a crossing, not a land pin */}
            <line
              className="isle-bridge"
              x1={bridge.x - 24} y1={bridge.y + 14}
              x2={bridge.x + 24} y2={bridge.y - 14}
            />
            {stops.map((w) => (
              <circle
                key={w.key} cx={w.x} cy={w.y} r={10}
                className={`isle-stop${active === w.key ? " is-active" : ""}`}
              />
            ))}
          </svg>
          <p className="mono" style={{ marginTop: "1rem" }}>
            Coastline traced from OpenStreetMap &middot; north is{" "}
            {Math.abs(ISLAND.northDeg).toFixed(0)}&deg; from vertical
          </p>
        </figure>
      </div>
    </section>
  );
}
