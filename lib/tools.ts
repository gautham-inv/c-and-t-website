/**
 * Software / tools stack shown on the /services page (ToolsStrip). This is the
 * fallback source of truth — the frontend reads it from Sanity (siteSettings
 * → tools) first and falls back to this list when the dataset isn't seeded.
 * Logos live in /public/tools; each entry links to the maker's product page.
 */
export type Tool = { name: string; logo: string; href: string };

export const TOOLS: Tool[] = [
  { name: "Autodesk Revit (AEC Collection)", logo: "/tools/aec-collection.png", href: "https://www.autodesk.com/collections/architecture-engineering-construction/overview" },
  { name: "Autodesk Construction Cloud (ACC)", logo: "/tools/acc-logo.webp", href: "https://construction.autodesk.com/" },
  { name: "Autodesk AutoCAD", logo: "/tools/autodesk-autocad.png", href: "https://www.autodesk.com/products/autocad/overview" },
  { name: "ZWCAD", logo: "/tools/zwcad.png", href: "https://www.zwsoft.com/product/zwcad" },
  { name: "Autodesk Navisworks Manage", logo: "/tools/autodesk-navisworks.png", href: "https://www.autodesk.com/products/navisworks/overview" },
  { name: "AVEVA E3D", logo: "/tools/aveva-e3d.png", href: "https://www.aveva.com/en/products/e3d-design/" },
  { name: "HAP", logo: "/tools/hap.png", href: "https://www.carrier.com/commercial/en/us/software/hvac-system-design/hourly-analysis-program/" },
  { name: "Dialux", logo: "/tools/dialux.png", href: "https://www.dialux.com/en-GB/" },
  { name: "HydraCALC", logo: "/tools/hydracalc.png", href: "https://hydratecinc.com/software/hydratec/hydracalc" },
  { name: "PipeNet", logo: "/tools/pipenet.jpeg", href: "https://sunrise-sys.com/" },
  { name: "Bluebeam Revu", logo: "/tools/bluebeam-revu.png", href: "https://www.bluebeam.com/solutions/revu/" },
  { name: "Autodesk ReCap Pro", logo: "/tools/autodesk-recap-pro.webp", href: "https://www.autodesk.com/products/recap/overview" },
  { name: "Microsoft Office 365", logo: "/tools/office-365.png", href: "https://www.microsoft.com/microsoft-365" },
  { name: "Microsoft Project", logo: "/tools/microsoft-project.png", href: "https://www.microsoft.com/microsoft-365/project/project-management-software" },
  { name: "Primavera P6", logo: "/tools/primavera-p6.png", href: "https://www.oracle.com/construction-engineering/primavera-p6/" },
  { name: "Dynamo for Revit", logo: "/tools/dynamo.png", href: "https://dynamobim.org/" },
  { name: "Python", logo: "/tools/python.png", href: "https://www.python.org/" },
  { name: "ETAP", logo: "/tools/etap.png", href: "https://etap.com/" },
];
