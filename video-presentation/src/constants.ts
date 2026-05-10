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
  teal: "#4a9b8e",
};

export const FONTS = {
  family: "'Helvetica Neue', 'Arial', sans-serif",
  serif: "Georgia, 'Times New Roman', serif",
};

// Scene timings in frames (30fps)
// Total: 1350 frames = 45s
export const SCENES = {
  shopify: { start: 0, duration: 480 },       // 0–16s  (MacBook in + scroll + bubble pulse)
  openChat: { start: 480, duration: 120 },    // 16–20s (cursor → click → chat slides up)
  clientTypes: { start: 600, duration: 240 }, // 20–28s (conversation "Soin cheveux")
  product: { start: 840, duration: 300 },     // 28–38s (recommendation + product card)
  outro: { start: 1140, duration: 210 },      // 38–45s (AuraFlow logo outro)
};
