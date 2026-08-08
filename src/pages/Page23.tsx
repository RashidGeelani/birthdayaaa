import { motion } from "framer-motion";
import { birthdayConfig } from "../birthday.config";

interface Props {
  onNext: () => void;
}

export default function Page23({ onNext }: Props) {
  const wishes = birthdayConfig.wishes;

  return (
    <div
      className="page-fill"
      style={{
        background:
          "radial-gradient(ellipse 80% 80% at 50% 0%, #100c08 0%, #0a0908 100%)",
        flexDirection: "column",
        justifyContent: "flex-start",
        overflowY: "auto",
        paddingTop: "70px",
        paddingBottom: "60px",
      }}
    >
      <div className="w-full max-w-sm mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div
            className="font-mono text-xs mb-2"
            style={{ color: "#c9a96e88", letterSpacing: "0.12em" }}
          >
            23 WISHES
          </div>
          <h2
            className="font-serif"
            style={{ fontSize: "clamp(22px, 6vw, 32px)", color: "#f0ebe0" }}
          >
            For your 26th year.
          </h2>
        </motion.div>

        {/* Wish list */}
        <div className="flex flex-col gap-0">
          {wishes.map((wish, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-4 py-4"
              style={{
                borderBottom:
                  i < wishes.length - 1
                    ? "1px solid rgba(201,169,110,0.08)"
                    : "none",
              }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i < 4 ? i * 0.06 : 0 }}
            >
              <span
                className="font-mono text-xs flex-shrink-0 mt-0.5"
                style={{
                  color: "#c9a96e66",
                  letterSpacing: "0.06em",
                  width: 24,
                  textAlign: "right",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p
                className="font-serif italic"
                style={{
                  fontSize: "clamp(14px, 4vw, 17px)",
                  color: "#e8d5b7",
                  lineHeight: 1.5,
                }}
              >
                {wish}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          className="text-center mt-10 flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p
            className="font-serif italic"
            style={{
              fontSize: "clamp(14px, 3.5vw, 17px)",
              color: "#c9a96e77",
            }}
          >
            And everything in between.
          </p>
          <motion.button
            onClick={onNext}
            className="font-sans text-sm"
            style={{
              color: "rgba(201,169,110,0.55)",
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
      </div>
    </div>
  );
}
