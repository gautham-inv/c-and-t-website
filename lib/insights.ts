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
  /** Human display date (e.g. "Jul 2026") shown in the UI. */
  date: string;
  /** ISO 8601 publish date (e.g. "2026-07-01") used for Article structured
   * data. Optional — omitted when unknown; the schema drops the field. */
  datePublished?: string;
  image: string;
  excerpt: string;
  href: string;
  /** Full article content — omitted for teaser-only entries without a
   * written-out piece yet; the detail page still renders on hero + excerpt. */
  body?: ProjectBlock[];
  /** Named author for E-E-A-T — a credentialed person, rendered as a visible
   * byline and emitted as Person structured data. Omitted → the piece is
   * attributed to the organisation instead. */
  author?: InsightAuthor;
  /** Credit line for republished/guest content, shown at the end of the article. */
  attribution?: string;
};

/** Article author — a real, credentialed person (drives visible byline + the
 * Person node in Article structured data). Keep `bio` factual; it doubles as
 * the E-E-A-T signal answer engines read. */
export type InsightAuthor = {
  name: string;
  role?: string;
  bio?: string;
  photo?: string;
};

export const INSIGHTS: Insight[] = [
  {
    id: "designing-for-maintainability",
    slug: "designing-for-maintainability",
    title:
      "Designing for maintainability: what a maintenance regime needs from the design team",
    tag: "Maintainability",
    read: "3 min read",
    date: "Jul 2026",
    datePublished: "2026-07-24",
    image: "/engineering.jpg",
    excerpt:
      "Most of what decides whether a building can actually be maintained is fixed on the drawings — access space, isolation, asset data and a commissioned baseline.",
    href: "/insights/designing-for-maintainability",
    body: [
      {
        type: "p",
        text: "Maintenance is usually discussed as an operations problem: a schedule to keep, a contract to award, a budget line to defend. But by the time a building is handed over, most of what determines whether its systems can be maintained at all has already been decided — in the layouts, the clearances, the valve schedule and the data that came with the model.",
      },
      {
        type: "p",
        text: "A plant room that cannot be worked in does not get worked in. That is the practical link between design and operating cost, and it is worth being deliberate about.",
      },
      {
        type: "heading",
        text: "Access is a design decision, not a site problem",
      },
      {
        type: "p",
        text: "Every serviceable component has a movement envelope that is larger than the component itself: a filter needs withdrawal space, a coil needs a pull length, a tube bundle needs room to come out, an actuator needs a hand on it. These envelopes rarely appear on a layout unless someone models them, and they are the first thing to be lost when a ceiling void or a riser gets tightened.",
      },
      {
        type: "list",
        items: [
          "Filter withdrawal and coil pull space modelled as reserved volumes, not assumed",
          "Access panels and ceiling hatches coordinated against the actual valve and damper positions",
          "Isolation valves, strainers and test points reachable without a ladder over a stairwell",
          "Safe standing and lifting positions for anything heavier than one person can hold",
          "Replacement routes out of the plant room — the item has to leave the building one day",
        ],
      },
      {
        type: "p",
        text: "A federated model is the cheapest place to find these conflicts. Resolving a clearance clash in coordination costs a modeller's afternoon; discovering it once the equipment is set costs a variation and, often, a permanent compromise the operator lives with for twenty years.",
      },
      { type: "heading", text: "The model is the asset register" },
      {
        type: "p",
        text: "Planned maintenance depends on knowing what you own, where it is and what it needs. That information already exists at design stage — it is just often trapped in a format nobody downstream can use. Carrying consistent tagging and structured asset data through the model into handover turns the BIM deliverable into something the facilities team can actually operate from, rather than a set of pretty geometry that stops being true the first time a component is swapped.",
      },
      {
        type: "p",
        text: "The test is simple: can the operator search for an asset, find its location, its service requirement and its replacement part without opening a drawing? If not, the maintenance regime will be rebuilt from scratch by whoever inherits it.",
      },
      { type: "heading", text: "Design out the failure modes you can" },
      {
        type: "p",
        text: "Some maintenance burden is unavoidable, and some is self-inflicted. Systems that cannot be isolated without shutting down a floor get maintained late, or not at all. Drainage that relies on a fall nobody protected blocks. Condensate trays without access do not get cleaned. Filters that are awkward to change are changed less often than the schedule says, whatever the schedule says.",
      },
      {
        type: "p",
        text: "For critical facilities the same logic drives redundancy. Concurrent maintainability — the ability to take equipment out of service without losing the load — is a design property, not an operational one. It has to be decided when the topology is set.",
      },
      {
        type: "heading",
        text: "Commissioning sets the baseline that makes drift visible",
      },
      {
        type: "p",
        text: "Performance degrades quietly. Fans do not announce that they are moving less air than they were; chillers do not report that their approach temperature has widened. Detecting that drift requires knowing what the system did when it was correct — recorded airflows, pressures, temperatures and absorbed power at handover.",
      },
      {
        type: "p",
        text: "Without that baseline, every subsequent reading is uninterpretable. With it, a maintenance regime can be evidence-led rather than calendar-led, and the case for intervention can be argued with numbers.",
      },
      { type: "heading", text: "Documentation carries the warranty" },
      {
        type: "p",
        text: "Manufacturers commonly make warranty cover conditional on documented servicing at defined intervals by competent people. That paperwork obligation lands on the operator, but it is set up — or undermined — at handover, by whether the O&M information identifies what needs servicing, how often, and to what standard. An asset nobody knew existed does not get its documented service.",
      },
      { type: "heading", text: "What this means for owners" },
      {
        type: "p",
        text: "If maintainability is treated as a design requirement — reviewed, coordinated and verified like any other — the resulting regime is cheaper to run and far more likely to be followed. If it is left to be sorted out later, the building will still be maintained, but on the terms the design imposed rather than the ones the owner wanted.",
      },
    ],
  },
  {
    id: "indoor-air-quality-commercial-buildings",
    slug: "indoor-air-quality-commercial-buildings",
    title:
      "Indoor air quality in commercial buildings: the design levers that matter",
    tag: "Indoor Air Quality",
    read: "3 min read",
    date: "Jul 2026",
    datePublished: "2026-07-17",
    image: "/services/cfd.jpg",
    excerpt:
      "Air quality is a whole-system outcome — outdoor air, distribution, humidity, pressure regime and verification all decide it, long before filtration does.",
    href: "/insights/indoor-air-quality-commercial-buildings",
    body: [
      {
        type: "p",
        text: "Indoor air quality tends to get discussed as a filtration question, because filters are the part of the system people can see and buy. In practice, filtration is one lever among several, and rarely the one that limits performance. Air quality in an occupied building is the outcome of how much outdoor air arrives, where it actually goes, how dry or damp it is, which way it moves between spaces, and whether anyone is measuring.",
      },
      { type: "heading", text: "Start with outdoor air, not filters" },
      {
        type: "p",
        text: "Ventilation is what dilutes what occupants generate — carbon dioxide, moisture, odours — and what the building and its contents emit. ASHRAE 62.1's ventilation rate procedure builds the requirement from two components, one scaled to the number of people and one to the floor area, because those two sources behave differently. A space can be comfortable, well filtered and still stale if the outdoor air component was sized for an occupancy that no longer matches how the space is used.",
      },
      {
        type: "p",
        text: "This is the most common IAQ finding on a change of use: an office subdivided into meeting rooms, a retail unit turned into a gym. The equipment is fine. The design occupancy is fiction.",
      },
      {
        type: "heading",
        text: "Distribution decides who actually gets the air",
      },
      {
        type: "p",
        text: "Delivering the correct total airflow to a space does not guarantee it reaches the people in it. Supply and return placed too close together short-circuit, so air leaves before it has done any work. Tall volumes stratify, leaving conditioned air at high level and occupants breathing something else. Deep plans and high partitions create pockets the design airflow never sweeps.",
      },
      {
        type: "p",
        text: "This is where airflow simulation earns its place. Modelling distribution in a terminal, an atrium or a large hall shows where air actually goes and where it stalls, at a stage when a diffuser layout can still be changed. The same models carry over into smoke and life-safety analysis, which is a related question asked under worse conditions.",
      },
      {
        type: "heading",
        text: "Humidity is a health parameter, not a comfort luxury",
      },
      {
        type: "p",
        text: "Air that is too dry irritates eyes and airways and makes a correctly heated space feel cold. Air that is too damp feels oppressive, slows evaporative cooling and — more seriously — supports microbial and mould growth on surfaces and within the system itself. Guidance broadly converges on keeping relative humidity within a middle band, commonly targeted around 40–60%, avoiding both extremes rather than chasing a single setpoint.",
      },
      {
        type: "p",
        text: "In hot and humid climates this is a latent load problem, and it drives real design decisions: coil selection and face velocity, whether dehumidification is decoupled from sensible cooling, and how part-load operation is handled. A system sized only on sensible load will hold temperature and lose the humidity argument, which is precisely how a cold, clammy building happens.",
      },
      {
        type: "heading",
        text: "Pressure regimes keep contaminants where they belong",
      },
      {
        type: "p",
        text: "Between spaces, air moves from higher to lower pressure regardless of intent. Design that leaves the differentials to chance moves kitchen odours into dining areas, car park fumes into lobbies and, in healthcare and laboratory settings, moves things that matter far more than odour.",
      },
      {
        type: "p",
        text: "Deliberate pressure cascades — which spaces are positive, which negative, and what happens when a door opens or a fan stops — are a design output that has to survive into operation. They depend on leakage paths and fan behaviour, so they are also among the first things to be lost to value engineering and late partition changes.",
      },
      {
        type: "heading",
        text: "Combustion and vehicle exhaust need monitoring, not assumptions",
      },
      {
        type: "p",
        text: "Carbon monoxide is the one contaminant in a commercial building that occupants cannot detect for themselves and that can incapacitate before it is suspected. Wherever there is combustion plant or vehicle movement — boiler rooms, generator rooms, enclosed car parks, loading docks — detection and ventilation interlocks belong in the design rather than in a later retrofit, along with the flue routing and combustion air provision that make the base case safe.",
      },
      { type: "heading", text: "Verify, then keep verifying" },
      {
        type: "p",
        text: "None of the above is self-proving. Commissioning should record the outdoor air rates, room pressures and distribution the design intended, because those numbers are the only reference against which later readings mean anything. Beyond handover, modest instrumentation — carbon dioxide as a ventilation proxy, humidity, differential pressure across filters — turns air quality from an annual complaint into a trend somebody can act on.",
      },
      {
        type: "p",
        text: "The buildings that hold their air quality are not the ones with the most aggressive filtration. They are the ones where ventilation, distribution, humidity and pressure were designed as one system, measured at handover and still being watched afterwards.",
      },
    ],
  },
  {
    id: "filtration-merv-pressure-drop-fan-energy",
    slug: "filtration-merv-pressure-drop-fan-energy",
    title:
      "Choosing filtration: what a higher filter class really costs in fan energy",
    tag: "HVAC Design",
    read: "4 min read",
    date: "Jul 2026",
    datePublished: "2026-07-10",
    image: "/services/value-engineering.jpg",
    excerpt:
      "Specifying a higher filter class looks like a cheap upgrade. The bill arrives as pressure drop — paid by the fan, every hour the system runs.",
    href: "/insights/filtration-merv-pressure-drop-fan-energy",
    body: [
      {
        type: "p",
        text: "Few specification changes look as harmless as moving a filter up a class. The filter costs a little more, the schedule barely changes, and the stated efficiency improves. The cost that does not appear on that comparison is pressure drop — and pressure drop is paid by the fan, continuously, for as long as the system runs.",
      },
      { type: "heading", text: "What the rating actually tells you" },
      {
        type: "p",
        text: "MERV, from ASHRAE 52.2, reports how well a filter captures particles across defined size ranges under test conditions. ISO 16890, the more recent international method, instead reports efficiency against the particulate fractions air quality standards are written in — PM1, PM2.5 and PM10 — which makes it far easier to connect a filter selection to an air quality objective.",
      },
      {
        type: "p",
        text: "Both describe the filter on a test rig. Neither describes your installation, and the gap between the two is usually where the performance goes.",
      },
      { type: "heading", text: "Pressure drop is a running cost" },
      {
        type: "p",
        text: "Fan power scales with the volume flow multiplied by the total pressure the fan has to develop, divided by its efficiency. Every extra pascal of filter resistance is therefore a permanent addition to absorbed power at that airflow — and air handling is one of the larger continuous electrical loads in an air-conditioned building, so a small addition applied for every operating hour of the year is not a rounding error.",
      },
      {
        type: "p",
        text: "It also gets worse with time by design. A filter's resistance rises as it loads with dust, which is the mechanism by which it works. That means the honest basis for sizing a fan is not the clean pressure drop printed on the datasheet but the resistance the filter will present near the end of its service life, and the honest basis for an energy comparison is the average across that interval.",
      },
      {
        type: "heading",
        text: "Restriction has failure modes, not just costs",
      },
      {
        type: "p",
        text: "Push resistance far enough and the consequences stop being financial. Reduced airflow across a direct-expansion evaporator drops the coil's surface temperature and can take it below freezing, so the coil ices and capacity collapses. In heating, low airflow lets discharge temperatures climb until a high-limit device trips the equipment out. On systems with fans that were never selected for the added resistance, the result is simply less air everywhere, which quietly undoes the ventilation design the filter was meant to protect.",
      },
      {
        type: "p",
        text: "The most common practical loss, though, is not the filter at all: it is the gap around it. Air follows the path of least resistance, so an unsealed frame, a warped filter or a badly gasketed housing lets a proportion of the flow bypass the medium entirely. A high-efficiency filter in a leaky housing can deliver less clean air than a modest one sealed properly — which is why the housing and the sealing detail deserve as much attention as the class on the schedule.",
      },
      { type: "heading", text: "Sizing your way out of the trade-off" },
      {
        type: "p",
        text: "Efficiency and resistance are not locked to each other; they are both consequences of how hard air is pushed through the medium. Increasing the filter area for a given airflow lowers the face velocity, and lowering the face velocity reduces the pressure drop at the same efficiency class. Deeper pleats, more panels, and V-cell arrangements are all ways of buying area.",
      },
      {
        type: "p",
        text: "That costs plan space in the air handling unit, which is exactly the space most likely to be squeezed on a tight plant room. It is a legitimate trade to make deliberately — and a poor one to discover after the unit is procured, when the only remaining option is to raise the resistance and hope the fan copes.",
      },
      { type: "heading", text: "Match the class to the risk" },
      {
        type: "p",
        text: "The right selection follows from what the space is for and what is in the outdoor air. A cleanroom, an operating theatre and an open-plan office in a dusty urban catchment are three different problems, and the highest class available is the right answer to at most one of them. Over-specifying is not a safe default: it raises energy cost for the life of the system, shortens service intervals, and introduces the restriction failure modes above.",
      },
      { type: "heading", text: "A short selection checklist" },
      {
        type: "list",
        items: [
          "State the air quality objective in the terms the standard uses (PM2.5, PM10) rather than a bare MERV number",
          "Size the fan on end-of-life resistance, not the clean datasheet figure",
          "Compare options on life-cycle cost — filter spend plus fan energy plus changeout labour — not unit price",
          "Set face velocity deliberately; buy area before you buy resistance",
          "Specify the housing and sealing detail, and check bypass on site",
          "Confirm the selection is compatible with coil, fan and control limits at dirty condition",
          "Fit differential-pressure monitoring so changeouts are triggered by evidence, not the calendar",
        ],
      },
      {
        type: "p",
        text: "Filtration is not a component choice made in isolation. It is a trade between air quality, energy and space, and the only way to make it well is to price all three before the class is fixed.",
      },
    ],
  },
  {
    id: "what-defines-a-successful-engineering-project",
    slug: "what-defines-a-successful-engineering-project",
    title: "What Defines a Successful Engineering Project?",
    tag: "Project Management",
    read: "3 min read",
    date: "Jul 2026",
    datePublished: "2026-07-01",
    image: "/services/pmc.png",
    excerpt:
      "A well-executed project isn't just one delivered on schedule — it balances time, cost, quality, safety and client expectations throughout its lifecycle.",
    href: "/insights/what-defines-a-successful-engineering-project",
    author: {
      name: "Sriram V. S.",
      role: "Technical Advisor, C&T Consulting Engineers",
      bio: "Mechanical Engineering graduate with 35+ years in MEP across India, the Middle East and SE Asia. Techno-commercial background with strong analytical and problem-solving skills; also mentors and trains engineers on technical topics.",
    },
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
        text: 'As the saying goes, "Fail to plan, plan to fail."',
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
];

/**
 * Newest first, by publish date.
 *
 * Ordering is derived rather than assumed, because two sources feed these and
 * only one of them is sorted: the Sanity query orders by date, but this local
 * array is hand-maintained and a new entry pasted in the wrong place would
 * silently become the homepage's lead article. Sorting at the point of use
 * means "the latest two" is true of whatever arrives.
 *
 * `datePublished` is the ISO field (Sanity sets it from the document date), so
 * it's what gets compared; the display `date` ("Jul 2026") is not reliably
 * parseable. Anything undated sorts last rather than first — an entry with no
 * date is not evidence that it's the newest.
 */
export function latestInsights(insights: Insight[], count?: number): Insight[] {
  const stamp = (i: Insight) => {
    const t = Date.parse(i.datePublished ?? "");
    return Number.isNaN(t) ? -Infinity : t;
  };
  // Copy first: this runs on props, and sort mutates in place.
  const sorted = insights.slice().sort((a, b) => stamp(b) - stamp(a));
  return count === undefined ? sorted : sorted.slice(0, count);
}
