import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { PageHeader } from '@/components/PageHeader';
import { business, whatsappUrl, newTab } from '@/lib/business';
import '@/styles/thank-you.css';

export type ThankYouContent = { path: string; crumb: string; eyebrow: string; title: string; lead: string };

/** Thank-you pages are where forms land: never indexed, never in the sitemap. */
export function thankYouMetadata(c: ThankYouContent): Metadata {
  return {
    title: c.title,
    alternates: { canonical: c.path },
    robots: { index: false, follow: false },
  };
}

/** Generic confirmation shown after a form is sent (contact, booking, payment). */
export function ThankYou(c: ThankYouContent) {
  return (
    <main id="main" className="thanks-page">
      <PageHeader trail={[{ name: c.crumb, path: c.path }]} eyebrow={c.eyebrow} title={c.title} lead={c.lead} />
      <section className="thanks section" aria-label="What next">
        <div className="container">
          <div className="thanks__card" data-reveal="">
            <span className="thanks__icon" aria-hidden="true">
              <Icon name="check" />
            </span>
            <p className="thanks__text">
              Need us sooner? Message us on WhatsApp or call <a href={business.phoneHref}>{business.phone}</a>. We are open {business.hoursLabel}.
            </p>
            <div className="thanks__actions">
              <Link className="btn btn--primary" href="/" prefetch={false}>
                Back to home <Icon name="arrow" />
              </Link>
              <a className="btn btn--dark" {...newTab} href={whatsappUrl()}>
                <Icon name="chat" /> Message us on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
