# One Love Golf Cart Rentals

Website for One Love Golf Cart Rentals, San Pedro, Ambergris Caye, Belize. Built with Next.js 16 (App Router), React 19 and TypeScript. Every page is statically prerendered.

Uses **pnpm** (version pinned in `package.json`; `corepack enable` picks it up automatically).

```
pnpm install
pnpm dev                 # http://localhost:3000
pnpm build && pnpm start
pnpm lint
```

Install scripts are allowed only for `sharp` and `unrs-resolver` (see `pnpm-workspace.yaml`); approve any new one with `pnpm approve-builds <package>`.

## Pages

| Route | Status |
|---|---|
| `/` | Homepage |
| `/our-carts/` | 4-seater and 6-seater detail, comparison, specs |
| `/rates/` | Rates, policies, FAQ |
| `/contact/` | Channels, roadside support, contact form, map, directions |
| `/about-us/` | Story, principles, fleet, community. The "Meet the family" section switches on once founders are added in `src/lib/pages/about.ts` |

Links to pages that aren't built yet (blog posts, guides, the wedding page…) show the 404 page.

## Environment variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Production origin, used for canonical URLs, Open Graph, JSON-LD, robots and sitemap. Defaults to `https://onelovegolfcartsbelize.com`. |
| `NEXT_PUBLIC_ALLOW_INDEXING` | Search indexing is **blocked by default** (meta robots, `robots.txt`, `X-Robots-Tag`) so previews don't compete with the live site. Set to `true` on production at launch only. |
| `CONTACT_WEBHOOK_URL`, `BOOKING_WEBHOOK_URL`, `PAYMENT_WEBHOOK_URL` | Where each form posts its submission as JSON (n8n). `PAYMENT_WEBHOOK_URL` must be HTTPS. |
| `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL` | Optional email fallback for the contact and booking forms through Resend. Pay Now never sends by email. |

With no delivery variable set, the forms don't pretend to send: contact and booking offer the same details as a ready-to-send WhatsApp message, and Pay Now asks people to message or pay at hand-off.

**Pay Now carries card numbers, expiry dates and CVCs** (the live site's form, kept at the client's request). The site never logs, stores or re-displays them; they go only to `PAYMENT_WEBHOOK_URL`. In n8n, turn off saving execution data for that workflow and don't email or store the CVC.

## Content

- `src/lib/business.ts`: name, address, phone, rates, ratings, social profiles and planned URLs. The single source of truth, used by the pages and the structured data.
- `src/lib/content.ts`: homepage copy. `src/lib/pages/*.ts`: copy for each inner page. All of it comes verbatim from the Execution Manual; inline links use `[[anchor text|urlKey]]`.
- `src/lib/promo.ts`: the once-per-visit promotion popup (copy, prices, end date). Change `id` for a new offer; `enabled: false` turns it off.
- Values marked `VERIFY` in the code are business facts that still need the client's confirmation.

## Images

Source photos live in `assets/source/`. `pnpm images` writes AVIF/WebP/JPEG variants to `public/img/` and updates `src/lib/image-manifest.json`. To add a photo, put it in `assets/source/`, list it in `scripts/build-images.mjs`, and run the script.

## QA scripts

Run against a local server (`pnpm build && pnpm start`). Output goes to `.qa/` (git-ignored).

```
pnpm qa:shots .qa http://localhost:3000/rates/  # screenshots at 1440/1280/768/390, overflow + console check
pnpm qa:a11y http://localhost:3000/rates/       # axe scan, heading outline, JSON-LD, images, links
pnpm qa:promo                                   # popup once-per-visit behaviour
pnpm qa:contact                                 # contact form validation and delivery
pnpm qa:booking                                 # Book Now validation, fallback and delivery
pnpm qa:pay                                     # Pay Now validation; card fields never echoed
pnpm qa:trust                                   # USP strip: one line / marquee
```

These need the Playwright browser: `pnpm exec playwright install chromium`.

## Structure

```
src/app/                 routes: layout, homepage, our-carts, rates, contact (+ server action), about-us,
                         robots, sitemap, manifest, icons, not-found
src/components/          Header, Footer, TopBar, TrustStrip, PromoModal, BookBar, SiteEffects,
                         PageHeader, Breadcrumbs, SectionNav, ContactForm, Picture, Icon, RichText
src/components/sections/ homepage sections (also reused: Faq, FinalCta)
src/lib/                 business data, page copy, schema builders, image manifest
src/styles/              design system CSS (tokens, base, components, pages) + per-page CSS
public/img/              built image variants
assets/source/           original photos, renamed descriptively
scripts/                 image pipeline, QA scripts
docs/                    design reference notes (client strategy documents are kept locally, not in git)
```

## Decisions

- **Plain CSS** with design tokens; no CSS-in-JS or Tailwind. Page-specific CSS is imported only by its page.
- **Fonts** via `next/font/local` (self-hosted, preloaded, metric-matched fallbacks).
- **Images use `<picture>`**, not `next/image`: the files are pre-built and art-directed, so they're served as-is on any host.
- **Client JavaScript** is limited to the header, top bar, USP strip, popup, booking bar, section nav, contact form and scroll effects. Everything else is server-rendered; FAQs use native `<details>`.
- **`trailingSlash: true`** matches the URL convention in the Execution Manual.
- **Schema deviations** from the SEO field report (following current Google guidance) are documented in `src/lib/schema.ts`.
