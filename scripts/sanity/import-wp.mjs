// Imports every post from the live WordPress site into Sanity as published
// posts at the same URL (/<slug>/), with images, dates, the page's search
// title and description, a category and tags. The 16 posts the Execution
// Manual covers (retro-edit checklist) get its category, tags and links.
//
//   pnpm sanity:import-wp            # skips posts already in Sanity
//   pnpm sanity:import-wp --replace  # overwrites them (loses Studio edits)
//   pnpm sanity:import-wp --only=slug-a,slug-b
import { decode, excerptFrom, htmlToBlocks, imageField, key, matchTags, mutate, plain, query, slugify, tagRefs, uploadImage } from './lib.mjs';

const WP = 'https://onelovegolfcartsbelize.com';
const REPLACE = process.argv.includes('--replace');
const ONLY = (process.argv.find((a) => a.startsWith('--only=')) || '').slice(7).split(',').filter(Boolean);

/* The manual's retro-edit table (§16): category, tags, money link, sibling links. */
const MANUAL = {
  'perseid-meteor-shower-dark-sky-driving-for-stargazing': ['things-to-do-golf-cart', ['Perseid Meteor Shower', 'night driving', 'Secret Beach', 'Boca del Rio'], ['reserve a 4-seater for the meteor shower', '/book-now/'], ['night-fishing-bioluminescence-safe-parking-for-night-adventures', 'the-deep-south-expedition-how-far-can-you-really-go']],
  'the-deep-south-expedition-how-far-can-you-really-go': ['things-to-do-golf-cart', ['South Ambergris Caye', 'day trips', 'itinerary', 'gas cart'], ['weekly rental for a full-island expedition', '/rates/'], ['how-to-navigate-san-pedro-like-a-pro-using-golf-carts', 'perseid-meteor-shower-dark-sky-driving-for-stargazing']],
  'emancipation-day-aug-1-exploring-cultural-heritage-sites': ['san-pedro-events', ['Emancipation Day', 'cultural sites', 'Kriol heritage', 'holiday'], ['book a cart for Emancipation Day weekend', '/book-now/'], ['dia-de-san-pedro-2026-church-to-saca-chispas-festival-route', 'fourth-of-july-in-san-pedro-where-to-find-fireworks-burgers']],
  'costa-maya-festival-2026-the-ultimate-transportation-guide': ['san-pedro-events', ['Costa Maya Festival', 'festival parking', 'August event', 'San Pedro Town'], ['reserve a 6-seater for a Costa Maya Festival group', '/book-now/'], ['lobster-fest-2026-san-pedro-best-parking-for-the-block-party', 'dia-de-san-pedro-2026-church-to-saca-chispas-festival-route']],
  'night-fishing-bioluminescence-safe-parking-for-night-adventures': ['things-to-do-golf-cart', ['night driving', 'safety', 'bioluminescence', 'Hidden Reef'], ['book a cart with headlights and a locked parking option', '/our-carts/'], ['perseid-meteor-shower-dark-sky-driving-for-stargazing', 'how-to-drive-golf-cart-in-san-pedro-like-local']],
  'beating-the-heat-golf-cart-ac-hacks-shaded-routes': ['ambergris-caye-guide', ['rainy season', 'dry season', 'shade routes', 'family travel'], ['choose the 6-seater for shaded canopy on hot days', '/our-carts/#6-seater'], ['how-to-drive-golf-cart-in-san-pedro-like-local', 'the-great-lobster-crawl-a-self-guided-culinary-tour']],
  'the-great-lobster-crawl-a-self-guided-culinary-tour': ['things-to-do-golf-cart', ['Lobster Fest', 'food tour', "Estel's", "Wayo's", 'culinary itinerary'], ['reserve a weekly rental for the crawl', '/rates/'], ['lobster-fest-2026-san-pedro-best-parking-for-the-block-party', 'fathers-day-bbq-beers-in-san-pedro-the-man-cave-golf-cart-route']],
  'fourth-of-july-in-san-pedro-where-to-find-fireworks-burgers': ['san-pedro-events', ['Independence Day', 'Fourth of July', 'expat community', 'fireworks'], ['book a 6-seater for a family Fourth', '/book-now/'], ['fathers-day-bbq-beers-in-san-pedro-the-man-cave-golf-cart-route', 'emancipation-day-aug-1-exploring-cultural-heritage-sites']],
  'summer-solstice-sunrise-the-earliest-drive-of-the-year': ['things-to-do-golf-cart', ['sunrise drive', 'solstice', 'North Ambergris Caye', 'seasonal'], ['book a cart the night before for a pre-dawn drive', '/book-now/'], ['perseid-meteor-shower-dark-sky-driving-for-stargazing', 'the-deep-south-expedition-how-far-can-you-really-go']],
  'fathers-day-bbq-beers-in-san-pedro-the-man-cave-golf-cart-route': ['san-pedro-events', ["Father's Day", 'BBQ', 'beer route', 'groups'], ["reserve a 6-seater for a Father's Day group", '/our-carts/#6-seater'], ['the-great-lobster-crawl-a-self-guided-culinary-tour', 'fourth-of-july-in-san-pedro-where-to-find-fireworks-burgers']],
  'lobster-fest-2026-san-pedro-best-parking-for-the-block-party': ['san-pedro-events', ['Lobster Fest', 'block party', 'parking guide', 'June event'], ['reserve a cart for Lobster Fest weekend', '/book-now/'], ['the-great-lobster-crawl-a-self-guided-culinary-tour', 'dia-de-san-pedro-2026-church-to-saca-chispas-festival-route']],
  'dia-de-san-pedro-2026-church-to-saca-chispas-festival-route': ['san-pedro-events', ['Dia de San Pedro', 'Saca Chispas', 'June 29', 'procession route'], ['book a 4-seater for the procession route', '/book-now/'], ['lobster-fest-2026-san-pedro-best-parking-for-the-block-party', 'costa-maya-festival-2026-the-ultimate-transportation-guide']],
  'how-to-drive-golf-cart-in-san-pedro-like-local': ['ambergris-caye-guide', ['driving rules', 'Barrier Reef Drive', 'Middle Street', 'safety'], ['rent a Club Car for your first day on the island', '/our-carts/'], ['how-to-navigate-san-pedro-like-a-pro-using-golf-carts', 'beating-the-heat-golf-cart-ac-hacks-shaded-routes']],
  'how-to-navigate-san-pedro-like-a-pro-using-golf-carts': ['ambergris-caye-guide', ['navigation', 'one-way streets', 'San Pedro Town', 'tips'], ['book a cart and start with our navigation guide', '/book-now/'], ['how-to-drive-golf-cart-in-san-pedro-like-local', 'exploring-san-pedro-by-golf-cart']],
  'san-pedro-belize-golf-cart-itinerary-weekend-guide': ['things-to-do-golf-cart', ['weekend itinerary', 'three-day trip', 'quick guide', 'first-time visit'], ['book a weekend cart rental', '/book-now/'], ['exploring-san-pedro-by-golf-cart', 'the-deep-south-expedition-how-far-can-you-really-go']],
};

