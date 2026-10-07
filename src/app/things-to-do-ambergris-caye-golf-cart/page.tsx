import type { Metadata } from 'next';
import Link from 'next/link';
import { AreaFilter } from '@/components/AreaFilter';
import { Icon } from '@/components/Icon';
import { PageHeader } from '@/components/PageHeader';
import { Picture } from '@/components/Picture';
import { SectionNav } from '@/components/SectionNav';
import { Faq } from '@/components/sections/Faq';
import { FinalCta } from '@/components/sections/FinalCta';
import { business, urls } from '@/lib/business';
import { imageInfo } from '@/lib/images';
import { AREAS, faq, family, foodie, intro, itineraries, links, meta, snorkel, stops, stopsH2, sunset, why, type Area } from '@/lib/pages/things-to-do';
import { jsonLd, thingsToDoSchema } from '@/lib/schema';
import '@/styles/location.css';
import '@/styles/guide.css';
import '@/styles/things-to-do.css';

const PATH = '/things-to-do-ambergris-caye-golf-cart/';
const CRUMB = 'Things to Do';
const HERO = 'green-golf-cart-san-pedro-central-park';

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
    images: [{ url: imageInfo(HERO).src, alt: 'A One Love golf cart parked beside San Pedro Central Park' }],
  },
  twitter: { card: 'summary_large_image' },
};

const NAV = [
  { id: 'why', label: 'Why by cart' },
  { id: 'stops', label: 'The stops' },
  { id: 'itineraries', label: 'Itineraries' },
  { id: 'sunset', label: 'Sunset drives' },
  { id: 'snorkel', label: 'Snorkel & dive' },
  { id: 'family', label: 'Family loops' },
  { id: 'foodie', label: 'Foodie loops' },
  { id: 'faq', label: 'FAQ' },
];

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const areaKeys = Object.keys(AREAS) as Area[];

