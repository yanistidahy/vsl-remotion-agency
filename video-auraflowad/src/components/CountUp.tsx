import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { FONT } from "../constants";

interface Props {
  target: number;
  startFrame: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  fontSize?: number;
  color?: string;
}

export const CountUp: React.FC<Props> = ({ target, startFrame, duration = 40, prefix = "", suffix = "", fontSize = 140, color = "#fff" }) => {
  const frame = useCurrentFrame();
  const val = Math.floor(interpolate(frame, [startFrame, startFrame + duration], [0, target], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  return (
    <div style={{ fontFamily: FONT.sans, fontSize, fontWeight: 900, color, letterSpacing: "-4px", lineHeight: 1 }}>
      {prefix}{val}{suffix}
    </div>
  );
};
