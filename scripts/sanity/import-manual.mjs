// Imports the Execution Manual's 20 spoke-post drafts (§18) into Sanity as
// DRAFTS for review: title, URL, category, tags, opening paragraph, every
// H2 section, the wrap-up, and the manual's internal links as a "Keep
// reading" list. Each gets a real One Love photo as its featured image.
//
//   pnpm sanity:import-manual            # skips drafts already in Sanity
//   pnpm sanity:import-manual --replace  # overwrites them
//   pnpm sanity:import-manual --dry      # parse and report only
import { readFileSync } from 'node:fs';
import { excerptFrom, imageField, key, matchTags, mutate, query, tagRefs, uploadImage } from './lib.mjs';

const REPLACE = process.argv.includes('--replace');
const DRY = process.argv.includes('--dry');
const ROOT = new URL('../..', import.meta.url).pathname;
const manualPath = process.env.MANUAL_TXT || `${ROOT}.qa/docs/manual.txt`;
const lines = readFileSync(manualPath, 'utf8').split('\n');

const CATEGORY = {
  'Ambergris Caye Guide': 'ambergris-caye-guide',
  'San Pedro Events': 'san-pedro-events',
  'Cart Selection': 'cart-selection',
  'Getting to San Pedro': 'getting-to-san-pedro',
  'Things to Do': 'things-to-do-golf-cart',
};

/** Featured photos (real One Love carts), with alt text describing the photo. */
const PHOTOS = {
  'where-to-refuel-your-golf-cart-ambergris-caye': ['camo-golf-cart-colourful-san-pedro-street', 'Lifted golf cart parked outside a yellow and lime-green building on a San Pedro street'],
  'bridge-toll-north-ambergris-caye-what-to-know': ['guests-golf-cart-convoy-beachfront-san-pedro', 'A line of One Love golf carts with guests driving along the beachfront in San Pedro'],
  'gas-vs-electric-golf-cart-ambergris-caye': ['navy-6-seater-golf-cart-rear-bench-profile', 'Navy One Love 6-seater gas golf cart in side profile'],
  'what-to-check-golf-cart-pickup-belize': ['teal-4-seater-golf-cart-side-profile', 'Teal One Love 4-seater golf cart in side profile'],
  'tropic-air-vs-maya-island-air-san-pedro': ['golf-cart-tropic-air-terminal-san-pedro-airport', 'A One Love golf cart parked outside the Tropic Air terminal at San Pedro Airport'],
  'water-taxi-belize-city-to-san-pedro-guide': ['guests-luggage-golf-carts-village-mart', 'A line of One Love golf carts carrying guests and suitcases along a street in San Pedro'],
  'secret-beach-route-from-san-pedro': ['gallery-blue-4-seater-golf-cart-seaside', 'Blue One Love 4-seater golf cart parked by the sea under a palm tree on Ambergris Caye'],
  'best-sunset-drive-routes-ambergris-caye': ['maroon-6-seater-golf-cart-beachfront-park', 'Maroon One Love 6-seater golf cart parked by a beachfront park in San Pedro'],
  'wedding-golf-cart-rental-san-pedro': ['gallery-four-colourful-golf-carts-line-up', 'Four One Love golf carts in teal, red, yellow and blue lined up side by side'],
  'family-friendly-golf-cart-day-trip-ambergris': ['gallery-guests-golf-carts-san-pedro-street', 'Guests sitting in a row of One Love golf carts parked on a San Pedro street'],
  'what-to-pack-golf-cart-day-san-pedro': ['gallery-pink-4-seater-golf-cart-sand', 'Pink One Love 4-seater golf cart parked on sand beside a fence'],
  'avoid-golf-cart-scams-belize': ['golf-cart-fleet-lineup-lot', 'A row of One Love golf carts lined up on the lot'],
  'best-instagram-spots-ambergris-caye-golf-cart': ['red-4-seater-club-car-bougainvillea-resort', 'Red lifted One Love golf cart parked on white sand beside pink bougainvillea'],
  'rainy-season-driving-san-pedro-tips': ['gallery-light-blue-4-seater-golf-cart-street', 'Light blue One Love 4-seater golf cart parked on a paved street beside a wooden fence'],
  'one-day-san-pedro-golf-cart-itinerary': ['green-golf-cart-san-pedro-central-park', 'Green One Love 4-seater golf cart parked beside San Pedro Central Park under a flamboyant tree'],
  'snorkel-launches-reachable-by-golf-cart-ambergris': ['one-love-fleet-lineup-under-palms', 'One Love golf carts lined up under palm trees'],
  'independence-day-belize-san-pedro-golf-cart': ['colourful-golf-cart-fleet-palms', 'Colourful One Love golf carts parked under palm trees'],
  'christmas-new-year-san-pedro-golf-cart': ['gallery-yellow-6-seater-golf-cart-white-fence', 'Yellow One Love 6-seater golf cart parked in front of a white picket fence'],
  'best-restaurants-north-ambergris-caye-golf-cart': ['gallery-golf-cart-line-up-turquoise-house', 'Red, yellow, camouflage, pink and white One Love golf carts lined up in front of a turquoise house'],
  'monthly-golf-cart-rental-san-pedro-belize': ['blue-golf-cart-one-love-lot', 'Blue One Love 4-seater golf cart parked under a covered shed at the One Love lot'],
};

const LINK_TOKENS = {
  'booking page': '/book-now/',
  'San Pedro Airport delivery page': '/rentals-at-san-pedro-airport/',
};

