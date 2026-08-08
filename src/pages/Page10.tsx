import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onNext: () => void;
}

const TERMINAL_LINES = [
  { text: "$ npm run birthday", delay: 300, color: "#c9a96e" },
  { text: "> compiling love...", delay: 900, color: "#888" },
  { text: "✓ memories loaded", delay: 1600, color: "#4ade80" },
  { text: "✓ smiles detected", delay: 2200, color: "#4ade80" },
  { text: "✓ favourite person found", delay: 2900, color: "#4ade80" },
  { text: "✓ happiness module installed", delay: 3600, color: "#4ade80" },
  { text: "", delay: 4000, color: "#888" },
  { text: "BUILD SUCCESSFUL ❤️", delay: 4400, color: "#f0ebe0" },
  { text: "", delay: 4600, color: "#888" },
  { text: "HappyBirthday.exe is ready.", delay: 5000, color: "#c9a96e" },
];

export default function Page10({ onNext }: Props) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const termRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    TERMINAL_LINES.forEach((line, i) => {
      const t = setTimeout(() => {
        setVisibleLines((v) => Math.max(v, i + 1));
        if (termRef.current) {
          termRef.current.scrollTop = termRef.current.scrollHeight;
        }
      }, line.delay);
      return () => clearTimeout(t);
    });
    const t = setTimeout(() => setShowButton(true), 5600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="page-fill grain"
      style={{ background: "#050504" }}
    >
      {/* Terminal window */}
      <motion.div
        className="w-full max-w-md mx-auto"
        style={{ padding: "0 16px" }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Title bar */}
        <div
          style={{
            background: "#1a1a1a",
            borderRadius: "12px 12px 0 0",
            padding: "10px 16px",
            display: "flex",
            alignItems: "center",
            gap: 8,
            borderBottom: "1px solid #333",
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ffbd2e" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840" }} />
          <span
            className="font-mono text-xs ml-2"
            style={{ color: "#666", letterSpacing: "0.06em" }}
          >
            birthday.terminal
          </span>
        </div>

        {/* Terminal body */}
        <div
          ref={termRef}
          style={{
            background: "#0d0d0d",
            borderRadius: "0 0 12px 12px",
            padding: "20px",
            minHeight: 280,
            maxHeight: "50vh",
            overflowY: "auto",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "clamp(11px, 3vw, 14px)",
            lineHeight: 1.7,
          }}
          className="scrollbar-hide"
        >
          {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              style={{ color: line.color }}
            >
              {line.text || " "}
            </motion.div>
          ))}
          {visibleLines < TERMINAL_LINES.length && (
            <span
              className="cursor-blink"
              style={{ color: "#c9a96e", fontSize: 14 }}
            >
              █
            </span>
          )}
        </div>

        <AnimatePresence>
          {showButton && (
            <motion.div
              className="flex justify-center mt-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <motion.button
                onClick={onNext}
                className="px-8 py-3 rounded-full font-sans text-sm font-medium"
                style={{
                  background: "rgba(201,169,110,0.12)",
                  border: "1px solid rgba(201,169,110,0.4)",
                  color: "#e8d5b7",
                  cursor: "pointer",
                  letterSpacing: "0.06em",
                }}
                whileHover={{ scale: 1.03, background: "rgba(201,169,110,0.18)" }}
                whileTap={{ scale: 0.97 }}
              >
                Run →
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
