import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../constants";

export const TypingIndicator: React.FC = () => {
  const frame = useCurrentFrame();

  const dot = (offset: number) => {
    const y = interpolate(
      (frame + offset) % 20,
      [0, 5, 10, 15, 20],
      [0, -6, 0, 0, 0],
      { extrapolateRight: "clamp" }
    );
    return (
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: COLORS.textMuted,
          transform: `translateY(${y}px)`,
        }}
      />
    );
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 5,
        padding: "10px 14px",
        background: COLORS.bubbleBot,
        borderRadius: "18px 18px 18px 4px",
        width: "fit-content",
      }}
    >
      {dot(0)}
      {dot(7)}
      {dot(14)}
    </div>
  );
};
