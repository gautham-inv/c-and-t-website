export function Hero() {
  return (
    <section id="top" className="relative h-screen overflow-hidden bg-navy">
      {/* Looping background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/final.webm"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
      />

      {/* Dark overlay for text legibility */}
      <div aria-hidden className="absolute inset-0 bg-navy/45" />

      {/* Headline */}
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
        <h1
          className="font-display text-[clamp(2.5rem,1rem+5vw,5.5rem)] font-semibold leading-[1.03] tracking-[-0.02em] text-transparent"
          style={{
            WebkitTextStroke: "clamp(1px, 0.15vw, 2px) var(--color-paper)",
            mixBlendMode: "exclusion",
          }}
        >
          <span className="block">Engineered to Endure</span>
        </h1>
      </div>
    </section>
  );
}
