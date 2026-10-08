import Link from 'next/link';
import { business, urls, whatsappUrl } from '@/lib/business';
import { hero } from '@/lib/content';
import taBadges from '@/lib/tripadvisor-badges.json';
import { Icon } from '../Icon';
import { TrustStrip } from '../TrustStrip';
import { Picture } from '../Picture';

export const HERO_IMAGE = 'guests-golf-cart-convoy-beachfront-san-pedro' as const;
export const HERO_SIZES = 'calc(100vw - 24px)';

export function Hero() {
  const { rates } = business;
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__frame">
        <div className="hero__media">
          <Picture
            name={HERO_IMAGE}
            alt="Visitors driving One Love golf carts in a convoy along the beachfront street in San Pedro, Ambergris Caye, under palm trees and blue sky"
            sizes={HERO_SIZES}
            className="hero__img"
            priority
          />
        </div>

        <div className="hero__content">
          <p className="eyebrow eyebrow--light hero__eyebrow" data-reveal="">
            {hero.eyebrow}
          </p>
          <h1 id="hero-title" className="hero__title">
            <span className="hero__line">
              <span>{hero.h1[0]}</span>
            </span>{' '}
            <span className="hero__line">
              <span>{hero.h1[1]}</span>
            </span>
          </h1>
          <p className="hero__sub" data-reveal="">
            {hero.subhead}
          </p>
          <div className="hero__ctas" data-reveal="">
            <Link className="btn btn--primary btn--lg" href={urls.book} prefetch={false}>
              Book now <Icon name="arrow" />
            </Link>
            <Link className="btn btn--glass btn--lg" href={urls.rates} prefetch={false}>
              See rates
            </Link>
          </div>
          <p className="hero__contact" data-reveal="">
            Or message us:{' '}
            <a href={whatsappUrl()}>
              <Icon name="chat" />
              WhatsApp
            </a>
            <span aria-hidden="true">·</span>
            <a href={business.phoneHref}>{business.phone}</a>
          </p>
        </div>

        <div className="hero__side">
          {/* One Love's TripAdvisor badges, captured from TripAdvisor's live
              widgets by `pnpm badges` (see scripts/tripadvisor-badges.mjs). */}
          <a className="hero__badges" href={business.rating.url} rel="noopener" data-reveal="">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="hero__award" src="/img/tripadvisor-award.webp" width={1199} height={880} alt="Tripadvisor Travelers' Choice Awards 2025" />
            {[taBadges.bravo, taBadges.recommended].map((b) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={b.src} src={b.src} width={b.width} height={b.height} alt={`Tripadvisor badge: ${b.text}`} style={{ flexGrow: b.width / b.height }} />
            ))}
          </a>

        <aside className="hero__rates" aria-label="Starting daily rates" data-reveal="">
          <p className="hero__rates-title">
            Daily rates <span>USD</span>
          </p>
          <dl>
            {(['4-seater', '6-seater'] as const).map((k) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>
                  <span className="hero__from">from</span> ${rates[k].day}
                  <small>/day</small>
                </dd>
              </div>
            ))}
          </dl>
          <p className="hero__rates-note">Free delivery &amp; pickup. Unlimited bridge passes.</p>
        </aside>
        </div>
      </div>

      <TrustStrip items={hero.trust} label="Why guests trust One Love" />
    </section>
  );
}
