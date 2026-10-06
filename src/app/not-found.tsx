import Link from 'next/link';
import { urls } from '@/lib/business';

export default function NotFound() {
  return (
    <main id="main" className="page-default">
      <div className="container prose">
        <h1 className="h1">This page is still on its way.</h1>
        <p>We are rebuilding the One Love website. The homepage is ready; the rest of the island is coming soon.</p>
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
