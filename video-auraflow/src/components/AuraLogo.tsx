import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT } from "../constants";

type Props = {
  size?: number;
  showWordmark?: boolean;
  startFrame?: number;
};

export const AuraLogo: React.FC<Props> = ({
  size = 80,
  showWordmark = true,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = Math.max(0, frame - startFrame);

  const scale = spring({ fps, frame: local, config: { damping: 18, stiffness: 260, mass: 0.9 }, from: 0, to: 1 });
  const opacity = interpolate(local, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  const glowPulse = 0.6 + 0.4 * Math.sin(frame / 30);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: size * 0.2,
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      {/* SVG icon */}
      <div
        style={{
          width: size,
          height: size,
          borderRadius: size * 0.25,
          filter: `drop-shadow(0 0 ${size * 0.3 * glowPulse}px rgba(124,58,237,0.7))`,
          flexShrink: 0,
        }}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#9333ea" />
              <stop offset="45%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#4f46e5" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="48" fill="url(#logoGrad)" />
          {/* Geometric A lettermark */}
          <path
            d="M32 74 L50 26 L68 74"
            stroke="white"
            strokeWidth="6.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <line
            x1="39"
            y1="56"
            x2="61"
            y2="56"
            stroke="white"
            strokeWidth="6.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {showWordmark && (
        <div
          style={{
            fontFamily: FONT.sans,
            fontSize: size * 0.65,
            fontWeight: 900,
            letterSpacing: "-0.03em",
            lineHeight: 1,
            color: "#fff",
          }}
        >
          AuraFlow{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #a78bfa, #c4b5fd)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            AI
          </span>
        </div>
      )}
    </div>
  );
};
