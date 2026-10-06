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
      {
        '@type': 'FAQPage',
        '@id': abs('/#faq'),
        mainEntity: faq.map(([q, a]) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      },
    ],
  };
}

/** Serialise for a <script type="application/ld+json"> (escapes `<`). */
export function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, '\\u003c') };
}
