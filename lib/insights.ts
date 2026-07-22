/**
 * Insights / thought-leadership — single source of truth for the homepage
 * teaser (components/sections/Insights.tsx), the /insights index page, and
 * per-article pages at /insights/[slug].
 */
import type { ProjectBlock } from "./projects";

export type Insight = {
  /** Permanent Sanity document identity — assigned once, never renamed, even
   * if `slug`/`title` change later. Renaming this instead of adding a new
   * entry orphans the old Sanity doc (and can fail to delete it if anything
   * references it), so treat it as immutable. Only meaningful for the local
   * fallback array (drives the seed script's document id); Sanity-sourced
   * insights already have their own real `_id` and don't need this. */
  id?: string;
  slug: string;
  title: string;
  tag: string;
  read: string;
  date: string;
  image: string;
  excerpt: string;
  href: string;
  /** Full article content — omitted for teaser-only entries without a
   * written-out piece yet; the detail page still renders on hero + excerpt. */
  body?: ProjectBlock[];
  /** Credit line for republished/guest content, shown at the end of the article. */
  attribution?: string;
};

export const INSIGHTS: Insight[] = [
  {
    id: "what-defines-a-successful-engineering-project",
    slug: "what-defines-a-successful-engineering-project",
    title: "What Defines a Successful Engineering Project?",
    tag: "Project Management",
    read: "3 min read",
    date: "Jul 2026",
    image: "/services/project-management.jpg",
    excerpt:
      "A well-executed project isn't just one delivered on schedule — it balances time, cost, quality, safety and client expectations throughout its lifecycle.",
    href: "/insights/what-defines-a-successful-engineering-project",
    body: [
      {
        type: "p",
        text: "Every completed building tells a story—but the real success of a project is determined long before construction ends. From the first design meeting to final handover, successful project management is about making the right decisions at the right time.",
      },
      {
        type: "p",
        text: "A well-executed project isn't just one that's delivered on schedule. It successfully balances time, cost, quality, safety, and client expectations throughout its lifecycle.",
      },
      { type: "heading", text: "Planning Is the Foundation" },
      {
        type: "p",
        text: "Successful projects begin with meticulous planning. Clear objectives, realistic schedules, early procurement of long-lead items, effective resource allocation, and proactive risk management help prevent delays and costly rework.",
      },
      {
        type: "p",
        text: "As the saying goes, \"Fail to plan, plan to fail.\"",
      },
      { type: "heading", text: "Balancing Time, Cost and Quality" },
      {
        type: "p",
        text: "Every project faces pressure to reduce costs and accelerate delivery. However, compromising quality for speed or savings often leads to defects, delays, and higher long-term costs.",
      },
      {
        type: "p",
        text: "The most successful projects achieve a healthy balance between schedule, budget, quality, and safety—without sacrificing one for another.",
      },
      { type: "heading", text: "People Make the Difference" },
      {
        type: "p",
        text: "Technology and engineering expertise are essential, but project success ultimately depends on people. Strong leadership, clear communication, collaboration between stakeholders, and deploying the right resources at the right time ensure smoother execution and better outcomes.",
      },
      { type: "heading", text: "Stay Ahead of Risks" },
      {
        type: "p",
        text: "Unexpected challenges are inevitable, but they don't have to derail a project. Continuous monitoring, timely decision-making, and proactive coordination help identify issues before they become major problems.",
      },
      {
        type: "p",
        text: "Whether it's procurement delays, design changes, or coordination conflicts, early intervention is always less costly than corrective action later.",
      },
      { type: "heading", text: "Learn, Improve, Repeat" },
      {
        type: "p",
        text: "Every completed project offers valuable lessons. Reviewing successes, identifying shortcomings, and documenting best practices enable organizations to improve future project delivery.",
      },
      {
        type: "p",
        text: "Continuous improvement is what transforms good project teams into exceptional ones.",
      },
      { type: "heading", text: "Final Thoughts" },
      {
        type: "p",
        text: "Successful project management isn't about meeting a single target—it's about consistently balancing multiple priorities while delivering value to the client. Organizations that invest in planning, collaboration, quality, and continuous learning are better equipped to deliver projects that stand the test of time.",
      },
    ],
    attribution:
      "Content courtesy – with the permission of V.S. Sriram, from his course published in PDH Online (PDH Course P158 – Introduction to Project Management).",
  },
  {
    id: "how-federated-bim-keeps-airport-programmes-on-schedule",
    slug: "federated-bim-airport-programmes",
    title: "How federated BIM keeps airport programmes on schedule",
    tag: "BIM",
    read: "5 min read",
    date: "May 2026",
    image: "/bim-and-3d-modelling.jpg",
    excerpt:
      "Clash-checked, federated models resolve coordination conflicts before they reach site, keeping terminal programmes on track across thousands of MEP interfaces.",
    href: "/insights/federated-bim-airport-programmes",
  },
  {
    id: "cfd-in-terminal-ventilation-balancing-comfort-and-safety",
    slug: "cfd-terminal-ventilation-comfort-safety",
    title: "CFD in terminal ventilation: balancing comfort and safety",
    tag: "CFD",
    read: "7 min read",
    date: "Apr 2026",
    image: "/cfd-fea-analysis.webp",
    excerpt:
      "Airflow and smoke simulations tune ventilation for passenger comfort and life safety long before the first duct is installed.",
    href: "/insights/cfd-terminal-ventilation-comfort-safety",
  },
  {
    id: "engineering-mep-for-hyperscale-data-centres",
    slug: "mep-hyperscale-data-centres",
    title: "Engineering MEP for hyperscale data centres",
    tag: "Data Centres",
    read: "6 min read",
    date: "Mar 2026",
    image: "/datacenter.jpeg",
    excerpt:
      "Power density, redundancy and cooling drive every decision behind the mechanical and electrical backbone of a modern data hall.",
    href: "/insights/mep-hyperscale-data-centres",
  },
  {
    id: "from-lod-300-to-lod-500-what-fabrication-ready-really-means",
    slug: "lod-300-to-lod-500-fabrication-ready",
    title: "From LOD 300 to LOD 500: what fabrication-ready really means",
    tag: "3D Modelling",
    read: "5 min read",
    date: "Feb 2026",
    image: "/mep-engineering-design.jpg",
    excerpt:
      "High-LOD modelling on refineries and LNG plants turns the model into a construction tool, producing accurate take-offs, fewer RFIs and faster fabrication.",
    href: "/insights/lod-300-to-lod-500-fabrication-ready",
  },
];
