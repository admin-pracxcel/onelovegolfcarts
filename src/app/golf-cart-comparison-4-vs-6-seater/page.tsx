import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { PageHeader } from '@/components/PageHeader';
import { Picture } from '@/components/Picture';
import { SectionNav } from '@/components/SectionNav';
import { Faq } from '@/components/sections/Faq';
import { FinalCta } from '@/components/sections/FinalCta';
import { Reviews } from '@/components/sections/Reviews';
import { business, urls } from '@/lib/business';
import { imageInfo, type ImageName } from '@/lib/images';
import {
  cost,
  faq,
  fourDetail,
  gas,
  groups,
  intro,
  links,
  luggage,
  meta,
  reviewsHead,
  safety,
  short,
  sixDetail,
  table,
  type Detail,
} from '@/lib/pages/compare';
import { cartDetails } from '@/lib/pages/our-carts';
import { compareSchema, jsonLd } from '@/lib/schema';
import '@/styles/location.css';
import '@/styles/guide.css';
import '@/styles/compare.css';

const PATH = '/golf-cart-comparison-4-vs-6-seater/';
const TRAIL = [
  { name: 'Our Carts', path: urls.carts },
  { name: '4-Seater vs 6-Seater', path: PATH },
];
const OG = 'golf-cart-fleet-lineup-lot';

export const metadata: Metadata = {
  title: { absolute: meta.title },
  description: meta.description,
  alternates: { canonical: PATH, languages: { 'en-US': PATH, 'x-default': PATH } },
  openGraph: {
    type: 'article',
    siteName: business.name,
    title: meta.title,
    description: meta.description,
    url: PATH,
    locale: 'en_US',
    publishedTime: meta.published,
    images: [{ url: imageInfo(OG).src, alt: 'A line-up of One Love 4-seater and 6-seater golf carts in San Pedro, Belize' }],
  },
  twitter: { card: 'summary_large_image' },
};

