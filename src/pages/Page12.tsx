import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { birthdayConfig } from "../birthday.config";

interface Props {
  onNext: () => void;
}

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

const STAR_POSITIONS: [number, number][] = [
  [20, 15], [35, 8], [55, 12], [72, 18], [85, 10],
  [15, 30], [42, 25], [65, 22], [80, 35], [25, 45],
  [50, 40], [70, 48], [88, 42], [10, 58], [32, 55],
  [58, 62], [75, 58], [90, 68], [22, 72], [45, 75],
  [62, 80], [78, 75], [12, 85], [38, 88], [55, 85], [82, 88],
];

const CONNECTIONS = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [5, 6], [6, 7], [7, 8],
  [9, 10], [10, 11], [11, 12],
  [13, 14], [14, 15], [15, 16], [16, 17],
  [0, 5], [4, 8], [9, 13], [17, 22],
  [6, 10], [11, 15], [18, 19], [19, 20],
];

export default function Page12({ onNext }: Props) {
  const [activestar, setActiveStar] = useState<number | null>(null);
  const [tripleClick, setTripleClick] = useState<{ id: number; count: number }>({ id: -1, count: 0 });
  const [secretMsg, setSecretMsg] = useState(false);
  const [visitedCount, setVisitedCount] = useState(0);

  const stars: Star[] = useMemo(() =>
    STAR_POSITIONS.map(([x, y], i) => ({
      id: i,
      x,
      y,
      size: 3 + Math.random() * 3,
      delay: i * 0.06,
    })), []);

  const handleStarClick = (id: number) => {
    setActiveStar(activestar === id ? null : id);
    if (activestar !== id) setVisitedCount((v) => Math.min(v + 1, 26));

    // Easter egg: triple-click star 0
    if (id === 0) {
      const next = tripleClick.id === 0 ? tripleClick.count + 1 : 1;
      setTripleClick({ id: 0, count: next });
      if (next >= 3) {
        setSecretMsg(true);
        setTimeout(() => setSecretMsg(false), 4000);
        setTripleClick({ id: -1, count: 0 });
      }
    }
  };

  return (
    <div
      className="page-fill grain"
      style={{
        background:
          "radial-gradient(ellipse 100% 100% at 50% 50%, #06080f 0%, #0a0908 100%)",
      }}
    >
      {/* Header */}
      <motion.div
        className="absolute top-14 left-0 right-0 text-center z-20"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <p
          className="font-serif italic"
          style={{ fontSize: "clamp(14px, 3.5vw, 17px)", color: "#c9a96e77" }}
        >
          26 stars. Each one is about you.
        </p>
      </motion.div>

      {/* SVG Constellation */}
      <div className="relative w-full h-full" style={{ position: "absolute", inset: 0 }}>
        <svg
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}
        >
          {/* Connection lines */}
          {CONNECTIONS.map(([a, b], i) => {
            const starA = stars[a];
            const starB = stars[b];
            return (
              <motion.line
                key={i}
                x1={`${starA.x}%`}
                y1={`${starA.y}%`}
                x2={`${starB.x}%`}
                y2={`${starB.y}%`}
                stroke="rgba(201,169,110,0.15)"
                strokeWidth={0.5}
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.04, duration: 0.5 }}
              />
            );
          })}

          {/* Stars */}
          {stars.map((star) => {
            const isActive = activestar === star.id;
            return (
              <g key={star.id} onClick={() => handleStarClick(star.id)} style={{ cursor: "pointer" }}>
                {/* Glow */}
                <circle
                  cx={`${star.x}%`}
                  cy={`${star.y}%`}
                  r={isActive ? 20 : 8}
                  fill="rgba(201,169,110,0)"
                  style={{ transition: "r 0.3s" }}
                />
                {/* Hit area */}
                <circle
                  cx={`${star.x}%`}
                  cy={`${star.y}%`}
                  r={18}
                  fill="transparent"
                />
                {/* Star dot */}
                <motion.circle
                  cx={`${star.x}%`}
                  cy={`${star.y}%`}
                  r={isActive ? star.size + 3 : star.size}
                  fill={isActive ? "#e8d5b7" : "#c9a96e"}
                  initial={{ r: 0, opacity: 0 }}
                  animate={{
                    r: isActive ? star.size + 3 : star.size,
                    opacity: 1,
                    filter: isActive
                      ? "drop-shadow(0 0 8px rgba(201,169,110,0.9))"
                      : "drop-shadow(0 0 3px rgba(201,169,110,0.4))",
                  }}
                  transition={{ delay: star.delay, duration: 0.4 }}
                  style={{ animation: `twinkle ${3 + star.id * 0.2}s ease-in-out infinite` }}
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Message popup */}
      <AnimatePresence>
        {activestar !== null && (
          <motion.div
            className="absolute bottom-20 left-0 right-0 flex justify-center z-30 px-6"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <div
              className="max-w-xs w-full rounded-2xl p-5 text-center"
              style={{
                background: "rgba(10,9,8,0.9)",
                border: "1px solid rgba(201,169,110,0.25)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div
                className="font-mono text-xs mb-2"
                style={{ color: "#c9a96e66", letterSpacing: "0.1em" }}
              >
                ★ {String(activestar + 1).padStart(2, "0")} of 26
              </div>
              <p
                className="font-serif italic"
                style={{ fontSize: "clamp(14px, 3.5vw, 16px)", color: "#f0ebe0", lineHeight: 1.5 }}
              >
                {birthdayConfig.constellationMessages[activestar]}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Secret egg message */}
      <AnimatePresence>
        {secretMsg && (
          <motion.div
            className="absolute top-20 left-0 right-0 flex justify-center z-40 px-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="rounded-2xl px-5 py-3 font-mono text-xs"
              style={{
                background: "rgba(107,30,46,0.9)",
                border: "1px solid rgba(196,136,154,0.4)",
                color: "#e8d5b7",
                textAlign: "center",
              }}
            >
              // You found the secret star. 🌟
              <br />// git push origin love
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next */}
      <motion.button
        onClick={onNext}
        className="absolute bottom-8 left-0 right-0 mx-auto font-sans text-sm"
        style={{
          color: "rgba(201,169,110,0.45)",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          letterSpacing: "0.06em",
          display: "block",
          width: "fit-content",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        whileHover={{ color: "#c9a96e" }}
      >
        Continue →
      </motion.button>
    </div>
  );
}
