/**
 * Schema Index
 * 
 * Export all schemas here. These define the content structure
 * that appears in Sanity Studio.
 */

import project from './project';
import siteSettings from './siteSettings';

export const schemaTypes = [
  project,
  siteSettings,
];
