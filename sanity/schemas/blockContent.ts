import { defineArrayMember, defineField, defineType } from 'sanity';

/**
 * Post body. Headings start at H2 (the post title is the H1). Links can point
 * to a page on this site (/rates/) or another site (https://…).
 */
export const blockContent = defineType({
  name: 'blockContent',
  title: 'Body',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Paragraph', value: 'normal' },
        { title: 'Heading 2', value: 'h2' },
        { title: 'Heading 3', value: 'h3' },
        { title: 'Heading 4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullets', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Bold', value: 'strong' },
          { title: 'Italic', value: 'em' },
        ],
        annotations: [
          defineArrayMember({
            name: 'link',
            title: 'Link',
            type: 'object',
            fields: [
              defineField({
                name: 'href',
                title: 'URL',
                type: 'url',
                description: 'A page on this site starts with / (for example /rates/). Other sites start with https://.',
                validation: (r) => r.required().uri({ allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel'] }),
              }),
            ],
          }),
        ],
      },
    }),
    defineArrayMember({
      name: 'figure',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt text', type: 'string', description: 'Describe what the photo shows, for screen readers and Google.', validation: (r) => r.required() }),
        defineField({ name: 'caption', title: 'Caption', type: 'string' }),
      ],
    }),
    defineArrayMember({
      name: 'table',
      title: 'Table',
      type: 'object',
      fields: [
        defineField({ name: 'caption', title: 'Caption', type: 'string' }),
        defineField({ name: 'hasHeader', title: 'First row is a header', type: 'boolean', initialValue: true }),
        defineField({
          name: 'rows',
          title: 'Rows',
          type: 'array',
          of: [
            defineArrayMember({
              name: 'row',
              type: 'object',
              fields: [defineField({ name: 'cells', title: 'Cells', type: 'array', of: [{ type: 'string' }] })],
              preview: { select: { cells: 'cells' }, prepare: ({ cells }) => ({ title: (cells ?? []).join(' | ') }) },
            }),
          ],
        }),
      ],
      preview: { select: { caption: 'caption', rows: 'rows' }, prepare: ({ caption, rows }) => ({ title: caption || 'Table', subtitle: `${rows?.length ?? 0} rows` }) },
    }),
    defineArrayMember({
      name: 'callout',
      title: 'Tip box',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'text', title: 'Text', type: 'text', rows: 3, validation: (r) => r.required() }),
      ],
      preview: { select: { title: 'title', subtitle: 'text' }, prepare: ({ title, subtitle }) => ({ title: title || 'Tip box', subtitle }) },
    }),
  ],
});
