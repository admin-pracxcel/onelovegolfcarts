/**
 * JSON-LD, built from the same data the page renders.
 *
 * Deviations from the SEO field report (current Google guidance):
 * - No aggregateRating: the 4.9 / 104 figure is a TripAdvisor rating; Google's
 *   review-snippet policy disallows ratings collected on other sites.
 * - No SearchAction: Google retired the sitelinks search box (Nov 2024).
 * - Rates as OfferCatalog → Offer → Service rather than Product (a rental is a
 *   service; Product/merchant results need purchasable goods).
 */
import { business, SITE_URL, urls } from './business';
import { faq, homeMeta } from './content';
import { plainText } from './text';

const abs = (path: string) => `${SITE_URL}${path}`;
const BUSINESS_ID = abs('/#business');

export function businessSchema() {
  const offers = Object.entries(business.rates).flatMap(([key, r]) => {
    const service = {
      '@type': 'Service',
      name: `${r.seats}-seater gas golf cart rental, San Pedro Belize`,
      serviceType: 'Golf cart rental',
      provider: { '@id': BUSINESS_ID },
    };
    return ([['day', 1], ['week', 7]] as const).map(([period, days]) => ({
      '@type': 'Offer',
      itemOffered: service,
      url: abs(urls[key as '4-seater' | '6-seater']),
      priceCurrency: 'USD',
      price: r[period].toFixed(2),
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: r[period].toFixed(2),
        priceCurrency: 'USD',
        referenceQuantity: { '@type': 'QuantitativeValue', value: days, unitCode: 'DAY' },
      },
    }));
  });

  return {
    '@type': 'LocalBusiness',
    '@id': BUSINESS_ID,
    name: business.name,
    ...(business.legalName ? { legalName: business.legalName } : {}),
    description: business.description,
    url: abs('/'),
    logo: abs('/img/one-love-logo.png'),
    image: abs('/img/og-golf-cart-rental-san-pedro-belize.jpg'),
    telephone: business.phone,
    email: business.email,
    priceRange: '$$',
    currenciesAccepted: 'USD, BZD',
    foundingDate: business.founded,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.street,
      addressLocality: business.locality,
      addressRegion: business.region,
      addressCountry: business.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: business.lat, longitude: business.lng },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: business.opens,
        closes: business.closes,
      },
    ],
    areaServed: ['San Pedro Town', 'Ambergris Caye', 'Secret Beach, Belize'].map((name) => ({ '@type': 'Place', name })),
    sameAs: [...Object.values(business.social), business.gbpUrl].filter(Boolean),
    hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Golf cart rentals', itemListElement: offers },
  };
}

export function homeSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      businessSchema(),
      {
        '@type': 'WebSite',
        '@id': abs('/#website'),
        url: abs('/'),
        name: business.name,
        publisher: { '@id': BUSINESS_ID },
        inLanguage: 'en-US',
      },
      {
        '@type': 'WebPage',
        '@id': abs('/#webpage'),
        url: abs('/'),
        name: homeMeta.title,
        isPartOf: { '@id': abs('/#website') },
        about: { '@id': BUSINESS_ID },
        primaryImageOfPage: abs('/img/og-golf-cart-rental-san-pedro-belize.jpg'),
        inLanguage: 'en-US',
      },
      faqSchema(faq, '/'),
    ],
  };
}

/** Serialise for a <script type="application/ld+json"> (escapes `<`). */
export function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, '\\u003c') };
}

/** BreadcrumbList for any inner page. `trail` excludes Home. */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...trail].map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: abs(c.path),
    })),
  };
}

/**
 * /our-carts/: the site's Product host (Execution Manual §06).
 * Prices are per-period rental rates, so each Offer carries a
 * UnitPriceSpecification (1 day / 7 days). No aggregateRating (third-party
 * rating; see note at top). priceValidUntil is omitted: no end date has been
 * supplied for standard rates.
 */
export type CartProductInput = {
  id: '4-seater' | '6-seater';
  name: string;
  description: string;
  image: string;
  usd: { day: number; week: number };
  /** Full spec as additionalProperty (comparison page). */
  specs?: { name: string; value: string }[];
};

/** One Product per cart. Same @id on every page, so search engines merge them. */
function cartProduct(c: CartProductInput) {
  return {
    '@type': 'Product',
    '@id': abs(`/our-carts/#${c.id}`),
    name: `${c.name} golf cart rental, San Pedro Belize`,
    brand: { '@type': 'Brand', name: 'Club Car' },
    description: c.description,
    image: abs(c.image),
    url: abs(`/our-carts/#${c.id}`),
    ...(c.specs && {
      additionalProperty: c.specs.map((p) => ({ '@type': 'PropertyValue', name: p.name, value: p.value })),
    }),
    offers: ([['day', 1], ['week', 7]] as const).map(([period, days]) => ({
      '@type': 'Offer',
      price: c.usd[period].toFixed(2),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      seller: { '@id': BUSINESS_ID },
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: c.usd[period].toFixed(2),
        priceCurrency: 'USD',
        referenceQuantity: { '@type': 'QuantitativeValue', value: days, unitCode: 'DAY' },
      },
    })),
  };
}

