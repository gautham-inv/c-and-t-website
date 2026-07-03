# C&T — Sanity CMS Schema Proposal

Maps every piece of editable content currently hardcoded in `lib/*.ts` and the
homepage section components onto Sanity document/object types. Goal: every word,
stat, image and link an editor would reasonably want to change becomes
Studio-editable, with **no structural drift** from how the site renders today.

## Design decisions

1. **References over duplication.** `service`, `division`, `sector`, `project`
   reference each other (mirrors the `slug` join keys in `lib/`). A service's
   per-division scope, a division's service list, a sector's parent division —
   all references, so renaming/reordering happens in one place.
2. **Images become Sanity assets.** Today's `/public/*.jpg` string paths become
   `image` fields (with hotspot + required `alt`). The frontend reads them via
   the image URL builder instead of a static path.
3. **Portable Text only where it earns it.** Project `description` (mixed
   paragraphs / headings / lists) → Portable Text. Insight article `body` →
   Portable Text. Everything else stays as typed strings/arrays so the rendering
   stays deterministic.
4. **Singletons for one-of-a-kind pages.** `homePage`, `aboutPage`,
   `siteSettings` are singletons (one document each, pinned in the Studio
   structure) — not creatable collections.
5. **One `project` type, optional detail.** `lib/projects.ts` has a rich
   `PROJECTS` (detail pages) and a flat `PORTFOLIO` (cards, superset). Model as a
   single `project` doc: cards use `name/meta/image/division`; the detail-page
   fields (`description`, `gallery`, …) are optional and a `hasDetailPage`
   boolean (or simply "detail fields present") drives whether `/projects/[slug]`
   is generated.

---

## Document types (collections)

### `service`
| Field | Type | Notes |
|---|---|---|
| `name` | string | required |
| `slug` | slug | source: name |
| `image` | image | hotspot, alt |
| `blurb` | text | one-line card/accordion summary |
| `byDivision` | array of `divisionScope` | per-division scope (see object) |
| `order` | number | manual ordering across the site |

### `division`
| Field | Type | Notes |
|---|---|---|
| `name` | string | full name (hero/meta) |
| `shortName` | string | nav/cards/breadcrumbs |
| `slug` | slug | `building` \| `oil-and-gas` |
| `tagline` | text | |
| `image` | image | |
| `overview` | array of text | paragraphs |
| `stats` | array of `stat` | |
| `services` | array of reference → `service` | ordered; "services offered here" |
| `sectors` | array of reference → `sector` | Building only; empty for O&G |
| `faqs` | array of `faq` | |

### `sector`
| Field | Type | Notes |
|---|---|---|
| `name` | string | |
| `slug` | slug | |
| `division` | reference → `division` | parent in the IA |
| `tagline` | text | |
| `image` | image | |
| `overview` | array of text | |
| `stats` | array of `stat` | |
| `approach` | array of `approach` | optional — section hides when empty |
| `services` | array of `sectorService` | sector-specific body+points + service ref |
| `expertise` | array of string | optional sub-discipline grid |
| `projects` | array of `sectorProject` | name/meta/image (or reference → project) |
| `insights` | array of reference → `insight` | optional |
| `faqs` | array of `faq` | |

### `project`
| Field | Type | Notes |
|---|---|---|
| `name` | string | also the card join-key |
| `slug` | slug | |
| `division` | reference → `division` | for division portfolio filtering |
| `meta` | string | card meta line ("BIM · LOD 400 · 2019") |
| `image` | image | optional — omit → branded placeholder card |
| **— detail-page fields (optional) —** | | present ⇒ `/projects/[slug]` built |
| `tagline` | string | hero sub-line |
| `heroImage` | image | |
| `description` | Portable Text | paragraphs / headings / lists |
| `info` | array of `infoRow` | Client / Type / Area / … |
| `personnel` | array of `personnel` | |
| `gallery` | array of `galleryItem` | bento tiles w/ span |
| `testimonials` | array of `testimonial` | optional band |

### `insight`
| Field | Type | Notes |
|---|---|---|
| `title` | string | |
| `slug` | slug | future-proofs `/insights/[slug]` |
| `tag` | string | "BIM", "CFD", … (or reference → `insightTag`) |
| `readTime` | string | "5 min read" |
| `date` | datetime | render as "May 2026" |
| `image` | image | |
| `excerpt` | text | |
| `body` | Portable Text | optional until article pages ship |

---

## Singletons

### `homePage`
- `heroHeadline`, `heroSubhead` (or keep the frame-sequence as static asset config)
- `stats` → array of `stat` (+ `suffix`, `icon`)
- `caseStudies` → array of `{ title, image, … }` (the "Difference" section)
- `testimonials` → array of `testimonial`
- featured selections: `featuredProjects` (refs → project), `featuredInsights` (refs → insight)

### `aboutPage`
- `vision` (text), `mission` (text)
- `values` → array of `value` `{ name, body }`
- `companyMilestones` → array of `milestone` `{ year, title, detail, place }`
- `projectAwards` → array of `award` `{ year, name, meta }`
- `locations` → array of `location` `{ name, role, lat, lng, entities[] }` (drives globe markers + rail)
- `capabilities` → array of `capability` `{ label, href }`

### `siteSettings`
- `navItems` → array of `{ label, href }`
- `footerTagline`, `offices` → array of `{ place, detail }`, `socials` → array of `{ label, href }`
- contact / enquiry config, ISO badge text, copyright line, logo asset

---

## Object types (reusable, inline — not documents)

| Object | Shape |
|---|---|
| `stat` | `{ value: string, label: string }` |
| `faq` | `{ question: string, answer: text }` |
| `divisionScope` | `{ division: ref→division, subDisciplines: string[], body: text }` |
| `sectorService` | `{ service: ref→service, body: text, points: string[] (3) }` |
| `sectorProject` | `{ name: string, meta: string, image }` *(or `ref→project`)* |
| `approach` | `{ title: string, body: text }` |
| `galleryItem` | `{ image, span: 'sm'\|'wide'\|'tall'\|'lg', alt: string }` |
| `personnel` | `{ name: string, role: string, photo?: image }` |
| `testimonial` | `{ quote: text, name: string, role: string, photo?: image }` |
| `infoRow` | `{ label: string, value: string \| string[] }` |
| `location` | `{ name, role, lat: number, lng: number, entities: string[] }` |
| `milestone` | `{ year, title, detail?, place? }` |
| `award` | `{ year, name, meta }` |
| `value` | `{ name, body }` |
| `capability` | `{ label, href? }` |
| `navItem` | `{ label, href }` |

---

## Integration shape (Next.js 16, `output: export`)

- `sanity`, `next-sanity`, `@sanity/image-url`, `@sanity/vision`.
- Studio mounted at `/app/studio/[[...tool]]/page.tsx` (embedded) — or a
  standalone Studio repo if you'd rather keep it separate.
- `sanity/schemaTypes/` holds the types above; `sanity/lib/client.ts`,
  `image.ts`, and typed GROQ queries in `sanity/lib/queries.ts`.
- **Static export caveat:** with `output: "export"` the site is built at deploy
  time, so content is fetched at build (SSG) and a webhook/redeploy publishes
  edits. If you want instant updates you'd drop `output: export` and use ISR.
- `lib/*.ts` becomes thin: types stay, the hardcoded arrays are replaced by GROQ
  fetches (same shape), so the components barely change.
