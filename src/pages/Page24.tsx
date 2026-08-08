import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ParticleField from "../components/ParticleField";

interface Props {
  onNext: () => void;
}

const LINES = [
  "I don't know exactly what the next years look like.",
  "But I hope I get to see a lot of them with you.",
];

export default function Page24({ onNext }: Props) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1000);
    const t2 = setTimeout(() => setPhase(2), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div
      className="page-fill grain"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 30%, #060810 0%, #0a0908 100%)",
      }}
    >
      <ParticleField count={60} color="201,169,110" />

      {/* Static stars */}
      {[...Array(40)].map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: Math.random() * 2 + 1,
            height: Math.random() * 2 + 1,
            borderRadius: "50%",
            background: "#f0ebe0",
            opacity: Math.random() * 0.4 + 0.1,
            animation: `twinkle ${2 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 4}s`,
          }}
        />
      ))}

      <div className="relative z-10 flex flex-col items-center gap-8 px-8 text-center max-w-md mx-auto">
        <motion.div
          className="flex flex-col gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.p
            className="font-serif"
            style={{
              fontSize: "clamp(18px, 5.5vw, 28px)",
              color: "#e8d5b7",
              lineHeight: 1.5,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : 20 }}
            transition={{ duration: 0.9 }}
          >
            {LINES[0]}
          </motion.p>

          <motion.p
            className="font-serif italic"
            style={{
              fontSize: "clamp(20px, 6vw, 32px)",
              color: "#f0ebe0",
              lineHeight: 1.4,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: phase >= 2 ? 1 : 0, y: phase >= 2 ? 0 : 20 }}
            transition={{ duration: 0.9 }}
          >
            {LINES[1]}
          </motion.p>
        </motion.div>

        <motion.button
          onClick={onNext}
          className="font-sans text-sm"
          style={{
            color: "rgba(201,169,110,0.5)",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            letterSpacing: "0.06em",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 2 ? 1 : 0 }}
          transition={{ delay: 1.5 }}
          whileHover={{ color: "#c9a96e" }}
        >
          One more →
        </motion.button>
      </div>
    </div>
  );
}