function cartItemList(carts: CartProductInput[]) {
  return {
    '@type': 'ItemList',
    name: 'One Love golf cart fleet',
    itemListElement: carts.map((c, i) => ({ '@type': 'ListItem', position: i + 1, item: cartProduct(c) })),
  };
}

function faqSchema(items: [string, string][], path: string) {
  return {
    '@type': 'FAQPage',
    '@id': abs(`${path}#faq`),
    mainEntity: items.map(([q, a]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: plainText(a) },
    })),
  };
}

export function cartsSchema(carts: CartProductInput[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [businessSchema(), breadcrumbSchema([{ name: 'Our Carts', path: '/our-carts/' }]), cartItemList(carts)],
  };
}

/**
 * /rates/: Products with day + week offers (the manual's monthly offer is
 * omitted: no monthly price exists, only "on request"), FAQPage, breadcrumbs.
 */
export function ratesSchema(carts: CartProductInput[], faqItems: [string, string][]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      businessSchema(),
      breadcrumbSchema([{ name: 'Rates', path: '/rates/' }]),
      cartItemList(carts),
      faqSchema(faqItems, '/rates/'),
    ],
  };
}

/** /contact/: ContactPage wrapping the site-wide LocalBusiness, plus breadcrumbs. */
export function contactSchema(name: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      businessSchema(),
      breadcrumbSchema([{ name: 'Contact', path: '/contact/' }]),
      {
        '@type': 'ContactPage',
        '@id': abs('/contact/#webpage'),
        url: abs('/contact/'),
        name,
        description,
        about: { '@id': BUSINESS_ID },
        mainEntity: { '@id': BUSINESS_ID },
        inLanguage: 'en-US',
      },
    ],
  };
}

/**
 * /about-us/: AboutPage + BreadcrumbList, and a Person per founder (jobTitle,
 * worksFor → LocalBusiness, image, LinkedIn sameAs) once founders are supplied.
 */
export function aboutSchema(
  name: string,
  description: string,
  founders: { firstName: string; lastName: string; role: string; image?: string; linkedin?: string }[],
) {
  const people = founders.map((f, i) => ({
    '@type': 'Person',
    '@id': abs(`/about-us/#founder-${i + 1}`),
    name: `${f.firstName} ${f.lastName}`,
    jobTitle: f.role,
    worksFor: { '@id': BUSINESS_ID },
    ...(f.image ? { image: abs(f.image) } : {}),
    ...(f.linkedin ? { sameAs: [f.linkedin] } : {}),
  }));
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { ...businessSchema(), ...(people.length ? { founder: people.map((p) => ({ '@id': p['@id'] })) } : {}) },
      breadcrumbSchema([{ name: 'About Us', path: '/about-us/' }]),
      {
        '@type': 'AboutPage',
        '@id': abs('/about-us/#webpage'),
        url: abs('/about-us/'),
        name,
        description,
        about: { '@id': BUSINESS_ID },
        inLanguage: 'en-US',
      },
      ...people,
    ],
  };
}

/**
 * /gallery/: ImageGallery page + ImageObject for the lead photos (manual:
 * "at least the top 10"), with caption, creator and credit for image search.
 */
export function gallerySchema(
  name: string,
  description: string,
  images: { url: string; caption: string; width: number; height: number }[],
) {
  const objects = images.map((img, i) => ({
    '@type': 'ImageObject',
    '@id': abs(`/gallery/#photo-${i + 1}`),
    contentUrl: abs(img.url),
    url: abs(img.url),
    caption: img.caption,
    width: img.width,
    height: img.height,
    creator: { '@id': BUSINESS_ID },
    creditText: business.name,
    copyrightNotice: `© ${business.name}`,
  }));
  return {
    '@context': 'https://schema.org',
    '@graph': [
      businessSchema(),
      breadcrumbSchema([{ name: 'Gallery', path: '/gallery/' }]),
      {
        '@type': 'ImageGallery',
        '@id': abs('/gallery/#webpage'),
        url: abs('/gallery/'),
        name,
        description,
        about: { '@id': BUSINESS_ID },
        associatedMedia: objects.map((o) => ({ '@id': o['@id'] })),
        inLanguage: 'en-US',
      },
      ...objects,
    ],
  };
}

/**
 * /ambergris-caye/ (pillar): WebPage about the Ambergris Caye Place, FAQPage,
 * BreadcrumbList. The Place is identified by its Wikipedia entity (sameAs)
 * rather than an invented coordinate pair. Breadcrumb is Home > Ambergris
 * Caye: the manual's "Locations" level has no page yet, and Google requires
 * every intermediate crumb to be a real URL.
 */
