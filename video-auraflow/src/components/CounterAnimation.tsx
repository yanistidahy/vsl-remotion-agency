import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { C, FONT } from "../constants";

type Props = {
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
  startFrame?: number;
  duration?: number;
  color?: string;
};

export const CounterAnimation: React.FC<Props> = ({
  target,
  prefix = "",
  suffix = "",
  label,
  startFrame = 0,
  duration = 70,
  color = C.accent,
}) => {
  const frame = useCurrentFrame();
  const local = Math.max(0, frame - startFrame);

  const value = Math.floor(
    interpolate(local, [0, duration], [0, target], { extrapolateRight: "clamp" })
  );

  const opacity = interpolate(local, [0, 18], [0, 1], { extrapolateRight: "clamp" });
  const scale = interpolate(local, [0, 18], [0.75, 1], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        textAlign: "center",
        opacity,
        transform: `scale(${scale})`,
        fontFamily: FONT.sans,
      }}
    >
      <div
        style={{
          fontSize: 68,
          fontWeight: 900,
          lineHeight: 1,
          letterSpacing: "-2px",
          background: `linear-gradient(135deg, ${color}, #fff)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {prefix}{value}{suffix}
      </div>
      <div
        style={{
          fontSize: 15,
          color: "rgba(255,255,255,0.45)",
          marginTop: 10,
          fontWeight: 500,
          letterSpacing: 0.3,
        }}
      >
        {label}
      </div>
    </div>
  );
};
