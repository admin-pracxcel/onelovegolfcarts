import type { Metadata } from 'next';
import Link from 'next/link';
import { BookingForm } from '@/components/BookingForm';
import { Icon } from '@/components/Icon';
import { PageHeader } from '@/components/PageHeader';
import { RichText } from '@/components/RichText';
import { Faq } from '@/components/sections/Faq';
import { BOOKING_MESSAGE, business, urls, whatsappUrl } from '@/lib/business';
import { bring, cancellation, faq, intro, links, meta, steps, trust } from '@/lib/pages/book';
import { jsonLd, utilitySchema } from '@/lib/schema';
import '@/styles/location.css';
import '@/styles/book.css';

const PATH = '/book-now/';

export const metadata: Metadata = {
  title: { absolute: meta.title },
  description: meta.description,
  alternates: { canonical: PATH, languages: { 'en-US': PATH, 'x-default': PATH } },
  openGraph: { type: 'website', siteName: business.name, title: meta.title, description: meta.description, url: PATH, locale: 'en_US' },
  twitter: { card: 'summary_large_image' },
};

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function BookNowPage() {
  const schema = utilitySchema({ path: PATH, crumb: 'Book Now', title: meta.h1, description: meta.description, faq });
  const r4 = business.rates['4-seater'];
  const r6 = business.rates['6-seater'];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <main id="main" className="loc-page book-page">
        <PageHeader trail={[{ name: 'Book Now', path: PATH }]} eyebrow="Reservations" title={meta.h1} lead={intro}>
          <div className="container">
            <ul className="book-trust" aria-label="Why book with us">
              {trust.map((t) => (
                <li key={t}>
                  <Icon name="check" /> {t}
                </li>
              ))}
            </ul>
            <ol className="book-steps" aria-label="How booking works">
              {steps.map((s, i) => (
                <li key={s.title}>
                  <span className="book-steps__num" aria-hidden="true">
                    {i + 1}
                  </span>
                  <strong>{s.title}</strong>
                  <span>{s.body}</span>
                </li>
              ))}
            </ol>
          </div>
        </PageHeader>

        <section id="form" className="section book-main" aria-labelledby="form-title">
          <div className="container book-main__grid">
            <div className="form-card">
              <h2 id="form-title" className="book-main__title">
                Golf cart reservation form
              </h2>
              <BookingForm />
            </div>
            <aside className="book-aside" aria-label="Before you book">
              <div className="book-aside__card book-aside__card--dark">
                <p className="book-aside__kicker">Prefer WhatsApp?</p>
                <p className="book-aside__line">Send us your dates and where you are staying.</p>
                <a className="btn btn--primary" href={whatsappUrl(BOOKING_MESSAGE)}>
                  <Icon name="chat" /> WhatsApp {business.phone}
                </a>
              </div>
              <div className="book-aside__card">
                <p className="book-aside__kicker">Rates</p>
                <dl className="book-rates">
                  <div>
                    <dt>4-Seater</dt>
                    <dd>
                      ${r4.day}/day · ${r4.week}/week
                    </dd>
                  </div>
                  <div>
                    <dt>6-Seater</dt>
                    <dd>
                      ${r6.day}/day · ${r6.week}/week
                    </dd>
                  </div>
                </dl>
                <ul className="book-aside__links">
                  <li>
                    <Link href={urls.rates} prefetch={false}>
                      {cap(links.rates)} <Icon name="arrow" />
                    </Link>
                  </li>
                  <li>
                    <Link href={urls.carts} prefetch={false}>
                      {cap(links.carts)} <Icon name="arrow" />
                    </Link>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </section>

        <section className="loc-section section loc-tight" aria-label="What to bring and cancellation">
          <div className="container book-info">
            <div>
              <h2 className="h2 book-info__title">{bring.h2}</h2>
              <ul className="checklist book-info__list">
                {bring.items.map((b) => (
                  <li key={b}>
                    <span aria-hidden="true">
                      <Icon name="check" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
              <p className="book-info__note">Nothing else. We handle the walk-around, the paperwork, and the keys at hand-off.</p>
            </div>
            <div>
              <h2 className="h2 book-info__title">{cancellation.h2}</h2>
              <p className="book-info__body">
                <RichText text={cancellation.body} />
              </p>
            </div>
          </div>
        </section>

        <Faq items={faq} title="Booking questions" />

        <section className="loc-section book-links" aria-label="More before you book">
          <div className="container">
            <ul className="loc-links">
              <li>
                <Link href={urls.terms} prefetch={false}>
                  {cap(links.terms)} <Icon name="arrow" />
                </Link>
              </li>
              <li>
                <Link href={urls.pay} prefetch={false}>
                  {cap(links.pay)} <Icon name="arrow" />
                </Link>
              </li>
              <li>
                <Link href={urls.contact} prefetch={false}>
                  {cap(links.contact)} <Icon name="arrow" />
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
