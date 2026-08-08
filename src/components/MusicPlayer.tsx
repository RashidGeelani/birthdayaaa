import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  src: string;
  enabled: boolean;
}

export default function MusicPlayer({ src, enabled }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, [src]);

  useEffect(() => {
    if (enabled) {
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, [enabled]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      fadeVolume(audio, audio.volume, 0, 800, () => audio.pause());
      setPlaying(false);
    } else {
      audio.play().catch(() => {});
      fadeVolume(audio, 0, 0.6, 1200);
      setPlaying(true);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (muted) {
      audio.muted = false;
      setMuted(false);
    } else {
      audio.muted = true;
      setMuted(true);
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-5 right-5 z-50 flex items-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={toggleMute}
            className="w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200"
            style={{
              background: "rgba(10,9,8,0.6)",
              border: "1px solid rgba(201,169,110,0.25)",
              color: muted ? "rgba(240,235,224,0.3)" : "#c9a96e",
              backdropFilter: "blur(8px)",
            }}
            title={muted ? "Unmute" : "Mute"}
          >
            <span style={{ fontSize: 12 }}>{muted ? "🔇" : "🔊"}</span>
          </button>
          <button
            onClick={togglePlay}
            className="w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200"
            style={{
              background: playing
                ? "rgba(201,169,110,0.15)"
                : "rgba(10,9,8,0.6)",
              border: "1px solid rgba(201,169,110,0.4)",
              color: "#c9a96e",
              backdropFilter: "blur(8px)",
            }}
            title={playing ? "Pause" : "Play music"}
          >
            <span style={{ fontSize: 11 }}>{playing ? "❚❚" : "▶"}</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function fadeVolume(
  audio: HTMLAudioElement,
  from: number,
  to: number,
  duration: number,
  onComplete?: () => void
) {
  const steps = 30;
  const stepTime = duration / steps;
  const delta = (to - from) / steps;
  let current = from;
  let step = 0;
  const interval = setInterval(() => {
    current += delta;
    step++;
    audio.volume = Math.max(0, Math.min(1, current));
    if (step >= steps) {
      clearInterval(interval);
      onComplete?.();
    }
  }, stepTime);
}
