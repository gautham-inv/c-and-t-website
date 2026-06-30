"use client";

import createGlobe, { type COBEOptions } from "cobe";
import { useEffect, useRef } from "react";

const MARKERS: COBEOptions["markers"] = [
  { location: [10.85, 76.27], size: 0.06 }, // India
  { location: [24.45, 54.38], size: 0.055 }, // UAE
  { location: [56.13, -106.35], size: 0.06 }, // Canada
];

export function Globe({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phiRef = useRef(0);
  const widthRef = useRef(0);
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const autoRotate = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onResize = () => { widthRef.current = canvas.offsetWidth; };
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvas, {
      devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      phi: 0,
      theta: 0.22,
      dark: 0,
      diffuse: 0.45,
      mapSamples: 16000,
      mapBrightness: 1.25,
      baseColor: [1, 1, 1],
      markerColor: [114 / 255, 157 / 255, 53 / 255],
      glowColor: [1, 1, 1],
      markers: MARKERS,
    });

    let raf = 0;
    const frame = () => {
      if (!reduce && autoRotate.current) phiRef.current += 0.0035;
      globe.update({
        phi: phiRef.current,
        width: widthRef.current * 2,
        height: widthRef.current * 2,
      });
      raf = requestAnimationFrame(frame);
    };
    frame();

    requestAnimationFrame(() => { canvas.style.opacity = "1"; });

    // Drag handlers — pointer events work for both mouse and touch
    const onPointerDown = (e: PointerEvent) => {
      isDragging.current = true;
      autoRotate.current = false;
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
      // Resume auto-rotation after a short pause
      setTimeout(() => { autoRotate.current = true; }, 800);
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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
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
      aria-label="Globe marking C&T offices in India, the UAE and Canada"
    />
  );
}
