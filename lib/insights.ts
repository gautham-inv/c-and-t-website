/**
 * Insights / thought-leadership — single source of truth for the homepage
 * teaser (components/sections/Insights.tsx) and the /insights index page.
 *
 * There are no per-article detail pages yet; `href` points at the insights
 * index for now. When article pages land, repoint href to /insights/[slug].
 */
export type Insight = {
  title: string;
  tag: string;
  read: string;
  date: string;
  image: string;
  excerpt: string;
  href: string;
};

export const INSIGHTS: Insight[] = [
  {
    title: "How federated BIM keeps airport programmes on schedule",
    tag: "BIM",
    read: "5 min read",
    date: "May 2026",
    image: "/bim-and-3d-modelling.jpg",
    excerpt:
      "Clash-checked, federated models resolve coordination conflicts before they reach site — keeping terminal programmes on track across thousands of MEP interfaces.",
    href: "/insights",
  },
  {
    title: "CFD in terminal ventilation: balancing comfort and safety",
    tag: "CFD",
    read: "7 min read",
    date: "Apr 2026",
    image: "/cfd-fea-analysis.webp",
    excerpt:
      "Simulating airflow and smoke movement lets us tune ventilation for passenger comfort and life-safety long before the first duct is installed.",
    href: "/insights",
  },
  {
    title: "Engineering MEP for hyperscale data centres",
    tag: "Data Centres",
    read: "6 min read",
    date: "Mar 2026",
    image: "/datacenter.jpeg",
    excerpt:
      "Power density, redundancy and cooling drive every decision — here's how we approach the mechanical and electrical backbone of a modern data hall.",
    href: "/insights",
  },
  {
    title: "From LOD 300 to LOD 500: what fabrication-ready really means",
    tag: "3D Modelling",
    read: "5 min read",
    date: "Feb 2026",
    image: "/mep-engineering-design.jpg",
    excerpt:
      "High-LOD modelling on refineries and LNG plants turns the model into a construction tool — accurate take-offs, fewer RFIs and faster fabrication.",
    href: "/insights",
  },
];
