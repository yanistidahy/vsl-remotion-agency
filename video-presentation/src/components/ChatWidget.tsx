import React from "react";
import { interpolate } from "remotion";

const PRIMARY = "#7c3aed";
const GRADIENT = "linear-gradient(135deg, #7c3aed, #4f46e5)";

export type ChatMessage = {
  role: "bot" | "user";
  text: string;
};

// Render **bold** markdown inline
const parseText = (text: string): React.ReactNode[] =>
  text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i}>{part.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );

const TypingDots: React.FC<{ frame: number }> = ({ frame }) => {
  const dot = (offset: number) => {
    const y = interpolate((frame + offset) % 36, [0, 9, 18, 27, 36], [0, -7, 0, 0, 0]);
    return (
      <div
        style={{
          width: 9,
          height: 9,
          borderRadius: "50%",
          background: "#999",
          transform: `translateY(${y}px)`,
        }}
      />
    );
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "12px 16px",
        background: "#f0f0f0",
        borderRadius: "18px 18px 18px 4px",
        width: "fit-content",
      }}
    >
      {dot(0)}
      {dot(12)}
      {dot(24)}
    </div>
  );
};

type Props = {
  slideProgress: number; // 0-1 chat window open animation
  messages: ChatMessage[];
  inputText: string;
  showTypingIndicator: boolean;
  cursorBlink: boolean;
  keyboardVisible: boolean; // shifts window up when keyboard is on screen
  frame: number;
};

export const ChatWidget: React.FC<Props> = ({
  slideProgress,
  messages,
  inputText,
  showTypingIndicator,
  cursorBlink,
  keyboardVisible,
  frame,
}) => {
  const translateY = interpolate(slideProgress, [0, 1], [80, 0]);
  const opacity = interpolate(slideProgress, [0, 0.3], [0, 1], { extrapolateRight: "clamp" });

  // Shift up when keyboard is visible
  const bottomOffset = keyboardVisible ? 300 : 40;

  return (
    <div
      style={{
        position: "absolute",
        right: 44,
        bottom: bottomOffset,
        width: 380,
        background: "#fff",
        borderRadius: 18,
        overflow: "hidden",
        boxShadow:
          "0 24px 80px rgba(124,58,237,0.22), 0 8px 30px rgba(0,0,0,0.18)",
        transform: `translateY(${translateY}px)`,
        opacity,
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        zIndex: 30,
        maxHeight: 580,
      }}
    >
      {/* Header */}
      <div
        style={{
          background: GRADIENT,
          padding: "16px 18px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.2)",
            border: "2px solid rgba(255,255,255,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            color: "#fff",
            fontSize: 18,
          }}
        >
          A
        </div>
        <div>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>Assistant</div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#4ade80",
                boxShadow: "0 0 6px #4ade80",
              }}
            />
            <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 12 }}>En ligne</span>
          </div>
        </div>
        <div style={{ marginLeft: "auto", color: "rgba(255,255,255,0.6)", fontSize: 20 }}>✕</div>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          padding: "16px 14px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          background: "#fafafa",
          overflowY: "hidden",
          minHeight: 0,
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            <div
              style={{
                maxWidth: "82%",
                padding: "11px 16px",
                borderRadius:
                  msg.role === "user"
                    ? "18px 18px 4px 18px"
                    : "18px 18px 18px 4px",
                background: msg.role === "user" ? PRIMARY : "#f0f0f0",
                color: msg.role === "user" ? "#fff" : "#1a1a1a",
                fontSize: 14,
                lineHeight: 1.55,
                whiteSpace: "pre-line",
              }}
            >
              {parseText(msg.text)}
            </div>
          </div>
        ))}

        {showTypingIndicator && <TypingDots frame={frame} />}
      </div>

      {/* Input */}
      <div
        style={{
          padding: "12px 14px",
          borderTop: "1px solid #ececec",
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: "#fff",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            flex: 1,
            height: 38,
            background: "#f4f4f5",
            borderRadius: 22,
            fontSize: 14,
            color: inputText ? "#1a1a1a" : "#aaa",
            display: "flex",
            alignItems: "center",
            paddingLeft: 16,
            paddingRight: 12,
            letterSpacing: 0.2,
          }}
        >
          {inputText || "Tapez votre message…"}
          {/* Blinking cursor */}
          {cursorBlink && (
            <span
              style={{
                display: "inline-block",
                width: 2,
                height: 16,
                background: PRIMARY,
                marginLeft: 1,
                borderRadius: 1,
              }}
            />
          )}
        </div>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            background: inputText ? GRADIENT : "#e5e5e5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: inputText ? "#fff" : "#aaa",
            fontSize: 16,
            flexShrink: 0,
          }}
        >
          ↑
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          textAlign: "center",
          padding: "6px 0 9px",
          fontSize: 10,
          color: "#bbb",
          background: "#fff",
          borderTop: "1px solid #f5f5f5",
          flexShrink: 0,
        }}
      >
        Powered by{" "}
        <span style={{ color: PRIMARY, fontWeight: 700 }}>AuraFlow AI</span>
      </div>
    </div>
  );
};
