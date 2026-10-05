import { Icon } from "./Icon";
import { SiteLink } from "./SiteLink";
import type { IconName } from "./IconSprite";

/** The only pills on the page. */
export function Btn({
  href, tone = "primary", size, external, icon, children,
}: {
  href?: string; tone?: "primary" | "ink" | "paper" | "line"; size?: "lg" | "sm";
  external?: boolean; icon?: IconName; children: React.ReactNode;
}) {
  const cls = `btn btn-${tone}${size ? ` btn-${size}` : ""}`;
  const inner = <>{icon && <Icon name={icon} />}{children}<Icon name="arrow-right-bold" className="ico ico-arrow" /></>;
  if (external) return <a className={cls} href={href} rel="noopener" target="_blank">{inner}</a>;
  return <SiteLink href={href ?? "#"} className={cls}>{inner}</SiteLink>;
}

/** Text link with a rule that draws left to right. */
export function TLink({ href, children, up }: { href: string; children: React.ReactNode; up?: boolean }) {
  const ext = href.startsWith("http");
  const inner = <>{children}<Icon name={up ? "arrow-up-right-bold" : "arrow-right-bold"} /></>;
  return ext
    ? <a className="tlink" href={href} rel="nofollow noopener" target="_blank">{inner}</a>
    : <SiteLink href={href} className="tlink">{inner}</SiteLink>;
}

/** Small mono wayfinding link. */
export function WLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <SiteLink href={href} className="wlink">{children}<Icon name="arrow-right-bold" className="ico" /></SiteLink>;
}

export function Stars() {
  return (
    <div className="stars" role="img" aria-label="Rated 5 out of 5">
      {Array.from({ length: 5 }, (_, i) => <Icon key={i} name="star-fill" />)}
    </div>
  );
}

/** Oversized numeral. Decorative wherever it duplicates adjacent text. */
export function Num({ children, outline, className = "" }: { children: React.ReactNode; outline?: boolean; className?: string }) {
  return (
    <span className={`num${outline ? " num-outline" : ""} ${className}`} aria-hidden="true">{children}</span>
  );
}
