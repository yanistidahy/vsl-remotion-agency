import React from "react";
import { Img, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

interface Props { size?: number; startFrame?: number; }

export const AuraLogoMark: React.FC<Props> = ({ size = 80, startFrame = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sc = spring({ fps, frame: Math.max(0, frame - startFrame), config: { damping: 16, stiffness: 350 }, from: 0, to: 1 });
  const glow = 0.5 + 0.5 * Math.sin(frame / 20);
  return (
    <div style={{
      transform: `scale(${sc})`,
      filter: `drop-shadow(0 0 ${24 * glow}px rgba(124,58,237,0.9))`,
      display: "inline-block",
    }}>
      <Img src={staticFile("logo.svg")} width={size * 1.5} height={size} />
    </div>
  );
};
