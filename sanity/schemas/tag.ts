import { defineField, defineType } from 'sanity';

/** Tags (Execution Manual §03). A tag page is only indexed once it has 3+ posts. */
export const tag = defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'URL slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
  ],
});
