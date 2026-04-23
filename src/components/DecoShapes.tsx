// Decorative geometric shapes for page backgrounds - BOLD VERSION
const shapes = [
  // Large accent shapes
  { type: 'rect', x: '82%', y: '5%', w: 180, h: 180, rotate: 12, opacity: 0.08, fill: true, accent: true },
  { type: 'rect', x: '-5%', y: '55%', w: 140, h: 140, rotate: -8, opacity: 0.06, fill: true },
  { type: 'circle', x: '70%', y: '60%', r: 100, opacity: 0.05, fill: true },
  { type: 'rect', x: '10%', y: '15%', w: 60, h: 60, rotate: 35, opacity: 0.1, fill: true, accent: true },
  
  // Medium shapes
  { type: 'rect', x: '60%', y: '30%', w: 80, h: 80, rotate: 20, opacity: 0.07, fill: true },
  { type: 'circle', x: '20%', y: '70%', r: 70, opacity: 0.06, fill: true, accent: true },
  { type: 'rect', x: '45%', y: '80%', w: 100, h: 40, rotate: -15, opacity: 0.08, fill: true },
  
  // Small accent shapes
  { type: 'rect', x: '35%', y: '20%', w: 30, h: 30, rotate: 45, opacity: 0.15, fill: true, accent: true },
  { type: 'circle', x: '90%', y: '40%', r: 40, opacity: 0.1, fill: true },
  { type: 'rect', x: '5%', y: '35%', w: 50, h: 50, rotate: 25, opacity: 0.06, fill: true },
  
  // Lines
  { type: 'line', x1: '75%', y1: '0%', x2: '95%', y2: '30%', opacity: 0.15, accent: true },
  { type: 'line', x1: '0%', y1: '80%', x2: '20%', y2: '95%', opacity: 0.1 },
];

export function DecoShapes({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      {shapes.map((shape, i) => {
        if (shape.type === 'circle') {
          return (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: shape.x,
                top: shape.y,
                width: shape.r ? shape.r * 2 : shape.w,
                height: shape.r ? shape.r * 2 : shape.h,
                backgroundColor: shape.accent ? 'hsl(var(--accent) / 0.12)' : 'hsl(var(--foreground) / 0.06)',
                opacity: shape.opacity * 2, // Double the visibility
                transform: shape.rotate ? `rotate(${shape.rotate}deg)` : undefined,
              }}
            />
          );
        }
        
        if (shape.type === 'line') {
          return (
            <svg
              key={i}
              className="absolute inset-0 w-full h-full"
              style={{ opacity: shape.opacity * 2 }}
            >
              <line
                x1={shape.x1}
                y1={shape.y1}
                x2={shape.x2}
                y2={shape.y2}
                stroke={shape.accent ? 'hsl(var(--accent) / 0.3)' : 'hsl(var(--foreground) / 0.2)'}
                strokeWidth="1"
              />
            </svg>
          );
        }
        
        return (
          <div
            key={i}
            className="absolute"
            style={{
              left: shape.x,
              top: shape.y,
              width: shape.w,
              height: shape.h,
              backgroundColor: shape.accent ? 'hsl(var(--accent) / 0.1)' : 'hsl(var(--foreground) / 0.05)',
              opacity: shape.opacity * 2, // Double the visibility
              transform: shape.rotate ? `rotate(${shape.rotate}deg)` : undefined,
            }}
          />
        );
      })}
    </div>
  );
}

export function DecoCorner({ 
  position = "top-left",
  size = 40,
  className = "" 
}: { 
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  size?: number;
  className?: string;
}) {
  const positions = {
    "top-left": { top: -2, left: -2, borderTop: true, borderLeft: true },
    "top-right": { top: -2, right: -2, borderTop: true, borderRight: true },
    "bottom-left": { bottom: -2, left: -2, borderBottom: true, borderLeft: true },
    "bottom-right": { bottom: -2, right: -2, borderBottom: true, borderRight: true },
  };

  const pos = positions[position];

  return (
    <div 
      className={`absolute pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        ...pos,
        borderTop: pos.borderTop ? '3px solid hsl(var(--accent) / 0.5)' : undefined,
        borderLeft: pos.borderLeft ? '3px solid hsl(var(--accent) / 0.5)' : undefined,
        borderRight: pos.borderRight ? '3px solid hsl(var(--accent) / 0.5)' : undefined,
        borderBottom: pos.borderBottom ? '3px solid hsl(var(--accent) / 0.5)' : undefined,
      }}
    />
  );
}

// Inline decorative elements that can be placed anywhere
export function DecoDot({ className = "" }: { className?: string }) {
  return (
    <div className={`w-2 h-2 bg-accent/40 ${className}`} aria-hidden="true" />
  );
}

export function DecoLine({ className = "" }: { className?: string }) {
  return (
    <div className={`h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent ${className}`} aria-hidden="true" />
  );
}