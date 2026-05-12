import React from "react";
import { interpolate, random, useCurrentFrame } from "remotion";
import { C } from "../constants";

type Props = {
  count?: number;
  color?: string;
  speed?: number;
};

export const ParticleEffect: React.FC<Props> = ({
  count = 28,
  color = C.primary,
  speed = 1,
}) => {
  const frame = useCurrentFrame();

  const particles = Array.from({ length: count }, (_, i) => {
    const x = random(`px-${i}`) * 1920;
    const startY = 1080 + random(`psy-${i}`) * 300;
    const drift = (random(`pdrift-${i}`) - 0.5) * 120;
    const spd = (0.6 + random(`pspd-${i}`) * 1.2) * speed;
    const size = 3 + random(`psz-${i}`) * 7;
    const delay = random(`pdel-${i}`) * 120;

    const currentY = startY - Math.max(0, frame - delay) * spd;
    const opacity = interpolate(
      currentY,
      [-100, 100, 600, 1080],
      [0, 0.25, 0.55, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    return { x: x + drift * (frame / 600), y: currentY, size, opacity };
  });

  return (
    <>
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: color,
            opacity: p.opacity,
            boxShadow: `0 0 ${p.size * 2}px ${color}`,
            pointerEvents: "none",
          }}
        />
      ))}
    </>
  );
};
