import { HomeIcon } from "@sanity/icons/Home";
import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "heroHeadline",
      type: "string",
      description: "Overlaid on the scroll-scrubbed hero frame sequence.",
    }),
    defineField({ name: "heroSubhead", type: "text", rows: 2 }),
    defineField({
      name: "stats",
      type: "array",
      of: [{ type: "stat" }],
      description: "Animated counters (value + label).",
    }),
    defineField({
      name: "caseStudies",
      title: "Difference / case studies",
      type: "array",
      of: [{ type: "caseStudy" }],
    }),
    defineField({
      name: "testimonials",
      type: "array",
      of: [{ type: "testimonial" }],
    }),
    defineField({
      name: "featuredProjects",
      type: "array",
      of: [{ type: "reference", to: [{ type: "project" }] }],
      description: "Projects shown in the homepage carousel.",
    }),
    // No `featuredInsights` here by design. It used to hold a reference to
    // every insight, which had two costs and no benefit: nothing ever read the
    // field (the homepage teaser reads the insight list directly and picks the
    // newest two), and a referenced document can't be deleted — so retiring an
    // article failed until the reference was cleared. The homepage now derives
    // its pair, so there is nothing to curate and nothing pinning the docs.
  ],
  preview: { prepare: () => ({ title: "Home page" }) },
});
