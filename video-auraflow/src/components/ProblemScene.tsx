import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT } from "../constants";

const PROBLEMS = [
  {
    icon: "😴",
    title: "Vous dormez,\nils partent",
    desc: "60 % des achats sont abandonnés la nuit sans support disponible",
    color: C.red,
    bg: "rgba(239,68,68,0.08)",
    border: "rgba(239,68,68,0.25)",
    accent: "#fca5a5",
  },
  {
    icon: "🔁",
    title: "Questions\nrépétitives",
    desc: "Votre équipe répond 50× par jour aux mêmes questions",
    color: C.gold,
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.25)",
    accent: "#fcd34d",
  },
  {
    icon: "📉",
    title: "Taux de\nconversion faible",
    desc: "Seulement 2 % des visiteurs achètent sans aide personnalisée",
    color: "#f97316",
    bg: "rgba(249,115,22,0.08)",
    border: "rgba(249,115,22,0.25)",
    accent: "#fdba74",
  },
];

export const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Slide IN from right edge
  const slideX = interpolate(frame, [0, 22], [1920, 0], { extrapolateRight: "clamp" });
  const fadeIn = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });
  // Slide OUT to left
  const slideOutX = interpolate(frame, [durationInFrames - 22, durationInFrames], [0, -1920], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [durationInFrames - 22, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleY = spring({ fps, frame, config: { damping: 18, stiffness: 260, mass: 0.9 }, from: 30, to: 0 });
  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse 110% 80% at 50% 0%, #1a0520 0%, ${C.dark} 65%)`,
        transform: `translateX(${frame < durationInFrames - 22 ? slideX : slideOutX}px)`,
        opacity: Math.min(fadeIn, fadeOut),
      }}
    >
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 100px",
        }}
      >
        {/* Header */}
        <div
          style={{
            opacity: titleOp,
            transform: `translateY(${titleY}px)`,
            textAlign: "center",
            marginBottom: 56,
          }}
        >
          <div
            style={{
              fontSize: 13,
              color: C.red,
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              marginBottom: 14,
              fontFamily: FONT.sans,
            }}
          >
            Le problème
          </div>
          <div
            style={{
              fontSize: 52,
              fontWeight: 900,
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

        {/* 3 problem cards */}
        <div style={{ display: "flex", gap: 28, width: "100%" }}>
          {PROBLEMS.map((p, i) => {
            const delay = i * 22;
            const sc = spring({
              fps,
              frame: Math.max(0, frame - (30 + delay)),
              config: { damping: 18, stiffness: 260, mass: 0.9 },
              from: 0.88,
              to: 1,
            });
            const op = interpolate(frame, [30 + delay, 48 + delay], [0, 1], { extrapolateRight: "clamp" });
            const barW = interpolate(frame, [55 + delay, 110 + delay], [0, 100], { extrapolateRight: "clamp" });

            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  background: p.bg,
                  border: `1px solid ${p.border}`,
                  borderRadius: 20,
                  padding: "36px 30px",
                  transform: `scale(${sc}) translateY(${interpolate(frame, [30+delay, 48+delay], [20, 0], { extrapolateRight: "clamp" })}px)`,
                  opacity: op,
                  fontFamily: FONT.sans,
                  boxShadow: `0 0 60px ${p.color}0d`,
                }}
              >
                <div style={{ fontSize: 52, marginBottom: 20 }}>{p.icon}</div>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 900,
                    color: "#fff",
                    marginBottom: 14,
                    lineHeight: 1.25,
                    whiteSpace: "pre-line",
                  }}
                >
                  {p.title}
                </div>
                <div
                  style={{
                    fontSize: 15,
                    color: "rgba(255,255,255,0.5)",
                    lineHeight: 1.65,
                    marginBottom: 28,
                  }}
                >
                  {p.desc}
                </div>
                {/* Animated color bar */}
                <div
                  style={{
                    height: 3,
                    borderRadius: 3,
                    background: p.color,
                    width: `${barW}%`,
                    opacity: 0.7,
                  }}
                />
                {/* Accent number */}
                <div
                  style={{
                    marginTop: 20,
                    fontSize: 11,
                    color: p.accent,
                    fontWeight: 600,
                    letterSpacing: 1,
                    opacity: interpolate(frame, [80+delay, 110+delay], [0, 1], { extrapolateRight: "clamp" }),
                  }}
                >
                  {i === 0 ? "60% abandons nocturnes" : i === 1 ? "50× / jour en moyenne" : "2% sans assistance"}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
