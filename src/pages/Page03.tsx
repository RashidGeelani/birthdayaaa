import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { birthdayConfig } from "../birthday.config";

interface Props {
  onNext: () => void;
}

export default function Page03({ onNext }: Props) {
  const reason = birthdayConfig.reasons[0];
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const [hearts, setHearts] = useState(false);
  const [heartParticles, setHeartParticles] = useState<number[]>([]);

  useEffect(() => {
    let i = 0;
    const t = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < reason.length) {
          setDisplayed(reason.slice(0, i + 1));
          i++;
        } else {
          setDone(true);
          clearInterval(interval);
        }
      }, 35);
      return () => clearInterval(interval);
    }, 800);
    return () => clearTimeout(t);
  }, [reason]);

  useEffect(() => {
    if (!hearts) return;
    const interval = setInterval(() => {
      setHeartParticles((p) => [...p.slice(-20), Date.now()]);
    }, 200);
    return () => clearInterval(interval);
  }, [hearts]);

  return (
    <div
      className="page-fill grain"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 30% 40%, #150b10 0%, #0a0908 100%)",
      }}
    >
      {/* Heart particles */}
      <AnimatePresence>
        {hearts &&
          heartParticles.map((id) => (
            <motion.div
              key={id}
              style={{
                position: "absolute",
                left: `${15 + Math.random() * 70}%`,
                bottom: "10%",
                fontSize: `${16 + Math.random() * 16}px`,
                pointerEvents: "none",
                zIndex: 5,
                "--r": `${(Math.random() - 0.5) * 30}deg`,
              } as React.CSSProperties}
              initial={{ opacity: 0, y: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], y: -150, scale: [0, 1, 0.6] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.5, ease: "easeOut" }}
            >
              {["♡", "❤", "♥"][Math.floor(Math.random() * 3)]}
            </motion.div>
          ))}
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-md mx-auto px-6 flex flex-col items-center gap-8">
        {/* Floating card */}
        <motion.div
          className="w-full rounded-2xl p-8 relative float-anim"
          style={{
            background:
              "linear-gradient(135deg, rgba(30,18,20,0.95) 0%, rgba(20,12,14,0.9) 100%)",
            border: "1px solid rgba(201,169,110,0.2)",
            boxShadow:
              "0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,169,110,0.08)",
            "--r": "-1deg",
          } as React.CSSProperties}
          initial={{ opacity: 0, y: 30, rotateZ: -2 }}
          animate={{ opacity: 1, y: 0, rotateZ: -1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Card number */}
          <div
            className="font-mono text-xs mb-4"
            style={{ color: "#c9a96e88", letterSpacing: "0.12em" }}
          >
            REASON 01
          </div>

          <div
            className="font-serif italic"
            style={{
              fontSize: "clamp(18px, 5vw, 26px)",
              color: "#f0ebe0",
              lineHeight: 1.5,
              minHeight: 80,
            }}
          >
            {displayed}
            {!done && <span className="cursor-blink" style={{ color: "#c9a96e" }}>|</span>}
          </div>

          {/* Decorative line */}
          <div
            style={{
              marginTop: 24,
              height: 1,
              background: "linear-gradient(90deg, #c9a96e44, transparent)",
            }}
          />

          {/* Toggle */}
          <AnimatePresence>
            {done && (
              <motion.div
                className="flex items-center gap-4 mt-5"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <span
                  className="font-mono text-xs"
                  style={{ color: "#c9a96e88", letterSpacing: "0.08em" }}
                >
                  show me something cute
                </span>
                <button
                  onClick={() => setHearts((h) => !h)}
                  style={{
                    width: 44,
                    height: 24,
                    borderRadius: 12,
                    background: hearts ? "rgba(196,136,154,0.4)" : "rgba(240,235,224,0.1)",
                    border: "1px solid rgba(201,169,110,0.3)",
                    transition: "all 0.3s",
                    position: "relative",
                    cursor: "pointer",
                  }}
                >
                  <motion.div
                    style={{
                      position: "absolute",
                      top: 3,
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      background: hearts ? "#c4889a" : "#c9a96e66",
                    }}
                    animate={{ x: hearts ? 22 : 3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Next button */}
        <AnimatePresence>
          {done && (
            <motion.button
              onClick={onNext}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="font-sans text-sm"
              style={{
                color: "rgba(201,169,110,0.6)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                letterSpacing: "0.06em",
              }}
              whileHover={{ color: "#c9a96e" }}
            >
              Next →
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
