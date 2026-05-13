import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT, SP_SNAP } from "../constants";
import { AuraLogoMark } from "../components/AuraLogoMark";
import { WordByWord } from "../components/WordByWord";

export const Scene3Solution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const glowPulse = 0.5 + 0.5 * Math.sin(frame / 18);

  // Logo drops from top
  const logoY = spring({ fps, frame, config: { damping: 16, stiffness: 350 }, from: -150, to: 0 });
  const logoOp = interpolate(frame, [0, 8], [0, 1], { extrapolateRight: "clamp" });

  // "AuraFlow AI" slides up
  const nameY = spring({ fps, frame: Math.max(0, frame - 20), config: SP_SNAP, from: 40, to: 0 });
  const nameOp = interpolate(frame, [20, 28], [0, 1], { extrapolateRight: "clamp" });

  // Tagline word-by-word at frame 35

  // Purple line sweep at frame 60
  const lineW = interpolate(frame, [60, 80], [0, 100], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      {/* Radial glow */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(ellipse, rgba(124,58,237,${(0.3 * glowPulse).toFixed(2)}) 0%, transparent 65%)`, pointerEvents: "none" }} />

      <div style={{ opacity: logoOp, transform: `translateY(${logoY}px)`, marginBottom: 24 }}>
        <AuraLogoMark size={100} startFrame={-999} />
      </div>

      <div style={{ opacity: nameOp, transform: `translateY(${nameY}px)`, fontFamily: FONT.sans, fontSize: 64, fontWeight: 900, color: C.white, letterSpacing: "-2px", marginBottom: 20 }}>
        AuraFlow AI
      </div>

      <WordByWord text="L'assistant IA qui vend pour vous" startFrame={35} fontSize={38} color={C.purpleLight} stagger={5} />

      <div style={{ marginTop: 48, height: 3, background: C.purple, width: `${lineW}%`, borderRadius: 2 }} />
    </AbsoluteFill>
  );
};
