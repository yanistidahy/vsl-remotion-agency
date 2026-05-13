import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CAd as C, FONT, SP_SNAP } from "../constants";
import { ChatMockup as ChatMockup } from "../components/ChatMockupAd";

const LABELS = [
  { frame: 40, white: "Répond", purple: "en 2 secondes" },
  { frame: 90, white: "Recommande", purple: "le bon produit" },
  { frame: 140, white: "Conclut", purple: "la vente." },
];

export const Scene4Demo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardSc = spring({ fps, frame, config: { damping: 16, stiffness: 500 }, from: 0, to: 1 });
  const cardOp = interpolate(frame, [0, 6], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 48 }}>
      <div style={{ opacity: cardOp, transform: `scale(${cardSc})` }}>
        <ChatMockup />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "center" }}>
        {LABELS.map((l, i) => {
          const lOp = interpolate(frame, [l.frame, l.frame + 8], [0, 1], { extrapolateRight: "clamp" });
          const lY = spring({ fps, frame: Math.max(0, frame - l.frame), config: SP_SNAP, from: 20, to: 0 });
          return (
            <div key={i} style={{ opacity: lOp, transform: `translateY(${lY}px)`, display: "flex", gap: 12, fontFamily: FONT.sans, alignItems: "baseline" }}>
              <span style={{ fontSize: 48, fontWeight: 900, color: C.white, letterSpacing: "-1.2px" }}>{l.white}</span>
              <span style={{ fontSize: 48, fontWeight: 900, color: C.purple, letterSpacing: "-1.2px" }}>{l.purple}</span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
