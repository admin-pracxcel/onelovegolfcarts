import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon, Stars } from '@/components/Icon';
import { PageHeader } from '@/components/PageHeader';
import { Picture } from '@/components/Picture';
import { RichText } from '@/components/RichText';
import { BOOKING_MESSAGE, business, urls, whatsappUrl } from '@/lib/business';
import { imageInfo } from '@/lib/images';
import {
  beliefs,
  community,
  delivery,
  familyParagraph,
  fleet,
  founderBio,
  founders,
  getInTouch,
  intro,
  meta,
  story,
} from '@/lib/pages/about';
import { aboutSchema, jsonLd } from '@/lib/schema';
import '@/styles/about.css';

const TRAIL = [{ name: 'About Us', path: '/about-us/' }];

export const metadata: Metadata = {
  title: { absolute: meta.title },
  description: meta.description,
  alternates: { canonical: '/about-us/', languages: { 'en-US': '/about-us/', 'x-default': '/about-us/' } },
  openGraph: {
    type: 'website',
    siteName: business.name,
    title: meta.title,
    description: meta.description,
    url: '/about-us/',
    locale: 'en_US',
    images: [{ url: imageInfo('guests-luggage-golf-carts-village-mart').src, alt: 'Guests setting off in One Love golf carts in San Pedro, Belize' }],
  },
  twitter: { card: 'summary_large_image' },
};

