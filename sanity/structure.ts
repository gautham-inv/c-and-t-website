import type { StructureResolver } from "sanity/structure";

/** Singleton document IDs — one document each, edited in place. */
const SINGLETONS = [
  { id: "homePage", type: "homePage", title: "Home page" },
  { id: "aboutPage", type: "aboutPage", title: "About page" },
  { id: "servicesPage", type: "servicesPage", title: "Services page" },
  { id: "careersPage", type: "careersPage", title: "Careers page" },
  { id: "siteSettings", type: "siteSettings", title: "Site settings" },
];

const SINGLETON_TYPES = new Set(SINGLETONS.map((s) => s.type));

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // Singletons — pinned, no list / no "create new"
      ...SINGLETONS.map((s) =>
        S.listItem()
          .title(s.title)
          .id(s.id)
          .child(S.document().schemaType(s.type).documentId(s.id)),
      ),
      S.divider(),
      // Collections
      S.documentTypeListItem("division").title("Divisions"),
      S.documentTypeListItem("service").title("Services"),
      S.documentTypeListItem("project").title("Projects"),
      S.documentTypeListItem("insight").title("Insights"),
      S.documentTypeListItem("jobOpening").title("Job openings"),
    ]);

export { SINGLETON_TYPES };
