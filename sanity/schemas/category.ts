import { defineField, defineType } from 'sanity';

/** The five blog categories (Execution Manual §20). Each points up to its pillar page. */
export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'URL slug', type: 'slug', options: { source: 'title' }, description: 'The page lives at /category/<slug>/.', validation: (r) => r.required() }),
    defineField({ name: 'cardText', title: 'Short description', type: 'text', rows: 3, description: 'Shown on the blog home category cards and at the top of the category page.' }),
    defineField({ name: 'seoTitle', title: 'Search title', type: 'string', validation: (r) => r.max(70).warning('Keep under 60–70 characters.') }),
    defineField({ name: 'seoDescription', title: 'Search description', type: 'text', rows: 2, validation: (r) => r.max(170).warning('Keep under 160 characters.') }),
    defineField({ name: 'pillarTitle', title: 'Pillar guide name', type: 'string', description: 'The main guide this category belongs to, e.g. "Things to Do on Ambergris Caye".' }),
    defineField({ name: 'pillarUrl', title: 'Pillar guide URL', type: 'string', description: 'Starts with /, e.g. /things-to-do-ambergris-caye-golf-cart/' }),
    defineField({ name: 'pillarSummary', title: 'Pillar guide summary', type: 'string', description: 'One sentence shown in the "Part of our … guide" box on every post.' }),
    defineField({ name: 'order', title: 'Order', type: 'number', description: 'Position on the blog home (1–5).' }),
  ],
  orderings: [{ title: 'Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
});
