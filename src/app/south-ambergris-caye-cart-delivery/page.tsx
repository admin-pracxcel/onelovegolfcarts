import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { NoBreak } from '@/components/NoBreak';
import { PageHeader } from '@/components/PageHeader';
import { Picture } from '@/components/Picture';
import { SectionNav } from '@/components/SectionNav';
import { Faq } from '@/components/sections/Faq';
import { FinalCta } from '@/components/sections/FinalCta';
import { business, urls, whatsappUrl } from '@/lib/business';
import { imageInfo } from '@/lib/images';
import { delivery, facts, faq, intro, links, meta, south, what, whatsappTemplate } from '@/lib/pages/south-ambergris';
import { jsonLd, locationSchema } from '@/lib/schema';
import '@/styles/location.css';

const PATH = '/south-ambergris-caye-cart-delivery/';
const TRAIL = [
  { name: 'Ambergris Caye', path: '/ambergris-caye/' },
  { name: 'South Ambergris Caye', path: PATH },
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
    images: [{ url: imageInfo('red-4-seater-club-car-bougainvillea-resort').src, alt: 'A red One Love golf cart beside bougainvillea at a resort on Ambergris Caye' }],
  },
  twitter: { card: 'summary_large_image' },
};

const NAV = [
  { id: 'what', label: 'The south side' },
  { id: 'delivery', label: 'Delivery times' },
  { id: 'south', label: "What's there" },
  { id: 'faq', label: 'FAQ' },
];

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function SouthAmbergrisPage() {
  const schema = locationSchema({
    path: PATH,
    crumb: 'South Ambergris Caye',
    title: meta.h1,
    description: meta.description,
    serviceType: 'Golf cart delivery to South Ambergris Caye',
    area: {
      '@type': 'Place',
      name: 'South Ambergris Caye',
      containedInPlace: { '@type': 'Place', name: 'Ambergris Caye', sameAs: 'https://en.wikipedia.org/wiki/Ambergris_Caye' },
    },
    faq,
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <main id="main" className="loc-page">
        <PageHeader trail={TRAIL} eyebrow="South of town" title={meta.h1} lead={intro}>
          <div className="container">
            <div className="loc-hero">
              <div className="loc-hero__main" data-reveal="clip">
                <Picture
                  name="red-4-seater-club-car-bougainvillea-resort"
                  alt="Red lifted One Love golf cart parked on white sand beside pink bougainvillea at a resort on Ambergris Caye"
                  sizes="(min-width: 1000px) 62vw, 100vw"
                  priority
                />
              </div>
              <aside className="loc-hero__card" aria-label="Book south-side delivery" data-reveal="">
                <p className="loc-hero__kicker">Staying south of town?</p>
                <p className="loc-hero__line">
                  <NoBreak text="Send us the resort name and your check-in time." />
                </p>
                <a className="btn btn--primary" href={whatsappUrl(whatsappTemplate)}>
                  <Icon name="chat" /> Send your resort details
                </a>
                <Link className="link-arrow" href={urls.book} prefetch={false}>
                  {cap(links.book)} <Icon name="arrow" />
                </Link>
              </aside>
            </div>
            <ul className="loc-facts" aria-label="South Ambergris delivery at a glance">
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
                The south side
              </p>
              <h2 id="what-title" className="h2" data-reveal="">
                {what.h2}
              </h2>
              <p data-reveal="">{what.body}</p>
            </div>
            <dl className="loc-tips" data-reveal="">
              {what.zone.map((z) => (
                <div key={z.label}>
                  <dt>{z.label}</dt>
                  <dd>{z.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="delivery" className="loc-section section loc-tight" aria-labelledby="delivery-title">
          <div className="container loc-split">
            <div className="loc-prose">
              <p className="eyebrow" data-reveal="">
                Along Coconut Drive
              </p>
              <h2 id="delivery-title" className="h2" data-reveal="">
                {delivery.h2}
              </h2>
              <p data-reveal="">{delivery.body}</p>
              <ul className="loc-links" aria-label="Related">
                <li>
                  <Link href={urls.spr} prefetch={false}>
                    {links.spr} <Icon name="arrow" />
                  </Link>
                </li>
              </ul>
            </div>
            <div className="loc-times" data-reveal="">
              <p className="loc-times__label">Typical delivery from our office</p>
              <ul>
                {delivery.times.map((t) => (
                  <li key={t.to}>
                    <span className="loc-times__to">
                      {t.to}
                      {t.note && <small>{t.note}</small>}
                    </span>
                    <span className="loc-times__time">{t.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="south" className="loc-section section loc-tight" aria-labelledby="south-title">
          <div className="container">
            <div className="section-head section-head--split">
              <div>
                <p className="eyebrow" data-reveal="">
                  Resorts, food, sunsets
                </p>
                <h2 id="south-title" className="h2" data-reveal="">
                  {south.h2}
                </h2>
              </div>
              <p className="section-head__aside" data-reveal="">
                {south.body}
              </p>
            </div>
            <div className="loc-groups">
              {south.groups.map((g, i) => (
                <div key={g.name} className={`loc-group loc-group--${i + 1}`} data-reveal="">
                  <h3 className="loc-group__name">{g.name}</h3>
                  <ul>
                    {g.items.map((it) => (
                      <li key={it.name}>
                        <strong>{it.name}</strong>
                        {it.note && <span>{it.note}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <ul className="loc-links" aria-label="More ideas">
              <li>
                <Link href={urls['things-to-do']} prefetch={false}>
                  {cap(links.thingsToDo)} <Icon name="arrow" />
                </Link>
              </li>
              <li>
                <Link href={urls['deep-south']} prefetch={false}>
                  {cap(links.deepSouth)} <Icon name="arrow" />
                </Link>
              </li>
            </ul>
          </div>
        </section>

        <Faq items={faq} />
        <FinalCta ctaLabel={cap(links.book)} />
      </main>
    </>
  );
}
