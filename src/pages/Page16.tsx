import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onNext: () => void;
}

const HOLD_DURATION = 2000;

export default function Page16({ onNext }: Props) {
  const [progress, setProgress] = useState(0);
  const [holding, setHolding] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);

  const startHold = useCallback(() => {
    if (unlocked) return;
    setHolding(true);
    startTimeRef.current = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const p = Math.min((elapsed / HOLD_DURATION) * 100, 100);
      setProgress(p);
      if (p >= 100) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setHolding(false);
        setUnlocked(true);
      }
    }, 16);
  }, [unlocked]);

  const endHold = useCallback(() => {
    if (unlocked) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    setHolding(false);
    setProgress((p) => {
      if (p < 100) return 0;
      return p;
    });
  }, [unlocked]);

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const dash = (progress / 100) * circumference;

  return (
    <div
      className="page-fill grain"
      style={{ background: "#0a0908" }}
    >
      <div className="relative z-10 flex flex-col items-center gap-10 px-8 text-center max-w-sm mx-auto">
        <motion.p
          className="font-serif"
          style={{
            fontSize: "clamp(18px, 5vw, 24px)",
            color: "#e8d5b7",
            lineHeight: 1.4,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Some things shouldn't be rushed.
        </motion.p>

        <AnimatePresence mode="wait">
          {!unlocked ? (
            <motion.div
              key="hold"
              className="flex flex-col items-center gap-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Hold button with circular progress */}
              <div
                style={{ position: "relative", width: 110, height: 110 }}
                onMouseDown={startHold}
                onMouseUp={endHold}
                onMouseLeave={endHold}
                onTouchStart={(e) => { e.preventDefault(); startHold(); }}
                onTouchEnd={endHold}
              >
                <svg
                  style={{
                    position: "absolute",
                    inset: 0,
                    transform: "rotate(-90deg)",
                    width: "100%",
                    height: "100%",
                  }}
                  viewBox="0 0 100 100"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    stroke="rgba(201,169,110,0.15)"
                    strokeWidth="3"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    stroke="#c9a96e"
                    strokeWidth="3"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - dash}
                    strokeLinecap="round"
                    style={{ transition: "stroke-dashoffset 0.05s" }}
                  />
                </svg>

                <button
                  style={{
                    position: "absolute",
                    inset: 8,
                    borderRadius: "50%",
                    background: holding
                      ? "rgba(201,169,110,0.2)"
                      : "rgba(201,169,110,0.08)",
                    border: "1px solid rgba(201,169,110,0.3)",
                    color: "#e8d5b7",
                    cursor: "pointer",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 11,
                    letterSpacing: "0.04em",
                    transition: "background 0.2s",
                    userSelect: "none",
                  }}
                >
                  Hold
                </button>
              </div>

              <p
                className="font-mono text-xs"
                style={{ color: "#c9a96e55", letterSpacing: "0.06em" }}
              >
                {holding ? "Keep holding…" : "press and hold to unlock"}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="unlocked"
              className="flex flex-col items-center gap-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
            >
              <div style={{ fontSize: 40, color: "#c9a96e" }}>♡</div>
              <p
                className="font-serif italic"
                style={{
                  fontSize: "clamp(18px, 5vw, 24px)",
                  color: "#f0ebe0",
                  lineHeight: 1.4,
                  textAlign: "center",
                }}
              >
                "You're one of my favourite
                <br />parts of life."
              </p>
              <motion.button
                onClick={onNext}
                className="font-sans text-sm mt-2"
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
