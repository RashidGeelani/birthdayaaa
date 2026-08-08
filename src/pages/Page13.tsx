import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { birthdayConfig } from "../birthday.config";

interface Props {
  onNext: () => void;
}

export default function Page13({ onNext }: Props) {
  const pairs = birthdayConfig.thisOrThat;
  const [choices, setChoices] = useState<(string | null)[]>(
    new Array(pairs.length).fill(null)
  );
  const [reactions, setReactions] = useState<(string | null)[]>(
    new Array(pairs.length).fill(null)
  );
  const [allDone, setAllDone] = useState(false);

  const choose = (pairIndex: number, side: "a" | "b") => {
    if (choices[pairIndex] !== null) return;
    const newChoices = [...choices];
    newChoices[pairIndex] = side;
    setChoices(newChoices);

    const newReactions = [...reactions];
    newReactions[pairIndex] = pairs[pairIndex].response;
    setReactions(newReactions);

    if (newChoices.every((c) => c !== null)) {
      setTimeout(() => setAllDone(true), 1200);
    }
  };

  return (
    <div
      className="page-fill grain"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 40%, #100810 0%, #0a0908 100%)",
        overflowY: "auto",
        justifyContent: "flex-start",
        paddingTop: "80px",
        paddingBottom: "60px",
      }}
    >
      <div className="w-full max-w-sm mx-auto px-6 flex flex-col gap-5">
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div
            className="font-mono text-xs mb-2"
            style={{ color: "#c9a96e88", letterSpacing: "0.12em" }}
          >
            THIS OR THAT
          </div>
          <h2
            className="font-serif"
            style={{ fontSize: "clamp(20px, 5vw, 28px)", color: "#f0ebe0" }}
          >
            Choose.
          </h2>
        </motion.div>

        {pairs.map((pair, i) => (
          <motion.div
            key={i}
            className="w-full"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.12 }}
          >
            <div className="flex gap-3 w-full">
              {(["a", "b"] as const).map((side) => {
                const chosen = choices[i];
                const isChosen = chosen === side;
                const isOther = chosen !== null && chosen !== side;
                return (
                  <motion.button
                    key={side}
                    onClick={() => choose(i, side)}
                    disabled={chosen !== null}
                    className="flex-1 py-4 rounded-xl font-sans text-sm font-medium transition-all duration-300"
                    style={{
                      background: isChosen
                        ? "rgba(201,169,110,0.2)"
                        : isOther
                        ? "rgba(240,235,224,0.03)"
                        : "rgba(201,169,110,0.07)",
                      border: isChosen
                        ? "1px solid rgba(201,169,110,0.6)"
                        : "1px solid rgba(201,169,110,0.2)",
                      color: isOther ? "#f0ebe033" : "#e8d5b7",
                      cursor: chosen !== null ? "default" : "pointer",
                      letterSpacing: "0.02em",
                    }}
                    whileHover={chosen === null ? { scale: 1.03 } : {}}
                    whileTap={chosen === null ? { scale: 0.96 } : {}}
                  >
                    {side === "a" ? pair.a : pair.b}
                  </motion.button>
                );
              })}
            </div>
            <AnimatePresence>
              {reactions[i] && (
                <motion.p
                  className="font-serif italic text-center mt-2"
                  style={{
                    fontSize: 12,
                    color: "#c9a96e88",
                    lineHeight: 1.4,
                  }}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {reactions[i]}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        ))}

        <AnimatePresence>
          {allDone && (
            <motion.div
              className="flex flex-col items-center gap-4 mt-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p
                className="font-serif italic text-center"
                style={{
                  fontSize: "clamp(16px, 4vw, 20px)",
                  color: "#e8d5b7",
                  lineHeight: 1.5,
                }}
              >
                Apparently, I just like everything
                <br />that includes you.
              </p>
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
                whileHover={{ color: "#c9a96e" }}
              >
                Next →
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