export function ambergrisSchema(title: string, description: string, faqItems: [string, string][]) {
  const PLACE_ID = abs('/ambergris-caye/#place');
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { ...businessSchema(), areaServed: [{ '@id': PLACE_ID }] },
      breadcrumbSchema([{ name: 'Ambergris Caye', path: '/ambergris-caye/' }]),
      {
        '@type': 'Place',
        '@id': PLACE_ID,
        name: 'Ambergris Caye',
        description: 'The largest island in Belize, about 25 miles long and less than a mile wide at most points.',
        containedInPlace: { '@type': 'Country', name: 'Belize' },
        sameAs: ['https://en.wikipedia.org/wiki/Ambergris_Caye'],
      },
      {
        '@type': 'WebPage',
        '@id': abs('/ambergris-caye/#webpage'),
        url: abs('/ambergris-caye/'),
        name: title,
        description,
        about: { '@id': PLACE_ID },
        mentions: { '@id': BUSINESS_ID },
        inLanguage: 'en-US',
      },
      faqSchema(faqItems, '/ambergris-caye/'),
    ],
  };
}

/**
 * Location pages (Execution Manual §17): a free delivery Service for the
 * area, FAQPage and BreadcrumbList. Breadcrumbs run through the Ambergris
 * Caye pillar (the nav's "Locations" hub) since no /locations/ page exists.
 */
export function locationSchema(opts: {
  path: string;
  crumb: string;
  title: string;
  description: string;
  serviceType: string;
  area: Record<string, unknown>;
  faq: [string, string][];
  /** Full trail below Home; defaults to Ambergris Caye > crumb. */
  trail?: { name: string; path: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      businessSchema(),
      breadcrumbSchema(
        opts.trail ?? [
          { name: 'Ambergris Caye', path: '/ambergris-caye/' },
          { name: opts.crumb, path: opts.path },
        ],
      ),
      {
        '@type': 'Service',
        '@id': abs(`${opts.path}#service`),
        name: opts.title,
        description: opts.description,
        serviceType: opts.serviceType,
        provider: { '@id': BUSINESS_ID },
        areaServed: opts.area,
        url: abs(opts.path),
        offers: { '@type': 'Offer', price: '0.00', priceCurrency: 'USD', description: 'Free delivery with every rental' },
      },
      faqSchema(opts.faq, opts.path),
    ],
  };
}

/**
 * Arrival guide pillar: Article about San Pedro, with the "cart waiting"
 * section as a nested HowTo (kept per the manual; Google no longer shows
 * HowTo rich results, but the markup is valid), FAQPage and BreadcrumbList.
 */
export function arrivalGuideSchema(opts: {
  path: string;
  crumb: string;
  title: string;
  description: string;
  image: string;
  published: string;
  howTo: { name: string; steps: string[] };
  faq: [string, string][];
}) {
  const url = abs(opts.path);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      businessSchema(),
      breadcrumbSchema([{ name: opts.crumb, path: opts.path }]),
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: opts.title,
        description: opts.description,
        image: abs(opts.image),
        datePublished: opts.published,
        dateModified: opts.published,
        author: { '@id': BUSINESS_ID },
        publisher: { '@id': BUSINESS_ID },
        mainEntityOfPage: url,
        inLanguage: 'en-US',
        about: {
          '@type': 'Place',
          name: 'San Pedro',
          containedInPlace: { '@type': 'Place', name: 'Ambergris Caye', sameAs: 'https://en.wikipedia.org/wiki/Ambergris_Caye' },
          sameAs: 'https://en.wikipedia.org/wiki/San_Pedro_Town',
        },
        hasPart: { '@id': `${url}#cart` },
      },
      {
        '@type': 'HowTo',
        '@id': `${url}#cart`,
        name: opts.howTo.name,
        step: opts.howTo.steps.map((text, i) => ({ '@type': 'HowToStep', position: i + 1, text })),
      },
      faqSchema(opts.faq, opts.path),
    ],
  };
}

/**
 * 4 vs 6 comparison pillar: Article, ItemList of both cart Products (full
 * spec), FAQPage, BreadcrumbList (Home > Our Carts > comparison; the manual's
 * Blog > Cart Selection trail needs a blog that does not exist yet).
 */
export function compareSchema(opts: {
  path: string;
  title: string;
  description: string;
  image: string;
  published: string;
  carts: CartProductInput[];
  faq: [string, string][];
}) {
  const url = abs(opts.path);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      businessSchema(),
      breadcrumbSchema([
        { name: 'Our Carts', path: '/our-carts/' },
        { name: '4-Seater vs 6-Seater', path: opts.path },
      ]),
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: opts.title,
        description: opts.description,
        image: abs(opts.image),
        datePublished: opts.published,
        dateModified: opts.published,
        author: { '@id': BUSINESS_ID },
        publisher: { '@id': BUSINESS_ID },
        mainEntityOfPage: url,
        inLanguage: 'en-US',
        about: opts.carts.map((c) => ({ '@id': abs(`/our-carts/#${c.id}`) })),
      },
      cartItemList(opts.carts),
      faqSchema(opts.faq, opts.path),
    ],
  };
}
