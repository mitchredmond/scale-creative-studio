/**
 * Project Schema — With Categories
 * 
 * INSTRUCTIONS:
 * Replace your existing schemaTypes/project.js in Sanity Studio with this file,
 * then run: npx sanity deploy
 */

export default {
  name: 'project',
  title: 'Projects',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Brands', value: 'brands' },
          { title: 'Collateral', value: 'collateral' },
          { title: 'The Rest', value: 'the-rest' },
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'projectTypes',
      title: 'Project Types',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'e.g., Brand Guide, Collateral, Digital, Print — shown as tabs on project page',
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'Shows on hover over the project thumbnail',
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
    },
    {
      name: 'client',
      title: 'Client',
      type: 'string',
    },
    {
      name: 'role',
      title: 'Your Role',
      type: 'string',
    },
    {
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Shown in the project grid',
    },
    {
      name: 'images',
      title: 'Project Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'caption',
              title: 'Caption',
              type: 'text',
              rows: 2,
              description: 'Shows on hover over this image',
            },
          ],
        },
      ],
    },
    {
      name: 'content',
      title: 'Additional Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading', value: 'h3' },
          ],
        },
      ],
    },
    {
      name: 'liveUrl',
      title: 'Live URL',
      type: 'url',
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      media: 'thumbnail',
    },
    prepare({ title, category, media }) {
      const labels = {
        'brands': 'Brands',
        'collateral': 'Collateral',
        'the-rest': 'The Rest',
      };
      return {
        title,
        subtitle: labels[category] || category,
        media,
      };
    },
  },
};
