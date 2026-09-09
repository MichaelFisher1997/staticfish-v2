import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

/** Melon-style magnetic pull — element leans toward the cursor with springy snap-back. */
export default function Magnetic({ children, className = "", strength = 0.28 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 15, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 220, damping: 15, mass: 0.35 });

  function finePointer() {
    return window.matchMedia("(pointer: fine)").matches;
  }

  function onMove(e: MouseEvent<HTMLDivElement>) {
    if (!finePointer()) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
