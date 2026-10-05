# One Love Golf Cart Rentals

Homepage for [One Love Golf Cart Rentals](https://onelovegolfcartsbelize.com/),
a family-owned golf cart rental on Barrier Reef Drive in San Pedro Town,
Ambergris Caye, Belize.

Next.js 16 (App Router) · React 19 · TypeScript · hand-written CSS.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # production build
npm run start      # serve the build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

## How it is put together

```
app/
  layout.tsx       metadata, font variables, icon sprite, reveal observer
  page.tsx         section order, JSON-LD
  globals.css      the whole design system, documented inline
  fonts.ts         next/font/local for the three faces
  fonts/           self-hosted woff2
components/        one file per section, plus Button / ArrowLink / Icon / SiteLink
lib/content.ts     every visible string on the page
lib/schema.ts      structured data, built from lib/content.ts
public/img/        photography, re-cropped from the live site
docs/              design notes and the decision log
reference/         the verified static prototype this was ported from
```

**Copy lives in `lib/content.ts`, not in components.** The Web Developer Brief
assigns all page copy, headings, meta tags, alt text and schema values to the
SEO professional rather than to engineering. Keeping every string in one typed
module means a copy change is a one-file diff and never touches markup.

**`lib/schema.ts` is generated from the same module the page renders**, so the
structured data and the visible page cannot drift apart.

**No CSS framework.** `app/globals.css` is one hand-written stylesheet, small
enough to read top to bottom, with the design system documented in comments at
the head of the file. Components carry no styles of their own.

**`SiteLink`, not `next/link`, for internal hrefs.** The site's URL structure
covers around forty pages; this app currently serves one. `SiteLink` routes
through `next/link` only for routes listed in its `IMPLEMENTED` set and falls
back to a plain anchor otherwise, so unbuilt pages are not prefetched. Add a
route to that set when its page lands.

## Design

Direction, type system, colour, and the full decision log are in
[docs/DESIGN-NOTES.md](docs/DESIGN-NOTES.md). The short version:

| | |
|---|---|
| Display | Bricolage Grotesque 400, variable `opsz` |
| Body | Schibsted Grotesk |
| Labels | IBM Plex Mono, uppercase |
| Ink | `#0E1726` |
| Brand | `#002561` navy, `#F44336` red |
| Accent | `#8FE8D4` seafoam, sampled from the sea in the hero photograph |

## Search indexing

**This app is blocked from search engines by default.** While it is a preview
it must not compete with the live WordPress site at onelovegolfcartsbelize.com:
two copies of the same copy, both targeting the same head query, is the exact
duplicate-content problem the SEO plan exists to avoid.

It is enforced in three places, so nothing slips through:

| Layer | File | Covers |
|---|---|---|
| `<meta name="robots">` | `app/layout.tsx` | anything that renders HTML |
| `robots.txt` | `app/robots.ts` | well-behaved crawlers |
| `X-Robots-Tag` header | `next.config.ts` | images, JSON and assets with no meta tag |

### Before launch

Set `NEXT_PUBLIC_ALLOW_INDEXING=true` in the production environment. That is
the only change required: all three layers read it, and the sitemap reference
is added to `robots.txt` automatically. Leave it unset on every preview
deployment.

One caveat worth knowing. `Disallow: /` stops a crawler fetching the page,
which means it never sees the `noindex` tag. That is the right order for a URL
that has never been indexed, which is the case here. If a preview URL ever does
get indexed, allow crawling first so the `noindex` can be read, and only add
the disallow once it has dropped out.

## Status

The homepage is built. The other pages in the Execution Manual are not.
`docs/DESIGN-NOTES.md` lists the URLs referenced but not yet created, the
assets the client still owes, and the copy decisions the SEO professional
needs to sign off.
