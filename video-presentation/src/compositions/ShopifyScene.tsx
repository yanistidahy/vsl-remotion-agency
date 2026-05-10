import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { MacBook } from "../components/MacBook";
import { ShopifyStore } from "../components/ShopifyStore";
import { ChatBubbleWidget } from "../components/ChatBubbleWidget";
import { COLORS } from "../constants";

// Combined scene: MacBook appears (0-30), scroll (30-180), bubble pulsing (180-480)
export const ShopifyScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // MacBook entrance
  const macbookY = spring({
    fps,
    frame,
    config: { damping: 18, stiffness: 80, mass: 1 },
    from: 70,
    to: 0,
  });
  const macbookOpacity = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: "clamp" });
  const screenOpacity = interpolate(frame, [20, 55], [0, 1], { extrapolateRight: "clamp" });

  // Scroll down (frames 30 → 180): shows products below the fold
  const scrollY = interpolate(frame, [30, 200], [0, 310], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Slight zoom in as we browse
  const zoom = interpolate(frame, [60, 220], [1, 1.18], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Chat bubble appears at frame 180
  const bubbleProgress = spring({
    fps,
    frame: Math.max(0, frame - 180),
    config: { damping: 14, stiffness: 120 },
    from: 0,
    to: 1,
  });
  const showBubble = frame >= 180;
  const showTooltip = frame >= 290;
  const pulseProgress = interpolate(frame, [180, 400], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Bottom brand text
  const taglineOpacity = interpolate(frame, [55, 90], [0, 1], { extrapolateRight: "clamp" });
  const taglineY = interpolate(frame, [55, 90], [12, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse at center, #1e053f 0%, #0a0a0f 65%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Ambient glow behind MacBook */}
      <div
        style={{
          position: "absolute",
          top: "38%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 700,
          height: 320,
          background: `radial-gradient(ellipse, ${COLORS.primary}22 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* MacBook */}
      <div
        style={{
          transform: `translateY(${macbookY}px) scale(${zoom})`,
          opacity: macbookOpacity,
          transformOrigin: "center center",
        }}
      >
        <MacBook
          screenOpacity={screenOpacity}
          screenContent={
            <div style={{ width: "100%", height: "100%", position: "relative" }}>
              <ShopifyStore scrollY={scrollY} />

              {/* AuraFlow chat bubble — bottom-right of Shopify store */}
              {showBubble && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 20,
                    right: 14,
                    transform: `scale(${bubbleProgress})`,
                    transformOrigin: "bottom right",
                    opacity: bubbleProgress,
                  }}
                >
                  <ChatBubbleWidget showTooltip={showTooltip} pulseProgress={pulseProgress} />
                </div>
              )}
            </div>
          }
        />
      </div>

      {/* Brand tagline below MacBook */}
      <div
        style={{
          position: "absolute",
          bottom: 54,
          opacity: taglineOpacity,
          transform: `translateY(${taglineY}px)`,
          textAlign: "center",
        }}
      >
        <p
          style={{
            color: "rgba(255,255,255,0.45)",
            fontSize: 17,
            fontFamily: "'Helvetica Neue', sans-serif",
            letterSpacing: 3,
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          Powered by{" "}
          <span style={{ color: COLORS.primary, fontWeight: 700 }}>AuraFlow AI</span>
        </p>
      </div>
    </AbsoluteFill>
  );
};
