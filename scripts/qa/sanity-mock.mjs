// Local stand-in for Sanity's query API and image CDN, for testing the blog
// without a Sanity project. Serves sample posts (titled "Sample: …").
//
//   node scripts/qa/sanity-mock.mjs        # port 4600
//   NEXT_PUBLIC_SANITY_PROJECT_ID=mockproj SANITY_API_HOST_OVERRIDE=http://localhost:4600 \
//   SANITY_CDN_HOST_OVERRIDE=http://localhost:4600 pnpm build && pnpm start
//
// Never set the *_OVERRIDE variables in production.
import http from 'node:http';
import fs from 'node:fs';
import { parse, evaluate } from 'groq-js';
import sharp from 'sharp';

const ROOT = new URL('../..', import.meta.url).pathname.replace(/\/$/, '');
const seed = JSON.parse(fs.readFileSync(`${ROOT}/sanity/seed-data.json`, 'utf8'));
const manifest = JSON.parse(fs.readFileSync(`${ROOT}/src/lib/image-manifest.json`, 'utf8'));
const imgs = ['gallery-blue-4-seater-golf-cart-seaside', 'golf-cart-tropic-air-terminal-san-pedro-airport', 'guests-golf-cart-convoy-beachfront-san-pedro', 'camo-golf-cart-colourful-san-pedro-street', 'maroon-6-seater-golf-cart-beachfront-park', 'gallery-golf-carts-resort-entrance-sunset'];
const ids = Object.fromEntries(imgs.map((n, i) => [(i + 1).toString(16).padStart(8, 'a'), n]));
const img = (i, alt) => {
  const name = imgs[i]; const m = manifest[name]; const w = m.widths.at(-1); const h = Math.round((m.h * w) / m.w);
  return { _type: 'image', asset: { _ref: `image-${(i + 1).toString(16).padStart(8, 'a')}-${w}x${h}-jpg` }, alt };
};
const sp = (text, marks = []) => ({ _type: 'span', _key: Math.random().toString(36).slice(2), text, marks });
const block = (style, text, extra = {}) => ({ _type: 'block', _key: Math.random().toString(36).slice(2), style, markDefs: [], children: [sp(text)], ...extra });
const para = (t) => block('normal', t);
const linkPara = (before, linkText, href, after) => ({ _type: 'block', _key: 'l' + Math.random(), style: 'normal', markDefs: [{ _key: 'lk1', _type: 'link', href }], children: [sp(before), sp(linkText, ['lk1']), sp(after)] });

