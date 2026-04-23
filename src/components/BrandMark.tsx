interface BrandMarkProps {
  className?: string;
  markClassName?: string;
  textClassName?: string;
  showText?: boolean;
}

export function BrandMark({ className = "", markClassName = "", showText = false, textClassName = "" }: BrandMarkProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <span className={`relative flex h-8 w-8 shrink-0 items-center justify-center border border-foreground bg-background ${markClassName}`} aria-hidden="true">
        <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 17C8.5 10.5 15.5 8.5 25 12.5L29 9.5V21.5L25 18.5C15.5 22.5 8.5 20.5 5 17Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
          <path d="M9 17C11.8 15.2 15.1 15.2 19 17C21.2 18 23.2 18.4 25 18.2" stroke="hsl(var(--accent))" strokeWidth="1.7" strokeLinecap="round" />
          <circle cx="22.5" cy="13.5" r="1.2" fill="hsl(var(--accent))" />
        </svg>
        <span className="absolute -bottom-1 -right-1 h-2 w-2 bg-accent" aria-hidden="true" />
      </span>
      {showText && (
        <span className={`font-display text-xl font-bold tracking-tight text-foreground ${textClassName}`}>staticfish</span>
      )}
    </span>
  );
}

export function BrandLockup({ className = "", markClassName = "", textClassName = "" }: Omit<BrandMarkProps, "showText">) {
  return <BrandMark className={className} markClassName={markClassName} textClassName={textClassName} showText />;
}
