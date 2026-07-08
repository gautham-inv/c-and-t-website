/**
 * Company content — single source of truth for the /about page.
 * Narrative, vision/mission/values, the dual journey timeline (the practice's
 * own evolution + projects awarded), the global group footprint, and the
 * capabilities list (which links out to the pages that own each in detail).
 */

export const VISION =
  "C&T shall be a professionally managed engineering services company committed to total stakeholder satisfaction while delivering SMART ENGINEERING solutions to the desired standards.";

export const MISSION =
  "To deliver sustainable MEP engineering & BIM services across the globe — compliant with local ESG criteria — for the better performance of every asset we touch.";

export type Value = { name: string; body: string };

export const VALUES: Value[] = [
  {
    name: "Ethics",
    body: "Honest, principled conduct in every engagement — the standard our clients and partners rely on.",
  },
  {
    name: "Legal Compliance",
    body: "We work within the letter and the spirit of the law in every market we operate in.",
  },
  {
    name: "Transparent Transactions",
    body: "Clear, open dealings with clients, partners and our own team — no hidden terms, no surprises.",
  },
  {
    name: "Integrity",
    body: "We do what we say and say what we mean, holding the line even when no one is watching.",
  },
  {
    name: "Growth & Development",
    body: "We enjoy the journey — investing in our people so they grow alongside the practice.",
  },
  {
    name: "Share & Care",
    body: "We share knowledge and success, and care for the people and communities our work serves.",
  },
];

/** The practice evolving — corporate formation & geographic expansion. */
export type Milestone = {
  year: string;
  title: string;
  detail?: string;
  place?: string;
};

export const COMPANY_MILESTONES: Milestone[] = [
  {
    year: "2011",
    title: "Climate Designers",
    detail: "Founded as a single-engineer HVAC practice.",
    place: "India",
  },
  {
    year: "2013",
    title: "C&T Consulting Engineers Pvt Ltd",
    detail: "Rebranded to a full multidiscipline MEP consultancy.",
    place: "India",
  },
  {
    year: "2024",
    title: "Fortis Technical Services LLC",
    place: "Dubai, UAE",
  },
  {
    year: "2024",
    title: "C&T Consulting Inc.",
    place: "Canada",
  },
  {
    year: "2025",
    title: "Fortis Contracting & General Maintenance LLC",
    place: "Abu Dhabi, UAE",
  },
];

/** Projects awarded — the work that landed as the practice grew. */
export type Award = { year: string; name: string; meta: string };

export const PROJECT_AWARDS: Award[] = [
  { year: "2015", name: "Muscat MRO & Cargo Airport", meta: "Oman" },
  { year: "2016", name: "Mall of Muscat", meta: "Oman" },
  { year: "2017", name: "AHAD Tower", meta: "46 storeys · Dubai" },
  { year: "2021", name: "Duqm Refinery", meta: "Oman" },
  { year: "2025", name: "Trivandrum Airport T2", meta: "Kerala, India" },
];

/** Global group footprint — drives both the locations rail and the globe markers. */
export type Location = {
  name: string;
  role: string;
  lat: number;
  lng: number;
  entities: string[];
};

export const LOCATIONS: Location[] = [
  {
    name: "India",
    role: "Headquarters",
    lat: 10.85,
    lng: 76.27,
    entities: ["C&T Consulting Engineers Pvt Ltd"],
  },
  {
    name: "United Arab Emirates",
    role: "Regional offices",
    lat: 24.45,
    lng: 54.38,
    entities: [
      "Fortis Technical Services LLC — Dubai",
      "Fortis Contracting & General Maintenance LLC — Abu Dhabi",
    ],
  },
  {
    name: "Canada",
    role: "North America",
    lat: 56.13,
    lng: -106.35,
    entities: ["C&T Consulting Inc."],
  },
];

/** Leadership team. `photo` left undefined renders a monogram card; `bio`
 * left undefined skips the hover wipe-reveal (no content to show). */
export type Leader = { name: string; role: string; photo?: string; bio?: string };

export const LEADERSHIP: Leader[] = [
  {
    name: "Jimmy Bentex",
    role: "Founder & CEO",
    photo: "/leadership/jimmy.png",
    bio: "B Tech Mechanical Engineering (CET), M Tech (KU). IGBC Lead Associate & ISHRAE member. 25 years across Bilt Middle East, Voltas (TATA), Bluestar & Chalmers Engineering, Dubai.",
  },
  { name: "Vidyanand", role: "CFO", photo: "/leadership/vidyanand.jpeg" },
  { name: "Laxman Babu", role: "Director" },
  {
    name: "V S Sriram",
    role: "Technical Advisor",
    photo: "/leadership/vs-sriram.png",
    bio: "Mechanical Engineering graduate with 35+ years in MEP across India, the Middle East and SE Asia. Dynamic techno-commercial professional with strong analytical and problem-solving skills, and a passionate mentor and technical trainer.",
  },
  {
    name: "Sherjin Raj S S",
    role: "OM / HOD Plumbing & Fire",
    photo: "/leadership/sherjin.png",
    bio: "Mechanical Engineer with 20+ years in MEPF — engineering design, project management, construction supervision and operations across airport, hospitality, residential, industrial and commercial sectors.",
  },
  { name: "Saibu", role: "OM / HOD E&I" },
  { name: "Arun Kumar", role: "HOD Electrical" },
  { name: "Kumar", role: "HOD HVAC" },
  {
    name: "Sunil Kumar AK",
    role: "HOD Instrumentation",
    photo: "/leadership/sunilkumar.png",
    bio: "B Tech Instrumentation & Control (4th rank, Calicut University), MBA (Bajaj Institute, Bombay), PMP-certified. 29+ years across HPCL, ADNOC, Reliance, Singapore Power, Yokogawa, Schneider Electric, AVEVA & Dangote Refinery.",
  },
];

/** What we engineer — links out to the page that owns each capability in depth. */
export type Capability = { label: string; href?: string };

export const CAPABILITIES: Capability[] = [
  { label: "Oil & Gas · Marine · Renewable Energy", href: "/divisions/oil-and-gas" },
  { label: "Aviation & Airports", href: "/sectors/airports" },
  { label: "Data Centers", href: "/sectors/data-centres" },
  { label: "Fluid Dynamics (CFD)", href: "/services" },
  { label: "Industrial Facilities", href: "/sectors/industrial" },
  { label: "Luxury Hotels" },
  { label: "Multispecialty Hospitals" },
  { label: "Shopping Malls" },
  { label: "Highrise Residential" },
];
