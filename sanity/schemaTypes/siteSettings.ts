import { CogIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "logo",
      type: "image",
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    }),
    defineField({ name: "navItems", title: "Navigation", type: "array", of: [{ type: "navItem" }] }),
    defineField({ name: "footerTagline", type: "text", rows: 2 }),
    defineField({ name: "offices", type: "array", of: [{ type: "office" }] }),
    defineField({ name: "socials", title: "Social links", type: "array", of: [{ type: "socialLink" }] }),
    defineField({ name: "isoBadge", title: "ISO badge text", type: "string" }),
    defineField({ name: "copyright", type: "string" }),
    defineField({
      name: "enquiryEmail",
      title: "Enquiry email",
      type: "string",
      description: "Where the enquiry/proposal form routes.",
    }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});
