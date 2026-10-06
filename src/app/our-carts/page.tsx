import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { PageHeader } from '@/components/PageHeader';
import { Picture } from '@/components/Picture';
import { RichText } from '@/components/RichText';
import { SectionNav } from '@/components/SectionNav';
import { BOOKING_MESSAGE, business, urls, whatsappUrl } from '@/lib/business';
import { imageInfo } from '@/lib/images';
import { booking, cartDetails, compare, intro, maintenance, meta, specs } from '@/lib/pages/our-carts';
import { cartsSchema, jsonLd } from '@/lib/schema';
import '@/styles/our-carts.css';

const TRAIL = [{ name: 'Our Carts', path: '/our-carts/' }];

export const metadata: Metadata = {
  title: { absolute: meta.title },
  description: meta.description,
  alternates: { canonical: '/our-carts/', languages: { 'en-US': '/our-carts/', 'x-default': '/our-carts/' } },
  openGraph: {
    type: 'website',
    siteName: business.name,
    title: meta.title,
    description: meta.description,
    url: '/our-carts/',
    locale: 'en_US',
    images: [{ url: imageInfo('golf-cart-fleet-lineup-lot').src, alt: 'A line-up of One Love golf carts in San Pedro, Belize' }],
  },
  twitter: { card: 'summary_large_image' },
};

const NAV = [
  { id: '4-seater', label: '4-Seater' },
  { id: '6-seater', label: '6-Seater' },
  { id: 'compare', label: 'Compare' },
  { id: 'specs', label: 'Specs' },
  { id: 'book', label: 'How to book' },
];

