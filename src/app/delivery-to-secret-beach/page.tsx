import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { PageHeader } from '@/components/PageHeader';
import { Picture } from '@/components/Picture';
import { SectionNav } from '@/components/SectionNav';
import { Faq } from '@/components/sections/Faq';
import { FinalCta } from '@/components/sections/FinalCta';
import { business, urls, whatsappUrl } from '@/lib/business';
import { imageInfo } from '@/lib/images';
import { delivery, drive, facts, faq, intro, links, meta, there, what, whatsappTemplate } from '@/lib/pages/secret-beach';
import { jsonLd, locationSchema } from '@/lib/schema';
import '@/styles/location.css';

const PATH = '/delivery-to-secret-beach/';
const TRAIL = [
  { name: 'Locations', path: '/locations/' },
  { name: 'Secret Beach', path: PATH },
];

export const metadata: Metadata = {
  title: { absolute: meta.title },
  description: meta.description,
  alternates: { canonical: PATH, languages: { 'en-US': PATH, 'x-default': PATH } },
  openGraph: {
    type: 'website',
    siteName: business.name,
    title: meta.title,
    description: meta.description,
    url: PATH,
    locale: 'en_US',
    images: [{ url: imageInfo('gallery-blue-4-seater-golf-cart-seaside').src, alt: 'A One Love golf cart parked by the sea on Ambergris Caye' }],
  },
  twitter: { card: 'summary_large_image' },
};

const NAV = [
  { id: 'what', label: 'About the beach' },
  { id: 'drive', label: 'The drive' },
  { id: 'delivery', label: 'Delivery' },
  { id: 'there', label: 'When you get there' },
  { id: 'faq', label: 'FAQ' },
];

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function SecretBeachPage() {
  const schema = locationSchema({
    path: PATH,
    crumb: 'Secret Beach',
    title: meta.h1,
    description: meta.description,
    serviceType: 'Golf cart rental and delivery for Secret Beach',
    area: {
      '@type': 'Place',
      name: 'Secret Beach',
      containedInPlace: { '@type': 'Place', name: 'Ambergris Caye', sameAs: 'https://en.wikipedia.org/wiki/Ambergris_Caye' },
    },
    faq,
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <main id="main" className="loc-page">
        <PageHeader trail={TRAIL} eyebrow="North Ambergris Caye" title={meta.h1} lead={intro}>
          <div className="container">
            <div className="loc-hero">
              <div className="loc-hero__main" data-reveal="clip">
                <Picture
                  name="gallery-blue-4-seater-golf-cart-seaside"
                  alt="Blue One Love 4-seater golf cart parked by the sea under a palm tree on Ambergris Caye"
                  sizes="(min-width: 1000px) 62vw, 100vw"
                  priority
                />
              </div>
              <aside className="loc-hero__card" aria-label="Plan a Secret Beach trip" data-reveal="">
                <p className="loc-hero__kicker">Bridge passes included</p>
                <p className="loc-hero__line">About 25 minutes by golf cart from San Pedro Town.</p>
                <a className="btn btn--primary" href={whatsappUrl(whatsappTemplate)}>
                  <Icon name="chat" /> Plan a Secret Beach day
                </a>
                <Link className="link-arrow" href={urls.book} prefetch={false}>
                  {cap(links.book)} <Icon name="arrow" />
                </Link>
              </aside>
            </div>
            <ul className="loc-facts" aria-label="Secret Beach at a glance">
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

        <section id="what" className="loc-section section" aria-labelledby="what-title">
          <div className="container loc-split">
            <div className="loc-prose">
              <p className="eyebrow" data-reveal="">
                The beach
              </p>
              <h2 id="what-title" className="h2" data-reveal="">
                {what.h2}
              </h2>
              <p data-reveal="">{what.body}</p>
            </div>
            <div className="loc-traits" data-reveal="">
              <p className="loc-traits__label">The water</p>
              <ul className="loc-traits__list">
                {what.traits.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <p className="loc-traits__label">Beach bars</p>
              <ul className="loc-traits__bars">
                {what.bars.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="drive" className="loc-section section loc-tight" aria-labelledby="drive-title">
          <div className="container">
            <div className="section-head section-head--split">
              <div>
                <p className="eyebrow" data-reveal="">
                  Directions
                </p>
                <h2 id="drive-title" className="h2" data-reveal="">
                  {drive.h2}
                </h2>
              </div>
              <p className="section-head__aside" data-reveal="">
                {drive.body}
              </p>
            </div>
            <ol className="journey" aria-label="Route from the One Love office to Secret Beach" data-reveal="">
              {drive.route.map((r, i) => (
                <li key={r.step} className={`journey__stop${i === drive.route.length - 1 ? ' is-end' : ''}`}>
                  <span className="journey__place">{r.place}</span>
                  <span className="journey__step">{r.step}</span>
                  {r.time && <span className="journey__time">{r.time}</span>}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="delivery" className="loc-section section" aria-labelledby="delivery-title">
          <div className="container">
            <div className="section-head section-head--split">
              <div>
                <p className="eyebrow" data-reveal="">
                  Getting the cart
                </p>
                <h2 id="delivery-title" className="h2" data-reveal="">
                  {delivery.h2}
                </h2>
              </div>
              <p className="section-head__aside" data-reveal="">
                {delivery.body}
              </p>
            </div>
            <div className="loc-options loc-options--two">
              {delivery.options.map((o, i) => (
                <div key={o.title} className={`loc-option${i === 0 ? ' is-best' : ''}`} data-reveal="">
                  <div className="loc-option__head">
                    <h3 className="loc-option__cart">{o.title}</h3>
                    <p className="loc-option__price">{o.tag}</p>
                  </div>
                  <ul>
                    {o.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <ul className="loc-links" aria-label="Related">
              <li>
                <Link href={urls.north} prefetch={false}>
                  {links.north} <Icon name="arrow" />
                </Link>
              </li>
              <li>
                <Link href={urls['6-seater']} prefetch={false}>
                  {cap(links.sixSeater)} <Icon name="arrow" />
                </Link>
              </li>
            </ul>
          </div>
        </section>

        <section id="there" className="loc-section loc-which" aria-labelledby="there-title">
          <div className="container loc-which__inner">
            <div className="loc-prose">
              <p className="eyebrow" data-reveal="">
                On arrival
              </p>
              <h2 id="there-title" className="h2" data-reveal="">
                {there.h2}
              </h2>
              <p data-reveal="">{there.body}</p>
              <ul className="loc-links" aria-label="More ideas">
                <li>
                  <Link href={urls['things-to-do']} prefetch={false}>
                    {cap(links.thingsToDo)} <Icon name="arrow" />
                  </Link>
                </li>
                <li>
                  <Link href={urls.ambergris} prefetch={false}>
                    {links.ambergris} <Icon name="arrow" />
                  </Link>
                </li>
              </ul>
            </div>
            <dl className="loc-tips" data-reveal="">
              {there.tips.map((t) => (
                <div key={t.label}>
                  <dt>{t.label}</dt>
                  <dd>{t.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <Faq items={faq} />
        <FinalCta ctaLabel={cap(links.book)} />
      </main>
    </>
  );
}
