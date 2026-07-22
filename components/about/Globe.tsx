"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";

/** Office marker — the shape lines up with lib/company.ts `Location`, so the
 * same data drives the globe now (LOCATIONS) and via Sanity later. */
export type GlobeMarker = {
  name: string;
  role?: string;
  lat: number;
  lng: number;
  entities?: string[];
};

const DEFAULT_MARKERS: GlobeMarker[] = [
  { name: "India", role: "Headquarters", lat: 10.85, lng: 76.27, entities: [] },
  { name: "United Arab Emirates", role: "Regional offices", lat: 24.45, lng: 54.38, entities: [] },
  { name: "Canada", role: "North America", lat: 56.13, lng: -106.35, entities: [] },
];

const DEG = Math.PI / 180;
const THETA = 0.22; // globe tilt — must match createGlobe's `theta`
const MARKER_ELEVATION = 0.05; // must match createGlobe's `markerElevation`
// COBE renders markers on a sphere of radius (0.8 + markerElevation), not the
// unit sphere, then maps that to the canvas at exactly half its CSS width —
// see cobe's internal `U`/`O`/`W` functions (dist/index.esm.js).
const MARKER_RADIUS = 0.8 + MARKER_ELEVATION;
const GLOBE_RADIUS = 0.5;

export function Globe({
  className = "",
  markers = DEFAULT_MARKERS,
}: {
  className?: string;
  markers?: GlobeMarker[];
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const phiRef = useRef(0);
  const widthRef = useRef(0);
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const autoRotate = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onResize = () => {
      widthRef.current = canvas.offsetWidth;
    };
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvas, {
      devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      phi: 0,
      theta: THETA,
      dark: 0,
      diffuse: 0.45,
      mapSamples: 16000,
      mapBrightness: 1.25,
      markerElevation: MARKER_ELEVATION,
      baseColor: [1, 1, 1],
      markerColor: [114 / 255, 157 / 255, 53 / 255],
      glowColor: [1, 1, 1],
      markers: markers.map((m) => ({ location: [m.lat, m.lng], size: 0.055 })),
    });

    let raf = 0;
    const frame = () => {
      const spinning = !reduce && autoRotate.current && !isDragging.current;
      if (spinning) phiRef.current += 0.0035;

      globe.update({
        phi: phiRef.current,
        theta: THETA,
        width: widthRef.current * 2,
        height: widthRef.current * 2,
      });

      // Project each marker onto the 2D canvas so the info card can track it.
      const size = widthRef.current;
      const R = size * GLOBE_RADIUS;
      const cx = size / 2;
      const cy = size / 2;
      const cp = Math.cos(phiRef.current);
      const sp = Math.sin(phiRef.current);
      const ct = Math.cos(THETA);
      const st = Math.sin(THETA);

      for (let i = 0; i < markers.length; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        const m = markers[i];
        const latR = m.lat * DEG;
        const lngR = m.lng * DEG;
        const cl = Math.cos(latR);
        // COBE's location→point mapping.
        const x = cl * Math.cos(lngR);
        const y = Math.sin(latR);
        const z = -cl * Math.sin(lngR);
        // rotateY(phi)
        const x1 = x * cp + z * sp;
        const z1 = -x * sp + z * cp;
        // rotateX(theta)
        const y2 = y * ct - z1 * st;
        const z2 = y * st + z1 * ct;
        // COBE renders the marker on a sphere of radius MARKER_RADIUS, not the
        // unit sphere — scale before projecting or the card drifts off the pin.
        const rx = x1 * MARKER_RADIUS;
        const ry = y2 * MARKER_RADIUS;
        const sx = cx + rx * R;
        const sy = cy - ry * R;
        // Matches cobe's own visibility test: behind the horizon, but still
        // shown near the silhouette edge so limb markers don't flicker.
        const front = z2 >= 0 || rx * rx + ry * ry >= 0.64;

        // Card sits just above its marker, like a pinned map label — the card
        // itself is the marker now, not a dot you have to hover to reveal it.
        el.style.transform = `translate(-50%,-100%) translate(${sx}px, ${sy - 10}px)`;
        el.style.opacity = front ? "1" : "0";
      }

      raf = requestAnimationFrame(frame);
    };
    frame();

    requestAnimationFrame(() => {
      canvas.style.opacity = "1";
    });

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      isDragging.current = true;
      lastX.current = e.clientX;
      canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor = "grabbing";
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - lastX.current;
      lastX.current = e.clientX;
      phiRef.current += dx * 0.006;
    };
    const onPointerUp = () => {
      isDragging.current = false;
      canvas.style.cursor = "grab";
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);

    return () => {
      cancelAnimationFrame(raf);
      globe.destroy();
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
    };
  }, [markers]);

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          aspectRatio: "1",
          contain: "layout paint size",
          opacity: 0,
          transition: "opacity 0.8s ease",
          cursor: "grab",
        }}
        role="img"
        aria-label="Interactive globe marking C&T offices in India, the UAE and Canada"
      />

      {/* Office cards — pinned directly to each marker's projected position,
          always visible (no hover/click needed to reveal them). */}
      <div className="pointer-events-none absolute inset-0">
        {markers.map((m, i) => (
          <div
            key={m.name}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            role="group"
            aria-label={`${m.name}, ${m.role ?? "office"}`}
            className="absolute left-0 top-0 w-max max-w-[10.5rem] rounded-2xl border border-line bg-paper/95 px-3.5 py-2.5 text-left shadow-[0_16px_40px_-20px_rgba(15,43,35,0.55)] backdrop-blur-sm transition-opacity duration-300"
          >
            <p className="flex items-center gap-1.5 font-mono text-[0.56rem] uppercase tracking-[0.16em] text-green-dark">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green" />
              {m.role ?? "Office"}
            </p>
            <p className="mt-1 font-display text-sm font-semibold leading-tight text-ink">
              {m.name}
            </p>
            {m.entities && m.entities.length > 0 && (
              <ul className="mt-1.5 space-y-1">
                {m.entities.map((e) => (
                  <li
                    key={e}
                    className="flex items-start gap-1.5 text-[0.68rem] leading-snug text-ink-dim"
                  >
                    <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-green" />
                    {e}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
