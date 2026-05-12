import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT } from "../constants";
import { ParticleEffect } from "./ParticleEffect";

export const HeroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const logoScale = spring({ fps, frame, config: { damping: 20, stiffness: 200 }, from: 0, to: 1 });
  const logoOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  const tagline1Opacity = interpolate(frame, [25, 50], [0, 1], { extrapolateRight: "clamp" });
  const tagline1Y = interpolate(frame, [25, 50], [30, 0], { extrapolateRight: "clamp" });

  const tagline2Opacity = interpolate(frame, [40, 65], [0, 1], { extrapolateRight: "clamp" });
  const tagline2Y = interpolate(frame, [40, 65], [30, 0], { extrapolateRight: "clamp" });

  const subOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });

  const badgeOpacity = interpolate(frame, [80, 110], [0, 1], { extrapolateRight: "clamp" });
  const badgeY = interpolate(frame, [80, 110], [20, 0], { extrapolateRight: "clamp" });

  const fadeOut = interpolate(frame, [durationInFrames - 30, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const glowPulse = 0.6 + 0.4 * Math.sin(frame / 25);

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse 80% 60% at 50% 40%, #1a0a35 0%, ${C.darker} 70%)`,
        opacity: fadeOut,
      }}
    >
      <ParticleEffect count={35} color={C.primary} speed={0.7} />

      {/* Glow backdrop */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(ellipse, ${C.primary}${Math.round(glowPulse * 25).toString(16).padStart(2, "0")} 0%, transparent 70%)`,
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
            marginBottom: 32,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 20,
                background: C.gradient,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 36,
                fontWeight: 900,
                color: "#fff",
                fontFamily: FONT.sans,
                boxShadow: `0 0 40px ${C.primary}88`,
              }}
            >
              A
            </div>
            <div>
              <div
                style={{
                  fontSize: 52,
                  fontWeight: 900,
                  color: "#fff",
                  fontFamily: FONT.sans,
                  letterSpacing: "-1px",
                  lineHeight: 1,
                }}
              >
                AuraFlow
                <span
                  style={{
                    background: `linear-gradient(90deg, ${C.accent}, #c4b5fd)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {" "}AI
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            opacity: tagline1Opacity,
            transform: `translateY(${tagline1Y}px)`,
            fontSize: 64,
            fontWeight: 800,
            color: "#fff",
            fontFamily: FONT.sans,
            letterSpacing: "-2px",
            textAlign: "center",
            lineHeight: 1.1,
          }}
        >
          Votre assistant IA
        </div>
        <div
          style={{
            opacity: tagline2Opacity,
            transform: `translateY(${tagline2Y}px)`,
            fontSize: 64,
            fontWeight: 800,
            fontFamily: FONT.sans,
            letterSpacing: "-2px",
            textAlign: "center",
            lineHeight: 1.1,
            background: `linear-gradient(90deg, ${C.accent}, #c4b5fd, ${C.accent})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: 28,
          }}
        >
          pour votre boutique
        </div>

        <div
          style={{
            opacity: subOpacity,
            fontSize: 22,
            color: "rgba(255,255,255,0.55)",
            fontFamily: FONT.sans,
            textAlign: "center",
            maxWidth: 620,
            lineHeight: 1.5,
            marginBottom: 48,
          }}
        >
          Convertissez vos visiteurs 24h/24 avec un chatbot personnalisé
        </div>

        {/* Badges */}
        <div
          style={{
            opacity: badgeOpacity,
            transform: `translateY(${badgeY}px)`,
            display: "flex",
            gap: 16,
          }}
        >
          {["🛒 E-commerce", "💬 Chat IA", "🇫🇷 En français"].map((b) => (
            <div
              key={b}
              style={{
                background: "rgba(124,58,237,0.15)",
                border: `1px solid ${C.primary}55`,
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

      {/* URL strip at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 16,
          color: "rgba(255,255,255,0.2)",
          fontFamily: FONT.sans,
          opacity: subOpacity,
        }}
      >
        auraflowaii.fr
      </div>
    </AbsoluteFill>
  );
};
