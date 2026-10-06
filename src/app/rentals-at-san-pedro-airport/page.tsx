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
import { delay, facts, faq, how, intro, links, meet, meta, send, which } from '@/lib/pages/san-pedro-airport';
import { jsonLd, locationSchema } from '@/lib/schema';
import '@/styles/location.css';

const PATH = '/rentals-at-san-pedro-airport/';
const TRAIL = [
  { name: 'Ambergris Caye', path: '/ambergris-caye/' },
  { name: 'San Pedro Airport', path: PATH },
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
    images: [{ url: imageInfo('golf-cart-tropic-air-terminal-san-pedro-airport').src, alt: 'A One Love golf cart outside the Tropic Air terminal at San Pedro Airport' }],
  },
  twitter: { card: 'summary_large_image' },
};

const NAV = [
  { id: 'how', label: 'How it works' },
  { id: 'send', label: 'What to send' },
  { id: 'meet', label: 'Meeting point' },
  { id: 'delay', label: 'Delays' },
  { id: 'which', label: 'Which cart' },
  { id: 'faq', label: 'FAQ' },
];

export default function SanPedroAirportPage() {
  const schema = locationSchema({
    path: PATH,
    crumb: 'San Pedro Airport',
    title: meta.h1,
    description: meta.description,
    serviceType: 'Golf Cart Delivery to San Pedro Airport',
    area: { '@type': 'Airport', name: 'San Pedro Airport', iataCode: 'SPR' },
    faq,
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <main id="main" className="loc-page">
        <PageHeader trail={TRAIL} eyebrow="Airport delivery" title={meta.h1} lead={intro}>
          <div className="container">
            <div className="loc-hero">
              <div className="loc-hero__main" data-reveal="clip">
                <Picture
                  name="golf-cart-tropic-air-terminal-san-pedro-airport"
                  alt="Red lifted One Love golf cart parked outside the Tropic Air terminal at San Pedro Airport"
                  sizes="(min-width: 1000px) 62vw, 100vw"
                  priority
                />
              </div>
              <aside className="loc-hero__card" aria-label="Book airport delivery" data-reveal="">
                <p className="loc-hero__kicker">Landing soon?</p>
                <p className="loc-hero__line">Send us your flight number and arrival time the day before.</p>
                <a className="btn btn--primary" href={whatsappUrl(send.whatsappTemplate)}>
                  <Icon name="chat" /> Send flight details
                </a>
                <Link className="link-arrow" href={urls.book} prefetch={false}>
                  {links.book.charAt(0).toUpperCase() + links.book.slice(1)} <Icon name="arrow" />
                </Link>
              </aside>
            </div>
            <ul className="loc-facts" aria-label="Airport delivery at a glance">
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

        <section id="how" className="loc-section section" aria-labelledby="how-title">
          <div className="container loc-split">
            <div className="loc-prose">
              <p className="eyebrow" data-reveal="">
                Step by step
              </p>
              <h2 id="how-title" className="h2" data-reveal="">
                {how.h2}
              </h2>
              <p data-reveal="">{how.body}</p>
            </div>
            <ol className="loc-steps" aria-label="Airport delivery timeline" data-reveal="">
              {how.steps.map((s, i) => (
                <li key={s.when}>
                  <span className="loc-steps__dot" aria-hidden="true">
                    {i + 1}
                  </span>
                  <span className="loc-steps__when">{s.when}</span>
                  <span className="loc-steps__what">{s.what}</span>
                </li>
              ))}
            </ol>
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
                Prefer email or the phone? See{' '}
                <Link href={urls.contact} prefetch={false}>
                  {links.contact}
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        <section id="meet" className="loc-section section" aria-labelledby="meet-title">
          <div className="container loc-split loc-split--media">
            <div className="loc-gallery" data-reveal="">
              <div className="loc-gallery__a">
                <Picture
                  name="gallery-golf-carts-tropic-air-terminal"
                  alt="Yellow and orange golf carts parked outside the Tropic Air terminal at San Pedro Airport"
                  sizes="(min-width: 1000px) 30vw, 60vw"
                />
              </div>
              <div className="loc-gallery__b">
                <Picture
                  name="guests-luggage-golf-carts-village-mart"
                  alt="Guests with luggage loaded onto a line of One Love golf carts in San Pedro"
                  sizes="(min-width: 1000px) 22vw, 40vw"
                />
              </div>
            </div>
            <div className="loc-prose">
              <p className="eyebrow" data-reveal="">
                Meeting point
              </p>
              <h2 id="meet-title" className="h2" data-reveal="">
                {meet.h2}
              </h2>
              <p data-reveal="">{meet.body}</p>
            </div>
          </div>
        </section>

        <section id="delay" className="loc-callout" aria-labelledby="delay-title">
          <div className="container loc-callout__inner" data-reveal="">
            <span className="loc-callout__icon" aria-hidden="true">
              <Icon name="clock" />
            </span>
            <div>
              <h2 id="delay-title" className="loc-callout__title">
                {delay.h2}
              </h2>
              <p>{delay.body}</p>
            </div>
          </div>
        </section>

        <section id="which" className="loc-section section" aria-labelledby="which-title">
          <div className="container">
            <div className="section-head section-head--split">
              <div>
                <p className="eyebrow" data-reveal="">
                  Luggage
                </p>
                <h2 id="which-title" className="h2" data-reveal="">
                  {which.h2}
                </h2>
              </div>
              <p className="section-head__aside" data-reveal="">
                {which.body}
              </p>
            </div>
            <div className="loc-options">
              {which.options.map((o) => (
                <div key={o.cart} className={`loc-option${o.best ? ' is-best' : ''}`} data-reveal="">
                  <div className="loc-option__head">
                    <h3 className="loc-option__cart">{o.cart}</h3>
                    <p className="loc-option__price">{o.price}</p>
                  </div>
                  <ul>
                    {o.fits.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="loc-option loc-option--photo" data-reveal="">
                <Picture
                  name="navy-6-seater-golf-cart-rear-bench-profile"
                  alt="Navy One Love 6-seater golf cart side profile showing the rear bench used for luggage"
                  sizes="(min-width: 1000px) 30vw, 90vw"
                />
              </div>
            </div>
            <ul className="loc-links" aria-label="Related">
              <li>
                <Link href={urls['6-seater']} prefetch={false}>
                  {links.sixSeater.charAt(0).toUpperCase() + links.sixSeater.slice(1)} <Icon name="arrow" />
                </Link>
              </li>
              <li>
                <Link href={urls.rates} prefetch={false}>
                  {links.rates.charAt(0).toUpperCase() + links.rates.slice(1)} <Icon name="arrow" />
                </Link>
              </li>
              <li>
                <Link href={urls.arrival} prefetch={false}>
                  {links.arrival.charAt(0).toUpperCase() + links.arrival.slice(1)} <Icon name="arrow" />
                </Link>
              </li>
              <li>
                <Link href={urls.bze} prefetch={false}>
                  {links.bze} <Icon name="arrow" />
                </Link>
              </li>
            </ul>
          </div>
        </section>

        <Faq items={faq} />
        <FinalCta ctaLabel={links.book.charAt(0).toUpperCase() + links.book.slice(1)} />
      </main>
    </>
  );
}
