import { WrenchIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  icon: WrenchIcon,
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    }),
    defineField({
      name: "blurb",
      type: "text",
      rows: 2,
      description: "One-line summary for cards / accordion.",
    }),
    defineField({
      name: "byDivision",
      title: "Scope by division",
      type: "array",
      of: [{ type: "divisionScope" }],
      description:
        "The same service is delivered differently per division — author each division's scope here.",
    }),
    defineField({
      name: "order",
      type: "number",
      description: "Manual ordering across the site (lower = first).",
    }),
  ],
  orderings: [
    { title: "Manual order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: { select: { title: "name", subtitle: "blurb", media: "image" } },
});
