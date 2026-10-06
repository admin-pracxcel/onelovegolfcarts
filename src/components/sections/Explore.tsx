import Link from 'next/link';
import { urls } from '@/lib/business';
import { explore } from '@/lib/content';
import { Icon } from '../Icon';
import { Picture } from '../Picture';

const sizes = [
  '(min-width: 1000px) 58vw, 88vw',
  '(min-width: 1000px) 38vw, 88vw',
  '(min-width: 1000px) 38vw, 88vw',
  '(min-width: 1000px) 58vw, 88vw',
];

/** Explore Ambergris Caye by cart: editorial grid of four guides. */
export function Explore() {
  return (
    <section className="explore section" aria-labelledby="explore-title">
      <div className="container">
        <div className="explore__head">
          <h2 id="explore-title" className="display" data-reveal="">
            Explore Ambergris Caye <span className="muted">by cart</span>
          </h2>
          <div className="explore__aside" data-reveal="">
            <p>
              Twenty-five miles of island, one bridge, and a golf cart that goes everywhere. Start with the{' '}
              <Link href={urls.ambergris} prefetch={false}>
                complete Ambergris Caye golf cart guide
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="explore__grid" data-rail="">
          {explore.map((g, i) => (
            <article key={g.title} className={`guide guide--${i + 1}`} data-reveal="">
              <div className="guide__media">
                <Picture name={g.image} alt={g.alt} sizes={sizes[i]} />
                <span className="tag tag--light">{g.tag}</span>
              </div>
              <div className="guide__body">
                <h3 className="guide__title">
                  <Link href={urls[g.link]} prefetch={false}>
                    {g.title}
                  </Link>
                </h3>
                <p>{g.body}</p>
                <span className="guide__cta" aria-hidden="true">
                  {g.cta} <Icon name="arrow" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
