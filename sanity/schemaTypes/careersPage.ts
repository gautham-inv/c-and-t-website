import { UsersIcon } from "@sanity/icons/Users";
import { defineField, defineType } from "sanity";

/** Careers page singleton — the editorial sections of /careers. The openings
 * themselves are separate `jobOpening` documents. Mirrors CareersView.tsx. */
export const careersPage = defineType({
  name: "careersPage",
  title: "Careers page",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({
      name: "intro",
      title: "Hero intro",
      type: "text",
      rows: 4,
      description: "Copy in the hero card.",
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    }),
    defineField({
      name: "reasons",
      title: "Why join us",
      type: "array",
      of: [{ type: "careerReason" }],
      description: "The numbered 01–06 reasons grid.",
    }),
    defineField({
      name: "whyTitle",
      title: "“More than engineers” heading",
      type: "string",
    }),
    defineField({
      name: "whyBody",
      title: "“More than engineers” paragraphs",
      type: "array",
      of: [{ type: "text" }],
    }),
    defineField({
      name: "teamPhotos",
      title: "Team mosaic",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      description: "Life-at-C&T photo grid.",
    }),
  ],
  preview: { prepare: () => ({ title: "Careers page" }) },
});
