import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT } from "../constants";

const PROBLEMS = [
  { icon: "😴", text: "Votre site dort la nuit" },
  { icon: "❓", text: "Clients sans réponse" },
  { icon: "💸", text: "Ventes perdues" },
];

export const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - 20, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Left side slides from left
  const leftX = spring({ fps, frame, config: { damping: 18, stiffness: 260, mass: 0.9 }, from: -80, to: 0 });
  const leftOp = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });

  // Right side slides from right after frame 160
  const rightX = spring({ fps, frame: Math.max(0, frame - 160), config: { damping: 18, stiffness: 260, mass: 0.9 }, from: 80, to: 0 });
  const rightOp = interpolate(frame, [160, 180], [0, 1], { extrapolateRight: "clamp" });

  // Chat bubble pulse (loop every 80 frames)
  const pulsePhase = (frame % 80) / 80;
  const chatScale = 1 + 0.03 * Math.sin(pulsePhase * Math.PI * 2);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, #0d0520 0%, ${C.dark} 60%, #050312 100%)`,
        opacity: fadeIn * fadeOut,
      }}
    >
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0 120px",
          gap: 0,
        }}
      >
        {/* LEFT: problems */}
        <div
          style={{
            flex: 1,
            transform: `translateX(${leftX}px)`,
            opacity: leftOp,
            paddingRight: 80,
          }}
        >
          <div
            style={{
              fontSize: 13,
              color: C.red,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: 24,
              fontFamily: FONT.sans,
            }}
          >
            Le problème
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {PROBLEMS.map((p, i) => {
              const cardOp = interpolate(frame, [i * 18, i * 18 + 18], [0, 1], { extrapolateRight: "clamp" });
              const cardY = spring({
                fps,
                frame: Math.max(0, frame - i * 18),
                config: { damping: 18, stiffness: 260, mass: 0.9 },
                from: 20,
                to: 0,
              });
              return (
                <div
                  key={i}
                  style={{
                    background: C.redBg,
                    border: "1px solid rgba(239,68,68,0.25)",
                    borderRadius: 14,
                    padding: "20px 24px",
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    opacity: cardOp,
                    transform: `translateY(${cardY}px)`,
                    fontFamily: FONT.sans,
                  }}
                >
                  <span style={{ fontSize: 36 }}>{p.icon}</span>
                  <span
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      color: "#fff",
                    }}
                  >
                    {p.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Vertical divider */}
        <div
          style={{
            width: 1,
            height: 320,
            background: "linear-gradient(180deg, transparent, rgba(124,58,237,0.4), transparent)",
            flexShrink: 0,
          }}
        />

        {/* RIGHT: solution */}
        <div
          style={{
            flex: 1,
            transform: `translateX(${rightX}px)`,
            opacity: rightOp,
            paddingLeft: 80,
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.25,
              letterSpacing: "-0.5px",
              marginBottom: 32,
              fontFamily: FONT.sans,
            }}
          >
            Et si votre site vendait{" "}
            <span
              style={{
                background: `linear-gradient(90deg, ${C.accent}, #c4b5fd)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              24h/24&nbsp;?
            </span>
          </div>

          {/* Chat bubble card */}
          <div
            style={{
              background: "rgba(124,58,237,0.1)",
              border: "1px solid rgba(124,58,237,0.3)",
              borderRadius: 18,
              padding: "22px 26px",
              transform: `scale(${chatScale})`,
              fontFamily: FONT.sans,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: C.gradient,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 15,
                  fontWeight: 900,
                  color: "#fff",
                }}
              >
                A
              </div>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>AuraFlow AI</span>
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#4ade80",
                  marginLeft: "auto",
                  boxShadow: "0 0 8px #4ade80",
                }}
              />
            </div>
            <div
              style={{
                fontSize: 16,
                color: "rgba(255,255,255,0.75)",
                lineHeight: 1.6,
              }}
            >
              AuraFlow AI répond{" "}
              <span style={{ color: C.accent, fontWeight: 700 }}>à chaque visiteur</span>,{" "}
              chaque nuit
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
