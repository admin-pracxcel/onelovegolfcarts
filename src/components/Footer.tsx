import Link from 'next/link';
import { business, urls, whatsappUrl, type UrlKey } from '@/lib/business';

/** Five columns per Execution Manual §03. Column titles are not headings. */
const explore: [UrlKey, string][] = [
  ['carts', 'Golf Carts'],
  ['rates', 'Rates'],
  ['ambergris', 'Locations'],
  ['blog', 'Blog'],
  ['fleet', 'Fleet Maintenance'],
  ['about', 'About'],
];
const book: [UrlKey, string][] = [
  ['book', 'Book Now'],
  ['pay', 'Pay Now'],
  ['contact', 'Contact'],
  ['spr', 'Airport Delivery'],
  ['resorts', 'Resort Delivery'],
];
const socialLabels = { instagram: 'Instagram', facebook: 'Facebook', x: 'X', tripadvisor: 'TripAdvisor', yelp: 'Yelp' } as const;

function Col({ title, links, extra }: { title: string; links: [UrlKey, string][]; extra?: React.ReactNode }) {
  return (
    <div className="site-footer__col">
      <p className="site-footer__title">{title}</p>
      <ul>
        {links.map(([key, label]) => (
          <li key={key + label}>
            <Link href={urls[key]} prefetch={false}>
              {label}
            </Link>
          </li>
        ))}
        {extra}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <Link href="/" className="site-footer__logo" prefetch={false}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/one-love-logo-reversed.webp" width={300} height={110} alt={business.name} loading="lazy" decoding="async" />
          </Link>
          <p>Family-owned golf cart rentals with free delivery anywhere on Ambergris Caye.</p>
          <p className="site-footer__est">Established 2017 in San Pedro, Ambergris Caye, Belize.</p>
        </div>

        <Col title="Explore" links={explore} />
        <Col
          title="Book"
          links={book}
          extra={
            <li>
              <a href={whatsappUrl()}>WhatsApp us</a>
            </li>
          }
        />

        <div className="site-footer__col site-footer__contact">
          <p className="site-footer__title">Contact</p>
          <address>
            <a href={business.mapsUrl}>
              {business.street}
              <br />
              {business.locality}, {business.island}
            </a>
            <a href={business.phoneHref}>{business.phone}</a>
            <a href={`mailto:${business.email}`}>{business.email}</a>
            <span>Open {business.hoursLabel}</span>
          </address>
        </div>

        <div className="site-footer__col site-footer__trust">
          <p className="site-footer__title">Trust</p>
          <ul>
            <li>
              <strong>Est. 2017</strong> on Barrier Reef Drive
            </li>
            <li>
              <a href={business.rating.url}>
                <strong>{business.rating.count}+</strong> five-star reviews on TripAdvisor
              </a>
            </li>
            {business.businessReg && <li>Business Reg. {business.businessReg}</li>}
            {business.insurer && <li>Insured by {business.insurer}</li>}
          </ul>
        </div>
      </div>

      <div className="container site-footer__base">
        <ul className="site-footer__social" aria-label="One Love on social media">
          {(Object.keys(socialLabels) as (keyof typeof socialLabels)[]).map((k) => (
            <li key={k}>
              <a href={business.social[k]} rel="noopener">
                {socialLabels[k]}
              </a>
            </li>
          ))}
        </ul>
        <ul className="site-footer__legal">
          <li>
            &copy; {new Date().getFullYear()} {business.name}
          </li>
          <li>
            <a href="/sitemap.xml">Sitemap</a>
          </li>
          <li>
            <Link href={urls.terms} prefetch={false}>
              Terms &amp; Conditions
            </Link>
          </li>
          <li>
            <Link href={urls.privacy} prefetch={false}>
              Privacy Policy
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
