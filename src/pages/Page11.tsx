import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onNext: () => void;
}

export default function Page11({ onNext }: Props) {
  const [count, setCount] = useState(11);
  const [stopped, setStopped] = useState(false);
  const [reveal, setReveal] = useState(false);
  const [particles, setParticles] = useState<number[]>([]);

  useEffect(() => {
    const t = setTimeout(() => {
      let c = 11;
      const interval = setInterval(() => {
        c--;
        setCount(c);
        if (c <= 1) {
          clearInterval(interval);
          setTimeout(() => {
            setStopped(true);
            setParticles(Array.from({ length: 60 }, (_, i) => i));
            setTimeout(() => setReveal(true), 600);
          }, 500);
        }
      }, 700);
      return () => clearInterval(interval);
    }, 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="page-fill grain"
      style={{
        background:
          "radial-gradient(ellipse 60% 50% at 50% 50%, #0c0810 0%, #0a0908 100%)",
      }}
    >
      {/* Particle burst when stopped */}
      {stopped &&
        particles.map((i) => {
          const angle = (i / particles.length) * Math.PI * 2;
          const dist = 150 + Math.random() * 100;
          return (
            <motion.div
              key={i}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: 3,
                height: 3,
                borderRadius: "50%",
                background: i % 3 === 0 ? "#c9a96e" : i % 3 === 1 ? "#c4889a" : "#e8d5b7",
                pointerEvents: "none",
              }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{
                x: Math.cos(angle) * dist,
                y: Math.sin(angle) * dist,
                opacity: 0,
                scale: 0,
              }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          );
        })}

      <div className="relative z-10 flex flex-col items-center gap-6 px-8 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={count}
            className="font-serif"
            style={{
              fontSize: "clamp(100px, 28vw, 200px)",
              fontWeight: 600,
              lineHeight: 1,
              color: count === 1 ? "#c4889a" : "#c9a96e",
              letterSpacing: "-0.02em",
            }}
            initial={{ opacity: 0, scale: 1.3 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.3 }}
          >
            {count}
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {reveal && (
            <motion.div
              className="flex flex-col items-center gap-4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p
                className="font-serif italic"
                style={{
                  fontSize: "clamp(16px, 4.5vw, 22px)",
                  color: "#e8d5b7",
                  lineHeight: 1.5,
                }}
              >
                Okay, I couldn't wait.
              </p>
              <motion.button
                onClick={onNext}
                className="font-sans text-sm"
                style={{
                  color: "rgba(201,169,110,0.6)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  letterSpacing: "0.06em",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                whileHover={{ color: "#c9a96e" }}
              >
                Keep going →
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
