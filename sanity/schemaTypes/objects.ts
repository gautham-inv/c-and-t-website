import { defineField, defineType } from "sanity";

/**
 * Reusable object types — embedded inline inside documents (not standalone
 * documents). Each maps 1:1 to a TypeScript type in lib/*.ts.
 */

export const stat = defineType({
  name: "stat",
  title: "Stat",
  type: "object",
  fields: [
    defineField({ name: "value", type: "string", validation: (r) => r.required() }),
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
  ],
  preview: {
    select: { title: "value", subtitle: "label" },
  },
});

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "object",
  fields: [
    defineField({ name: "question", type: "string", validation: (r) => r.required() }),
    defineField({ name: "answer", type: "text", rows: 3, validation: (r) => r.required() }),
  ],
  preview: { select: { title: "question" } },
});

/** Per-division scope for a service (mirrors services.ts → byDivision). */
export const divisionScope = defineType({
  name: "divisionScope",
  title: "Division scope",
  type: "object",
  fields: [
    defineField({
      name: "division",
      type: "reference",
      to: [{ type: "division" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "subDisciplines",
      title: "Sub-disciplines",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "body",
      type: "text",
      rows: 3,
      description: "How this service reads for this division.",
    }),
  ],
  preview: {
    select: { title: "division.name", subtitle: "body" },
    prepare: ({ title, subtitle }) => ({
      title: title || "Division scope",
      subtitle,
    }),
  },
});

/** Sector-specific application of a service (mirrors sectors.ts → SectorService). */
export const sectorService = defineType({
  name: "sectorService",
  title: "Sector service",
  type: "object",
  fields: [
    defineField({
      name: "service",
      type: "reference",
      to: [{ type: "service" }],
      description: "Pulls label / image / link target from the service.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "body",
      type: "text",
      rows: 3,
      description: "How this service applies in this sector.",
    }),
    defineField({
      name: "points",
      title: "Scope highlights",
      type: "array",
      of: [{ type: "string" }],
      validation: (r) => r.max(3),
      description: "Up to 3 short scope highlights.",
    }),
  ],
  preview: { select: { title: "service.name", subtitle: "body" } },
});

/** A project as shown on a sector page (card-shaped). */
export const sectorProject = defineType({
  name: "sectorProject",
  title: "Sector project",
  type: "object",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "meta", type: "string" }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
  ],
  preview: { select: { title: "name", subtitle: "meta", media: "image" } },
});

export const approach = defineType({
  name: "approach",
  title: "Approach",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", type: "text", rows: 3 }),
  ],
  preview: { select: { title: "title", subtitle: "body" } },
});

export const galleryItem = defineType({
  name: "galleryItem",
  title: "Gallery item",
  type: "object",
  fields: [
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "span",
      type: "string",
      description: "Bento tile size.",
      options: {
        list: [
          { title: "Square (sm)", value: "sm" },
          { title: "Wide (2-wide)", value: "wide" },
          { title: "Tall (2-high)", value: "tall" },
          { title: "Large (2×2)", value: "lg" },
        ],
        layout: "radio",
      },
      initialValue: "sm",
    }),
    defineField({ name: "alt", title: "Alt text", type: "string" }),
  ],
  preview: { select: { title: "alt", subtitle: "span", media: "image" } },
});

export const personnel = defineType({
  name: "personnel",
  title: "Personnel",
  type: "object",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "photo", type: "image", options: { hotspot: true } }),
  ],
  preview: { select: { title: "name", subtitle: "role", media: "photo" } },
});

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "object",
  fields: [
    defineField({ name: "quote", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "name", type: "string" }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "photo", type: "image", options: { hotspot: true } }),
  ],
  preview: { select: { title: "name", subtitle: "role" } },
});

export const infoRow = defineType({
  name: "infoRow",
  title: "Info row",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "value",
      type: "array",
      of: [{ type: "string" }],
      description: "One or more values (most rows have one).",
    }),
  ],
  preview: {
    select: { title: "label", value: "value" },
    prepare: ({ title, value }) => ({
      title,
      subtitle: Array.isArray(value) ? value.join(", ") : value,
    }),
  },
});

export const location = defineType({
  name: "location",
  title: "Location",
  type: "object",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", type: "string", description: "e.g. Headquarters" }),
    defineField({ name: "lat", title: "Latitude", type: "number", validation: (r) => r.required() }),
    defineField({ name: "lng", title: "Longitude", type: "number", validation: (r) => r.required() }),
    defineField({
      name: "entities",
      title: "Legal entities",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
  preview: { select: { title: "name", subtitle: "role" } },
});

export const milestone = defineType({
  name: "milestone",
  title: "Milestone",
  type: "object",
  fields: [
    defineField({ name: "year", type: "string", validation: (r) => r.required() }),
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "detail", type: "text", rows: 2 }),
    defineField({ name: "place", type: "string" }),
  ],
  preview: { select: { title: "title", subtitle: "year" } },
});

export const award = defineType({
  name: "award",
  title: "Project award",
  type: "object",
  fields: [
    defineField({ name: "year", type: "string", validation: (r) => r.required() }),
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "meta", type: "string" }),
  ],
  preview: { select: { title: "name", subtitle: "year" } },
});

export const value = defineType({
  name: "value",
  title: "Value",
  type: "object",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", type: "text", rows: 2 }),
  ],
  preview: { select: { title: "name", subtitle: "body" } },
});

export const capability = defineType({
  name: "capability",
  title: "Capability",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "href",
      title: "Link (optional)",
      type: "string",
      description: "Internal path or URL. Leave blank for a non-linked item.",
    }),
  ],
  preview: { select: { title: "label", subtitle: "href" } },
});

export const navItem = defineType({
  name: "navItem",
  title: "Nav item",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "href", type: "string", validation: (r) => r.required() }),
  ],
  preview: { select: { title: "label", subtitle: "href" } },
});

export const office = defineType({
  name: "office",
  title: "Office",
  type: "object",
  fields: [
    defineField({ name: "place", type: "string", validation: (r) => r.required() }),
    defineField({ name: "detail", type: "string" }),
  ],
  preview: { select: { title: "place", subtitle: "detail" } },
});

export const socialLink = defineType({
  name: "socialLink",
  title: "Social link",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "href", type: "url" }),
  ],
  preview: { select: { title: "label", subtitle: "href" } },
});

/** Homepage "Difference" case-study tile. */
export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case study",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "project",
      title: "Links to project (optional)",
      type: "reference",
      to: [{ type: "project" }],
    }),
  ],
  preview: { select: { title: "title", media: "image" } },
});

/** Careers page "why join us" reason — numbered 01–06 grid item. */
export const careerReason = defineType({
  name: "careerReason",
  title: "Reason",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", type: "text", rows: 2 }),
  ],
  preview: { select: { title: "title", subtitle: "body" } },
});
