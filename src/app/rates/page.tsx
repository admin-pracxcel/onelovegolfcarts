import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { NoBreak } from '@/components/NoBreak';
import { PageHeader } from '@/components/PageHeader';
import { Picture } from '@/components/Picture';
import { RichText } from '@/components/RichText';
import { SectionNav } from '@/components/SectionNav';
import { Faq } from '@/components/sections/Faq';
import { FinalCta } from '@/components/sections/FinalCta';
import { business, urls } from '@/lib/business';
import { carts } from '@/lib/content';
import { imageInfo } from '@/lib/images';
import { cartDetails } from '@/lib/pages/our-carts';
import { cardLinks, faq, included, intro, meta, multiDay, notIncluded, policies, rateRows } from '@/lib/pages/rates';
import { jsonLd, ratesSchema } from '@/lib/schema';
import '@/styles/rates.css';

const TRAIL = [{ name: 'Rates', path: '/rates/' }];

export const metadata: Metadata = {
  title: { absolute: meta.title },
  description: meta.description,
  alternates: { canonical: '/rates/', languages: { 'en-US': '/rates/', 'x-default': '/rates/' } },
  openGraph: {
    type: 'website',
    siteName: business.name,
    title: meta.title,
    description: meta.description,
    url: '/rates/',
    locale: 'en_US',
    images: [{ url: imageInfo('one-love-fleet-lineup-under-palms').src, alt: 'Colourful One Love golf carts lined up under palm trees in San Pedro' }],
  },
  twitter: { card: 'summary_large_image' },
};

/** The manual's placeholder for prices not yet set (3 days, 2 weeks, monthly). */
const TBD = '[TBD]';

const NAV = [
  { id: 'rates-table', label: 'Rates' },
  { id: 'included', label: 'Included' },
  { id: 'multi-day', label: 'Multi-day' },
  { id: 'deposit', label: 'Deposit' },
  { id: 'payment', label: 'Payment' },
  { id: 'cancellation', label: 'Cancellation' },
  { id: 'seasons', label: 'Seasons' },
  { id: 'rates-faq', label: 'FAQ' },
];

const money = (n: number) => `$${n}`;

