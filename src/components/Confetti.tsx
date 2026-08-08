import { useEffect, useRef } from "react";

interface ConfettiParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  rotation: number;
  rotSpeed: number;
  gravity: number;
  opacity: number;
}

interface Props {
  active: boolean;
  origin?: { x: number; y: number };
}

const COLORS = ["#c9a96e", "#e8d5b7", "#c4889a", "#f0ebe0", "#6b1e2e", "#fff8e7"];

export default function Confetti({ active, origin }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<ConfettiParticle[]>([]);
  const rafRef = useRef<number>(0);
  const activeRef = useRef(false);

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

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current = particlesRef.current.filter((p) => p.opacity > 0.01);
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.99;
        p.rotation += p.rotSpeed;
        p.opacity -= 0.008;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        ctx.restore();
      });
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    if (!active || activeRef.current) return;
    activeRef.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ox = origin ? origin.x * canvas.width : canvas.width / 2;
    const oy = origin ? origin.y * canvas.height : canvas.height / 3;

    const burst = () => {
      for (let i = 0; i < 120; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 12 + 3;
        particlesRef.current.push({
          x: ox + (Math.random() - 0.5) * 60,
          y: oy + (Math.random() - 0.5) * 60,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 8,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          size: Math.random() * 10 + 4,
          rotation: Math.random() * 360,
          rotSpeed: (Math.random() - 0.5) * 8,
          gravity: 0.25,
          opacity: 1,
        });
      }
    };

    burst();
    const t = setTimeout(burst, 400);
    const t2 = setTimeout(burst, 800);
    const reset = setTimeout(() => { activeRef.current = false; }, 2000);

    return () => { clearTimeout(t); clearTimeout(t2); clearTimeout(reset); };
  }, [active, origin]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 200,
        width: "100vw",
        height: "100vh",
      }}
    />
  );
}
