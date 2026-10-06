import Link from 'next/link';
import { business, urls, type UrlKey } from '@/lib/business';

/**
 * Renders copy containing inline links written as [[anchor text|urlKey]],
 * mirroring the Execution Manual's "[link: …]" notation. Keeps paste-ready
 * copy as plain strings while the anchors stay exactly as specified.
 * The phone number is kept on one line.
 */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/(\[\[[^\]]+\]\])/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\[\[([^|\]]+)\|([^\]]+)\]\]$/);
        if (m) {
          const href = m[2] in urls ? urls[m[2] as UrlKey] : m[2];
          return (
            <Link key={i} href={href} prefetch={false}>
              {m[1]}
            </Link>
          );
        }
        return part.split(business.phone).map((chunk, j, arr) => (
          <span key={`${i}-${j}`}>
            {chunk}
            {j < arr.length - 1 && <span className="nowrap">{business.phone}</span>}
          </span>
        ));
      })}
    </>
  );
}
