import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "../components/Confetti";

interface Props {
  onNext: () => void;
}

export default function Page06({ onNext }: Props) {
  const [on, setOn] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [vibrated, setVibrated] = useState(false);

  const toggle = () => {
    const next = !on;
    setOn(next);
    if (next) {
      setConfetti(false);
      setTimeout(() => setConfetti(true), 50);
      if (!vibrated && navigator.vibrate) {
        navigator.vibrate([50, 30, 50]);
        setVibrated(true);
      }
    }
  };

  return (
    <div
      className="page-fill grain"
      style={{ background: "#0a0908" }}
    >
      <Confetti active={confetti} />

      <div className="relative z-10 flex flex-col items-center gap-10 px-8 text-center">
        <motion.p
          className="font-serif"
          style={{
            fontSize: "clamp(20px, 5vw, 28px)",
            color: on ? "#f0ebe0" : "#f0ebe0cc",
            lineHeight: 1.4,
            transition: "color 0.5s",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          There is something I like about you.
        </motion.p>

        {/* Toggle */}
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <button
            onClick={toggle}
            style={{
              width: 72,
              height: 38,
              borderRadius: 19,
              background: on
                ? "linear-gradient(90deg, #c9a96e, #c4889a)"
                : "rgba(240,235,224,0.1)",
              border: `1px solid ${on ? "transparent" : "rgba(201,169,110,0.3)"}`,
              transition: "all 0.4s ease",
              position: "relative",
              cursor: "pointer",
              boxShadow: on ? "0 0 30px rgba(201,169,110,0.3)" : "none",
            }}
          >
            <motion.div
              style={{
                position: "absolute",
                top: 4,
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "#f0ebe0",
                boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
              }}
              animate={{ x: on ? 36 : 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            />
          </button>
          <span
            className="font-mono text-xs"
            style={{
              color: on ? "#c9a96e" : "#c9a96e66",
              letterSpacing: "0.1em",
              transition: "color 0.3s",
            }}
          >
            {on ? "ON" : "OFF"}
          </span>
        </motion.div>

        {/* Reveal text */}
        <AnimatePresence>
          {on && (
            <motion.p
              className="font-serif italic"
              style={{
                fontSize: "clamp(22px, 6vw, 36px)",
                color: "#e8d5b7",
                lineHeight: 1.3,
              }}
              initial={{ opacity: 0, scale: 0.8, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
            >
              Okay fine… EVERYTHING.
            </motion.p>
          )}
        </AnimatePresence>

        {/* Hearts burst */}
        <AnimatePresence>
          {on && (
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  style={{
                    position: "absolute",
                    left: `${10 + i * 7}%`,
                    bottom: "15%",
                    fontSize: `${14 + (i % 3) * 8}px`,
                    color: ["#c9a96e", "#c4889a", "#e8d5b7"][i % 3],
                  }}
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: [0, 1, 0], y: -120 }}
                  transition={{
                    duration: 2 + Math.random(),
                    delay: i * 0.12,
                    ease: "easeOut",
                  }}
                >
                  ♡
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {on && (
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
              transition={{ delay: 1 }}
              whileHover={{ color: "#c9a96e" }}
            >
              Keep going →
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
