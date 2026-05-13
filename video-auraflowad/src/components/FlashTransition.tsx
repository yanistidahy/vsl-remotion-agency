import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const FlashTransition: React.FC<{ cutFrame: number }> = ({ cutFrame }) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [cutFrame - 2, cutFrame, cutFrame + 2], [0, 1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  if (op === 0) return null;
  return (
    <AbsoluteFill style={{ background: "#fff", opacity: op, zIndex: 100, pointerEvents: "none" }} />
  );
};
