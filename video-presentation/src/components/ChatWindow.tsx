import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../constants";
import { TypingIndicator } from "./TypingIndicator";

export type Message = {
  role: "bot" | "user";
  text: string;
  typed?: boolean; // animate with typewriter
};

type QuickReply = {
  label: string;
  active?: boolean;
};

type ChatWindowProps = {
  messages: Message[];
  quickReplies?: QuickReply[];
  showTyping?: boolean;
  slideProgress?: number; // 0-1 slide up animation
};

const parseText = (text: string) => {
  // Bold: **text** → <strong>
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
};

export const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  quickReplies = [],
  showTyping = false,
  slideProgress = 1,
}) => {
  const translateY = interpolate(slideProgress, [0, 1], [60, 0]);
  const opacity = interpolate(slideProgress, [0, 0.3], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        width: 300,
        background: "#fff",
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(124,58,237,0.25), 0 4px 20px rgba(0,0,0,0.15)",
        transform: `translateY(${translateY}px)`,
        opacity,
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: COLORS.gradient,
          padding: "14px 16px",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            color: "#fff",
            fontSize: 16,
            border: "2px solid rgba(255,255,255,0.4)",
          }}
        >
          A
        </div>
        <div>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>Assistant</div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80" }} />
            <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 11 }}>En ligne</span>
          </div>
        </div>
        <div style={{ marginLeft: "auto", color: "rgba(255,255,255,0.7)", fontSize: 18, cursor: "pointer" }}>
          ✕
        </div>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          padding: "14px 12px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          background: "#fafafa",
          minHeight: 200,
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
                maxWidth: "80%",
                padding: "10px 14px",
                borderRadius:
                  msg.role === "user"
                    ? "18px 18px 4px 18px"
                    : "18px 18px 18px 4px",
                background:
                  msg.role === "user" ? COLORS.primary : COLORS.bubbleBot,
                color: msg.role === "user" ? "#fff" : COLORS.text,
                fontSize: 12,
                lineHeight: 1.5,
                whiteSpace: "pre-line",
              }}
            >
              {parseText(msg.text)}
            </div>
          </div>
        ))}

        {showTyping && <TypingIndicator />}

        {quickReplies.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
            {quickReplies.map((qr) => (
              <div
                key={qr.label}
                style={{
                  padding: "6px 12px",
                  borderRadius: 20,
                  border: `1.5px solid ${qr.active ? COLORS.primary : "#d1d5db"}`,
                  background: qr.active ? `${COLORS.primary}15` : "#fff",
                  color: qr.active ? COLORS.primary : "#555",
                  fontSize: 11,
                  fontWeight: qr.active ? 600 : 400,
                  cursor: "pointer",
                }}
              >
                {qr.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input bar */}
      <div
        style={{
          padding: "10px 12px",
          borderTop: "1px solid #f0f0f0",
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "#fff",
        }}
      >
        <div
          style={{
            flex: 1,
            height: 32,
            background: "#f4f4f5",
            borderRadius: 20,
            fontSize: 11,
            color: "#aaa",
            display: "flex",
            alignItems: "center",
            paddingLeft: 12,
          }}
        >
          Tapez votre message…
        </div>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: COLORS.gradient,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: 14,
          }}
        >
          ↑
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          textAlign: "center",
          padding: "6px 0 8px",
          fontSize: 9,
          color: "#aaa",
          background: "#fff",
          borderTop: "1px solid #f5f5f5",
        }}
      >
        Powered by <span style={{ color: COLORS.primary, fontWeight: 600 }}>AuraFlow AI</span>
      </div>
    </div>
  );
};
