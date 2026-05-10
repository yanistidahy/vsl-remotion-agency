export const COLORS = {
  primary: "#7c3aed",
  secondary: "#4f46e5",
  gradient: "linear-gradient(135deg, #7c3aed, #4f46e5)",
  white: "#ffffff",
  dark: "#0a0a0f",
  gray: "#f4f4f5",
  grayDark: "#e4e4e7",
  text: "#18181b",
  textMuted: "#71717a",
  bubbleBot: "#f4f4f5",
  bubbleUser: "#7c3aed",
};

export const FONTS = {
  family: "'Inter', 'Helvetica Neue', sans-serif",
};

// Scene timings in frames (30fps)
export const SCENES = {
  intro: { start: 0, duration: 150 },        // 0-5s
  browse: { start: 150, duration: 210 },      // 5-12s
  bubble: { start: 360, duration: 120 },      // 12-16s
  openChat: { start: 480, duration: 120 },    // 16-20s
  clientTypes: { start: 600, duration: 240 }, // 20-28s
  product: { start: 840, duration: 300 },     // 28-38s
  outro: { start: 1140, duration: 210 },      // 38-45s
};
