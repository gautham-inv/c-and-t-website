import { HomeIcon } from "@sanity/icons";
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
      title: 'Difference / case studies',
      type: "array",
      of: [{ type: "caseStudy" }],
    }),
    defineField({ name: "testimonials", type: "array", of: [{ type: "testimonial" }] }),
    defineField({
      name: "featuredProjects",
      type: "array",
      of: [{ type: "reference", to: [{ type: "project" }] }],
      description: "Projects shown in the homepage carousel.",
    }),
    defineField({
      name: "featuredInsights",
      type: "array",
      of: [{ type: "reference", to: [{ type: "insight" }] }],
    }),
  ],
  preview: { prepare: () => ({ title: "Home page" }) },
});
