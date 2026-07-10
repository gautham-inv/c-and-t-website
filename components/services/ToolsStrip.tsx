// Software/tools stack — a flat reference list, not tied to any one service,
// so it's its own strip rather than crammed into a service card.
const TOOLS = [
  "Autodesk Revit (AEC Collection)",
  "Autodesk Construction Cloud (ACC)",
  "Autodesk AutoCAD",
  "ZWCAD",
  "Autodesk Navisworks Manage",
  "AVEVA E3D",
  "HAP",
  "Dialux",
  "HydraCALC / Elite Fire / PipeNet",
  "Bluebeam Revu",
  "Autodesk ReCap Pro",
  "Microsoft Office 365",
  "Microsoft Project / Primavera P6",
  "Dynamo for Revit",
  "Python",
  "ETAP",
];

export function ToolsStrip() {
  return (
    <section className="border-t border-line bg-mist">
      <div className="mx-auto max-w-[1600px] px-6 py-14 md:px-10 md:py-20">
        <h2 className="font-display text-2xl font-semibold leading-snug tracking-[-0.01em] md:text-3xl">
          Software &amp; tools we <span className="text-green-dark">design in</span>
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-dim md:text-base">
          The platforms behind the models, drawings and analysis, from design
          through to site.
        </p>

        <ul className="mt-8 flex flex-wrap gap-3">
          {TOOLS.map((tool) => (
            <li
              key={tool}
              className="rounded-full border border-line bg-surface px-4 py-2 font-mono text-[0.72rem] uppercase tracking-[0.1em] text-ink/80"
            >
              {tool}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
