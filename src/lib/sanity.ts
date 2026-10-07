/**
 * Reads blog content from Sanity over its HTTP query API (no client library
 * needed). Responses are cached and tagged 'sanity'; publishing in the Studio
 * fires a webhook to /api/revalidate, which refreshes them. Without a project
 * ID every query returns its empty value, so the site still builds.
 *
 *   NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET (default production)
 */
import type { PortableTextBlock } from '@portabletext/react';
import { apiVersion, dataset, projectId } from '../../sanity/env';

export const sanityConfigured = Boolean(projectId);

// Test-only: point queries and images at a local stand-in (scripts/qa). Unset in production.
const API = process.env.SANITY_API_HOST_OVERRIDE;
const CDN = process.env.SANITY_CDN_HOST_OVERRIDE;
export const SANITY_TAG = 'sanity';

export async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}, fallback: T): Promise<T> {
  if (!projectId) return fallback;
  const url = new URL(`${API || `https://${projectId}.apicdn.sanity.io`}/v${apiVersion}/data/query/${dataset}`);
  url.searchParams.set('query', query);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(`$${k}`, JSON.stringify(v));
  try {
    const res = await fetch(url, { cache: 'force-cache', next: { tags: [SANITY_TAG], revalidate: 3600 } });
    if (!res.ok) throw new Error(`Sanity responded ${res.status}`);
    const json = (await res.json()) as { result: T | null };
    return json.result ?? fallback;
  } catch (err) {
    console.error('[sanity] query failed:', err instanceof Error ? err.message : err);
    return fallback;
  }
}

/* Images ------------------------------------------------------------------- */

export type SanityImage = { asset?: { _ref?: string }; alt?: string; caption?: string; hotspot?: { x: number; y: number } };

/** "image-<id>-1200x800-jpg" → { id, width, height, ext } */
function parseRef(ref?: string) {
  const m = ref && /^image-([a-f0-9]+)-(\d+)x(\d+)-(\w+)$/.exec(ref);
  return m ? { id: m[1], width: Number(m[2]), height: Number(m[3]), ext: m[4] } : null;
}

export function imageSize(img?: SanityImage) {
  const p = parseRef(img?.asset?._ref);
  return p ? { width: p.width, height: p.height } : null;
}

/** CDN URL at a given width, cropped to `aspect` (w/h) around the hotspot when given. */
export function imageUrl(img: SanityImage | undefined, width: number, aspect?: number) {
  const p = parseRef(img?.asset?._ref);
  if (!p || !projectId) return '';
  const u = new URL(`${CDN || 'https://cdn.sanity.io'}/images/${projectId}/${dataset}/${p.id}-${p.width}x${p.height}.${p.ext}`);
  u.searchParams.set('w', String(width));
  if (aspect) {
    u.searchParams.set('h', String(Math.round(width / aspect)));
    u.searchParams.set('fit', 'crop');
    if (img?.hotspot) {
      u.searchParams.set('crop', 'focalpoint');
      u.searchParams.set('fp-x', img.hotspot.x.toFixed(3));
      u.searchParams.set('fp-y', img.hotspot.y.toFixed(3));
    }
  }
  u.searchParams.set('auto', 'format');
  u.searchParams.set('q', '80');
  return u.toString();
}

export function imageSrcSet(img: SanityImage | undefined, widths: number[], aspect?: number) {
  return widths.map((w) => `${imageUrl(img, w, aspect)} ${w}w`).join(', ');
}

/* Types -------------------------------------------------------------------- */

export type CategoryRef = { title: string; slug: string };
export type AuthorRef = { name: string; slug: string; role?: string; kind?: 'person' | 'organization'; photo?: SanityImage };

export type PostCard = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  mainImage?: SanityImage;
  category?: CategoryRef;
};

export type Post = PostCard & {
  body: PortableTextBlock[];
  faq?: { question: string; answer: string }[];
  tags?: CategoryRef[];
  author?: AuthorRef;
  seoTitle?: string;
  seoDescription?: string;
  noindex?: boolean;
  category?: CategoryRef & { pillarTitle?: string; pillarUrl?: string; pillarSummary?: string; _id: string };
  related?: PostCard[];
};

export type Category = CategoryRef & {
  _id: string;
  cardText?: string;
  seoTitle?: string;
  seoDescription?: string;
  pillarTitle?: string;
  pillarUrl?: string;
  pillarSummary?: string;
  count: number;
};

export type Author = AuthorRef & { _id: string; bio?: string; links?: string[] };

/* Queries ------------------------------------------------------------------ */

const live = `_type == "post" && defined(slug.current) && publishedAt <= now()`;
const card = `_id, title, "slug": slug.current, excerpt, publishedAt, updatedAt, mainImage, "category": category->{title, "slug": slug.current}`;

