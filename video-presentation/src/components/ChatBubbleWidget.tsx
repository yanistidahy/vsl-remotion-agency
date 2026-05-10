import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../constants";

type ChatBubbleWidgetProps = {
  showTooltip?: boolean;
  pulseProgress?: number;
};

export const ChatBubbleWidget: React.FC<ChatBubbleWidgetProps> = ({
  showTooltip = false,
  pulseProgress = 0,
}) => {
  const frame = useCurrentFrame();

  const pulseScale = interpolate((frame * 2) % 60, [0, 30, 60], [1, 1.5, 1]);
  const pulseOpacity = interpolate((frame * 2) % 60, [0, 15, 30, 60], [0.6, 0.3, 0, 0]);

  const tooltipOpacity = interpolate(pulseProgress, [0.3, 0.6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "flex-end",
        flexDirection: "column",
        gap: 10,
      }}
    >
      {/* Tooltip */}
      {showTooltip && (
        <div
          style={{
            background: "#fff",
            borderRadius: 10,
            padding: "7px 12px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
            fontSize: 11,
            color: COLORS.text,
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            fontWeight: 500,
            opacity: tooltipOpacity,
            whiteSpace: "nowrap",
            border: "1px solid #f0f0f0",
          }}
        >
          Un conseil ? 💬
        </div>
      )}

      {/* Bubble */}
      <div style={{ position: "relative" }}>
        {/* Pulse ring */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) scale(${pulseScale})`,
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: COLORS.primary,
            opacity: pulseOpacity * pulseProgress,
          }}
        />
        {/* Main bubble */}
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: COLORS.gradient,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 24px rgba(124,58,237,0.4)",
            cursor: "pointer",
            fontSize: 24,
            position: "relative",
            zIndex: 2,
          }}
        >
          💬
        </div>
        {/* Notification dot */}
        <div
          style={{
            position: "absolute",
            top: -2,
            right: -2,
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: "#ef4444",
            border: "2px solid #fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 9,
            color: "#fff",
            fontWeight: 700,
            zIndex: 3,
          }}
        >
          1
        </div>
      </div>
    </div>
  );
};
