import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { PageHeader } from '@/components/PageHeader';
import { Picture } from '@/components/Picture';
import { RichText } from '@/components/RichText';
import { SectionNav } from '@/components/SectionNav';
import { Faq } from '@/components/sections/Faq';
import { FinalCta } from '@/components/sections/FinalCta';
import { business, urls, type UrlKey } from '@/lib/business';
import { imageInfo } from '@/lib/images';
import {
  booking,
  driving,
  facts,
  family,
  faq,
  faqTitle,
  intro,
  meta,
  moneyLinks,
  places,
  routes,
  safety,
  taxi,
  uses,
  week,
  zones,
} from '@/lib/pages/ambergris-caye';
import { ambergrisSchema, jsonLd } from '@/lib/schema';
import '@/styles/ambergris.css';

const TRAIL = [{ name: 'Ambergris Caye', path: '/ambergris-caye/' }];

export const metadata: Metadata = {
  title: { absolute: meta.title },
  description: meta.description,
  alternates: { canonical: '/ambergris-caye/', languages: { 'en-US': '/ambergris-caye/', 'x-default': '/ambergris-caye/' } },
  openGraph: {
    type: 'article',
    siteName: business.name,
    title: meta.title,
    description: meta.description,
    url: '/ambergris-caye/',
    locale: 'en_US',
    images: [{ url: imageInfo('maroon-6-seater-golf-cart-beachfront-park').src, alt: 'A One Love golf cart by the beachfront park in San Pedro, Ambergris Caye' }],
  },
  twitter: { card: 'summary_large_image' },
};

const NAV = [
  { id: 'driving', label: 'Driving' },
  { id: 'where', label: 'Where to go' },
  { id: 'routes', label: 'Routes' },
  { id: 'taxi', label: 'Cart vs taxi' },
  { id: 'zones', label: 'Delivery zones' },
  { id: 'book', label: 'Booking' },
  { id: 'roads', label: 'Roads' },
  { id: 'faq', label: 'FAQ' },
];

const to = (key: string) => urls[key as UrlKey];

