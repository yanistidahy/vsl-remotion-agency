import React from "react";
import { interpolate } from "remotion";
import { C, FONT } from "../constants";

// AZERTY layout
const ROW1 = ["A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P"];
const ROW2 = ["Q", "S", "D", "F", "G", "H", "J", "K", "L", "M"];
const ROW3 = ["W", "X", "C", "V", "B", "N"];

const Key: React.FC<{ label: string; active: boolean; w?: number }> = ({
  label,
  active,
  w = 36,
}) => (
  <div
    style={{
      width: w,
      height: 36,
      background: active ? C.gradient : "rgba(255,255,255,0.08)",
      border: `1px solid ${active ? C.accent : "rgba(255,255,255,0.12)"}`,
      borderRadius: 6,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: active ? "#fff" : "rgba(255,255,255,0.6)",
      fontSize: label.length > 3 ? 9 : label.length > 1 ? 11 : 13,
      fontWeight: 700,
      fontFamily: FONT.sans,
      transform: active ? "scale(0.9) translateY(1px)" : "scale(1)",
      boxShadow: active
        ? `0 0 14px ${C.primary}99`
        : "inset 0 -2px 0 rgba(0,0,0,0.3)",
      userSelect: "none",
      flexShrink: 0,
    }}
  >
    {label}
  </div>
);

type Props = {
  activeKey: string | null;
  slideProgress: number;
};

export const KeyboardTyping: React.FC<Props> = ({ activeKey, slideProgress }) => {
  const y = interpolate(slideProgress, [0, 1], [200, 0], { extrapolateRight: "clamp" });
  const opacity = interpolate(slideProgress, [0, 0.5], [0, 1], { extrapolateRight: "clamp" });
  const a = (k: string) => activeKey === k;

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        transform: `translateY(${y}px)`,
        opacity,
        zIndex: 30,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          background: "rgba(8,6,18,0.97)",
          borderRadius: "18px 18px 0 0",
          padding: "20px 36px 18px",
          display: "flex",
          flexDirection: "column",
          gap: 6,
          alignItems: "center",
          boxShadow: "0 -10px 40px rgba(0,0,0,0.6)",
          border: "1px solid rgba(124,58,237,0.2)",
          borderBottom: "none",
        }}
      >
        <div style={{ display: "flex", gap: 5 }}>
          {ROW1.map((k) => <Key key={k} label={k} active={a(k)} />)}
        </div>
        <div style={{ display: "flex", gap: 5 }}>
          <div style={{ width: 18 }} />
          {ROW2.map((k) => <Key key={k} label={k} active={a(k)} />)}
          <Key label="↵" active={a("ENTER")} w={52} />
        </div>
        <div style={{ display: "flex", gap: 5 }}>
          <Key label="⇧" active={false} w={80} />
          {ROW3.map((k) => <Key key={k} label={k} active={a(k)} />)}
          <Key label="⇧" active={false} w={80} />
        </div>
        <div style={{ display: "flex", gap: 5 }}>
          <Key label="⌘" active={false} w={52} />
          <Key label="⌥" active={false} w={52} />
          <Key label="" active={a("SPACE")} w={320} />
          <Key label="⌥" active={false} w={52} />
          <Key label="⌘" active={false} w={52} />
        </div>
      </div>
    </div>
  );
};
