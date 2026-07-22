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
          className="font-display text-[clamp(2.5rem,1rem+5vw,5.5rem)] font-semibold leading-[1.03] tracking-[-0.02em] text-paper"
          style={{ textShadow: "0 2px 50px rgba(9,33,44,0.55)" }}
        >
          <span className="block">Precision Engineered.</span>
          <span className="block text-beige-light">Globally Delivered.</span>
        </h1>
      </div>
    </section>
  );
}
