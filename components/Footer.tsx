import { SiteLink } from "./SiteLink";
import Image from "next/image";
import { Icon } from "./Icon";
import { BUSINESS, FOOTER } from "@/lib/content";

function Col({ label, links }: { label: string; links: readonly { label: string; href: string; external?: boolean }[] }) {
  return (
    <nav aria-label={label}>
      <h3 className="foot-h">{label}</h3>
      <ul>
        {links.map((l) => (
          <li key={l.label}>
            {l.external
              ? <a href={l.href} rel="noopener" target="_blank">{l.label}</a>
              : <SiteLink href={l.href}>{l.label}</SiteLink>}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="foot">
          <div className="foot-brand">
            <Image
              src="/img/one-love-logo-light.webp"
              width={444}
              height={159}
              alt={BUSINESS.name}
            />
            <p>{FOOTER.blurb}</p>
            <p>{FOOTER.established}</p>
          </div>

          <Col label="Explore" links={FOOTER.explore} />
          <Col label="Book" links={FOOTER.book} />

          <div>
            <h3 className="foot-h">Get in touch</h3>
            <ul className="foot-contact">
              <li>
                <Icon name="map-pin-bold" />
                <a href={BUSINESS.maps} rel="noopener" target="_blank">
                  {BUSINESS.street}, {BUSINESS.locality}, {BUSINESS.region}, Belize
                </a>
              </li>
              <li><Icon name="phone-bold" /><a href={BUSINESS.phoneHref}>{BUSINESS.phone}</a></li>
              <li><Icon name="envelope-simple-bold" /><a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a></li>
              <li><Icon name="clock-bold" /><span>{BUSINESS.hours}</span></li>
            </ul>
          </div>

          <div>
            <h3 className="foot-h">Trust</h3>
            <ul className="foot-trust">
              <li><Icon name="calendar-blank-bold" /><span>Established 2017</span></li>
              <li><Icon name="star-bold" /><span>104+ five-star reviews on Tripadvisor</span></li>
              {/* Rendered as visible placeholders so they cannot ship unnoticed. */}
              <li><Icon name="seal-check-bold" /><span>Business registration <span className="tbd">client to supply</span></span></li>
              <li><Icon name="shield-check-bold" /><span>Insured with <span className="tbd">carrier to supply</span></span></li>
            </ul>
            <picture>
              <source type="image/webp" srcSet="/img/tripadvisor-awards.webp" />
              <img
                src="/img/tripadvisor-awards.png"
                width={402}
                height={96}
                loading="lazy"
                decoding="async"
                alt="Tripadvisor Travellers&rsquo; Choice and Recommended on Tripadvisor awards for One Love Golf Cart Rentals"
              />
            </picture>
          </div>
        </div>

        <div className="foot-bottom">
          <div className="socials">
            <a href={BUSINESS.facebook} rel="noopener" target="_blank" aria-label="Facebook">
              <Icon name="facebook-logo-bold" />
            </a>
            <a href={BUSINESS.instagram} rel="noopener" target="_blank" aria-label="Instagram">
              <Icon name="instagram-logo-bold" />
            </a>
            <a href={BUSINESS.x} rel="noopener" target="_blank" aria-label="X">
              <Icon name="x-logo-bold" />
            </a>
            <a href={BUSINESS.tripadvisor} rel="noopener" target="_blank" aria-label="Tripadvisor">
              <Icon name="tripadvisor" />
            </a>
          </div>
          <div className="foot-legal">
            {FOOTER.legal.map((l) => <SiteLink key={l.label} href={l.href}>{l.label}</SiteLink>)}
          </div>
          <p className="foot-copy">{FOOTER.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
