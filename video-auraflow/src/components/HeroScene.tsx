import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT } from "../constants";
import { AuraLogo } from "./AuraLogo";
import { ParticleEffect } from "./ParticleEffect";

const SPRING = { damping: 16, stiffness: 280, mass: 0.8 };
const TRANS = 10;

const taglineWords = "L'assistant IA qui vend pour vous".split(" ");

export const HeroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Slide OUT left + fade over last TRANS frames
  const slideOut = interpolate(
    frame,
    [durationInFrames - TRANS, durationInFrames],
    [0, -1920],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const fadeOut = interpolate(
    frame,
    [durationInFrames - TRANS, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const glowPulse = 0.55 + 0.45 * Math.sin(frame / 28);

  // Layer 1: Logo springs in from scale 0
  const logoScale = spring({ fps, frame, config: SPRING, from: 0, to: 1 });

  // Layer 3: Sub-text (frames 40-55)
  const subOp = interpolate(frame, [40, 55], [0, 1], { extrapolateRight: "clamp" });
  const subY = spring({
    fps,
    frame: Math.max(0, frame - 40),
    config: SPRING,
    from: 20,
    to: 0,
  });

  // Layer 4: badges staggered at frames 58, 66, 74
  const badgeDelays = [58, 66, 74];

  return (
    <AbsoluteFill
      style={{
        background: "#0a0a0f",
        transform: `translateX(${slideOut}px)`,
        opacity: fadeOut,
      }}
    >
      {/* Subtle purple grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(124,58,237,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,58,237,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          pointerEvents: "none",
        }}
      />

      {/* Drifting orb 1 */}
      <div
        style={{
          position: "absolute",
          top: "8%",
          left: "12%",
          width: 560,
          height: 560,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(124,58,237,0.13) 0%, transparent 70%)",
          filter: "blur(60px)",
          transform: `translate(${Math.sin(frame / 90) * 18}px, ${Math.cos(frame / 70) * 14}px)`,
          pointerEvents: "none",
        }}
      />

      {/* Drifting orb 2 */}
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "8%",
          width: 440,
          height: 440,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(79,70,229,0.11) 0%, transparent 70%)",
          filter: "blur(50px)",
          transform: `translate(${Math.cos(frame / 80) * 16}px, ${Math.sin(frame / 100) * 12}px)`,
          pointerEvents: "none",
        }}
      />

      {/* Far background giant watermark */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: 400,
          fontWeight: 900,
          fontFamily: FONT.sans,
          color: "#fff",
          opacity: 0.04,
          letterSpacing: "-12px",
          userSelect: "none",
          whiteSpace: "nowrap",
          pointerEvents: "none",
        }}
      >
        AURA
      </div>

      {/* Radial center glow */}
      <div
        style={{
          position: "absolute",
          top: "42%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 900,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(ellipse, rgba(124,58,237,${(0.16 * glowPulse).toFixed(2)}) 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <ParticleEffect count={24} color={C.primary} speed={0.65} />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Logo — springs in */}
        <div style={{ marginBottom: 40, transform: `scale(${logoScale})` }}>
          <AuraLogo size={72} showWordmark={true} startFrame={0} />
        </div>

        {/* Tagline word-by-word */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0 10px",
            marginBottom: 24,
            maxWidth: 800,
          }}
        >
          {taglineWords.map((word, i) => {
            const wordStart = 10 + i * 5;
            const wordOp = interpolate(frame, [wordStart, wordStart + 8], [0, 1], {
              extrapolateRight: "clamp",
              extrapolateLeft: "clamp",
            });
            const wordY = spring({
              fps,
              frame: Math.max(0, frame - wordStart),
              config: SPRING,
              from: 20,
              to: 0,
            });
            return (
              <span
                key={i}
                style={{
                  opacity: wordOp,
                  transform: `translateY(${wordY}px)`,
                  display: "inline-block",
                  fontSize: 15,
                  fontWeight: 700,
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: C.accent,
                  fontFamily: FONT.sans,
                }}
              >
                {word}
              </span>
            );
          })}
        </div>

        {/* Sub-text */}
        <div
          style={{
            opacity: subOp,
            transform: `translateY(${subY}px)`,
            fontSize: 22,
            color: "rgba(255,255,255,0.42)",
            fontFamily: FONT.sans,
            textAlign: "center",
            maxWidth: 560,
            lineHeight: 1.55,
            marginBottom: 56,
          }}
        >
          Convertissez chaque visiteur,{" "}
          <span style={{ color: "rgba(167,139,250,0.82)" }}>24h/24</span>
        </div>

        {/* Badges */}
        <div style={{ display: "flex", gap: 16 }}>
          {["🛒 E-commerce", "💬 Chat IA", "🇫🇷 Français"].map((b, i) => {
            const del = badgeDelays[i];
            const bOp = interpolate(frame, [del, del + 14], [0, 1], { extrapolateRight: "clamp" });
            const bY = spring({
              fps,
              frame: Math.max(0, frame - del),
              config: SPRING,
              from: 22,
              to: 0,
            });
            return (
              <div
                key={b}
                style={{
                  opacity: bOp,
                  transform: `translateY(${bY}px)`,
                  background: "rgba(124,58,237,0.13)",
                  border: "1px solid rgba(124,58,237,0.32)",
                  borderRadius: 32,
                  padding: "9px 24px",
                  fontSize: 14,
                  color: C.accent,
                  fontFamily: FONT.sans,
                  fontWeight: 600,
                }}
              >
                {b}
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