export default function OurCartsPage() {
  const schema = cartsSchema(
    cartDetails.map((c) => ({
      id: c.id,
      name: c.h2,
      description: c.paragraphs[0],
      image: imageInfo(c.images.main).src,
      usd: c.usd,
    })),
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <main id="main" className="carts-page">
        <PageHeader trail={TRAIL} eyebrow="The fleet" title={meta.h1} lead={intro}>
          <div className="container">
            <div className="page-header__media" data-reveal="clip">
              <Picture
                name="golf-cart-fleet-lineup-lot"
                alt="A line-up of One Love golf carts parked at the lot in San Pedro, Ambergris Caye"
                sizes="(min-width: 1360px) 1320px, 92vw"
                priority
              />
              <ul className="fleet-chips">
                {cartDetails.map((c) => (
                  <li key={c.id}>
                    <a href={`#${c.id}`}>
                      <strong>{c.h2.replace(' Club Car', '')}</strong>
                      <span>
                        from ${c.usd.day}
                        <small>/day</small>
                      </span>
                      <Icon name="arrow" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </PageHeader>

        <SectionNav label="On this page" items={NAV} cta={{ href: urls.book, label: 'Reserve' }} />

        {cartDetails.map((c, i) => (
          <section key={c.id} id={c.id} className={`cart-detail section${i % 2 ? ' cart-detail--flip' : ''}`} aria-labelledby={`${c.id}-title`}>
            <div className="container cart-detail__grid">
              <div className="cart-detail__media">
                <div className="cart-detail__main" data-reveal="clip">
                  <Picture name={c.images.main} alt={c.images.mainAlt} sizes="(min-width: 1000px) 55vw, 100vw" />
                </div>
                <div className="cart-detail__inset" data-reveal="">
                  <Picture name={c.images.detail} alt={c.images.detailAlt} sizes="(min-width: 1000px) 22vw, 50vw" />
                </div>
              </div>

              <div className="cart-detail__body">
                <p className="eyebrow" data-reveal="">
                  {c.tagline}
                </p>
                <h2 id={`${c.id}-title`} className="h2" data-reveal="">
                  {c.h2}
                </h2>
                <div className="cart-detail__price" data-reveal="">
                  <dl>
                    <div>
                      <dt>Daily</dt>
                      <dd>
                        ${c.usd.day}
                        <small>BZ${c.bzd.day}</small>
                      </dd>
                    </div>
                    <div>
                      <dt>Weekly</dt>
                      <dd>
                        ${c.usd.week}
                        <small>BZ${c.bzd.week}</small>
                      </dd>
                    </div>
                  </dl>
                  <p className="cart-detail__seats">
                    <span className="seats" aria-hidden="true">
                      {Array.from({ length: c.seats }, (_, n) => (
                        <i key={n} />
                      ))}
                    </span>
                    {c.seats} seats
                  </p>
                </div>
                <div className="cart-detail__copy">
                  {c.paragraphs.map((p) => (
                    <p key={p.slice(0, 24)} data-reveal="">
                      <RichText text={p} />
                    </p>
                  ))}
                </div>
                <div className="cart-detail__actions" data-reveal="">
                  <Link className="btn btn--primary" href={urls.book} prefetch={false}>
                    {c.cta} <Icon name="arrow" />
                  </Link>
                  <a className="link-arrow" href="#specs">
                    Full specifications <Icon name="arrow" />
                  </a>
                </div>
              </div>
            </div>
          </section>
        ))}

        <section id="compare" className="compare section section--dark" aria-labelledby="compare-title">
          <div className="container compare__grid">
            <div>
              <p className="eyebrow eyebrow--light" data-reveal="">
                Compare
              </p>
              <h2 id="compare-title" className="h2" data-reveal="">
                {compare.h2}
              </h2>
              <p className="compare__body" data-reveal="">
                <RichText text={compare.body} />
              </p>
            </div>
            <div className="compare__picks">
              {compare.picks.map((p) => (
                <a key={p.id} className="pick" href={`#${p.id}`} data-reveal="">
                  <span className="pick__title">{p.title}</span>
                  <ul>
                    {p.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                  <Icon name="arrow-ur" />
                </a>
              ))}
              <p className="compare__groups" data-reveal="">
                {compare.groups}
              </p>
            </div>
          </div>
        </section>

        <section id="specs" className="specs section" aria-labelledby="specs-title">
          <div className="container">
            <div className="section-head section-head--split">
              <div>
                <p className="eyebrow" data-reveal="">
                  Side by side
                </p>
                <h2 id="specs-title" className="h2" data-reveal="">
                  Full specifications
                </h2>
              </div>
              <p className="section-head__aside" data-reveal="">
                Rows that differ between the two carts are marked. See the{' '}
                <Link href={urls.rates} prefetch={false}>
                  full daily and weekly rate breakdown
                </Link>{' '}
                for multi-day pricing.
              </p>
            </div>
            <div className="specs__wrap" data-reveal="">
              <table className="specs__table">
                <caption className="screen-reader-text">Specifications of the 4-seater and 6-seater Club Car golf carts</caption>
                <thead>
                  <tr>
                    <th scope="col">Spec</th>
                    <th scope="col">4-Seater</th>
                    <th scope="col">6-Seater</th>
                  </tr>
                </thead>
                <tbody>
                  {specs.map((s) => (
                    <tr key={s.label} className={s.diff ? 'is-diff' : undefined}>
                      <th scope="row">
                        {s.label}
                        {s.diff && <span className="screen-reader-text"> (differs)</span>}
                      </th>
                      <td data-label="4-Seater">{s.four}</td>
                      <td data-label="6-Seater">{s.six}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="upkeep section" aria-labelledby="upkeep-title">
          <div className="container upkeep__grid">
            <div className="upkeep__media" data-reveal="clip">
              <Picture
                name="blue-golf-cart-one-love-lot"
                alt="Blue One Love golf cart parked under the shade structure at the One Love lot in San Pedro"
                sizes="(min-width: 1000px) 45vw, 100vw"
              />
            </div>
            <div className="upkeep__body">
              <p className="eyebrow" data-reveal="">
                Fleet care
              </p>
              <h2 id="upkeep-title" className="h2" data-reveal="">
                {maintenance.h2}
              </h2>
              {maintenance.paragraphs.map((p) => (
                <p key={p.slice(0, 24)} data-reveal="">
                  <RichText text={p} />
                </p>
              ))}
            </div>
          </div>
        </section>

        <section id="book" className="book-paths section" aria-labelledby="book-title">
          <div className="container">
            <div className="section-head section-head--split">
              <div>
                <p className="eyebrow" data-reveal="">
                  Reserve
                </p>
                <h2 id="book-title" className="h2" data-reveal="">
                  {booking.h2}
                </h2>
              </div>
              <p className="section-head__aside" data-reveal="">
                <RichText text={booking.paragraphs[0]} />
              </p>
            </div>

            <div className="book-paths__grid">
              <div className="path" data-reveal="">
                <span className="path__num" aria-hidden="true">
                  1
                </span>
                <h3 className="path__title">Online reservation form</h3>
                <p>Dates, delivery address and cart preference. Confirmed by WhatsApp.</p>
                <Link className="btn btn--primary" href={urls.book} prefetch={false}>
                  Reserve your golf cart <Icon name="arrow" />
                </Link>
              </div>
              <div className="path" data-reveal="">
                <span className="path__num" aria-hidden="true">
                  2
                </span>
                <h3 className="path__title">WhatsApp</h3>
                <p>
                  Same details to <span className="nowrap">{business.phone}</span>, no form.
                </p>
                <a className="btn btn--dark" href={whatsappUrl(BOOKING_MESSAGE)}>
                  <Icon name="chat" /> Message on WhatsApp
                </a>
              </div>
            </div>

            <p className="book-paths__full" data-reveal="">
              <RichText text={booking.paragraphs[1]} />
            </p>

            <ul className="book-paths__related" aria-label="Related">
              {booking.related.map((r) => (
                <li key={r.key}>
                  <Link href={urls[r.key]} prefetch={false}>
                    {r.text} <Icon name="arrow" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
