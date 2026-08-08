import photo1 from "../assets/photo1.jpeg";
import photo3 from "../assets/photo3.jpeg";
import photo5 from "../assets/photo5.jpeg";
import photo6 from "../assets/photo6.jpeg";
import photo8 from "../assets/photo8.jpeg";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { birthdayConfig } from "../birthday.config";

interface Props {
  onNext: () => void;
}

const EXTRA_MEMORIES = [
  { image: photo1 , caption: "The moment everything clicked.", date: "You remember this one" },
  { image: photo3 , caption: "When we laughed until it hurt.", date: "Worth it" },
  { image: photo5 , caption: "That quiet moment I keep coming back to.", date: "Somewhere" },
  { image: photo6 , caption: "The beginning of something good.", date: "Then" },
  { image: photo8 , caption: "One of my favourite photographs in my head.", date: "Still there" },
];

const allMemories = [...birthdayConfig.memories, ...EXTRA_MEMORIES];

export default function Page04({ onNext }: Props) {
  const [current, setCurrent] = useState<(typeof allMemories)[0] | null>(null);
  const [pulled, setPulled] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [history, setHistory] = useState<typeof allMemories>([]);
  const [imgFailed, setImgFailed] = useState(false);

  const pull = () => {
    const remaining = allMemories.filter((m) => !history.includes(m));
    const pool = remaining.length > 0 ? remaining : allMemories;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    setFlipped(false);
    setCurrent(null);
    setImgFailed(false);
    setTimeout(() => {
      setCurrent(pick);
      setFlipped(true);
      setPulled((p) => p + 1);
      setHistory((h) => [...h, pick]);
    }, 200);
  };

  return (
    <div
      className="page-fill grain"
      style={{
        background:
          "radial-gradient(ellipse 60% 80% at 60% 30%, #0e0c14 0%, #0a0908 100%)",
      }}
    >
      <div className="relative z-10 flex flex-col items-center gap-8 px-6 w-full max-w-sm mx-auto">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div
            className="font-mono text-xs mb-2"
            style={{ color: "#c9a96e88", letterSpacing: "0.12em" }}
          >
            MEMORY MACHINE
          </div>
          <h2
            className="font-serif"
            style={{ fontSize: "clamp(22px, 6vw, 34px)", color: "#f0ebe0" }}
          >
            Pull a memory
          </h2>
        </motion.div>

        {/* Card area */}
        <div style={{ width: "100%", height: 220, perspective: 800 }}>
          <AnimatePresence mode="wait">
            {current ? (
              <motion.div
                key={pulled}
                style={{
                  width: "100%",
                  height: "100%",
                  transformStyle: "preserve-3d",
                  cursor: "pointer",
                }}
                initial={{ rotateY: 180, opacity: 0, scale: 0.9 }}
                animate={{ rotateY: 0, opacity: 1, scale: 1 }}
                exit={{ rotateY: -180, opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <div
                  className="w-full h-full rounded-2xl flex flex-col items-center justify-center p-6 text-center"
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(201,169,110,0.12) 0%, rgba(30,18,14,0.95) 100%)",
                    border: "1px solid rgba(201,169,110,0.25)",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
                  }}
                >
                  {current.image ? (
                    imgFailed ? (
                      <div
                        style={{
                          width: 80,
                          height: 80,
                          borderRadius: 12,
                          background:
                            "linear-gradient(135deg, #c9a96e33, #6b1e2e33)",
                          marginBottom: 16,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 28,
                        }}
                      >
                        📷
                      </div>
                    ) : (
                      <div
                        style={{
                          width: 96,
                          height: 96,
                          borderRadius: 12,
                          overflow: "hidden",
                          marginBottom: 16,
                          border: "1px solid rgba(201,169,110,0.25)",
                          boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
                          flexShrink: 0,
                        }}
                      >
                        <img
                          src={current.image}
                          alt={current.caption}
                          onError={() => setImgFailed(true)}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                      </div>
                    )
                  ) : null}
                  <p
                    className="font-serif italic"
                    style={{
                      fontSize: "clamp(15px, 4vw, 19px)",
                      color: "#f0ebe0",
                      lineHeight: 1.5,
                    }}
                  >
                    "{current.caption}"
                  </p>
                  {current.date && (
                    <p
                      className="font-mono text-xs mt-3"
                      style={{ color: "#c9a96e77", letterSpacing: "0.1em" }}
                    >
                      {current.date}
                    </p>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                className="w-full h-full rounded-2xl flex items-center justify-center"
                style={{
                  border: "1px dashed rgba(201,169,110,0.2)",
                  color: "#c9a96e44",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <span className="font-mono text-sm">Pull one ↓</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-col items-center gap-4 w-full">
          <motion.button
            onClick={pull}
            className="w-full py-4 rounded-full font-sans text-sm font-medium"
            style={{
              background: "rgba(201,169,110,0.12)",
              border: "1px solid rgba(201,169,110,0.4)",
              color: "#e8d5b7",
              cursor: "pointer",
              letterSpacing: "0.06em",
            }}
            whileHover={{ scale: 1.02, background: "rgba(201,169,110,0.18)" }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            [ Pull a memory ]
          </motion.button>

          {pulled >= 3 && (
            <motion.button
              onClick={onNext}
              className="font-sans text-sm"
              style={{
                color: "rgba(201,169,110,0.5)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                letterSpacing: "0.06em",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ color: "#c9a96e" }}
            >
              Continue →
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}