import { SiteLink } from "./SiteLink";
import { Icon } from "./Icon";

/**
 * Text link with a circular arrow. `as="span"` is for when the whole card is
 * already the anchor, so this is only the visual affordance.
 */
export function ArrowLink({
  href, children, up = false, as = "a",
}: {
  href?: string;
  children: React.ReactNode;
  up?: boolean;
  as?: "a" | "span";
}) {
  const inner = (
    <>
      {children}
      <span className="knob">
        <Icon name={up ? "arrow-up-right-bold" : "arrow-right-bold"} />
      </span>
    </>
  );
  if (as === "span" || !href) return <span className="alink">{inner}</span>;
  const ext = href.startsWith("http");
  return ext ? (
    <a className="alink" href={href} rel="nofollow noopener" target="_blank">{inner}</a>
  ) : (
    <SiteLink className="alink" href={href}>{inner}</SiteLink>
  );
}
