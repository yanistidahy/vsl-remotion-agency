import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CAd as C, FONT } from "../constants";
import { WordByWord } from "../components/WordByWord";
import { AuraLogoMark } from "../components/AuraLogoMark";

export const Scene8CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const glowPulse = 0.5 + 0.5 * Math.sin(frame / 20);

  // CTA button
  const ctaSc = spring({ fps, frame: Math.max(0, frame - 100), config: { damping: 14, stiffness: 400 }, from: 0, to: 1 });
  const ctaOp = interpolate(frame, [100, 108], [0, 1], { extrapolateRight: "clamp" });

  // Shimmer animation
  const shimmerX = ((frame - 100) * 4) % 500 - 100;

  // URL
  const urlOp = interpolate(frame, [160, 174], [0, 1], { extrapolateRight: "clamp" });

  // Logo top
  const logoOp = interpolate(frame, [240, 254], [0, 1], { extrapolateRight: "clamp" });

  // Fade to black
  const fadeBlack = interpolate(frame, [310, 360], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: 1 - fadeBlack }}>
      {/* Radial glow */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 700, borderRadius: "50%", background: `radial-gradient(ellipse, rgba(124,58,237,${(0.35 * glowPulse).toFixed(2)}) 0%, transparent 65%)`, pointerEvents: "none" }} />

      {/* Logo top */}
      <div style={{ position: "absolute", top: 80, opacity: logoOp }}>
        <AuraLogoMark size={60} startFrame={-999} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
        <WordByWord text="Prêt à vendre" startFrame={20} fontSize={96} color={C.white} stagger={6} />
        <WordByWord text="la nuit aussi ?" startFrame={38} fontSize={96} color={C.purple} stagger={6} />
      </div>

      {/* CTA Button */}
      <div style={{ opacity: ctaOp, transform: `scale(${ctaSc})`, marginTop: 56, position: "relative", overflow: "hidden" }}>
        <div style={{
          background: C.white, borderRadius: 60, padding: "28px 72px",
          fontSize: 34, fontWeight: 900, color: C.purple, fontFamily: FONT.sans,
          letterSpacing: "-0.5px", boxShadow: "0 20px 80px rgba(124,58,237,0.5)",
          position: "relative",
        }}>
          Réserver ma démo gratuite
          {/* Shimmer */}
          <div style={{
            position: "absolute", top: 0, left: shimmerX, width: 60, height: "100%",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
            transform: "skewX(-15deg)", pointerEvents: "none",
          }} />
        </div>
      </div>

      {/* URL */}
      <div style={{ opacity: urlOp, marginTop: 32, fontFamily: FONT.sans, fontSize: 28, color: C.gray, letterSpacing: "0.5px" }}>
        auraflowaii.fr
      </div>

      {/* Fade to black overlay */}
      <AbsoluteFill style={{ background: "#000", opacity: fadeBlack, pointerEvents: "none" }} />
    </AbsoluteFill>
  );
};
