import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onNext: () => void;
}

export default function Page25({ onNext }: Props) {
  const [clicked, setClicked] = useState(false);

  return (
    <div
      className="page-fill grain"
      style={{ background: "#0a0908" }}
    >
      <div className="relative z-10 flex flex-col items-center gap-8 px-8 text-center max-w-sm mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p
            className="font-serif"
            style={{
              fontSize: "clamp(28px, 8vw, 52px)",
              color: "#f0ebe0",
              lineHeight: 1.2,
            }}
          >
            One page left.
          </p>
        </motion.div>

        <motion.p
          className="font-serif italic"
          style={{
            fontSize: "clamp(15px, 4vw, 19px)",
            color: "#e8d5b799",
            lineHeight: 1.5,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          But before that…
        </motion.p>

        <AnimatePresence mode="wait">
          {!clicked ? (
            <motion.button
              key="btn"
              onClick={() => setClicked(true)}
              className="px-8 py-4 rounded-full font-sans text-sm font-medium"
              style={{
                background: "transparent",
                border: "1px solid rgba(201,169,110,0.4)",
                color: "#e8d5b7",
                cursor: "pointer",
                letterSpacing: "0.06em",
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              whileHover={{ scale: 1.04, borderColor: "rgba(201,169,110,0.8)" }}
              whileTap={{ scale: 0.97 }}
            >
              Tell me you want to see it.
            </motion.button>
          ) : (
            <motion.div
              key="response"
              className="flex flex-col items-center gap-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
            >
              <p
                className="font-serif italic"
                style={{
                  fontSize: "clamp(20px, 6vw, 32px)",
                  color: "#c9a96e",
                  lineHeight: 1.3,
                }}
              >
                Good choice.
              </p>
              <motion.button
                onClick={onNext}
                className="px-10 py-4 rounded-full font-sans text-sm font-medium"
                style={{
                  background: "linear-gradient(135deg, #c9a96e22, #c4889a22)",
                  border: "1px solid rgba(201,169,110,0.5)",
                  color: "#e8d5b7",
                  cursor: "pointer",
                  letterSpacing: "0.06em",
                  animation: "pulse-glow 2s ease-in-out infinite",
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
              >
                Take me there →
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
