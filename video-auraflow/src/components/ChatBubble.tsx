import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { C, FONT } from "../constants";

type Props = {
  role: "user" | "bot";
  text: string;
  startFrame: number;
};

function renderBold(text: string): React.ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} style={{ color: C.primary, fontWeight: 700 }}>
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export const ChatBubble: React.FC<Props> = ({ role, text, startFrame }) => {
  const frame = useCurrentFrame();
  const local = Math.max(0, frame - startFrame);
  const opacity = interpolate(local, [0, 10], [0, 1], { extrapolateRight: "clamp" });
  const y = interpolate(local, [0, 10], [8, 0], { extrapolateRight: "clamp" });

  const isBot = role === "bot";
  const lines = text.split("\n");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isBot ? "row" : "row-reverse",
        alignItems: "flex-end",
        gap: 8,
        opacity,
        transform: `translateY(${y}px)`,
        marginBottom: 10,
      }}
    >
      {isBot && (
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: C.gradient,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            fontWeight: 800,
            color: "#fff",
            flexShrink: 0,
            fontFamily: FONT.sans,
          }}
        >
          A
        </div>
      )}
      <div
        style={{
          maxWidth: "72%",
          background: isBot ? "#f4f0ff" : C.gradient,
          borderRadius: isBot ? "0 16px 16px 16px" : "16px 0 16px 16px",
          padding: "10px 14px",
          fontSize: 13.5,
          lineHeight: 1.55,
          color: isBot ? "#18181b" : "#fff",
          fontFamily: FONT.sans,
        }}
      >
        {lines.map((line, i) => (
          <p key={i} style={{ margin: i > 0 ? "6px 0 0" : 0 }}>
            {renderBold(line)}
          </p>
        ))}
      </div>
    </div>
  );
};
