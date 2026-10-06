import Link from 'next/link';
import { urls } from '@/lib/business';
import { why } from '@/lib/content';
import { Icon } from '../Icon';
import { Picture } from '../Picture';

/** Why rent from One Love: the four approved differentiators. */
export function Why() {
  return (
    <section className="why section section--dark" aria-labelledby="why-title">
      <div className="container why__grid">
        <div className="why__aside">
          <p className="eyebrow eyebrow--light" data-reveal="">
            Why One Love
          </p>
          <h2 id="why-title" className="h2" data-reveal="">
            Why rent from <span className="accent">One Love</span>
          </h2>
          <div className="why__media" data-reveal="clip">
            <Picture
              name="one-love-fleet-lineup-under-palms"
              alt="Five colourful lifted One Love golf carts lined up in the shade of palm trees in San Pedro"
              sizes="(min-width: 1000px) 42vw, 100vw"
            />
            <p className="why__caption">Part of the One Love fleet.</p>
          </div>
        </div>
        <div className="why__body">
          <ol className="why__list">
            {why.map(([title, body], i) => (
              <li key={title} className="why__item" data-reveal="">
                <span className="why__num" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="why__title">{title}</h3>
                <p>{body}</p>
              </li>
            ))}
          </ol>
          <Link className="link-arrow link-arrow--light" href={urls.fleet} prefetch={false} data-reveal="">
            How we service every cart <Icon name="arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}
