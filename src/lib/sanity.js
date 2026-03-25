/**
 * Sanity Client Configuration
 * 
 * Replace these values with your Sanity project details:
 * 1. Go to sanity.io/manage
 * 2. Create a new project (or select existing)
 * 3. Copy your Project ID and Dataset name
 */

import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  // Replace with your project ID from sanity.io/manage
  projectId: 'z0hce1mo',
  
  // Usually 'production' — check your Sanity dashboard
  dataset: 'production',
  
  // Latest API version
  apiVersion: '2024-01-01',
  
  // Set to false if you want draft previews (requires token)
  useCdn: false,
});

// Image URL builder for responsive images
const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

// =============================================================================
// Query Helpers
// =============================================================================

/**
 * Fetch all projects
 */
export async function getProjects() {
  return await client.fetch(`
    *[_type == "project"] | order(date desc) {
      _id,
      title,
      slug,
      description,
      date,
      thumbnail,
      tags,
      featured,
      client,
      role,
      "imageCount": count(images)
    }
  `);
}

/**
 * Fetch a single project by slug
 */
export async function getProject(slug) {
  return await client.fetch(`
    *[_type == "project" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      description,
      date,
      thumbnail,
      tags,
      featured,
      client,
      role,
      images,
      content,
      liveUrl,
      credits
    }
  `, { slug });
}

/**
 * Fetch site settings
 */
export async function getSettings() {
  return await client.fetch(`
    *[_type == "siteSettings"][0] {
      title,
      description,
      name,
      role,
      bio,
      photo,
      email,
      socialLinks
    }
  `);
}

/**
 * Fetch all project slugs (for static generation)
 */
export async function getProjectSlugs() {
  return await client.fetch(`
    *[_type == "project"] { "slug": slug.current }
  `);
}
