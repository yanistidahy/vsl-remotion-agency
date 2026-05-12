import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT } from "../constants";
import { AuraLogo } from "./AuraLogo";
import { ParticleEffect } from "./ParticleEffect";

const SPRING = { damping: 16, stiffness: 280, mass: 0.8 };
const SPRING_TRANS = { damping: 22, stiffness: 350, mass: 0.7 };
const TRANS = 10;

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ENTER from right: slide + scale + skew + blur
  const slideIn = interpolate(frame, [0, TRANS], [1920, 0], { extrapolateRight: "clamp" });
  const scaleIn = spring({ fps, frame: Math.max(0, frame), config: SPRING_TRANS, from: 1.08, to: 1.0 });
  const skewIn = interpolate(frame, [0, TRANS], [-5, 0], { extrapolateRight: "clamp" });
  const blurIn = interpolate(frame, [0, Math.min(TRANS, 5)], [10, 0], { extrapolateRight: "clamp" });

  // Fade to pure black last 40 frames (no slide-out — it's the finale)
  const fadeOut = interpolate(frame, [durationInFrames - 40, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // White flash reveal (frames 0→6: opacity 0→0.6, frames 6→18: 0.6→0)
  const flashOp = interpolate(frame, [0, 6, 18], [0, 0.6, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // Logo springs in with overshoot
  const logoSc = spring({ fps, frame: Math.max(0, frame - 8), config: SPRING, from: 0, to: 1 });

  // Headline words
  const h1Words = ["Réservez", "votre", "démo", "gratuite"];
  const h1Line1 = h1Words.slice(0, 2);
  const h1Line2 = h1Words.slice(2);

  // CTA
  const ctaScale = spring({ fps, frame: Math.max(0, frame - 50), config: SPRING, from: 0.8, to: 1 });
  const ctaOp = interpolate(frame, [50, 66], [0, 1], { extrapolateRight: "clamp" });
  // Pulsing ring: repeats every 44 frames
  const pulsePhase = (Math.max(0, frame - 70) % 44) / 44;
  const ringScale = 1 + pulsePhase * 0.14;
  const ringOp = Math.max(0, 0.5 - pulsePhase * 0.5);

  // URL types in character by character
  const urlText = "auraflowaii.fr";
  const urlChars = Math.floor(interpolate(frame, [75, 92], [0, urlText.length], { extrapolateRight: "clamp" }));
  const urlOp = interpolate(frame, [74, 78], [0, 1], { extrapolateRight: "clamp" });

  const glowPulse = 0.5 + 0.5 * Math.sin(frame / 24);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, #18063a 0%, #0d0520 35%, #0a0a0f 60%, #0f0823 100%)`,
        transform: `translateX(${slideIn}px) scale(${scaleIn}) skewX(${skewIn}deg)`,
        filter: `blur(${blurIn}px)`,
        opacity: fadeOut,
      }}
    >
      {/* White flash overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#fff",
          opacity: flashOp,
          pointerEvents: "none",
          zIndex: 50,
        }}
      />

      {/* Radial halo */}
      <div
        style={{
          position: "absolute",
          top: "48%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 1000,
          height: 1000,
          borderRadius: "50%",
          background: `radial-gradient(ellipse, rgba(124,58,237,${(0.24 * glowPulse).toFixed(2)}) 0%, transparent 65%)`,
          pointerEvents: "none",
        }}
      />

      <ParticleEffect count={50} color={C.primary} speed={0.72} />
      <ParticleEffect count={18} color={C.accent} speed={0.42} />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Logo with overshoot spring */}
        <div
          style={{
            marginBottom: 40,
            transform: `scale(${logoSc})`,
            filter: `drop-shadow(0 0 ${40 * glowPulse}px rgba(124,58,237,0.7))`,
          }}
        >
          <AuraLogo size={156} showWordmark={false} startFrame={-999} />
        </div>

        {/* "Réservez votre" */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 16,
            marginBottom: 6,
          }}
        >
          {h1Line1.map((word, i) => {
            const ws = 22 + i * 6;
            const wOp = interpolate(frame, [ws, ws + 10], [0, 1], { extrapolateRight: "clamp" });
            const wY = spring({ fps, frame: Math.max(0, frame - ws), config: SPRING, from: 22, to: 0 });
            return (
              <span
                key={i}
                style={{
                  opacity: wOp,
                  transform: `translateY(${wY}px)`,
                  display: "inline-block",
                  fontSize: 58,
                  fontWeight: 900,
                  color: "#fff",
                  fontFamily: FONT.sans,
                  letterSpacing: "-1.5px",
                  lineHeight: 1.1,
                }}
              >
                {word}
              </span>
            );
          })}
        </div>

        {/* "démo gratuite" — purple gradient */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 16,
            marginBottom: 16,
          }}
        >
          {h1Line2.map((word, i) => {
            const ws = 30 + i * 6;
            const wOp = interpolate(frame, [ws, ws + 10], [0, 1], { extrapolateRight: "clamp" });
            const wY = spring({ fps, frame: Math.max(0, frame - ws), config: SPRING, from: 22, to: 0 });
            return (
              <span
                key={i}
                style={{
                  opacity: wOp,
                  transform: `translateY(${wY}px)`,
                  display: "inline-block",
                  fontSize: 58,
                  fontWeight: 900,
                  fontFamily: FONT.sans,
                  letterSpacing: "-1.5px",
                  lineHeight: 1.1,
                  background: `linear-gradient(90deg, ${C.accent}, #c4b5fd)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {word}
              </span>
            );
          })}
        </div>

        <div
          style={{
            opacity: interpolate(frame, [40, 54], [0, 1], { extrapolateRight: "clamp" }),
            fontSize: 20,
            color: "rgba(255,255,255,0.38)",
            fontFamily: FONT.sans,
            marginBottom: 56,
            textAlign: "center",
          }}
        >
          Augmentez vos ventes dès aujourd'hui
        </div>

        {/* CTA with pulsing ring */}
        <div
          style={{
            opacity: ctaOp,
            transform: `scale(${ctaScale})`,
            position: "relative",
            marginBottom: 52,
          }}
        >
          {/* Pulsing ring */}
          {frame > 70 && (
            <div
              style={{
                position: "absolute",
                inset: -8,
                borderRadius: 68,
                border: `2px solid ${C.primary}`,
                transform: `scale(${ringScale})`,
                opacity: ringOp,
                pointerEvents: "none",
              }}
            />
          )}
          <div
            style={{
              background: C.gradient,
              borderRadius: 60,
              padding: "22px 72px",
              fontSize: 24,
              fontWeight: 800,
              color: "#fff",
              fontFamily: FONT.sans,
              letterSpacing: "-0.2px",
              boxShadow: `0 16px 64px rgba(124,58,237,0.65), 0 4px 20px rgba(124,58,237,0.3)`,
              position: "relative",
              zIndex: 1,
            }}
          >
            Commencer maintenant →
          </div>
        </div>

        {/* URL types in */}
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
          {urlText.slice(0, urlChars)}
          {urlChars < urlText.length && (
            <span
              style={{
                display: "inline-block",
                width: 2,
                height: 22,
                background: C.accent,
                marginLeft: 2,
                verticalAlign: "middle",
                opacity: Math.floor(frame / 16) % 2 === 0 ? 1 : 0,
              }}
            />
          )}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
