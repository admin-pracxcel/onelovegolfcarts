import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { PageHeader } from '@/components/PageHeader';
import { business, urls, whatsappUrl, newTab } from '@/lib/business';
import type { LegalDoc } from '@/lib/pages/legal';
import { jsonLd, utilitySchema } from '@/lib/schema';
import '@/styles/legal.css';

export function legalMetadata(doc: LegalDoc, path: string): Metadata {
  return {
    title: { absolute: doc.meta.title },
    description: doc.meta.description,
    alternates: { canonical: path, languages: { 'en-US': path, 'x-default': path } },
    openGraph: { type: 'website', siteName: business.name, title: doc.meta.title, description: doc.meta.description, url: path, locale: 'en_US' },
  };
}

/** Terms and Privacy: sticky contents list beside the document. */
export function LegalPage({ doc, path, crumb, related }: { doc: LegalDoc; path: string; crumb: string; related: { href: string; label: string }[] }) {
  const schema = utilitySchema({ path, crumb, title: doc.meta.h1, description: doc.meta.description });
  const [lead, ...rest] = doc.intro;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <main id="main" className="legal-page">
        <PageHeader trail={[{ name: crumb, path }]} eyebrow="Legal" title={doc.meta.h1} lead={lead} />
        <div className="section legal">
          <div className="container legal__grid">
            <nav className="legal__toc" aria-label="Contents">
              <p className="legal__toc-title">Contents</p>
              <ol>
                {doc.sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`}>{s.h2}</a>
                  </li>
                ))}
              </ol>
            </nav>
            <article className="legal__doc">
              {rest.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
              {doc.sections.map((s) => (
                <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`}>
                  <h2 id={`${s.id}-title`}>{s.h2}</h2>
                  {s.blocks.map((b, i) =>
                    'p' in b ? (
                      <p key={i}>{b.p}</p>
                    ) : (
                      <ul key={i}>
                        {b.ul.map((item) =>
                          typeof item === 'string' ? (
                            <li key={item}>{item}</li>
                          ) : (
                            <li key={item.text}>
                              {item.text}
                              <ul>
                                {item.sub.map((x) => (
                                  <li key={x}>{x}</li>
                                ))}
                              </ul>
                            </li>
                          ),
                        )}
                      </ul>
                    ),
                  )}
                </section>
              ))}
              {doc.outro && (
                <div className="legal__outro">
                  {doc.outro.map((p) => (
                    <p key={p.slice(0, 40)}>{p}</p>
                  ))}
                </div>
              )}
              <div className="legal__contact">
                <p className="legal__contact-title">Questions about this page?</p>
                <p>
                  {business.street}, {business.locality}, {business.island}, Belize · {business.phone} · {business.email}
                </p>
                <div className="legal__contact-actions">
                  <a className="btn btn--primary" {...newTab} href={whatsappUrl()}>
                    <Icon name="chat" /> Message us on WhatsApp
                  </a>
                  {related.map((r) => (
                    <Link key={r.href} className="link-arrow" href={r.href} prefetch={false}>
                      {r.label} <Icon name="arrow" />
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </div>
      </main>
    </>
  );
}

export const legalLinks = {
  contact: { href: urls.contact, label: 'Contact us' },
  rates: { href: urls.rates, label: 'Rates' },
  terms: { href: urls.terms, label: 'Terms & Conditions' },
  privacy: { href: urls.privacy, label: 'Privacy Policy' },
};
