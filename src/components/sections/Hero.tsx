import Link from 'next/link';
import { business, urls, whatsappUrl } from '@/lib/business';
import { hero } from '@/lib/content';
import { Icon, Stars } from '../Icon';
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

      <ul className="trust" aria-label="Why guests trust One Love" tabIndex={0}>
        {hero.trust.map((item, i) => (
          <li key={item}>
            {i === 0 && <Stars />}
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
