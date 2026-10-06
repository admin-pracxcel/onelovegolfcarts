import type { Metadata } from 'next';
import Link from 'next/link';
import { ContactForm } from '@/components/ContactForm';
import { Icon } from '@/components/Icon';
import { PageHeader } from '@/components/PageHeader';
import { RichText } from '@/components/RichText';
import { BOOKING_MESSAGE, business, urls, whatsappUrl } from '@/lib/business';
import { email, hours, intro, meta, office, phone, roadside, social, whatsapp } from '@/lib/pages/contact';
import { contactSchema, jsonLd } from '@/lib/schema';
import '@/styles/contact.css';

const TRAIL = [{ name: 'Contact', path: '/contact/' }];

export const metadata: Metadata = {
  title: { absolute: meta.title },
  description: meta.description,
  alternates: { canonical: '/contact/', languages: { 'en-US': '/contact/', 'x-default': '/contact/' } },
  openGraph: {
    type: 'website',
    siteName: business.name,
    title: meta.title,
    description: meta.description,
    url: '/contact/',
    locale: 'en_US',
    images: [{ url: '/img/og-golf-cart-rental-san-pedro-belize.jpg', width: 1200, height: 630, alt: 'One Love golf carts on the beachfront street in San Pedro, Belize' }],
  },
  twitter: { card: 'summary_large_image' },
};

// Manual: "embedded Google Map at coordinates 17.9178, -87.9631" (VERIFY pin).
const MAP_SRC = `https://maps.google.com/maps?q=${business.lat},${business.lng}&z=17&output=embed`;

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(contactSchema(meta.title, meta.description))} />
      <main id="main" className="contact-page">
        <PageHeader trail={TRAIL} eyebrow="Contact" title={meta.h1} lead={<RichText text={intro} />}>
          <div className="container channels">
            <section className="channel channel--whatsapp" aria-labelledby="whatsapp-title" data-reveal="">
              <div className="channel__top">
                <span className="channel__icon" aria-hidden="true">
                  <Icon name="chat" />
                </span>
                <span className="channel__badge">Fastest</span>
              </div>
              <h2 id="whatsapp-title" className="channel__title">
                {whatsapp.h2}
              </h2>
              <p className="channel__value">{business.phone}</p>
              <p className="channel__body">{whatsapp.body}</p>
              <a className="btn btn--primary btn--lg" href={whatsappUrl(BOOKING_MESSAGE)}>
                {whatsapp.cta} <Icon name="arrow" />
              </a>
            </section>

            <section className="channel" aria-labelledby="call-title" data-reveal="">
              <span className="channel__icon" aria-hidden="true">
                <Icon name="phone" />
              </span>
              <h2 id="call-title" className="channel__title">
                {phone.h2}
              </h2>
              <p className="channel__value">{business.phone}</p>
              <p className="channel__body">{phone.body}</p>
              <a className="btn btn--dark" href={business.phoneHref}>
                <Icon name="phone" /> {phone.cta}
              </a>
            </section>

            <aside className="channel channel--links" aria-label="Before you message" data-reveal="">
              <p className="channel__kicker">Before you message</p>
              <ul>
                <li>
                  <Link href={urls.rates} prefetch={false}>
                    Rates before you message <Icon name="arrow" />
                  </Link>
                </li>
                <li>
                  <Link href={urls.book} prefetch={false}>
                    Book a cart now <Icon name="arrow" />
                  </Link>
                </li>
                <li>
                  <Link href={urls.spr} prefetch={false}>
                    Get a cart delivered to the airport instead <Icon name="arrow" />
                  </Link>
                </li>
              </ul>
            </aside>
          </div>
        </PageHeader>

        <section className="roadside" aria-labelledby="roadside-title">
          <div className="container roadside__inner" data-reveal="">
            <div className="roadside__label">
              <span className="roadside__dot" aria-hidden="true" />
              <h2 id="roadside-title" className="roadside__title">
                {roadside.title}
              </h2>
            </div>
            <div className="roadside__body">
              <p className="roadside__number">
                <a href={whatsappUrl('Roadside support needed. My location: ')}>{business.phone}</a>
                <span>WhatsApp preferred</span>
              </p>
              <p>{roadside.body}</p>
              <Link className="link-arrow" href={urls.fleet} prefetch={false}>
                How we handle roadside issues <Icon name="arrow" />
              </Link>
            </div>
          </div>
        </section>

        <section className="email section" aria-labelledby="email-title">
          <div className="container email__grid">
            <div>
              <p className="eyebrow" data-reveal="">
                Write to us
              </p>
              <h2 id="email-title" className="h2" data-reveal="">
                {email.h2}
              </h2>
              <p className="email__address" data-reveal="">
                <a href={`mailto:${business.email}`}>
                  <Icon name="mail" />
                  {business.email}
                </a>
              </p>
              <p className="email__body" data-reveal="">
                {email.body}
              </p>
            </div>
            <div className="form-card" data-reveal="">
              <ContactForm />
            </div>
          </div>
        </section>

        <section className="office section" aria-labelledby="office-title">
          <div className="container office__grid">
            <div className="office__map" data-reveal="clip">
              <iframe
                src={MAP_SRC}
                title="Map: One Love Golf Cart Rentals, 1 Barrier Reef Drive, San Pedro Town"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <a className="office__open-map" href={business.mapsUrl}>
                Open in Google Maps <Icon name="arrow-ur" />
              </a>
            </div>
            <div className="office__body">
              <p className="eyebrow" data-reveal="">
                Find us
              </p>
              <h2 id="office-title" className="h2" data-reveal="">
                {office.h2}
              </h2>
              <address className="office__address" data-reveal="">
                {office.body}
              </address>
              <ol className="directions">
                {office.directions.map((d, i) => (
                  <li key={d.from} className="direction" data-reveal="">
                    <span className="direction__num" aria-hidden="true">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="direction__from">{d.from}</h3>
                      <p>{d.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="contact-extra section" aria-label="Hours and social media">
          <div className="container contact-extra__grid">
            <div className="extra-card" data-reveal="">
              <span className="extra-card__icon" aria-hidden="true">
                <Icon name="clock" />
              </span>
              <h2 className="extra-card__title">{hours.h2}</h2>
              <p className="extra-card__big">9 am – 9 pm</p>
              <p className="extra-card__sub">Seven days a week</p>
              <p className="extra-card__body">{hours.body}</p>
            </div>
            <div className="extra-card extra-card--social" data-reveal="">
              <h2 className="extra-card__title">{social.h2}</h2>
              <ul className="socials">
                {social.items.map((s) => (
                  <li key={s.key}>
                    <a href={business.social[s.key]} rel="noopener">
                      <span className="socials__name">{s.name}</span>
                      <span className="socials__meta">
                        {s.handle}
                        {s.handle && s.note ? '. ' : ''}
                        {s.note}
                      </span>
                      <Icon name="arrow-ur" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
