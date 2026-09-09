import { useEffect } from "react";
import Lenis from "lenis";

/** Buttery smooth scrolling (Lenis) with anchor support. Skipped for reduced motion. */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      lerp: 0.1,
    });
    return () => lenis.destroy();
  }, []);

  return null;
}