const NAV = [
  { id: 'short', label: 'Short answer' },
  { id: 'table', label: 'Comparison table' },
  { id: 'four', label: '4-Seater' },
  { id: 'six', label: '6-Seater' },
  { id: 'groups', label: 'By group size' },
  { id: 'luggage', label: 'Luggage' },
  { id: 'cost', label: 'Cost' },
  { id: 'safety', label: 'Kids & pets' },
  { id: 'gas', label: 'Gas vs electric' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'faq', label: 'FAQ' },
];

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function CartDetail({
  id,
  h2,
  blocks,
  image,
  alt,
  price,
  href,
  cta,
  dark,
}: {
  id: string;
  h2: string;
  blocks: Detail[];
  image: ImageName;
  alt: string;
  price: string;
  href: string;
  cta: string;
  dark?: boolean;
}) {
  return (
    <section id={id} className={`loc-section section cmp-detail${dark ? ' cmp-detail--dark' : ''}`} aria-labelledby={`${id}-title`}>
      <div className="container cmp-detail__inner">
        <div className="cmp-detail__aside">
          <div className="cmp-detail__media" data-reveal="clip">
            <Picture name={image} alt={alt} sizes="(min-width: 1000px) 34vw, 100vw" />
          </div>
          <p className="cmp-detail__price" data-reveal="">
            {price}
          </p>
          <Link className="btn btn--primary" href={href} prefetch={false}>
            {cap(cta)} <Icon name="arrow" />
          </Link>
        </div>
        <div>
          <h2 id={`${id}-title`} className="h2" data-reveal="">
            {h2}
          </h2>
          <div className="cmp-detail__list">
            {blocks.map((b) => (
              <div key={b.h3} className="cmp-detail__item" data-reveal="">
                <h3>{b.h3}</h3>
                <p>{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ComparePage() {
  const schema = compareSchema({
    path: PATH,
    title: meta.h1,
    description: meta.description,
    image: imageInfo(OG).src,
    published: meta.published,
    carts: cartDetails.map((c) => ({
      id: c.id,
      name: c.h2,
      description: c.paragraphs[0],
      image: imageInfo(c.images.main).src,
      usd: c.usd,
      specs: table.rows.map((r) => ({ name: r.label, value: c.id === '4-seater' ? r.four : r.six })),
    })),
    faq,
  });
  const four = business.rates['4-seater'];
  const six = business.rates['6-seater'];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <main id="main" className="loc-page guide-page cmp-page">
        <PageHeader trail={TRAIL} eyebrow="Choosing a cart" title={meta.h1} lead={intro}>
          <div className="container">
            <div className="cmp-vs">
              <figure className="cmp-vs__cart" data-reveal="clip">
                <Picture
                  name="teal-4-seater-golf-cart-side-profile"
                  alt="Teal One Love 4-seater golf cart in side profile"
                  sizes="(min-width: 900px) 48vw, 100vw"
                  priority
                />
                <figcaption>
                  <span>4-Seater</span>
                  <strong>${four.day}</strong>
                  <small>a day</small>
                </figcaption>
              </figure>
              <span className="cmp-vs__badge" aria-hidden="true">
                vs
              </span>
              <figure className="cmp-vs__cart" data-reveal="clip">
                <Picture
                  name="navy-6-seater-golf-cart-rear-bench-profile"
                  alt="Navy One Love 6-seater golf cart in side profile, showing the rear-facing bench"
                  sizes="(min-width: 900px) 48vw, 100vw"
                />
                <figcaption>
                  <span>6-Seater</span>
                  <strong>${six.day}</strong>
                  <small>a day</small>
                </figcaption>
              </figure>
            </div>
          </div>
        </PageHeader>

        <SectionNav label="In this comparison" items={NAV} cta={{ href: urls.book, label: 'Reserve' }} />

        <section id="short" className="loc-section section" aria-labelledby="short-title">
          <div className="container">
            <div className="section-head section-head--split">
              <div>
                <p className="eyebrow" data-reveal="">
                  In one minute
                </p>
                <h2 id="short-title" className="h2" data-reveal="">
                  {short.h2}
                </h2>
              </div>
              <p className="section-head__aside" data-reveal="">
                {short.body}
              </p>
            </div>
            <ul className="cmp-picks">
              {short.picks.map((p, i) => (
                <li key={p.pick} className={`cmp-pick${i === 1 ? ' is-dark' : ''}`} data-reveal="">
                  <span className="cmp-pick__who">{p.who}</span>
                  <span className="cmp-pick__pick">{p.pick}</span>
                  <span className="cmp-pick__price">{p.price}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="table" className="loc-section section loc-tight" aria-labelledby="table-title">
          <div className="container">
            <div className="section-head section-head--split">
              <div>
                <p className="eyebrow" data-reveal="">
                  Spec by spec
                </p>
                <h2 id="table-title" className="h2" data-reveal="">
                  {table.h2}
                </h2>
              </div>
              <p className="section-head__aside" data-reveal="">
                {table.body}
              </p>
            </div>
            <div className="cmp-table__wrap" role="region" aria-label="4-seater vs 6-seater spec table" tabIndex={0} data-reveal="">
              <table className="cmp-table">
                <caption className="screen-reader-text">4-seater and 6-seater golf cart specifications. Highlighted rows differ.</caption>
                <thead>
                  <tr>
                    <th scope="col">Spec</th>
                    <th scope="col">4-Seater</th>
                    <th scope="col">6-Seater</th>
                  </tr>
                </thead>
                <tbody>
                  {table.rows.map((r) => (
                    <tr key={r.label} className={r.diff ? 'is-diff' : undefined}>
                      <th scope="row">{r.label}</th>
                      <td data-label="4-Seater">{r.four}</td>
                      <td data-label="6-Seater">{r.six}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ul className="loc-links" aria-label="Reserve">
              <li>
                <Link href={urls['4-seater']} prefetch={false}>
                  {cap(links.four)} <Icon name="arrow" />
                </Link>
              </li>
              <li>
                <Link href={urls['6-seater']} prefetch={false}>
                  {cap(links.six)} <Icon name="arrow" />
                </Link>
              </li>
            </ul>
          </div>
        </section>

        <CartDetail
          id="four"
          h2={fourDetail.h2}
          blocks={fourDetail.blocks}
          image="gallery-blue-4-seater-golf-cart-street"
          alt="Blue One Love 4-seater golf cart with black seats, parked on a paved street"
          price={`$${four.day} a day · $${four.week} a week`}
          href={urls['4-seater']}
          cta={links.four}
        />
        <CartDetail
          id="six"
          h2={sixDetail.h2}
          blocks={sixDetail.blocks}
          image="maroon-6-seater-golf-cart-beachfront-park"
          alt="Maroon One Love 6-seater golf cart parked by a beachfront park in San Pedro"
          price={`$${six.day} a day · $${six.week} a week`}
          href={urls['6-seater']}
          cta={links.six}
          dark
        />

        <section id="groups" className="loc-section section" aria-labelledby="groups-title">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow" data-reveal="">
                How many of you?
              </p>
              <h2 id="groups-title" className="h2" data-reveal="">
                {groups.h2}
              </h2>
            </div>
            <div className="cmp-groups">
              {groups.items.map((g) => (
                <div key={g.h3} className="cmp-group" data-reveal="">
                  <p className="cmp-group__size" aria-hidden="true">
                    {g.size}
                  </p>
                  <h3 className="guide-block__title">{g.h3}</h3>
                  <p className="cmp-group__pick">{g.pick}</p>
                  <p className="cmp-group__body">{g.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="luggage" className="loc-section loc-which" aria-labelledby="luggage-title">
          <div className="container loc-which__inner">
            <div className="loc-which__media" data-reveal="clip">
              <Picture
                name="guests-luggage-golf-carts-village-mart"
                alt="A line of One Love golf carts carrying guests and suitcases along a street in San Pedro"
                sizes="(min-width: 1000px) 40vw, 100vw"
              />
            </div>
            <div className="loc-prose">
              <p className="eyebrow" data-reveal="">
                Arrival day
              </p>
              <h2 id="luggage-title" className="h2" data-reveal="">
                {luggage.h2}
              </h2>
              <h3 className="guide-sub" data-reveal="">
                {luggage.h3}
              </h3>
              <p data-reveal="">{luggage.body}</p>
              <dl className="loc-figures" data-reveal="">
                <div>
                  <dt>4-Seater suitcases</dt>
                  <dd>2–3</dd>
                </div>
                <div className="is-safe">
                  <dt>6-Seater suitcases</dt>
                  <dd>4–6</dd>
                </div>
              </dl>
              <ul className="loc-links" aria-label="Related">
                <li>
                  <Link href={urls.spr} prefetch={false}>
                    {cap(links.spr)} <Icon name="arrow" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section id="cost" className="loc-section section" aria-labelledby="cost-title">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow" data-reveal="">
                The math
              </p>
              <h2 id="cost-title" className="h2" data-reveal="">
                {cost.h2}
              </h2>
            </div>
            <div className="cmp-bars">
              {cost.bars.map((g) => {
                const max = Math.max(...g.rows.map((r) => r.value));
                return (
                  <div key={g.period} className="cmp-bars__group" data-reveal="">
                    <p className="cmp-bars__period">{g.period}</p>
                    <ul>
                      {g.rows.map((r) => (
                        <li key={r.label} className={r.best ? 'is-best' : undefined}>
                          <span className="cmp-bars__label">{r.label}</span>
                          <span className="cmp-bars__track" aria-hidden="true">
                            <span style={{ width: `${(r.value / max) * 100}%` }} />
                          </span>
                          <span className="cmp-bars__value">${r.value}</span>
                          {r.note && <span className="cmp-bars__note">{r.note}</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
            <div className="guide-blocks cmp-cost">
              {cost.blocks.map((b) => (
                <div key={b.h3} className="guide-block" data-reveal="">
                  <h3 className="guide-block__title">{b.h3}</h3>
                  <p>{b.body}</p>
                </div>
              ))}
            </div>
            <ul className="loc-links" aria-label="Related">
              <li>
                <Link href={urls.rates} prefetch={false}>
                  {cap(links.rates)} <Icon name="arrow" />
                </Link>
              </li>
            </ul>
          </div>
        </section>

        <section id="safety" className="loc-section section loc-tight" aria-labelledby="safety-title">
          <div className="container loc-split">
            <div className="loc-prose">
              <p className="eyebrow" data-reveal="">
                Families
              </p>
              <h2 id="safety-title" className="h2" data-reveal="">
                {safety.h2}
              </h2>
              <p data-reveal="">{safety.body}</p>
            </div>
            <dl className="loc-tips" data-reveal="">
              {safety.tips.map((t) => (
                <div key={t.label}>
                  <dt>{t.label}</dt>
                  <dd>{t.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="gas" className="loc-section section loc-tight" aria-labelledby="gas-title">
          <div className="container loc-split">
            <div className="loc-prose">
              <p className="eyebrow" data-reveal="">
                Why gas
              </p>
              <h2 id="gas-title" className="h2" data-reveal="">
                {gas.h2}
              </h2>
              <p data-reveal="">{gas.body}</p>
              <ul className="loc-links" aria-label="Related">
                <li>
                  <Link href={urls.fleet} prefetch={false}>
                    {cap(links.fleet)} <Icon name="arrow" />
                  </Link>
                </li>
              </ul>
            </div>
            <dl className="loc-figures" data-reveal="">
              <div>
                <dt>Gas stations on the island</dt>
                <dd>3</dd>
              </div>
              <div className="is-safe">
                <dt>To refuel</dt>
                <dd>&lt;3 min</dd>
              </div>
            </dl>
          </div>
        </section>

        <Reviews
          id="reviews"
          eyebrow={reviewsHead.eyebrow}
          title={reviewsHead.title}
          image="one-love-fleet-lineup-under-palms"
          alt="One Love golf carts lined up under palm trees"
        />
        <Faq items={faq} />
        <FinalCta ctaLabel={cap(links.book)} />
      </main>
    </>
  );
}
