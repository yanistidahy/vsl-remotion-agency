import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { MacBook } from "../components/MacBook";
import { BeautyWebsite } from "../components/BeautyWebsite";
import { ChatBubbleWidget } from "../components/ChatBubbleWidget";
import { COLORS } from "../constants";

export const ChatBubbleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Bubble appears
  const bubbleProgress = spring({ fps, frame: Math.max(0, frame - 15), config: { damping: 14, stiffness: 120 }, from: 0, to: 1 });
  const bubbleOpacity = interpolate(frame, [15, 35], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Tooltip appears later
  const showTooltip = frame > 50;
  const pulseProgress = interpolate(frame, [15, 80], [0, 1], { extrapolateRight: "clamp" });

  // MacBook stays zoomed in from previous scene
  const scale = 1.35;
  const translateY = -30;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at center, #1a0533 0%, ${COLORS.dark} 70%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          transform: `scale(${scale}) translateY(${translateY}px)`,
          transformOrigin: "center center",
        }}
      >
        <MacBook
          screenOpacity={1}
          screenContent={
            <div style={{ width: "100%", height: "100%", position: "relative" }}>
              <BeautyWebsite scrollY={80} />
              {/* Chat bubble overlaid on screen */}
              <div
                style={{
                  position: "absolute",
                  bottom: 16,
                  right: 16,
                  transform: `scale(${bubbleProgress})`,
                  transformOrigin: "bottom right",
                  opacity: bubbleOpacity,
                }}
              >
                <ChatBubbleWidget showTooltip={showTooltip} pulseProgress={pulseProgress} />
              </div>
            </div>
          }
          scale={1}
        />
      </div>
    </AbsoluteFill>
  );
};
