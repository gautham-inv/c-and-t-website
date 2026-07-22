import type { ProjectBlock } from "@/lib/projects";

/** Shared renderer for the simple heading/paragraph/list block shape used by
 * both project descriptions and insight article bodies. */
export function RichBlocks({ blocks }: { blocks: ProjectBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        if (block.type === "heading") {
          return (
            <h3
              key={i}
              className="pt-3 font-display text-lg font-semibold leading-snug md:text-xl"
            >
              {block.text}
            </h3>
          );
        }
        if (block.type === "list") {
          return (
            <ul
              key={i}
              className="list-disc space-y-2 pl-5 text-base leading-relaxed text-ink-dim md:text-lg"
            >
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="text-base leading-relaxed text-ink-dim md:text-lg">
            {block.text}
          </p>
        );
      })}
    </>
  );
}
