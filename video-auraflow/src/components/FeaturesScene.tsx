import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT } from "../constants";
import { CounterAnimation } from "./CounterAnimation";

const features = [
  {
    icon: "🤖",
    title: "IA entraînée sur votre catalogue",
    desc: "GPT-4 connaît chaque produit, ses caractéristiques et ses avantages pour des recommandations ultra-précises.",
    color: C.accent,
  },
  {
    icon: "⚡",
    title: "Réponse en moins d'1 seconde",
    desc: "Vos clients n'attendent jamais. L'IA répond instantanément, 24h/24, 7j/7, sans aucune interruption.",
    color: "#34d399",
  },
  {
    icon: "🔗",
    title: "Intégration Shopify en 5 min",
    desc: "Une ligne de code. Aucune compétence technique requise. Opérationnel en moins de 5 minutes chrono.",
    color: C.gold,
  },
];

export const FeaturesScene: React.FC = () => {
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
        background: `radial-gradient(ellipse 120% 80% at 50% 100%, #0f0a25 0%, ${C.darker} 60%)`,
        opacity: fadeOut,
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
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            textAlign: "center",
            marginBottom: 60,
          }}
        >
          <div
            style={{
              fontSize: 14,
              color: C.accent,
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: "uppercase",
              marginBottom: 16,
              fontFamily: FONT.sans,
            }}
          >
            Fonctionnalités
          </div>
          <div
            style={{
              fontSize: 52,
              fontWeight: 800,
              color: "#fff",
              fontFamily: FONT.sans,
              letterSpacing: "-1.5px",
              lineHeight: 1.1,
            }}
          >
            Tout pour{" "}
            <span
              style={{
                background: `linear-gradient(90deg, ${C.accent}, #c4b5fd)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              convertir plus
            </span>
          </div>
        </div>

        {/* Feature cards */}
        <div style={{ display: "flex", gap: 32, width: "100%", marginBottom: 64 }}>
          {features.map((f, i) => {
            const start = 40 + i * 30;
            const sc = spring({ fps, frame: Math.max(0, frame - start), config: { damping: 22, stiffness: 200 }, from: 0.88, to: 1 });
            const op = interpolate(frame, [start, start + 20], [0, 1], { extrapolateRight: "clamp" });
            const lineW = interpolate(frame, [start + 20, start + 70], [0, 100], { extrapolateRight: "clamp" });

            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${f.color}33`,
                  borderRadius: 20,
                  padding: "36px 30px",
                  transform: `scale(${sc})`,
                  opacity: op,
                  fontFamily: FONT.sans,
                  boxShadow: `0 0 60px ${f.color}0d`,
                }}
              >
                <div style={{ fontSize: 44, marginBottom: 20 }}>{f.icon}</div>
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 800,
                    color: "#fff",
                    marginBottom: 14,
                    lineHeight: 1.2,
                  }}
                >
                  {f.title}
                </div>
                <div
                  style={{
                    fontSize: 15,
                    color: "rgba(255,255,255,0.5)",
                    lineHeight: 1.65,
                    marginBottom: 24,
                  }}
                >
                  {f.desc}
                </div>
                <div
                  style={{
                    height: 2,
                    borderRadius: 2,
                    background: f.color,
                    width: `${lineW}%`,
                    opacity: 0.6,
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Counter row */}
        <div
          style={{
            display: "flex",
            gap: 80,
            opacity: interpolate(frame, [150, 180], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <CounterAnimation target={34} suffix="%" label="Hausse des conversions" startFrame={160} duration={120} color={C.accent} />
          <CounterAnimation target={200} suffix="+" label="Boutiques actives" startFrame={180} duration={130} color="#34d399" />
          <CounterAnimation target={98} suffix="%" label="Satisfaction clients" startFrame={200} duration={120} color={C.gold} />
          <CounterAnimation target={24} suffix="/7" label="Disponibilité" startFrame={220} duration={60} color="#f472b6" />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
