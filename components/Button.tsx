import { SiteLink } from "./SiteLink";
import { Icon } from "./Icon";
import type { IconName } from "./IconSprite";

type Tone = "primary" | "ink" | "paper" | "line" | "glass";
type Size = "sm" | "md" | "lg";

/**
 * The pill button. `knob` renders the inset circular arrow badge; omit it for
 * the quieter outline and glass variants, which read better without one.
 */
export function Button({
  href, tone = "primary", size = "md", knob = true, icon, external, children, className = "", type,
}: {
  href?: string;
  tone?: Tone;
  size?: Size;
  knob?: boolean;
  icon?: IconName;
  external?: boolean;
  children: React.ReactNode;
  className?: string;
  type?: "submit" | "button";
}) {
  const cls = [
    "btn",
    `btn-${tone}`,
    size !== "md" ? `btn-${size}` : "",
    className,
  ].filter(Boolean).join(" ");

  const inner = (
    <>
      {icon && <Icon name={icon} />}
      {children}
      {knob && (
        <span className="knob">
          <Icon name="arrow-right-bold" />
        </span>
      )}
    </>
  );

  if (!href) {
    return <button className={cls} type={type ?? "button"}>{inner}</button>;
  }
  if (external) {
    return (
      <a className={cls} href={href} rel="noopener" target="_blank">{inner}</a>
    );
  }
  return <SiteLink className={cls} href={href}>{inner}</SiteLink>;
}
