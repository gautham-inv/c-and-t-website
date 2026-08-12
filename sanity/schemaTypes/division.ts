import { ComponentIcon } from "@sanity/icons/Component";
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
    defineField({
      name: "services",
      title: "Services offered",
      type: "array",
      of: [{ type: "reference", to: [{ type: "service" }] }],
      description: "Ordered — the services this division delivers.",
    }),
    defineField({
      name: "hasIndustries",
      title: "Show industries-served chip cloud?",
      type: "boolean",
      initialValue: false,
      description:
        "On for Buildings & Infrastructure; off for Oil & Gas, which isn't broken into sectors.",
    }),
    defineField({ name: "faqs", type: "array", of: [{ type: "faq" }] }),

    // ── Division-scoped capability statement ──
    // All optional. Populated for Oil & Gas; Buildings & Infrastructure is
    // covered by the shared A–O scope on the /divisions index instead. Leaving
    // these empty hides the whole section on that division's page.
    defineField({
      name: "capabilities",
      title: "Engineering capabilities",
      type: "array",
      of: [{ type: "string" }],
      description:
        "Disciplines this division covers, one per line. Shown as a two-column list.",
    }),
    defineField({
      name: "deliverables",
      title: "What the client receives",
      type: "array",
      of: [{ type: "string" }],
      description: "Deliverables handed over at project close.",
    }),
    defineField({
      name: "tools",
      title: "Software & platforms",
      type: "array",
      of: [{ type: "string" }],
      description:
        "Plain names, shown as chips. Not the logo strip on /divisions — that's a separate, global list in Site settings.",
    }),
    defineField({
      name: "standards",
      title: "Codes & standards",
      type: "array",
      of: [{ type: "string" }],
      description: "e.g. ADNOC, Aramco, API, DNV, NFPA, ASME, ISO.",
    }),
    defineField({
      name: "industriesServed",
      title: "Industries served",
      type: "array",
      of: [{ type: "string" }],
      description:
        "Plain descriptive labels. Different from the industries chip cloud above, which links to filtered project lists.",
    }),
  ],
  preview: { select: { title: "name", subtitle: "tagline", media: "image" } },
});
