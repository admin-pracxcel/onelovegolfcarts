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
import { delivery, facts, faq, intro, links, meta, upThere, what, whatsappTemplate } from '@/lib/pages/north-ambergris';
import { jsonLd, locationSchema } from '@/lib/schema';
import '@/styles/location.css';

const PATH = '/north-ambergris-caye-cart-delivery/';
const TRAIL = [
  { name: 'Locations', path: '/locations/' },
  { name: 'North Ambergris Caye', path: PATH },
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
    images: [{ url: imageInfo('gallery-golf-cart-line-up-turquoise-house').src, alt: 'One Love golf carts lined up in front of a turquoise house on Ambergris Caye' }],
  },
  twitter: { card: 'summary_large_image' },
};

const NAV = [
  { id: 'what', label: 'The north side' },
  { id: 'delivery', label: 'Delivery' },
  { id: 'up-there', label: "What's up there" },
  { id: 'faq', label: 'FAQ' },
];

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function NorthAmbergrisPage() {
  const schema = locationSchema({
    path: PATH,
    crumb: 'North Ambergris Caye',
    title: meta.h1,
    description: meta.description,
    serviceType: 'Golf cart delivery to North Ambergris Caye',
    area: {
      '@type': 'Place',
      name: 'North Ambergris Caye',
      containedInPlace: { '@type': 'Place', name: 'Ambergris Caye', sameAs: 'https://en.wikipedia.org/wiki/Ambergris_Caye' },
    },
    faq,
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <main id="main" className="loc-page">
        <PageHeader trail={TRAIL} eyebrow="North of the bridge" title={meta.h1} lead={intro}>
          <div className="container">
            <div className="loc-hero">
              <div className="loc-hero__main" data-reveal="clip">
                <Picture
                  name="gallery-golf-cart-line-up-turquoise-house"
                  alt="Red, yellow, camouflage, pink and white One Love golf carts lined up in front of a turquoise house on Ambergris Caye"
                  sizes="(min-width: 1000px) 62vw, 100vw"
                  priority
                />
              </div>
              <aside className="loc-hero__card" aria-label="Book north-side delivery" data-reveal="">
                <p className="loc-hero__kicker">Staying north-side?</p>
                <p className="loc-hero__line">We deliver golf carts to any address on the north side.</p>
                <a className="btn btn--primary" href={whatsappUrl(whatsappTemplate)}>
                  <Icon name="chat" /> Send your resort details
                </a>
                <Link className="link-arrow" href={urls.book} prefetch={false}>
                  {cap(links.book)} <Icon name="arrow" />
                </Link>
              </aside>
            </div>
            <ul className="loc-facts" aria-label="North Ambergris delivery at a glance">
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
                The north side
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
                Over the bridge
              </p>
              <h2 id="delivery-title" className="h2" data-reveal="">
                {delivery.h2}
              </h2>
              <p data-reveal="">{delivery.body}</p>
            </div>
            <div className="loc-delivery">
              <ol className="loc-steps" aria-label="North-side delivery" data-reveal="">
                {delivery.steps.map((s, i) => (
                  <li key={s.when}>
                    <span className="loc-steps__dot" aria-hidden="true">
                      {i + 1}
                    </span>
                    <span className="loc-steps__when">{s.when}</span>
                    <span className="loc-steps__what">{s.what}</span>
                  </li>
                ))}
              </ol>
              <p className="loc-delivery__label" data-reveal="">
                Landing at SPR?
              </p>
              <div className="loc-plan" data-reveal="">
                {delivery.arrival.map((a, i) => (
                  <div key={a.title} className="loc-plan__option">
                    <span className="loc-plan__num" aria-hidden="true">
                      {i + 1}
                    </span>
                    <h3 className="loc-plan__title">{a.title}</h3>
                    <p>{a.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="up-there" className="loc-section section loc-tight" aria-labelledby="up-title">
          <div className="container">
            <div className="section-head section-head--split">
              <div>
                <p className="eyebrow" data-reveal="">
                  Resorts, food, beaches
                </p>
                <h2 id="up-title" className="h2" data-reveal="">
                  {upThere.h2}
                </h2>
              </div>
              <p className="section-head__aside" data-reveal="">
                {upThere.body}
              </p>
            </div>
            <div className="loc-groups">
              {upThere.groups.map((g, i) => (
                <div key={g.name} className={`loc-group loc-group--${i + 1}`} data-reveal="">
                  <h3 className="loc-group__name">{g.name}</h3>
                  <ul>
                    {g.items.map((it) => (
                      <li key={it.name}>
                        <strong>{it.href ? <Link href={it.href} prefetch={false}>{it.name}</Link> : it.name}</strong>
                        <span>{it.note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <ul className="loc-links" aria-label="Related">
              <li>
                <Link href={urls['secret-beach']} prefetch={false}>
                  {links.secretBeach} <Icon name="arrow" />
                </Link>
              </li>
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
        </section>

        <Faq items={faq} />
        <FinalCta ctaLabel={cap(links.book)} />
      </main>
    </>
  );
}