export default function AmbergrisCayePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(ambergrisSchema(meta.title, meta.description, faq))} />
      <main id="main" className="ac-page">
        <PageHeader trail={TRAIL} eyebrow="Island guide" title={meta.h1} lead={intro}>
          <div className="container">
            <div className="page-header__media ac-hero" data-reveal="clip">
              <Picture
                name="maroon-6-seater-golf-cart-beachfront-park"
                alt="Maroon One Love 6-seater golf cart parked by the colourful beachfront park in San Pedro, Ambergris Caye, with the Caribbean behind"
                sizes="(min-width: 1360px) 1320px, 92vw"
                priority
              />
            </div>
            <ul className="ac-facts" aria-label="Ambergris Caye at a glance">
              {facts.map((f) => (
                <li key={f.value} data-reveal="">
                  <strong>{f.value}</strong>
                  <span>{f.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </PageHeader>

        <SectionNav label="On this page" items={NAV} cta={{ href: urls.book, label: 'Reserve' }} />

        {/* Driving */}
        <section id="driving" className="ac-section section" aria-labelledby="driving-title">
          <div className="container ac-split">
            <div className="ac-prose">
              <p className="eyebrow" data-reveal="">
                On the road
              </p>
              <h2 id="driving-title" className="h2" data-reveal="">
                {driving.h2}
              </h2>
              {driving.paragraphs.map((p) => (
                <p key={p.slice(0, 20)} data-reveal="">
                  {p}
                </p>
              ))}
              <Link className="link-arrow" href={to(driving.more.key)} prefetch={false} data-reveal="">
                {driving.more.text.charAt(0).toUpperCase() + driving.more.text.slice(1)} <Icon name="arrow" />
              </Link>
            </div>
            <aside className="streets" aria-label="San Pedro Town's three main streets" data-reveal="">
              <p className="streets__title">San Pedro Town&apos;s three main streets</p>
              <ul>
                {driving.streets.map((s) => (
                  <li key={s.local} className={`street street--${s.dir}`}>
                    <span className="street__arrow" aria-hidden="true">
                      {s.dir === 'both' ? <Icon name="chevron" /> : <Icon name="arrow" />}
                      {s.dir === 'both' && <Icon name="chevron" />}
                    </span>
                    <span className="street__names">
                      <strong>{s.local}</strong>
                      <span>{s.formal}</span>
                    </span>
                    <span className="street__flow">{s.flow}</span>
                  </li>
                ))}
              </ul>
              <div className="streets__photo">
                <Picture
                  name="gallery-red-4-seater-golf-cart-san-pedro-street"
                  alt="Red golf cart parked on a narrow paved street in San Pedro Town"
                  sizes="(min-width: 1000px) 34vw, 90vw"
                />
              </div>
            </aside>
          </div>
        </section>

        {/* Local family business */}
        <section className="ac-family" aria-labelledby="family-title">
          <div className="container ac-family__inner">
            <div className="ac-family__media" data-reveal="clip">
              <Picture
                name="green-golf-cart-san-pedro-central-park"
                alt="Green One Love golf cart parked beside Central Park in San Pedro Town"
                sizes="(min-width: 1000px) 40vw, 100vw"
              />
            </div>
            <div className="ac-family__body">
              <h2 id="family-title" className="h2" data-reveal="">
                {family.h2}
              </h2>
              <p data-reveal="">
                <RichText text={family.body} />
              </p>
            </div>
          </div>
        </section>

        {/* Where a cart takes you */}
        <section id="where" className="ac-section section" aria-labelledby="where-title">
          <div className="container">
            <div className="section-head ac-head">
              <p className="eyebrow" data-reveal="">
                Where to go
              </p>
              <h2 id="where-title" className="h2" data-reveal="">
                {places.h2}
              </h2>
              <p className="ac-head__body" data-reveal="">
                {places.body}
              </p>
            </div>
            <div className="areas">
              {places.areas.map((a, i) => (
                <div key={a.name} className={`area area--${i + 1}`} data-reveal="">
                  <h3 className="area__name">{a.name}</h3>
                  <ul>
                    {a.stops.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <ul className="ac-links" aria-label="Guides">
              {places.more.map((m) => (
                <li key={m.key}>
                  <Link href={to(m.key)} prefetch={false}>
                    {m.text.charAt(0).toUpperCase() + m.text.slice(1)} <Icon name="arrow" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Popular routes */}
        <section id="routes" className="routes section section--dark" aria-labelledby="routes-title">
          <div className="container">
            <p className="eyebrow eyebrow--light" data-reveal="">
              Plan a drive
            </p>
            <h2 id="routes-title" className="h2" data-reveal="">
              {routes.h2}
            </h2>
            <ol className="routes__grid">
              {routes.cards.map((r, i) => (
                <li key={r.title} className="route" data-reveal="">
                  <span className="route__num" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="route__title">{r.title}</h3>
                  <p>{r.body}</p>
                  <Link className="link-arrow link-arrow--light" href={to(r.key)} prefetch={false}>
                    {r.link.charAt(0).toUpperCase() + r.link.slice(1)} <Icon name="arrow" />
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Taxi vs cart */}
        <section id="taxi" className="ac-section section" aria-labelledby="taxi-title">
          <div className="container ac-split ac-split--flip">
            <div className="ac-prose">
              <p className="eyebrow" data-reveal="">
                Do the math
              </p>
              <h2 id="taxi-title" className="h2" data-reveal="">
                {taxi.h2}
              </h2>
              {taxi.paragraphs.map((p) => (
                <p key={p.slice(0, 20)} data-reveal="">
                  {p}
                </p>
              ))}
            </div>
            <div className="versus" data-reveal="">
              {taxi.compare.map((c) => (
                <div key={c.label} className={`versus__row${c.highlight ? ' is-cart' : ''}`}>
                  <p className="versus__label">{c.label}</p>
                  <p className="versus__value">{c.value}</p>
                  <p className="versus__note">{c.note}</p>
                </div>
              ))}
              <Link className="link-arrow" href={to(moneyLinks[0].key)} prefetch={false}>
                {moneyLinks[0].text.charAt(0).toUpperCase() + moneyLinks[0].text.slice(1)} <Icon name="arrow" />
              </Link>
            </div>
          </div>
        </section>

        {/* Use cases */}
        <section className="ac-section ac-uses" aria-labelledby="uses-title">
          <div className="container">
            <h2 id="uses-title" className="h2 ac-uses__title" data-reveal="">
              {uses.h2}
            </h2>
            <div className="uses__grid">
              {uses.items.map((u) => (
                <article key={u.title} className="use" data-reveal="">
                  <h3 className="use__title">{u.title.replace(/\.$/, '')}</h3>
                  <p>{u.body}</p>
                </article>
              ))}
              <div className="use use--cta" data-reveal="">
                <div className="use__photo">
                  <Picture
                    name="gallery-golf-cart-line-up-turquoise-house"
                    alt="Red, yellow, camouflage, pink and white One Love golf carts lined up in front of a turquoise house"
                    sizes="(min-width: 1100px) 30vw, (min-width: 760px) 45vw, 90vw"
                  />
                </div>
                <Link className="link-arrow link-arrow--light" href={to(moneyLinks[1].key)} prefetch={false}>
                  {moneyLinks[1].text.charAt(0).toUpperCase() + moneyLinks[1].text.slice(1)} <Icon name="arrow" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Delivery zones */}
        <section id="zones" className="ac-section section" aria-labelledby="zones-title">
          <div className="container">
            <div className="section-head section-head--split">
              <div>
                <p className="eyebrow" data-reveal="">
                  Free delivery
                </p>
                <h2 id="zones-title" className="h2" data-reveal="">
                  {zones.h2}
                </h2>
              </div>
              <p className="section-head__aside" data-reveal="">
                {zones.intro}
              </p>
            </div>
            <div className="table-wrap" data-reveal="">
              <table className="zones-table">
                <caption className="screen-reader-text">Typical golf cart delivery times from the Barrier Reef Drive office</caption>
                <thead>
                  <tr>
                    <th scope="col">Zone</th>
                    <th scope="col">Typical delivery time from office</th>
                    <th scope="col">
                      <span className="screen-reader-text">Details</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {zones.rows.map((z) => (
                    <tr key={z.zone}>
                      <th scope="row">{z.zone}</th>
                      <td data-label="Typical delivery">{z.time}</td>
                      <td>
                        <Link href={to(z.key)} prefetch={false}>
                          {z.link} <Icon name="arrow-ur" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="ac-arrivals" data-reveal="">
              Arriving from the mainland? See{' '}
              <Link href={to(zones.arrivals[0].key)} prefetch={false}>
                {zones.arrivals[0].text}
              </Link>{' '}
              and{' '}
              <Link href={to(zones.arrivals[1].key)} prefetch={false}>
                {zones.arrivals[1].text}
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Booking + roads */}
        <section id="book" className="ac-book" aria-labelledby="book-title">
          <div className="container ac-book__inner" data-reveal="">
            <div>
              <h2 id="book-title" className="h2">
                {booking.h2}
              </h2>
              <p>
                <RichText text={booking.body} />
              </p>
            </div>
            <div className="ac-book__actions">
              <Link className="btn btn--primary btn--lg" href={urls.book} prefetch={false}>
                Reserve a cart for your stay <Icon name="arrow" />
              </Link>
            </div>
          </div>
        </section>

        <section id="roads" className="ac-section section" aria-labelledby="roads-title">
          <div className="container ac-split">
            <div className="ac-prose">
              <p className="eyebrow" data-reveal="">
                Safety
              </p>
              <h2 id="roads-title" className="h2" data-reveal="">
                {safety.h2}
              </h2>
              <p data-reveal="">{safety.body}</p>
            </div>
            <ul className="roads" aria-label="Road conditions by area" data-reveal="">
              {safety.roads.map((r, i) => (
                <li key={r.where} className={`road road--${i + 1}`}>
                  <span className="road__where">{r.where}</span>
                  <span className="road__what">{r.what}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="ac-week" aria-labelledby="week-title">
          <div className="container ac-week__inner">
            <div className="ac-week__figure" data-reveal="" aria-hidden="true">
              <span className="ac-week__big">$25</span>
              <span className="ac-week__small">a day on the weekly 4-seater rate</span>
            </div>
            <div>
              <h2 id="week-title" className="h2" data-reveal="">
                {week.h2}
              </h2>
              <p data-reveal="">{week.body}</p>
            </div>
          </div>
        </section>

        <Faq items={faq} title={faqTitle} />
        <FinalCta ctaLabel="Reserve a cart for your stay" />
      </main>
    </>
  );
}
