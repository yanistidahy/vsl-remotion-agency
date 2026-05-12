import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT } from "../constants";
import { AuraLogo } from "./AuraLogo";
import { ParticleEffect } from "./ParticleEffect";

export const HeroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });
  // Slide out left + fade at the end
  const slideOut = interpolate(frame, [durationInFrames - 22, durationInFrames], [0, -1920], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [durationInFrames - 22, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  const taglineY = spring({ fps, frame: Math.max(0, frame - 18), config: { damping: 18, stiffness: 260, mass: 0.9 }, from: 40, to: 0 });
  const taglineOp = interpolate(frame, [18, 36], [0, 1], { extrapolateRight: "clamp" });

  const subY = spring({ fps, frame: Math.max(0, frame - 38), config: { damping: 18, stiffness: 260, mass: 0.9 }, from: 30, to: 0 });
  const subOp = interpolate(frame, [38, 56], [0, 1], { extrapolateRight: "clamp" });

  const badgeOp = interpolate(frame, [62, 82], [0, 1], { extrapolateRight: "clamp" });
  const badgeY = spring({ fps, frame: Math.max(0, frame - 62), config: { damping: 18, stiffness: 260, mass: 0.9 }, from: 20, to: 0 });

  const glowPulse = 0.55 + 0.45 * Math.sin(frame / 28);

  return (
    <AbsoluteFill
      style={{
        background: C.dark,
        transform: `translateX(${slideOut}px)`,
        opacity: Math.min(fadeIn, fadeOut),
      }}
    >
      {/* Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(124,58,237,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,58,237,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          top: "42%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 900,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(ellipse, rgba(124,58,237,${(0.18 * glowPulse).toFixed(2)}) 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <ParticleEffect count={28} color={C.primary} speed={0.65} />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ marginBottom: 36 }}>
          <AuraLogo size={72} showWordmark={true} startFrame={0} />
        </div>

        <div
          style={{
            opacity: taglineOp,
            transform: `translateY(${taglineY}px)`,
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: C.accent,
            fontFamily: FONT.sans,
            marginBottom: 20,
          }}
        >
          L'assistant IA qui vend pour vous
        </div>

        <div
          style={{
            opacity: subOp,
            transform: `translateY(${subY}px)`,
            fontSize: 26,
            color: "rgba(255,255,255,0.45)",
            fontFamily: FONT.sans,
            textAlign: "center",
            maxWidth: 600,
            lineHeight: 1.5,
            marginBottom: 52,
          }}
        >
          Convertissez chaque visiteur,{" "}
          <span style={{ color: "rgba(167,139,250,0.8)" }}>24h/24</span>
        </div>

        <div
          style={{
            opacity: badgeOp,
            transform: `translateY(${badgeY}px)`,
            display: "flex",
            gap: 14,
          }}
        >
          {["🛒 E-commerce", "💬 Chat IA", "🇫🇷 Français"].map((b) => (
            <div
              key={b}
              style={{
                background: "rgba(124,58,237,0.12)",
                border: "1px solid rgba(124,58,237,0.3)",
                borderRadius: 30,
                padding: "8px 22px",
                fontSize: 14,
                color: C.accent,
                fontFamily: FONT.sans,
                fontWeight: 600,
              }}
            >
              {b}
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
