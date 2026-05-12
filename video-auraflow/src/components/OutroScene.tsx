import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT } from "../constants";
import { AuraLogo } from "./AuraLogo";
import { ParticleEffect } from "./ParticleEffect";

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });
  // Fade to black last 40 frames
  const fadeOut = interpolate(frame, [durationInFrames - 40, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const h1Op = interpolate(frame, [22, 42], [0, 1], { extrapolateRight: "clamp" });
  const h1Y = spring({ fps, frame: Math.max(0, frame - 22), config: { damping: 18, stiffness: 260, mass: 0.9 }, from: 30, to: 0 });

  const ctaOp = interpolate(frame, [46, 66], [0, 1], { extrapolateRight: "clamp" });
  const ctaScale = spring({ fps, frame: Math.max(0, frame - 46), config: { damping: 18, stiffness: 260, mass: 0.9 }, from: 0.85, to: 1 });

  const urlOp = interpolate(frame, [72, 90], [0, 1], { extrapolateRight: "clamp" });

  const glowPulse = 0.5 + 0.5 * Math.sin(frame / 25);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(145deg, #1a0533 0%, #0f0823 30%, ${C.dark} 60%, #0d0520 100%)`,
        opacity: fadeIn * fadeOut,
      }}
    >
      {/* Radial halo */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: `radial-gradient(ellipse, rgba(124,58,237,${(0.22 * glowPulse).toFixed(2)}) 0%, transparent 68%)`,
          pointerEvents: "none",
        }}
      />

      <ParticleEffect count={40} color={C.primary} speed={0.7} />
      <ParticleEffect count={14} color={C.accent} speed={0.4} />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
        }}
      >
        {/* Logo — springs in */}
        <div style={{ marginBottom: 40 }}>
          <AuraLogo size={160} showWordmark={false} startFrame={0} />
        </div>

        {/* H1 */}
        <div
          style={{
            opacity: h1Op,
            transform: `translateY(${h1Y}px)`,
            textAlign: "center",
            marginBottom: 14,
          }}
        >
          <span
            style={{
              fontSize: 56,
              fontWeight: 900,
              color: "#fff",
              fontFamily: FONT.sans,
              letterSpacing: "-1.5px",
              lineHeight: 1.1,
            }}
          >
            Réservez votre{" "}
          </span>
          <span
            style={{
              fontSize: 56,
              fontWeight: 900,
              background: `linear-gradient(90deg, ${C.accent}, #c4b5fd)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: FONT.sans,
              letterSpacing: "-1.5px",
              lineHeight: 1.1,
            }}
          >
            démo gratuite
          </span>
        </div>

        <div
          style={{
            opacity: h1Op,
            fontSize: 20,
            color: "rgba(255,255,255,0.4)",
            fontFamily: FONT.sans,
            marginBottom: 52,
          }}
        >
          Augmentez vos ventes dès aujourd'hui
        </div>

        {/* CTA button */}
        <div
          style={{
            opacity: ctaOp,
            transform: `scale(${ctaScale})`,
            background: C.gradient,
            borderRadius: 60,
            padding: "22px 64px",
            fontSize: 22,
            fontWeight: 800,
            color: "#fff",
            fontFamily: FONT.sans,
            letterSpacing: "-0.2px",
            boxShadow: `0 14px 56px rgba(124,58,237,0.55)`,
            marginBottom: 52,
          }}
        >
          Commencer maintenant →
        </div>

        {/* URL */}
        <div
          style={{
            opacity: urlOp,
            fontSize: 24,
            fontWeight: 700,
            color: C.accent,
            fontFamily: FONT.sans,
            letterSpacing: 0.5,
          }}
        >
          auraflowaii.fr
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
