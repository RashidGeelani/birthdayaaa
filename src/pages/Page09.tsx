import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "../components/Confetti";

interface Props {
  onNext: () => void;
}

export default function Page09({ onNext }: Props) {
  const [phase, setPhase] = useState<"warning" | "pressed" | "reveal" | "fireworks">("warning");
  const [confetti, setConfetti] = useState(false);

  const press = () => {
    setPhase("pressed");
    setTimeout(() => setPhase("reveal"), 1200);
    setTimeout(() => {
      setConfetti(true);
      setPhase("fireworks");
    }, 2200);
  };

  return (
    <div
      className="page-fill grain"
      style={{
        background: phase === "pressed" ? "#000" : "#0a0908",
        transition: "background 0.4s",
      }}
    >
      <Confetti active={confetti} />

      <div className="relative z-10 flex flex-col items-center gap-8 px-8 text-center">
        <AnimatePresence mode="wait">
          {phase === "warning" && (
            <motion.div
              key="warning"
              className="flex flex-col items-center gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <p
                className="font-serif"
                style={{
                  fontSize: "clamp(18px, 5vw, 26px)",
                  color: "#e8d5b7",
                  lineHeight: 1.4,
                }}
              >
                Whatever you do…
              </p>
              <motion.button
                onClick={press}
                className="px-10 py-5 rounded-xl font-sans font-semibold relative"
                style={{
                  background:
                    "linear-gradient(135deg, #6b1e2e 0%, #8b2a40 100%)",
                  border: "none",
                  color: "#f0ebe0",
                  fontSize: "clamp(16px, 4vw, 22px)",
                  cursor: "pointer",
                  letterSpacing: "0.06em",
                  boxShadow: "0 0 30px rgba(107,30,46,0.4)",
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 50px rgba(107,30,46,0.6)",
                }}
                whileTap={{ scale: 0.95 }}
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                DO NOT PRESS
              </motion.button>
              <p
                className="font-mono text-xs"
                style={{ color: "#c9a96e44", letterSpacing: "0.08em" }}
              >
                seriously. don't.
              </p>
            </motion.div>
          )}

          {phase === "pressed" && (
            <motion.div
              key="pressed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p
                className="font-mono text-sm"
                style={{ color: "#c9a96e88", letterSpacing: "0.1em" }}
              >
                …
              </p>
            </motion.div>
          )}

          {(phase === "reveal" || phase === "fireworks") && (
            <motion.div
              key="reveal"
              className="flex flex-col items-center gap-6"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p
                className="font-mono text-sm"
                style={{ color: "#c9a96e", letterSpacing: "0.1em" }}
              >
                I told you.
              </p>
              <p
                className="font-serif italic"
                style={{
                  fontSize: "clamp(22px, 6vw, 34px)",
                  color: "#f0ebe0",
                  lineHeight: 1.3,
                }}
              >
                Worth it though.
              </p>
              {phase === "fireworks" && (
                <motion.button
                  onClick={onNext}
                  className="font-sans text-sm mt-4"
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
                  Continue →
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
