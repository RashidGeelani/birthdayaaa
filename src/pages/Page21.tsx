import { useState } from "react";
import { motion } from "framer-motion";

interface Props {
  onNext: () => void;
}

export default function Page21({ onNext }: Props) {
  const [acknowledged, setAcknowledged] = useState(false);

  return (
    <div
      className="page-fill grain"
      style={{
        background: "#f4f0e8",
        color: "#0a0908",
      }}
    >
      <div className="relative z-10 w-full max-w-md mx-auto px-6 flex flex-col gap-6">
        {/* Browser-style error */}
        <motion.div
          className="w-full rounded-2xl overflow-hidden"
          style={{
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Title bar */}
          <div
            style={{
              background: "#e8e4dc",
              padding: "10px 16px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              borderBottom: "1px solid #d4cfc5",
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
            <div
              className="font-mono text-xs ml-2"
              style={{ color: "#888", flex: 1 }}
            >
              <span
                style={{
                  background: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: 4,
                  padding: "2px 8px",
                  display: "inline-block",
                }}
              >
                26reasons.love/searching
              </span>
            </div>
          </div>

          {/* Error content */}
          <div
            style={{
              background: "#fff",
              padding: "40px 32px",
              textAlign: "center",
            }}
          >
            <div
              className="font-mono font-bold"
              style={{ fontSize: "clamp(48px, 15vw, 80px)", color: "#0a0908", letterSpacing: "-0.03em" }}
            >
              404
            </div>

            <motion.div
              className="font-mono text-sm font-semibold mt-1 mb-4"
              style={{ color: "#6b7280", letterSpacing: "0.04em" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Page not found.
            </motion.div>

            <motion.div
              className="font-mono text-xs"
              style={{
                color: "#9ca3af",
                lineHeight: 1.8,
                borderTop: "1px solid #f0ede8",
                paddingTop: 16,
                marginTop: 8,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <div>We searched everywhere.</div>
              <div>Checked every page.</div>
              <div>Queried every database.</div>
              <br />
              <div style={{ color: "#0a0908" }}>
                Apparently the only thing missing is you.
              </div>
            </motion.div>

            <motion.div
              className="mt-5 font-mono text-xs"
              style={{
                background: "#f8f5f0",
                border: "1px solid #e8e4dc",
                borderRadius: 8,
                padding: "10px 16px",
                textAlign: "left",
                color: "#9ca3af",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div style={{ color: "#10b981" }}>GET</div>
              <div>Request: /find?person=favourite</div>
              <div>Status: <span style={{ color: "#ef4444" }}>404 Not Found</span></div>
              <div>Solution: <span style={{ color: "#c9a96e" }}>just look left</span></div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <p
            className="font-serif italic"
            style={{
              fontSize: "clamp(14px, 3.5vw, 17px)",
              color: "#6b7280",
              marginBottom: 16,
            }}
          >
            "Okay, that was terrible."
          </p>
          <motion.button
            onClick={onNext}
            className="px-8 py-3 rounded-full font-sans text-sm font-medium"
            style={{
              background: "#0a0908",
              border: "none",
              color: "#f0ebe0",
              cursor: "pointer",
              letterSpacing: "0.06em",
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Continue 😂
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
