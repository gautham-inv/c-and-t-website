/**
 * Sanity environment configuration. projectId + dataset are PUBLIC values (they
 * ship in every client bundle and are used in public API calls), so they fall
 * back to literals here. This matters for the hosted Studio: `sanity deploy`
 * builds with Vite, which only exposes `SANITY_STUDIO_*` vars to the browser —
 * NOT Next.js's `NEXT_PUBLIC_*`. The literals guarantee the deployed Studio
 * always resolves the project, while env vars (when present) can override, e.g.
 * to point the Next.js site at a staging dataset.
 */

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "4b949g5r";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";
