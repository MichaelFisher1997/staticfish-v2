import { useEffect, useRef, useState } from "react";

interface ScrambleProps {
  text: string;
  className?: string;
}

const GLYPHS = "!<>-_\\/[]{}=+*^?#••×";

/** Melon "Scramble Text" — glyphs cycle and resolve on hover. */
export default function Scramble({ text, className = "" }: ScrambleProps) {
  const [display, setDisplay] = useState(text);
  const frame = useRef(0);
  const timer = useRef<number | null>(null);

  function stop() {
    if (timer.current !== null) {
      window.clearInterval(timer.current);
      timer.current = null;
    }
  }

  function start() {
    stop();
    frame.current = 0;
    timer.current = window.setInterval(() => {
      frame.current += 1;
      const progress = frame.current / 2;
      const resolved = text
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < progress) return char;
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join("");
      setDisplay(resolved);
      if (progress >= text.length) {
        stop();
        setDisplay(text);
      }
    }, 28);
  }

  useEffect(() => stop, []);

  return (
    <span
      className={className}
      onMouseEnter={start}
      onMouseLeave={() => {
        stop();
        setDisplay(text);
      }}
      title={text}
    >
      {display}
    </span>
  );
}
