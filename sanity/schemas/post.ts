import { defineField, defineType } from 'sanity';

/** Blog posts. Each post lives at the site root: onelovegolfcartsbelize.com/<slug>/. */
export const post = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'meta', title: 'Details' },
    { name: 'seo', title: 'Search' },
  ],
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', group: 'content', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      group: 'content',
      options: { source: 'title', maxLength: 96 },
      description: 'The post lives at /<slug>/. Lowercase words joined by hyphens. Changing it after publishing breaks existing links.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'About 30 words, shown on post cards. Also used as the search description if that is left empty.',
      validation: (r) => r.required().max(260),
    }),
    defineField({
      name: 'mainImage',
      title: 'Featured image',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt text', type: 'string', validation: (r) => r.required() }),
        defineField({ name: 'caption', title: 'Caption', type: 'string' }),
      ],
      validation: (r) => r.required(),
    }),
    defineField({ name: 'body', title: 'Body', type: 'blockContent', group: 'content', validation: (r) => r.required() }),
    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'array',
      group: 'content',
      description: 'Optional. Shown under the post and marked up for Google.',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          fields: [
            defineField({ name: 'question', title: 'Question', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 3, validation: (r) => r.required() }),
          ],
          preview: { select: { title: 'question', subtitle: 'answer' } },
        },
      ],
    }),
    defineField({ name: 'category', title: 'Category', type: 'reference', to: [{ type: 'category' }], group: 'meta', validation: (r) => r.required() }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', group: 'meta', of: [{ type: 'reference', to: [{ type: 'tag' }] }] }),
    defineField({ name: 'author', title: 'Author', type: 'reference', to: [{ type: 'author' }], group: 'meta', validation: (r) => r.required() }),
    defineField({ name: 'publishedAt', title: 'Published', type: 'datetime', group: 'meta', initialValue: () => new Date().toISOString(), validation: (r) => r.required() }),
    defineField({ name: 'updatedAt', title: 'Last updated', type: 'datetime', group: 'meta', description: 'Set this when you make a meaningful update.' }),
    defineField({ name: 'featured', title: 'Featured this month', type: 'boolean', group: 'meta', initialValue: false, description: 'Shows in the "Featured this month" strip on the blog home (the 3 most recent featured posts).' }),
    defineField({
      name: 'related',
      title: 'Hand-picked related posts',
      type: 'array',
      group: 'meta',
      of: [{ type: 'reference', to: [{ type: 'post' }] }],
      validation: (r) => r.max(2),
      description: 'Optional, up to 2. The rest are picked automatically from the same category.',
    }),
    defineField({ name: 'seoTitle', title: 'Search title', type: 'string', group: 'seo', description: 'Optional. Defaults to the post title.', validation: (r) => r.max(70).warning('Keep under 60–70 characters.') }),
    defineField({ name: 'seoDescription', title: 'Search description', type: 'text', rows: 2, group: 'seo', description: 'Optional. Defaults to the excerpt.', validation: (r) => r.max(170).warning('Keep under 160 characters.') }),
    defineField({ name: 'noindex', title: 'Hide from search engines', type: 'boolean', group: 'seo', initialValue: false }),
  ],
  orderings: [{ title: 'Newest first', name: 'publishedDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
  preview: {
    select: { title: 'title', date: 'publishedAt', category: 'category.title', media: 'mainImage' },
    prepare: ({ title, date, category, media }) => ({
      title,
      subtitle: [category, date ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'No date'].filter(Boolean).join(' · '),
      media,
    }),
  },
});
