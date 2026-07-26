import { DocumentTextIcon } from "@sanity/icons/DocumentText";
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
    defineField({
      name: "author",
      title: "Author (optional)",
      type: "object",
      description:
        "Named, credentialed author — shown as a byline + bio and emitted as Person structured data (E-E-A-T). Leave blank to credit the organisation.",
      fields: [
        { name: "name", type: "string", title: "Name" },
        { name: "role", type: "string", title: "Role / title" },
        { name: "bio", type: "text", rows: 3, title: "Short bio" },
      ],
    }),
    defineField({
      name: "attribution",
      title: "Attribution (optional)",
      type: "text",
      rows: 2,
      description: "Credit line for republished/guest content, shown at the end of the article.",
    }),
  ],
  orderings: [
    { title: "Newest first", name: "dateDesc", by: [{ field: "date", direction: "desc" }] },
  ],
  preview: { select: { title: "title", subtitle: "tag", media: "image" } },
});
