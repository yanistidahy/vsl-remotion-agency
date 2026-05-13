import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT, SP_SNAP } from "../constants";
import { CountUp } from "../components/CountUp";

const STATS = [
  { startFrame: 20, type: "countup", target: 35, prefix: "+", suffix: "%", label: "de conversion en plus" },
  { startFrame: 100, type: "slam", text: "24/7", label: "disponible, sans pause" },
  { startFrame: 180, type: "countup", target: 48, prefix: "", suffix: "h", label: "pour être en ligne" },
];

export const Scene5Stats: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const activeIdx = frame < 80 ? 0 : frame < 160 ? 1 : 2;

  return (
    <AbsoluteFill style={{ background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      {STATS.map((s, i) => {
        const isActive = i === activeIdx;
        const appeared = frame >= s.startFrame;
        const sc = appeared ? spring({ fps, frame: Math.max(0, frame - s.startFrame), config: SP_SNAP, from: 1.4, to: isActive ? 1 : 0.6 }) : 0;
        const op = appeared ? interpolate(frame, [s.startFrame, s.startFrame + 6], [0, isActive ? 1 : 0.35], { extrapolateRight: "clamp" }) : 0;
        // Line sweep
        const lineW = interpolate(frame, [s.startFrame + 8, s.startFrame + 24], [0, 80], { extrapolateRight: "clamp" });

        return (
          <div key={i} style={{ opacity: op, transform: `scale(${sc})`, position: "absolute", display: "flex", flexDirection: "column", alignItems: "center" }}>
            {s.type === "countup" ? (
              <CountUp target={s.target!} startFrame={s.startFrame} duration={40} prefix={s.prefix} suffix={s.suffix} fontSize={140} color={C.white} />
            ) : (
              <div style={{ fontFamily: FONT.sans, fontSize: 140, fontWeight: 900, color: C.white, letterSpacing: "-4px", lineHeight: 1 }}>{s.text}</div>
            )}
            <div style={{ height: 3, background: C.purple, width: `${lineW}%`, borderRadius: 2, marginTop: 8 }} />
            <div style={{ fontFamily: FONT.sans, fontSize: 30, color: C.gray, marginTop: 14, letterSpacing: "-0.5px" }}>{s.label}</div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
