// Abstract blob component for visual interest
export function AbstractBlob({ color = "primary", className = "" }: { color?: "primary" | "accent" | "muted"; className?: string }) {
  const colors = {
    primary: "from-primary/20 to-primary/5",
    accent: "from-accent/20 to-accent/5",
    muted: "from-muted-foreground/10 to-transparent",
  };

  return (
    <div
      className={`absolute rounded-full blur-3xl bg-gradient-to-br ${colors[color]} pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}

export function FloatingShape({ 
  variant = "circle",
  className = "",
  children 
}: { 
  variant?: "circle" | "square" | "blob"; 
  className?: string;
  children?: React.ReactNode;
}) {
  const shapes = {
    circle: "rounded-full",
    square: "rounded-2xl rotate-12",
    blob: "rounded-[40%_60%_70%_30%/40%_50%_60%_50%]",
  };

  return (
    <div className={`absolute ${shapes[variant]} backdrop-blur-sm border border-border/30 bg-gradient-to-br from-primary/5 to-accent/5 pointer-events-none ${className}`} aria-hidden="true">
      {children}
    </div>
  );
}

export function GridPattern({ className = "" }: { className?: string }) {
  return (
    <svg 
      className={`absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none ${className}`} 
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
}

export function DotPattern({ className = "" }: { className?: string }) {
  return (
    <svg 
      className={`absolute inset-0 w-full h-full opacity-[0.15] pointer-events-none ${className}`} 
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots)" />
    </svg>
  );
}
