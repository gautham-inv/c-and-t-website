import { CaseIcon } from "@sanity/icons/Case";
import { defineField, defineType } from "sanity";
import { INDUSTRIES } from "@/lib/industries";

/**
 * One type covers both the flat portfolio cards (PORTFOLIO) and the rich detail
 * pages (PROJECTS). The "Detail page" fields are optional — when present, the
 * site generates /projects/[slug]; when absent, the project only appears as a
 * card. `enableDetailPage` makes that explicit for editors.
 */
export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: CaseIcon,
  groups: [
    { name: "card", title: "Card", default: true },
    { name: "detail", title: "Detail page" },
  ],
  fields: [
    defineField({ name: "name", type: "string", group: "card", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      group: "card",
      options: { source: "name", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "division",
      type: "reference",
      to: [{ type: "division" }],
      group: "card",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "meta",
      title: "Card meta line",
      type: "string",
      group: "card",
      description: 'e.g. "BIM · Plant Rooms LOD 400 · 300,000 m² · 2019"',
    }),
    defineField({
      name: "image",
      title: "Card image",
      type: "image",
      group: "card",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
      description: "Optional — omit to render a branded placeholder card.",
    }),
    defineField({
      name: "industries",
      title: "Industries / sectors",
      type: "array",
      group: "card",
      of: [{ type: "string" }],
      options: { list: INDUSTRIES.map((i) => ({ title: i.label, value: i.slug })) },
      description:
        "Tags this project for the industry filter on /projects. Leave empty for Oil & Gas division work — that division is organised by service, not sector.",
    }),

    defineField({
      name: "enableDetailPage",
      title: "Has a detail page?",
      type: "boolean",
      group: "detail",
      initialValue: false,
      description: "When on, /projects/[slug] is generated from the fields below.",
    }),
    defineField({ name: "tagline", title: "Hero sub-line", type: "string", group: "detail" }),
    defineField({
      name: "heroImage",
      type: "image",
      group: "detail",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    }),
    defineField({
      name: "description",
      type: "array",
      group: "detail",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading", value: "h3" },
          ],
          lists: [{ title: "Bullet", value: "bullet" }],
          marks: { decorators: [{ title: "Strong", value: "strong" }] },
        },
      ],
    }),
    defineField({
      name: "info",
      title: "Info rows",
      type: "array",
      group: "detail",
      of: [{ type: "infoRow" }],
    }),
    defineField({ name: "personnel", type: "array", group: "detail", of: [{ type: "personnel" }] }),
    defineField({ name: "gallery", type: "array", group: "detail", of: [{ type: "galleryItem" }] }),
    defineField({
      name: "testimonials",
      title: "Testimonials (optional)",
      type: "array",
      group: "detail",
      of: [{ type: "testimonial" }],
    }),
  ],
  preview: { select: { title: "name", subtitle: "meta", media: "image" } },
});
