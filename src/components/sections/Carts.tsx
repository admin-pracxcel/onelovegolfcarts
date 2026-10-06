import Link from 'next/link';
import { urls } from '@/lib/business';
import { carts } from '@/lib/content';
import { Icon } from '../Icon';
import { Picture } from '../Picture';

export function Carts() {
  return (
    <section className="carts section" id="carts" aria-labelledby="carts-title">
      <div className="container">
        <div className="section-head section-head--split">
          <div>
            <p className="eyebrow" data-reveal="">
              The fleet
            </p>
            <h2 id="carts-title" className="h2" data-reveal="">
              Choose your cart. <span className="muted">Four seats or six.</span>
            </h2>
          </div>
          <p className="section-head__aside" data-reveal="">
            Rent the{' '}
            <Link href={urls['4-seater']} prefetch={false}>
              4-seater golf cart from $35 a day
            </Link>{' '}
            or the{' '}
            <Link href={urls['6-seater']} prefetch={false}>
              6-seater golf cart for groups and families
            </Link>
            . Not sure? See{' '}
            <Link href={urls.compare} prefetch={false}>
              which cart is right for your group
            </Link>
            .
          </p>
        </div>

        <div className="carts__grid" data-rail="">
          {carts.map((cart, i) => (
            <article key={cart.id} className={`cart cart--${cart.id}`} aria-labelledby={`cart-${cart.id}`} data-reveal="">
              <Link className="cart__media" href={urls[cart.id]} prefetch={false} tabIndex={-1} aria-hidden="true">
                <Picture name={cart.image} alt={cart.alt} sizes="(min-width: 1100px) 640px, (min-width: 700px) 50vw, 86vw" />
                {i === 0 && <span className="tag tag--sun">Most rented</span>}
              </Link>
              <div className="cart__body">
                <div className="cart__head">
                  <h3 className="cart__name" id={`cart-${cart.id}`}>
                    {cart.name}
                  </h3>
                  <p className="cart__seats">
                    <span className="seats" aria-hidden="true">
                      {Array.from({ length: cart.seats }, (_, n) => (
                        <i key={n} />
                      ))}
                    </span>
                    <span>{cart.seats} seats</span>
                  </p>
                </div>
                <dl className="cart__price">
                  <div className="cart__price-day">
                    <dt>From</dt>
                    <dd>
                      <span className="cur">$</span>
                      {cart.day}
                      <span className="per">/day</span>
                    </dd>
                  </div>
                  <div className="cart__price-week">
                    <dt>Weekly</dt>
                    <dd>
                      ${cart.week}
                      <span className="per">/week</span>
                    </dd>
                  </div>
                  <div className="cart__price-best">
                    <dt>Best for</dt>
                    <dd>{cart.best}</dd>
                  </div>
                </dl>
                <p className="cart__copy">{cart.body}</p>
                <Link className="btn btn--dark" href={urls[cart.id]} prefetch={false}>
                  {cart.cta} <Icon name="arrow" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <p className="carts__foot" data-reveal="">
          Prices in US dollars. Free delivery and unlimited bridge passes with every rental.
          <Link className="link-arrow" href={urls.rates} prefetch={false}>
            Full rate breakdown and multi-day pricing <Icon name="arrow" />
          </Link>
        </p>
      </div>
    </section>
  );
}
