interface BrandMarkProps {
  className?: string;
  markClassName?: string;
  textClassName?: string;
  showText?: boolean;
}

export function BrandMark({ className = "", markClassName = "", showText = false, textClassName = "" }: BrandMarkProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span
        className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent ${markClassName}`}
        aria-hidden="true"
      >
        <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 17C8.5 10.5 15.5 8.5 25 12.5L29 9.5V21.5L25 18.5C15.5 22.5 8.5 20.5 5 17Z" stroke="#e8e9fd" strokeWidth="1.9" strokeLinejoin="round" />
          <path d="M9 17C11.8 15.2 15.1 15.2 19 17C21.2 18 23.2 18.4 25 18.2" stroke="#e8e9fd" strokeWidth="1.9" strokeLinecap="round" opacity="0.7" />
          <circle cx="22.5" cy="13.5" r="1.3" fill="#e8e9fd" />
        </svg>
        <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-bone/25" aria-hidden="true" />
      </span>
      {showText && (
        <span className={`brand-word font-display text-2xl font-semibold tracking-tight text-foreground ${textClassName}`}>static<span className="text-ember">fish</span></span>
      )}
    </span>
  );
}

export function BrandLockup({ className = "", markClassName = "", textClassName = "" }: Omit<BrandMarkProps, "showText">) {
  return <BrandMark className={className} markClassName={markClassName} textClassName={textClassName} showText />;
}
