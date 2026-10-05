import Link from "next/link";

/**
 * Internal links point at the full site's URL structure, but this app only
 * serves the routes listed below while the rest of the pages are built.
 *
 * next/link prefetches every in-viewport link, so routing an unbuilt URL
 * through it produces a 404 prefetch and a console error on every page view.
 * Anything not in IMPLEMENTED falls back to a plain anchor: same href, no
 * prefetch, no noise. Add a route here when its page lands.
 */
const IMPLEMENTED = new Set<string>(["/"]);

export function SiteLink({
  href, className, children, ...rest
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const external = /^https?:|^tel:|^mailto:/.test(href);
  const path = href.split(/[?#]/)[0];

  if (external) {
    return (
      <a href={href} className={className} rel="noopener" target="_blank" {...rest}>
        {children}
      </a>
    );
  }
  if (!IMPLEMENTED.has(path)) {
    return <a href={href} className={className} {...rest}>{children}</a>;
  }
  return <Link href={href} className={className} {...rest}>{children}</Link>;
}
