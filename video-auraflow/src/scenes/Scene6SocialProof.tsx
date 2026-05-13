import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CAd as C, FONT, SP_SNAP } from "../constants";
import { SliceReveal } from "../components/SliceReveal";

const CHIPS = [
  { text: "⭐⭐⭐⭐⭐  +40% de ventes — Sarah B.", frame: 40 },
  { text: "⭐⭐⭐⭐⭐  Mes clients adorent — Marc L.", frame: 70 },
  { text: "⭐⭐⭐⭐⭐  ROI en 2 semaines — Julie K.", frame: 100 },
];

export const Scene6SocialProof: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{
      background: C.bg,
      backgroundImage: `radial-gradient(rgba(124,58,237,0.12) 1px, transparent 1px)`,
      backgroundSize: "32px 32px",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32,
    }}>
      <SliceReveal text="Ils ont rejoint AuraFlow AI" startFrame={8} fontSize={52} color={C.white} fontWeight={900} />
      <div style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "center" }}>
        {CHIPS.map((c, i) => {
          const chipY = spring({ fps, frame: Math.max(0, frame - c.frame), config: SP_SNAP, from: 60, to: 0 });
          const chipOp = interpolate(frame, [c.frame, c.frame + 10], [0, 1], { extrapolateRight: "clamp" });
          return (
            <div key={i} style={{
              opacity: chipOp, transform: `translateY(${chipY}px)`,
              background: "#fff", color: "#18181b",
              borderRadius: 50, padding: "14px 28px",
              fontSize: 22, fontFamily: FONT.sans, fontWeight: 600,
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              whiteSpace: "nowrap",
            }}>{c.text}</div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
