import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { birthdayConfig } from "../birthday.config";

interface Props {
  onNext: () => void;
}

export default function Page17({ onNext }: Props) {
  const [current, setCurrent] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [count, setCount] = useState(0);

  const generate = () => {
    const pool = birthdayConfig.compliments.filter((c) => !history.includes(c));
    const avail = pool.length > 0 ? pool : birthdayConfig.compliments;
    const pick = avail[Math.floor(Math.random() * avail.length)];
    setCurrent(null);
    setTimeout(() => {
      setCurrent(pick);
      setHistory((h) => [...h, pick].slice(-birthdayConfig.compliments.length));
      setCount((c) => c + 1);
    }, 150);
  };

  return (
    <div
      className="page-fill grain"
      style={{
        background:
          "radial-gradient(ellipse 70% 60% at 55% 45%, #130c08 0%, #0a0908 100%)",
      }}
    >
      <div className="relative z-10 flex flex-col items-center gap-8 px-6 w-full max-w-sm mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div
            className="font-mono text-xs mb-2"
            style={{ color: "#c9a96e88", letterSpacing: "0.12em" }}
          >
            COMPLIMENT GENERATOR
          </div>
          <h2
            className="font-serif"
            style={{ fontSize: "clamp(18px, 5vw, 26px)", color: "#f0ebe0" }}
          >
            A few things about you.
          </h2>
        </motion.div>

        {/* Compliment display */}
        <div
          style={{
            minHeight: 120,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AnimatePresence mode="wait">
            {current && (
              <motion.p
                key={count}
                className="font-serif italic text-center"
                style={{
                  fontSize: "clamp(18px, 5.5vw, 28px)",
                  color: "#e8d5b7",
                  lineHeight: 1.4,
                  maxWidth: 320,
                }}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                "{current}"
              </motion.p>
            )}
            {!current && (
              <motion.div
                key="empty"
                style={{
                  width: 60,
                  height: 1,
                  background: "rgba(201,169,110,0.2)",
                  borderRadius: 1,
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Count */}
        {count > 0 && (
          <motion.div
            className="font-mono text-xs"
            style={{ color: "#c9a96e44", letterSpacing: "0.1em" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {count} generated
          </motion.div>
        )}

        <motion.button
          onClick={generate}
          className="w-full py-4 rounded-full font-sans text-sm font-medium"
          style={{
            background: "rgba(201,169,110,0.1)",
            border: "1px solid rgba(201,169,110,0.35)",
            color: "#e8d5b7",
            cursor: "pointer",
            letterSpacing: "0.06em",
          }}
          whileHover={{ scale: 1.02, background: "rgba(201,169,110,0.16)" }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Generate compliment ✦
        </motion.button>

        {count >= 4 && (
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
            animate={{ opacity: 1 }}
            whileHover={{ color: "#c9a96e" }}
          >
            Next →
          </motion.button>
        )}
      </div>

      {/* Floating quote marks */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            fontSize: 80,
            color: "rgba(201,169,110,0.04)",
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            pointerEvents: "none",
            left: `${[5, 70, 20, 60][i]}%`,
            top: `${[10, 15, 65, 70][i]}%`,
          }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 1.2 }}
        >
          "
        </motion.div>
      ))}
    </div>
  );
}
