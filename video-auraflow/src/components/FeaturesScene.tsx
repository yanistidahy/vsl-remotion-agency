import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT } from "../constants";
import { CounterAnimation } from "./CounterAnimation";

const FEATURES = [
  {
    icon: "🤖",
    title: "IA Conversationnelle",
    desc: "Répond comme un vrai conseiller",
    grad: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
    delay: 0,
  },
  {
    icon: "🧠",
    title: "Mémoire Client",
    desc: "Se souvient de chaque visiteur",
    grad: "linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)",
    delay: 22,
  },
  {
    icon: "📦",
    title: "Connaissance Produits",
    desc: "Connaît tout votre catalogue",
    grad: "linear-gradient(135deg, #6d28d9 0%, #5b21b6 100%)",
    delay: 44,
  },
];

export const FeaturesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - 20, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });
  const titleY = spring({ fps, frame, config: { damping: 18, stiffness: 260, mass: 0.9 }, from: 30, to: 0 });

  const statsOp = interpolate(frame, [200, 220], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse 120% 80% at 50% 110%, #0f0920 0%, ${C.dark} 55%)`,
        opacity: fadeIn * fadeOut,
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
        {/* Title */}
        <div
          style={{
            opacity: titleOp,
            transform: `translateY(${titleY}px)`,
            textAlign: "center",
            marginBottom: 60,
          }}
        >
          <div
            style={{
              fontSize: 13,
              color: C.accent,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: 14,
              fontFamily: FONT.sans,
            }}
          >
            Pourquoi AuraFlow AI
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
            Technologie{" "}
            <span
              style={{
                background: `linear-gradient(90deg, ${C.accent}, #c4b5fd)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              de pointe
            </span>
          </div>
        </div>

        {/* Feature cards */}
        <div style={{ display: "flex", gap: 28, width: "100%", marginBottom: 72 }}>
          {FEATURES.map((f, i) => {
            const sc = spring({
              fps,
              frame: Math.max(0, frame - (40 + f.delay)),
              config: { damping: 18, stiffness: 260, mass: 0.9 },
              from: 0.88,
              to: 1,
            });
            const op = interpolate(frame, [40 + f.delay, 58 + f.delay], [0, 1], { extrapolateRight: "clamp" });
            const barW = interpolate(frame, [60 + f.delay, 120 + f.delay], [0, 100], { extrapolateRight: "clamp" });

            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(124,58,237,0.2)",
                  borderRadius: 20,
                  padding: "36px 28px",
                  transform: `scale(${sc}) translateY(${interpolate(frame, [40 + f.delay, 58 + f.delay], [18, 0], { extrapolateRight: "clamp" })}px)`,
                  opacity: op,
                  fontFamily: FONT.sans,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Icon box */}
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 16,
                    background: f.grad,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 32,
                    marginBottom: 20,
                    boxShadow: `0 8px 24px rgba(124,58,237,0.35)`,
                  }}
                >
                  {f.icon}
                </div>
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 800,
                    color: "#fff",
                    marginBottom: 10,
                    lineHeight: 1.2,
                  }}
                >
                  {f.title}
                </div>
                <div
                  style={{
                    fontSize: 15,
                    color: "rgba(255,255,255,0.5)",
                    lineHeight: 1.6,
                    marginBottom: 24,
                  }}
                >
                  {f.desc}
                </div>
                {/* Accent bottom bar */}
                <div
                  style={{
                    height: 3,
                    borderRadius: 3,
                    background: C.accent,
                    width: `${barW}%`,
                    opacity: 0.7,
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            gap: 100,
            opacity: statsOp,
          }}
        >
          <CounterAnimation target={35} prefix="+" suffix="%" label="de conversion" startFrame={210} duration={65} color={C.accent} />
          <CounterAnimation target={24} suffix="/7" label="disponible" startFrame={225} duration={40} color="#34d399" />
          <CounterAnimation target={48} suffix="h" label="de livraison" startFrame={240} duration={55} color={C.gold} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