export default function AboutPage() {
  const family = familyParagraph(founders);
  const storyParagraphs = family ? [...story.paragraphs.slice(0, 2), family, ...story.paragraphs.slice(2)] : story.paragraphs;
  const schema = aboutSchema(
    meta.title,
    meta.description,
    founders.map((f) => ({ ...f, image: f.photo ? imageInfo(f.photo).src : undefined })),
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <main id="main" className="about-page">
        <PageHeader trail={TRAIL} eyebrow="About us" title={meta.h1} lead={<RichText text={intro} />}>
          <div className="container">
            <div className="about-mosaic">
              <div className="about-mosaic__a" data-reveal="clip">
                <Picture
                  name="guests-luggage-golf-carts-village-mart"
                  alt="Guests with luggage setting off in a line of One Love golf carts outside Village Mart in San Pedro"
                  sizes="(min-width: 1000px) 60vw, 100vw"
                  priority
                />
              </div>
              <div className="about-mosaic__b" data-reveal="clip">
                <Picture
                  name="green-golf-cart-san-pedro-central-park"
                  alt="Green One Love golf cart parked beside the San Pedro town park"
                  sizes="(min-width: 1000px) 30vw, 50vw"
                />
              </div>
              <div className="about-mosaic__c" data-reveal="clip">
                <Picture
                  name="golf-cart-tropic-air-terminal-san-pedro-airport"
                  alt="Red One Love golf cart outside the Tropic Air terminal at San Pedro Airport"
                  sizes="(min-width: 1000px) 30vw, 50vw"
                />
              </div>
            </div>
            <ul className="about-facts" aria-label="One Love at a glance">
              <li data-reveal="">
                <strong>2017</strong>
                <span>Opened on Barrier Reef Drive</span>
              </li>
              <li data-reveal="">
                <strong>Family</strong>
                <span>Owned and run, no call center</span>
              </li>
              <li data-reveal="">
                <strong>
                  {business.rating.value} <Stars />
                </strong>
                <span>
                  {business.rating.count}+ reviews on {business.rating.source}
                </span>
              </li>
              <li data-reveal="">
                <strong>9am–9pm</strong>
                <span>Every day of the year</span>
              </li>
            </ul>
          </div>
        </PageHeader>

        <section className="story section" aria-labelledby="story-title">
          <div className="container story__grid">
            <div className="story__aside">
              <p className="eyebrow" data-reveal="">
                Since 2017
              </p>
              <h2 id="story-title" className="h2" data-reveal="">
                {story.h2}
              </h2>
              <ol className="timeline" aria-label="Milestones">
                {story.timeline.map((t) => (
                  <li key={t.when} data-reveal="">
                    <span className="timeline__when">{t.when}</span>
                    <span className="timeline__what">{t.what}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="story__body">
              {storyParagraphs.map((p, i) => (
                <div key={p.slice(0, 24)}>
                  <p className={i === 0 ? 'story__lead' : undefined} data-reveal="">
                    {p}
                  </p>
                  {i === 1 && (
                    <blockquote className="pull-quote" data-reveal="">
                      <p>{story.pullQuote}</p>
                    </blockquote>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {founders.length > 0 && (
          <section className="family section" aria-labelledby="family-title">
            <div className="container">
              <div className="section-head section-head--split">
                <div>
                  <p className="eyebrow" data-reveal="">
                    The people
                  </p>
                  <h2 id="family-title" className="h2" data-reveal="">
                    Meet the family
                  </h2>
                </div>
                <p className="section-head__aside" data-reveal="">
                  <Link href={urls.team} prefetch={false}>
                    Meet the full team
                  </Link>
                </p>
              </div>
              <div className="family__grid">
                {founders.map((f, i) => (
                  <article key={f.firstName} id={`founder-${i + 1}`} className="founder" data-reveal="">
                    {f.photo && (
                      <div className="founder__photo">
                        <Picture
                          name={f.photo}
                          alt={`${f.firstName} ${f.lastName}, ${f.role.toLowerCase()} of One Love Golf Cart Rentals`}
                          sizes="(min-width: 1000px) 30vw, 90vw"
                        />
                      </div>
                    )}
                    <h3 className="founder__name">
                      {f.firstName} {f.lastName}
                    </h3>
                    <p className="founder__role">{f.role}</p>
                    <p className="founder__bio">{founderBio(f)}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="beliefs section section--dark" aria-labelledby="beliefs-title">
          <div className="container">
            <div className="beliefs__head">
              <p className="eyebrow eyebrow--light" data-reveal="">
                How we run it
              </p>
              <h2 id="beliefs-title" className="h2" data-reveal="">
                {beliefs.h2}
              </h2>
              <p className="beliefs__intro" data-reveal="">
                {beliefs.intro}
              </p>
            </div>
            <ol className="beliefs__grid">
              {beliefs.principles.map((p, i) => (
                <li key={p.title} className="principle" data-reveal="">
                  <span className="principle__num" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="principle__title">{p.title}</h3>
                  <p>{p.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="about-fleet section" aria-labelledby="fleet-title">
          <div className="container about-fleet__grid">
            <div className="about-fleet__media" data-reveal="clip">
              <Picture
                name="one-love-fleet-lineup-under-palms"
                alt="Row of colourful lifted One Love golf carts lined up under palm trees in San Pedro"
                sizes="(min-width: 1000px) 50vw, 100vw"
              />
            </div>
            <div className="about-fleet__body">
              <p className="eyebrow" data-reveal="">
                Club Car, gas-powered
              </p>
              <h2 id="fleet-title" className="h2" data-reveal="">
                {fleet.h2}
              </h2>
              {fleet.paragraphs.map((p) => (
                <p key={p.slice(0, 24)} data-reveal="">
                  <RichText text={p} />
                </p>
              ))}
              <Link className="link-arrow" href={urls.carts} prefetch={false} data-reveal="">
                See our full fleet of Club Car golf carts <Icon name="arrow" />
              </Link>
            </div>
          </div>
        </section>

        <section className="about-delivery section" aria-labelledby="about-delivery-title">
          <div className="container about-delivery__inner">
            <div>
              <p className="eyebrow" data-reveal="">
                Free, island-wide
              </p>
              <h2 id="about-delivery-title" className="h2" data-reveal="">
                {delivery.h2}
              </h2>
            </div>
            <div>
              <p className="about-delivery__body" data-reveal="">
                <RichText text={delivery.body} />
              </p>
              <ul className="zone-chips" aria-label="Delivery locations" data-reveal="">
                {delivery.zones.map((z) => (
                  <li key={z.key}>
                    <Link href={urls[z.key]} prefetch={false}>
                      {z.label} <Icon name="arrow-ur" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="community section" aria-labelledby="community-title">
          <div className="container community__grid">
            <div className="community__body">
              <p className="eyebrow" data-reveal="">
                San Pedro, Ambergris Caye
              </p>
              <h2 id="community-title" className="h2" data-reveal="">
                {community.h2}
              </h2>
              <p data-reveal="">{community.body}</p>
            </div>
            <div className="community__media" data-reveal="clip">
              <Picture
                name="guests-golf-cart-convoy-beachfront-san-pedro"
                alt="Visitors driving One Love golf carts in a convoy along the beachfront street in San Pedro"
                sizes="(min-width: 1000px) 45vw, 100vw"
              />
            </div>
          </div>
        </section>

        <section className="touch section" aria-labelledby="touch-title">
          <div className="container touch__inner" data-reveal="">
            <div>
              <h2 id="touch-title" className="h2">
                {getInTouch.h2}
              </h2>
              <p className="touch__body">
                <RichText text={getInTouch.body} />
              </p>
            </div>
            <div className="touch__actions">
              <Link className="btn btn--primary btn--lg" href={urls.book} prefetch={false}>
                Reserve a cart <Icon name="arrow" />
              </Link>
              <a className="btn btn--outline btn--lg" href={whatsappUrl(BOOKING_MESSAGE)}>
                <Icon name="chat" /> WhatsApp <span className="nowrap">{business.phone}</span>
              </a>
              <Link className="link-arrow" href={urls.contact} prefetch={false}>
                All contact options <Icon name="arrow" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
