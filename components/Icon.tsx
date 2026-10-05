import type { IconName } from "./IconSprite";

/** References a symbol from the inlined sprite. Decorative by default. */
export function Icon({ name, className = "ico" }: { name: IconName; className?: string }) {
  return (
    <svg className={className} aria-hidden="true">
      <use href={`#i-${name}`} />
    </svg>
  );
}
