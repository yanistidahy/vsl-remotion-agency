import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { FONT } from "../constants";

interface Props {
  text: string;
  startFrame: number;
  fontSize?: number;
  color?: string;
  fontWeight?: number;
}

export const SliceReveal: React.FC<Props> = ({ text, startFrame, fontSize = 80, color = "#fff", fontWeight = 900 }) => {
  const frame = useCurrentFrame();
  const pct = Math.min(100, interpolate(frame, [startFrame, startFrame + 14], [0, 100], { extrapolateRight: "clamp" }));

  return (
    <div style={{ overflow: "hidden", display: "inline-block" }}>
      <div style={{
        fontSize, fontWeight, color, fontFamily: FONT.sans,
        letterSpacing: "-1.5px", lineHeight: 1.1,
        clipPath: `inset(0 ${100 - pct}% 0 0)`,
      }}>
        {text}
      </div>
    </div>
  );
};
