import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT } from "../constants";

const problems = [
  {
    icon: "😴",
    title: "Vous dormez, ils partent",
    desc: "60% des achats abandonnés la nuit sans support disponible",
    color: C.red,
    bg: C.redBg,
  },
  {
    icon: "🔁",
    title: "Questions répétitives",
    desc: "Votre équipe répond 50× par jour aux mêmes questions",
    color: C.gold,
    bg: "#1a1000",
  },
  {
    icon: "📉",
    title: "Taux de conversion faible",
    desc: "Seulement 2% des visiteurs achètent sans aide personnalisée",
    color: "#f97316",
    bg: "#1a0800",
  },
];

export const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const fadeOut = interpolate(frame, [durationInFrames - 30, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleOpacity = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [0, 25], [30, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse 100% 80% at 50% 0%, #150520 0%, ${C.darker} 60%)`,
        opacity: fadeOut,
      }}
    >
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 120px",
        }}
      >
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            marginBottom: 64,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 14,
              color: C.red,
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: "uppercase",
              marginBottom: 16,
              fontFamily: FONT.sans,
            }}
          >
            Le problème
          </div>
          <div
            style={{
              fontSize: 56,
              fontWeight: 800,
              color: "#fff",
              fontFamily: FONT.sans,
              letterSpacing: "-1.5px",
              lineHeight: 1.1,
            }}
          >
            Votre boutique perd des ventes{" "}
            <span style={{ color: C.red }}>chaque nuit</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 32, width: "100%" }}>
          {problems.map((p, i) => {
            const cardStart = 40 + i * 25;
            const cardScale = spring({
              fps,
              frame: Math.max(0, frame - cardStart),
              config: { damping: 22, stiffness: 200 },
              from: 0.85,
              to: 1,
            });
            const cardOpacity = interpolate(frame, [cardStart, cardStart + 20], [0, 1], {
              extrapolateRight: "clamp",
            });

            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  background: p.bg,
                  border: `1px solid ${p.color}44`,
                  borderRadius: 20,
                  padding: "36px 32px",
                  transform: `scale(${cardScale})`,
                  opacity: cardOpacity,
                  fontFamily: FONT.sans,
                  boxShadow: `0 0 40px ${p.color}15`,
                }}
              >
                <div style={{ fontSize: 48, marginBottom: 20 }}>{p.icon}</div>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: "#fff",
                    marginBottom: 12,
                    lineHeight: 1.2,
                  }}
                >
                  {p.title}
                </div>
                <div
                  style={{
                    fontSize: 16,
                    color: "rgba(255,255,255,0.5)",
                    lineHeight: 1.6,
                  }}
                >
                  {p.desc}
                </div>
                <div
                  style={{
                    marginTop: 24,
                    height: 3,
                    borderRadius: 3,
                    background: p.color,
                    opacity: 0.6,
                    width: "40%",
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Solution hint at bottom */}
        {frame > 280 && (
          <div
            style={{
              marginTop: 52,
              opacity: interpolate(frame, [280, 320], [0, 1], { extrapolateRight: "clamp" }),
              fontSize: 20,
              color: C.accent,
              fontFamily: FONT.sans,
              fontWeight: 600,
            }}
          >
            Il existe une solution →
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
