/**
 * Sanity Studio Configuration
 * 
 * This file configures the Sanity Studio admin interface.
 * 
 * SETUP:
 * 1. Run: npm create sanity@latest
 * 2. Choose "Create new project"
 * 3. Name it (e.g., "my-portfolio")
 * 4. Use default dataset (production)
 * 5. Select "Clean project with no predefined schemas"
 * 6. Copy this file's content into the generated sanity.config.js
 * 7. Copy the schemas folder into your Sanity project
 */

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemas';

export default defineConfig({
  // Replace with your project name and ID from sanity.io/manage
  name: 'default',
  title: 'Portfolio',
  
  projectId: 'YOUR_PROJECT_ID',
  dataset: 'production',
  
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Site Settings as a singleton
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.divider(),
            // Projects list
            S.documentTypeListItem('project').title('Projects'),
          ]),
    }),
  ],
  
  schema: {
    types: schemaTypes,
  },
});
