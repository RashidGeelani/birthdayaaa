import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { birthdayConfig } from "../birthday.config";

interface Props {
  onNext: () => void;
}

export default function Page05({ onNext }: Props) {
  const questions = birthdayConfig.quizQuestions;
  const [qIndex, setQIndex] = useState(0);
  const [reaction, setReaction] = useState<string | null>(null);
  const [answered, setAnswered] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  const handleAnswer = (optionIndex: number) => {
    if (answered.includes(qIndex)) return;
    const r = questions[qIndex].reactions[optionIndex];
    setReaction(r);
    setAnswered((a) => [...a, qIndex]);
    setTimeout(() => {
      setReaction(null);
      if (qIndex < questions.length - 1) {
        setQIndex((i) => i + 1);
      } else {
        setDone(true);
      }
    }, 2200);
  };

  const q = questions[qIndex];

  return (
    <div
      className="page-fill grain"
      style={{
        background:
          "radial-gradient(ellipse 70% 60% at 40% 50%, #100e18 0%, #0a0908 100%)",
      }}
    >
      <div className="relative z-10 flex flex-col items-center gap-6 px-6 w-full max-w-sm mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div
            className="font-mono text-xs mb-2"
            style={{ color: "#c9a96e88", letterSpacing: "0.12em" }}
          >
            THE QUIZ
          </div>
          <h2
            className="font-serif"
            style={{ fontSize: "clamp(18px, 5vw, 26px)", color: "#f0ebe0" }}
          >
            How well do you think I know you?
          </h2>
        </motion.div>

        <div
          className="font-mono text-xs flex gap-2"
          style={{ color: "#c9a96e66" }}
        >
          {questions.map((_, i) => (
            <span
              key={i}
              style={{
                color:
                  i < qIndex
                    ? "#c9a96e"
                    : i === qIndex
                    ? "#c9a96eaa"
                    : "#c9a96e33",
              }}
            >
              ●
            </span>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div
              key={qIndex}
              className="w-full flex flex-col gap-5"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
            >
              <p
                className="font-serif italic"
                style={{
                  fontSize: "clamp(18px, 5vw, 24px)",
                  color: "#e8d5b7",
                  lineHeight: 1.4,
                }}
              >
                {q.question}
              </p>

              <div className="flex flex-col gap-3 w-full">
                {q.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    disabled={answered.includes(qIndex)}
                    className="w-full py-4 rounded-xl font-sans text-sm font-medium transition-all duration-300"
                    style={{
                      background: answered.includes(qIndex)
                        ? "rgba(240,235,224,0.04)"
                        : "rgba(201,169,110,0.08)",
                      border: "1px solid rgba(201,169,110,0.25)",
                      color: answered.includes(qIndex) ? "#f0ebe044" : "#e8d5b7",
                      cursor: answered.includes(qIndex) ? "default" : "pointer",
                      letterSpacing: "0.02em",
                    }}
                    whileHover={
                      !answered.includes(qIndex)
                        ? { scale: 1.02, background: "rgba(201,169,110,0.14)" }
                        : {}
                    }
                    whileTap={!answered.includes(qIndex) ? { scale: 0.97 } : {}}
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>

              <AnimatePresence>
                {reaction && (
                  <motion.div
                    className="font-serif italic text-center"
                    style={{
                      fontSize: "clamp(14px, 4vw, 17px)",
                      color: "#c4889a",
                      lineHeight: 1.5,
                    }}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    {reaction}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="done"
              className="flex flex-col items-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p
                className="font-serif italic"
                style={{
                  fontSize: "clamp(16px, 4vw, 20px)",
                  color: "#e8d5b7",
                  lineHeight: 1.6,
                  textAlign: "center",
                }}
              >
                Apparently, I pay attention. 🤍
              </p>
              <motion.button
                onClick={onNext}
                className="px-8 py-3 rounded-full font-sans text-sm font-medium"
                style={{
                  background: "transparent",
                  border: "1px solid rgba(201,169,110,0.4)",
                  color: "#e8d5b7",
                  cursor: "pointer",
                  letterSpacing: "0.06em",
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
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
