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
import { allow, connection, facts, faq, intro, links, meta, missed, send, which } from '@/lib/pages/belize-city-airport';
import { jsonLd, locationSchema } from '@/lib/schema';
import '@/styles/location.css';

const PATH = '/rentals-at-belize-city-airport/';
const TRAIL = [
  { name: 'Ambergris Caye', path: '/ambergris-caye/' },
  { name: 'Belize City Airport connections', path: PATH },
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
    images: [{ url: imageInfo('golf-cart-tropic-air-terminal-san-pedro-airport').src, alt: 'A One Love golf cart waiting outside the Tropic Air terminal at San Pedro Airport' }],
  },
  twitter: { card: 'summary_large_image' },
};

const NAV = [
  { id: 'connection', label: 'The connection' },
  { id: 'allow', label: 'Time to allow' },
  { id: 'send', label: 'What to send' },
  { id: 'missed', label: 'Missed flight' },
  { id: 'which', label: 'Which cart' },
  { id: 'faq', label: 'FAQ' },
];

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function BelizeCityAirportPage() {
  const schema = locationSchema({
    path: PATH,
    crumb: 'Belize City Airport connections',
    title: meta.h1,
    description: meta.description,
    serviceType: 'Golf cart pickup at San Pedro Airport for Belize City Airport connections',
    area: { '@type': 'Airport', name: 'San Pedro Airport', iataCode: 'SPR' },
    faq,
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <main id="main" className="loc-page">
        <PageHeader trail={TRAIL} eyebrow="Connecting from BZE" title={meta.h1} lead={intro}>
          <div className="container">
            <div className="loc-hero">
              <div className="loc-hero__main" data-reveal="clip">
                <Picture
                  name="golf-cart-tropic-air-terminal-san-pedro-airport"
                  alt="Red One Love golf cart waiting outside the Tropic Air terminal at San Pedro Airport, where connecting passengers from Belize City arrive"
                  sizes="(min-width: 1000px) 62vw, 100vw"
                  priority
                />
              </div>
              <aside className="loc-hero__card" aria-label="Book a connection pickup" data-reveal="">
                <p className="loc-hero__kicker">Two flights, one cart</p>
                <p className="loc-hero__line">Send us your BZE arrival flight and your connecting flight.</p>
                <a className="btn btn--primary" href={whatsappUrl(send.whatsappTemplate)}>
                  <Icon name="chat" /> Send both flights
                </a>
                <Link className="link-arrow" href={urls.book} prefetch={false}>
                  {cap(links.book)} <Icon name="arrow" />
                </Link>
              </aside>
            </div>
            <ul className="loc-facts" aria-label="Connection at a glance">
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

        <section id="connection" className="loc-section section" aria-labelledby="connection-title">
          <div className="container">
            <div className="section-head section-head--split">
              <div>
                <p className="eyebrow" data-reveal="">
                  BZE to SPR
                </p>
                <h2 id="connection-title" className="h2" data-reveal="">
                  {connection.h2}
                </h2>
              </div>
              <p className="section-head__aside" data-reveal="">
                {connection.body}
              </p>
            </div>
            <ol className="journey" aria-label="From landing at BZE to keys at SPR" data-reveal="">
              {connection.journey.map((j, i) => (
                <li key={j.step} className={`journey__stop${i === connection.journey.length - 1 ? ' is-end' : ''}`}>
                  <span className="journey__place">{j.place}</span>
                  <span className="journey__step">{j.step}</span>
                  {j.time && <span className="journey__time">{j.time}</span>}
                </li>
              ))}
            </ol>
            <p className="journey__total" data-reveal="">
              <Icon name="clock" /> {connection.total}
            </p>
          </div>
        </section>

        <section id="allow" className="loc-section section loc-allow" aria-labelledby="allow-title">
          <div className="container loc-split">
            <div className="loc-prose">
              <p className="eyebrow" data-reveal="">
                Layover
              </p>
              <h2 id="allow-title" className="h2" data-reveal="">
                {allow.h2}
              </h2>
              <p data-reveal="">{allow.body}</p>
            </div>
            <dl className="loc-figures" data-reveal="">
              <div>
                <dt>Minimum</dt>
                <dd>90 min</dd>
              </div>
              <div className="is-safe">
                <dt>Safer in peak waves</dt>
                <dd>2 hours</dd>
              </div>
            </dl>
          </div>
        </section>

        <section id="send" className="loc-send" aria-labelledby="send-title">
          <div className="container loc-send__inner" data-reveal="">
            <div>
              <h2 id="send-title" className="h2">
                {send.h2}
              </h2>
              <p>{send.body}</p>
            </div>
            <div className="loc-send__card">
              <p className="loc-send__label">One WhatsApp message</p>
              <ul className="checklist">
                {send.checklist.map((c) => (
                  <li key={c}>
                    <span aria-hidden="true">
                      <Icon name="check" />
                    </span>
                    {c}
                  </li>
                ))}
              </ul>
              <a className="btn btn--primary btn--block" href={whatsappUrl(send.whatsappTemplate)}>
                <Icon name="chat" /> Open a pre-filled message
              </a>
              <p className="loc-send__note">
                Prefer email or the phone?{' '}
                <Link href={urls.contact} prefetch={false}>
                  {cap(links.contact)}
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        <section id="missed" className="loc-section section" aria-labelledby="missed-title">
          <div className="container loc-split">
            <div className="loc-prose">
              <p className="eyebrow" data-reveal="">
                Plan B
              </p>
              <h2 id="missed-title" className="h2" data-reveal="">
                {missed.h2}
              </h2>
              <p data-reveal="">{missed.body}</p>
            </div>
            <div className="loc-plan" data-reveal="">
              {missed.options.map((o, i) => (
                <div key={o.title} className="loc-plan__option">
                  <span className="loc-plan__num" aria-hidden="true">
                    {i + 1}
                  </span>
                  <h3 className="loc-plan__title">{o.title}</h3>
                  <p>{o.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="which" className="loc-section loc-which" aria-labelledby="which-title">
          <div className="container loc-which__inner">
            <div className="loc-which__media" data-reveal="clip">
              <Picture
                name="navy-6-seater-golf-cart-rear-bench-profile"
                alt="Navy One Love 6-seater golf cart side profile showing the rear bench used for luggage"
                sizes="(min-width: 1000px) 40vw, 100vw"
              />
            </div>
            <div className="loc-prose">
              <p className="eyebrow" data-reveal="">
                Luggage
              </p>
              <h2 id="which-title" className="h2" data-reveal="">
                {which.h2}
              </h2>
              <p data-reveal="">{which.body}</p>
              <ul className="loc-links" aria-label="Related">
                <li>
                  <Link href={urls['6-seater']} prefetch={false}>
                    {cap(links.sixSeater)} <Icon name="arrow" />
                  </Link>
                </li>
                <li>
                  <Link href={urls.spr} prefetch={false}>
                    {cap(links.spr)} <Icon name="arrow" />
                  </Link>
                </li>
                <li>
                  <Link href={urls.arrival} prefetch={false}>
                    {cap(links.arrival)} <Icon name="arrow" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <Faq items={faq} />
        <FinalCta ctaLabel={cap(links.book)} />
      </main>
    </>
  );
}