/* Category for the other posts, from title keywords (first match wins). */
const RULES = [
  ['san-pedro-events', /halloween|equinox|parade|george|independence|perseid|emancipation|costa maya|fourth of july|solstice|father|lobster fest|dia de|nurse|mother|earth day|festival|easter|carnival|christmas|holiday|valentine|heroes|december|new year|events|marco gonzalez/i],
  ['getting-to-san-pedro', /water taxi|airport|tropic air|maya island|flight|arriv|getting to/i],
  ['cart-selection', /scam|true cost|daily vs|weekly|booking in advance|choose the best|comparison|alternatives|models|loudest|purr|upgrade|accessible|split golf cart|well-maintained|maintenance|mechanic|oil level|fuel polic|roadside|breaks down|flat tire|fuel theft|regulations|why belize still uses gas|reliable in belize|best seasons/i],
  ['things-to-do-golf-cart', /itinerary|beaches|hidden gems|trails|scenic|instagram|snorkel|dive|food|landmark|expedition|fishing|crawl|playground|birdwatch|photography|sunset|cafes|real estate|day and night|places to visit|history|explore|budget/i],
  ['ambergris-caye-guide', /./],
];
const categoryFor = (title) => RULES.find(([, re]) => re.test(title))[0];

async function wpPosts() {
  const out = [];
  for (let page = 1; ; page++) {
    const res = await fetch(`${WP}/wp-json/wp/v2/posts?per_page=100&page=${page}&_fields=id,slug,date_gmt,modified_gmt,title,content,featured_media`);
    if (!res.ok) break;
    const batch = await res.json();
    out.push(...batch);
    if (batch.length < 100) break;
  }
  return out;
}

