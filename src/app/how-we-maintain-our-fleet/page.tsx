import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { PageHeader } from '@/components/PageHeader';
import { Picture } from '@/components/Picture';
import { RichText } from '@/components/RichText';
import { SectionNav } from '@/components/SectionNav';
import { FinalCta } from '@/components/sections/FinalCta';
import { business, urls, whatsappUrl, newTab } from '@/lib/business';
import { imageInfo } from '@/lib/images';
import {
  breakdown,
  chassis,
  facts,
  fleet,
  inspection,
  insurance,
  intro,
  links,
  mechanic,
  mechanicSection,
  meta,
  renters,
  roadsideMessage,
  schedule,
} from '@/lib/pages/fleet';
import { fleetSchema, jsonLd } from '@/lib/schema';
import '@/styles/location.css';
import '@/styles/guide.css';
import '@/styles/fleet.css';

const PATH = '/how-we-maintain-our-fleet/';
const TRAIL = [
  { name: 'About Us', path: urls.about },
  { name: 'Fleet Maintenance', path: PATH },
];
const HERO = 'blue-golf-cart-one-love-lot';

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
    images: [{ url: imageInfo(HERO).src, alt: 'A blue One Love 4-seater golf cart under a covered shed at the One Love lot' }],
  },
  twitter: { card: 'summary_large_image' },
};

