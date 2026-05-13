import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT, SP_SNAP } from "../constants";

const CARDS = [
  { icon: "🤖", title: "IA Conversationnelle", frame: 20 },
  { icon: "🧠", title: "Mémoire Client", frame: 38 },
  { icon: "📦", title: "Catalogue complet", frame: 56 },
  { icon: "⚡", title: "Setup en 48h", frame: 74 },
];

export const Scene7Features: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const glowPulse = frame >= 120 ? 0.5 + 0.5 * Math.sin((frame - 120) / 18) : 0;

  return (
    <AbsoluteFill style={{ background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24 }}>
      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, position: "relative" }}>
        {/* Glow behind grid */}
        <div style={{ position: "absolute", inset: -60, background: `radial-gradient(ellipse, rgba(124,58,237,${(0.2 * glowPulse).toFixed(2)}) 0%, transparent 70%)`, pointerEvents: "none", borderRadius: "50%" }} />
        {CARDS.map((c, i) => {
          const sc = spring({ fps, frame: Math.max(0, frame - c.frame), config: SP_SNAP, from: 0, to: 1 });
          const op = interpolate(frame, [c.frame, c.frame + 8], [0, 1], { extrapolateRight: "clamp" });
          return (
            <div key={i} style={{
              width: 220, height: 220, opacity: op, transform: `scale(${sc})`,
              background: "rgba(255,255,255,0.05)",
              border: `1px solid ${C.purple}55`,
              borderRadius: 20,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12,
              boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              fontFamily: FONT.sans,
            }}>
              <span style={{ fontSize: 44 }}>{c.icon}</span>
              <span style={{ fontSize: 22, fontWeight: 800, color: C.white, textAlign: "center", padding: "0 12px", letterSpacing: "-0.5px" }}>{c.title}</span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
