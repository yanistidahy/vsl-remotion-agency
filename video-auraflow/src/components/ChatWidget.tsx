import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { C, FONT } from "../constants";
import { ProductCard } from "./ProductCard";

type Message = {
  role: "user" | "bot";
  text: string;
  frame: number;
};

type Props = {
  messages: Message[];
  inputText: string;
  showTypingIndicator: boolean;
  showProduct: boolean;
  productFrame: number;
  slideProgress: number;
};

const BotAvatar: React.FC = () => (
  <div
    style={{
      width: 28,
      height: 28,
      borderRadius: "50%",
      background: C.gradient,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 13,
      fontWeight: 800,
      color: "#fff",
      flexShrink: 0,
      fontFamily: FONT.sans,
    }}
  >
    A
  </div>
);

function parseBold(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**")) {
      return <strong key={i} style={{ color: "#fff", fontWeight: 700 }}>{p.slice(2, -2)}</strong>;
    }
    return <span key={i}>{p}</span>;
  });
}

const MessageBubble: React.FC<{ msg: Message }> = ({ msg }) => {
  const frame = useCurrentFrame();
  const local = Math.max(0, frame - msg.frame);
  const opacity = interpolate(local, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  const y = interpolate(local, [0, 12], [10, 0], { extrapolateRight: "clamp" });

  const isUser = msg.role === "user";
  const lines = msg.text.split("\n\n");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isUser ? "row-reverse" : "row",
        gap: 8,
        alignItems: "flex-end",
        opacity,
        transform: `translateY(${y}px)`,
        marginBottom: 10,
      }}
    >
      {!isUser && <BotAvatar />}
      <div
        style={{
          maxWidth: "72%",
          background: isUser
            ? C.gradient
            : "rgba(255,255,255,0.07)",
          borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
          padding: "10px 14px",
          fontSize: 13,
          lineHeight: 1.55,
          color: isUser ? "#fff" : "rgba(255,255,255,0.88)",
          fontFamily: FONT.sans,
          border: isUser ? "none" : "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {lines.map((line, i) => (
          <p key={i} style={{ margin: i > 0 ? "8px 0 0" : 0 }}>
            {parseBold(line)}
          </p>
        ))}
      </div>
    </div>
  );
};

const TypingDots: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "flex-end", marginBottom: 10 }}>
      <BotAvatar />
      <div
        style={{
          background: "rgba(255,255,255,0.07)",
          borderRadius: "18px 18px 18px 4px",
          padding: "12px 16px",
          display: "flex",
          gap: 5,
          alignItems: "center",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {[0, 1, 2].map((i) => {
          const phase = (frame / 6 + i * 0.8) % 3;
          const scale = phase < 1.5 ? 0.6 + phase * 0.27 : 1.0 - (phase - 1.5) * 0.27;
          const opacity = 0.4 + Math.max(0, Math.min(1, scale - 0.6)) * 0.6;
          return (
            <div
              key={i}
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: C.accent,
                transform: `scale(${scale})`,
                opacity,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export const ChatWidget: React.FC<Props> = ({
  messages,
  inputText,
  showTypingIndicator,
  showProduct,
  productFrame,
  slideProgress,
}) => {
  const frame = useCurrentFrame();
  const x = interpolate(slideProgress, [0, 1], [400, 0], { extrapolateRight: "clamp" });
  const opacity = interpolate(slideProgress, [0, 0.4], [0, 1], { extrapolateRight: "clamp" });

  const cursorVisible = Math.floor(frame / 20) % 2 === 0;

  return (
    <div
      style={{
        position: "absolute",
        right: 60,
        bottom: 60,
        width: 380,
        transform: `translateX(${x}px)`,
        opacity,
        display: "flex",
        flexDirection: "column",
        gap: 0,
        zIndex: 30,
      }}
    >
      {showProduct && (
        <div style={{ marginBottom: 12 }}>
          <ProductCard startFrame={productFrame} />
        </div>
      )}

      <div
        style={{
          background: "rgba(10,8,20,0.97)",
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: `0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px ${C.primary}33`,
          border: `1px solid rgba(124,58,237,0.25)`,
          fontFamily: FONT.sans,
        }}
      >
        {/* Header */}
        <div
          style={{
            background: C.gradient,
            padding: "14px 18px",
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
              fontSize: 16,
              fontWeight: 800,
              color: "#fff",
            }}
          >
            A
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>AuraFlow AI</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
              En ligne
            </div>
          </div>
        </div>

        {/* Messages */}
        <div
          style={{
            padding: "14px 14px 8px",
            minHeight: 180,
            maxHeight: 320,
            overflowY: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          {messages.map((m, i) => (
            <MessageBubble key={i} msg={m} />
          ))}
          {showTypingIndicator && <TypingDots />}
        </div>

        {/* Input */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.07)",
            padding: "10px 14px",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              flex: 1,
              background: "rgba(255,255,255,0.05)",
              borderRadius: 20,
              padding: "9px 14px",
              fontSize: 13,
              color: inputText ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)",
              border: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              gap: 2,
              minHeight: 18,
              fontFamily: FONT.sans,
            }}
          >
            {inputText || "Posez votre question…"}
            {inputText && (
              <span
                style={{
                  display: "inline-block",
                  width: 1.5,
                  height: 14,
                  background: C.accent,
                  marginLeft: 1,
                  opacity: cursorVisible ? 1 : 0,
                }}
              />
            )}
          </div>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: inputText ? C.gradient : "rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              flexShrink: 0,
            }}
          >
            ↑
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            fontSize: 10,
            color: "rgba(255,255,255,0.2)",
            paddingBottom: 8,
            fontFamily: FONT.sans,
          }}
        >
          Powered by AuraFlow AI
        </div>
      </div>
    </div>
  );
};
