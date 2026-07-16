import { groq } from "next-sanity";

/**
 * GROQ queries — shaped to match the existing lib/*.ts types as closely as
 * possible, so the rendering components need minimal changes. Image fields are
 * returned as raw asset refs; resolve them with urlFor() at render time.
 */

// ── Services ── (small collection — fetch all, resolve by slug in JS)
export const allServicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    "slug": slug.current,
    name,
    "image": coalesce(image.asset->url, image),
    blurb,
    featured,
    "byDivision": byDivision[]{
      "division": division->slug.current,
      subDisciplines,
      body
    }
  }
`;

// ── Divisions ── (small collection — fetch all, resolve by slug in JS)
export const allDivisionsQuery = groq`
  *[_type == "division"]{
    "slug": slug.current,
    name,
    shortName,
    tagline,
    "image": coalesce(image.asset->url, image),
    overview,
    stats,
    "serviceSlugs": services[]->slug.current,
    hasIndustries,
    "faqs": faqs[]{ "q": question, "a": answer }
  }
`;

// ── Projects ──
export const portfolioQuery = groq`
  *[_type == "project"] | order(_createdAt asc){
    name,
    meta,
    "image": coalesce(image.asset->url, image),
    "division": division->slug.current,
    "slug": slug.current,
    "hasDetailPage": enableDetailPage == true,
    industries
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug && enableDetailPage == true][0]{
    "slug": slug.current,
    name,
    tagline,
    "heroImage": coalesce(heroImage.asset->url, heroImage),
    description,
    info,
    "personnel": personnel[]{ name, role, "photo": coalesce(photo.asset->url, photo) },
    "gallery": gallery[]{ span, alt, "image": coalesce(image.asset->url, image) },
    "testimonials": testimonials[]{ quote, name, role, "photo": coalesce(photo.asset->url, photo) }
  }
`;

export const allProjectSlugsQuery = groq`
  *[_type == "project" && enableDetailPage == true]{ "slug": slug.current }
`;

// ── Insights ──
export const insightsQuery = groq`
  *[_type == "insight"] | order(date desc){
    title,
    "slug": slug.current,
    tag,
    "read": readTime,
    date,
    "image": coalesce(image.asset->url, image),
    excerpt
  }
`;

// ── Singletons ──
export const homePageQuery = groq`
  *[_type == "homePage"][0]{
    heroHeadline,
    heroSubhead,
    stats,
    caseStudies,
    testimonials,
    "featuredProjects": featuredProjects[]->{ name, meta, image, "slug": slug.current },
    "featuredInsights": featuredInsights[]->{ title, tag, "read": readTime, image, excerpt }
  }
`;

export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0]{
    vision,
    mission,
    values,
    companyMilestones,
    projectAwards,
    locations,
    capabilities,
    "leadership": leadership[]{
      name,
      role,
      "photo": coalesce(photo.asset->url, photo),
      bio
    }
  }
`;

export const servicesPageQuery = groq`
  *[_type == "servicesPage"][0]{
    title,
    blurb,
    "tools": tools[]{
      name,
      "logo": coalesce(logo.asset->url, logo),
      "href": url
    }
  }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    navItems,
    footerLinks,
    offices,
    "socials": socials[]{ label, href },
    copyright
  }
`;

// ── Careers ──
export const careersPageQuery = groq`
  *[_type == "careersPage"][0]{
    intro,
    "heroImage": coalesce(heroImage.asset->url, heroImage),
    reasons,
    whyTitle,
    whyBody,
    "teamPhotos": teamPhotos[].asset->url
  }
`;

export const jobOpeningsQuery = groq`
  *[_type == "jobOpening"] | order(_createdAt desc){
    "slug": slug.current,
    title,
    team,
    location,
    type,
    experience,
    summary
  }
`;

export const jobOpeningBySlugQuery = groq`
  *[_type == "jobOpening" && slug.current == $slug][0]{
    "slug": slug.current,
    title,
    team,
    location,
    type,
    experience,
    summary,
    about,
    responsibilities,
    requirements,
    niceToHave
  }
`;

export const allJobOpeningSlugsQuery = groq`*[_type == "jobOpening"]{ "slug": slug.current }`;
