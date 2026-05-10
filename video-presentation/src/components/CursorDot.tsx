import React from "react";
import { interpolate } from "remotion";

type Props = {
  x: number;
  y: number;
  visible: boolean;
  clicking: boolean;
};

export const CursorDot: React.FC<Props> = ({ x, y, visible, clicking }) => {
  if (!visible) return null;

  const scale = clicking ? 0.75 : 1;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${scale})`,
        pointerEvents: "none",
        zIndex: 50,
      }}
    >
      {/* Outer ring */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "2px solid rgba(255,255,255,0.6)",
          boxShadow: "0 0 10px rgba(0,0,0,0.4)",
        }}
      />
      {/* Inner dot */}
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#fff",
          boxShadow: "0 0 8px rgba(255,255,255,0.9), 0 2px 8px rgba(0,0,0,0.4)",
          position: "relative",
          top: 14,
          left: 14,
        }}
      />
    </div>
  );
};