/* Category per slug, from the briefs table ("| 01 | /slug/ | title | pillar | …"). */
function pillarTable() {
  const out = {};
  const start = lines.findIndex((l) => l.startsWith('## New spoke blog posts'));
  for (let i = start; i < start + 200; i++) {
    const m = /^\s*\|\s*(\/[a-z0-9-]+\/)\s*$/.exec(lines[i]);
    if (m) {
      const pillar = lines[i + 2].replace(/^\s*\|\s*/, '').trim();
      out[m[1].slice(1, -1)] = CATEGORY[pillar];
    }
  }
  return out;
}

/** "text [link: booking page] more" → spans + markDefs. */
function richBlock(text, style = 'normal', extra = {}) {
  const markDefs = [];
  const children = [];
  let last = 0;
  for (const m of text.matchAll(/\[link: ([^\]]+)\]/g)) {
    if (m.index > last) children.push({ _type: 'span', _key: key(), text: text.slice(last, m.index), marks: [] });
    const k = key();
    markDefs.push({ _key: k, _type: 'link', href: LINK_TOKENS[m[1]] ?? '/book-now/' });
    children.push({ _type: 'span', _key: key(), text: m[1], marks: [k] });
    last = m.index + m[0].length;
  }
  if (last < text.length) children.push({ _type: 'span', _key: key(), text: text.slice(last), marks: [] });
  return { _type: 'block', _key: key(), style, markDefs, children, ...extra };
}

function parseSpokes() {
  const start = lines.findIndex((l) => l.startsWith('### Complete drafts for all 20 spoke posts'));
  const end = lines.findIndex((l, i) => i > start && l.startsWith('## '));
  const out = [];
  let cur = null;
  let section = null;
  for (let i = start; i < end; i++) {
    const raw = lines[i];
    const t = raw.trim();
    const url = /^\/([a-z0-9-]+)\/$/.exec(t);
    if (url && /^Spoke \d+/.test(lines[i + 1]?.trim() ?? '')) {
      cur = { slug: url[1], title: '', body: [], links: [] };
      out.push(cur);
      section = null;
      continue;
    }
    if (!cur) continue;
    if (t.startsWith('#### ')) cur.title = t.slice(5).trim();
    else if (t === 'Opening paragraph' || t === 'Wrap') section = 'para';
    else if (t.startsWith('H2: ')) {
      cur.body.push(richBlock(t.slice(4).trim(), 'h2'));
      section = 'para';
    } else if (t === 'Internal links') section = 'links';
    else if (t.startsWith('→ ') && section === 'links') {
      const [, path, anchor] = /^→ (\S+) · (.+)$/.exec(t) || [];
      if (path) cur.links.push([anchor.trim(), path]);
    } else if (t && section === 'para' && !t.startsWith('#') && !/^Spoke \d+$/.test(t) && t !== 'Draft (paste-ready)') {
      cur.body.push(richBlock(t));
      if (!cur.opening) cur.opening = t;
    }
  }
  return out;
}

async function run() {
  const pillars = pillarTable();
  const spokes = parseSpokes();
  if (spokes.length !== 20) throw new Error(`Expected 20 drafts, found ${spokes.length}`);
  if (DRY) {
    for (const s of spokes) console.log(`${(pillars[s.slug] ?? 'NO CATEGORY').padEnd(22)} h2:${s.body.filter((b) => b.style === 'h2').length} p:${s.body.filter((b) => b.style === 'normal').length} links:${s.links.length} photo:${PHOTOS[s.slug] ? 'y' : 'MISSING'}  ${s.slug} | ${s.title}`);
    return;
  }
  const ids = spokes.map((s) => `drafts.manual-${s.slug}`);
  const existing = new Set(await query(`*[_id in $ids]._id`, { ids }));
  const report = [];
  for (const s of spokes) {
    const _id = `drafts.manual-${s.slug}`;
    if (existing.has(_id) && !REPLACE) continue;
    const body = [...s.body];
    if (s.links.length) {
      body.push({ _type: 'block', _key: key(), style: 'h2', markDefs: [], children: [{ _type: 'span', _key: key(), text: 'Keep reading', marks: [] }] });
      for (const [anchor, href] of s.links) {
        const k = key();
        body.push({ _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [{ _key: k, _type: 'link', href }], children: [{ _type: 'span', _key: key(), text: anchor.charAt(0).toUpperCase() + anchor.slice(1), marks: [k] }] });
      }
    }
    const [photo, alt] = PHOTOS[s.slug];
    const manifest = JSON.parse(readFileSync(`${ROOT}src/lib/image-manifest.json`, 'utf8'))[photo];
    const asset = await uploadImage(`${ROOT}public/img/${photo}-${manifest.widths.at(-1)}.jpg`, `${photo}.jpg`);
    const text = `${s.title} ${body.map((b) => (b.children || []).map((c) => c.text).join('')).join(' ')}`;
    const doc = {
      _id,
      _type: 'post',
      title: s.title,
      slug: { _type: 'slug', current: s.slug },
      excerpt: excerptFrom(s.opening, 30),
      mainImage: imageField(asset, alt),
      body,
      category: { _type: 'reference', _ref: `category-${pillars[s.slug]}` },
      tags: tagRefs(matchTags(text)),
      author: { _type: 'reference', _ref: 'author-one-love' },
      publishedAt: new Date().toISOString(),
    };
    await mutate([{ [REPLACE ? 'createOrReplace' : 'createIfNotExists']: doc }]);
    report.push(`${pillars[s.slug].padEnd(22)} ${String(body.length).padStart(3)} blocks  ${s.slug}`);
  }
  console.log(`Imported ${report.length} drafts:\n${report.join('\n')}`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
