/**
 * Project Schema
 * 
 * This defines what fields appear in the Sanity Studio
 * when your friend adds a new project.
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
      description: 'URL-friendly version of the title (click Generate)',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      description: 'Show this project prominently on the homepage',
      initialValue: false,
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
      description: 'When was this project completed?',
    },
    {
      name: 'client',
      title: 'Client',
      type: 'string',
      description: 'Who was this project for?',
    },
    {
      name: 'role',
      title: 'Your Role',
      type: 'string',
      description: 'e.g., Creative Director, Art Director, Lead Designer',
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'A brief summary shown on project cards (1-2 sentences)',
      validation: Rule => Rule.max(200),
    },
    {
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      description: 'Main image shown on the homepage grid',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'e.g., Branding, Campaign, Digital, Print',
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
              type: 'string',
            },
            {
              name: 'fullWidth',
              title: 'Full Width',
              type: 'boolean',
              description: 'Display this image at full width',
              initialValue: false,
            },
          ],
        },
      ],
      description: 'Add images in the order you want them displayed',
    },
    {
      name: 'content',
      title: 'Project Description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading', value: 'h3' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
          },
        },
      ],
      description: 'Longer description of the project (optional)',
    },
    {
      name: 'liveUrl',
      title: 'Live URL',
      type: 'url',
      description: 'Link to live project (if applicable)',
    },
    {
      name: 'credits',
      title: 'Credits',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'role', title: 'Role', type: 'string' },
            { name: 'name', title: 'Name', type: 'string' },
          ],
          preview: {
            select: {
              title: 'role',
              subtitle: 'name',
            },
          },
        },
      ],
      description: 'Credit collaborators (optional)',
    },
  ],
  preview: {
    select: {
      title: 'title',
      client: 'client',
      media: 'thumbnail',
    },
    prepare({ title, client, media }) {
      return {
        title,
        subtitle: client,
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Date, Newest',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
};
