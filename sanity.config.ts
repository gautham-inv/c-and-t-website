"use client";

/**
 * Sanity Studio config. The schema + config live in this repo; the Studio
 * itself is hosted on Sanity (deployed with `npx sanity deploy` → a
 * <project>.sanity.studio URL). projectId/dataset come from env (.env.local).
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure, SINGLETON_TYPES } from "./sanity/structure";

export default defineConfig({
  name: "c-and-t",
  title: "C&T Consulting Engineers",
  projectId,
  dataset,
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
  schema: {
    types: schemaTypes,
    // Hide singleton types from the global "create new document" menu.
    templates: (templates) =>
      templates.filter(({ schemaType }) => !SINGLETON_TYPES.has(schemaType)),
  },
  document: {
    // Remove "duplicate" / "delete" actions on singleton documents.
    actions: (input, { schemaType }) =>
      SINGLETON_TYPES.has(schemaType)
        ? input.filter(({ action }) =>
            ["publish", "discardChanges", "restore"].includes(action ?? ""),
          )
        : input,
  },
});
