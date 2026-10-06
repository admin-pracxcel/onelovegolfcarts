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
