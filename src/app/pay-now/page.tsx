import type { Metadata } from 'next';
import { Icon } from '@/components/Icon';
import { PageHeader } from '@/components/PageHeader';
import { PayForm } from '@/components/PayForm';
import { RichText } from '@/components/RichText';
import { business, whatsappUrl } from '@/lib/business';
import { intro, meta, options, support, trustBlock } from '@/lib/pages/pay';
import { jsonLd, utilitySchema } from '@/lib/schema';
import '@/styles/book.css';
import '@/styles/pay.css';

const PATH = '/pay-now/';

export const metadata: Metadata = {
  title: { absolute: meta.title },
  description: meta.description,
  alternates: { canonical: PATH, languages: { 'en-US': PATH, 'x-default': PATH } },
  openGraph: { type: 'website', siteName: business.name, title: meta.title, description: meta.description, url: PATH, locale: 'en_US' },
};

const METHODS = ['Visa', 'Mastercard', 'American Express', 'PayPal'];

export default function PayNowPage() {
  const schema = utilitySchema({ path: PATH, crumb: 'Pay Now', title: meta.h1, description: meta.description });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <main id="main" className="pay-page">
        <PageHeader trail={[{ name: 'Pay Now', path: PATH }]} eyebrow="Secure payment" title={meta.h1} lead={intro}>
          <div className="container">
            <ul className="pay-methods" aria-label="Accepted payment methods">
              <li className="pay-methods__secure">
                <Icon name="check" /> Secure checkout by PayPal
              </li>
              {METHODS.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
        </PageHeader>

        <section className="section book-main" aria-labelledby="pay-title">
          <div className="container book-main__grid">
            <div className="form-card">
              <h2 id="pay-title" className="book-main__title">
                Pay now
              </h2>
              <PayForm clientId={process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || undefined} />
            </div>
            <aside className="book-aside" aria-label="Payment details">
              <div className="book-aside__card">
                <dl className="pay-options">
                  {options.map((o) => (
                    <div key={o.label}>
                      <dt>{o.label}</dt>
                      <dd>{o.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="book-aside__card">
                <p className="book-aside__kicker">Security</p>
                <p className="pay-aside__body">
                  <RichText text={trustBlock} />
                </p>
              </div>
              <div className="book-aside__card book-aside__card--dark">
                <p className="book-aside__kicker">Need help?</p>
                <p className="pay-aside__body pay-aside__body--light">{support}</p>
                <a className="btn btn--primary" href={whatsappUrl('Hi One Love, I have a question about a payment.')}>
                  <Icon name="chat" /> WhatsApp {business.phone}
                </a>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
