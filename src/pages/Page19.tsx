import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { birthdayConfig } from "../birthday.config";

interface Props {
  onNext: () => void;
}

const BIRTH_DATE = new Date(2000, 7, 9, 4, 28, 0); // Aug 9, 2000, 4:28 AM

function getAgeParts(now: Date) {
  let diffMs = now.getTime() - BIRTH_DATE.getTime();
  if (diffMs < 0) diffMs = 0;

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}

export default function Page19({ onNext }: Props) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const timeStr = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const { days, hours, minutes, seconds } = getAgeParts(time);

  const FORECAST = [
    { day: "Today", icon: "♡", desc: "Birthday. 100% chance of being loved." },
    { day: "Tonight", icon: "✦", desc: "More birthday. Clear skies." },
    { day: "Tomorrow", icon: "∞", desc: "Still my favourite person." },
  ];

  return (
    <div
      className="page-fill grain"
      style={{
        background:
          "radial-gradient(ellipse 80% 80% at 50% 20%, #050a18 0%, #0a0908 100%)",
        justifyContent: "flex-start",
        paddingTop: "70px",
        paddingBottom: "50px",
        overflowY: "auto",
      }}
    >
      <div className="relative z-10 w-full max-w-sm mx-auto px-5 flex flex-col gap-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-1"
        >
          <div
            className="font-mono text-xs"
            style={{ color: "#c9a96e77", letterSpacing: "0.12em" }}
          >
            WEATHER
          </div>
          <div
            className="font-serif"
            style={{ fontSize: "clamp(22px, 6vw, 32px)", color: "#f0ebe0" }}
          >
            Wherever you are ❤️
          </div>
          <div className="font-mono text-xs" style={{ color: "#c9a96e88" }}>
            {time.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} · {timeStr}
          </div>
        </motion.div>

        {/* Main age counter card */}
        <motion.div
          className="rounded-2xl p-6 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(201,169,110,0.12) 0%, rgba(107,30,46,0.1) 100%)",
            border: "1px solid rgba(201,169,110,0.2)",
          }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Floating hearts as weather effect */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: "absolute",
                right: `${10 + i * 8}%`,
                bottom: "10%",
                fontSize: 16 + i * 4,
                color: "rgba(196,136,154,0.3)",
                pointerEvents: "none",
              }}
              animate={{ y: [-5, -30, -5], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.6 }}
            >
              ♡
            </motion.div>
          ))}

          <div className="relative z-10">
            <div
              className="font-mono text-xs mb-1"
              style={{ color: "#c9a96e77", letterSpacing: "0.1em" }}
            >
              DAYS ON EARTH
            </div>
            <div
              className="font-serif"
              style={{
                fontSize: "clamp(48px, 15vw, 80px)",
                color: "#c9a96e",
                fontWeight: 600,
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              {days.toLocaleString()}
            </div>
            <div
              className="font-mono"
              style={{
                fontSize: "clamp(16px, 4.5vw, 22px)",
                color: "#e8d5b7",
                marginTop: 8,
                letterSpacing: "0.02em",
              }}
            >
              {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </div>
            <div
              className="font-mono text-xs mt-2"
              style={{ color: "#c9a96e77", letterSpacing: "0.06em" }}
            >
              hours : minutes : seconds
            </div>
            <div
              className="font-mono text-xs mt-3"
              style={{ color: "#c9a96e55", letterSpacing: "0.06em" }}
            >
              Since 4:28 AM · Aug 9, 2000
            </div>
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="grid grid-cols-3 gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[
            { label: "Happiness", value: "100%" },
            { label: "Love", value: "∞" },
            { label: "Birthday", value: "✓" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl p-3 text-center"
              style={{
                background: "rgba(201,169,110,0.07)",
                border: "1px solid rgba(201,169,110,0.15)",
              }}
            >
              <div
                className="font-serif"
                style={{ fontSize: "clamp(16px, 4vw, 20px)", color: "#c9a96e" }}
              >
                {stat.value}
              </div>
              <div
                className="font-mono text-xs mt-1"
                style={{ color: "#c9a96e55", letterSpacing: "0.06em" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Forecast */}
        <motion.div
          className="rounded-2xl overflow-hidden"
          style={{
            border: "1px solid rgba(201,169,110,0.15)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {FORECAST.map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4"
              style={{
                borderBottom:
                  i < FORECAST.length - 1
                    ? "1px solid rgba(201,169,110,0.08)"
                    : "none",
                background: "rgba(240,235,224,0.02)",
              }}
            >
              <span style={{ fontSize: 20, color: "#c9a96e" }}>{f.icon}</span>
              <div className="flex-1">
                <div
                  className="font-sans text-sm font-medium"
                  style={{ color: "#e8d5b7" }}
                >
                  {f.day}
                </div>
                <div
                  className="font-mono text-xs"
                  style={{ color: "#c9a96e88", letterSpacing: "0.04em" }}
                >
                  {f.desc}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.button
          onClick={onNext}
          className="text-center font-sans text-sm"
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
    </div>
  );
}