/** The live page's <title> and meta description (the SEO plugin's output). */
async function seoFor(slug) {
  const html = await (await fetch(`${WP}/${slug}/`)).text();
  const title = decode(/<title>([^<]*)<\/title>/i.exec(html)?.[1] ?? '').trim();
  const description = decode(/<meta name="description" content="([^"]*)"/i.exec(html)?.[1] ?? '').trim();
  return { title, description };
}

async function featured(id) {
  if (!id) return null;
  const res = await fetch(`${WP}/wp-json/wp/v2/media/${id}?_fields=source_url,alt_text`);
  return res.ok ? res.json() : null;
}

const fileName = (url) => decodeURIComponent(url.split('/').pop().split('?')[0]);

async function run() {
  const posts = (await wpPosts()).filter((p) => !ONLY.length || ONLY.includes(p.slug));
  const existing = new Set(await query(`*[_type == "post" && _id in $ids]._id`, { ids: posts.map((p) => `wp-${p.id}`) }));
  const titles = Object.fromEntries(posts.map((p) => [p.slug, decode(p.title.rendered)]));
  console.log(`${posts.length} WordPress posts; ${existing.size} already in Sanity${REPLACE ? ' (will replace)' : ' (skipped)'}.`);

  const newTags = new Map();
  const report = [];
  for (const p of posts) {
    const _id = `wp-${p.id}`;
    if (existing.has(_id) && !REPLACE) continue;
    const title = decode(p.title.rendered);
    const manual = MANUAL[p.slug];

    const body = await htmlToBlocks(p.content.rendered, async (src, alt, caption) => {
      try {
        const asset = await uploadImage(src, fileName(src));
        return { _type: 'figure', _key: key(), ...imageField(asset, alt || title, caption) };
      } catch (e) {
        console.warn(`  image skipped (${p.slug}): ${e.message}`);
        return null;
      }
    });

    if (manual) {
      const [anchor, href] = manual[2];
      const items = [[anchor, href], ...manual[3].map((s) => [titles[s] || s.replace(/-/g, ' '), `/${s}/`])];
      body.push({ _type: 'block', _key: key(), style: 'h2', markDefs: [], children: [{ _type: 'span', _key: key(), text: 'Keep reading', marks: [] }] });
      for (const [text, url] of items) {
        const k = key();
        body.push({ _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [{ _key: k, _type: 'link', href: url }], children: [{ _type: 'span', _key: key(), text: text.charAt(0).toUpperCase() + text.slice(1), marks: [k] }] });
      }
    }

    const seo = await seoFor(p.slug).catch(() => ({ title: '', description: '' }));
    const media = await featured(p.featured_media);
    let mainImage;
    if (media?.source_url) {
      try {
        mainImage = imageField(await uploadImage(media.source_url, fileName(media.source_url)), decode(media.alt_text || '').trim() || title);
      } catch (e) {
        console.warn(`  featured image skipped (${p.slug}): ${e.message}`);
      }
    }

    const category = manual ? manual[0] : categoryFor(title);
    let tags;
    if (manual) {
      tags = manual[1].map((t) => {
        const s = slugify(t);
        newTags.set(s, t);
        return s;
      });
    } else tags = matchTags(`${title} ${plain(body).slice(0, 4000)}`);

    const doc = {
      _id,
      _type: 'post',
      title,
      slug: { _type: 'slug', current: p.slug },
      excerpt: excerptFrom(seo.description || plain(body), 32).slice(0, 255),
      ...(mainImage ? { mainImage } : {}),
      body,
      category: { _type: 'reference', _ref: `category-${category}` },
      tags: tagRefs(tags),
      author: { _type: 'reference', _ref: 'author-one-love' },
      publishedAt: `${p.date_gmt}Z`,
      ...(p.modified_gmt && p.modified_gmt.slice(0, 10) !== p.date_gmt.slice(0, 10) ? { updatedAt: `${p.modified_gmt}Z` } : {}),
      ...(seo.title ? { seoTitle: seo.title } : {}),
      ...(seo.description ? { seoDescription: seo.description } : {}),
    };
    await mutate([
      ...[...newTags].map(([s, t]) => ({ createIfNotExists: { _id: `tag-${s}`, _type: 'tag', title: t, slug: { _type: 'slug', current: s } } })),
      { [REPLACE ? 'createOrReplace' : 'createIfNotExists']: doc },
    ]);
    newTags.clear();
    report.push(`${category.padEnd(22)} ${body.length.toString().padStart(3)} blocks ${mainImage ? 'img' : 'NO IMG'}  ${p.slug}`);
    console.log(`  ✓ ${p.slug}`);
  }
  console.log(`\nImported ${report.length}:\n${report.join('\n')}`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
