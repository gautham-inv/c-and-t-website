import type { Project, ProjectBlock, Personnel, Testimonial } from "@/lib/projects";
import { ProjectGallery } from "@/components/projects/ProjectGallery";

export function ProjectView({ project }: { project: Project }) {
  return (
    <div className="bg-mist text-ink">
      {/* ── Hero — full viewport, project name over the background ── */}
      <section className="relative flex min-h-screen items-end overflow-hidden">
        <img
          src={project.heroImage}
          alt={project.name}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="relative mx-auto w-full max-w-[1600px] px-6 pb-16 pt-40 md:px-10 md:pb-24">
          <h1
            className="max-w-5xl font-display text-[clamp(2.5rem,1rem+6vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.025em] text-paper"
            style={{ textShadow: "0 2px 30px rgba(15,43,35,0.45)" }}
          >
            {project.name}
          </h1>
          {project.tagline && (
            <p
              className="mt-5 max-w-2xl text-lg leading-relaxed text-paper md:text-xl"
              style={{ textShadow: "0 1px 18px rgba(15,43,35,0.55)" }}
            >
              {project.tagline}
            </p>
          )}
        </div>
      </section>

      {/* ── Description + Information ── */}
      <section className="bg-mist">
        <div className="mx-auto grid max-w-[1600px] gap-12 px-6 py-16 md:grid-cols-[1.35fr_1fr] md:gap-20 md:px-10 md:py-24">
          {/* Description */}
          <div>
            <h2 className="font-display text-[clamp(1.5rem,1rem+1.4vw,2.25rem)] font-medium leading-tight tracking-[-0.01em]">
              Project Description
            </h2>
            <div className="mt-8 space-y-5">
              {project.description.map((block, i) => (
                <DescriptionBlock key={i} block={block} />
              ))}
            </div>
          </div>

          {/* Information */}
          <div>
            <h2 className="font-display text-[clamp(1.5rem,1rem+1.4vw,2.25rem)] font-medium leading-tight tracking-[-0.01em]">
              Project Information
            </h2>
            <dl className="mt-8 border-t border-line">
              {project.info.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[0.7fr_1.3fr] gap-6 border-b border-line py-5"
                >
                  <dt className="font-display text-base font-medium md:text-lg">
                    {row.label}
                  </dt>
                  <dd className="text-base leading-relaxed text-ink-dim">
                    {Array.isArray(row.value) ? (
                      <span className="flex flex-col">
                        {row.value.map((line, i) => (
                          <span key={i}>{line}</span>
                        ))}
                      </span>
                    ) : (
                      row.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ── Key Personnel ── */}
      {project.personnel.length > 0 && (
        <section className="bg-surface">
          <div className="mx-auto max-w-[1600px] px-6 py-16 md:px-10 md:py-24">
            <h2 className="font-display text-[clamp(1.5rem,1rem+1.4vw,2.25rem)] font-medium leading-tight tracking-[-0.01em]">
              Key Personnel
            </h2>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-10">
              {project.personnel.map((p) => (
                <PersonnelCard key={p.name} person={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Testimonials — optional band ── */}
      {project.testimonials && project.testimonials.length > 0 && (
        <section className="bg-stone text-ink">
          <div className="mx-auto max-w-[1600px] px-6 py-20 md:px-10 md:py-28">
            <div className="grid gap-12 md:grid-cols-2 md:gap-16">
              {project.testimonials.map((t) => (
                <TestimonialCard key={t.name} testimonial={t} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Project gallery — bento grid ── */}
      <ProjectGallery items={project.gallery} />
    </div>
  );
}

function DescriptionBlock({ block }: { block: ProjectBlock }) {
  if (block.type === "heading") {
    return (
      <h3 className="pt-3 font-display text-lg font-semibold leading-snug md:text-xl">
        {block.text}
      </h3>
    );
  }
  if (block.type === "list") {
    return (
      <ul className="list-disc space-y-2 pl-5 text-base leading-relaxed text-ink-dim md:text-lg">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
  return (
    <p className="text-base leading-relaxed text-ink-dim md:text-lg">
      {block.text}
    </p>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function PersonnelCard({ person }: { person: Personnel }) {
  return (
    <div className="w-[clamp(13rem,18vw,16rem)]">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-stone">
        {person.photo ? (
          <img
            src={person.photo}
            alt={person.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-green">
            <span className="font-display text-4xl font-semibold text-white">
              {initials(person.name)}
            </span>
          </div>
        )}
      </div>
      <p className="mt-4 font-display text-lg font-medium leading-snug">
        {person.name}
      </p>
      <p className="mt-1 text-sm text-ink-dim">{person.role}</p>
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure>
      <blockquote className="font-display text-xl font-medium leading-snug tracking-[-0.01em] md:text-2xl">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-4">
        {testimonial.photo ? (
          <img
            src={testimonial.photo}
            alt={testimonial.name}
            loading="lazy"
            className="h-12 w-12 rounded-full object-cover"
          />
        ) : (
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green/15 font-display text-sm font-semibold text-green-dark">
            {initials(testimonial.name)}
          </span>
        )}
        <span>
          <span className="block font-medium text-ink">{testimonial.name}</span>
          <span className="block font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-dim">
            {testimonial.role}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
