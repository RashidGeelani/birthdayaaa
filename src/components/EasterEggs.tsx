import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { birthdayConfig } from "../birthday.config";

interface Props {
  onCompliment: (msg: string) => void;
}

export default function EasterEggs({ onCompliment }: Props) {
  const [konamiStep, setKonamiStep] = useState(0);
  const [typedBuffer, setTypedBuffer] = useState("");
  const [loveEgg, setLoveEgg] = useState(false);
  const [gitMessage, setGitMessage] = useState(false);

  // "love" keyboard sequence easter egg
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const next = (typedBuffer + e.key.toLowerCase()).slice(-4);
      setTypedBuffer(next);
      if (next === "love") {
        setLoveEgg(true);
        setTimeout(() => setLoveEgg(false), 3500);
        setTypedBuffer("");
      }
      // secret "git" sequence
      if ((typedBuffer + e.key.toLowerCase()).slice(-3) === "git") {
        setGitMessage(true);
        setTimeout(() => setGitMessage(false), 3000);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [typedBuffer]);

  // Device shake easter egg
  const shakeThreshold = 15;
  const lastShake = useCallback(() => {
    const compliment =
      birthdayConfig.compliments[
        Math.floor(Math.random() * birthdayConfig.compliments.length)
      ];
    onCompliment(compliment);
  }, [onCompliment]);

  useEffect(() => {
    let lastAcc = { x: 0, y: 0, z: 0 };
    let lastTime = 0;
    const onMotion = (e: DeviceMotionEvent) => {
      const acc = e.accelerationIncludingGravity;
      if (!acc) return;
      const now = Date.now();
      if (now - lastTime < 1000) return;
      const dx = Math.abs((acc.x || 0) - lastAcc.x);
      const dy = Math.abs((acc.y || 0) - lastAcc.y);
      const dz = Math.abs((acc.z || 0) - lastAcc.z);
      if (dx + dy + dz > shakeThreshold) {
        lastShake();
        lastTime = now;
      }
      lastAcc = { x: acc.x || 0, y: acc.y || 0, z: acc.z || 0 };
    };
    window.addEventListener("devicemotion", onMotion);
    return () => window.removeEventListener("devicemotion", onMotion);
  }, [lastShake]);

  return (
    <>
      <AnimatePresence>
        {loveEgg && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-[300] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="text-center"
              style={{ color: "#c4889a" }}
            >
              <div style={{ fontSize: 80 }}>♡</div>
              <div
                className="font-serif italic mt-2"
                style={{ fontSize: 18, color: "#e8d5b7" }}
              >
                You found the love egg.
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {gitMessage && (
          <motion.div
            className="fixed bottom-16 left-5 z-[300] font-mono text-xs px-3 py-2 rounded"
            style={{
              background: "rgba(10,9,8,0.95)",
              border: "1px solid rgba(201,169,110,0.3)",
              color: "#c9a96e",
            }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
          >
            $ git commit -m "I choose you" ❤️
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
