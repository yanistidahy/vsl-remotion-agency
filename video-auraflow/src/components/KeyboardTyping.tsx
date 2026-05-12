import React from "react";
import { interpolate } from "remotion";
import { C, FONT } from "../constants";

const ROW1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const ROW2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const ROW3 = ["Z", "X", "C", "V", "B", "N", "M"];

const Key: React.FC<{ label: string; active: boolean; w?: number; h?: number }> = ({
  label,
  active,
  w = 58,
  h = 56,
}) => (
  <div
    style={{
      width: w,
      height: h,
      background: active ? C.primary : "#1e1e1e",
      border: `1px solid ${active ? C.accent : "#333"}`,
      borderRadius: 7,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: active ? "#fff" : "#888",
      fontSize: label.length > 3 ? 11 : label.length > 1 ? 13 : 16,
      fontWeight: 700,
      fontFamily: FONT.sans,
      transform: active ? "scale(0.87) translateY(2px)" : "scale(1)",
      boxShadow: active
        ? `0 0 18px ${C.primary}90, inset 0 -2px 0 rgba(0,0,0,0.4)`
        : "inset 0 -4px 0 rgba(0,0,0,0.5)",
      userSelect: "none",
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
  const y = interpolate(slideProgress, [0, 1], [260, 0]);
  const opacity = interpolate(slideProgress, [0, 0.4], [0, 1], { extrapolateRight: "clamp" });
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
        zIndex: 20,
      }}
    >
      <div
        style={{
          background: "rgba(10,10,15,0.96)",
          borderRadius: "22px 22px 0 0",
          padding: "26px 44px 22px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          alignItems: "center",
          boxShadow: "0 -12px 50px rgba(0,0,0,0.7)",
          border: "1px solid rgba(124,58,237,0.15)",
          borderBottom: "none",
        }}
      >
        <div style={{ display: "flex", gap: 6 }}>
          {ROW1.map((k) => <Key key={k} label={k} active={a(k)} />)}
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <div style={{ width: 29 }} />
          {ROW2.map((k) => <Key key={k} label={k} active={a(k)} />)}
          <Key label="↵ ENTER" active={a("ENTER")} w={108} />
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <Key label="⇧" active={false} w={108} />
          {ROW3.map((k) => <Key key={k} label={k} active={a(k)} />)}
          <Key label="⇧" active={false} w={108} />
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <Key label="⌘" active={false} w={68} />
          <Key label="⌥" active={false} w={68} />
          <Key label="" active={a("SPACE")} w={420} />
          <Key label="⌥" active={false} w={68} />
          <Key label="⌘" active={false} w={68} />
        </div>
      </div>
    </div>
  );
};
