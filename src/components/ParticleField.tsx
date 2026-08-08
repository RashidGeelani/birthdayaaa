import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  size: number;
  life: number;
  maxLife: number;
}

interface Props {
  count?: number;
  color?: string;
  style?: React.CSSProperties;
}

export default function ParticleField({
  count = 40,
  color = "201,169,110",
  style,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const makeParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3 - 0.1,
      opacity: Math.random() * 0.5 + 0.1,
      size: Math.random() * 1.5 + 0.5,
      life: Math.random() * 200,
      maxLife: Math.random() * 300 + 200,
    });

    particlesRef.current = Array.from({ length: count }, makeParticle);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        const ratio = p.life / p.maxLife;
        const alpha = ratio < 0.2 ? ratio / 0.2 : ratio > 0.8 ? (1 - ratio) / 0.2 : 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${p.opacity * alpha})`;
        ctx.fill();
        if (p.life >= p.maxLife) {
          particlesRef.current[i] = makeParticle();
          particlesRef.current[i].life = 0;
        }
      });
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [count, color]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        ...style,
      }}
    />
  );
}
