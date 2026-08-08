import { useRef } from "react";
import { motion } from "framer-motion";
import { birthdayConfig } from "../birthday.config";

interface Props {
  onNext: () => void;
}

export default function Page20({ onNext }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const timeline = birthdayConfig.timeline;

  return (
    <div
      className="page-fill grain"
      style={{
        background:
          "radial-gradient(ellipse 100% 50% at 50% 50%, #0e0a08 0%, #0a0908 100%)",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <motion.div
        className="text-center mb-6 px-6"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div
          className="font-mono text-xs mb-1"
          style={{ color: "#c9a96e88", letterSpacing: "0.12em" }}
        >
          THE TIME MACHINE
        </div>
        <p
          className="font-serif italic"
          style={{ fontSize: "clamp(14px, 3.5vw, 17px)", color: "#f0ebe077" }}
        >
          Scroll through
        </p>
      </motion.div>

      {/* Horizontal scroll container */}
      <div
        ref={scrollRef}
        className="scrollbar-hide"
        style={{
          display: "flex",
          overflowX: "auto",
          overflowY: "hidden",
          paddingLeft: "20vw",
          paddingRight: "20vw",
          paddingBottom: 20,
          gap: 0,
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {/* Timeline line */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            height: 1,
            background: "rgba(201,169,110,0.12)",
            pointerEvents: "none",
          }}
        />

        {timeline.map((item, i) => {
          const isLast = i === timeline.length - 1;
          const isHighlight = item.label === "Now";

          return (
            <motion.div
              key={i}
              style={{
                minWidth: "max(220px, 55vw)",
                scrollSnapAlign: "center",
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 20,
                padding: "20px 16px",
                position: "relative",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.15 }}
            >
              {/* Node */}
              <motion.div
                style={{
                  width: isHighlight ? 20 : 12,
                  height: isHighlight ? 20 : 12,
                  borderRadius: "50%",
                  background: isHighlight ? "#c9a96e" : "rgba(201,169,110,0.4)",
                  border: `2px solid ${isHighlight ? "#e8d5b7" : "rgba(201,169,110,0.3)"}`,
                  boxShadow: isHighlight ? "0 0 20px rgba(201,169,110,0.5)" : "none",
                  zIndex: 2,
                }}
                animate={
                  isHighlight
                    ? { boxShadow: ["0 0 10px rgba(201,169,110,0.3)", "0 0 30px rgba(201,169,110,0.6)", "0 0 10px rgba(201,169,110,0.3)"] }
                    : {}
                }
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Card */}
              <div
                className="rounded-2xl p-5 text-center w-full"
                style={{
                  background: isHighlight
                    ? "linear-gradient(135deg, rgba(201,169,110,0.15), rgba(107,30,46,0.1))"
                    : "rgba(240,235,224,0.04)",
                  border: `1px solid ${isHighlight ? "rgba(201,169,110,0.35)" : "rgba(201,169,110,0.12)"}`,
                }}
              >
                <div
                  style={{ fontSize: 24, marginBottom: 8 }}
                >
                  {item.icon}
                </div>
                <div
                  className="font-mono text-xs mb-2"
                  style={{
                    color: isHighlight ? "#c9a96e" : "#c9a96e77",
                    letterSpacing: "0.12em",
                  }}
                >
                  {item.label}
                </div>
                <p
                  className="font-serif italic"
                  style={{
                    fontSize: "clamp(13px, 3.5vw, 16px)",
                    color: isHighlight ? "#f0ebe0" : "#e8d5b799",
                    lineHeight: 1.5,
                  }}
                >
                  {item.text}
                </p>
              </div>

              {/* Connector line */}
              {!isLast && (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: 0,
                    width: "50%",
                    height: 1,
                    background: "rgba(201,169,110,0.15)",
                    zIndex: 1,
                  }}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      <motion.button
        onClick={onNext}
        className="text-center font-sans text-sm mt-4"
        style={{
          color: "rgba(201,169,110,0.5)",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          letterSpacing: "0.06em",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ color: "#c9a96e" }}
      >
        Continue →
      </motion.button>
    </div>
  );
}
