import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { PageHeader } from '@/components/PageHeader';
import { FinalCta } from '@/components/sections/FinalCta';
import { business } from '@/lib/business';
import { groups, meta } from '@/lib/pages/locations';
import { jsonLd, locationsSchema } from '@/lib/schema';
import '@/styles/locations.css';

const PATH = '/locations/';
const TRAIL = [{ name: 'Locations', path: PATH }];

export const metadata: Metadata = {
  title: { absolute: meta.title },
  description: meta.description,
  alternates: { canonical: PATH, languages: { 'en-US': PATH, 'x-default': PATH } },
  openGraph: { type: 'website', siteName: business.name, title: meta.title, description: meta.description, url: PATH, locale: 'en_US' },
  twitter: { card: 'summary_large_image' },
};

export default function LocationsPage() {
  const schema = locationsSchema({
    path: PATH,
    trail: TRAIL,
    title: meta.title,
    description: meta.description,
    items: groups.flatMap((g) => g.items.map((i) => ({ name: i.name, path: i.href }))),
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <main id="main">
        <PageHeader trail={TRAIL} eyebrow="Where we deliver" title={meta.h1} />

        {groups.map((g) => (
          <section key={g.id} id={g.id} className="locs section" aria-labelledby={`${g.id}-title`}>
            <div className="container">
              <h2 id={`${g.id}-title`} className="h2" data-reveal="">
                {g.label}
              </h2>
              <ul className="locs__grid">
                {g.items.map((i) => (
                  <li key={i.href} className="locs__card" data-reveal="">
                    <h3 className="locs__name">
                      <Link href={i.href} prefetch={false}>
                        {i.name}
                      </Link>
                    </h3>
                    <p>{i.text}</p>
                    <span className="locs__more" aria-hidden="true">
                      View page <Icon name="arrow" />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}

        <FinalCta />
      </main>
    </>
  );
}