export const PAGE_SIZE = 12;

export function getPostSlugs() {
  return sanityFetch<string[]>(`*[${live}].slug.current`, {}, []);
}

export function getPost(slug: string) {
  return sanityFetch<Post | null>(
    `*[${live} && slug.current == $slug][0]{
      ${card}, body, faq, seoTitle, seoDescription, noindex,
      "tags": tags[]->{title, "slug": slug.current},
      "author": author->{name, "slug": slug.current, role, kind, photo},
      "category": category->{_id, title, "slug": slug.current, pillarTitle, pillarUrl, pillarSummary},
      "related": related[]->{${card}}
    }`,
    { slug },
    null,
  );
}

/** Same-category posts first, then the newest posts anywhere, excluding `exclude`. */
export async function getRelated(post: Post, count = 3) {
  const picked = (post.related ?? []).filter(Boolean).slice(0, 2);
  const exclude = [post._id, ...picked.map((p) => p._id)];
  const need = count - picked.length;
  const sameCat = post.category
    ? await sanityFetch<PostCard[]>(`*[${live} && category._ref == $cat && !(_id in $exclude)] | order(publishedAt desc)[0...$n]{${card}}`, { cat: post.category._id, exclude, n: need }, [])
    : [];
  let out = [...picked, ...sameCat];
  if (out.length < count) {
    const more = await sanityFetch<PostCard[]>(
      `*[${live} && !(_id in $exclude)] | order(publishedAt desc)[0...$n]{${card}}`,
      { exclude: [...exclude, ...sameCat.map((p) => p._id)], n: count - out.length },
      [],
    );
    out = [...out, ...more];
  }
  return out.slice(0, count);
}

export function getPosts(page = 1, filter: { category?: string; author?: string; tag?: string } = {}) {
  const where = [
    live,
    filter.category ? 'category->slug.current == $category' : '',
    filter.author ? 'author->slug.current == $author' : '',
    filter.tag ? '$tag in tags[]->slug.current' : '',
  ]
    .filter(Boolean)
    .join(' && ');
  const start = (page - 1) * PAGE_SIZE;
  return sanityFetch<{ total: number; posts: PostCard[] }>(
    `{ "total": count(*[${where}]), "posts": *[${where}] | order(publishedAt desc)[$start...$end]{${card}} }`,
    { ...filter, start, end: start + PAGE_SIZE },
    { total: 0, posts: [] },
  );
}

export function getFeatured() {
  return sanityFetch<PostCard[]>(`*[${live} && featured == true] | order(publishedAt desc)[0...3]{${card}}`, {}, []);
}

export function getCategories() {
  return sanityFetch<Category[]>(
    `*[_type == "category" && defined(slug.current)] | order(order asc){_id, title, "slug": slug.current, cardText, seoTitle, seoDescription, pillarTitle, pillarUrl, pillarSummary, "count": count(*[${live} && references(^._id)])}`,
    {},
    [],
  );
}

export function getCategory(slug: string) {
  return sanityFetch<Category | null>(
    `*[_type == "category" && slug.current == $slug][0]{_id, title, "slug": slug.current, cardText, seoTitle, seoDescription, pillarTitle, pillarUrl, pillarSummary, "count": count(*[${live} && references(^._id)])}`,
    { slug },
    null,
  );
}

export function getAuthor(slug: string) {
  return sanityFetch<Author | null>(`*[_type == "author" && slug.current == $slug][0]{_id, name, "slug": slug.current, role, kind, photo, bio, links}`, { slug }, null);
}

export function getAuthorSlugs() {
  return sanityFetch<string[]>(`*[_type == "author" && defined(slug.current) && count(*[${live} && references(^._id)]) > 0].slug.current`, {}, []);
}

export function getTag(slug: string) {
  return sanityFetch<(CategoryRef & { count: number }) | null>(
    `*[_type == "tag" && slug.current == $slug][0]{title, "slug": slug.current, "count": count(*[${live} && references(^._id)])}`,
    { slug },
    null,
  );
}

export function getSitemapEntries() {
  return sanityFetch<{ posts: { slug: string; date: string }[]; categories: string[]; authors: string[]; tags: string[] }>(
    `{
      "posts": *[${live} && noindex != true] | order(coalesce(updatedAt, publishedAt) desc){ "slug": slug.current, "date": coalesce(updatedAt, publishedAt) },
      "categories": *[_type == "category" && count(*[${live} && references(^._id)]) > 0].slug.current,
      "authors": *[_type == "author" && count(*[${live} && references(^._id)]) > 0].slug.current,
      "tags": *[_type == "tag" && count(*[${live} && references(^._id)]) >= 3].slug.current
    }`,
    {},
    { posts: [], categories: [], authors: [], tags: [] },
  );
}
