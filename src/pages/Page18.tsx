import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onNext: () => void;
}

// 8-puzzle: tiles 1-8, 0 = empty
const SOLVED = [1, 2, 3, 4, 5, 6, 7, 8, 0];

function shuffle(arr: number[]): number[] {
  const a = [...arr];
  // Do 200 random valid moves from solved to get a solvable scramble
  let blank = a.indexOf(0);
  for (let i = 0; i < 200; i++) {
    const neighbors = getNeighbors(blank);
    const next = neighbors[Math.floor(Math.random() * neighbors.length)];
    [a[blank], a[next]] = [a[next], a[blank]];
    blank = next;
  }
  return a;
}

function getNeighbors(pos: number): number[] {
  const row = Math.floor(pos / 3);
  const col = pos % 3;
  const n: number[] = [];
  if (row > 0) n.push(pos - 3);
  if (row < 2) n.push(pos + 3);
  if (col > 0) n.push(pos - 1);
  if (col < 2) n.push(pos + 1);
  return n;
}

const TILE_COLORS = [
  "#c9a96e", "#c4889a", "#e8d5b7", "#c9a96e",
  "#c4889a", "#e8d5b7", "#c9a96e", "#c4889a",
];

export default function Page18({ onNext }: Props) {
  const [tiles, setTiles] = useState(() => shuffle(SOLVED));
  const [moves, setMoves] = useState(0);
  const [solved, setSolved] = useState(false);

  const move = useCallback((pos: number) => {
    if (solved) return;
    const blank = tiles.indexOf(0);
    if (!getNeighbors(blank).includes(pos)) return;
    const next = [...tiles];
    [next[blank], next[pos]] = [next[pos], next[blank]];
    setTiles(next);
    setMoves((m) => m + 1);
    if (next.every((v, i) => v === SOLVED[i])) {
      setSolved(true);
    }
  }, [tiles, solved]);

  return (
    <div
      className="page-fill grain"
      style={{
        background:
          "radial-gradient(ellipse 70% 60% at 50% 50%, #0e100c 0%, #0a0908 100%)",
      }}
    >
      <div className="relative z-10 flex flex-col items-center gap-6 px-6 w-full max-w-sm mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div
            className="font-mono text-xs mb-2"
            style={{ color: "#c9a96e88", letterSpacing: "0.12em" }}
          >
            MEMORY PUZZLE
          </div>
          <h2
            className="font-serif"
            style={{ fontSize: "clamp(18px, 5vw, 26px)", color: "#f0ebe0" }}
          >
            {solved ? "You did it. ♡" : "Put the pieces together."}
          </h2>
        </motion.div>

        {/* Puzzle grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 6,
            width: "min(280px, 80vw)",
          }}
        >
          {tiles.map((tile, pos) => (
            <motion.button
              key={pos}
              onClick={() => move(pos)}
              style={{
                aspectRatio: "1",
                borderRadius: 10,
                background:
                  tile === 0
                    ? "transparent"
                    : `linear-gradient(135deg, ${TILE_COLORS[(tile - 1) % TILE_COLORS.length]}22, ${TILE_COLORS[(tile) % TILE_COLORS.length]}33)`,
                border: tile === 0
                  ? "1px dashed rgba(201,169,110,0.1)"
                  : "1px solid rgba(201,169,110,0.25)",
                cursor: tile === 0 ? "default" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#e8d5b7",
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(20px, 6vw, 28px)",
                fontWeight: 600,
                transition: "all 0.15s",
                pointerEvents: tile === 0 ? "none" : "auto",
              }}
              animate={
                solved && tile !== 0
                  ? {
                      background: [
                        "rgba(201,169,110,0.2)",
                        "rgba(201,169,110,0.35)",
                        "rgba(201,169,110,0.2)",
                      ],
                    }
                  : {}
              }
              transition={{ duration: 1, repeat: solved ? Infinity : 0 }}
              whileHover={tile !== 0 ? { scale: 1.05 } : {}}
              whileTap={tile !== 0 ? { scale: 0.95 } : {}}
            >
              {tile !== 0 ? tile : ""}
            </motion.button>
          ))}
        </div>

        {/* Moves counter */}
        {!solved && (
          <p className="font-mono text-xs" style={{ color: "#c9a96e55", letterSpacing: "0.1em" }}>
            {moves} moves
          </p>
        )}

        {/* Solved message */}
        <AnimatePresence>
          {solved && (
            <motion.div
              className="flex flex-col items-center gap-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 150 }}
            >
              <p
                className="font-serif italic"
                style={{
                  fontSize: "clamp(16px, 4.5vw, 20px)",
                  color: "#e8d5b7",
                  lineHeight: 1.4,
                }}
              >
                You always figure it out. ♡
              </p>
              <p className="font-mono text-xs" style={{ color: "#c9a96e77" }}>
                {moves} moves
              </p>
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                whileHover={{ color: "#c9a96e" }}
              >
                Continue →
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
