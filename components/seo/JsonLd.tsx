/**
 * Renders one or more JSON-LD structured-data objects as
 * <script type="application/ld+json"> tags. Server component — the markup is
 * baked into the static HTML at build time, so crawlers and answer engines
 * see it without executing any JavaScript.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
