/**
 * Site Settings Schema
 * 
 * A singleton document for global site info.
 * Your friend edits this once to set up their profile.
 */

export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  
  // This makes it a singleton (only one can exist)
  __experimental_actions: ['update', 'publish'],
  
  groups: [
    { name: 'personal', title: 'Personal Info' },
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
      validation: Rule => Rule.required(),
    },
    {
      name: 'role',
      title: 'Your Title',
      type: 'string',
      group: 'personal',
      description: 'e.g., Creative Director, Designer, Art Director',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      group: 'personal',
      description: 'e.g., New York, NY',
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4,
      group: 'personal',
      description: 'A short paragraph about yourself',
    },
    {
      name: 'photo',
      title: 'Profile Photo',
      type: 'image',
      group: 'personal',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      group: 'personal',
    },
    {
      name: 'availability',
      title: 'Availability Status',
      type: 'string',
      group: 'personal',
      options: {
        list: [
          { title: 'Available for work', value: 'available' },
          { title: 'Limited availability', value: 'limited' },
          { title: 'Not available', value: 'unavailable' },
        ],
      },
    },
    
    // Social Links
    {
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      group: 'social',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  'Instagram',
                  'LinkedIn',
                  'Twitter',
                  'Behance',
                  'Dribbble',
                  'GitHub',
                  'Vimeo',
                  'YouTube',
                  'Other',
                ],
              },
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
            },
          ],
          preview: {
            select: {
              title: 'platform',
              subtitle: 'url',
            },
          },
        },
      ],
    },
    
    // SEO
    {
      name: 'title',
      title: 'Site Title',
      type: 'string',
      group: 'seo',
      description: 'Shown in browser tabs and search results',
    },
    {
      name: 'description',
      title: 'Site Description',
      type: 'text',
      rows: 2,
      group: 'seo',
      description: 'Shown in search results (keep under 160 characters)',
      validation: Rule => Rule.max(160),
    },
  ],
  
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'photo',
    },
  },
};
