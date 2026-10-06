# One Love Golf Cart Rentals — Next.js site

Homepage and site foundation, built with Next.js 16 (App Router), React 19 and TypeScript. Every route is statically prerendered.

```
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint
```

Set `NEXT_PUBLIC_SITE_URL` if the production origin isn't `https://onelovegolfcartsbelize.com`. It's used for the canonical URL, Open Graph, JSON-LD, robots and sitemap.

## Search indexing is blocked by default

While this is a preview, it must not compete with the live WordPress site. Indexing is blocked in three places: `<meta name="robots">`, `robots.txt` and an `X-Robots-Tag` header. To lift it at launch, set `NEXT_PUBLIC_ALLOW_INDEXING=true` in the production environment. Leave it unset on every preview deployment. See `src/lib/seo.ts`.

## Promotion popup

`src/lib/promo.ts` holds the copy, prices and end date. The popup shows once per visit: on the first page a visitor opens in a browser tab, but not on later pages in that tab. Closing the tab and coming back shows it again. It stops automatically at `endsAt`. For a new offer, edit the object and change `id`. Set `enabled: false` to turn it off.

## Images

The source photos are in `assets/source/`. `npm run images` writes AVIF/WebP/JPEG variants to `public/img/` and updates `src/lib/image-manifest.json`.

## Structure

```
src/app/                 layout (fonts, header, footer), page (homepage + metadata + JSON-LD),
                         robots.ts, sitemap.ts, manifest.ts, icon/apple-icon, not-found
src/components/          Header (client: scroll states, dropdowns, mobile menu), Footer,
                         BookBar (client), SiteEffects (client: reveals, parallax), Picture, Icon
src/components/sections/ one server component per homepage section
src/lib/business.ts      NAP, rates, ratings, profiles, planned URLs (single source of truth)
src/lib/content.ts       homepage copy, verbatim from Execution Manual §04
src/lib/schema.ts        JSON-LD built from the same data the page renders
src/styles/              design system CSS (tokens, base, components, home, motion)
public/img/              pre-built AVIF/WebP/JPEG variants (npm run images)
assets/source/           original photos, renamed descriptively
scripts/build-images.mjs image pipeline (sharp)
docs/                    design reference notes
```

## Decisions

- **Plain global CSS.** The design system is ported 1:1 from the WordPress theme so both stay identical; there's no CSS-in-JS and no Tailwind.
- **Fonts** use `next/font/local` (self-hosted, preloaded, metric-matched fallbacks).
- **Images use `<picture>`, not `next/image`.** The files are already art-directed and compressed to AVIF and WebP, and this works on any host, including static export. To change photos, edit `scripts/build-images.mjs` and run `npm run images`.
- **Client JavaScript** is limited to the header, mobile booking bar and scroll effects. Everything else is server-rendered and works without JS. The FAQ uses native `<details>`.
- **`trailingSlash: true`** matches the URL convention in the Execution Manual.
- **Schema deviations** from the field report (current Google guidance) are documented in `src/lib/schema.ts`.

## Not built yet

- Every page the homepage links to (`/book-now/`, `/rates/`, `/our-carts/`, location pages, guides) shows the 404 page until it's built.
- The booking and contact forms currently live in WPForms on the WordPress site. A Next.js replacement needs a form handler (route handler + email or CRM) and a decision about payments (PayPal / Pay Now).
- Rank Math's per-page SEO control doesn't exist here. Titles and descriptions live in each route's `metadata` export.
