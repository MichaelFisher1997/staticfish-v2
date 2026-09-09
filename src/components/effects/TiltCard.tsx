import { useRef, type ReactNode, type MouseEvent } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  max?: number;
}

/** Subtle 3D tilt on hover for premium-feeling cards. Disabled on touch. */
export default function TiltCard({ children, className = "", max = 7 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || e.pointerType === "touch") return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `rotateY(${px * max * 2}deg) rotateX(${-py * max * 2}deg) translateY(-4px)`;
  }

  function onLeave() {
    const el = ref.current;
    if (el) el.style.transform = "";
  }

  return (
    <div className={`tilt-scene ${className}`}>
      <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="tilt-card h-full">
        {children}
      </div>
    </div>
  );
}
