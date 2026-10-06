import Link from 'next/link';
import { BOOKING_MESSAGE, urls, whatsappUrl } from '@/lib/business';
import { finalCta } from '@/lib/content';
import { Icon } from '../Icon';
import { Picture } from '../Picture';
import { PhoneText } from '../PhoneText';

/** Final booking moment. */
export function FinalCta() {
  return (
    <section className="final-cta" aria-labelledby="cta-title">
      <div className="final-cta__frame">
        <div className="final-cta__media">
          <Picture name="colourful-golf-cart-fleet-palms" alt="" sizes="100vw" />
        </div>
        <div className="final-cta__content">
          <p className="eyebrow eyebrow--light" data-reveal="">
            {finalCta.eyebrow}
          </p>
          <h2 id="cta-title" className="display final-cta__title" data-reveal="">
            {finalCta.title}
          </h2>
          <p className="final-cta__body" data-reveal="">
            <PhoneText text={finalCta.body} />
          </p>
          <div className="final-cta__actions" data-reveal="">
            <Link className="btn btn--primary btn--lg" href={urls.book} prefetch={false}>
              Reserve your golf cart <Icon name="arrow" />
            </Link>
            <a className="btn btn--glass btn--lg" href={whatsappUrl(BOOKING_MESSAGE)}>
              <Icon name="chat" /> Message on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
