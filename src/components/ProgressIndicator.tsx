import { useState } from "react";
import { motion } from "framer-motion";

interface Props {
  current: number;
  total: number;
}

export default function ProgressIndicator({ current, total }: Props) {
  const [easterEggCount, setEasterEggCount] = useState(0);
  const [showJoke, setShowJoke] = useState(false);

  const handleClick = () => {
    const next = easterEggCount + 1;
    setEasterEggCount(next);
    if (next >= 3) {
      setShowJoke(true);
      setTimeout(() => {
        setShowJoke(false);
        setEasterEggCount(0);
      }, 3000);
    }
  };

  const pct = ((current - 1) / (total - 1)) * 100;

  return (
    <div
      className="fixed top-5 left-0 right-0 flex justify-center z-50"
      style={{ pointerEvents: "none" }}
    >
      <motion.div
        className="flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{ pointerEvents: "auto", cursor: "default" }}
        onClick={handleClick}
      >
        <div
          className="font-mono text-xs select-none"
          style={{
            color: "rgba(201,169,110,0.7)",
            letterSpacing: "0.12em",
          }}
        >
          {String(current).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
        <div
          style={{
            width: 80,
            height: 1,
            background: "rgba(240,235,224,0.12)",
            borderRadius: 1,
            overflow: "hidden",
          }}
        >
          <motion.div
            style={{
              height: "100%",
              background: "linear-gradient(90deg, #c9a96e, #e8d5b7)",
              borderRadius: 1,
            }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </motion.div>

      {showJoke && (
        <motion.div
          className="absolute top-12 font-mono text-xs text-center px-4 py-2 rounded-lg"
          style={{
            background: "rgba(10,9,8,0.9)",
            border: "1px solid rgba(201,169,110,0.3)",
            color: "#c9a96e",
            backdropFilter: "blur(8px)",
            maxWidth: 240,
          }}
          initial={{ opacity: 0, y: -5, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0 }}
        >
          // curiosity_level++; // still not as curious as I am about you ❤️
        </motion.div>
      )}
    </div>
  );
}
