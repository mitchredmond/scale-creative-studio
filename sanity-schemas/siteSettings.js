/**
 * Site Settings Schema — With Hero Image for Homepage
 * 
 * INSTRUCTIONS:
 * Replace your existing schemaTypes/siteSettings.js in Sanity Studio with this file,
 * then run: npx sanity deploy
 */

export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'personal', title: 'Personal Info' },
    { name: 'homepage', title: 'Homepage' },
    { name: 'social', title: 'Social Links' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // Personal Info
    {
      name: 'name',
      title: 'Your Name',
      type: 'string',
      group: 'personal',
    },
    {
      name: 'role',
      title: 'Your Role',
      type: 'string',
      group: 'personal',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      group: 'personal',
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4,
      group: 'personal',
    },
    {
      name: 'photo',
      title: 'Profile Photo',
      type: 'image',
      options: { hotspot: true },
      group: 'personal',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'personal',
    },
    {
      name: 'availability',
      title: 'Availability',
      type: 'string',
      options: {
        list: [
          { title: 'Available for work', value: 'available' },
          { title: 'Not available', value: 'unavailable' },
        ],
      },
      group: 'personal',
    },
    
    // Homepage
    {
      name: 'heroImage',
      title: 'Homepage Hero Image',
      type: 'image',
      options: { hotspot: true },
      description: 'The large image displayed on the homepage below the tagline',
      group: 'homepage',
    },
    
    // Social Links
    {
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
            },
          ],
        },
      ],
      group: 'social',
    },
    
    // SEO
    {
      name: 'title',
      title: 'Site Title',
      type: 'string',
      group: 'seo',
    },
    {
      name: 'description',
      title: 'Site Description',
      type: 'text',
      rows: 2,
      group: 'seo',
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      };
    },
  },
};
