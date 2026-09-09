import { useRef, type ReactNode, type MouseEvent } from "react";

interface SpotlightProps {
  children: ReactNode;
  className?: string;
}

/** Cursor-tracking glow wrapper — sets --mx/--my for .spotlight-card. */
export default function Spotlight({ children, className = "" }: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <div ref={ref} onMouseMove={onMove} className={`spotlight-card ${className}`}>
      {children}
    </div>
  );
}
