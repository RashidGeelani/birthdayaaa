import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Props {
  onNext: () => void;
}

const LINE1 = "Before we begin…";
const LINE2 = "There are 26 things I wanted to tell you today.";

function useTypewriter(text: string, speed = 45, delay = 0) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    let i = 0;
    const t = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1));
          i++;
        } else {
          setDone(true);
          clearInterval(interval);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(t);
  }, [text, speed, delay]);
  return { displayed, done };
}

export default function Page01({ onNext }: Props) {
  const line1 = useTypewriter(LINE1, 60, 600);
  const line2 = useTypewriter(LINE2, 40, line1.done ? 200 : 99999);
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; vx: number; vy: number }[]
  >([]);
  const [transitioning, setTransitioning] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleStart = () => {
    if (transitioning) return;
    setTransitioning(true);
    const rect = btnRef.current?.getBoundingClientRect();
    const cx = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const cy = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
    const ps = Array.from({ length: 80 }, (_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 200 + 80;
      return {
        id: i,
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
      };
    });
    setParticles(ps);
    setTimeout(onNext, 900);
  };

  return (
    <div
      className="page-fill grain"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 50%, #12100e 0%, #0a0908 100%)",
      }}
    >
      {/* Particle burst */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: "fixed",
            left: p.x,
            top: p.y,
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: "#c9a96e",
            pointerEvents: "none",
            zIndex: 100,
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            x: p.vx,
            y: p.vy,
            opacity: 0,
            scale: 0,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      ))}

      <div className="relative z-10 flex flex-col items-center justify-center px-8 text-center max-w-lg mx-auto gap-8">
        <motion.div
          className="font-serif"
          style={{ fontSize: "clamp(28px, 7vw, 52px)", color: "#f0ebe0", lineHeight: 1.2 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {line1.displayed}
          {!line1.done && <span className="cursor-blink" style={{ color: "#c9a96e" }}>|</span>}
        </motion.div>

        <motion.div
          className="font-sans"
          style={{
            fontSize: "clamp(15px, 4vw, 20px)",
            color: "#e8d5b7",
            lineHeight: 1.6,
            opacity: line1.done ? 1 : 0,
          }}
          animate={{ opacity: line1.done ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          {line2.displayed}
          {line1.done && !line2.done && (
            <span className="cursor-blink" style={{ color: "#c9a96e" }}>|</span>
          )}
        </motion.div>

        <motion.button
          ref={btnRef}
          onClick={handleStart}
          disabled={!line2.done || transitioning}
          className="px-8 py-4 rounded-full font-sans text-sm font-medium transition-all duration-300"
          style={{
            background: "transparent",
            border: "1px solid rgba(201,169,110,0.5)",
            color: "#e8d5b7",
            letterSpacing: "0.06em",
            cursor: line2.done ? "pointer" : "default",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: line2.done ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ scale: 1.04, borderColor: "rgba(201,169,110,0.9)" }}
          whileTap={{ scale: 0.97 }}
        >
          Start this little adventure
        </motion.button>
      </div>

      {/* Subtle ambient dots */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: 2,
            height: 2,
            borderRadius: "50%",
            background: "#c9a96e",
            left: `${15 + i * 14}%`,
            top: `${20 + (i % 3) * 25}%`,
            opacity: 0.2 + i * 0.05,
          }}
          animate={{ opacity: [0.15, 0.5, 0.15], scale: [1, 1.5, 1] }}
          transition={{
            duration: 3 + i * 0.7,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
}
