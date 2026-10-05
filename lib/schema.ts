import { BUSINESS, FAQ, FLEET, META } from "./content";

const ORIGIN = META.canonical.replace(/\/$/, "");

/**
 * Structured data for the homepage, built from the same content module the
 * page renders, so the two cannot drift.
 *
 * On the WordPress build, LocalBusiness and Organization move to header.php
 * so they load site-wide; WebSite, Product and FAQPage stay on the homepage.
 * Values per Execution Manual section 04 and Field Report section 12.
 */
export function homepageSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "AutoRental"],
        "@id": `${ORIGIN}/#business`,
        name: BUSINESS.name,
        url: `${ORIGIN}/`,
        telephone: BUSINESS.phone,
        email: BUSINESS.email,
        foundingDate: BUSINESS.founded,
        priceRange: "$$",
        currenciesAccepted: "USD, BZD",
        image: `${ORIGIN}/img/hero-one-love-golf-cart-beachfront-san-pedro.jpg`,
        address: {
          "@type": "PostalAddress",
          streetAddress: BUSINESS.street,
          addressLocality: BUSINESS.locality,
          addressRegion: BUSINESS.region,
          addressCountry: BUSINESS.country,
        },
        geo: { "@type": "GeoCoordinates", latitude: BUSINESS.lat, longitude: BUSINESS.lng },
        areaServed: { "@type": "Place", name: "Ambergris Caye, Belize" },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
            opens: BUSINESS.opens,
            closes: BUSINESS.closes,
          },
        ],
        sameAs: [BUSINESS.facebook, BUSINESS.instagram, BUSINESS.x, BUSINESS.tripadvisor],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: BUSINESS.rating,
          reviewCount: BUSINESS.reviewCount,
          bestRating: "5",
        },
        parentOrganization: { "@id": `${ORIGIN}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${ORIGIN}/#organization`,
        name: BUSINESS.name,
        url: `${ORIGIN}/`,
        logo: `${ORIGIN}/img/one-love-logo.webp`,
        foundingDate: BUSINESS.founded,
      },
      {
        "@type": "WebSite",
        "@id": `${ORIGIN}/#website`,
        url: `${ORIGIN}/`,
        name: BUSINESS.name,
        publisher: { "@id": `${ORIGIN}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${ORIGIN}/?s={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      ...FLEET.carts.map((cart) => ({
        "@type": "Product",
        name: `${cart.title.join(" ")} Golf Cart Rental`,
        image: `${ORIGIN}${cart.image}.jpg`,
        description: cart.body,
        brand: { "@type": "Brand", name: "Club Car" },
        offers: {
          "@type": "Offer",
          price: cart.price.replace("$", ""),
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: `${ORIGIN}${cart.anchor}`,
          seller: { "@id": `${ORIGIN}/#business` },
        },
      })),
      {
        "@type": "FAQPage",
        mainEntity: FAQ.items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };
}
