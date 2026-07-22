/**
 * Project content — single source of truth for every /projects/[slug] page.
 * One shared template (ProjectView) renders these; adding a project = one
 * entry here.
 *
 * `name` is also the join key used by the project cards elsewhere on the site
 * (homepage carousel, sector & service "featured projects"): a card links
 * through to /projects/[slug] when projectSlug(card.name) finds a match.
 */

import type { DivisionSlug } from "@/lib/divisions";

export type ProjectBlock =
  | { type: "p"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] };

export type ProjectInfoRow = { label: string; value: string | string[] };
export type Personnel = { name: string; role: string; photo?: string };
/** Bento tile size — sm = square, wide = 2-wide, tall = 2-high, lg = 2×2. */
export type GallerySpan = "sm" | "wide" | "tall" | "lg";
export type GalleryItem = { image: string; span: GallerySpan; alt?: string };
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  photo?: string;
};

export type Project = {
  slug: string;
  name: string;
  /** Hero sub-line under the name. */
  tagline?: string;
  heroImage: string;
  description: ProjectBlock[];
  info: ProjectInfoRow[];
  personnel: Personnel[];
  gallery: GalleryItem[];
  /** Optional — band hidden when absent. */
  testimonials?: Testimonial[];
};

export const PROJECTS: Project[] = [
  {
    slug: "expo-2020-dubai",
    name: "EXPO 2020 Campus, Dubai",
    tagline: "Plant-room BIM · LOD 400",
    heroImage: "/projects/expocampus.jpg",
    description: [
      {
        type: "p",
        text: "C&T delivered BIM modelling for the plant rooms across the EXPO 2020 campus in Dubai, a 300,000 m² commercial development, coordinating dense mechanical, electrical and public-health plant for the World Expo site.",
      },
      {
        type: "p",
        text: "Working for CINQ / Voltas International, the team modelled the plant rooms to LOD 400, producing fabrication-ready, clash-resolved models so the services could be prefabricated and installed against a fixed opening date.",
      },
      { type: "heading", text: "Scope" },
      {
        type: "list",
        items: [
          "LOD 400 BIM modelling of plant rooms",
          "Multidiscipline MEP coordination",
          "Clash detection and resolution",
          "Fabrication-ready model output",
        ],
      },
    ],
    info: [
      { label: "Client", value: "CINQ / Voltas International" },
      { label: "Type", value: "Commercial Building, Expo Campus" },
      { label: "Area", value: "300,000 m²" },
      {
        label: "Services",
        value: "BIM Modelling for Plant Rooms (LOD 400)",
      },
      { label: "Location", value: "Dubai, UAE" },
      { label: "Year", value: "2019" },
    ],
    personnel: [],
    gallery: [
      { image: "/projects/expocampus.jpg", span: "lg", alt: "Expo 2020 campus" },
      { image: "/bim-and-3d-modelling.jpg", span: "tall", alt: "Plant-room BIM model" },
      { image: "/mep-engineering-design.jpg", span: "sm", alt: "MEP design" },
      { image: "/clash-detection-and-coordination.jpg", span: "sm", alt: "Clash coordination" },
      { image: "/engineering.jpg", span: "wide", alt: "Plant room services" },
      { image: "/bim-clash-detection.jpg", span: "sm", alt: "Clash detection" },
      { image: "/cfd-fea-analysis.webp", span: "sm", alt: "CFD analysis" },
    ],
  },
  {
    slug: "south-india-airport-terminal",
    name: "Major Airport, South India",
    tagline: "MEP Design & BIM · 163,000 m²",
    heroImage: "/projects/airport-terminal-case-study.jpg",
    description: [
      {
        type: "p",
        text: "C&T provided MEP design and BIM services for a major airport terminal in south India, a 163,000 m² passenger terminal, covering the mechanical, electrical and public-health systems that keep a large transit building running.",
      },
      {
        type: "p",
        text: "The team delivered both design and coordinated BIM models, resolving services across the terminal's public concourses and back-of-house plant so the disciplines could be built out cleanly on site.",
      },
      { type: "heading", text: "Scope" },
      {
        type: "list",
        items: [
          "MEP design across the terminal",
          "Coordinated BIM modelling",
          "Multidiscipline MEP coordination",
          "Clash detection and resolution",
        ],
      },
    ],
    info: [
      { label: "Type", value: "Airport, Passenger Terminal" },
      { label: "Area", value: "163,000 m²" },
      { label: "Services", value: "MEP Design & BIM" },
      { label: "Location", value: "South India" },
      { label: "Division", value: "Buildings & Infrastructure" },
    ],
    personnel: [],
    gallery: [
      { image: "/projects/airport-terminal-case-study.jpg", span: "lg", alt: "Airport terminal, south India" },
      { image: "/bim-models/airport-substation-1.jpg", span: "tall", alt: "Terminal substation BIM model" },
      { image: "/bim-models/airport-pump-room.jpg", span: "sm", alt: "Pump room BIM model" },
      { image: "/bim-models/airport-substation-2.jpg", span: "sm", alt: "Substation services model" },
      { image: "/bim-models/airport-services-overview.jpg", span: "wide", alt: "Coordinated MEP services model" },
      { image: "/airport.webp", span: "sm", alt: "Airport terminal" },
    ],
  },
  {
    slug: "calinova-data-centre",
    name: "Calinova 2.4 MW Data Centre",
    tagline: "MEP Design & BIM · Calicut",
    heroImage: "/projects/calinova-case-study.jpg",
    description: [
      {
        type: "p",
        text: "C&T delivered MEP design and BIM services for the Calinova 2.4 MW data centre in Calicut, coordinating the power, cooling and public-health systems a critical facility depends on.",
      },
      {
        type: "p",
        text: "The team produced coordinated models of the mechanical and electrical services, resolving dense plant and distribution routes so the facility could be installed to tight, mission-critical tolerances.",
      },
      { type: "heading", text: "Scope" },
      {
        type: "list",
        items: [
          "MEP design for a 2.4 MW data centre",
          "Coordinated BIM modelling",
          "Multidiscipline MEP coordination",
          "Clash detection and resolution",
        ],
      },
    ],
    info: [
      { label: "Type", value: "Data Centre, 2.4 MW" },
      { label: "Services", value: "MEP Design & BIM" },
      { label: "Location", value: "Calicut, India" },
      { label: "Division", value: "Buildings & Infrastructure" },
    ],
    personnel: [],
    gallery: [
      { image: "/projects/calinova-case-study.jpg", span: "lg", alt: "Calinova data centre" },
      { image: "/bim-models/electrical-room-1.png", span: "tall", alt: "Electrical room, data centre" },
      { image: "/bim-models/chw-pump-room-2.jpeg", span: "sm", alt: "Chilled water pump room" },
      { image: "/bim-models/ets-room-1.jpeg", span: "sm", alt: "ETS room" },
      { image: "/bim-models/fire-pump-room-1.png", span: "wide", alt: "Fire pump room" },
      { image: "/bim-models/3d-view-2.jpeg", span: "sm", alt: "Coordinated MEP model" },
    ],
  },
  {
    slug: "yamal-lng",
    name: "Yamal LNG, Russia",
    tagline: "Detailed Engineering · 3D · TECHNIP",
    heroImage: "/projects/yamal.webp",
    description: [
      {
        type: "p",
        text: "C&T carried out detailed engineering and 3D modelling for the Yamal LNG project in Russia, working for TECHNIP on a large liquefied-natural-gas development in the Russian Arctic.",
      },
      {
        type: "p",
        text: "The team produced detailed 3D models of the process and utility systems, supporting coordinated engineering across the disciplines involved in the facility.",
      },
      { type: "heading", text: "Scope" },
      {
        type: "list",
        items: [
          "Detailed engineering",
          "3D modelling",
          "Multidiscipline coordination",
        ],
      },
    ],
    info: [
      { label: "Client", value: "TECHNIP" },
      { label: "Type", value: "LNG Facility" },
      { label: "Services", value: "Detailed Engineering · 3D" },
      { label: "Location", value: "Russia" },
      { label: "Division", value: "Oil & Gas" },
    ],
    personnel: [],
    gallery: [
      { image: "/projects/yamal.webp", span: "lg", alt: "Yamal LNG facility" },
      { image: "/oil-and-gas-division.jpg", span: "tall", alt: "Oil and gas facility" },
      { image: "/services/detailed-engineering.jpg", span: "sm", alt: "Detailed engineering" },
      { image: "/bim-and-3d-modelling.jpg", span: "sm", alt: "3D model" },
      { image: "/oil-and-gas-walkthrough.jpg", span: "wide", alt: "Process plant walkthrough" },
      { image: "/clash-detection-and-coordination.jpg", span: "sm", alt: "Clash coordination" },
    ],
  },
  {
    slug: "bial-bangalore",
    name: "BIAL, Bangalore",
    tagline: "MEP Design · BIM LOD 300 · AECOM",
    heroImage: "/projects/bial-bangalore.jpg",
    description: [
      {
        type: "p",
        text: "C&T provided MEP design and BIM services for BIAL in Bangalore, working for AECOM on the mechanical, electrical and public-health systems of the airport development.",
      },
      {
        type: "p",
        text: "The team modelled the services to LOD 300, producing coordinated models that let the disciplines be resolved and reviewed before construction started.",
      },
      { type: "heading", text: "Scope" },
      {
        type: "list",
        items: [
          "MEP design",
          "LOD 300 BIM modelling",
          "Multidiscipline MEP coordination",
          "Clash detection and resolution",
        ],
      },
    ],
    info: [
      { label: "Client", value: "AECOM" },
      { label: "Type", value: "Airport" },
      { label: "Services", value: "MEP Design · BIM LOD 300" },
      { label: "Location", value: "Bangalore, India" },
      { label: "Division", value: "Buildings & Infrastructure" },
    ],
    personnel: [],
    gallery: [
      { image: "/projects/bial-bangalore.jpg", span: "lg", alt: "BIAL airport" },
      { image: "/airport.jpg", span: "tall", alt: "Airport terminal" },
      { image: "/mep-engineering-design.jpg", span: "sm", alt: "MEP design" },
      { image: "/bim-and-3d-modelling.jpg", span: "sm", alt: "LOD 300 BIM model" },
      { image: "/engineering.jpg", span: "wide", alt: "Terminal services" },
      { image: "/clash-detection-and-coordination.jpg", span: "sm", alt: "Clash coordination" },
    ],
  },
  {
    slug: "duqm-refinery",
    name: "Duqm Refinery, Oman",
    tagline: "Detailed Engineering · LOD 500 · PETROFAC",
    heroImage: "/projects/duqm-refinery.jpeg",
    description: [
      {
        type: "p",
        text: "C&T carried out detailed engineering for the Duqm Refinery in Oman, working for PETROFAC on the process and utility systems of the refinery development.",
      },
      {
        type: "p",
        text: "The team modelled the services to LOD 500, delivering fabrication-level detail so the plant could be prefabricated and installed directly from the model.",
      },
      { type: "heading", text: "Scope" },
      {
        type: "list",
        items: [
          "Detailed engineering to LOD 500",
          "3D modelling of process and utility systems",
          "Multidiscipline coordination",
          "Clash detection and resolution",
        ],
      },
    ],
    info: [
      { label: "Client", value: "PETROFAC" },
      { label: "Type", value: "Refinery" },
      { label: "Services", value: "Detailed Engineering · LOD 500" },
      { label: "Location", value: "Duqm, Oman" },
      { label: "Division", value: "Oil & Gas" },
    ],
    personnel: [],
    gallery: [
      { image: "/projects/duqm-refinery.jpeg", span: "lg", alt: "Duqm Refinery" },
      { image: "/bim-models/duqm-fire-station-1.jpg", span: "tall", alt: "Refinery fire station BIM model" },
      { image: "/bim-models/duqm-laboratory-1.jpg", span: "sm", alt: "Refinery laboratory BIM model" },
      { image: "/bim-models/duqm-medical-center.jpg", span: "sm", alt: "Refinery medical centre BIM model" },
      { image: "/bim-models/duqm-fire-station-2.jpg", span: "wide", alt: "Fire station services model" },
      { image: "/bim-models/duqm-laboratory-2.jpg", span: "sm", alt: "Laboratory services model" },
    ],
  },
  {
    slug: "compression-4-nfps",
    name: "Compression 4-NFPS",
    tagline: "Process Piping · Offshore · Qatar Energy",
    heroImage: "/projects/Compression-4-NFPS.jpeg",
    description: [
      {
        type: "p",
        text: "C&T delivered process piping engineering for the Compression 4-NFPS offshore project, working for Qatar Energy on the piping systems of the offshore facility.",
      },
      {
        type: "p",
        text: "The team produced coordinated models of the offshore process piping, resolving dense routing within the platform's tight spatial envelope.",
      },
      { type: "heading", text: "Scope" },
      {
        type: "list",
        items: [
          "Process piping engineering",
          "Offshore facility modelling",
          "Multidiscipline coordination",
          "Clash detection and resolution",
        ],
      },
    ],
    info: [
      { label: "Client", value: "Qatar Energy" },
      { label: "Type", value: "Offshore, Process Facility" },
      { label: "Services", value: "Process Piping" },
      { label: "Division", value: "Oil & Gas" },
    ],
    personnel: [],
    gallery: [
      { image: "/projects/Compression-4-NFPS.jpeg", span: "lg", alt: "Compression 4-NFPS offshore facility" },
      { image: "/bim-models/whp13n-navis-hvac.png", span: "tall", alt: "Offshore platform HVAC model" },
      { image: "/bim-models/rp3s-navis-model.png", span: "sm", alt: "Compartment 3D model" },
      { image: "/bim-models/rp5n-navis-model.png", span: "sm", alt: "Compartment 3D model" },
      { image: "/oil-and-gas-walkthrough.jpg", span: "wide", alt: "Piping walkthrough" },
      { image: "/clash-detection-and-coordination.jpg", span: "sm", alt: "Clash coordination" },
    ],
  },
  {
    slug: "balwin-4",
    name: "Balwin 4 (2 GW)",
    tagline: "HVAC & E&I Design · Offshore Platform",
    heroImage: "/bim-models/whp13n-navis-model.png",
    description: [
      {
        type: "p",
        text: "C&T provided HVAC and electrical & instrumentation (E&I) design for the Balwin 4 offshore platform, a 2 GW development delivered for Dry Dock World.",
      },
      {
        type: "p",
        text: "The team designed the platform's HVAC and E&I systems and produced coordinated models, resolving services within the constrained envelope of an offshore structure.",
      },
      { type: "heading", text: "Scope" },
      {
        type: "list",
        items: [
          "HVAC design",
          "Electrical & instrumentation (E&I) design",
          "Offshore platform coordination",
          "Clash detection and resolution",
        ],
      },
    ],
    info: [
      { label: "Client", value: "Dry Dock World" },
      { label: "Type", value: "Offshore Platform, 2 GW" },
      { label: "Services", value: "HVAC & E&I Design" },
      { label: "Division", value: "Oil & Gas" },
    ],
    personnel: [],
    gallery: [
      { image: "/bim-models/whp13n-navis-model.png", span: "lg", alt: "WHP13N platform model" },
      { image: "/bim-models/rp9s-navis-model.png", span: "tall", alt: "RP9S compartment model" },
      { image: "/bim-models/rp3s-navis-hvac.png", span: "sm", alt: "RP3S HVAC services model" },
      { image: "/bim-models/rp5n-navis-hvac.png", span: "sm", alt: "RP5N HVAC services model" },
      { image: "/bim-models/rp3s-ducting-layout.png", span: "wide", alt: "Ducting layout" },
      { image: "/clash-detection-and-coordination.jpg", span: "sm", alt: "Clash coordination" },
    ],
  },
  {
    slug: "vega-tower-dubai",
    name: "Vega Tower, Dubai",
    tagline: "MEP Design & BIM · LOD 400",
    heroImage: "/bim-models/vega-full-3d.jpg",
    description: [
      {
        type: "p",
        text: "C&T delivered MEP design and BIM services for Vega Tower in Dubai, coordinating the mechanical, electrical and public-health systems of the high-rise development.",
      },
      {
        type: "p",
        text: "The team modelled the services to LOD 400, producing fabrication-ready, clash-resolved models so the disciplines could be prefabricated and installed on site.",
      },
      { type: "heading", text: "Scope" },
      {
        type: "list",
        items: [
          "MEP design",
          "LOD 400 BIM modelling",
          "Multidiscipline MEP coordination",
          "Fabrication-ready model output",
        ],
      },
    ],
    info: [
      { label: "Type", value: "Tower, High-rise Building" },
      { label: "Services", value: "MEP Design & BIM (LOD 400)" },
      { label: "Location", value: "Dubai, UAE" },
      { label: "Division", value: "Buildings & Infrastructure" },
    ],
    personnel: [],
    gallery: [
      { image: "/bim-models/vega-full-3d.jpg", span: "lg", alt: "Vega Tower, Dubai" },
      { image: "/bim-models/vega-night.jpg", span: "tall", alt: "Vega Tower at night" },
      { image: "/bim-models/vega-electrical-room.jpg", span: "sm", alt: "Electrical room BIM model" },
      { image: "/bim-models/vega-chw-pump-room.jpg", span: "sm", alt: "Chilled water pump room" },
      { image: "/bim-models/vega-ets-room.jpg", span: "wide", alt: "ETS room BIM model" },
      { image: "/bim-models/vega-fire-pump.jpg", span: "sm", alt: "Fire pump room" },
    ],
  },
  {
    slug: "muscat-cargo-oman",
    name: "Muscat Cargo, Oman",
    tagline: "MEP Design & BIM LOD 300 · Commercial",
    heroImage: "/projects/muscat-cargo-oman.jpg",
    description: [
      {
        type: "p",
        text: "C&T provided MEP design and BIM services for the Muscat Cargo commercial development in Oman, working for EIDC / J&P on the mechanical, electrical and public-health systems.",
      },
      {
        type: "p",
        text: "The team modelled the services to LOD 300 and coordinated the disciplines so clashes could be resolved before construction began.",
      },
      { type: "heading", text: "Scope" },
      {
        type: "list",
        items: [
          "MEP design",
          "LOD 300 BIM modelling",
          "Multidiscipline MEP coordination",
          "Clash detection and resolution",
        ],
      },
    ],
    info: [
      { label: "Client", value: "EIDC / J&P" },
      { label: "Type", value: "Commercial Building" },
      { label: "Services", value: "MEP Design & BIM (LOD 300)" },
      { label: "Location", value: "Muscat, Oman" },
      { label: "Division", value: "Buildings & Infrastructure" },
    ],
    personnel: [],
    gallery: [
      { image: "/projects/muscat-cargo-oman.jpg", span: "lg", alt: "Muscat Cargo development" },
      { image: "/bim-models/ets-room-3.jpeg", span: "tall", alt: "ETS room" },
      { image: "/bim-models/electrical-room-3.jpeg", span: "sm", alt: "Electrical room" },
      { image: "/bim-models/3d-view-4.jpeg", span: "sm", alt: "Coordinated MEP model" },
      { image: "/engineering.jpg", span: "wide", alt: "Building services" },
      { image: "/clash-detection-and-coordination.jpg", span: "sm", alt: "Clash coordination" },
    ],
  },
  {
    slug: "mall-of-muscat",
    name: "Mall of Muscat, Oman",
    tagline: "MEP Design · 1.8M sqft",
    heroImage: "/projects/mall-of-muscat.jpeg",
    description: [
      {
        type: "p",
        text: "C&T delivered MEP design for the Mall of Muscat in Oman, a 1.8 million sqft retail development, working for EIDC on the mechanical, electrical and public-health systems.",
      },
      {
        type: "p",
        text: "The team designed services across the mall's public and back-of-house areas, coordinating disciplines at the scale a large retail development demands.",
      },
      { type: "heading", text: "Scope" },
      {
        type: "list",
        items: [
          "MEP design across the development",
          "Multidiscipline MEP coordination",
          "Services design for retail and back-of-house areas",
        ],
      },
    ],
    info: [
      { label: "Client", value: "EIDC" },
      { label: "Type", value: "Retail, Mall" },
      { label: "Area", value: "1.8M sqft" },
      { label: "Services", value: "MEP Design" },
      { label: "Location", value: "Muscat, Oman" },
      { label: "Year", value: "2016" },
      { label: "Division", value: "Buildings & Infrastructure" },
    ],
    personnel: [],
    gallery: [
      { image: "/projects/mall-of-muscat.jpeg", span: "lg", alt: "Mall of Muscat" },
      { image: "/mep-engineering-design.jpg", span: "tall", alt: "MEP design" },
      { image: "/engineering.jpg", span: "sm", alt: "Building services" },
      { image: "/services/detailed-engineering.jpg", span: "sm", alt: "Detailed engineering" },
      { image: "/bim-and-3d-modelling.jpg", span: "wide", alt: "3D model" },
      { image: "/clash-detection-and-coordination.jpg", span: "sm", alt: "Clash coordination" },
    ],
  },
  {
    slug: "al-khoud-mall",
    name: "Al Khoud Mall, Oman",
    tagline: "MEP Design · 100,000 m²",
    heroImage: "/building-division.jpg",
    description: [
      {
        type: "p",
        text: "C&T delivered MEP design for Al Khoud Mall in Oman, a 100,000 m² retail development, working for EIDC on the mechanical, electrical and public-health systems.",
      },
      {
        type: "p",
        text: "The team designed and coordinated services across the mall, resolving disciplines to suit the operational needs of a large retail environment.",
      },
      { type: "heading", text: "Scope" },
      {
        type: "list",
        items: [
          "MEP design across the development",
          "Multidiscipline MEP coordination",
          "Services design for retail and back-of-house areas",
        ],
      },
    ],
    info: [
      { label: "Client", value: "EIDC" },
      { label: "Type", value: "Retail, Mall" },
      { label: "Area", value: "100,000 m²" },
      { label: "Services", value: "MEP Design" },
      { label: "Location", value: "Oman" },
      { label: "Year", value: "2017" },
      { label: "Division", value: "Buildings & Infrastructure" },
    ],
    personnel: [],
    gallery: [
      { image: "/building-division.jpg", span: "lg", alt: "Al Khoud Mall" },
      { image: "/mep-engineering-design.jpg", span: "tall", alt: "MEP design" },
      { image: "/engineering.jpg", span: "sm", alt: "Building services" },
      { image: "/services/detailed-engineering.jpg", span: "sm", alt: "Detailed engineering" },
      { image: "/bim-and-3d-modelling.jpg", span: "wide", alt: "3D model" },
      { image: "/clash-detection-and-coordination.jpg", span: "sm", alt: "Clash coordination" },
    ],
  },
  {
    slug: "emaar-district-cooling",
    name: "Emaar District Cooling Plant, Dubai",
    tagline: "BIM LOD 500 · Voltas",
    heroImage: "/projects/District-Cooling-Plant-emaar.jpg",
    description: [
      {
        type: "p",
        text: "C&T delivered BIM services for the Emaar District Cooling Plant in Dubai, working for Voltas on a facility that supplies chilled water across a district development.",
      },
      {
        type: "p",
        text: "The team modelled the plant to LOD 500, producing fabrication-level, clash-resolved models so the dense mechanical and electrical services could be prefabricated and installed.",
      },
      { type: "heading", text: "Scope" },
      {
        type: "list",
        items: [
          "LOD 500 BIM modelling",
          "Multidiscipline MEP coordination",
          "Clash detection and resolution",
          "Fabrication-ready model output",
        ],
      },
    ],
    info: [
      { label: "Client", value: "Voltas" },
      { label: "Type", value: "District Cooling Plant" },
      { label: "Services", value: "BIM (LOD 500)" },
      { label: "Location", value: "Dubai, UAE" },
      { label: "Year", value: "2020" },
      { label: "Division", value: "Buildings & Infrastructure" },
    ],
    personnel: [],
    gallery: [
      { image: "/bim-models/dcp-emaar-1.jpg", span: "lg", alt: "Emaar district cooling plant" },
      { image: "/bim-models/dcp-emaar-2.jpg", span: "tall", alt: "District cooling plant BIM model" },
      { image: "/bim-models/dcp-emaar-3.jpg", span: "sm", alt: "Chiller plant coordination" },
      { image: "/bim-models/dcp-emaar-4.jpg", span: "sm", alt: "Plant room BIM model" },
      { image: "/bim-models/dcp-emaar-5.jpg", span: "wide", alt: "Mechanical services model" },
      { image: "/projects/District-Cooling-Plant-emaar.jpg", span: "sm", alt: "Emaar district cooling plant" },
    ],
  },
  {
    slug: "ahad-tower-dubai",
    name: "AHAD Tower, Dubai",
    tagline: "MEP Design · 5B+G+31 · VX Studio",
    heroImage: "/projects/ahad-tower-dubai.jpg",
    description: [
      {
        type: "p",
        text: "C&T delivered MEP design for AHAD Tower in Dubai, a 5B+G+31 high-rise, working for VX Studio on the mechanical, electrical and public-health systems.",
      },
      {
        type: "p",
        text: "The team designed and coordinated services through the tower's basements, ground floor and residential/commercial levels, resolving disciplines for a tall building.",
      },
      { type: "heading", text: "Scope" },
      {
        type: "list",
        items: [
          "MEP design",
          "Multidiscipline MEP coordination",
          "Vertical services distribution design",
          "Clash detection and resolution",
        ],
      },
    ],
    info: [
      { label: "Client", value: "VX Studio" },
      { label: "Type", value: "Tower, 5B+G+31" },
      { label: "Services", value: "MEP Design" },
      { label: "Location", value: "Dubai, UAE" },
      { label: "Year", value: "2018" },
      { label: "Division", value: "Buildings & Infrastructure" },
    ],
    personnel: [],
    gallery: [
      { image: "/projects/ahad-tower-dubai.jpg", span: "lg", alt: "AHAD Tower" },
      { image: "/mep-engineering-design.jpg", span: "tall", alt: "MEP design" },
      { image: "/engineering.jpg", span: "sm", alt: "Building services" },
      { image: "/services/detailed-engineering.jpg", span: "sm", alt: "Detailed engineering" },
      { image: "/bim-and-3d-modelling.jpg", span: "wide", alt: "3D model" },
      { image: "/clash-detection-and-coordination.jpg", span: "sm", alt: "Clash coordination" },
    ],
  },
  {
    slug: "igo-101-dubai",
    name: "IGO 101, Dubai",
    tagline: "MEP Design · 6B+G+31 · VX Studio",
    heroImage: "/projects/igo-101.webp",
    description: [
      {
        type: "p",
        text: "C&T delivered MEP design for IGO 101 in Dubai, a 6B+G+31 high-rise, working for VX Studio on the mechanical, electrical and public-health systems.",
      },
      {
        type: "p",
        text: "The team designed the services through the tower's basements, ground floor and upper levels and coordinated the disciplines for a tall building.",
      },
      { type: "heading", text: "Scope" },
      {
        type: "list",
        items: [
          "MEP design",
          "Multidiscipline MEP coordination",
          "Vertical services distribution design",
          "Clash detection and resolution",
        ],
      },
    ],
    info: [
      { label: "Client", value: "VX Studio" },
      { label: "Type", value: "Tower, 6B+G+31" },
      { label: "Services", value: "MEP Design" },
      { label: "Location", value: "Dubai, UAE" },
      { label: "Year", value: "2018" },
      { label: "Division", value: "Buildings & Infrastructure" },
    ],
    personnel: [],
    gallery: [
      { image: "/projects/igo-101.webp", span: "lg", alt: "IGO 101" },
      { image: "/mep-engineering-design.jpg", span: "tall", alt: "MEP design" },
      { image: "/engineering.jpg", span: "sm", alt: "Building services" },
      { image: "/services/detailed-engineering.jpg", span: "sm", alt: "Detailed engineering" },
      { image: "/bim-and-3d-modelling.jpg", span: "wide", alt: "3D model" },
      { image: "/clash-detection-and-coordination.jpg", span: "sm", alt: "Clash coordination" },
    ],
  },
  {
    slug: "commercial-boulevard-qatar",
    name: "Commercial Boulevard, Qatar",
    tagline: "BIM LOD 350–500 · 5 Buildings · Voltas",
    heroImage: "/projects/qatar-commercial-boulevard-2.jpg",
    description: [
      {
        type: "p",
        text: "C&T delivered BIM services for Commercial Boulevard in Qatar, a development of five buildings, working for Voltas on the mechanical, electrical and public-health systems.",
      },
      {
        type: "p",
        text: "The team modelled the services across the five buildings to LOD 350–500, producing coordinated, clash-resolved models suited to fabrication and installation.",
      },
      { type: "heading", text: "Scope" },
      {
        type: "list",
        items: [
          "BIM modelling to LOD 350–500",
          "Coordination across five buildings",
          "Multidiscipline MEP coordination",
          "Clash detection and resolution",
        ],
      },
    ],
    info: [
      { label: "Client", value: "Voltas" },
      { label: "Type", value: "Commercial, 5 Buildings" },
      { label: "Services", value: "BIM (LOD 350–500)" },
      { label: "Location", value: "Qatar" },
      { label: "Year", value: "2020–21" },
      { label: "Division", value: "Buildings & Infrastructure" },
    ],
    personnel: [],
    gallery: [
      { image: "/bim-models/qatar-boulevard-1.jpg", span: "lg", alt: "Commercial Boulevard, Qatar" },
      { image: "/bim-models/qatar-boulevard-2.jpg", span: "tall", alt: "Commercial Boulevard render" },
      { image: "/bim-models/qatar-boulevard-3.jpg", span: "sm", alt: "Boulevard building render" },
      { image: "/bim-models/qatar-boulevard-4.jpg", span: "sm", alt: "Boulevard building render" },
      { image: "/bim-models/qatar-boulevard-5.jpg", span: "wide", alt: "Boulevard development render" },
      { image: "/bim-models/qatar-boulevard-6.jpg", span: "sm", alt: "Boulevard building render" },
    ],
  },
  {
    slug: "ner-wicr-site-utilities",
    name: "NER & WICR Site Utilities",
    tagline: "MEP Design & BIM · Artelia / NEOM",
    heroImage: "/projects/ner-wicr-ksa.png",
    description: [
      {
        type: "p",
        text: "C&T delivered MEP design and BIM services for the NER & WICR site utilities, working for Artelia on the NEOM development in Saudi Arabia.",
      },
      {
        type: "p",
        text: "The team designed and modelled the site utility systems, producing coordinated models that resolved services across the development's infrastructure.",
      },
      { type: "heading", text: "Scope" },
      {
        type: "list",
        items: [
          "MEP design for site utilities",
          "Coordinated BIM modelling",
          "Multidiscipline coordination",
          "Clash detection and resolution",
        ],
      },
    ],
    info: [
      { label: "Client", value: "Artelia / NEOM" },
      { label: "Type", value: "Site Utilities, Infrastructure" },
      { label: "Services", value: "MEP Design & BIM" },
      { label: "Location", value: "KSA" },
      { label: "Division", value: "Oil & Gas" },
    ],
    personnel: [],
    gallery: [
      { image: "/projects/ner-wicr-ksa.png", span: "lg", alt: "NER & WICR site utilities" },
      { image: "/oil-and-gas-walkthrough.jpg", span: "tall", alt: "Site utilities walkthrough" },
      { image: "/mep-engineering-design.jpg", span: "sm", alt: "MEP design" },
      { image: "/services/detailed-engineering.jpg", span: "sm", alt: "Detailed engineering" },
      { image: "/bim-and-3d-modelling.jpg", span: "wide", alt: "3D model" },
      { image: "/clash-detection-and-coordination.jpg", span: "sm", alt: "Clash coordination" },
    ],
  },
];

