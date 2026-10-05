# Design notes

Direction: **Island Editorial**, derived from the Webflow templates Bilal
selected (Caladan, Waveyu, Yachting, Avenora, Wayo, Lifecycle, SaleUnion,
Scalient). Copy is taken verbatim from the Execution Manual, section 04.

See [README.md](../README.md) for how the app is laid out and how to run it.

## The static prototype

`reference/static-prototype/` is the plain HTML and CSS build this app was
ported from. It is kept because every `<section>` in it carries a comment
naming the WordPress partial it maps to (`section-hero.php`,
`section-carts.php`, and so on), which makes it the better reference for the
eventual theme port. It is excluded from linting and is not part of the build.

## What changed from the first version

The first build was measured against the eight reference templates and came up
short in ways that were structural, not cosmetic:

| | References | v1 | v2 |
|---|---|---|---|
| Type families | 2-3 with distinct jobs | 1 | 3 |
| Display weight | 400 at 64-104px | 900 at 78px | 400 at 80px |
| Two-tone headlines | yes | no | yes |
| Mono micro-labels | throughout | none | throughout |
| Ground | warm off-white | cool blue-grey | warm off-white |
| Page height at 1440 | 7,600-14,700px | 19,724px | 8,680px |

The single biggest lever was the third type voice. SaleUnion runs Cambo +
Aspekta + Geist Mono; Caladan runs Inter Display + IBM Plex Mono. That mono
label layer carries most of the "designed" quality.

## Design system

| | |
|---|---|
| Display | Bricolage Grotesque 400, variable `opsz` axis so headlines are cut for display size |
| Body and UI | Schibsted Grotesk 400/500/600. Wider and more open at 16px than the usual neutral grotesques, which contrasts usefully with Bricolage's narrow display shapes |
| Labels | IBM Plex Mono 500, uppercase, tracked. Eyebrows, chips, bylines, field labels, numerals |
| Ink | `#0E1726` near-black with a navy cast, for all text |
| Brand navy | `#002561` flat panels, logo lockup, closing band, feature quote |
| Identity red | `#F44336` marks, stars, eyebrow dots |
| Action fill | `#DB3A2D`, white label on red. See note below |
| Action text | `#B62A1F` light / `#FF7A6B` dark, for red used AS text |
| Supporting pop | `#8FE8D4` seafoam, sampled from the sea in the hero photograph (`#94C7C8`) and saturated |
| Ground | `#F6F5F1` warm paper, `#EDEBE4` for alternating sections |
| Radius | hero and closing panel 32px, cards 24px, media 20px, chips and buttons full pill |

Headlines are two-tone: subject in full ink, qualifier at 48%. Each half is a
`<span class="ln">` so the colour change always lands on its own line rather
than mid-phrase.

Devices borrowed from the references, each named in `site.css`: the inset
rounded hero panel and the inline availability strip (Caladan), the floating
pill nav that detaches on scroll (Caladan and Avenora), the pill button with an
inset circular arrow badge (Avenora), the circular-arrow text link (Waveyu),
numbered editorial rows instead of a card grid (Caladan), the mono announcement
ribbon (SaleUnion).

Dark mode ships via `prefers-color-scheme`, driven entirely by the token block
at the top of `site.css`.

## Decisions you should know about

**Red has three values, not one.** `#F44336` is the brand and stays untouched
on icon marks, stars and rules. `#DB3A2D` fills buttons, because white on
`#F44336` is only 3.67:1. `#B62A1F` (light) and `#FF7A6B` (dark) are for red used
*as text*, because `#DB3A2D` as a text colour is only 3.78:1 on the section tint
and 3.61:1 on dark cards. If you add a red text state, use `--action-text`.

**One label per action.** The Manual specifies "Book Now" in the hero and nav
but "Reserve your golf cart" on the closing band. Those are the same action, so
every booking control now reads **Book now**. This is the only copy change on the
page and the SEO professional should sign it off or overrule it.

**The hero trust strip is its own rail, not part of the hero.** The Manual puts
it "immediately under subhead". It sits directly below the hero instead, as a
hairline-ruled mono rail, with the five claims as discrete cells rather than a
dot-separated run-on. Same content, same reading order.

**Cart-strip H2 is "Two carts. Both gas Club Car."** The Manual supplies an H2
for every other section but not this one. Placeholder pending SEO.

**Four headlines were split to carry the two-tone treatment.** No words were
added or removed, only a `<span>` inserted at an existing phrase boundary:
"Golf Cart Rental / in San Pedro, Belize", "Why rent / from One Love", "What our
customers / say", "Explore Ambergris Caye / by cart". One heading was shortened:
"Frequently asked questions" to "Frequently asked" in the FAQ sidebar, because
the full string does not hold at display size in that column. The `<h2>` text is
the visible heading, so SEO should confirm that one.

**A hero availability strip was added.** Cart type, pick-up date, return date,
and a submit that hands off to `/book-now/` with the values as query params. It
is new UI, not new copy, and it is the main conversion device on the page. The
booking form itself still lives on `/book-now/` per Manual section 10.

**An announcement ribbon was added** carrying the bridge-passes line that is
already on the live site and in the Manual's benefit block 2.

