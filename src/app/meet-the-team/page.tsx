import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon, Stars } from '@/components/Icon';
import { PageHeader } from '@/components/PageHeader';
import { Picture } from '@/components/Picture';
import { RichText } from '@/components/RichText';
import { FinalCta } from '@/components/sections/FinalCta';
import { business, urls, whatsappUrl, BOOKING_MESSAGE } from '@/lib/business';
import { reviews } from '@/lib/content';
import { imageInfo } from '@/lib/images';
import { credo, intro, links, meta, team } from '@/lib/pages/team';
import { plainText } from '@/lib/text';
import { jsonLd, teamSchema } from '@/lib/schema';
import '@/styles/location.css';
import '@/styles/about.css';
import '@/styles/team.css';

const PATH = '/meet-the-team/';
const TRAIL = [
  { name: 'About Us', path: urls.about },
  { name: 'Meet the Team', path: PATH },
];
const HERO = 'gallery-guests-golf-carts-san-pedro-street';

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
    images: [{ url: imageInfo(HERO).src, alt: 'Guests in a row of One Love golf carts on a San Pedro street' }],
  },
  twitter: { card: 'summary_large_image' },
};

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// Genuine reviews that name a team member (supports "our reviews mention names").
const named = reviews.filter((r) => /\bJunior\b/.test(r.text));

export default function TeamPage() {
  const schema = teamSchema({
    path: PATH,
    title: meta.h1,
    description: meta.description,
    people: team.map((p) => ({ id: p.id, name: p.name, role: p.role, image: p.photo ? imageInfo(p.photo).src : undefined })),
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <main id="main" className="loc-page team-page">
        <PageHeader trail={TRAIL} eyebrow="The people" title={meta.h1} lead={intro}>
          <div className="container">
            <div className="loc-hero">
              <div className="loc-hero__main" data-reveal="clip">
                <Picture
                  name={HERO}
                  alt="Guests sitting in a row of One Love golf carts parked on a San Pedro street"
                  sizes="(min-width: 1000px) 62vw, 100vw"
                  priority
                />
              </div>
              <aside className="loc-hero__card" aria-label="Talk to the team" data-reveal="">
                <p className="loc-hero__kicker">No call center</p>
                <p className="loc-hero__line">Come by the office at {business.street}, or message us.</p>
                <a className="btn btn--primary" href={whatsappUrl(BOOKING_MESSAGE)}>
                  <Icon name="chat" /> Message the team
                </a>
                <Link className="link-arrow" href={urls.book} prefetch={false}>
                  {cap(links.book)} <Icon name="arrow" />
                </Link>
              </aside>
            </div>
          </div>
        </PageHeader>

        {team.length > 0 && (
          <section id="team" className="family section" aria-labelledby="team-title">
            <div className="container">
              <div className="section-head">
                <p className="eyebrow" data-reveal="">
                  Who you will meet
                </p>
                <h2 id="team-title" className="h2" data-reveal="">
                  The team
                </h2>
              </div>
              <div className="family__grid">
                {team.map((p) => (
                  <article key={p.id} id={p.id} className="founder" data-reveal="">
                    {p.photo && (
                      <div className="founder__photo">
                        <Picture name={p.photo} alt={`${p.name}, ${p.role}, One Love Golf Cart Rentals`} sizes="(min-width: 1000px) 30vw, 90vw" />
                      </div>
                    )}
                    <h3 className="founder__name">{p.name}</h3>
                    <p className="founder__role">{p.role}</p>
                    <p className="founder__bio">
                      <RichText text={p.bio} />
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        <section id="how" className="loc-section section team-credo" aria-labelledby="how-title">
          <div className="container team-credo__inner">
            <div>
              <p className="eyebrow eyebrow--light" data-reveal="">
                Small team
              </p>
              <h2 id="how-title" className="h2" data-reveal="">
                {credo.h2}
              </h2>
              <p className="team-credo__body" data-reveal="">
                {credo.body}
              </p>
            </div>
            {named.length > 0 && (
              <div className="team-credo__reviews">
                <p className="team-credo__label" data-reveal="">
                  Names in our reviews
                </p>
                {named.map((r) => (
                  <figure key={r.author} className="team-quote" data-reveal="">
                    <Stars />
                    <blockquote>
                      <p>{plainText(r.text)}</p>
                    </blockquote>
                    <figcaption>
                      <cite>{r.author}</cite> <span>{r.source} review</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="loc-section team-links" aria-label="More about One Love">
          <div className="container">
            <ul className="loc-links">
              <li>
                <Link href={urls.about} prefetch={false}>
                  {cap(links.about)} <Icon name="arrow" />
                </Link>
              </li>
              <li>
                <Link href={urls.fleet} prefetch={false}>
                  {cap(links.fleet)} <Icon name="arrow" />
                </Link>
              </li>
              <li>
                <Link href={urls.contact} prefetch={false}>
                  {cap(links.contact)} <Icon name="arrow" />
                </Link>
              </li>
            </ul>
          </div>
        </section>

        <FinalCta ctaLabel={cap(links.book)} />
      </main>
    </>
  );
}
