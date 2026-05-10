import React from "react";
import { interpolate } from "remotion";

const ROW1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const ROW2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const ROW3 = ["Z", "X", "C", "V", "B", "N", "M"];

type KeyProps = {
  label: string;
  active: boolean;
  width?: number;
  height?: number;
};

const Key: React.FC<KeyProps> = ({ label, active, width = 62, height = 60 }) => (
  <div
    style={{
      width,
      height,
      background: active ? "#7c3aed" : "#252525",
      border: `1px solid ${active ? "#a78bfa" : "#3a3a3a"}`,
      borderRadius: 8,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: active ? "#fff" : "#b0b0b0",
      fontSize: label.length > 3 ? 12 : label.length > 1 ? 14 : 18,
      fontWeight: 600,
      fontFamily: "'Helvetica Neue', sans-serif",
      transform: active ? "scale(0.88) translateY(2px)" : "scale(1)",
      boxShadow: active
        ? "0 0 16px rgba(124,58,237,0.7), inset 0 -2px 0 rgba(0,0,0,0.4)"
        : "inset 0 -4px 0 rgba(0,0,0,0.5), 0 2px 6px rgba(0,0,0,0.4)",
      transition: "none",
      userSelect: "none",
    }}
  >
    {label}
  </div>
);

type Props = {
  activeKey: string | null;
  slideProgress: number; // 0 = hidden, 1 = fully visible
};

export const KeyboardComponent: React.FC<Props> = ({ activeKey, slideProgress }) => {
  const translateY = interpolate(slideProgress, [0, 1], [280, 0]);
  const opacity = interpolate(slideProgress, [0, 0.4], [0, 1], { extrapolateRight: "clamp" });

  const active = (k: string) => activeKey === k;

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        transform: `translateY(${translateY}px)`,
        opacity,
        zIndex: 20,
      }}
    >
      <div
        style={{
          background: "rgba(12, 12, 12, 0.94)",
          backdropFilter: "blur(24px)",
          borderRadius: "24px 24px 0 0",
          padding: "28px 48px 24px",
          display: "flex",
          flexDirection: "column",
          gap: 9,
          alignItems: "center",
          boxShadow: "0 -16px 60px rgba(0,0,0,0.6)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "none",
        }}
      >
        {/* Row 1 */}
        <div style={{ display: "flex", gap: 7 }}>
          {ROW1.map((k) => (
            <Key key={k} label={k} active={active(k)} />
          ))}
        </div>

        {/* Row 2 + Enter */}
        <div style={{ display: "flex", gap: 7 }}>
          <div style={{ width: 31 }} /> {/* offset */}
          {ROW2.map((k) => (
            <Key key={k} label={k} active={active(k)} />
          ))}
          <Key label="↵ ENTER" active={active("ENTER")} width={114} />
        </div>

        {/* Row 3 */}
        <div style={{ display: "flex", gap: 7 }}>
          <Key label="⇧ SHIFT" active={false} width={116} />
          {ROW3.map((k) => (
            <Key key={k} label={k} active={active(k)} />
          ))}
          <Key label="⇧ SHIFT" active={false} width={116} />
        </div>

        {/* Space row */}
        <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
          <Key label="⌘" active={false} width={72} />
          <Key label="⌥" active={false} width={72} />
          <Key label="" active={active("SPACE")} width={440} />
          <Key label="⌥" active={false} width={72} />
          <Key label="⌘" active={false} width={72} />
        </div>
      </div>
    </div>
  );
};
