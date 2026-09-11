import { useEffect, useRef } from "react";

/**
 * Subtle animated contour-line background.
 * Adapted from ReactBits "Topography" (https://reactbits.dev/backgrounds/topography),
 * MIT + Commons Clause — free to use as part of a website.
 * Reimplemented with plain WebGL2 (no ogl dependency) and tuned way down.
 */

const VERTEX = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float uBands;
uniform float uThickness;
uniform float uScale;
uniform float uGlow;
uniform float uContrast;
uniform float uOpacity;
uniform float uElevScale;
uniform vec3 uLow;
uniform vec3 uMid;
uniform vec3 uHigh;
uniform vec2 uMouse;
uniform float uMouseStrength;
uniform vec4 uCtrlA;
uniform vec4 uCtrlB;
uniform vec4 uCtrlC;
uniform vec4 uCtrlD;
out vec4 fragColor;

float bez(float t, vec4 c) {
  float w = 6.2831853 * t;
  return 0.5 * (c.x * sin(w) + c.y * cos(w) + c.z * sin(2.0 * w) + c.w * cos(2.0 * w));
}

float field(vec2 uv) {
  vec2 a = vec2(bez(uv.x, uCtrlA), bez(uv.x, uCtrlB));
  vec2 b = vec2(bez(uv.y, uCtrlC), bez(uv.y, uCtrlD));
  return distance(a, b);
}

