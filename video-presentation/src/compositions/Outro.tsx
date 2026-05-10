import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../constants";

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Gradient background reveals
  const bgOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // Logo appears
  const logoScale = spring({ fps, frame: Math.max(0, frame - 20), config: { damping: 14, stiffness: 80 }, from: 0.5, to: 1 });
  const logoOpacity = interpolate(frame, [20, 50], [0, 1], { extrapolateRight: "clamp" });

  // "A" avatar glow pulse
  const glowSize = interpolate((frame * 2) % 60, [0, 30, 60], [0, 20, 0]);

  // Taglines
  const tag1Opacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const tag1Y = interpolate(frame, [60, 90], [20, 0], { extrapolateRight: "clamp" });

  const tag2Opacity = interpolate(frame, [90, 120], [0, 1], { extrapolateRight: "clamp" });
  const tag2Y = interpolate(frame, [90, 120], [20, 0], { extrapolateRight: "clamp" });

  // Fade out at end
  const endFade = interpolate(frame, [180, 210], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Stars / particles
  const particles = Array.from({ length: 20 }, (_, i) => {
    const angle = (i / 20) * Math.PI * 2;
    const radius = 200 + (i % 3) * 80;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    const opacity = interpolate((frame + i * 5) % 60, [0, 30, 60], [0.1, 0.4, 0.1]);
    return { x, y, opacity, size: 2 + (i % 3) };
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, #1a0533 0%, #0d0121 50%, #1a0533 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: bgOpacity * endFade,
      }}
    >
      {/* Particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: COLORS.primary,
            transform: `translate(calc(-50% + ${p.x}px), calc(-50% + ${p.y}px))`,
            opacity: p.opacity,
          }}
        />
      ))}

      {/* Outer glow ring */}
      <div
        style={{
          position: "absolute",
          width: 300 + glowSize * 2,
          height: 300 + glowSize * 2,
          borderRadius: "50%",
          background: `radial-gradient(ellipse, ${COLORS.primary}20 0%, transparent 70%)`,
          filter: "blur(20px)",
          opacity: logoOpacity,
        }}
      />

      {/* Logo / Avatar */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          transform: `scale(${logoScale})`,
          opacity: logoOpacity,
        }}
      >
        {/* Big "A" logo */}
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: COLORS.gradient,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Helvetica Neue', sans-serif",
            fontWeight: 800,
            fontSize: 64,
            color: "#fff",
            boxShadow: `0 0 ${20 + glowSize}px ${COLORS.primary}80, 0 0 60px ${COLORS.secondary}40`,
            border: "3px solid rgba(255,255,255,0.2)",
          }}
        >
          A
        </div>

        {/* Brand name */}
        <div
          style={{
            fontFamily: "'Helvetica Neue', sans-serif",
            fontSize: 52,
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "-1px",
            textAlign: "center",
          }}
        >
          Aura
          <span
            style={{
              background: COLORS.gradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Flow
          </span>
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 30, fontWeight: 400 }}> AI</span>
        </div>

        {/* Tagline 1 */}
        <div
          style={{
            opacity: tag1Opacity,
            transform: `translateY(${tag1Y}px)`,
            fontFamily: "'Helvetica Neue', sans-serif",
            fontSize: 22,
            color: "rgba(255,255,255,0.7)",
            textAlign: "center",
            fontWeight: 400,
            letterSpacing: "0.5px",
          }}
        >
          Votre assistant IA disponible{" "}
          <span style={{ color: "#fff", fontWeight: 600 }}>24h/24</span>
        </div>

        {/* Tagline 2 */}
        <div
          style={{
            opacity: tag2Opacity,
            transform: `translateY(${tag2Y}px)`,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              height: 1,
              width: 60,
              background: `linear-gradient(90deg, transparent, ${COLORS.primary})`,
            }}
          />
          <span
            style={{
              fontFamily: "'Helvetica Neue', sans-serif",
              fontSize: 16,
              color: COLORS.primary,
              fontWeight: 600,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            Powered by AuraFlow AI
          </span>
          <div
            style={{
              height: 1,
              width: 60,
              background: `linear-gradient(90deg, ${COLORS.primary}, transparent)`,
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
