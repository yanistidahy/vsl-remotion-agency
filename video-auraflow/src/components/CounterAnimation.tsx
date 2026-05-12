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
  duration = 90,
  color = C.primary,
}) => {
  const frame = useCurrentFrame();
  const localFrame = Math.max(0, frame - startFrame);

  const value = Math.floor(
    interpolate(localFrame, [0, duration], [0, target], {
      extrapolateRight: "clamp",
    })
  );

  const opacity = interpolate(localFrame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const scale = interpolate(localFrame, [0, 20], [0.7, 1], { extrapolateRight: "clamp" });

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
          fontSize: 72,
          fontWeight: 800,
          color,
          lineHeight: 1,
          letterSpacing: "-2px",
        }}
      >
        {prefix}{value}{suffix}
      </div>
      <div
        style={{
          fontSize: 17,
          color: "rgba(255,255,255,0.55)",
          marginTop: 10,
          fontWeight: 400,
          letterSpacing: 0.5,
        }}
      >
        {label}
      </div>
    </div>
  );
};
