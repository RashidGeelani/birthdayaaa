import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { birthdayConfig } from "../birthday.config";

interface Props {
  onNext: () => void;
}

const GALLERY_COLORS = [
  "linear-gradient(135deg, #1a0e10 0%, #2d1a1e 100%)",
  "linear-gradient(135deg, #0e0c18 0%, #1c1628 100%)",
  "linear-gradient(135deg, #0f1208 0%, #1e2212 100%)",
  "linear-gradient(135deg, #12100a 0%, #261f0e 100%)",
  "linear-gradient(135deg, #0a1018 0%, #0e1c28 100%)",
  "linear-gradient(135deg, #180a12 0%, #2e1422 100%)",
];

export default function Page14({ onNext }: Props) {
  const photos = birthdayConfig.memories;
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % photos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [photos.length]);

  const goTo = (i: number) => {
    setDirection(i > current ? 1 : -1);
    setCurrent(i);
  };

  const photo = photos[current];
  const imageFailed = failedImages[current];

  return (
    <div
      className="page-fill"
      style={{ background: "#050403", overflow: "hidden" }}
    >
      {/* Full-bleed image */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          className="absolute inset-0"
          custom={direction}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {photo.image && !imageFailed ? (
            <div
              style={{
                position: "absolute",
                inset: 0,
                overflow: "hidden",
              }}
            >
              <motion.img
                src={photo.image}
                alt={photo.caption}
                onError={() =>
                  setFailedImages((prev) => ({ ...prev, [current]: true }))
                }
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                animate={{ scale: [1, 1.08] }}
                transition={{ duration: 6, ease: "linear" }}
              />
            </div>
          ) : (
            /* Placeholder with Ken Burns (fallback when no image or load fails) */
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: GALLERY_COLORS[current % GALLERY_COLORS.length],
                overflow: "hidden",
              }}
            >
              <motion.div
                style={{
                  position: "absolute",
                  inset: "-5%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 80,
                  color: "rgba(201,169,110,0.12)",
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic",
                }}
                animate={{ scale: [1, 1.05], x: [-10, 10] }}
                transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
              >
                📷
              </motion.div>
            </div>
          )}

          {/* Dark overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(5,4,3,0.9) 0%, rgba(5,4,3,0.2) 50%, rgba(5,4,3,0.4) 100%)",
            }}
          />

          {/* Caption */}
          <div
            style={{
              position: "absolute",
              bottom: 80,
              left: 0,
              right: 0,
              padding: "0 32px",
              textAlign: "center",
            }}
          >
            <motion.p
              className="font-serif italic"
              style={{
                fontSize: "clamp(18px, 5vw, 26px)",
                color: "#f0ebe0",
                lineHeight: 1.4,
                marginBottom: 8,
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {photo.caption}
            </motion.p>
            {photo.date && (
              <motion.p
                className="font-mono text-xs"
                style={{ color: "#c9a96e77", letterSpacing: "0.1em" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {photo.date}
              </motion.p>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots navigation */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 8,
          zIndex: 20,
        }}
      >
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: i === current ? 20 : 6,
              height: 6,
              borderRadius: 3,
              background:
                i === current ? "#c9a96e" : "rgba(201,169,110,0.3)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s",
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* Slide number */}
      <div
        className="absolute top-14 right-5 font-mono text-xs z-20"
        style={{ color: "#c9a96e66", letterSpacing: "0.1em" }}
      >
        {String(current + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
      </div>

      {/* Next page */}
      <button
        onClick={onNext}
        style={{
          position: "absolute",
          top: "50%",
          right: 16,
          transform: "translateY(-50%)",
          background: "rgba(10,9,8,0.6)",
          border: "1px solid rgba(201,169,110,0.2)",
          color: "#c9a96e",
          width: 36,
          height: 36,
          borderRadius: "50%",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(8px)",
          zIndex: 20,
        }}
      >
        →
      </button>
    </div>
  );
}