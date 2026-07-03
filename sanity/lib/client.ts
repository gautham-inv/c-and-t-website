import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Static export: content is fetched at build time, so the published CDN copy
  // is exactly what we want. A deploy webhook republishes after edits.
  useCdn: true,
});
