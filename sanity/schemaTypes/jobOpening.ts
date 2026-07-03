import { CaseIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

/** A single open position. Mirrors the `Opening` type in lib/careers.ts —
 * `slug` drives the /careers/[slug] description route. */
export const jobOpening = defineType({
  name: "jobOpening",
  title: "Job opening",
  type: "document",
  icon: CaseIcon,
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
      description: "Drives the /careers/[slug] description page.",
    }),
    defineField({
      name: "team",
      type: "string",
      options: {
        list: [
          "Buildings & Infrastructure",
          "Oil & Gas",
          "BIM",
          "Corporate",
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "location", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "type",
      title: "Employment type",
      type: "string",
      options: { list: ["Full-time", "Contract", "Internship"] },
      initialValue: "Full-time",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "experience",
      type: "string",
      description: 'e.g. "6+ years"',
    }),
    defineField({
      name: "summary",
      type: "text",
      rows: 2,
      description: "One-line teaser shown on the opening card.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "about",
      type: "text",
      rows: 4,
      description: "Opening paragraph on the description page.",
    }),
    defineField({
      name: "responsibilities",
      title: "What you'll do",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "requirements",
      title: "What you'll bring",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "niceToHave",
      title: "Nice to have",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
  preview: { select: { title: "title", subtitle: "team" } },
});
