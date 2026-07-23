import { TOOLS, type Tool } from "@/lib/tools";

// Software/tools stack — a flat reference list, not tied to any one service, so
// it's its own strip rather than crammed into a service card. Data comes from
// Sanity (servicesPage → tools) via props; the imported TOOLS is the fallback.
export function ToolsStrip({ tools = TOOLS }: { tools?: Tool[] }) {
  return (
    <section className="border-t border-line bg-mist">
      <div className="mx-auto max-w-[1600px] px-6 py-20 md:px-10 md:py-28">
        <h2 className="font-display text-[clamp(1.9rem,1rem+3vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.02em]">
          Software &amp; tools we <span className="text-green-dark">design in</span>
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-dim md:text-base">
          The platforms behind the models, drawings and analysis, from design
          through to site.
        </p>

        <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6">
          {tools.map((tool) => (
            <li key={tool.name}>
              <a
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 text-center"
              >
                <span className="flex h-24 w-full items-center justify-center">
                  <img
                    src={tool.logo}
                    alt={tool.name}
                    loading="lazy"
                    className="max-h-full max-w-[80%] object-contain"
                  />
                </span>
                <span className="font-mono text-[0.62rem] uppercase leading-tight tracking-[0.08em] text-ink/70 transition-colors group-hover:text-green-dark">
                  {tool.name}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