function More({ items }: { items: { href: string; label: string }[] }) {
  return (
    <ul className="loc-links" aria-label="Related guides">
      {items.map((l) => (
        <li key={l.href}>
          <Link href={l.href} prefetch={false}>
            {cap(l.label)} <Icon name="arrow" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function ThingsToDoPage() {
  const schema = thingsToDoSchema({
    path: PATH,
    crumb: CRUMB,
    title: meta.h1,
    description: meta.description,
    image: imageInfo(HERO).src,
    published: meta.published,
    stops,
    faq,
  });
  const counts = Object.fromEntries(areaKeys.map((a) => [a, stops.filter((s) => s.area === a).length]));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <main id="main" className="loc-page guide-page ttd-page">
        <PageHeader trail={[{ name: CRUMB, path: PATH }]} eyebrow="Local guide" title={meta.h1} lead={intro}>
          <div className="container">
            <div className="loc-hero">
              <div className="loc-hero__main" data-reveal="clip">
                <Picture
                  name={HERO}
                  alt="Green One Love 4-seater golf cart parked beside San Pedro Central Park under a flamboyant tree"
                  sizes="(min-width: 1000px) 62vw, 100vw"
                  priority
                />
              </div>
              <aside className="loc-hero__card" aria-label="Plan your days" data-reveal="">
                <p className="loc-hero__kicker">Bridge passes included</p>
                <p className="loc-hero__line">Every stop below is reachable by cart.</p>
                <Link className="btn btn--primary" href={urls.book} prefetch={false}>
                  {cap(links.book)} <Icon name="arrow" />
                </Link>
                <Link className="link-arrow" href={urls.carts} prefetch={false}>
                  {cap(links.carts)} <Icon name="arrow" />
                </Link>
              </aside>
            </div>
            <ul className="loc-facts" aria-label="This guide at a glance">
              <li data-reveal="">
                <strong>{stops.length}</strong>
                <span>stops worth the drive</span>
              </li>
              <li data-reveal="">
                <strong>3</strong>
                <span>itineraries: a day, a weekend, a week</span>
              </li>
              <li data-reveal="">
                <strong>25 min</strong>
                <span>from town to Secret Beach</span>
              </li>
              <li data-reveal="">
                <strong>~25 miles</strong>
                <span>long, and all of it by cart</span>
              </li>
            </ul>
          </div>
        </PageHeader>

        <SectionNav label="In this guide" items={NAV} cta={{ href: urls.book, label: 'Reserve' }} />

        <section id="why" className="loc-section section" aria-labelledby="why-title">
          <div className="container loc-split loc-split--media">
            <div className="loc-prose">
              <p className="eyebrow" data-reveal="">
                Getting around
              </p>
              <h2 id="why-title" className="h2" data-reveal="">
                {why.h2}
              </h2>
              <p data-reveal="">{why.body}</p>
            </div>
            <div className="ttd-photo" data-reveal="clip">
              <Picture
                name="camo-golf-cart-colourful-san-pedro-street"
                alt="Lifted golf cart parked outside a yellow and lime-green building on a San Pedro street"
                sizes="(min-width: 1000px) 42vw, 100vw"
              />
            </div>
          </div>
        </section>

        <section id="stops" className="loc-section section loc-tight" aria-labelledby="stops-title">
          <div className="container">
            <div className="section-head section-head--split">
              <div>
                <p className="eyebrow" data-reveal="">
                  North to south
                </p>
                <h2 id="stops-title" className="h2" data-reveal="">
                  {stopsH2}
                </h2>
              </div>
              <AreaFilter target="stops-grid" areas={areaKeys.map((a) => [a, AREAS[a]])} counts={counts} />
            </div>
            <ol id="stops-grid" className="ttd-stops" data-area="all">
              {stops.map((s, i) => (
                <li key={s.id} id={s.id} className={`ttd-stop ttd-stop--${s.area}`} data-area={s.area}>
                  <div className="ttd-stop__head">
                    <span className="ttd-stop__num" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="ttd-stop__area">{AREAS[s.area]}</span>
                  </div>
                  <h3 className="ttd-stop__name">{s.name}</h3>
                  <p>{s.body}</p>
                </li>
              ))}
            </ol>
            <More
              items={[
                { href: urls['secret-beach'], label: links.secretBeach },
                { href: urls.north, label: links.north },
                { href: urls['san-pedro'], label: links.exploring },
              ]}
            />
          </div>
        </section>

        <section id="itineraries" className="loc-section section guide-option guide-option--dark" aria-labelledby="itin-title">
          <div className="container">
            <p className="eyebrow" data-reveal="">
              Plans that work
            </p>
            <h2 id="itin-title" className="h2 guide-option__title" data-reveal="">
              {itineraries.h2}
            </h2>
            <div className="ttd-itins">
              {itineraries.items.map((it) => (
                <article key={it.h3} className="ttd-itin" data-reveal="">
                  <h3 className="ttd-itin__title">{it.h3}</h3>
                  {it.plan.map((d, i) => (
                    <div key={d.label ?? i} className="ttd-itin__day">
                      {d.label && <p className="ttd-itin__label">{d.label}</p>}
                      <ol>
                        {d.items.map((x) => (
                          <li key={x}>{x}</li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </article>
              ))}
            </div>
            <div className="ttd-on-dark">
              <More items={[{ href: urls.weekend, label: links.weekend }]} />
            </div>
          </div>
        </section>

        <section id="sunset" className="loc-section section" aria-labelledby="sunset-title">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow" data-reveal="">
                Golden hour
              </p>
              <h2 id="sunset-title" className="h2" data-reveal="">
                {sunset.h2}
              </h2>
            </div>
            <ol className="ttd-routes">
              {sunset.routes.map((r, i) => (
                <li key={r.name} className="ttd-route" data-reveal="">
                  <span className="ttd-route__num">Route {i + 1}</span>
                  <h3 className="ttd-route__name">{r.name}</h3>
                  <p className="ttd-route__time">{r.time}</p>
                  <p>{r.body}</p>
                </li>
              ))}
            </ol>
            <More
              items={[
                { href: urls.perseid, label: links.perseid },
                { href: urls['night-fishing'], label: links.nightFishing },
              ]}
            />
          </div>
        </section>

        <section id="snorkel" className="loc-section section loc-tight" aria-labelledby="snorkel-title">
          <div className="container loc-split">
            <div className="loc-prose">
              <p className="eyebrow" data-reveal="">
                On the reef
              </p>
              <h2 id="snorkel-title" className="h2" data-reveal="">
                {snorkel.h2}
              </h2>
              <p data-reveal="">{snorkel.body}</p>
            </div>
            <div>
              <dl className="loc-tips" data-reveal="">
                {snorkel.shops.map((t) => (
                  <div key={t.label}>
                    <dt>{t.label}</dt>
                    <dd>{t.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="journey__total" data-reveal="">
                <Icon name="clock" /> Morning boats leave between 8 and 9 am for Hol Chan Marine Reserve and Shark Ray Alley.
              </p>
            </div>
          </div>
        </section>

        <section id="family" className="loc-section section" aria-labelledby="family-title">
          <div className="container">
            <div className="section-head section-head--split">
              <div>
                <p className="eyebrow" data-reveal="">
                  With kids
                </p>
                <h2 id="family-title" className="h2" data-reveal="">
                  {family.h2}
                </h2>
              </div>
              <p className="section-head__aside" data-reveal="">
                {family.note}
              </p>
            </div>
            <div className="ttd-loops ttd-loops--3">
              {family.loops.map((l) => (
                <article key={l.name} className="ttd-loop" data-reveal="">
                  <p className="ttd-loop__when">{l.when}</p>
                  <h3 className="ttd-loop__name">{l.name}</h3>
                  <ol>
                    {l.stops.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ol>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="foodie" className="loc-section section loc-tight" aria-labelledby="foodie-title">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow" data-reveal="">
                Eat your way around
              </p>
              <h2 id="foodie-title" className="h2" data-reveal="">
                {foodie.h2}
              </h2>
            </div>
            <div className="ttd-loops ttd-loops--4">
              {foodie.loops.map((l) => (
                <article key={l.name} className="ttd-loop ttd-loop--food" data-reveal="">
                  <h3 className="ttd-loop__name">{l.name}</h3>
                  <ol>
                    {l.stops.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ol>
                </article>
              ))}
            </div>
            <More items={[{ href: urls['lobster-crawl'], label: links.lobster }]} />
          </div>
        </section>

        <Faq items={faq} />
        <FinalCta ctaLabel={cap(links.book)} />
      </main>
    </>
  );
}
