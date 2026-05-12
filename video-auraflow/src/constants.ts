export const C = {
  primary: "#7c3aed",
  secondary: "#4f46e5",
  accent: "#a78bfa",
  dark: "#0a0a0f",
  darker: "#06060a",
  white: "#ffffff",
  gray: "#f8f9fa",
  text: "#18181b",
  muted: "#71717a",
  gradient: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
  gradientSoft: "linear-gradient(135deg, #7c3aed22, #4f46e511)",
  red: "#ef4444",
  redBg: "#1a0505",
  gold: "#f59e0b",
};

export const FONT = {
  sans: "'Helvetica Neue', Arial, sans-serif",
  serif: "Georgia, 'Times New Roman', serif",
};

// Scene frame boundaries (all scenes use local frames starting at 0)
export const TOTAL_FRAMES = 3000; // 50s @ 60fps

// Spring presets
export const SPRING_FAST = { damping: 25, stiffness: 300 };
export const SPRING_MEDIUM = { damping: 22, stiffness: 220 };
export const SPRING_GENTLE = { damping: 18, stiffness: 140 };
