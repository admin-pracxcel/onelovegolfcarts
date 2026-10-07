import Link from 'next/link';
import { Icon } from '@/components/Icon';

/** Numbered pagination for post lists. */
export function Pagination({ page, pages, href }: { page: number; pages: number; href: (p: number) => string }) {
  if (pages <= 1) return null;
  return (
    <nav className="pagination" aria-label="Pages">
      {page > 1 && (
        <Link href={href(page - 1)} rel="prev" className="pagination__step" prefetch={false}>
          <Icon name="arrow" /> Newer
        </Link>
      )}
      <ol>
        {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
          <li key={p}>
            {p === page ? (
              <span aria-current="page">{p}</span>
            ) : (
              <Link href={href(p)} prefetch={false}>
                {p}
              </Link>
            )}
          </li>
        ))}
      </ol>
      {page < pages && (
        <Link href={href(page + 1)} rel="next" className="pagination__step" prefetch={false}>
          Older <Icon name="arrow" />
        </Link>
      )}
    </nav>
  );
}
