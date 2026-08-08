import { motion } from "framer-motion";

interface Props {
  onNext: () => void;
}

const EQUATION_STEPS = [
  { a: "You", op: "+", b: "Me" },
  { result: "Memories" },
  { result: "Laughs" },
  { result: "Chaos" },
  { result: "More memories" },
  { result: "∞" },
];

export default function Page15({ onNext }: Props) {
  return (
    <div
      className="page-fill grain"
      style={{
        background:
          "radial-gradient(ellipse 60% 80% at 40% 50%, #0a0e14 0%, #0a0908 100%)",
        overflowY: "auto",
        justifyContent: "center",
        paddingTop: "80px",
        paddingBottom: "60px",
      }}
    >
      <div className="relative z-10 w-full max-w-xs mx-auto px-6 flex flex-col items-center gap-2">
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div
            className="font-mono text-xs"
            style={{ color: "#c9a96e88", letterSpacing: "0.12em" }}
          >
            THE LOVE EQUATION
          </div>
        </motion.div>

        {/* Code-style equation */}
        <div
          className="w-full rounded-2xl p-6"
          style={{
            background: "rgba(14,12,10,0.8)",
            border: "1px solid rgba(201,169,110,0.15)",
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          <div className="font-mono text-xs mb-4" style={{ color: "#c9a96e66" }}>
            // love.calculate()
          </div>

          {/* First line */}
          <motion.div
            className="flex items-center gap-3 mb-1"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="font-mono" style={{ fontSize: "clamp(18px, 5vw, 24px)", color: "#c9a96e" }}>
              You
            </span>
            <span className="font-mono" style={{ fontSize: "clamp(14px, 4vw, 18px)", color: "#c9a96e55" }}>
              +
            </span>
            <span className="font-mono" style={{ fontSize: "clamp(18px, 5vw, 24px)", color: "#c9a96e" }}>
              Me
            </span>
          </motion.div>

          {/* Arrow and results */}
          {["Memories", "Laughs", "Chaos", "More memories"].map((step, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2 pl-4"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.2 }}
            >
              <span className="font-mono text-sm" style={{ color: "#c9a96e44" }}>
                {i === 0 ? "↓" : "→"}
              </span>
              <span
                className="font-mono"
                style={{
                  fontSize: "clamp(14px, 3.5vw, 17px)",
                  color: i === 0 ? "#e8d5b7cc" : "#e8d5b777",
                }}
              >
                {step}
              </span>
            </motion.div>
          ))}

          <motion.div
            className="flex items-center gap-2 pl-4 mt-1"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4 }}
          >
            <span className="font-mono text-sm" style={{ color: "#c9a96e44" }}>→</span>
            <span
              className="font-serif number-glow"
              style={{ fontSize: "clamp(24px, 6vw, 36px)", color: "#c9a96e", fontStyle: "italic" }}
            >
              ∞
            </span>
          </motion.div>

          {/* Divider */}
          <motion.div
            style={{
              height: 1,
              background: "rgba(201,169,110,0.2)",
              margin: "16px 0",
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.7, duration: 0.6 }}
          />

          {/* Result */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <div className="font-mono text-xs mb-1" style={{ color: "#c9a96e66" }}>
              // result:
            </div>
            <div
              className="font-serif italic"
              style={{
                fontSize: "clamp(16px, 4vw, 20px)",
                color: "#f0ebe0",
                lineHeight: 1.4,
              }}
            >
              Still choosing you.
            </div>
          </motion.div>
        </div>

        <motion.button
          onClick={onNext}
          className="font-sans text-sm mt-4"
          style={{
            color: "rgba(201,169,110,0.6)",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            letterSpacing: "0.06em",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          whileHover={{ color: "#c9a96e" }}
        >
          Next →
        </motion.button>
      </div>
    </div>
  );
}
