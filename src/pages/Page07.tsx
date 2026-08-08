import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onNext: () => void;
}

export default function Page07({ onNext }: Props) {
  const [count, setCount] = useState(1);
  const [counting, setCounting] = useState(false);
  const [done, setDone] = useState(false);

  const start = () => {
    if (counting || done) return;
    setCounting(true);
    let c = 1;
    const interval = setInterval(() => {
      c++;
      setCount(c);
      if (c >= 26) {
        clearInterval(interval);
        setDone(true);
        setCounting(false);
      }
    }, 120);
    return () => clearInterval(interval);
  };

  useEffect(() => {
    const t = setTimeout(start, 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="page-fill grain"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 50%, #0f0c08 0%, #0a0908 100%)",
      }}
    >
      <div className="relative z-10 flex flex-col items-center gap-8 px-8 text-center">
        <motion.div
          className="font-serif number-glow"
          style={{
            fontSize: "clamp(100px, 25vw, 200px)",
            fontWeight: 600,
            color: counting ? "#c9a96e" : done ? "#f0ebe0" : "#c9a96e",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            transition: "color 0.3s",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          key={count}
        >
          {String(count).padStart(2, "0")}
        </motion.div>

        <AnimatePresence>
          {done && (
            <motion.div
              className="flex flex-col items-center gap-3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p
                className="font-serif italic"
                style={{
                  fontSize: "clamp(18px, 5vw, 24px)",
                  color: "#e8d5b7",
                  lineHeight: 1.4,
                }}
              >
                I could keep counting.
              </p>
              <p
                className="font-sans"
                style={{
                  fontSize: "clamp(14px, 3.5vw, 17px)",
                  color: "#c9a96e88",
                  lineHeight: 1.5,
                }}
              >
                But we already know where this is going.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {done && (
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
              transition={{ delay: 1.2 }}
              whileHover={{ color: "#c9a96e" }}
            >
              Next →
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Subtle ring */}
      {counting && (
        <motion.div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            height: 300,
            borderRadius: "50%",
            border: "1px solid rgba(201,169,110,0.15)",
            pointerEvents: "none",
          }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 0.6, repeat: Infinity }}
        />
      )}
    </div>
  );
}
