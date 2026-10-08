import type { Metadata } from 'next';
import { CardLogos } from '@/components/CardLogos';
import { Icon } from '@/components/Icon';
import { PageHeader } from '@/components/PageHeader';
import { PayForm } from '@/components/PayForm';
import { business, whatsappUrl, newTab } from '@/lib/business';
import { intro, meta, support } from '@/lib/pages/pay';
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

export default function PayNowPage() {
  const schema = utilitySchema({ path: PATH, crumb: 'Pay Now', title: meta.h1, description: meta.description });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <main id="main" className="pay-page">
        <PageHeader trail={[{ name: 'Pay Now', path: PATH }]} eyebrow="Payment" title={meta.h1} lead={intro} />

        <section className="section book-main" aria-labelledby="pay-title">
          <div className="container book-main__grid">
            <div className="form-card">
              <div className="pay-accept pay-accept--inline">
                <p className="pay-accept__label">We accept</p>
                <CardLogos />
              </div>
              <h2 id="pay-title" className="book-main__title">
                Pay now
              </h2>
              <PayForm />
            </div>
            <aside className="book-aside" aria-label="Payment help">
              <div className="pay-accept pay-accept--aside">
                <p className="book-aside__kicker">We accept</p>
                <CardLogos />
              </div>
              <div className="book-aside__card book-aside__card--dark">
                <p className="book-aside__kicker">Need help?</p>
                <p className="pay-aside__body pay-aside__body--light">{support}</p>
                <a className="btn btn--primary" {...newTab} href={whatsappUrl('Hi One Love, I have a question about a payment.')}>
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
