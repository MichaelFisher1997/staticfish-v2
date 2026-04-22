export function SeigaihaBackground({ 
  className = "",
  opacity = 0.12,
  color = "accent"
}: { 
  className?: string;
  opacity?: number;
  color?: "accent" | "foreground";
}) {
  const strokeColor = color === "accent" ? "hsl(var(--accent))" : "hsl(var(--foreground))";

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ opacity }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="seigaiha-pattern"
            x="0"
            y="0"
            width="48"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              stroke={strokeColor}
              strokeWidth="0.8"
              opacity="0.4"
            />
            <circle
              cx="24"
              cy="24"
              r="16"
              fill="none"
              stroke={strokeColor}
              strokeWidth="0.6"
              opacity="0.3"
            />
            <circle
              cx="24"
              cy="24"
              r="10"
              fill="none"
              stroke={strokeColor}
              strokeWidth="0.5"
              opacity="0.25"
            />
            <circle
              cx="24"
              cy="24"
              r="4"
              fill="none"
              stroke={strokeColor}
              strokeWidth="0.4"
              opacity="0.2"
            />
            <circle
              cx="0"
              cy="0"
              r="22"
              fill="none"
              stroke={strokeColor}
              strokeWidth="0.8"
              opacity="0.4"
            />
            <circle
              cx="0"
              cy="0"
              r="16"
              fill="none"
              stroke={strokeColor}
              strokeWidth="0.6"
              opacity="0.3"
            />
            <circle
              cx="0"
              cy="0"
              r="10"
              fill="none"
              stroke={strokeColor}
              strokeWidth="0.5"
              opacity="0.25"
            />
            <circle
              cx="48"
              cy="0"
              r="22"
              fill="none"
              stroke={strokeColor}
              strokeWidth="0.8"
              opacity="0.4"
            />
            <circle
              cx="48"
              cy="0"
              r="16"
              fill="none"
              stroke={strokeColor}
              strokeWidth="0.6"
              opacity="0.3"
            />
            <circle
              cx="48"
              cy="0"
              r="10"
              fill="none"
              stroke={strokeColor}
              strokeWidth="0.5"
              opacity="0.25"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#seigaiha-pattern)" />
      </svg>
    </div>
  );
}

export function WaveBands({ 
  className = "",
  variant = "teal"
}: { 
  className?: string;
  variant?: "teal" | "coral" | "purple";
}) {
  const palettes = {
    teal: ["#2D6B6B", "#3D8B8B", "#4DA9A9", "#5EC7C7", "#6EE5E5"],
    coral: ["#B85450", "#D46860", "#E07870", "#C85E58", "#A84848"],
    purple: ["#6B4C6B", "#8B5E8B", "#A570A5", "#7A5E8A", "#5A4A6A"]
  };

  const colors = palettes[variant];

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 800"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {colors.map((color, i) => (
          <g key={i} opacity={0.7 - i * 0.12}>
            {/* Main wave band - much thicker */}
            <path
              d={generateWaveBand(i, colors.length)}
              fill={color}
              opacity={0.12}
            />
            {/* Parallel lines inside the band */}
            {Array.from({ length: 8 }).map((_, j) => (
              <path
                key={j}
                d={generateWaveLine(i, j, colors.length)}
                fill="none"
                stroke={color}
                strokeWidth="1.5"
                opacity={0.4 - j * 0.04}
              />
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
}

function generateWaveBand(index: number, total: number): string {
  const baseY = 150 + index * 80;
  const amplitude = 60 + index * 15;
  const bandHeight = 70;
  
  let topPath = `M0,${baseY}`;
  let bottomPath = ``;
  
  for (let x = 0; x <= 1440; x += 20) {
    const y = baseY + Math.sin(x * 0.003 + index * 1.5) * amplitude
      + Math.sin(x * 0.007 + index * 0.8) * (amplitude * 0.5);
    topPath += ` L${x},${y}`;
  }
  
  for (let x = 1440; x >= 0; x -= 20) {
    const y = baseY + bandHeight + Math.sin(x * 0.003 + index * 1.5) * amplitude
      + Math.sin(x * 0.007 + index * 0.8) * (amplitude * 0.5);
    bottomPath += ` L${x},${y}`;
  }
  
  return `${topPath} ${bottomPath} L0,${baseY} Z`;
}

function generateWaveLine(bandIndex: number, lineIndex: number, total: number): string {
  const baseY = 150 + bandIndex * 80 + lineIndex * 8;
  const amplitude = 60 + bandIndex * 15;
  
  let path = `M0,${baseY}`;
  
  for (let x = 0; x <= 1440; x += 15) {
    const y = baseY + Math.sin(x * 0.003 + bandIndex * 1.5) * amplitude
      + Math.sin(x * 0.007 + bandIndex * 0.8) * (amplitude * 0.5);
    path += ` L${x},${y}`;
  }
  
  return path;
}

// Backward compatibility exports
export const FlowingLines = WaveBands;
export const WaveBackground = WaveBands;
export const CornerWaves = JapaneseWaveCorner;
export const SeigaihaPattern = SeigaihaBackground;

export function JapaneseWaveCorner({ 
  position = "bottom-right",
  className = "" 
}: { 
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
}) {
  const rotations = {
    "top-left": "rotate(180deg)",
    "top-right": "rotate(-90deg)",
    "bottom-left": "rotate(90deg)",
    "bottom-right": "rotate(0deg)"
  };

  return (
    <div 
      className={`absolute pointer-events-none ${className}`}
      style={{
        width: '400px',
        height: '400px',
        ...(position.includes('top') ? { top: '-50px' } : { bottom: '-50px' }),
        ...(position.includes('left') ? { left: '-50px' } : { right: '-50px' }),
        transform: rotations[position],
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.15">
          {/* Wave band 1 */}
          <path
            d="M0,400 Q100,300 200,350 T400,300 L400,400 Z"
            fill="hsl(var(--accent))"
          />
          <path
            d="M0,400 Q100,300 200,350 T400,300"
            fill="none"
            stroke="hsl(var(--accent))"
            strokeWidth="2"
          />
          
          {/* Wave band 2 */}
          <path
            d="M0,400 Q80,340 180,380 T400,340 L400,400 Z"
            fill="hsl(var(--accent))"
            opacity="0.5"
          />
          
          {/* Wave band 3 */}
          <path
            d="M0,400 Q60,360 160,390 T400,360 L400,400 Z"
            fill="hsl(var(--accent))"
            opacity="0.3"
          />
        </g>
      </svg>
    </div>
  );
}