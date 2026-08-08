import { motion } from "framer-motion";
import { birthdayConfig } from "../birthday.config";

interface Props {
  onNext: () => void;
}

export default function Page02({ onNext }: Props) {
  return (
    <div
      className="page-fill grain"
      style={{
        background:
          "radial-gradient(ellipse 70% 50% at 50% 60%, #1a1008 0%, #0a0908 100%)",
      }}
    >
      {/* Radial gold glow behind the number */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(201,169,110,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center gap-8 px-8 text-center">
        <motion.div
          className="font-serif number-glow"
          style={{
            fontSize: "clamp(120px, 30vw, 220px)",
            lineHeight: 1,
            color: "#c9a96e",
            fontWeight: 600,
            letterSpacing: "-0.02em",
          }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {birthdayConfig.age}
        </motion.div>

        <motion.p
          className="font-serif italic"
          style={{
            fontSize: "clamp(16px, 4vw, 22px)",
            color: "#e8d5b7",
            lineHeight: 1.5,
            maxWidth: 380,
          }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Today, my favourite person turns {birthdayConfig.age}.
        </motion.p>

        <motion.button
          onClick={onNext}
          className="font-sans text-sm font-medium transition-all duration-300"
          style={{
            color: "rgba(201,169,110,0.7)",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            letterSpacing: "0.06em",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          whileHover={{ color: "#c9a96e", scale: 1.03 }}
        >
          Wait… there's more. →
        </motion.button>
      </div>

      {/* Orbiting dots */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: 3,
            height: 3,
            borderRadius: "50%",
            background: "#c9a96e",
            top: "50%",
            left: "50%",
            originX: "0%",
            originY: "0%",
          }}
          animate={{
            rotate: [0 + i * 60, 360 + i * 60],
            x: [
              Math.cos((i * Math.PI) / 3) * 180,
              Math.cos((i * Math.PI) / 3 + Math.PI * 2) * 180,
            ],
            y: [
              Math.sin((i * Math.PI) / 3) * 100,
              Math.sin((i * Math.PI) / 3 + Math.PI * 2) * 100,
            ],
            opacity: [0.15, 0.5, 0.15],
          }}
          transition={{
            duration: 8 + i * 1.2,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
}
