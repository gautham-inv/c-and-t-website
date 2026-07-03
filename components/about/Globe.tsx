"use client";

import createGlobe from "cobe";
import { useEffect, useRef, useState } from "react";

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
  const hotspotRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const phiRef = useRef(0);
  const widthRef = useRef(0);
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const autoRotate = useRef(true);
  const [active, setActive] = useState<number | null>(null);
  const activeRef = useRef<number | null>(null);
  activeRef.current = active;

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
      const spinning =
        !reduce && autoRotate.current && activeRef.current === null && !isDragging.current;
      if (spinning) phiRef.current += 0.0035;

      globe.update({
        phi: phiRef.current,
        theta: THETA,
        width: widthRef.current * 2,
        height: widthRef.current * 2,
      });

      // Project each marker onto the 2D canvas so a DOM hotspot can track it.
      const size = widthRef.current;
      const R = size * GLOBE_RADIUS;
      const cx = size / 2;
      const cy = size / 2;
      const cp = Math.cos(phiRef.current);
      const sp = Math.sin(phiRef.current);
      const ct = Math.cos(THETA);
      const st = Math.sin(THETA);

      for (let i = 0; i < markers.length; i++) {
        const el = hotspotRefs.current[i];
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
        // unit sphere — scale before projecting or the hotspot drifts off the dot.
        const rx = x1 * MARKER_RADIUS;
        const ry = y2 * MARKER_RADIUS;
        const sx = cx + rx * R;
        const sy = cy - ry * R;
        // Matches cobe's own visibility test: behind the horizon, but still
        // shown near the silhouette edge so limb markers don't flicker.
        const front = z2 >= 0 || rx * rx + ry * ry >= 0.64;

        el.style.transform = `translate(-50%,-50%) translate(${sx}px, ${sy}px)`;
        el.style.opacity = front ? "1" : "0";
        el.style.pointerEvents = front ? "auto" : "none";

        // Keep the open tooltip pinned above its marker.
        if (activeRef.current === i && tooltipRef.current) {
          tooltipRef.current.style.transform = `translate(-50%,-100%) translate(${sx}px, ${sy - 18}px)`;
          tooltipRef.current.style.opacity = front ? "1" : "0";
        }
      }

      raf = requestAnimationFrame(frame);
    };
    frame();

    requestAnimationFrame(() => {
      canvas.style.opacity = "1";
    });

    const onPointerDown = (e: PointerEvent) => {
      isDragging.current = true;
      lastX.current = e.clientX;
      canvas.setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - lastX.current;
      lastX.current = e.clientX;
      phiRef.current -= dx * 0.006;
    };
    const onPointerUp = () => {
      isDragging.current = false;
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

  const activeMarker = active !== null ? markers[active] : null;

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

      {/* Interactive hotspots — invisible hit-areas that track COBE's own dots;
          a ring + tooltip reveal on hover/focus. */}
      <div className="pointer-events-none absolute inset-0">
        {markers.map((m, i) => {
          const on = active === i;
          return (
            <button
              key={m.name}
              ref={(el) => {
                hotspotRefs.current[i] = el;
              }}
              type="button"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive((a) => (a === i ? null : a))}
              onFocus={() => setActive(i)}
              onBlur={() => setActive((a) => (a === i ? null : a))}
              onClick={() => setActive((a) => (a === i ? null : i))}
              aria-label={`${m.name} — ${m.role ?? "office"}`}
              className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full"
              style={{ opacity: 0 }}
            >
              <span
                className={`rounded-full transition-all duration-300 ${
                  on
                    ? "h-4 w-4 bg-green ring-4 ring-green/30"
                    : "h-3.5 w-3.5 ring-2 ring-green/60"
                }`}
              />
            </button>
          );
        })}

        {/* Tooltip — positioned by the frame loop above the active marker. */}
        {activeMarker && (
          <div
            ref={tooltipRef}
            className="absolute left-0 top-0 z-30 w-max max-w-[15rem] rounded-2xl border border-line bg-paper/95 px-4 py-3 text-left shadow-[0_20px_50px_-24px_rgba(15,43,35,0.6)] backdrop-blur-sm"
            style={{ opacity: 0 }}
            role="status"
          >
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-green-dark">
              {activeMarker.role ?? "Office"}
            </p>
            <p className="mt-1 font-display text-base font-semibold leading-tight text-ink">
              {activeMarker.name}
            </p>
            {activeMarker.entities && activeMarker.entities.length > 0 && (
              <ul className="mt-2 space-y-1">
                {activeMarker.entities.map((e) => (
                  <li
                    key={e}
                    className="flex items-start gap-2 text-[0.8rem] leading-snug text-ink-dim"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-green" />
                    {e}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
