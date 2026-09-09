// Melon "Burst Button" — melon seeds + sparks explode from the click point
// on primary CTAs. Vanilla canvas, zero framework cost, delegates globally.

const COLORS = ["#FF4D6D", "#FF8A3D", "#FFC53D", "#2FD27D", "#8B5CF6", "#06B6D4"];
const SEED = "#2b2135";

interface Bit {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  rot: number;
  vr: number;
  seed: boolean;
}

export function initSeedBurst() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!window.matchMedia("(pointer: fine)").matches) return;

  let canvas: HTMLCanvasElement | null = null;
  let ctx: CanvasRenderingContext2D | null = null;
  let bits: Bit[] = [];
  let raf = 0;
  let live = false;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  function ensure() {
    if (canvas) return;
    let layer = document.getElementById("seed-layer");
    if (!layer) {
      layer = document.createElement("div");
      layer.id = "seed-layer";
      document.body.appendChild(layer);
    }
    canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    layer.appendChild(canvas);
    ctx = canvas.getContext("2d");
    const fit = () => {
      canvas!.width = Math.floor(window.innerWidth * dpr);
      canvas!.height = Math.floor(window.innerHeight * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    fit();
    window.addEventListener("resize", fit);
  }

  function burst(x: number, y: number) {
    ensure();
    for (let i = 0; i < 18; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2.5 + Math.random() * 5.5;
      const isSeed = Math.random() < 0.4;
      bits.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2.5,
        life: 0,
        maxLife: 45 + Math.random() * 30,
        size: isSeed ? 3 + Math.random() * 2.5 : 2 + Math.random() * 3.5,
        color: isSeed ? SEED : COLORS[Math.floor(Math.random() * COLORS.length)],
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.3,
        seed: isSeed,
      });
    }
    if (!live) {
      live = true;
      raf = requestAnimationFrame(tick);
    }
  }

  function tick() {
    ctx!.clearRect(0, 0, window.innerWidth, window.innerHeight);
    bits = bits.filter((b) => b.life < b.maxLife);
    for (const b of bits) {
      b.life += 1;
      b.vy += 0.16;
      b.vx *= 0.985;
      b.vy *= 0.99;
      b.x += b.vx;
      b.y += b.vy;
      b.rot += b.vr;
      const fade = 1 - b.life / b.maxLife;
      ctx!.save();
      ctx!.translate(b.x, b.y);
      ctx!.rotate(b.rot);
      ctx!.globalAlpha = Math.max(fade, 0);
      ctx!.fillStyle = b.color;
      if (b.seed) {
        // melon seed: teardrop-ish ellipse
        ctx!.beginPath();
        ctx!.ellipse(0, 0, b.size * 0.62, b.size, 0, 0, Math.PI * 2);
        ctx!.fill();
      } else {
        ctx!.fillRect(-b.size / 2, -b.size / 2, b.size, b.size * 0.6);
      }
      ctx!.restore();
    }
    if (bits.length > 0) {
      raf = requestAnimationFrame(tick);
    } else {
      live = false;
      ctx!.clearRect(0, 0, window.innerWidth, window.innerHeight);
      cancelAnimationFrame(raf);
    }
  }

  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement | null;
    if (target && target.closest(".btn-primary-glow, [data-seeds]")) {
      burst(e.clientX, e.clientY);
    }
  });
}