**Testimonials carry no dates.** The Manual's format is name, month, year,
source. The live Trustindex widget does not expose review dates, and inventing
them was not an option. Three verbatim Google reviews ship with name and source
only. Dates need supplying before launch.

**The "Why rent from One Love" section was a 2x2 grid and is now three columns
plus a band.** The photo cell was the only bottom-anchored cell among three
top-anchored ones, and it set the row height, so the shortest text cell carried
a 140px orphan void and nothing in the grid shared a baseline. Three equal
columns fixed the alignment; the fleet photograph moved into a full-width band
below, where a lineup shot gets a lineup-shaped frame.

Inside the band the copy sits on its own navy panel beside the photo rather
than on a scrim over it. A scrim heavy enough to carry body text was washing
out the two carts on the left, and the photo is the point of that band. The
fleet image was re-cropped from the original to 21:9 for the same reason.

The icon badges are solid fills carrying an inverted glyph. The previous
low-alpha tints read as smudges, worst on the aqua cell where navy at 15%
barely registered.

## Verified

| Check | Result |
|---|---|
| Breakpoints shot | 1920, 1440, 1024, 820, Pixel 7, iPhone 13 |
| Horizontal overflow | none at any width |
| H1 | 2 lines at every breakpoint |
| Hero CTA | above the fold at every breakpoint |
| CTA labels | none wrap |
| Contrast | 77 text and control samples pass AA in both themes, measured from rendered pixels |
| Keyboard | full tab order, nav submenus open on focus and are tabbable, Escape closes the mobile menu |
| Reduced motion | all reveals resolve visible, no stuck elements |
| Console | no errors, every icon reference resolves |
| Payload | 973 KB desktop / 711 KB mobile on first load |
| CLS | 0 |
| Page height | 8,680px at 1440, inside the reference band |
| Static detector | `impeccable detect` clean on both files |

## Structured data

`LocalBusiness`+`AutoRental`, `Organization`, `WebSite`+`SearchAction`,
`Product`+`Offer` ×2, `FAQPage` ×6, `AggregateRating` 4.9 / 104.
Values per Manual section 04. On the WordPress build, LocalBusiness and
Organization move to `header.php` so they load site-wide.

## Open items

**Client must supply** (rendered as visible dashed placeholders in the footer so
they cannot ship unnoticed): business registration number, insurance carrier.

**Photography.** Everything on the page is re-cropped from the current site,
per your instruction. The sources are phone exports at 1280–1600px, so they cap
how sharp the hero can get. Worth shooting, in priority order:

1. Hero — a branded cart on Barrier Reef Drive, landscape, room on the left for type
2. A clean 6-seater side profile somewhere better than the current fence-and-gravel lot
3. The office frontage at 1 Barrier Reef Drive
4. A handover at the Tropic Air gate, with people in frame

**URLs referenced that do not exist yet** (Manual sections 16–18). Each needs a
slot created before launch or the link changed:

```
/golf-cart-comparison-4-vs-6-seater/   /how-we-maintain-our-fleet/
/golf-cart-rental-san-pedro/           /delivery-to-secret-beach/
/rentals-at-san-pedro-airport/         /resort-delivery/
/south-ambergris-delivery/             /north-ambergris-delivery/
/the-secret-beach-route/               /where-to-refuel-ambergris-caye/
/how-to-drive-a-golf-cart-like-a-local/  /twenty-stops-worth-the-drive/
```

**Review count mismatch.** The Manual says 4.9 across 104 Tripadvisor reviews.
The live Google widget says 130. The page uses the Manual's figures throughout,
including in `AggregateRating`. Worth confirming both numbers before launch,
since they are now in structured data.

## Third-party assets

Phosphor Icons (MIT), inlined as a pruned sprite. Tripadvisor mark from Simple
Icons (CC0), with its bundled `<style>` block stripped so it cannot repaint the
rest of the sprite. Bricolage Grotesque, Schibsted Grotesk and IBM Plex Mono from Google
Fonts, all self-hosted as woff2 (132 KB total).

## Notes for whoever picks this up

Two contrast bugs in this build came from pairing a hard-coded white surface
with `--ink`, which flips light in dark mode: the white CTA and the nav pill
both rendered white-on-white. There is now an `--ink-fixed` token for surfaces
that stay light in both themes. If you add another always-white surface, use it.

`--ink-3` and `--ink-faint` are separate on purpose. A muted headline half is
large text and only needs 3:1; an 11px mono label needs 4.5:1. One token cannot
serve both, and the values are solved against the actual grounds rather than
eyeballed.

Do not size the hero headline column in `ch`. That unit resolves from the *body*
font, so changing the body face silently resized the display headline and pushed
it to three lines. It is `min(44rem, 72%)` now.

No layout properties are animated. The mobile menu is an absolutely positioned
panel driven by transform and opacity, the zone rows translate their title on
hover rather than shifting their own padding, and arrow links translate the knob
rather than growing the flex gap.

The one suppressed detector rule is `cramped-padding`, scoped to these two files
with the measurement recorded as the reason: text sits 36-183px from every
flagged edge, and the detector is not resolving the inner `.shell`/`.cell`
padding. Everything else it raised was real and is fixed.