const docs = [
  ...seed.categories.map(({ slug, ...c }) => ({ _id: `category-${slug}`, _type: 'category', slug: { current: slug }, ...c })),
  ...seed.tags.map((t) => ({ _id: `tag-${t.slug}`, _type: 'tag', title: t.title, slug: { current: t.slug } })),
  { _id: 'author-one-love', _type: 'author', name: seed.author.name, slug: { current: 'one-love' }, kind: 'organization', bio: seed.author.bio },
];
const body = [
  para('SAMPLE POST FOR LAYOUT TESTING. The drive from our office to Secret Beach takes about 25 minutes. This paragraph is placeholder text used to check spacing, line length and the reading rhythm of a real post on the new site.'),
  linkPara('Before you set off, check the ', 'current rental rates', '/rates/', ' and pick a cart that fits your group. This second paragraph includes an internal link.'),
  block('h2', 'Leaving San Pedro Town'),
  para('Head north on Barrier Reef Drive. A third paragraph of sample text so the money-page callout lands after the fourth paragraph, the way the manual describes.'),
  { _type: 'block', _key: 'li1', style: 'normal', listItem: 'bullet', level: 1, markDefs: [], children: [sp('Fill up before you cross the bridge')] },
  { _type: 'block', _key: 'li2', style: 'normal', listItem: 'bullet', level: 1, markDefs: [], children: [sp('Bring cash for the beach bars')] },
  para('Fourth paragraph. The Book Now box should appear right after this one.'),
  block('h2', 'Crossing the Sir Barry Bowen Bridge'),
  { ...img(0, 'Sample image: a blue golf cart parked by the sea'), _type: 'figure', _key: 'fig1', caption: 'Sample caption for an in-body image.' },
  para('Sample paragraph after an image. The sand road is bumpy after rain, so take it slowly.'),
  { _type: 'callout', _key: 'c1', title: 'Local tip', text: 'Sample tip box. Leave Secret Beach before dark: the sand road has no street lights.' },
  block('h3', 'A third-level heading'),
  para('More sample text under an H3 heading to check the heading scale.'),
  block('blockquote', 'A sample pull quote to check the quote style.'),
  block('h2', 'Coming back to town'),
  para('Final sample paragraph.'),
];
const posts = [
  ['sample-route-to-secret-beach', 'Sample: The Route to Secret Beach, Turn by Turn', 'things-to-do-golf-cart', 0, '2026-10-05T15:00:00Z', true],
  ['sample-where-to-refuel', 'Sample: Where to Refuel Your Golf Cart on Ambergris Caye', 'ambergris-caye-guide', 3, '2026-10-02T15:00:00Z', true],
  ['sample-tropic-air-vs-maya-island-air', 'Sample: Tropic Air vs Maya Island Air', 'getting-to-san-pedro', 1, '2026-09-28T15:00:00Z', false],
  ['sample-sunset-drives', 'Sample: The Best Sunset Drive Routes on Ambergris Caye', 'things-to-do-golf-cart', 5, '2026-09-20T15:00:00Z', true],
  ['sample-family-day-trip', 'Sample: A Family-Friendly Day Trip by Golf Cart', 'things-to-do-golf-cart', 2, '2026-09-12T15:00:00Z', false],
].map(([slug, title, cat, im, date, featured], i) => ({
  _id: `post-${i}`, _type: 'post', title, slug: { current: slug },
  excerpt: 'Sample excerpt for layout testing. About thirty words describing what the post covers, shown on cards across the blog and used as the search description when none is set.',
  mainImage: img(im, 'Sample featured image'), body, category: { _type: 'reference', _ref: `category-${cat}` },
  tags: [{ _type: 'reference', _ref: 'tag-secret-beach', _key: 't1' }, { _type: 'reference', _ref: 'tag-north-ambergris-caye', _key: 't2' }],
  author: { _type: 'reference', _ref: 'author-one-love' }, publishedAt: date, updatedAt: i === 0 ? '2026-10-06T12:00:00Z' : undefined, featured,
  faq: i === 0 ? [{ question: 'Sample question: how long is the drive?', answer: 'Sample answer: about 25 minutes each way.' }] : undefined,
}));
docs.push(...posts);

http.createServer(async (req, res) => {
  const u = new URL(req.url, 'http://x');
  try {
    if (u.pathname.includes('/data/query/')) {
      const params = {};
      for (const [k, v] of u.searchParams) if (k.startsWith('$')) params[k.slice(1)] = JSON.parse(v);
      const tree = parse(u.searchParams.get('query'), { params });
      const value = await evaluate(tree, { dataset: docs, params, timestamp: new Date() });
      const result = await value.get();
      res.writeHead(200, { 'content-type': 'application/json' });
      return res.end(JSON.stringify({ result }));
    }
    const m = /\/images\/[^/]+\/[^/]+\/([a-f0-9]+)-/.exec(u.pathname);
    if (m && ids[m[1]]) {
      const name = ids[m[1]]; const w = manifest[name].widths.at(-1);
      const W = Number(u.searchParams.get('w')) || w; const H = Number(u.searchParams.get('h')) || undefined;
      const buf = await sharp(`${ROOT}/public/img/${name}-${w}.jpg`).resize(W, H, { fit: 'cover' }).jpeg({ quality: 80 }).toBuffer();
      res.writeHead(200, { 'content-type': 'image/jpeg' });
      return res.end(buf);
    }
    res.writeHead(404); res.end();
  } catch (e) { console.error(String(e).slice(0, 300)); if (!res.headersSent) res.writeHead(500); res.end(String(e)); }
}).listen(4600, () => console.log('mock sanity on 4600'));
