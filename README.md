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

## Blog (Sanity CMS)

Posts, categories, tags and authors are edited in **Sanity Studio**, hosted by Sanity at **https://onelove-blog.sanity.studio**. `/studio` on the site redirects there. Editors log in with their Sanity account. Posts publish to `/<slug>/`. Categories live at `/category/<slug>/`, authors at `/author/<slug>/`, and tags at `/tag/<slug>/` (search engines only index a tag once it has 3+ posts). The blog home is `/blog/`. Pillar guides (Things to Do, arrival guide, comparison, Ambergris Caye) stay as code pages.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` | The Sanity project the site reads from (dataset defaults to `production`). Without them the blog shows its categories and an empty post list. |
| `SANITY_STUDIO_PROJECT_ID` | Same project ID, for running (`pnpm studio`) or deploying (`pnpm studio:deploy`) the Studio. |
| `SANITY_REVALIDATE_SECRET` | Shared secret for the Sanity webhook that refreshes the site on publish. |
| `SANITY_API_WRITE_TOKEN` | Editor token, only for `pnpm sanity:seed`. Never needed by the live site. |

One-time setup:

1. Create the project at [sanity.io/manage](https://www.sanity.io/manage) with a public `production` dataset. Put its ID in the variables above.
2. Create an **Editor** API token, then run `pnpm sanity:seed`. This adds the 5 categories, the tag list and the default "One Love Golf Cart Rentals" author.
3. Run `pnpm studio:deploy` after changing anything in `sanity/` or `sanity.config.ts`. This republishes the hosted Studio.
4. Invite editors under **Members** in sanity.io/manage.
5. Add a webhook under **API → Webhooks**:
   - URL: `https://onelovegolfcartsbelize.com/api/revalidate`
   - Dataset: `production`
   - Triggers: create, update and delete
   - Filter: `_type in ["post","category","author","tag"]`
   - Secret: the value of `SANITY_REVALIDATE_SECRET`

`pnpm studio` runs the Studio locally on port 3333.

Content imports. Both need `SANITY_API_WRITE_TOKEN`; neither overwrites existing documents unless you pass `--replace`.

| Command | What it does |
|---|---|
| `pnpm sanity:import-wp` | Imports every post from the live WordPress site at the same URL, as published posts. It brings the images, dates, search title and description, a category and tags. The 16 posts the manual covers get its categories, tags and links. |
| `pnpm sanity:import-manual` | Imports the manual's 20 new spoke posts as drafts, each with a One Love photo. It reads `.qa/docs/manual.txt`, or the file in `MANUAL_TXT`. `--dry` parses and reports without writing. | `pnpm qa:sanity-mock` serves sample posts so you can test the blog pages without a project; see the script's header.

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
pnpm qa:card                                    # card number / expiry / CVC typing behaviour
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
