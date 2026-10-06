import Link from 'next/link';
import { urls } from '@/lib/business';
import { intro } from '@/lib/content';
import { Icon } from '../Icon';

/** Definitional opening paragraph (AI-Overview-liftable). */
export function Intro() {
  return (
    <section className="intro section" aria-label="About One Love Golf Cart Rentals">
      <div className="container intro__grid">
        <div className="intro__aside" data-reveal="">
          <p className="eyebrow">Since 2017</p>
          <p className="intro__meta">
            Family-owned
            <br />
            Barrier Reef Drive
            <br />
            San Pedro Town
          </p>
        </div>
        <div className="intro__body">
          <p className="intro__lead" data-reveal="">
            {intro}
          </p>
          <Link className="link-arrow" href={urls.about} prefetch={false} data-reveal="">
            Our story, from grocery shop to island cart fleet <Icon name="arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}
