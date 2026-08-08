import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { birthdayConfig } from "../birthday.config";

interface Props {
  onNext: () => void;
}

export default function Page22({ onNext }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const paragraphs = birthdayConfig.birthdayLetter
    .split("\n\n")
    .filter((p) => p.trim() !== "");

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => {
      const p = el.scrollTop / (el.scrollHeight - el.clientHeight);
      setScrollProgress(Math.max(0, Math.min(1, p)));
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="page-fill"
      style={{
        background: "#100d08",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* Progress line */}
      <div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: "3px",
          height: "100%",
          background: "rgba(201,169,110,0.1)",
          zIndex: 30,
        }}
      >
        <div
          style={{
            width: "100%",
            height: `${scrollProgress * 100}%`,
            background: "linear-gradient(to bottom, #c9a96e, #c4889a)",
            transition: "height 0.1s",
          }}
        />
      </div>

      {/* Intro */}
      <motion.div
        className="text-center px-8 py-8 flex-shrink-0"
        style={{ zIndex: 10 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p
          className="font-serif italic"
          style={{
            fontSize: "clamp(16px, 4.5vw, 22px)",
            color: "#e8d5b799",
            lineHeight: 1.5,
          }}
        >
          Okay. No jokes for a minute.
        </p>
        <div
          style={{
            width: 40,
            height: 1,
            background: "rgba(201,169,110,0.3)",
            margin: "16px auto 0",
          }}
        />
      </motion.div>

      {/* Scrollable letter */}
      <div
        ref={containerRef}
        className="scrollbar-hide flex-1 overflow-y-auto"
        style={{
          paddingBottom: 80,
        }}
      >
        <div
          className="max-w-sm mx-auto px-8"
          style={{ paddingBottom: 60 }}
        >
          {paragraphs.map((para, i) => (
            <motion.p
              key={i}
              className="font-serif"
              style={{
                fontSize: "clamp(15px, 4vw, 18px)",
                color: "#e8d5b7",
                lineHeight: 1.9,
                marginBottom: "1.8em",
                fontStyle: i === 0 || i === paragraphs.length - 1 ? "italic" : "normal",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i === 0 ? 0.4 : 0 }}
            >
              {para}
            </motion.p>
          ))}

          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div
              style={{
                width: 40,
                height: 1,
                background: "rgba(201,169,110,0.3)",
                margin: "0 auto 24px",
              }}
            />
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
              Continue →
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
