import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { MacBook } from "../components/MacBook";
import { BeautyWebsite } from "../components/BeautyWebsite";
import { COLORS } from "../constants";

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // MacBook slides up and fades in
  const macbookY = spring({ fps, frame, config: { damping: 18, stiffness: 80, mass: 1 }, from: 80, to: 0 });
  const macbookOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // Screen turns on
  const screenOpacity = interpolate(frame, [20, 50], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at center, #1a0533 0%, ${COLORS.dark} 70%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 30,
      }}
    >
      {/* Subtle background glow */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 300,
          background: `radial-gradient(ellipse, ${COLORS.primary}30 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* MacBook */}
      <div
        style={{
          transform: `translateY(${macbookY}px)`,
          opacity: macbookOpacity,
        }}
      >
        <MacBook
          screenOpacity={screenOpacity}
          screenContent={<BeautyWebsite />}
          scale={1}
        />
      </div>

      {/* Brand tagline */}
      <div
        style={{
          opacity: interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" }),
          transform: `translateY(${interpolate(frame, [60, 90], [10, 0], { extrapolateRight: "clamp" })}px)`,
          textAlign: "center",
        }}
      >
        <p
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: 18,
            fontFamily: "'Helvetica Neue', sans-serif",
            letterSpacing: 3,
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          Powered by <span style={{ color: COLORS.primary, fontWeight: 700 }}>AuraFlow AI</span>
        </p>
      </div>
    </AbsoluteFill>
  );
};
