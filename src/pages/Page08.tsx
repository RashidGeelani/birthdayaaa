import { useState } from "react";
import { motion } from "framer-motion";
import { birthdayConfig } from "../birthday.config";

interface Props {
  onNext: () => void;
}

const POLAROID_ROTATIONS = [-4, 2, -2, 5, -3, 1];
const PLACEHOLDER_COLORS = [
  "linear-gradient(135deg, #c9a96e22, #6b1e2e33)",
  "linear-gradient(135deg, #c4889a22, #0e0a1433)",
  "linear-gradient(135deg, #e8d5b722, #c9a96e11)",
  "linear-gradient(135deg, #6b1e2e22, #c9a96e22)",
  "linear-gradient(135deg, #c9a96e11, #c4889a22)",
  "linear-gradient(135deg, #1a1520, #c9a96e15)",
];

export default function Page08({ onNext }: Props) {
  const [active, setActive] = useState<number | null>(null);
  const photos = birthdayConfig.memories;

  return (
    <div
      className="page-fill grain"
      style={{
        background:
          "radial-gradient(ellipse 100% 80% at 50% 50%, #0d0b0a 0%, #0a0908 100%)",
        overflow: "hidden",
      }}
    >
      <motion.div
        className="font-serif text-center"
        style={{
          position: "absolute",
          top: "10%",
          left: 0,
          right: 0,
          fontSize: "clamp(14px, 3.5vw, 17px)",
          color: "#c9a96e77",
          letterSpacing: "0.1em",
          fontStyle: "italic",
          zIndex: 20,
        }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        A few of my favourites
      </motion.div>

      {/* Polaroids */}
      <div className="relative w-full flex items-center justify-center" style={{ height: "70vh" }}>
        {photos.map((photo, i) => {
          const isActive = active === i;
          const baseX = (i - photos.length / 2) * (typeof window !== "undefined" ? Math.min(window.innerWidth * 0.18, 100) : 90);
          const baseY = Math.sin(i * 1.2) * 20;
          const rot = POLAROID_ROTATIONS[i % POLAROID_ROTATIONS.length];

          return (
            <motion.div
              key={i}
              onClick={() => setActive(isActive ? null : i)}
              style={{
                position: "absolute",
                cursor: "pointer",
                zIndex: isActive ? 30 : 10 + i,
              }}
              initial={{ opacity: 0, y: 60, rotate: rot }}
              animate={{
                opacity: 1,
                x: isActive ? 0 : baseX,
                y: isActive ? 0 : baseY,
                rotate: isActive ? 0 : rot,
                scale: isActive ? 1.15 : 1,
                zIndex: isActive ? 30 : 10 + i,
              }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={!isActive ? { y: baseY - 15, scale: 1.06 } : {}}
            >
              {/* Polaroid frame */}
              <div
                style={{
                  background: "#f5f0e8",
                  padding: "10px 10px 28px",
                  borderRadius: 4,
                  boxShadow: isActive
                    ? "0 30px 80px rgba(0,0,0,0.7)"
                    : "0 10px 40px rgba(0,0,0,0.5)",
                  width: isActive ? "min(260px, 70vw)" : "min(160px, 42vw)",
                  transition: "width 0.4s, box-shadow 0.4s",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    paddingBottom: "100%",
                    background: PLACEHOLDER_COLORS[i % PLACEHOLDER_COLORS.length],
                    borderRadius: 2,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {photo.image && !photo.image.includes("placeholder") ? (
                    <img
                      src={photo.image}
                      alt={photo.caption}
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: isActive ? 32 : 20,
                        color: "#c9a96e55",
                      }}
                    >
                      📷
                    </div>
                  )}
                </div>
                {isActive && (
                  <div
                    style={{
                      marginTop: 8,
                      fontFamily: "'Playfair Display', serif",
                      fontStyle: "italic",
                      fontSize: 12,
                      color: "#0a0908aa",
                      textAlign: "center",
                      lineHeight: 1.4,
                    }}
                  >
                    {photo.caption}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.button
        onClick={onNext}
        className="absolute bottom-8 left-0 right-0 mx-auto font-sans text-sm text-center"
        style={{
          color: "rgba(201,169,110,0.55)",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          letterSpacing: "0.06em",
          display: "block",
          width: "fit-content",
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
