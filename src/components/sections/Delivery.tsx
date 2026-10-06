import Link from 'next/link';
import { urls } from '@/lib/business';
import { delivery } from '@/lib/content';
import { Icon } from '../Icon';
import { Picture } from '../Picture';

/** Where we deliver: entity-rich intro + six delivery zones. */
export function Delivery() {
  return (
    <section className="delivery section" id="delivery" aria-labelledby="delivery-title">
      <div className="container delivery__grid">
        <div className="delivery__head">
          <p className="eyebrow" data-reveal="">
            Free delivery
          </p>
          <h2 id="delivery-title" className="h2" data-reveal="">
            Where we deliver
          </h2>
          <figure className="delivery__media" data-reveal="clip">
            <Picture
              name="golf-cart-tropic-air-terminal-san-pedro-airport"
              alt="Red lifted One Love golf cart parked outside the Tropic Air terminal at San Pedro Airport"
              sizes="(min-width: 1000px) 40vw, 100vw"
            />
            <figcaption>Waiting outside the Tropic Air terminal, San Pedro Airport (SPR).</figcaption>
          </figure>
        </div>

        <div className="delivery__body">
          <p className="delivery__intro" data-reveal="">
            {delivery.intro}
          </p>
          <ul className="zones">
            {delivery.zones.map((z) => (
              <li key={z.name} className={`zone${z.link ? ' zone--link' : ''}`} data-reveal="">
                <div className="zone__main">
                  <h3 className="zone__name">{z.name}</h3>
                  <p className="zone__detail">{z.detail}</p>
                </div>
                <p className="zone__time">
                  <Icon name="clock" />
                  {z.time}
                </p>
                {z.link && (
                  <Link className="zone__go" href={urls[z.link]} prefetch={false}>
                    <Icon name="arrow-ur" />
                    <span className="screen-reader-text">{z.anchor}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <p className="delivery__note" data-reveal="">
            Flying into Belize City first? See{' '}
            <Link href={urls.bze} prefetch={false}>
              Belize City airport arrivals
            </Link>{' '}
            and{' '}
            <Link href={urls.arrival} prefetch={false}>
              getting to San Pedro from Belize City
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
