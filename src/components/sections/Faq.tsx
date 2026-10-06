import Link from 'next/link';
import { urls } from '@/lib/business';
import { faq } from '@/lib/content';
import { Icon } from '../Icon';
import { PhoneText } from '../PhoneText';

/**
 * FAQ: native <details> disclosure; questions are H3s per the manual.
 * Answers stay in the DOM (crawlable) and work without JavaScript.
 */
export function Faq() {
  return (
    <section className="faq section" id="faq" aria-labelledby="faq-title">
      <div className="container faq__grid">
        <div className="faq__head">
          <p className="eyebrow" data-reveal="">
            FAQ
          </p>
          <h2 id="faq-title" className="h2" data-reveal="">
            Frequently asked questions
          </h2>
          <div className="faq__help" data-reveal="">
            <p>Still have a question? A real person from the family answers, every day from 9am to 9pm.</p>
            <Link className="link-arrow" href={urls.contact} prefetch={false}>
              Contact us on WhatsApp <Icon name="arrow" />
            </Link>
          </div>
        </div>
        <div className="faq__list">
          {faq.map(([q, a], i) => (
            <details key={q} className="faq__item" data-reveal="" open={i === 0}>
              <summary>
                <h3 className="faq__q">{q}</h3>
                <span className="faq__icon" aria-hidden="true">
                  <Icon name="plus" />
                </span>
              </summary>
              <div className="faq__a">
                <p>
                  <PhoneText text={a} />
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
