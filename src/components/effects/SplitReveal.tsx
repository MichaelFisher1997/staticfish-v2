import { motion } from "motion/react";

interface SplitRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

/** Char-by-char blur-in headline reveal, Melon "Char Reveal" style. */
export default function SplitReveal({ text, className = "", delay = 0, stagger = 0.022 }: SplitRevealProps) {
  const chars = text.split("");

  return (
    <span className={className} aria-label={text}>
      <motion.span
        aria-hidden="true"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-8% 0px" }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: stagger, delayChildren: delay } },
        }}
        style={{ display: "inline-block" }}
      >
        {chars.map((char, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: { opacity: 0, y: 28, rotate: 8, filter: "blur(8px)" },
              show: {
                opacity: 1,
                y: 0,
                rotate: 0,
                filter: "blur(0px)",
                transition: { type: "spring", stiffness: 280, damping: 26 },
              },
            }}
            style={{ display: "inline-block", willChange: "transform, opacity, filter" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.span>
    </span>
  );
}
