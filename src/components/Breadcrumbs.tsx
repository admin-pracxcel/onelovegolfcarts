import Link from 'next/link';

/** Visible breadcrumb trail (pair with breadcrumbSchema() for JSON-LD). `trail` excludes Home. */
export function Breadcrumbs({ trail }: { trail: { name: string; path: string }[] }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        <li>
          <Link href="/" prefetch={false}>
            Home
          </Link>
        </li>
        {trail.map((c, i) => (
          <li key={c.path}>
            {i === trail.length - 1 ? (
              <span aria-current="page">{c.name}</span>
            ) : (
              <Link href={c.path} prefetch={false}>
                {c.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
