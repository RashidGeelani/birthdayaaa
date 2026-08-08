import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Fireworks from "../components/Fireworks";
import Confetti from "../components/Confetti";
import { birthdayConfig } from "../birthday.config";

interface Props {
  onRestart: () => void;
}

type Phase = "black" | "dot" | "title" | "name" | "subtitle" | "celebration" | "final";

export default function Page26({ onRestart }: Props) {
  const [phase, setPhase] = useState<Phase>("black");
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    const timings: [Phase, number][] = [
      ["dot", 800],
      ["title", 2000],
      ["name", 3500],
      ["subtitle", 5000],
      ["celebration", 6000],
      ["final", 8500],
    ];
    const timers = timings.map(([p, t]) =>
      setTimeout(() => setPhase(p), t)
    );
    const confettiTimer = setTimeout(() => setConfetti(true), 6000);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(confettiTimer);
    };
  }, []);

  const isShowing = (p: Phase) => {
    const order: Phase[] = ["black", "dot", "title", "name", "subtitle", "celebration", "final"];
    return order.indexOf(phase) >= order.indexOf(p);
  };

  return (
    <div
      className="page-fill grain"
      style={{
        background: "#000",
        overflow: "hidden",
      }}
    >
      {phase !== "black" && phase !== "dot" && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 100% 80% at 50% 50%, #0a0604 0%, #000 100%)",
          }}
        />
      )}

      {/* Fireworks */}
      <Fireworks active={isShowing("celebration")} />
      <Confetti active={confetti} origin={{ x: 0.5, y: 0.3 }} />

      {/* Floating hearts in final phase */}
      {isShowing("final") && (
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {[...Array(16)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: "absolute",
                left: `${5 + i * 6}%`,
                bottom: "5%",
                fontSize: `${14 + (i % 4) * 6}px`,
                color: ["#c9a96e", "#c4889a", "#e8d5b7", "#fff"][i % 4],
              }}
              animate={{ opacity: [0, 0.8, 0], y: [-20, -200] }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: (i * 0.3) % 3,
                repeat: Infinity,
                repeatDelay: Math.random() * 2,
              }}
            >
              ♡
            </motion.div>
          ))}
        </div>
      )}

      <div className="relative z-20 flex flex-col items-center justify-center gap-6 px-8 text-center w-full h-full">
        {/* Glowing dot */}
        <AnimatePresence>
          {phase === "dot" && (
            <motion.div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#c9a96e",
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1, 2, 1],
                opacity: [0, 1, 1, 1],
                boxShadow: [
                  "0 0 0px rgba(201,169,110,0)",
                  "0 0 30px rgba(201,169,110,0.6)",
                  "0 0 60px rgba(201,169,110,0.8)",
                  "0 0 30px rgba(201,169,110,0.5)",
                ],
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 1.2 }}
            />
          )}
        </AnimatePresence>

        {/* Main content */}
        {isShowing("title") && (
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            {/* HAPPY BIRTHDAY */}
            <motion.div
              className="font-serif text-center"
              style={{
                fontSize: "clamp(14px, 4vw, 20px)",
                letterSpacing: "0.3em",
                color: "#c9a96e88",
                fontWeight: 400,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              HAPPY 26TH BIRTHDAY
            </motion.div>

            {/* HER NAME */}
            {isShowing("name") && (
              <motion.div
                className="font-serif shimmer-text"
                style={{
                  fontSize: "clamp(48px, 14vw, 100px)",
                  fontWeight: 700,
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, type: "spring", stiffness: 80 }}
              >
                {birthdayConfig.name}
              </motion.div>
            )}

            {/* Subtitle */}
            {isShowing("subtitle") && (
              <motion.p
                className="font-serif italic"
                style={{
                  fontSize: "clamp(16px, 4.5vw, 22px)",
                  color: "#e8d5b7",
                  lineHeight: 1.5,
                  maxWidth: 360,
                }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
              >
                You are one of the best things
                <br />that ever happened to me.
              </motion.p>
            )}
          </motion.div>
        )}

        {/* Final message */}
        {isShowing("final") && (
          <motion.div
            className="flex flex-col items-center gap-5 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            <div
              style={{
                height: 1,
                width: 60,
                background: "rgba(201,169,110,0.3)",
              }}
            />
            <div className="flex flex-col gap-2 text-center">
              {[
                "26 pages.",
                "26 reasons.",
                "Countless memories.",
                "And somehow…",
              ].map((line, i) => (
                <motion.p
                  key={i}
                  className="font-serif"
                  style={{
                    fontSize: i === 3 ? "clamp(16px, 4.5vw, 20px)" : "clamp(13px, 3.5vw, 16px)",
                    color: i < 3 ? "#c9a96e88" : "#e8d5b7",
                    fontStyle: i === 3 ? "italic" : "normal",
                    letterSpacing: i === 3 ? "0.02em" : "0.06em",
                    lineHeight: 1.4,
                  }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.25 }}
                >
                  {line}
                </motion.p>
              ))}
              <motion.p
                className="font-serif italic"
                style={{
                  fontSize: "clamp(18px, 5vw, 24px)",
                  color: "#f0ebe0",
                  lineHeight: 1.4,
                }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
              >
                I still want forever to choose and make 
                <br />more memories with you. ❤️
              </motion.p>
            </div>

            {/* Buttons */}
            <motion.div
              className="flex flex-col items-center gap-3 w-full mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              <button
                onClick={onRestart}
                className="w-full max-w-xs py-4 rounded-full font-sans text-sm font-medium"
                style={{
                  background: "rgba(201,169,110,0.15)",
                  border: "1px solid rgba(201,169,110,0.4)",
                  color: "#e8d5b7",
                  cursor: "pointer",
                  letterSpacing: "0.06em",
                }}
              >
                ↩ Replay from the beginning
              </button>
              <button
                style={{
                  background: "transparent",
                  border: "none",
                  color: "rgba(201,169,110,0.45)",
                  cursor: "pointer",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  letterSpacing: "0.06em",
                }}
              >
                Keep this little universe ♡
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      {isShowing("final") && (
        <motion.div
          className="absolute bottom-4 left-0 right-0 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
        >
          <p
            className="font-mono text-xs"
            style={{ color: "rgba(201,169,110,0.3)", letterSpacing: "0.06em", lineHeight: 1.8 }}
          >
            Built with ❤️, too much coffee, and Sleep Deprived Eyes.
            <br />
            You are 26 Babe
          </p>
        </motion.div>
      )}
    </div>
  );
}
