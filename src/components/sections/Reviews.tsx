import { business, newTab } from '@/lib/business';
import { reviews, type Review } from '@/lib/content';
import { Stars } from '../Icon';
import type { ImageName } from '@/lib/images';
import { Picture } from '../Picture';

function Cite({ r }: { r: Review }) {
  const src = `${r.source} review${r.date ? `, ${r.date}` : ''}`;
  return (
    <>
      <cite className="review__name">{r.author}</cite>
      <span className="review__src">
        {r.url ? (
          <a {...newTab} href={r.url}>
            {src}
          </a>
        ) : (
          src
        )}
      </span>
    </>
  );
}

/** What our customers say: genuine reviews, verbatim. */
export function Reviews({
  id,
  eyebrow = 'Reviews',
  title = 'What our customers say',
  image = 'guests-luggage-golf-carts-village-mart',
  alt = 'Guests with luggage setting off in a line of One Love golf carts outside Village Mart in San Pedro',
}: { id?: string; eyebrow?: string; title?: string; image?: ImageName; alt?: string } = {}) {
  const [featured, ...rest] = reviews;
  const { rating } = business;
  return (
    <section id={id} className="reviews section" aria-labelledby="reviews-title">
      <div className="container">
        <div className="section-head section-head--split">
          <div>
            <p className="eyebrow" data-reveal="">
              {eyebrow}
            </p>
            <h2 id="reviews-title" className="h2" data-reveal="">
              {title}
            </h2>
          </div>
          <div className="rating" data-reveal="">
            <p className="rating__score">{rating.value}</p>
            <div>
              <Stars />
              <p className="rating__text">
                Rated {rating.value} on {rating.source} across {rating.count}+ reviews.{' '}
                <a {...newTab} href={rating.url}>
                  Read them all on our TripAdvisor page
                </a>
                .
              </p>
            </div>
          </div>
        </div>

        <div className="reviews__grid">
          <figure className="review review--featured" data-reveal="">
            <Stars />
            <blockquote>
              <p>{featured.text}</p>
            </blockquote>
            <figcaption>
              <Cite r={featured} />
            </figcaption>
          </figure>

          <div className="reviews__media" data-reveal="clip">
            <Picture
              name={image}
              alt={alt}
              sizes="(min-width: 1000px) 38vw, 100vw"
            />
          </div>

          {rest.map((r) => (
            <figure key={r.author} className="review" data-reveal="">
              <Stars />
              <blockquote>
                <p>{r.text}</p>
              </blockquote>
              <figcaption>
                <Cite r={r} />
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
