import Link from 'next/link';
import { urls } from '@/lib/business';

export function NotFoundBody() {
  return (
    <main id="main" className="page-default">
      <div className="container prose">
        <h1 className="h1">We couldn&apos;t find that page.</h1>
        <p>It may have moved, or the address may have a typo.</p>
        <p>
          <Link className="btn btn--primary" href="/">
            Back to the homepage
          </Link>{' '}
          <Link className="btn btn--outline" href={urls.book} prefetch={false}>
            Book a cart
          </Link>
        </p>
      </div>
    </main>
  );
}