const NAV = [
  { id: 'fleet', label: 'Our fleet' },
  { id: 'inspection', label: 'Inspection' },
  { id: 'schedule', label: 'Service schedule' },
  ...(mechanic ? [{ id: 'mechanic', label: 'Our mechanic' }] : []),
  { id: 'breakdown', label: 'Breakdowns' },
  { id: 'insurance', label: 'Insurance' },
  { id: 'chassis', label: 'Aluminum chassis' },
  { id: 'renters', label: 'For renters' },
];

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function FleetPage() {
  const schema = fleetSchema({
    path: PATH,
    title: meta.h1,
    description: meta.description,
    mechanic: mechanic
      ? { name: `${mechanic.firstName} ${mechanic.lastName}`, image: mechanic.photo ? imageInfo(mechanic.photo).src : undefined }
      : null,
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <main id="main" className="loc-page guide-page fleet-page">
        <PageHeader trail={TRAIL} eyebrow="Behind the scenes" title={meta.h1} lead={intro}>
          <div className="container">
            <div className="loc-hero">
              <div className="loc-hero__main" data-reveal="clip">
                <Picture
                  name={HERO}
                  alt="Blue One Love 4-seater golf cart parked under a covered shed at the One Love lot"
                  sizes="(min-width: 1000px) 62vw, 100vw"
                  priority
                />
              </div>
              <aside className="loc-hero__card" aria-label="Roadside support" data-reveal="">
                <p className="loc-hero__kicker">Something wrong on the road?</p>
                <p className="loc-hero__line">Message our WhatsApp with your location.</p>
                <a className="btn btn--primary" {...newTab} href={whatsappUrl(roadsideMessage)}>
                  <Icon name="chat" /> Message us your location
                </a>
                <Link className="link-arrow" href={urls.book} prefetch={false}>
                  {cap(links.book)} <Icon name="arrow" />
                </Link>
              </aside>
            </div>
            <ul className="loc-facts" aria-label="Fleet care at a glance">
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

        <section id="fleet" className="loc-section section" aria-labelledby="fleet-title">
          <div className="container loc-split loc-split--media">
            <div className="loc-prose">
              <p className="eyebrow" data-reveal="">
                4-seaters and 6-seaters
              </p>
              <h2 id="fleet-title" className="h2" data-reveal="">
                {fleet.h2}
              </h2>
              <p data-reveal="">{fleet.body}</p>
              <ul className="loc-links" aria-label="Related">
                <li>
                  <Link href={urls.carts} prefetch={false}>
                    {cap(links.carts)} <Icon name="arrow" />
                  </Link>
                </li>
              </ul>
            </div>
            <div className="fleet-photo" data-reveal="clip">
              <Picture
                name="golf-cart-fleet-lineup-lot"
                alt="A row of One Love golf carts lined up on the lot"
                sizes="(min-width: 1000px) 42vw, 100vw"
              />
            </div>
          </div>
        </section>

        <section id="inspection" className="loc-section section loc-tight" aria-labelledby="inspection-title">
          <div className="container">
            <div className="section-head section-head--split">
              <div>
                <p className="eyebrow" data-reveal="">
                  Before every rental
                </p>
                <h2 id="inspection-title" className="h2" data-reveal="">
                  {inspection.h2}
                </h2>
              </div>
              <p className="section-head__aside" data-reveal="">
                {inspection.body}
              </p>
            </div>
            <ol className="fleet-checks" aria-label="The nine-point pre-rental check">
              {inspection.checks.map((c, i) => (
                <li key={c} data-reveal="">
                  <span className="fleet-checks__num" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{c}</span>
                </li>
              ))}
            </ol>
            <p className="journey__total" data-reveal="">
              <Icon name="clock" /> {inspection.time}
            </p>
          </div>
        </section>

        <section id="schedule" className="loc-section section guide-option guide-option--dark" aria-labelledby="schedule-title">
          <div className="container">
            <div className="section-head section-head--split">
              <div>
                <p className="eyebrow" data-reveal="">
                  Hours and rental cycles
                </p>
                <h2 id="schedule-title" className="h2" data-reveal="">
                  {schedule.h2}
                </h2>
              </div>
              <p className="section-head__aside fleet-on-dark" data-reveal="">
                {schedule.body}
              </p>
            </div>
            <div className="fleet-tiers">
              {schedule.tiers.map((t, i) => (
                <div key={t.name} className="fleet-tier" data-reveal="">
                  <span className="fleet-tier__level" aria-hidden="true">
                    {[0, 1, 2].map((n) => (
                      <span key={n} className={n <= i ? 'is-on' : undefined} />
                    ))}
                  </span>
                  <h3 className="fleet-tier__name">{t.name} service</h3>
                  <p className="fleet-tier__when">{t.when}</p>
                  <ul>
                    {t.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {mechanic && (
          <section id="mechanic" className="loc-section section" aria-labelledby="mechanic-title">
            <div className="container loc-split loc-split--media">
              <div className="loc-prose">
                <p className="eyebrow" data-reveal="">
                  On-staff, not contracted
                </p>
                <h2 id="mechanic-title" className="h2" data-reveal="">
                  {mechanicSection.h2}
                </h2>
                <p className="fleet-person" data-reveal="">
                  {mechanic.firstName} {mechanic.lastName}, Fleet Mechanic
                </p>
                <p data-reveal="">{mechanicSection.body(mechanic)}</p>
                <ul className="loc-links" aria-label="Related">
                  <li>
                    <Link href={urls.team} prefetch={false}>
                      {cap(links.team)} <Icon name="arrow" />
                    </Link>
                  </li>
                </ul>
              </div>
              {mechanic.photo && (
                <div className="fleet-photo" data-reveal="clip">
                  <Picture
                    name={mechanic.photo}
                    alt={`${mechanic.firstName} at the One Love workshop`}
                    sizes="(min-width: 1000px) 42vw, 100vw"
                  />
                </div>
              )}
            </div>
          </section>
        )}

        <section id="breakdown" className="loc-section section" aria-labelledby="breakdown-title">
          <div className="container loc-split">
            <div className="loc-prose">
              <p className="eyebrow" data-reveal="">
                Roadside support
              </p>
              <h2 id="breakdown-title" className="h2" data-reveal="">
                {breakdown.h2}
              </h2>
              <p data-reveal="">{breakdown.body}</p>
              <dl className="loc-tips" data-reveal="">
                {breakdown.pay.map((p) => (
                  <div key={p.label}>
                    <dt>{p.label}</dt>
                    <dd>{p.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="loc-delivery">
              <ol className="loc-steps" aria-label="What happens when a cart breaks down" data-reveal="">
                {breakdown.steps.map((s, i) => (
                  <li key={s.when}>
                    <span className="loc-steps__dot" aria-hidden="true">
                      {i + 1}
                    </span>
                    <span className="loc-steps__when">{s.when}</span>
                    <span className="loc-steps__what">{s.what}</span>
                  </li>
                ))}
              </ol>
              <a className="btn btn--primary" {...newTab} href={whatsappUrl(roadsideMessage)} data-reveal="">
                <Icon name="chat" /> WhatsApp {business.phone}
              </a>
            </div>
          </div>
        </section>

        <section id="insurance" className="loc-section section loc-tight" aria-labelledby="insurance-title">
          <div className="container loc-split">
            <div className="loc-prose">
              <p className="eyebrow" data-reveal="">
                Liability
              </p>
              <h2 id="insurance-title" className="h2" data-reveal="">
                {insurance.h2}
              </h2>
              <p data-reveal="">
                <RichText text={insurance.body} />
              </p>
              <ul className="loc-links" aria-label="Related">
                <li>
                  <Link href={urls.terms} prefetch={false}>
                    {cap(links.terms)} <Icon name="arrow" />
                  </Link>
                </li>
              </ul>
            </div>
            <dl className="loc-tips" data-reveal="">
              {insurance.tips.map((t) => (
                <div key={t.label}>
                  <dt>{t.label}</dt>
                  <dd>{t.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="chassis" className="loc-section section loc-tight" aria-labelledby="chassis-title">
          <div className="container">
            <div className="section-head section-head--split">
              <div>
                <p className="eyebrow" data-reveal="">
                  Salt air
                </p>
                <h2 id="chassis-title" className="h2" data-reveal="">
                  {chassis.h2}
                </h2>
              </div>
              <p className="section-head__aside" data-reveal="">
                {chassis.body}
              </p>
            </div>
            <ol className="fleet-rust" aria-label="Steel and aluminum chassis on Ambergris Caye" data-reveal="">
              {chassis.timeline.map((t) => (
                <li key={t.when} className={t.steel ? 'is-steel' : 'is-aluminum'}>
                  <span className="fleet-rust__when">{t.when}</span>
                  <span className="fleet-rust__what">{t.what}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="renters" className="loc-section section fleet-renters" aria-labelledby="renters-title">
          <div className="container fleet-renters__inner">
            <p className="eyebrow" data-reveal="">
              The short version
            </p>
            <h2 id="renters-title" className="h2" data-reveal="">
              {renters.h2}
            </h2>
            <p className="fleet-renters__body" data-reveal="">
              {renters.body}
            </p>
            <ul className="loc-links" aria-label="Related">
              <li>
                <Link href={urls.rates} prefetch={false}>
                  {cap(links.rates)} <Icon name="arrow" />
                </Link>
              </li>
              <li>
                <Link href={urls.about} prefetch={false}>
                  {cap(links.about)} <Icon name="arrow" />
                </Link>
              </li>
              {!mechanic && (
                <li>
                  <Link href={urls.team} prefetch={false}>
                    {cap(links.team)} <Icon name="arrow" />
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </section>

        <FinalCta ctaLabel={cap(links.book)} />
      </main>
    </>
  );
}
