import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

type CursorProps = {
  x: number;
  y: number;
  clicking?: boolean;
};

export const Cursor: React.FC<CursorProps> = ({ x, y, clicking = false }) => {
  const frame = useCurrentFrame();
  const clickScale = clicking
    ? interpolate(frame % 10, [0, 3, 6], [1, 0.8, 1], { extrapolateRight: "clamp" })
    : 1;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        pointerEvents: "none",
        zIndex: 100,
        transform: `scale(${clickScale})`,
        transformOrigin: "top left",
      }}
    >
      <svg width={28} height={32} viewBox="0 0 28 32" fill="none">
        <path
          d="M4 2L4 24L9 18L13 26L16 25L12 17L20 17L4 2Z"
          fill="white"
          stroke="#333"
          strokeWidth={1.5}
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
