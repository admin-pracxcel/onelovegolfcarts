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
import {
  baggage,
  bze,
  cart,
  charter,
  choose,
  faq,
  flight,
  intro,
  links,
  marine,
  meta,
  practical,
  spr,
  waterTaxi,
  ways,
  whatsappTemplate,
  type Block,
} from '@/lib/pages/arrival';
import { arrivalGuideSchema, jsonLd } from '@/lib/schema';
import '@/styles/location.css';
import '@/styles/guide.css';

const PATH = '/getting-to-san-pedro-belize-arrival-guide/';
const CRUMB = 'Getting to San Pedro';
const HERO = 'golf-cart-tropic-air-terminal-san-pedro-airport';

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
    images: [{ url: imageInfo(HERO).src, alt: 'A One Love golf cart waiting outside the Tropic Air terminal at San Pedro Airport' }],
  },
  twitter: { card: 'summary_large_image' },
};

const NAV = [
  { id: 'ways', label: 'Three ways' },
  { id: 'flight', label: 'Flight' },
  { id: 'water-taxi', label: 'Water taxi' },
  { id: 'charter', label: 'Charter' },
  { id: 'choose', label: 'Which to choose' },
  { id: 'bze', label: 'Connecting at BZE' },
  { id: 'baggage', label: 'Baggage' },
  { id: 'spr', label: 'Landing at SPR' },
  { id: 'cart', label: 'Cart waiting' },
  { id: 'marine', label: 'Water taxi terminal' },
  { id: 'practical', label: 'Currency & SIM' },
  { id: 'faq', label: 'FAQ' },
];

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function Option({ id, eyebrow, h2, blocks, dark, tight }: { id: string; eyebrow: string; h2: string; blocks: Block[]; dark?: boolean; tight?: boolean }) {
  return (
    <section id={id} className={`loc-section section guide-option${dark ? ' guide-option--dark' : ''}${tight ? ' loc-tight' : ''}`} aria-labelledby={`${id}-title`}>
      <div className="container">
        <p className="eyebrow" data-reveal="">
          {eyebrow}
        </p>
        <h2 id={`${id}-title`} className="h2 guide-option__title" data-reveal="">
          {h2}
        </h2>
        <div className={`guide-blocks guide-blocks--${blocks.length}`}>
          {blocks.map((b) => (
            <div key={b.h3} className="guide-block" data-reveal="">
              <h3 className="guide-block__title">{b.h3}</h3>
              <p>{b.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ArrivalGuidePage() {
  const schema = arrivalGuideSchema({
    path: PATH,
    crumb: CRUMB,
    title: meta.h1,
    description: meta.description,
    image: imageInfo(HERO).src,
    published: meta.published,
    howTo: { name: 'How to have a golf cart waiting when you land in San Pedro', steps: cart.steps.map((s) => s.what) },
    faq,
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <main id="main" className="loc-page guide-page">
        <PageHeader trail={[{ name: CRUMB, path: PATH }]} eyebrow="Arrival guide" title={meta.h1} lead={intro}>
          <div className="container">
            <div className="loc-hero">
              <div className="loc-hero__main" data-reveal="clip">
                <Picture
                  name={HERO}
                  alt="A One Love golf cart parked outside the Tropic Air terminal at San Pedro Airport"
                  sizes="(min-width: 1000px) 62vw, 100vw"
                  priority
                />
              </div>
              <aside className="loc-hero__card" aria-label="Have a cart waiting" data-reveal="">
                <p className="loc-hero__kicker">Skip the taxi line</p>
                <p className="loc-hero__line">Send us your arrival flight number and we meet you at the terminal exit door.</p>
                <a className="btn btn--primary" href={whatsappUrl(whatsappTemplate)}>
                  <Icon name="chat" /> Send your arrival details
                </a>
                <Link className="link-arrow" href={urls.book} prefetch={false}>
                  {cap(links.book)} <Icon name="arrow" />
                </Link>
              </aside>
            </div>
          </div>
        </PageHeader>

        <SectionNav label="In this guide" items={NAV} cta={{ href: urls.book, label: 'Reserve' }} />

        <section id="ways" className="loc-section section" aria-labelledby="ways-title">
          <div className="container">
            <div className="section-head section-head--split">
              <div>
                <p className="eyebrow" data-reveal="">
                  No bridge to the mainland
                </p>
                <h2 id="ways-title" className="h2" data-reveal="">
                  {ways.h2}
                </h2>
              </div>
              <p className="section-head__aside" data-reveal="">
                {ways.body}
              </p>
            </div>
            <ol className="guide-ways">
              {ways.cards.map((w, i) => (
                <li key={w.id} className={`guide-way${i === 0 ? ' is-dark' : ''}`} data-reveal="">
                  <span className="guide-way__num" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="guide-way__name">{w.name}</h3>
                  <p className="guide-way__from">{w.from}</p>
                  {w.time && <p className="guide-way__time">{w.time}</p>}
                  <p className="guide-way__cost">{w.cost}</p>
                  <a className="guide-way__link" href={`#${w.id}`}>
                    Full breakdown <Icon name="arrow" />
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <Option tight id="flight" eyebrow="By air · 15 minutes" h2={flight.h2} blocks={flight.blocks} />
        <Option id="water-taxi" eyebrow="By sea · 75 to 90 minutes" h2={waterTaxi.h2} blocks={waterTaxi.blocks} dark />
        <Option id="charter" eyebrow="Plane or boat" h2={charter.h2} blocks={charter.blocks} />

        <section id="choose" className="loc-section section loc-tight" aria-labelledby="choose-title">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow" data-reveal="">
                By traveler
              </p>
              <h2 id="choose-title" className="h2" data-reveal="">
                {choose.h2}
              </h2>
            </div>
            <ul className="guide-matrix" data-reveal="">
              {choose.rows.map((r) => (
                <li key={r.who}>
                  <span className="guide-matrix__who">{r.who}</span>
                  <span className={`guide-matrix__pick${r.pick === 'Fly' ? ' is-fly' : ''}`}>{r.pick}</span>
                  {r.why && <span className="guide-matrix__why">{r.why}</span>}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="bze" className="loc-section section loc-tight" aria-labelledby="bze-title">
          <div className="container">
            <div className="section-head section-head--split">
              <div>
                <p className="eyebrow" data-reveal="">
                  International arrivals
                </p>
                <h2 id="bze-title" className="h2" data-reveal="">
                  {bze.h2}
                </h2>
              </div>
              <p className="section-head__aside" data-reveal="">
                {bze.body}
              </p>
            </div>
            <ol className="journey guide-journey" aria-label="From landing at BZE to your connection" data-reveal="">
              {bze.journey.map((j, i) => (
                <li key={j.place} className={`journey__stop${i === bze.journey.length - 1 ? ' is-end' : ''}`}>
                  <span className="journey__place">{j.place}</span>
                  <span className="journey__step">{j.step}</span>
                  {j.time && <span className="journey__time">{j.time}</span>}
                </li>
              ))}
            </ol>
            <p className="journey__total" data-reveal="">
              <Icon name="clock" /> {bze.waterTaxi}
            </p>
            <div className="guide-bze-foot">
              <dl className="loc-figures" data-reveal="">
                <div>
                  <dt>Allow at least</dt>
                  <dd>90 min</dd>
                </div>
                <div className="is-safe">
                  <dt>Safer on peak days</dt>
                  <dd>2 hours</dd>
                </div>
              </dl>
              <ul className="loc-links" aria-label="Related">
                <li>
                  <Link href={urls.bze} prefetch={false}>
                    {cap(links.bze)} <Icon name="arrow" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section id="baggage" className="loc-section section loc-tight" aria-labelledby="baggage-title">
          <div className="container loc-split">
            <div className="loc-prose">
              <p className="eyebrow" data-reveal="">
                Small aircraft
              </p>
              <h2 id="baggage-title" className="h2" data-reveal="">
                {baggage.h2}
              </h2>
              <p data-reveal="">{baggage.body}</p>
              <ul className="loc-links" aria-label="Related">
                <li>
                  <Link href={urls['6-seater']} prefetch={false}>
                    {cap(links.sixSeater)} <Icon name="arrow" />
                  </Link>
                </li>
              </ul>
            </div>
            <dl className="loc-figures" data-reveal="">
              <div>
                <dt>Base allowance</dt>
                <dd>30 lb</dd>
              </div>
              <div className="is-safe">
                <dt>Overage per pound</dt>
                <dd>$1–2</dd>
              </div>
            </dl>
          </div>
        </section>

        <section id="spr" className="loc-section loc-which" aria-labelledby="spr-title">
          <div className="container loc-which__inner">
            <div className="loc-which__media" data-reveal="clip">
              <Picture
                name="gallery-golf-carts-tropic-air-terminal"
                alt="Yellow and orange One Love golf carts parked outside the Tropic Air terminal at San Pedro Airport"
                sizes="(min-width: 1000px) 40vw, 100vw"
              />
            </div>
            <div className="loc-prose">
              <p className="eyebrow" data-reveal="">
                San Pedro Airport
              </p>
              <h2 id="spr-title" className="h2" data-reveal="">
                {spr.h2}
              </h2>
              <p data-reveal="">{spr.body}</p>
              <ul className="loc-links" aria-label="Related">
                <li>
                  <Link href={urls.spr} prefetch={false}>
                    {links.spr} <Icon name="arrow" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section id="cart" className="loc-section section loc-send" aria-labelledby="cart-title">
          <div className="container loc-send__inner">
            <div>
              <p className="eyebrow" data-reveal="">
                Free airport delivery
              </p>
              <h2 id="cart-title" className="h2" data-reveal="">
                {cart.h2}
              </h2>
              <h3 className="guide-sub" data-reveal="">
                {cart.how.h3}
              </h3>
              <p data-reveal="">{cart.how.body}</p>
              <h3 className="guide-sub" data-reveal="">
                {cart.timing.h3}
              </h3>
              <p data-reveal="">{cart.timing.body}</p>
              <ol className="loc-steps guide-steps" aria-label="Timeline for a cart waiting on arrival" data-reveal="">
                {cart.steps.map((s, i) => (
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
            <div className="loc-send__card" data-reveal="">
              <h3 className="loc-send__label">{cart.need.h3}</h3>
              <ul className="checklist">
                {cart.need.items.map((c) => (
                  <li key={c}>
                    <span aria-hidden="true">
                      <Icon name="check" />
                    </span>
                    {c}
                  </li>
                ))}
              </ul>
              <a className="btn btn--primary btn--block" href={whatsappUrl(whatsappTemplate)}>
                <Icon name="chat" /> Open a pre-filled message
              </a>
              <p className="loc-send__note">
                Or <Link href={urls.contact} prefetch={false}>{links.contact}</Link>.
              </p>
            </div>
          </div>
        </section>

        <section id="marine" className="loc-section section loc-tight" aria-labelledby="marine-title">
          <div className="container loc-split">
            <div className="loc-prose">
              <p className="eyebrow" data-reveal="">
                Arriving by boat
              </p>
              <h2 id="marine-title" className="h2" data-reveal="">
                {marine.h2}
              </h2>
              <p data-reveal="">{marine.body}</p>
            </div>
            <dl className="loc-tips" data-reveal="">
              {marine.tips.map((t) => (
                <div key={t.label}>
                  <dt>{t.label}</dt>
                  <dd>{t.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="practical" className="loc-section section loc-tight" aria-labelledby="practical-title">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow" data-reveal="">
                Before you land
              </p>
              <h2 id="practical-title" className="h2" data-reveal="">
                {practical.h2}
              </h2>
            </div>
            <div className="guide-practical">
              {practical.cards.map((c) => (
                <div key={c.name} className="guide-block" data-reveal="">
                  <p className="guide-practical__figure" aria-hidden="true">
                    {c.figure}
                  </p>
                  <h3 className="guide-block__title">{c.name}</h3>
                  <p>{c.body}</p>
                </div>
              ))}
            </div>
            <ul className="loc-links" aria-label="Related">
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
