import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT } from "../constants";
import { CounterAnimation } from "./CounterAnimation";

const SPRING = { damping: 16, stiffness: 280, mass: 0.8 };
const SPRING_TRANS = { damping: 22, stiffness: 350, mass: 0.7 };
const TRANS = 10;

const FEATURES = [
  {
    icon: "🤖",
    title: "IA Conversationnelle",
    desc: "Répond comme un vrai conseiller humain, comprend le contexte et le besoin.",
    grad: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
    num: "01",
    delay: 0,
  },
  {
    icon: "🧠",
    title: "Mémoire Client",
    desc: "Se souvient de chaque visiteur, personnalise chaque conversation.",
    grad: "linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)",
    num: "02",
    delay: 14,
  },
  {
    icon: "📦",
    title: "Connaissance Produits",
    desc: "Connaît tout votre catalogue, prix, stock et caractéristiques.",
    grad: "linear-gradient(135deg, #6d28d9 0%, #5b21b6 100%)",
    num: "03",
    delay: 28,
  },
];

export const FeaturesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ENTER from right: slide + scale + skew + blur
  const slideIn = interpolate(frame, [0, TRANS], [1920, 0], { extrapolateRight: "clamp" });
  const scaleIn = spring({ fps, frame: Math.max(0, frame), config: SPRING_TRANS, from: 1.08, to: 1.0 });
  const skewIn = interpolate(frame, [0, TRANS], [-5, 0], { extrapolateRight: "clamp" });
  const blurIn = interpolate(frame, [0, Math.min(TRANS, 5)], [10, 0], { extrapolateRight: "clamp" });

  // EXIT to left: slide + scale + skew + blur
  const slideOut = interpolate(frame, [durationInFrames - TRANS, durationInFrames], [0, -1920], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const scaleOut = interpolate(frame, [durationInFrames - TRANS, durationInFrames], [1, 0.92], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const skewOut = interpolate(frame, [durationInFrames - TRANS, durationInFrames], [0, 4], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const blurOut = interpolate(frame, [durationInFrames - TRANS, durationInFrames], [0, 10], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [durationInFrames - TRANS, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const isOut = frame >= durationInFrames - TRANS;

  // Title bar line animates width 0→100%
  const lineW = interpolate(frame, [2, 22], [0, 100], { extrapolateRight: "clamp" });
  const titleOp = interpolate(frame, [8, 24], [0, 1], { extrapolateRight: "clamp" });
  const titleY = spring({ fps, frame: Math.max(0, frame - 8), config: SPRING, from: 24, to: 0 });

  // Dot grid background
  const statsOp = interpolate(frame, [190, 210], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse 120% 80% at 50% 110%, #0f0920 0%, #0a0a0f 55%)`,
        transform: isOut
          ? `translateX(${slideOut}px) scale(${scaleOut}) skewX(${skewOut}deg)`
          : `translateX(${slideIn}px) scale(${scaleIn}) skewX(${skewIn}deg)`,
        filter: isOut ? `blur(${blurOut}px)` : `blur(${blurIn}px)`,
        opacity: fadeOut,
      }}
    >
      {/* Dot grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(rgba(124,58,237,0.18) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          opacity: 0.4,
          pointerEvents: "none",
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 120px",
        }}
      >
        {/* Animated title bar */}
        <div style={{ textAlign: "center", marginBottom: 60, width: "100%" }}>
          <div
            style={{
              height: 2,
              background: `linear-gradient(90deg, transparent, ${C.primary}, ${C.accent}, transparent)`,
              width: `${lineW}%`,
              margin: "0 auto 18px",
              borderRadius: 2,
            }}
          />
          <div
            style={{
              opacity: titleOp,
              transform: `translateY(${titleY}px)`,
              fontFamily: FONT.sans,
            }}
          >
            <div
              style={{
                fontSize: 12,
                color: C.accent,
                fontWeight: 700,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Pourquoi AuraFlow AI
            </div>
            <div
              style={{
                fontSize: 52,
                fontWeight: 900,
                color: "#fff",
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
        </div>

        {/* Feature cards with large background number */}
        <div style={{ display: "flex", gap: 28, width: "100%", marginBottom: 72 }}>
          {FEATURES.map((f, i) => {
            const sc = spring({
              fps,
              frame: Math.max(0, frame - (38 + f.delay)),
              config: SPRING,
              from: 0.88,
              to: 1,
            });
            const op = interpolate(frame, [38 + f.delay, 54 + f.delay], [0, 1], { extrapolateRight: "clamp" });
            const cardY = interpolate(frame, [38 + f.delay, 54 + f.delay], [22, 0], { extrapolateRight: "clamp" });
            const barW = interpolate(frame, [58 + f.delay, 120 + f.delay], [0, 100], { extrapolateRight: "clamp" });

            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.038)",
                  border: "1px solid rgba(124,58,237,0.22)",
                  borderRadius: 22,
                  padding: "36px 28px",
                  transform: `scale(${sc}) translateY(${cardY}px)`,
                  opacity: op,
                  fontFamily: FONT.sans,
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                }}
              >
                {/* Large background number */}
                <div
                  style={{
                    position: "absolute",
                    bottom: -20,
                    right: -10,
                    fontSize: 180,
                    fontWeight: 900,
                    color: "#fff",
                    opacity: 0.03,
                    lineHeight: 1,
                    fontFamily: FONT.sans,
                    letterSpacing: "-8px",
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                >
                  {f.num}
                </div>

                {/* Icon */}
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 18,
                    background: f.grad,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 32,
                    marginBottom: 22,
                    boxShadow: "0 8px 28px rgba(124,58,237,0.4)",
                  }}
                >
                  {f.icon}
                </div>

                <div style={{ fontSize: 21, fontWeight: 800, color: "#fff", marginBottom: 10, lineHeight: 1.2 }}>
                  {f.title}
                </div>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.48)", lineHeight: 1.65, marginBottom: 24 }}>
                  {f.desc}
                </div>

                {/* Animated accent bar */}
                <div style={{ height: 2.5, borderRadius: 2, background: C.accent, width: `${barW}%`, opacity: 0.75 }} />
              </div>
            );
          })}
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 100, opacity: statsOp }}>
          <CounterAnimation target={35} prefix="+" suffix="%" label="de conversion" startFrame={200} duration={60} color={C.accent} />
          <CounterAnimation target={24} suffix="/7" label="disponible" startFrame={215} duration={35} color="#34d399" />
          <CounterAnimation target={48} suffix="h" label="livraison" startFrame={230} duration={50} color={C.gold} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
