/**
 * Sanity Client Configuration
 */

import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'z0hce1mo',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

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
      category,
      projectTypes,
      client,
      role
    }
  `);
}

/**
 * Fetch projects by category
 */
export async function getProjectsByCategory(category) {
  return await client.fetch(`
    *[_type == "project" && category == $category] | order(date desc) {
      _id,
      title,
      slug,
      description,
      date,
      thumbnail,
      category,
      projectTypes,
      client,
      role
    }
  `, { category });
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
      category,
      projectTypes,
      client,
      role,
      images,
      content,
      liveUrl
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
      location,
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

/**
 * Get category counts
 */
export async function getCategoryCounts() {
  return await client.fetch(`
    {
      "brands": count(*[_type == "project" && category == "brands"]),
      "collateral": count(*[_type == "project" && category == "collateral"]),
      "theRest": count(*[_type == "project" && category == "the-rest"])
    }
  `);
}
