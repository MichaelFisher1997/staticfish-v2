export function GeometricArt({ 
  className = "",
  variant = "circles"
}: { 
  className?: string;
  variant?: "circles" | "lines" | "mixed" | "dots";
}) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      {variant === "circles" && <CircleComposition />}
      {variant === "lines" && <LineComposition />}
      {variant === "mixed" && <MixedComposition />}
      {variant === "dots" && <DotComposition />}
    </div>
  );
}

function CircleComposition() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.08" fill="none" stroke="hsl(var(--accent))">
        <circle cx="200" cy="150" r="120" strokeWidth="2" />
        <circle cx="200" cy="150" r="80" strokeWidth="1.5" />
        <circle cx="200" cy="150" r="40" strokeWidth="1" fill="hsl(var(--accent))" fillOpacity="0.03" />
        
        <circle cx="600" cy="400" r="180" strokeWidth="2" />
        <circle cx="600" cy="400" r="120" strokeWidth="1.5" />
        <circle cx="600" cy="400" r="60" strokeWidth="1" />
        
        <circle cx="400" cy="300" r="200" strokeWidth="1" strokeDasharray="10 5" opacity="0.5" />
      </g>
    </svg>
  );
}

function LineComposition() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.1" stroke="hsl(var(--foreground))">
        {/* Diagonal lines */}
        <line x1="0" y1="0" x2="800" y2="600" strokeWidth="1" />
        <line x1="100" y1="0" x2="800" y2="525" strokeWidth="0.5" />
        <line x1="0" y1="100" x2="700" y2="600" strokeWidth="0.5" />
        
        {/* Horizontal lines */}
        <line x1="0" y1="200" x2="800" y2="200" strokeWidth="0.5" />
        <line x1="0" y1="400" x2="800" y2="400" strokeWidth="0.5" />
        
        {/* Vertical lines */}
        <line x1="200" y1="0" x2="200" y2="600" strokeWidth="0.5" />
        <line x1="600" y1="0" x2="600" y2="600" strokeWidth="0.5" />
      </g>
      
      <g opacity="0.06">
        <rect x="100" y="100" width="200" height="200" fill="none" stroke="hsl(var(--accent))" strokeWidth="2" />
        <rect x="500" y="300" width="150" height="150" fill="none" stroke="hsl(var(--accent))" strokeWidth="2" transform="rotate(15 575 375)" />
      </g>
    </svg>
  );
}

function MixedComposition() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.07">
        {/* Large circle */}
        <circle cx="400" cy="300" r="250" fill="none" stroke="hsl(var(--accent))" strokeWidth="1.5" />
        
        {/* Arc segments */}
        <path d="M 200 300 A 200 200 0 0 1 600 300" fill="none" stroke="hsl(var(--accent))" strokeWidth="2" />
        <path d="M 250 300 A 150 150 0 0 0 550 300" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1" />
        
        {/* Triangles */}
        <polygon points="400,50 350,150 450,150" fill="none" stroke="hsl(var(--accent))" strokeWidth="1.5" />
        <polygon points="400,550 350,450 450,450" fill="none" stroke="hsl(var(--accent))" strokeWidth="1.5" />
        
        {/* Squares */}
        <rect x="50" y="250" width="80" height="80" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1" transform="rotate(45 90 290)" />
        <rect x="670" y="250" width="80" height="80" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1" transform="rotate(45 710 290)" />
        
        {/* Connecting lines */}
        <line x1="130" y1="290" x2="350" y2="290" stroke="hsl(var(--foreground))" strokeWidth="0.5" strokeDasharray="5 5" />
        <line x1="450" y1="290" x2="670" y2="290" stroke="hsl(var(--foreground))" strokeWidth="0.5" strokeDasharray="5 5" />
      </g>
    </svg>
  );
}

function DotComposition() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="hsl(var(--foreground))" opacity="0.06">
        {Array.from({ length: 50 }).map((_, i) => {
          const x = 100 + (i % 10) * 70 + Math.random() * 20;
          const y = 100 + Math.floor(i / 10) * 80 + Math.random() * 20;
          const r = 2 + Math.random() * 4;
          return <circle key={i} cx={x} cy={y} r={r} opacity={0.3 + Math.random() * 0.7} />;
        })}
      </g>
      
      <g fill="hsl(var(--accent))" opacity="0.08">
        {Array.from({ length: 20 }).map((_, i) => {
          const x = 50 + Math.random() * 700;
          const y = 50 + Math.random() * 500;
          const r = 3 + Math.random() * 5;
          return <circle key={i} cx={x} cy={y} r={r} opacity={0.4 + Math.random() * 0.6} />;
        })}
      </g>
    </svg>
  );
}

export function FloatingShapes({ 
  className = "" 
}: { 
  className?: string;
}) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      <div className="absolute top-[10%] right-[5%] w-32 h-32 border-2 border-accent/10 rotate-12" />
      <div className="absolute top-[20%] left-[8%] w-24 h-24 border border-foreground/5 rotate-45" />
      <div className="absolute bottom-[15%] right-[10%] w-40 h-40 border-2 border-accent/8 -rotate-6" />
      <div className="absolute bottom-[25%] left-[5%] w-20 h-20 border border-foreground/5 rotate-12" />
      <div className="absolute top-[50%] right-[15%] w-16 h-16 border-2 border-accent/10 rotate-30" />
    </div>
  );
}