import type Lenis from "lenis";

/**
 * Module-level handle to the single Lenis instance created in SmoothScroll.
 * Lets non-provider components (e.g. the nav overlay) stop/start scroll and
 * trigger programmatic scrolls without threading a context everywhere.
 */
let instance: Lenis | null = null;

export function setLenis(l: Lenis | null) {
  instance = l;
}

export function getLenis(): Lenis | null {
  return instance;
}
