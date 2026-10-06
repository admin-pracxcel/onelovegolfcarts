import Link from 'next/link';
import { BOOKING_MESSAGE, urls, whatsappUrl } from '@/lib/business';
import { steps } from '@/lib/content';
import { Icon } from '../Icon';
import { PhoneText } from '../PhoneText';

/** How it works: three steps. */
export function Steps() {
  return (
    <section className="steps section" aria-labelledby="steps-title">
      <div className="container">
        <div className="section-head section-head--split">
          <div>
            <p className="eyebrow" data-reveal="">
              How it works
            </p>
            <h2 id="steps-title" className="h2" data-reveal="">
              Book in two minutes. <span className="muted">Drive off on arrival day.</span>
            </h2>
          </div>
          <div className="section-head__aside steps__cta" data-reveal="">
            <Link className="btn btn--primary" href={urls.book} prefetch={false}>
              Reserve your golf cart <Icon name="arrow" />
            </Link>
            <a className="btn btn--outline" href={whatsappUrl(BOOKING_MESSAGE)}>
              <Icon name="chat" /> WhatsApp
            </a>
          </div>
        </div>

        <ol className="steps__list">
          {steps.map(([title, body], i) => (
            <li key={title} className="step" data-reveal="">
              <span className="step__num" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="step__title">{title}</h3>
              <p>
                <PhoneText text={body} />
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
