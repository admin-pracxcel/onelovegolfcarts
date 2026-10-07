// Creates the blog's categories, tags and default author in Sanity, from
// sanity/seed-data.json. Safe to re-run: existing documents are left alone.
//
//   NEXT_PUBLIC_SANITY_PROJECT_ID=… SANITY_API_WRITE_TOKEN=… pnpm sanity:seed
import { readFileSync } from 'node:fs';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!projectId || !token) {
  console.error('Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN (an Editor token from sanity.io/manage → API → Tokens).');
  process.exit(1);
}

const data = JSON.parse(readFileSync(new URL('../../sanity/seed-data.json', import.meta.url)));
const slug = (current) => ({ _type: 'slug', current });

const docs = [
  ...data.categories.map(({ slug: s, ...c }) => ({ _id: `category-${s}`, _type: 'category', slug: slug(s), ...c })),
  ...data.tags.map((t) => ({ _id: `tag-${t.slug}`, _type: 'tag', title: t.title, slug: slug(t.slug) })),
  (({ slug: s, ...a }) => ({ _id: `author-${s}`, _type: 'author', slug: slug(s), ...a }))(data.author),
];

const res = await fetch(`https://${projectId}.api.sanity.io/v2025-02-19/data/mutate/${dataset}?returnIds=true`, {
  method: 'POST',
  headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  body: JSON.stringify({ mutations: docs.map((doc) => ({ createIfNotExists: doc })) }),
});
const out = await res.json();
if (!res.ok) {
  console.error('Sanity refused the import:', out.error?.description || out);
  process.exit(1);
}
console.log(`Done: ${data.categories.length} categories, ${data.tags.length} tags, 1 author (existing ones untouched).`);
