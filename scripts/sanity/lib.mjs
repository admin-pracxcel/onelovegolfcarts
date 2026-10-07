// Shared helpers for the Sanity import scripts: API calls, image uploads,
// HTML → Portable Text, and tag/category helpers.
import { readFileSync } from 'node:fs';
import { parse } from 'node-html-parser';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!projectId || !token) {
  console.error('Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN.');
  process.exit(1);
}
const API = `https://${projectId}.api.sanity.io/v2025-02-19`;

export const seed = JSON.parse(readFileSync(new URL('../../sanity/seed-data.json', import.meta.url)));

let n = 0;
export const key = () => `k${(++n).toString(36)}${Math.random().toString(36).slice(2, 7)}`;
export const slugify = (s) => s.toLowerCase().replace(/[’']/g, '').replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export async function query(groq, params = {}) {
  const u = new URL(`${API}/data/query/${dataset}`);
  u.searchParams.set('query', groq);
  for (const [k, v] of Object.entries(params)) u.searchParams.set(`$${k}`, JSON.stringify(v));
  const res = await fetch(u, { headers: { Authorization: `Bearer ${token}` } });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error?.description || `query ${res.status}`);
  return json.result;
}

export async function mutate(mutations) {
  for (let i = 0; i < mutations.length; i += 50) {
    const res = await fetch(`${API}/data/mutate/${dataset}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ mutations: mutations.slice(i, i + 50) }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error?.description || JSON.stringify(json).slice(0, 400));
  }
}

const uploaded = new Map();
/** Upload an image (URL or local path) once; returns its asset _id. */
export async function uploadImage(src, filename) {
  if (uploaded.has(src)) return uploaded.get(src);
  const buf = src.startsWith('http') ? Buffer.from(await (await fetch(src)).arrayBuffer()) : readFileSync(src);
  const res = await fetch(`${API}/assets/images/${dataset}?filename=${encodeURIComponent(filename)}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/octet-stream' },
    body: buf,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(`upload ${filename}: ${json.error?.description || res.status}`);
  uploaded.set(src, json.document._id);
  return json.document._id;
}

export const imageField = (assetId, alt, caption) => ({ _type: 'image', asset: { _type: 'reference', _ref: assetId }, alt, ...(caption ? { caption } : {}) });

/* Links ------------------------------------------------------------------- */

const SITE = /^https?:\/\/(www\.)?onelovegolfcartsbelize\.com/i;
const RENAMED = { '/terms-conditons/': '/terms-and-conditions/', '/privacy-policy-2/': '/privacy-policy/' };

/** Site links become relative paths (with old WordPress URLs mapped). Same-page anchors are dropped. */
export function normalizeHref(href) {
  if (!href || href.startsWith('#')) return null;
  let h = href.trim();
  if (SITE.test(h)) {
    h = h.replace(SITE, '') || '/';
    h = h.replace(/#.*$/, '');
    if (!h.includes('?') && !/\.[a-z0-9]{2,4}$/i.test(h) && !h.endsWith('/')) h += '/';
    h = RENAMED[h] || h;
  }
  return h;
}

/* HTML → Portable Text ------------------------------------------------------ */

const SKIP = new Set(['script', 'style', 'svg', 'nav', 'noscript', 'iframe', 'form', 'button']);
const INLINE = new Set(['span', 'strong', 'b', 'em', 'i', 'a', 'br', 'code', 'u', 'small', 'sup', 'sub', 'mark', 'abbr', '#text']);

/**
 * Converts HTML to Portable Text blocks. `onImage(src, alt)` uploads an image
 * and returns a figure block (or null).
 */
export async function htmlToBlocks(html, onImage) {
  const root = parse(html, { blockTextElements: { script: false, style: false, pre: true } });
  root.querySelectorAll('#ez-toc-container, .ez-toc-container, .ez-toc-section, .ez-toc-section-end').forEach((n) => {
    if (n.classList?.contains('ez-toc-section') || n.classList?.contains('ez-toc-section-end')) n.remove();
    else n.remove();
  });
  const blocks = [];

  function inline(node, marks, ctx) {
    if (node.nodeType === 3) {
      const text = node.rawText.replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ');
      if (text) ctx.children.push({ _type: 'span', _key: key(), text: decode(text), marks: [...marks] });
      return;
    }
    if (node.nodeType !== 1) return;
    const tag = node.rawTagName?.toLowerCase();
    if (SKIP.has(tag)) return;
    if (tag === 'br') {
      ctx.children.push({ _type: 'span', _key: key(), text: '\n', marks: [] });
      return;
    }
    if (tag === 'img') {
      ctx.images.push(node);
      return;
    }
    let m = marks;
    if (tag === 'strong' || tag === 'b') m = [...marks, 'strong'];
    else if (tag === 'em' || tag === 'i') m = [...marks, 'em'];
    else if (tag === 'a') {
      const href = normalizeHref(node.getAttribute('href'));
      if (href) {
        const k = key();
        ctx.markDefs.push({ _key: k, _type: 'link', href });
        m = [...marks, k];
      }
    }
    for (const c of node.childNodes) inline(c, m, ctx);
  }

  async function pushText(node, style, extra = {}) {
    const ctx = { children: [], markDefs: [], images: [] };
    for (const c of node.childNodes) inline(c, [], ctx);
    // Tidy whitespace at the edges and merge adjacent spans with equal marks.
    const kids = [];
    for (const s of ctx.children) {
      const prev = kids[kids.length - 1];
      if (prev && prev.marks.join() === s.marks.join()) prev.text += s.text;
      else kids.push({ ...s });
    }
    if (kids.length) {
      kids[0].text = kids[0].text.replace(/^\s+/, '');
      kids[kids.length - 1].text = kids[kids.length - 1].text.replace(/\s+$/, '');
    }
    const text = kids.map((k) => k.text).join('').trim();
    if (text) {
      const used = new Set(kids.flatMap((k) => k.marks));
      blocks.push({ _type: 'block', _key: key(), style, markDefs: ctx.markDefs.filter((d) => used.has(d._key)), children: kids.filter((k) => k.text), ...extra });
    }
    for (const img of ctx.images) await pushImage(img);
  }

  async function pushImage(img, caption) {
    const src = img.getAttribute('src') || img.getAttribute('data-src');
    if (!src || src.startsWith('data:')) return;
    const fig = await onImage(src, (img.getAttribute('alt') || '').trim(), caption);
    if (fig) blocks.push(fig);
  }

  async function walk(node, listLevel = 0, listType) {
    for (const c of node.childNodes) {
      if (c.nodeType === 3) {
        if (c.rawText.trim()) await pushText(parse(`<p>${c.rawText}</p>`).firstChild, 'normal');
        continue;
      }
      if (c.nodeType !== 1) continue;
      const tag = c.rawTagName?.toLowerCase();
      if (SKIP.has(tag)) continue;
      if (tag === 'p') await pushText(c, 'normal');
      else if (tag === 'h1' || tag === 'h2') await pushText(c, 'h2');
      else if (tag === 'h3') await pushText(c, 'h3');
      else if (/^h[4-6]$/.test(tag)) await pushText(c, 'h4');
      else if (tag === 'blockquote') {
        const ps = c.querySelectorAll('p');
        if (ps.length) for (const p of ps) await pushText(p, 'blockquote');
        else await pushText(c, 'blockquote');
      } else if (tag === 'ul' || tag === 'ol') {
        for (const li of c.childNodes.filter((x) => x.nodeType === 1 && x.rawTagName?.toLowerCase() === 'li')) {
          const nested = li.childNodes.filter((x) => x.nodeType === 1 && ['ul', 'ol'].includes(x.rawTagName?.toLowerCase()));
          nested.forEach((x) => li.removeChild(x));
          await pushText(li, 'normal', { listItem: tag === 'ol' ? 'number' : 'bullet', level: listLevel + 1 });
          for (const x of nested) await walk(parse(x.outerHTML), listLevel + 1);
        }
      } else if (tag === 'figure') {
        const img = c.querySelector('img');
        const cap = c.querySelector('figcaption')?.text.trim();
        if (img) await pushImage(img, cap);
        else if (c.querySelector('table')) await walk(c, listLevel);
      } else if (tag === 'img') await pushImage(c);
      else if (tag === 'table') {
        const rows = c.querySelectorAll('tr').map((tr) => ({ _type: 'row', _key: key(), cells: tr.querySelectorAll('th,td').map((td) => decode(td.text.replace(/\s+/g, ' ').trim())) }));
        if (rows.length) blocks.push({ _type: 'table', _key: key(), hasHeader: c.querySelectorAll('th').length > 0, rows });
      } else if (tag === 'hr') continue;
      else if (INLINE.has(tag)) await pushText(parse(`<p>${c.outerHTML}</p>`).firstChild, 'normal');
      else await walk(c, listLevel, listType);
    }
  }

  await walk(root);
  return blocks;
}

export function decode(s) {
  return s
    .replace(/&#8217;|&rsquo;/g, '’')
    .replace(/&#8216;|&lsquo;/g, '‘')
    .replace(/&#8220;|&ldquo;/g, '“')
    .replace(/&#8221;|&rdquo;/g, '”')
    .replace(/&#8211;|&ndash;/g, '–')
    .replace(/&#8212;|&mdash;/g, '—')
    .replace(/&#8230;|&hellip;/g, '…')
    .replace(/&#038;|&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)));
}

export const plain = (blocks) => blocks.filter((b) => b._type === 'block').map((b) => b.children.map((c) => c.text).join('')).join(' ');

/** First ~30 words, ending on a sentence or ellipsis. */
export function excerptFrom(text, words = 30) {
  const w = text.replace(/\s+/g, ' ').trim().split(' ');
  if (w.length <= words) return w.join(' ');
  const cut = w.slice(0, words).join(' ');
  const dot = cut.lastIndexOf('. ');
  return dot > 80 ? cut.slice(0, dot + 1) : `${cut.replace(/[,;:]$/, '')}…`;
}

/* Tags --------------------------------------------------------------------- */

const tagBank = seed.tags;
/** Tag-bank tags whose name appears in the text (3–5), as references. */
export function matchTags(text, extra = []) {
  const t = text.toLowerCase();
  const hits = tagBank.filter((tg) => t.includes(tg.title.toLowerCase())).map((tg) => tg.slug);
  return [...new Set([...extra, ...hits])].slice(0, 5);
}
export const tagRefs = (slugs) => slugs.map((s) => ({ _type: 'reference', _ref: `tag-${s}`, _key: key() }));
