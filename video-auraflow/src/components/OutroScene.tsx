import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT } from "../constants";
import { ParticleEffect } from "./ParticleEffect";

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const logoScale = spring({ fps, frame, config: { damping: 20, stiffness: 200 }, from: 0, to: 1 });
  const logoOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  const textOpacity = interpolate(frame, [20, 50], [0, 1], { extrapolateRight: "clamp" });
  const textY = interpolate(frame, [20, 50], [30, 0], { extrapolateRight: "clamp" });

  const ctaOpacity = interpolate(frame, [50, 80], [0, 1], { extrapolateRight: "clamp" });
  const ctaScale = spring({ fps, frame: Math.max(0, frame - 50), config: { damping: 18, stiffness: 160 }, from: 0.85, to: 1 });

  const urlOpacity = interpolate(frame, [80, 110], [0, 1], { extrapolateRight: "clamp" });

  const fadeOut = interpolate(frame, [durationInFrames - 20, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const glowPulse = 0.5 + 0.5 * Math.sin(frame / 20);

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse 100% 80% at 50% 50%, #1a0535 0%, ${C.darker} 60%)`,
        opacity: fadeOut,
      }}
    >
      <ParticleEffect count={50} color={C.primary} speed={0.8} />
      <ParticleEffect count={20} color={C.accent} speed={0.5} />

      {/* Glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: `radial-gradient(ellipse, ${C.primary}${Math.round(glowPulse * 30).toString(16).padStart(2, "0")} 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
        }}
      >
        {/* Logo */}
        <div
          style={{
            transform: `scale(${logoScale})`,
            opacity: logoOpacity,
            marginBottom: 36,
            display: "flex",
            alignItems: "center",
            gap: 18,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 22,
              background: C.gradient,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              fontWeight: 900,
              color: "#fff",
              fontFamily: FONT.sans,
              boxShadow: `0 0 50px ${C.primary}99`,
            }}
          >
            A
          </div>
          <div
            style={{
              fontSize: 56,
              fontWeight: 900,
              color: "#fff",
              fontFamily: FONT.sans,
              letterSpacing: "-1.5px",
            }}
          >
            AuraFlow{" "}
            <span
              style={{
                background: `linear-gradient(90deg, ${C.accent}, #c4b5fd)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              AI
            </span>
          </div>
        </div>

        <div
          style={{
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
            fontSize: 42,
            fontWeight: 800,
            color: "#fff",
            fontFamily: FONT.sans,
            textAlign: "center",
            letterSpacing: "-1px",
            lineHeight: 1.2,
            marginBottom: 16,
          }}
        >
          Votre assistant IA 24h/24
        </div>

        <div
          style={{
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
            fontSize: 20,
            color: "rgba(255,255,255,0.45)",
            fontFamily: FONT.sans,
            textAlign: "center",
            marginBottom: 56,
          }}
        >
          Augmentez vos ventes dès aujourd'hui
        </div>

        {/* CTA button */}
        <div
          style={{
            opacity: ctaOpacity,
            transform: `scale(${ctaScale})`,
            background: C.gradient,
            borderRadius: 16,
            padding: "20px 56px",
            fontSize: 22,
            fontWeight: 800,
            color: "#fff",
            fontFamily: FONT.sans,
            letterSpacing: "-0.3px",
            boxShadow: `0 12px 50px ${C.primary}55`,
            marginBottom: 56,
          }}
        >
          Démarrer maintenant →
        </div>

        {/* URL */}
        <div
          style={{
            opacity: urlOpacity,
            fontSize: 28,
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
