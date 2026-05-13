import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CAd as C, FONT, SP_SNAP } from "../constants";

const ITEMS = [
  { icon: "😴", text: "Clients sans réponse", frame: 0 },
  { icon: "❓", text: "Questions sans réponse", frame: 30 },
  { icon: "💸", text: "Argent laissé sur la table", frame: 60 },
];

export const Scene2Agitate: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const shaking = frame >= 120 && frame < 126;
  const scattered = frame >= 126;

  return (
    <AbsoluteFill style={{ background: C.bg, display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", paddingLeft: 60 }}>
      {ITEMS.map((item, i) => {
        const slideX = spring({ fps, frame: Math.max(0, frame - item.frame), config: SP_SNAP, from: 400, to: 0 });
        const op = interpolate(frame, [item.frame, item.frame + 6], [0, 1], { extrapolateRight: "clamp" });
        const shakeX = shaking ? (Math.sin((frame - 120) * 3.5) * 4) : 0;
        const scatterY = scattered ? spring({ fps, frame: Math.max(0, frame - 126), config: SP_SNAP, from: 0, to: 300 }) : 0;
        const scatterOp = scattered ? Math.max(0, interpolate(frame, [126, 138], [1, 0], { extrapolateRight: "clamp" })) : 1;
        return (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 20, marginBottom: 40,
            opacity: op * scatterOp,
            transform: `translateX(${slideX + shakeX}px) translateY(${scatterY}px)`,
            fontFamily: FONT.sans,
          }}>
            <span style={{ fontSize: 60 }}>{item.icon}</span>
            <span style={{ fontSize: 68, fontWeight: 900, color: item.icon === "💸" ? "#ef4444" : C.white, letterSpacing: "-1.5px" }}>{item.text}</span>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