/** The full portfolio shown on the /projects index (bento grid). A card links
 * through to a detail page when projectSlug(name) finds one. `division` tags
 * each project to a division so the division pages can show all of their work
 * (derived from this one list — no separate, drift-prone curated set). */
export type PortfolioItem = {
  name: string;
  meta: string;
  /** Omitted when there's no real project photo — surfaces render a branded
   * placeholder card rather than reusing an unrelated image. */
  image?: string;
  division: DivisionSlug;
  /** Industry tag(s) — slugs into lib/industries.ts. Oil & Gas work isn't
   * tagged: that division is organised purely by service, not by sector. */
  industries?: string[];
};

export const PORTFOLIO: PortfolioItem[] = [
  { name: "EXPO 2020 Campus, Dubai", meta: "BIM · Plant Rooms LOD 400 · 300,000 m² · 2019", image: "/projects/expocampus.jpg", division: "building", industries: ["commercial-mercantile"] },
  { name: "Major Airport, South India", meta: "MEP Design & BIM · 163,000 m² · South India", image: "/projects/airport-terminal-case-study.jpg", division: "building", industries: ["aviation-airports"] },
  { name: "Calinova 2.4 MW Data Centre", meta: "MEP Design & BIM · Calicut", image: "/projects/calinova-case-study.jpg", division: "building", industries: ["data-centres"] },
  { name: "Yamal LNG, Russia", meta: "Detailed Engineering · 3D · TECHNIP", image: "/projects/yamal.webp", division: "oil-and-gas" },
  { name: "BIAL, Bangalore", meta: "MEP Design · BIM LOD 300 · AECOM", image: "/projects/bial-bangalore.jpg", division: "building", industries: ["aviation-airports"] },
  { name: "Duqm Refinery, Oman", meta: "Detailed Engineering · LOD 500 · PETROFAC", image: "/projects/duqm-refinery.jpeg", division: "oil-and-gas" },
  { name: "Compression 4-NFPS", meta: "Process Piping · Offshore · Qatar Energy", image: "/projects/Compression-4-NFPS.jpeg", division: "oil-and-gas" },
  { name: "Balwin 4 (2 GW)", meta: "HVAC & E&I Design · Offshore Platform · Dry Dock World", image: "/bim-models/whp13n-navis-model.png", division: "oil-and-gas" },
  { name: "Vega Tower, Dubai", meta: "MEP Design & BIM · LOD 400", image: "/bim-models/vega-full-3d.jpg", division: "building", industries: ["high-rise-buildings"] },
  { name: "Muscat Cargo, Oman", meta: "MEP Design & BIM LOD 300 · Commercial · EIDC/J&P", image: "/projects/muscat-cargo-oman.jpg", division: "building", industries: ["commercial-mercantile"] },
  { name: "Mall of Muscat, Oman", meta: "MEP Design · 1.8M sqft · EIDC · 2016", image: "/projects/mall-of-muscat.jpeg", division: "building", industries: ["commercial-mercantile"] },
  { name: "Al Khoud Mall, Oman", meta: "MEP Design · 100,000 m² · EIDC · 2017", division: "building", industries: ["commercial-mercantile"] },
  { name: "Emaar District Cooling Plant, Dubai", meta: "BIM LOD 500 · Voltas · 2020", image: "/projects/District-Cooling-Plant-emaar.jpg", division: "building", industries: ["chiller-plants"] },
  { name: "AHAD Tower, Dubai", meta: "MEP Design · 5B+G+31 · VX Studio · 2018", image: "/projects/ahad-tower-dubai.jpg", division: "building", industries: ["high-rise-buildings"] },
  { name: "IGO 101, Dubai", meta: "MEP Design · 6B+G+31 · VX Studio · 2018", image: "/projects/igo-101.webp", division: "building", industries: ["high-rise-buildings"] },
  { name: "Commercial Boulevard, Qatar", meta: "BIM LOD 350–500 · 5 Buildings · Voltas · 2020–21", image: "/projects/qatar-commercial-boulevard-2.jpg", division: "building", industries: ["commercial-mercantile"] },
  { name: "NER & WICR Site Utilities", meta: "MEP Design & BIM · Artelia / NEOM · KSA", image: "/projects/ner-wicr-ksa.png", division: "oil-and-gas" },

  // Named projects from the company profile without a real photo or full
  // scope on hand yet — card-only entries (no detail page) until confirmed
  // details/images come through. `meta` intentionally stays to what the
  // source document actually states, no invented client/area/year.
  { name: "Palm Mall, Muscat", meta: "Retail, Mall · Muscat, Oman", division: "building", industries: ["commercial-mercantile"] },
  { name: "Sohar Mall", meta: "Retail, Mall · Sohar, Oman", division: "building", industries: ["commercial-mercantile"] },
  { name: "West 5 Tower", meta: "Tower", division: "building", industries: ["high-rise-buildings"] },
  { name: "Business Bay Residential Tower", meta: "Residential Tower · Business Bay, Dubai", division: "building", industries: ["residential", "high-rise-buildings"] },
  { name: "Jumeirah Residence", meta: "Residence · Jumeirah, Dubai", division: "building", industries: ["hospitality"] },
  { name: "Al Seeb 4-Star Hotel", meta: "4-Star Hotel · Al Seeb, Oman", division: "building", industries: ["hospitality"] },
  { name: "Abuja 4-Star Hotel, Nigeria", meta: "4-Star Hotel · Abuja, Nigeria", division: "building", industries: ["hospitality"] },
  { name: "IBIS Hotel", meta: "Hotel", division: "building", industries: ["hospitality"] },
  { name: "St. Regis 5-Star Beach Hotel", meta: "5-Star Beach Hotel", division: "building", industries: ["hospitality"] },
  { name: "4-Star Hotel, Sohar", meta: "4-Star Hotel · Sohar, Oman", division: "building", industries: ["hospitality"] },
  { name: "Poovar Island Resort", meta: "Island Resort", division: "building", industries: ["hospitality"] },
  { name: "Al Ashram Villas", meta: "Villas", division: "building", industries: ["residential"] },
  { name: "Guru Hospital", meta: "Hospital", division: "building", industries: ["hospitals"] },
  { name: "SUT Hospital", meta: "Hospital", division: "building", industries: ["hospitals"] },
  { name: "Salalah Cargo Terminal", meta: "Cargo Terminal · Salalah, Oman", division: "building", industries: ["aviation-airports"] },
  { name: "200 MLD Water Plant, Qurayyat", meta: "200 MLD Water Plant · Qurayyat, Oman", division: "building", industries: ["infrastructure-town-planning"] },
  { name: "STP Buildings", meta: "Sewage Treatment Plant Buildings", division: "building", industries: ["infrastructure-town-planning"] },
  { name: "Warehouse, Doha", meta: "Warehouse · Doha, Qatar", division: "building", industries: ["industrial"] },
  { name: "Jatayu Nature Park", meta: "Adventure Park, Ropeway & Cave Resort", division: "building" },
  { name: "Reliance Trends", meta: "Retail", division: "building", industries: ["commercial-mercantile"] },
  { name: "Eurofragrance Dubai", meta: "BIM Modelling · Dubai, UAE", division: "building" },

  // From the project register table (Sl no. 1–23, "Building Projects"). Row 1
  // (Trivandrum airport T2) is the existing "Major Airport, South India" entry
  // above — NDA, name withheld. Rows 3, 13, 16, 17 (Kempegowda/Bangalore,
  // NEOM NER & WICR, CBD Qatar, Emaar DCP) match existing entries and are
  // skipped rather than duplicated. Card-only, no photos yet.
  { name: "MOPA Airport, Goa", meta: "HVAC Commissioning · GMR · 2024", division: "building", industries: ["aviation-airports"] },
  { name: "Hospitals, Schools & Offices, Kerala", meta: "BIM · Govt of Kerala · 2024", image: "/projects/kerala-hospital.avif", division: "building", industries: ["hospitals", "offices"] },
  { name: "Man Industries, KSA", meta: "MEP Design & BIM · Man Industry, KSA · 2024", image: "/projects/man-industry.webp", division: "building", industries: ["industrial"] },
  { name: "Oman Botanical Garden", meta: "As-Built BIM · Bhawans Engineering · 2024", image: "/projects/oman-botanic.webp", division: "building", industries: ["infrastructure-town-planning"] },
  { name: "STEP (Petrofac)", meta: "Peer Review · Petrofac · 2024", image: "/projects/step-petrofac.webp", division: "oil-and-gas" },
  { name: "Khasab Hospital, Oman", meta: "BIM Modelling · MEP · LOD 400 · 2024", image: "/projects/khasab-hospital-oman.jpg", division: "building", industries: ["hospitals"] },
  { name: "Waaree Project, Gujarat", meta: "ETP Piping Design · Waaree · 2023", image: "/projects/waree-gujarat.webp", division: "building", industries: ["industrial"] },
  { name: "Sultan Centre, Oman", meta: "MEP Design · EIDC · 2023", image: "/projects/sultan-centre-oman.webp", division: "building", industries: ["commercial-mercantile"] },
  { name: "MIRFA RO Plant, Abu Dhabi", meta: "MEP Concept Design · Artelia · 2023", image: "/projects/Mirfa-2-RO-abudhabi.jpg", division: "building", industries: ["infrastructure-town-planning"] },
  { name: "Yiti 300 Villa Project, Oman", meta: "Architectural & MEP BIM · Adi Oman · 2022", image: "/projects/yiti-oman.webp", division: "building", industries: ["residential"] },
  { name: "Jeddah South Container Terminal, KSA", meta: "3rd Party MEP Design Review · DP World · 2022", image: "/projects/jeddah-south-container.jpg", division: "building", industries: ["infrastructure-town-planning"] },
  { name: "Das Island Harbour Expansion & Rehabilitation, Abu Dhabi", meta: "MEP Design · Abu Dhabi Oil Company · 2021", image: "/projects/das-island.webp", division: "oil-and-gas" },
  { name: "Touristic Village, Oman", meta: "MEP Design · Corduff Oman · 2020", division: "building", industries: ["hospitality"] },
  { name: "Lifty Retail Shop, Dubai", meta: "HVAC Design · Al Zahia City Centre · 2020", division: "building", industries: ["commercial-mercantile"] },
  { name: "G+1+R Villa, Al Thanyah Fourth, Dubai", meta: "HVAC Design · Hiranandani · 2020", image: "/projects/althanayah-fourth.webp", division: "building", industries: ["residential"] },
  { name: "Cotton Body, Deira City Centre", meta: "HVAC Design · Kalandoor Contracting · 2019", image: "/projects/Cotton-On-Body-deira.jpeg", division: "building", industries: ["commercial-mercantile"] },
  { name: "Lefties Retail", meta: "HVAC Design · Kalandoor Contracting · 2019", image: "/projects/lefties-retail.jpg", division: "building", industries: ["commercial-mercantile"] },
  { name: "Decathlon, Dubai", meta: "HVAC Design · 2019", image: "/projects/decathlon-dubai.jpeg", division: "building", industries: ["commercial-mercantile"] },
];

/** Projects belonging to a division, in portfolio order. */
export function projectsByDivision(division: DivisionSlug): PortfolioItem[] {
  return PORTFOLIO.filter((p) => p.division === division);
}

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

const SLUG_BY_NAME = new Map(PROJECTS.map((p) => [p.name, p.slug]));

/** Resolve a project card's name to its detail-page slug, if a page exists. */
export function projectSlug(name: string): string | undefined {
  return SLUG_BY_NAME.get(name);
}
