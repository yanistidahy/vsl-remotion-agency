import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT, SP_SNAP } from "../constants";

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "Votre" slams in at frame 0
  const sc1 = spring({ fps, frame, config: SP_SNAP, from: 1.5, to: 1 });
  const op1 = interpolate(frame, [0, 4], [0, 1], { extrapolateRight: "clamp" });

  // "site" at frame 15
  const sc2 = spring({ fps, frame: Math.max(0, frame - 15), config: SP_SNAP, from: 1.5, to: 1 });
  const op2 = interpolate(frame, [15, 19], [0, 1], { extrapolateRight: "clamp" });

  // "ne vend pas la nuit." slice at frame 30
  const slicePct = Math.min(100, interpolate(frame, [30, 44], [0, 100], { extrapolateRight: "clamp" }));

  // Red dot pulsing from frame 60
  const dotPulse = frame >= 60 ? 1 + 0.2 * Math.sin((frame - 60) / 15 * Math.PI * 2) : 0;

  // Caption fade
  const captionOp = interpolate(frame, [65, 78], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
        <span style={{ fontFamily: FONT.sans, fontSize: 120, fontWeight: 900, color: C.white, letterSpacing: "-3px", lineHeight: 1, opacity: op1, transform: `scale(${sc1})`, display: "inline-block" }}>Votre</span>
        <span style={{ fontFamily: FONT.sans, fontSize: 120, fontWeight: 900, color: C.white, letterSpacing: "-3px", lineHeight: 1, opacity: op2, transform: `scale(${sc2})`, display: "inline-block", marginTop: 4 }}>site</span>
        <div style={{ overflow: "hidden", marginTop: 16 }}>
          <div style={{ fontFamily: FONT.sans, fontSize: 72, fontWeight: 900, color: C.purple, letterSpacing: "-1.5px", clipPath: `inset(0 ${100 - slicePct}% 0 0)` }}>ne vend pas la nuit.</div>
        </div>
        {frame >= 60 && (
          <div style={{ marginTop: 32, transform: `scale(${dotPulse})` }}>
            <span style={{ fontSize: 56 }}>🔴</span>
          </div>
        )}
      </div>
      <div style={{ position: "absolute", bottom: 120, fontFamily: FONT.sans, fontSize: 28, color: C.gray, opacity: captionOp }}>
        Chaque nuit = ventes perdues
      </div>
    </AbsoluteFill>
  );
};
