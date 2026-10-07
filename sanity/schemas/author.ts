import { defineField, defineType } from 'sanity';

/** Post authors (Execution Manual §19, author pages). */
export const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Full name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'URL slug', type: 'slug', options: { source: 'name' }, description: 'Profile page at /author/<slug>/.', validation: (r) => r.required() }),
    defineField({
      name: 'kind',
      title: 'Author type',
      type: 'string',
      options: { list: [{ title: 'A person', value: 'person' }, { title: 'The business', value: 'organization' }], layout: 'radio' },
      initialValue: 'person',
      validation: (r) => r.required(),
    }),
    defineField({ name: 'role', title: 'Role', type: 'string', description: 'e.g. Co-Founder, Fleet Mechanic' }),
    defineField({
      name: 'photo',
      title: 'Headshot',
      type: 'image',
      description: 'Square, at least 400 × 400.',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
    }),
    defineField({ name: 'bio', title: 'Bio', type: 'text', rows: 6, description: 'About 150 words: background, what they write about, languages, years on the island.' }),
    defineField({ name: 'links', title: 'Profile links', type: 'array', of: [{ type: 'url' }], description: 'LinkedIn, Instagram and similar.' }),
  ],
  preview: { select: { title: 'name', subtitle: 'role', media: 'photo' } },
});
