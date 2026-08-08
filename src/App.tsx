import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type CSSProperties,
  type JSX,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

import LoadingScreen from "./components/LoadingScreen";
import MusicPlayer from "./components/MusicPlayer";
import ProgressIndicator from "./components/ProgressIndicator";
import EasterEggs from "./components/EasterEggs";

import Page01 from "./pages/Page01";
import Page02 from "./pages/Page02";
import Page03 from "./pages/Page03";
import Page04 from "./pages/Page04";
import Page05 from "./pages/Page05";
import Page06 from "./pages/Page06";
import Page07 from "./pages/Page07";
import Page08 from "./pages/Page08";
import Page09 from "./pages/Page09";
import Page10 from "./pages/Page10";
import Page11 from "./pages/Page11";
import Page12 from "./pages/Page12";
import Page13 from "./pages/Page13";
import Page14 from "./pages/Page14";
import Page15 from "./pages/Page15";
import Page16 from "./pages/Page16";
import Page17 from "./pages/Page17";
import Page18 from "./pages/Page18";
import Page19 from "./pages/Page19";
import Page20 from "./pages/Page20";
import Page21 from "./pages/Page21";
import Page22 from "./pages/Page22";
import Page23 from "./pages/Page23";
import Page24 from "./pages/Page24";
import Page25 from "./pages/Page25";
import Page26 from "./pages/Page26";
import { birthdayConfig } from "./birthday.config";

const TOTAL_PAGES = 26;

const pageVariants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? 40 : -40,
    scale: 0.98,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -40 : 40,
    scale: 0.98,
  }),
};

export default function App() {
  const [phase, setPhase] = useState<"loading" | "experience">("loading");
  const [currentPage, setCurrentPage] = useState(1);
  const [direction, setDirection] = useState(1);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cursor glow (desktop only)
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      setShowCursor(true);
    };
    const onLeave = () => setShowCursor(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const goNext = useCallback(() => {
    if (currentPage < TOTAL_PAGES) {
      setDirection(1);
      setCurrentPage((p) => p + 1);
    }
  }, [currentPage]);

  const goPrev = useCallback(() => {
    if (currentPage > 1) {
      setDirection(-1);
      setCurrentPage((p) => p - 1);
    }
  }, [currentPage]);

  const restart = useCallback(() => {
    setDirection(-1);
    setCurrentPage(1);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (phase !== "experience") return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        goNext();
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, goNext, goPrev]);

  // Touch swipe navigation
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx < 0) goNext();
      else goPrev();
    }
    touchStart.current = null;
  };

  const showToast = (msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3500);
  };

  const renderPage = () => {
    const pages: Record<number, JSX.Element> = {
      1: <Page01 onNext={goNext} />,
      2: <Page02 onNext={goNext} />,
      3: <Page03 onNext={goNext} />,
      4: <Page04 onNext={goNext} />,
      5: <Page05 onNext={goNext} />,
      6: <Page06 onNext={goNext} />,
      7: <Page07 onNext={goNext} />,
      8: <Page08 onNext={goNext} />,
      9: <Page09 onNext={goNext} />,
      10: <Page10 onNext={goNext} />,
      11: <Page11 onNext={goNext} />,
      12: <Page12 onNext={goNext} />,
      13: <Page13 onNext={goNext} />,
      14: <Page14 onNext={goNext} />,
      15: <Page15 onNext={goNext} />,
      16: <Page16 onNext={goNext} />,
      17: <Page17 onNext={goNext} />,
      18: <Page18 onNext={goNext} />,
      19: <Page19 onNext={goNext} />,
      20: <Page20 onNext={goNext} />,
      21: <Page21 onNext={goNext} />,
      22: <Page22 onNext={goNext} />,
      23: <Page23 onNext={goNext} />,
      24: <Page24 onNext={goNext} />,
      25: <Page25 onNext={goNext} />,
      26: <Page26 onRestart={restart} />,
    };
    return pages[currentPage] || null;
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100dvh",
        minHeight: "100dvh",
        background: "#0a0908",
        overflow: "hidden",
        position: "relative",
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Cursor glow (desktop) */}
      {showCursor && (
        <div
          className="cursor-glow"
          style={{
            left: cursorPos.x,
            top: cursorPos.y,
          }}
        />
      )}

      {/* Main content */}
      <AnimatePresence mode="wait" custom={direction}>
        {phase === "loading" ? (
          <motion.div key="loading" style={{ position: "absolute", inset: 0 }}>
            <LoadingScreen
              onEnter={() => setPhase("experience")}
            />
          </motion.div>
        ) : (
          <motion.div
            key={currentPage}
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ position: "absolute", inset: 0 }}
          >
            {renderPage()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress indicator */}
      {phase === "experience" && currentPage < 26 && (
        <ProgressIndicator current={currentPage} total={TOTAL_PAGES} />
      )}

      {/* Music player */}
      <MusicPlayer src={birthdayConfig.music} enabled={phase === "experience"} />

      {/* Easter eggs */}
      <EasterEggs onCompliment={showToast} />

      {/* Nav arrows (desktop, non-scroll pages) */}
      {phase === "experience" && currentPage < 26 && (
        <>
          {currentPage > 1 && (
            <button
              onClick={goPrev}
              style={{
                position: "fixed",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(10,9,8,0.5)",
                border: "1px solid rgba(201,169,110,0.15)",
                color: "rgba(201,169,110,0.5)",
                width: 32,
                height: 32,
                borderRadius: "50%",
                cursor: "pointer",
                zIndex: 40,
                fontSize: 14,
                backdropFilter: "blur(6px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              aria-label="Previous"
            >
              ‹
            </button>
          )}
        </>
      )}

      {/* Toast notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className="fixed top-20 left-0 right-0 flex justify-center z-[200] px-4"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="font-serif italic text-center px-6 py-3 rounded-2xl"
              style={{
                background: "rgba(10,9,8,0.92)",
                border: "1px solid rgba(201,169,110,0.3)",
                color: "#e8d5b7",
                fontSize: "clamp(14px, 3.5vw, 16px)",
                maxWidth: 320,
                backdropFilter: "blur(10px)",
                lineHeight: 1.4,
              }}
            >
              "{toast}"
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
