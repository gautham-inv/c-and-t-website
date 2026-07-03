import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const sector = defineType({
  name: "sector",
  title: "Sector",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "division",
      title: "Parent division",
      type: "reference",
      to: [{ type: "division" }],
      validation: (r) => r.required(),
    }),
    defineField({ name: "tagline", title: "Hero one-liner", type: "text", rows: 2 }),
    defineField({
      name: "image",
      title: "Hero image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    }),
    defineField({
      name: "overview",
      title: "Overview paragraphs",
      type: "array",
      of: [{ type: "text", rows: 3 }],
    }),
    defineField({ name: "stats", type: "array", of: [{ type: "stat" }] }),
    defineField({
      name: "approach",
      title: "How we work (optional)",
      type: "array",
      of: [{ type: "approach" }],
      description: "Section hides on the page when empty.",
    }),
    defineField({
      name: "services",
      title: "What we bring",
      type: "array",
      of: [{ type: "sectorService" }],
    }),
    defineField({
      name: "expertise",
      title: "Expertise grid (optional)",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "projects",
      title: "Featured projects",
      type: "array",
      of: [{ type: "sectorProject" }],
    }),
    defineField({
      name: "insights",
      title: "Related insights (optional)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "insight" }] }],
    }),
    defineField({ name: "faqs", type: "array", of: [{ type: "faq" }] }),
  ],
  preview: { select: { title: "name", subtitle: "division.name", media: "image" } },
});
