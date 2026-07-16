import { WrenchIcon } from "@sanity/icons/Wrench";
import { defineField, defineType } from "sanity";

/** Services page singleton — page-level content for /services (currently the
 * software & tools strip; the service cards themselves are their own docs). */
export const servicesPage = defineType({
  name: "servicesPage",
  title: "Services page",
  type: "document",
  icon: WrenchIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Our services",
    }),
    defineField({
      name: "blurb",
      title: "Blurb",
      type: "text",
      rows: 3,
      description: "Introductory paragraph under the page title.",
    }),
    defineField({
      name: "tools",
      title: "Software & tools",
      type: "array",
      of: [{ type: "tool" }],
      description: "Logos shown in the tools strip on the Services page.",
    }),
  ],
  preview: { prepare: () => ({ title: "Services page" }) },
});