void main() {
  vec2 res = iResolution.xy;
  vec2 uv = gl_FragCoord.xy / res;
  vec2 suv = (uv - 0.5) / max(uScale, 0.001) + 0.5;

  float fv = field(suv);

  vec2 d = uv - uMouse;
  d.x *= res.x / max(res.y, 1.0);
  float r = 0.3;
  fv += exp(-dot(d, d) / (r * r)) * uMouseStrength;

  float f = fv * uBands;
  float frac = fract(f);
  float lineDist = min(frac, 1.0 - frac);

  float aa = fwidth(f) + 0.0001;
  float mask = 1.0 - smoothstep(uThickness - aa, uThickness + aa, lineDist);

  float glowR = uThickness + uGlow * 0.5 + aa;
  float glow = (1.0 - smoothstep(uThickness, glowR, lineDist)) * step(0.0001, uGlow);

  float elev = clamp(fv / max(uElevScale, 0.001), 0.0, 1.0);
  vec3 lineCol = mix(uLow, uMid, smoothstep(0.0, 0.5, elev));
  lineCol = mix(lineCol, uHigh, smoothstep(0.5, 1.0, elev));

  float coverage = clamp(mask + glow * 0.55, 0.0, 1.0);
  coverage = pow(coverage, max(uContrast, 0.001));

  float a = coverage * uOpacity;
  fragColor = vec4(lineCol * a, a);
}
`;

const CTRL_INDICES = [
  [1, -2, 3, -4],
  [9, -8, 7, -6],
  [5, 2, 5, -5],
  [-1, -3, 8, 9],
];

function compile(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("shader alloc failed");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader) ?? "compile failed");
  }
  return shader;
}

export default function TopographyBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    const gl = canvas.getContext("webgl2", {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
    });
    if (!gl) return;
    container.appendChild(canvas);

    let program: WebGLProgram;
    try {
      program = gl.createProgram() as WebGLProgram;
      gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX));
      gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(program) ?? "link failed");
      }
    } catch {
      container.removeChild(canvas);
      return;
    }

    const vertices = new Float32Array([-1, -1, 3, -1, -1, 3]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    const location = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0);
    gl.useProgram(program);

    const uniforms = {
      iResolution: gl.getUniformLocation(program, "iResolution"),
      uBands: gl.getUniformLocation(program, "uBands"),
      uThickness: gl.getUniformLocation(program, "uThickness"),
      uScale: gl.getUniformLocation(program, "uScale"),
      uGlow: gl.getUniformLocation(program, "uGlow"),
      uContrast: gl.getUniformLocation(program, "uContrast"),
      uOpacity: gl.getUniformLocation(program, "uOpacity"),
      uElevScale: gl.getUniformLocation(program, "uElevScale"),
      uLow: gl.getUniformLocation(program, "uLow"),
      uMid: gl.getUniformLocation(program, "uMid"),
      uHigh: gl.getUniformLocation(program, "uHigh"),
      uMouse: gl.getUniformLocation(program, "uMouse"),
      uMouseStrength: gl.getUniformLocation(program, "uMouseStrength"),
      uCtrlA: gl.getUniformLocation(program, "uCtrlA"),
      uCtrlB: gl.getUniformLocation(program, "uCtrlB"),
      uCtrlC: gl.getUniformLocation(program, "uCtrlC"),
      uCtrlD: gl.getUniformLocation(program, "uCtrlD"),
    };

    gl.uniform1f(uniforms.uBands, 1.8);
    gl.uniform1f(uniforms.uThickness, 0.006);
    gl.uniform1f(uniforms.uScale, 1.6);
    gl.uniform1f(uniforms.uElevScale, 7.5);
    gl.uniform1f(uniforms.uMouseStrength, 0.08);

    const applyTheme = (dark: boolean) => {
      if (dark) {
        gl.uniform1f(uniforms.uOpacity, 0.16);
        gl.uniform1f(uniforms.uGlow, 0.12);
        gl.uniform1f(uniforms.uContrast, 3.4);
        gl.uniform3f(uniforms.uLow, 0.102, 0.098, 0.325);
        gl.uniform3f(uniforms.uMid, 0.086, 0.18, 0.576);
      } else {
        gl.uniform1f(uniforms.uOpacity, 0.32);
        gl.uniform1f(uniforms.uGlow, 0.1);
        gl.uniform1f(uniforms.uContrast, 3.2);
        gl.uniform3f(uniforms.uLow, 0.784, 0.788, 0.957);
        gl.uniform3f(uniforms.uMid, 0.663, 0.671, 0.933);
      }
      gl.uniform3f(uniforms.uHigh, 0.184, 0.184, 0.894);
    };
    applyTheme(document.documentElement.classList.contains("dark"));

    const ctrlData = [
      new Float32Array(4),
      new Float32Array(4),
      new Float32Array(4),
      new Float32Array(4),
    ];
    const ctrlLocations = [
      uniforms.uCtrlA,
      uniforms.uCtrlB,
      uniforms.uCtrlC,
      uniforms.uCtrlD,
    ];

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const resize = () => {
      const width = Math.max(1, Math.floor(container.clientWidth));
      const height = Math.max(1, Math.floor(container.clientHeight));
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uniforms.iResolution, canvas.width, canvas.height);
      draw(12);
    };

    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const onPointerMove = (event: PointerEvent) => {
      mouse.tx = event.clientX / window.innerWidth;
      mouse.ty = 1 - event.clientY / window.innerHeight;
    };

    const draw = (time: number) => {
      const morphAmount = 3;
      const speed = 0.16;
      const morphSpeed = 0.05;
      for (let group = 0; group < 4; group += 1) {
        const data = ctrlData[group];
        const indices = CTRL_INDICES[group];
        for (let j = 0; j < 4; j += 1) {
          const i = indices[j];
          data[j] = morphAmount * Math.sin(time * speed * Math.sin(i * morphSpeed) + i);
        }
        gl.uniform4fv(ctrlLocations[group], data);
      }
      gl.uniform2f(uniforms.uMouse, mouse.x, mouse.y);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let pageVisible = !document.hidden;
    const start = performance.now();

    const loop = (now: number) => {
      const time = (now - start) * 0.001;
      mouse.x += 0.04 * (mouse.tx - mouse.x);
      mouse.y += 0.04 * (mouse.ty - mouse.y);
      draw(reduced ? 12 : time);
      if (!reduced) raf = requestAnimationFrame(loop);
    };

    const tryStart = () => {
      if (pageVisible && raf === 0) raf = requestAnimationFrame(loop);
    };
    const tryStop = () => {
      if (raf !== 0) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const onVisibility = () => {
      pageVisible = !document.hidden;
      if (pageVisible) tryStart();
      else tryStop();
    };

    const onThemeChange = (event: Event) => {
      applyTheme(Boolean((event as CustomEvent<{ dark?: boolean }>).detail?.dark));
      if (reduced) draw(12);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("themechange", onThemeChange);
    document.addEventListener("visibilitychange", onVisibility);
    if (!reduced) tryStart();

    return () => {
      tryStop();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("themechange", onThemeChange);
      document.removeEventListener("visibilitychange", onVisibility);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      if (canvas.parentElement === container) {
        container.removeChild(canvas);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
