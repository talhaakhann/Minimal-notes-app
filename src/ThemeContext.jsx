import { createContext, useContext, useState, useEffect, useRef } from "react";

const COLORS = [
  { name: "slate",   hex: "#64748b" },
  { name: "gray",    hex: "#6b7280" },
  { name: "zinc",    hex: "#71717a" },
  { name: "neutral", hex: "#737373" },
  { name: "stone",   hex: "#78716c" },
  { name: "red",     hex: "#ef4444" },
  { name: "orange",  hex: "#f97316" },
  { name: "amber",   hex: "#f59e0b" },
  { name: "yellow",  hex: "#eab308" },
  { name: "lime",    hex: "#84cc16" },
  { name: "green",   hex: "#22c55e" },
  { name: "emerald", hex: "#10b981" },
  { name: "teal",    hex: "#14b8a6" },
  { name: "cyan",    hex: "#06b6d4" },
  { name: "sky",     hex: "#0ea5e9" },
  { name: "blue",    hex: "#3b82f6" },
  { name: "indigo",  hex: "#6366f1" },
  { name: "violet",  hex: "#8b5cf6" },
  { name: "purple",  hex: "#a855f7" },
  { name: "fuchsia", hex: "#d946ef" },
  { name: "pink",    hex: "#ec4899" },
  { name: "rose",    hex: "#f43f5e" },
];

// Fisher-Yates shuffle — truly random order of all items
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildQueue(excludeIndex) {
  return shuffle(COLORS.map((_, i) => i).filter(i => i !== excludeIndex));
}

function hexRgb(hex) {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}

function tint(hex, t) {
  const { r, g, b } = hexRgb(hex);
  return `rgb(${~~(r + (255 - r) * t)},${~~(g + (255 - g) * t)},${~~(b + (255 - b) * t)})`;
}

function shade(hex, t) {
  const { r, g, b } = hexRgb(hex);
  return `rgb(${~~(r * t)},${~~(g * t)},${~~(b * t)})`;
}

function buildTheme(hex) {
  return {
    bodyBg:   tint(hex, 0.82),
    cardBg:   tint(hex, 0.91),
    border:   shade(hex, 0.38),
    accent:   hex,
    textMain: shade(hex, 0.28),
    textSub:  shade(hex, 0.45),
    btnBg:    shade(hex, 0.45),
  };
}

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [colorIndex, setColorIndex] = useState(8); // default: blue
  console.log(colorIndex);
  

  // Queue holds all 22 indexes shuffled — cycles through every one before repeating
  const queueRef = useRef(buildQueue(15));
  const posRef   = useRef(0);

  const current = COLORS[colorIndex];
  const theme   = buildTheme(current.hex);

  // Apply CSS variables to <html> whenever color changes
  useEffect(() => {
    const root = document.documentElement.style;
    root.setProperty("--body-bg",   theme.bodyBg);
    root.setProperty("--card-bg",   theme.cardBg);
    root.setProperty("--border",    theme.border);
    root.setProperty("--accent",    theme.accent);
    root.setProperty("--text-main", theme.textMain);
    root.setProperty("--text-sub",  theme.textSub);
    root.setProperty("--btn-bg",    theme.btnBg);
  }, [colorIndex]);

  function randomize() {
    // Reshuffle once the full queue is exhausted
    if (posRef.current >= queueRef.current.length) {
      queueRef.current = buildQueue(colorIndex);
      posRef.current   = 0;
    }

    const next = queueRef.current[posRef.current];
    posRef.current += 1;
    setColorIndex(next);
  }

  return (
    <ThemeContext.Provider value={{ theme, current, COLORS, colorIndex, setColorIndex, randomize }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}