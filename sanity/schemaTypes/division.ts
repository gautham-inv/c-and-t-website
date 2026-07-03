import { ComponentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const division = defineType({
  name: "division",
  title: "Division",
  type: "document",
  icon: ComponentIcon,
  fields: [
    defineField({ name: "name", title: "Full name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "shortName",
      title: "Short name",
      type: "string",
      description: "Used in nav, cards, breadcrumbs.",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "tagline", type: "text", rows: 2 }),
    defineField({
      name: "image",
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
      name: "services",
      title: "Services offered",
      type: "array",
      of: [{ type: "reference", to: [{ type: "service" }] }],
      description: "Ordered — the services this division delivers.",
    }),
    defineField({
      name: "sectors",
      title: "Child sectors",
      type: "array",
      of: [{ type: "reference", to: [{ type: "sector" }] }],
      description: "Buildings only; leave empty for Oil & Gas.",
    }),
    defineField({ name: "faqs", type: "array", of: [{ type: "faq" }] }),
  ],
  preview: { select: { title: "name", subtitle: "tagline", media: "image" } },
});
