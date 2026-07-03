import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const insight = defineType({
  name: "insight",
  title: "Insight",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
      description: "Future-proofs /insights/[slug] article pages.",
    }),
    defineField({ name: "tag", type: "string", description: 'e.g. "BIM", "CFD"' }),
    defineField({ name: "readTime", title: "Read time", type: "string", description: 'e.g. "5 min read"' }),
    defineField({ name: "date", type: "datetime" }),
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    }),
    defineField({ name: "excerpt", type: "text", rows: 3 }),
    defineField({
      name: "body",
      title: "Article body (optional)",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
      description: "Fill in when article detail pages ship.",
    }),
  ],
  orderings: [
    { title: "Newest first", name: "dateDesc", by: [{ field: "date", direction: "desc" }] },
  ],
  preview: { select: { title: "title", subtitle: "tag", media: "image" } },
});
