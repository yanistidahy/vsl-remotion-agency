import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { MacBook } from "../components/MacBook";
import { BeautyWebsite } from "../components/BeautyWebsite";
import { COLORS } from "../constants";

export const WebsiteBrowse: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Zoom into the MacBook screen
  const scale = interpolate(frame, [0, 210], [1, 1.35], { extrapolateRight: "clamp" });
  const translateY = interpolate(frame, [0, 210], [0, -30], { extrapolateRight: "clamp" });

  // Website scroll animation
  const scrollY = interpolate(frame, [60, 180], [0, 80], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at center, #1a0533 0%, ${COLORS.dark} 70%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 700,
          height: 350,
          background: `radial-gradient(ellipse, ${COLORS.primary}25 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          transform: `scale(${scale}) translateY(${translateY}px)`,
          transformOrigin: "center center",
        }}
      >
        <MacBook
          screenOpacity={1}
          screenContent={<BeautyWebsite scrollY={scrollY} />}
          scale={1}
        />
      </div>
    </AbsoluteFill>
  );
};
