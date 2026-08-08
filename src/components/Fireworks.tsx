import { useEffect, useRef } from "react";

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  life: number;
  maxLife: number;
  gravity: number;
  trail: { x: number; y: number }[];
}

const FW_COLORS = [
  "#c9a96e", "#e8d5b7", "#c4889a", "#f0ebe0",
  "#ffdf80", "#ffc0cb", "#ffffff", "#ffe4b5",
];

export default function Fireworks({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const rafRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      ctx.fillStyle = "rgba(10,9,8,0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      sparksRef.current = sparksRef.current.filter((s) => s.life < s.maxLife);
      sparksRef.current.forEach((s) => {
        s.trail.push({ x: s.x, y: s.y });
        if (s.trail.length > 5) s.trail.shift();
        s.x += s.vx;
        s.y += s.vy;
        s.vy += s.gravity;
        s.vx *= 0.98;
        s.life++;
        const ratio = 1 - s.life / s.maxLife;
        for (let i = 0; i < s.trail.length; i++) {
          const t = s.trail[i];
          const a = (i / s.trail.length) * ratio * 0.8;
          ctx.beginPath();
          ctx.arc(t.x, t.y, 1.5 * ratio, 0, Math.PI * 2);
          ctx.fillStyle = s.color;
          ctx.globalAlpha = a;
          ctx.fill();
        }
        ctx.globalAlpha = ratio;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 2 * ratio, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.fill();
        ctx.globalAlpha = 1;
      });
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    if (!active) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;

    const explode = (x: number, y: number) => {
      const color = FW_COLORS[Math.floor(Math.random() * FW_COLORS.length)];
      const count = 60 + Math.floor(Math.random() * 40);
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const speed = Math.random() * 5 + 2;
        sparksRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color,
          life: 0,
          maxLife: 60 + Math.floor(Math.random() * 40),
          gravity: 0.08,
          trail: [],
        });
      }
    };

    const fire = () => {
      const x = canvas.width * (0.2 + Math.random() * 0.6);
      const y = canvas.height * (0.1 + Math.random() * 0.4);
      explode(x, y);
    };

    fire();
    timerRef.current = setInterval(fire, 600);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 50,
        width: "100vw",
        height: "100vh",
      }}
    />
  );
}
