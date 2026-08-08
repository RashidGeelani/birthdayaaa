import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onEnter: () => void;
}

const LINES = [
  "Initializing something special...",
  "Compiling memories...",
  "Loading 26 reasons...",
  "Almost there... ❤️",
];

export default function LoadingScreen({ onEnter }: Props) {
  const [lineIndex, setLineIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"lines" | "progress" | "done" | "enter">("lines");

  useEffect(() => {
    if (phase !== "lines") return;
    if (lineIndex < LINES.length - 1) {
      const t = setTimeout(() => setLineIndex((i) => i + 1), 800);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setPhase("progress"), 600);
      return () => clearTimeout(t);
    }
  }, [lineIndex, phase]);

  useEffect(() => {
    if (phase !== "progress") return;
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 3 + 1;
      if (p >= 100) {
        p = 100;
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => setPhase("done"), 400);
      } else {
        setProgress(p);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (phase === "done") {
      const t = setTimeout(() => setPhase("enter"), 1200);
      return () => clearTimeout(t);
    }
  }, [phase]);

  return (
    <motion.div
      className="page-fill grain"
      style={{ background: "#0a0908" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 40% at 50% 60%, rgba(201,169,110,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-8 px-6 w-full max-w-sm mx-auto">
        {/* Lines */}
        <div className="font-mono text-sm space-y-3 w-full min-h-[120px]">
          {LINES.slice(0, lineIndex + 1).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: i === lineIndex ? 1 : 0.35 }}
              transition={{ duration: 0.4 }}
              style={{ color: i === lineIndex ? "#c9a96e" : "#f0ebe066" }}
            >
              <span style={{ color: "#c9a96e44", marginRight: 8 }}>›</span>
              {line}
            </motion.div>
          ))}
        </div>

        {/* Progress bar */}
        <AnimatePresence>
          {(phase === "progress" || phase === "done" || phase === "enter") && (
            <motion.div
              className="w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div
                style={{
                  width: "100%",
                  height: 2,
                  background: "rgba(240,235,224,0.1)",
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <motion.div
                  style={{
                    height: "100%",
                    background: "linear-gradient(90deg, #c9a96e, #e8d5b7)",
                    borderRadius: 2,
                    transformOrigin: "left",
                  }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <div
                className="font-mono text-xs mt-2 text-right"
                style={{ color: "#c9a96e88" }}
              >
                {Math.floor(progress)}%
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Done message + enter button */}
        <AnimatePresence>
          {phase === "done" && (
            <motion.p
              className="font-mono text-sm text-center"
              style={{ color: "#f0ebe066" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Okay… this took longer than expected.
            </motion.p>
          )}
          {phase === "enter" && (
            <motion.div
              className="flex flex-col items-center gap-5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p
                className="font-mono text-sm text-center"
                style={{ color: "#f0ebe066" }}
              >
                Okay… this took longer than expected.
              </p>
              <button
                onClick={onEnter}
                className="group relative flex items-center gap-3 px-8 py-4 rounded-full font-sans text-sm font-medium transition-all duration-300"
                style={{
                  background: "transparent",
                  border: "1px solid rgba(201,169,110,0.4)",
                  color: "#e8d5b7",
                  letterSpacing: "0.06em",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor =
                    "rgba(201,169,110,0.9)";
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "rgba(201,169,110,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor =
                    "rgba(201,169,110,0.4)";
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "transparent";
                }}
              >
                Enter
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Subtle corner branding */}
      <div
        className="absolute bottom-6 left-0 right-0 text-center font-mono text-xs"
        style={{ color: "#f0ebe020", letterSpacing: "0.1em" }}
      >
        26 REASONS
      </div>
    </motion.div>
  );
}
