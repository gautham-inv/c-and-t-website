import { UsersIcon } from "@sanity/icons/Users";
import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({ name: "vision", type: "text", rows: 3 }),
    defineField({ name: "mission", type: "text", rows: 3 }),
    defineField({ name: "values", type: "array", of: [{ type: "value" }] }),
    defineField({
      name: "companyMilestones",
      title: "Company milestones",
      type: "array",
      of: [{ type: "milestone" }],
      description: "The practice evolving — formation & geographic expansion.",
    }),
    defineField({
      name: "projectAwards",
      title: "Project awards",
      type: "array",
      of: [{ type: "award" }],
      description: "Work awarded as the practice grew.",
    }),
    defineField({
      name: "locations",
      title: "Global footprint",
      type: "array",
      of: [{ type: "location" }],
      description: "Drives both the locations rail and the globe markers.",
    }),
    defineField({
      name: "capabilities",
      title: "What we engineer",
      type: "array",
      of: [{ type: "capability" }],
    }),
    defineField({
      name: "leadership",
      title: "Leadership",
      type: "array",
      of: [{ type: "leader" }],
    }),
    defineField({
      name: "isoCertifications",
      title: "ISO certifications",
      type: "array",
      of: [{ type: "isoCert" }],
      description: "Logo row shown in the \"Our story\" section (e.g. ISO 9001, 45001, 14001).",
    }),
    defineField({
      name: "isoLogo",
      title: "Legacy ISO Logo (Deprecated)",
      type: "image",
      hidden: true,
    }),
    defineField({
      name: "isoDocument",
      title: "Legacy ISO Document (Deprecated)",
      type: "file",
      hidden: true,
    }),
  ],
  preview: { prepare: () => ({ title: "About page" }) },
});
