import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { Lightbox, type LightboxItem } from '@/components/Lightbox';
import { PageHeader } from '@/components/PageHeader';
import { Picture } from '@/components/Picture';
import { RichText } from '@/components/RichText';
import { SectionNav } from '@/components/SectionNav';
import { BOOKING_MESSAGE, business, urls, whatsappUrl, type UrlKey } from '@/lib/business';
import { imageInfo } from '@/lib/images';
import { intro, meta, sections } from '@/lib/pages/gallery';
import { gallerySchema, jsonLd } from '@/lib/schema';
import '@/styles/gallery.css';

const TRAIL = [{ name: 'Gallery', path: '/gallery/' }];

export const metadata: Metadata = {
  title: { absolute: meta.title },
  description: meta.description,
  alternates: { canonical: '/gallery/', languages: { 'en-US': '/gallery/', 'x-default': '/gallery/' } },
  openGraph: {
    type: 'website',
    siteName: business.name,
    title: meta.title,
    description: meta.description,
    url: '/gallery/',
    locale: 'en_US',
    images: [{ url: imageInfo('one-love-fleet-lineup-under-palms').src, alt: 'One Love golf carts lined up under palm trees in San Pedro, Belize' }],
  },
  twitter: { card: 'summary_large_image' },
};

const THUMB_SIZES = '(min-width: 1100px) 30vw, (min-width: 700px) 45vw, 46vw';

export default function GalleryPage() {
  // One running index across sections, so the viewer steps through every photo.
  const all = sections.flatMap((s) => s.photos);
  const items: LightboxItem[] = all.map((p) => {
    const info = imageInfo(p.image);
    return {
      avif: info.srcset('avif'),
      webp: info.srcset('webp'),
      jpg: info.srcset('jpg'),
      src: info.src,
      alt: p.alt,
      caption: p.caption,
      width: info.width,
      height: info.height,
    };
  });
  const schema = gallerySchema(
    meta.title,
    meta.description,
    all
      .filter((p) => p.top)
      .map((p) => {
        const info = imageInfo(p.image);
        return { url: info.src, caption: p.alt, width: info.width, height: info.height };
      }),
  );
  const offsets = sections.map((_, si) => sections.slice(0, si).reduce((t, x) => t + x.photos.length, 0));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <main id="main" className="gallery-page">
        <PageHeader trail={TRAIL} eyebrow={`${all.length} real photos`} title={meta.h1} lead={<RichText text={intro} />} />

        <SectionNav
          label="Gallery sections"
          items={sections.map((s) => ({ id: s.id, label: s.title.replace('Our ', '') }))}
          cta={{ href: urls.book, label: 'Reserve' }}
        />

        {sections.map((s, si) => (
          <section key={s.id} id={s.id} className="gal-section" aria-labelledby={`${s.id}-title`}>
            <div className="container">
              <div className="gal-section__head">
                <div className="gal-section__title" data-reveal="">
                  <h2 id={`${s.id}-title`} className="h2">
                    {s.title}
                  </h2>
                  <span className="gal-section__count">{s.photos.length} photos</span>
                </div>
                <div className="gal-section__intro" data-reveal="">
                  <p>{s.intro}</p>
                  {s.links?.map((l) => (
                    <Link key={l.key} className="link-arrow" href={urls[l.key as UrlKey]} prefetch={false}>
                      {l.text.charAt(0).toUpperCase() + l.text.slice(1)} <Icon name="arrow" />
                    </Link>
                  ))}
                </div>
              </div>
              <div className="gal-grid">
                {s.photos.map((p, pi) => {
                  const i = offsets[si] + pi;
                  return (
                    <figure key={p.image} className="gal-item">
                      <a className="gal-item__link" href={imageInfo(p.image).src} data-lightbox={i}>
                        <Picture name={p.image} alt={p.alt} sizes={THUMB_SIZES} className="gal-item__img" />
                        <span className="gal-item__zoom" aria-hidden="true">
                          <Icon name="plus" />
                        </span>
                      </a>
                      <figcaption>{p.caption}</figcaption>
                    </figure>
                  );
                })}
              </div>
            </div>
          </section>
        ))}

        <section className="gal-cta" aria-labelledby="gal-cta-title">
          <div className="container gal-cta__inner" data-reveal="">
            <div>
              <h2 id="gal-cta-title" className="h2">
                Seen one you like?
              </h2>
              <p>
                To reserve a specific cart or ask about a specific feature, message us on WhatsApp at{' '}
                <a href={whatsappUrl(BOOKING_MESSAGE)} className="nowrap">
                  {business.phone}
                </a>
                .
              </p>
            </div>
            <div className="gal-cta__actions">
              <Link className="btn btn--primary btn--lg" href={urls.book} prefetch={false}>
                Reserve one of these carts <Icon name="arrow" />
              </Link>
              <Link className="link-arrow" href={urls.fleet} prefetch={false}>
                How we service every cart <Icon name="arrow" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Lightbox items={items} />
    </>
  );
}
