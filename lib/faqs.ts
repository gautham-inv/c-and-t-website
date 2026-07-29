/**
 * Company-level FAQ — shown on the homepage (#faq) and emitted as FAQPage
 * structured data. Written answer-first for AEO: every answer opens with a
 * direct, self-contained 40–60 word response an answer engine can lift
 * verbatim, then adds supporting detail. Facts here mirror the rest of the
 * site (lib/company.ts, lib/divisions.ts) — keep them in sync.
 */
export type Faq = { q: string; a: string };

export const COMPANY_FAQS: Faq[] = [
  {
    q: "What does C&T Consulting Engineers do?",
    a: "C&T Consulting Engineers is a multidisciplinary engineering consultancy delivering MEP (mechanical, electrical, plumbing) design, BIM modelling and CFD analysis. Founded in 2011 and headquartered in Thiruvananthapuram, India, it serves building, airport, data centre, industrial and oil & gas projects worldwide through two dedicated divisions: Buildings & Infrastructure and Oil & Gas.",
  },
  {
    q: "Where is C&T based and where does it operate?",
    a: "C&T is headquartered in Thiruvananthapuram, Keralam, India, with regional offices in the UAE and Canada. From these bases it delivers engineering across India, the Middle East, Qatar, Saudi Arabia, Canada and Europe, backed by an ISO 9001:2015 certified quality system and a team of around 100 engineers.",
  },
  {
    q: "What engineering services does C&T provide?",
    a: "C&T provides multidisciplinary engineering design (architectural, structural and MEP), BIM and 3D modelling, clash detection and coordination, CFD and FEA analysis, hydraulic calculations, ETAP power-system studies, tendering and MTO support, cOBie asset management, and peer-review consultation — across both its Buildings & Infrastructure and Oil & Gas divisions.",
  },
  {
    q: "What level of BIM detail (LOD) does C&T deliver?",
    a: "For buildings, C&T typically delivers LOD 300 for coordination and LOD 400 where fabrication-level detail is required, as federated, clash-checked Navisworks models. For oil & gas work it produces high-LOD models up to LOD 500, turning the model into a construction and asset-management tool with accurate quantity take-offs.",
  },
  {
    q: "Does C&T handle oil & gas and energy projects?",
    a: "Yes. C&T's Oil & Gas division delivers detailed engineering and high-LOD 3D modelling for refineries, LNG plants and offshore platforms. Past work includes Yamal LNG, the Duqm Refinery and offshore scopes, for clients and partners such as ADNOC, Petrofac, TECHNIP, Qatar Energy and L&T.",
  },
  {
    q: "What kinds of projects has C&T delivered?",
    a: "C&T has engineered airports, data centres, high-rise towers, malls, refineries, LNG plants and offshore platforms. Representative projects include a 163,000 m² South-India airport terminal, the 2.4 MW Calinova data centre, Mall of Muscat, the Duqm Refinery and Yamal LNG — spanning both commercial buildings and heavy industry.",
  },
  {
    q: "Is C&T certified, and how does it engage with clients?",
    a: "C&T operates an ISO 9001:2015 certified quality management system and works both directly for owners and as the MEP/BIM partner to lead consultants and EPCs. Clients and partners include AECOM, Voltas, Petrofac, TECHNIP, Qatar Energy, L&T and ADNOC across its India, Middle East and North America operations.",
  },
];
