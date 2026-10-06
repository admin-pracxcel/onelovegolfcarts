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
import { RESORT_SLUGS, resorts, type ResortSlug } from '@/lib/pages/resorts';
import { jsonLd, locationSchema } from '@/lib/schema';
import '@/styles/location.css';

const ZONES = {
  north: { name: 'North Ambergris Caye', path: urls.north },
  south: { name: 'South Ambergris Caye', path: urls.south },
};

const NAV = [
  { id: 'delivery', label: 'Delivery' },
  { id: 'directions', label: 'Directions' },
  { id: 'which', label: 'Which cart' },
  { id: 'faq', label: 'FAQ' },
];

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function resortMetadata(slug: ResortSlug): Metadata {
  const r = resorts[slug];
  const path = urls[slug];
  return {
    title: { absolute: r.meta.title },
    description: r.meta.description,
    alternates: { canonical: path, languages: { 'en-US': path, 'x-default': path } },
    openGraph: {
      type: 'website',
      siteName: business.name,
      title: r.meta.title,
      description: r.meta.description,
      url: path,
      locale: 'en_US',
      images: [{ url: imageInfo(r.hero.image).src, alt: r.hero.alt }],
    },
    twitter: { card: 'summary_large_image' },
  };
}

export function ResortPage({ slug }: { slug: ResortSlug }) {
  const r = resorts[slug];
  const path = urls[slug];
  const zone = ZONES[r.zone];
  const trail = [
    { name: 'Ambergris Caye', path: urls.ambergris },
    { name: zone.name, path: zone.path },
    { name: r.name, path },
  ];
  const linked = new Set(r.links.map((l) => l.key));
  const others = RESORT_SLUGS.filter((s) => s !== slug && !linked.has(s));

  const schema = locationSchema({
    path,
    crumb: r.name,
    trail,
    title: r.meta.h1,
    description: r.meta.description,
    serviceType: `Golf cart delivery to ${r.fullName}`,
    area: {
      '@type': 'Resort',
      name: r.fullName,
      containedInPlace: {
        '@type': 'Place',
        name: zone.name,
        containedInPlace: { '@type': 'Place', name: 'Ambergris Caye', sameAs: 'https://en.wikipedia.org/wiki/Ambergris_Caye' },
      },
    },
    faq: r.faq,
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <main id="main" className="loc-page">
        <PageHeader trail={trail} eyebrow={`${zone.name} resort delivery`} title={r.meta.h1} lead={r.intro}>
          <div className="container">
            <div className="loc-hero">
              <div className="loc-hero__main" data-reveal="clip">
                <Picture name={r.hero.image} alt={r.hero.alt} sizes="(min-width: 1000px) 62vw, 100vw" priority />
              </div>
              <aside className="loc-hero__card" aria-label={`Book delivery to ${r.name}`} data-reveal="">
                <p className="loc-hero__kicker">Staying at {r.name}?</p>
                <p className="loc-hero__line">Send us your check-in date and time.</p>
                <a className="btn btn--primary" href={whatsappUrl(r.whatsappTemplate)}>
                  <Icon name="chat" /> Send your booking details
                </a>
                <Link className="link-arrow" href={urls.book} prefetch={false}>
                  {cap(r.book)} <Icon name="arrow" />
                </Link>
              </aside>
            </div>
            <ul className="loc-facts" aria-label={`${r.name} delivery at a glance`}>
              {r.facts.map((f) => (
                <li key={f.label} data-reveal="">
                  <strong>{f.value}</strong>
                  <span>{f.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </PageHeader>

        <SectionNav label="On this page" items={NAV} cta={{ href: urls.book, label: 'Reserve' }} />

        <section id="delivery" className="loc-section section" aria-labelledby="delivery-title">
          <div className="container loc-split">
            <div className="loc-prose">
              <p className="eyebrow" data-reveal="">
                Hand-off
              </p>
              <h2 id="delivery-title" className="h2" data-reveal="">
                {r.delivery.h2}
              </h2>
              <p data-reveal="">{r.delivery.body}</p>
            </div>
            <dl className="loc-tips" data-reveal="">
              {r.delivery.handoff.map((h) => (
                <div key={h.label}>
                  <dt>{h.label}</dt>
                  <dd>{h.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="directions" className="loc-section section loc-tight" aria-label={`Directions from ${r.name}`}>
          <div className="container">
            <div className="loc-routes">
              {r.routes.map((route, i) => (
                <article key={route.to} className={`loc-route${i === 0 ? ' is-dark' : ''}`} data-reveal="">
                  <p className="loc-route__to">
                    <span>To {route.to}</span>
                    <strong>{route.time}</strong>
                    <small>each way</small>
                  </p>
                  <h2 className="loc-route__title">{route.h2}</h2>
                  <p>{route.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="which" className="loc-section loc-which" aria-labelledby="which-title">
          <div className="container loc-which__inner">
            <div className="loc-which__media" data-reveal="clip">
              <Picture name={r.which.image} alt={r.which.alt} sizes="(min-width: 1000px) 40vw, 100vw" />
            </div>
            <div className="loc-prose">
              <p className="eyebrow" data-reveal="">
                Which cart
              </p>
              <h2 id="which-title" className="h2" data-reveal="">
                {r.which.h2}
              </h2>
              <p data-reveal="">{r.which.body}</p>
              <ul className="loc-links" aria-label="Related">
                {r.links.map((l) => (
                  <li key={l.key}>
                    <Link href={urls[l.key]} prefetch={false}>
                      {cap(l.label)} <Icon name="arrow" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <Faq items={r.faq} />

        <nav className="loc-section loc-more" aria-labelledby="more-title">
          <div className="container">
            <p id="more-title" className="loc-more__label">
              More resort deliveries
            </p>
            <ul className="loc-links">
              {others.map((s) => (
                <li key={s}>
                  <Link href={urls[s]} prefetch={false}>
                    {resorts[s].name} <Icon name="arrow" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <FinalCta ctaLabel={cap(r.book)} />
      </main>
    </>
  );
}
