import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT, SP_SNAP } from "../constants";

interface Props {
  text: string;
  startFrame: number;
  stagger?: number;
  fontSize?: number;
  color?: string;
  fontWeight?: number;
  letterSpacing?: string;
  textAlign?: "center" | "left";
}

export const WordByWord: React.FC<Props> = ({
  text, startFrame, stagger = 5, fontSize = 100, color = "#fff",
  fontWeight = 900, letterSpacing = "-2px", textAlign = "center",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(" ");

  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: textAlign === "center" ? "center" : "flex-start", gap: "0 14px", fontFamily: FONT.sans }}>
      {words.map((word, i) => {
        const ws = startFrame + i * stagger;
        const sc = spring({ fps, frame: Math.max(0, frame - ws), config: SP_SNAP, from: 1.35, to: 1 });
        const op = interpolate(frame, [ws, ws + 4], [0, 1], { extrapolateRight: "clamp" });
        return (
          <span key={i} style={{
            display: "inline-block",
            fontSize, fontWeight, color, letterSpacing, lineHeight: 1.1,
            opacity: op, transform: `scale(${sc})`,
          }}>
            {word}
          </span>
        );
      })}
    </div>
  );
};
