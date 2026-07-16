import type { SchemaTypeDefinition } from "sanity";

// Documents
import { service } from "./service";
import { division } from "./division";
import { project } from "./project";
import { insight } from "./insight";
import { jobOpening } from "./jobOpening";

// Singletons
import { homePage } from "./homePage";
import { aboutPage } from "./aboutPage";
import { careersPage } from "./careersPage";
import { siteSettings } from "./siteSettings";

// Objects
import {
  stat,
  faq,
  divisionScope,
  approach,
  galleryItem,
  personnel,
  testimonial,
  infoRow,
  location,
  milestone,
  award,
  value,
  capability,
  leader,
  tool,
  navItem,
  office,
  socialLink,
  caseStudy,
  careerReason,
} from "./objects";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Documents
  service,
  division,
  project,
  insight,
  jobOpening,
  // Singletons
  homePage,
  aboutPage,
  careersPage,
  siteSettings,
  // Objects
  stat,
  faq,
  divisionScope,
  approach,
  galleryItem,
  personnel,
  testimonial,
  infoRow,
  location,
  milestone,
  award,
  value,
  capability,
  leader,
  tool,
  navItem,
  office,
  socialLink,
  caseStudy,
  careerReason,
];
