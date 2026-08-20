import { useEffect, useRef } from "react";

type AuthHeroPanelProps = {
  src?: string;
  alt?: string;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  depth: number;
};

const GOLD = { r: 175, g: 150, b: 97 };
const PARTICLE_COUNT = 48;
const LERP = 0.12;

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const isDesktopPanel = () => window.matchMedia("(min-width: 768px)").matches;

const createParticles = (width: number, height: number): Particle[] =>
  Array.from({ length: PARTICLE_COUNT }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.28,
    vy: (Math.random() - 0.5) * 0.22,
    size: 0.7 + Math.random() * 1.8,
    alpha: 0.22 + Math.random() * 0.45,
    depth: 0.45 + Math.random() * 0.9,
  }));

export const AuthHeroPanel = ({
  src = "/login.jpg",
  alt = "GISS STYLE",
}: AuthHeroPanelProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const ringsRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let disposed = false;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let time = 0;

    const pointer = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const resize = () => {
      const rect = root.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = createParticles(width, height);
    };

    const setPointerFromEvent = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    };

    const drawParticles = (mx: number, my: number) => {
      ctx.clearRect(0, 0, width, height);
      const magnetX = ((mx + 1) / 2) * width;
      const magnetY = ((my + 1) / 2) * height;

      for (const particle of particles) {
        const dx = magnetX - particle.x;
        const dy = magnetY - particle.y;
        const dist = Math.max(40, Math.hypot(dx, dy));
        const force = (140 * particle.depth) / (dist * dist);

        particle.vx += dx * force * 0.016;
        particle.vy += dy * force * 0.016;
        particle.vx *= 0.96;
        particle.vy *= 0.96;
        particle.x += particle.vx + mx * particle.depth * 0.35;
        particle.y += particle.vy + my * particle.depth * 0.22;

        if (particle.x < -12) particle.x = width + 12;
        if (particle.x > width + 12) particle.x = -12;
        if (particle.y < -12) particle.y = height + 12;
        if (particle.y > height + 12) particle.y = -12;

        const twinkle =
          0.65 + Math.sin(time * 2.2 + particle.x * 0.04) * 0.35;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${GOLD.r}, ${GOLD.g}, ${GOLD.b}, ${particle.alpha * twinkle})`;
        ctx.shadowColor = `rgba(${GOLD.r}, ${GOLD.g}, ${GOLD.b}, 0.85)`;
        ctx.shadowBlur = 8 * particle.depth;
        ctx.arc(particle.x, particle.y, particle.size * particle.depth, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    };

    const applyScene = (mx: number, my: number) => {
      const scene = sceneRef.current;
      const image = imageRef.current;
      const rings = ringsRef.current;
      const orbs = orbsRef.current;
      const light = lightRef.current;
      const wiggleX = Math.sin(time * 0.7) * 4;
      const wiggleY = Math.cos(time * 0.55) * 3;

      if (scene) {
        scene.style.transform = `perspective(1100px) rotateX(${(-my * 6).toFixed(3)}deg) rotateY(${(mx * 8).toFixed(3)}deg)`;
      }
      if (image) {
        image.style.transform = `translate3d(${(mx * -16 + wiggleX * 0.2).toFixed(2)}px, ${(my * -10 + wiggleY * 0.2).toFixed(2)}px, 0) scale(1.14)`;
      }
      if (rings) {
        rings.style.transform = `translate3d(${(mx * 22 + wiggleX).toFixed(2)}px, ${(my * 16 + wiggleY).toFixed(2)}px, 0)`;
      }
      if (orbs) {
        orbs.style.transform = `translate3d(${(mx * 32).toFixed(2)}px, ${(my * 22).toFixed(2)}px, 0)`;
      }
      if (light) {
        const px = ((mx + 1) / 2) * 100;
        const py = ((my + 1) / 2) * 100;
        light.style.background = `
          radial-gradient(circle 220px at ${px}% ${py}%, rgba(175, 150, 97, 0.42), transparent 58%),
          radial-gradient(circle 420px at ${px}% ${py}%, rgba(243, 237, 226, 0.18), transparent 70%),
          radial-gradient(circle 520px at ${100 - px}% ${100 - py}%, rgba(15, 23, 42, 0.38), transparent 62%)
        `;
      }
    };

    const tick = () => {
      if (disposed) return;
      time += 0.016;
      current.x += (pointer.x - current.x) * LERP;
      current.y += (pointer.y - current.y) * LERP;
      applyScene(current.x, current.y);
      drawParticles(current.x, current.y);
      frame = window.requestAnimationFrame(tick);
    };

    const start = () => {
      if (disposed || prefersReducedMotion() || !isDesktopPanel()) return;
      resize();
      applyScene(0, 0);
      window.addEventListener("pointermove", setPointerFromEvent, { passive: true });
      window.addEventListener("resize", resize);
      frame = window.requestAnimationFrame(tick);
    };

    const stop = () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", setPointerFromEvent);
      window.removeEventListener("resize", resize);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const media = window.matchMedia("(min-width: 768px)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      stop();
      if (media.matches && !motion.matches) start();
    };

    sync();
    media.addEventListener("change", sync);
    motion.addEventListener("change", sync);

    return () => {
      disposed = true;
      stop();
      media.removeEventListener("change", sync);
      motion.removeEventListener("change", sync);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative hidden h-full overflow-hidden bg-navy md:block"
      aria-hidden="true"
    >
      <div
        ref={sceneRef}
        className="absolute inset-[-8%] will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover opacity-90 will-change-transform"
        />

        <div
          ref={ringsRef}
          className="pointer-events-none absolute inset-0 will-change-transform"
        >
          <div className="absolute left-1/2 top-[42%] h-[92%] w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/25" />
          <div className="absolute left-1/2 top-[42%] h-[68%] w-[68%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/15" />
          <div className="absolute left-[18%] top-[22%] size-1.5 rounded-full bg-gold/70" />
          <div className="absolute right-[16%] top-[28%] size-1 rounded-full bg-gold/50" />
          <div className="absolute right-[24%] bottom-[18%] size-1.5 rounded-full bg-gold/60" />
        </div>

        <div
          ref={orbsRef}
          className="pointer-events-none absolute inset-0 will-change-transform"
        >
          <div className="absolute -left-10 top-10 size-40 rounded-full bg-gold/20 blur-3xl" />
          <div className="absolute -right-8 bottom-8 size-48 rounded-full bg-navy/40 blur-3xl" />
          <div className="absolute left-1/3 top-1/4 size-24 rounded-full bg-gold/15 blur-2xl" />
        </div>
      </div>

      <div
        ref={lightRef}
        className="pointer-events-none absolute inset-0 mix-blend-soft-light"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/75 via-navy/15 to-gold/10" />
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 140 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
};