export default function RatesPage() {
  const schema = ratesSchema(
    cartDetails.map((c) => ({ id: c.id, name: c.h2, description: c.paragraphs[0], image: imageInfo(c.images.main).src, usd: c.usd })),
    faq,
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <main id="main" className="rates-page">
        <PageHeader trail={TRAIL} eyebrow="Rates" title={meta.h1} lead={intro}>
          <div className="container rate-cards">
            {rateRows.map((r) => {
              const cart = carts.find((c) => c.id === r.id)!;
              const bar = multiDay.bars.find((b) => b.cart === r.cart)!;
              return (
                <article key={r.id} className="rate-card" aria-labelledby={`card-${r.id}`} data-reveal="">
                  <div className="rate-card__media">
                    <Picture name={cart.image} alt={cart.alt} sizes="(min-width: 1000px) 18vw, 40vw" priority={r.id === '4-seater'} />
                  </div>
                  <div className="rate-card__body">
                    <div className="rate-card__head">
                      <h2 id={`card-${r.id}`} className="rate-card__name">
                        {r.cart}
                      </h2>
                      <span className="seats" aria-label={`${cart.seats} seats`} role="img">
                        {Array.from({ length: cart.seats }, (_, n) => (
                          <i key={n} />
                        ))}
                      </span>
                    </div>
                    <dl className="rate-card__prices">
                      <div>
                        <dt>Per day</dt>
                        <dd>
                          {money(r.usd.day)}
                          <small>BZ{money(r.bzd.day)}</small>
                        </dd>
                      </div>
                      <div>
                        <dt>Per week</dt>
                        <dd>
                          {money(r.usd.week)}
                          <small>BZ{money(r.bzd.week)}</small>
                        </dd>
                      </div>
                    </dl>
                    <p className="rate-card__note">
                      Weekly works out to <strong>{money(bar.weeklyPerDay)} a day</strong>, {bar.saving} less than daily.
                    </p>
                    <div className="rate-card__actions">
                      <Link className="btn btn--primary btn--sm" href={urls.book} prefetch={false}>
                        Reserve at these rates <Icon name="arrow" />
                      </Link>
                      <Link className="link-arrow" href={urls[r.id]} prefetch={false}>
                        {cardLinks[r.id]} <Icon name="arrow" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
            <aside className="rate-card rate-card--month" aria-label="Monthly rentals" data-reveal="">
              <p className="eyebrow eyebrow--light">Long stay</p>
              <p className="rate-card__month-title">Monthly rates on request</p>
              <p>For long-stay visitors and residents, at a further discount.</p>
              <Link className="link-arrow link-arrow--light" href={urls.contact} prefetch={false}>
                Ask about a long-term or monthly rate <Icon name="arrow" />
              </Link>
            </aside>
          </div>
        </PageHeader>

        <SectionNav label="On this page" items={NAV} cta={{ href: urls.book, label: 'Reserve' }} />

        <section id="rates-table" className="rates-table section" aria-labelledby="rates-table-title">
          <div className="container">
            <div className="section-head section-head--split">
              <div>
                <p className="eyebrow" data-reveal="">
                  At a glance
                </p>
                <h2 id="rates-table-title" className="h2" data-reveal="">
                  Rental rates in US and Belize dollars
                </h2>
              </div>
              <p className="section-head__aside" data-reveal="">
                Same rates all year. Belize dollars at the fixed 2-to-1 rate. Not sure which cart? See{' '}
                <Link href={urls.compare} prefetch={false}>
                  which cart is right for your group and budget
                </Link>
                .
              </p>
            </div>
            <div className="table-card" data-reveal="" role="region" aria-label="Rental rates table" tabIndex={0}>
              <table className="rates__table">
                <caption className="screen-reader-text">Golf cart rental rates by cart, currency and rental length</caption>
                <thead>
                  <tr>
                    <th scope="col">Cart</th>
                    <th scope="col">1 day</th>
                    <th scope="col">3 days</th>
                    <th scope="col">1 week</th>
                    <th scope="col">2 weeks</th>
                    <th scope="col">Monthly</th>
                  </tr>
                </thead>
                <tbody>
                  {rateRows.flatMap((r) =>
                    (['usd', 'bzd'] as const).map((cur) => (
                      <tr key={r.id + cur} className={cur === 'usd' ? 'is-usd' : 'is-bzd'}>
                        <th scope="row">
                          {r.cart} <span className="rates__cur">({cur.toUpperCase()})</span>
                        </th>
                        <td data-label="1 day">{money(r[cur].day)}</td>
                        <td data-label="3 days" className="rates__tbd">{TBD}</td>
                        <td data-label="1 week">{money(r[cur].week)}</td>
                        <td data-label="2 weeks" className="rates__tbd">{TBD}</td>
                        <td data-label="Monthly" className="rates__tbd">{TBD}</td>
                      </tr>
                    )),
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="included" className="included section" aria-labelledby="included-title">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow" data-reveal="">
                No surprises
              </p>
              <h2 id="included-title" className="h2" data-reveal="">
                What is included, <span className="muted">what is not</span>
              </h2>
            </div>
            <div className="included__grid">
              <div className="list-card list-card--yes" data-reveal="">
                <h3 className="list-card__title">Included in every rental</h3>
                <ul>
                  {included.map((item) => (
                    <li key={item}>
                      <span className="list-card__mark" aria-hidden="true">
                        <Icon name="check" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="list-card__foot">
                  Bridge passes open up the whole island. See{' '}
                  <Link href={urls.ambergris} prefetch={false}>
                    where you can drive on Ambergris Caye
                  </Link>
                  .
                </p>
              </div>
              <div className="list-card list-card--no" data-reveal="">
                <h3 className="list-card__title">Not included</h3>
                <ul>
                  {notIncluded.map((item) => (
                    <li key={item}>
                      <span className="list-card__mark" aria-hidden="true">
                        <Icon name="minus" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="multi-day" className="multi-day section section--dark" aria-labelledby="multi-day-title">
          <div className="container multi-day__grid">
            <div>
              <p className="eyebrow eyebrow--light" data-reveal="">
                Stay longer, pay less
              </p>
              <h2 id="multi-day-title" className="h2" data-reveal="">
                {multiDay.h2}
              </h2>
              <p className="multi-day__body" data-reveal="">
                {multiDay.body}
              </p>
              <Link className="link-arrow link-arrow--light" href={urls.contact} prefetch={false} data-reveal="">
                Ask about a long-term or monthly rate <Icon name="arrow" />
              </Link>
            </div>
            <div className="saving" data-reveal="">
              <p className="saving__legend">
                <span className="saving__key saving__key--day" /> Daily rate
                <span className="saving__key saving__key--week" /> Weekly rate, per day
              </p>
              {multiDay.bars.map((b) => (
                <figure key={b.cart} className="saving__row">
                  <figcaption>
                    <strong>{b.cart}</strong>
                    <span className="saving__badge">Save {b.saving}</span>
                  </figcaption>
                  <div className="saving__bars">
                    <div className="saving__bar saving__bar--day" style={{ '--w': '100%' } as React.CSSProperties}>
                      <span>{money(b.daily)}/day</span>
                    </div>
                    <div
                      className="saving__bar saving__bar--week"
                      style={{ '--w': `${Math.round((b.weeklyPerDay / b.daily) * 100)}%` } as React.CSSProperties}
                    >
                      <span>{money(b.weeklyPerDay)}/day</span>
                    </div>
                  </div>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="policies section" aria-label="Rental policies">
          <div className="container">
            {policies.map((p) => (
              <article key={p.id} id={p.id} className="policy" aria-labelledby={`${p.id}-title`}>
                <div className="policy__head">
                  <h2 id={`${p.id}-title`} className="policy__title" data-reveal="">
                    <NoBreak text={p.h2} />
                  </h2>
                  {'figures' in p && (
                    <dl className="policy__figures" data-reveal="">
                      {p.figures.map((f) => (
                        <div key={f.label}>
                          <dt>{f.label}</dt>
                          <dd>{f.value}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  {'chips' in p && (
                    <ul className="policy__chips" aria-label="Accepted payment methods" data-reveal="">
                      {p.chips.map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  )}
                  {'seasons' in p && (
                    <div className="policy__seasons" data-reveal="">
                      <div>
                        <p className="policy__season-label policy__season-label--peak">Peak: book early</p>
                        <ul>
                          {p.seasons.peak.map((s) => (
                            <li key={s}>{s}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="policy__season-label">Off-peak: same-week usually fine</p>
                        <ul>
                          {p.seasons.off.map((s) => (
                            <li key={s}>{s}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
                <div className="policy__body">
                  <p data-reveal="">
                    <RichText text={p.body} />
                  </p>
                  {p.id === 'deposit' && (
                    <Link className="link-arrow" href={urls.pay} prefetch={false} data-reveal="">
                      Pay a deposit online <Icon name="arrow" />
                    </Link>
                  )}
                  {p.id === 'cancellation' && (
                    <Link className="link-arrow" href={urls.terms} prefetch={false} data-reveal="">
                      Full rental terms <Icon name="arrow" />
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <Faq items={faq} id="rates-faq" />
        <FinalCta ctaLabel="Reserve at these rates" />
      </main>
    </>
  );
}
