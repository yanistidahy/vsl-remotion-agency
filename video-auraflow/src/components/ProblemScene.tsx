import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT } from "../constants";

const SPRING = { damping: 16, stiffness: 280, mass: 0.8 };
const TRANS = 10;

const PROBLEMS = [
  {
    icon: "😴",
    title: "Vous dormez,\nils partent",
    stat: "60% abandons nocturnes",
    desc: "60% des achats abandonnés la nuit",
    color: "#ef4444",
    bg: "rgba(239,68,68,0.08)",
    border: "rgba(239,68,68,0.22)",
    cardStart: 28,
  },
  {
    icon: "🔁",
    title: "Questions répétitives",
    stat: "50× / jour en moyenne",
    desc: "Votre équipe répond 50× / jour",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.22)",
    cardStart: 42,
  },
  {
    icon: "📉",
    title: "Taux de conversion\nfaible",
    stat: "2% sans assistance",
    desc: "Seulement 2% achètent sans aide",
    color: "#f97316",
    bg: "rgba(249,115,22,0.08)",
    border: "rgba(249,115,22,0.22)",
    cardStart: 56,
  },
];

const line1Words = "Votre boutique".split(" ");
const line2Words = "perd des ventes chaque nuit".split(" ");

export const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Slide IN from right
  const slideIn = interpolate(frame, [0, TRANS], [1920, 0], { extrapolateRight: "clamp" });
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

  const isOut = frame >= durationInFrames - TRANS;

  // "LE PROBLÈME" label slams in with spring overshoot
  const labelScale = spring({ fps, frame, config: SPRING, from: 0.85, to: 1 });
  const labelX = spring({ fps, frame, config: SPRING, from: -40, to: 0 });
  const labelOp = interpolate(frame, [0, TRANS], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse 110% 70% at 50% 0%, #2a0a0a 0%, #0a0a0f 60%)`,
        transform: `translateX(${isOut ? slideOut : slideIn}px)`,
        opacity: fadeOut,
      }}
    >
      {/* Red radial glow top-center */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 900,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(239,68,68,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

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
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          {/* LE PROBLÈME label slams in */}
          <div
            style={{
              opacity: labelOp,
              transform: `translateX(${labelX}px) scale(${labelScale})`,
              fontSize: 13,
              color: "#ef4444",
              fontWeight: 700,
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              marginBottom: 18,
              fontFamily: FONT.sans,
            }}
          >
            LE PROBLÈME
          </div>

          {/* Headline word-by-word (2 lines) */}
          <div style={{ lineHeight: 1.1, letterSpacing: "-1.5px" }}>
            {/* Line 1: "Votre boutique" */}
            <div style={{ display: "flex", justifyContent: "center", gap: 14, marginBottom: 4 }}>
              {line1Words.map((word, i) => {
                const wStart = 10 + i * 5;
                const wOp = interpolate(frame, [wStart, wStart + 12], [0, 1], {
                  extrapolateRight: "clamp",
                });
                const wY = spring({
                  fps,
                  frame: Math.max(0, frame - wStart),
                  config: SPRING,
                  from: 24,
                  to: 0,
                });
                return (
                  <span
                    key={i}
                    style={{
                      opacity: wOp,
                      transform: `translateY(${wY}px)`,
                      display: "inline-block",
                      fontSize: 56,
                      fontWeight: 900,
                      color: "#fff",
                      fontFamily: FONT.sans,
                    }}
                  >
                    {word}
                  </span>
                );
              })}
            </div>
            {/* Line 2: "perd des ventes chaque nuit" */}
            <div
              style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}
            >
              {line2Words.map((word, i) => {
                const wStart = 12 + (line1Words.length + i) * 5;
                const wOp = interpolate(frame, [wStart, wStart + 12], [0, 1], {
                  extrapolateRight: "clamp",
                });
                const wY = spring({
                  fps,
                  frame: Math.max(0, frame - wStart),
                  config: SPRING,
                  from: 24,
                  to: 0,
                });
                const isNuit = word === "nuit";
                return (
                  <span
                    key={i}
                    style={{
                      opacity: wOp,
                      transform: `translateY(${wY}px)`,
                      display: "inline-block",
                      fontSize: 56,
                      fontWeight: 900,
                      color: isNuit ? "#ef4444" : "#fff",
                      fontFamily: FONT.sans,
                    }}
                  >
                    {word}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3 Problem cards */}
        <div style={{ display: "flex", gap: 28, width: "100%" }}>
          {PROBLEMS.map((p, i) => {
            const cs = p.cardStart;
            const sc = spring({
              fps,
              frame: Math.max(0, frame - cs),
              config: SPRING,
              from: 0.9,
              to: 1,
            });
            const op = interpolate(frame, [cs, cs + 14], [0, 1], { extrapolateRight: "clamp" });
            const cardY = interpolate(frame, [cs, cs + 14], [30, 0], {
              extrapolateRight: "clamp",
            });
            const barW = interpolate(frame, [cs + 20, cs + 70], [0, 100], {
              extrapolateRight: "clamp",
            });
            const statOp = interpolate(frame, [cs + 30, cs + 55], [0, 1], {
              extrapolateRight: "clamp",
            });

            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  background: p.bg,
                  border: `1px solid ${p.border}`,
                  borderRadius: 20,
                  padding: "36px 30px",
                  transform: `scale(${sc}) translateY(${cardY}px)`,
                  opacity: op,
                  fontFamily: FONT.sans,
                  boxShadow: `0 0 60px ${p.color}14`,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div style={{ fontSize: 52, marginBottom: 18 }}>{p.icon}</div>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 900,
                    color: "#fff",
                    marginBottom: 12,
                    lineHeight: 1.25,
                    whiteSpace: "pre-line",
                  }}
                >
                  {p.title}
                </div>
                <div
                  style={{
                    fontSize: 15,
                    color: "rgba(255,255,255,0.48)",
                    lineHeight: 1.65,
                    marginBottom: 28,
                  }}
                >
                  {p.desc}
                </div>
                {/* Animated bottom bar */}
                <div
                  style={{
                    height: 3,
                    borderRadius: 3,
                    background: p.color,
                    width: `${barW}%`,
                    opacity: 0.75,
                  }}
                />
                {/* Animated stat */}
                <div
                  style={{
                    marginTop: 18,
                    fontSize: 11,
                    color: p.color,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    opacity: statOp,
                    textTransform: "uppercase",
                  }}
                >
                  {p.stat}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
