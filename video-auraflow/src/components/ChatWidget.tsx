import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT } from "../constants";
import { ChatBubble } from "./ChatBubble";
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
  startFrame?: number;
};

const TypingDots: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "flex-end", marginBottom: 10 }}>
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
      <div
        style={{
          background: "#f4f0ff",
          borderRadius: "0 16px 16px 16px",
          padding: "12px 16px",
          display: "flex",
          gap: 5,
          alignItems: "center",
        }}
      >
        {[0, 1, 2].map((i) => {
          const phase = (frame / 6 + i * 0.9) % 3;
          const opacity = phase < 1.5 ? 0.3 + phase * 0.47 : 1 - (phase - 1.5) * 0.47;
          const translateY = phase < 1.5 ? -phase * 3 : -(1.5 - (phase - 1.5)) * 3;
          return (
            <div
              key={i}
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: C.primary,
                opacity: Math.max(0.3, Math.min(1, opacity)),
                transform: `translateY(${translateY}px)`,
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
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = Math.max(0, frame - startFrame);

  const slideY = spring({ fps, frame: local, config: { damping: 18, stiffness: 260, mass: 0.9 }, from: 80, to: 0 });
  const scale = spring({ fps, frame: local, config: { damping: 18, stiffness: 260, mass: 0.9 }, from: 0.88, to: 1 });
  const opacity = interpolate(local, [0, 12], [0, 1], { extrapolateRight: "clamp" });

  const cursorBlink = Math.floor(frame / 22) % 2 === 0;

  return (
    <div
      style={{
        position: "absolute",
        right: 80,
        top: "50%",
        transform: `translateY(calc(-50% + ${slideY}px)) scale(${scale})`,
        transformOrigin: "center center",
        opacity,
        width: 420,
        fontFamily: FONT.sans,
        zIndex: 20,
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: "0 32px 100px rgba(0,0,0,0.4), 0 0 0 1px rgba(124,58,237,0.15)",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: C.gradient,
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              fontWeight: 900,
              color: "#fff",
            }}
          >
            A
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>AuraFlow AI</div>
            <div
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.8)",
                display: "flex",
                alignItems: "center",
                gap: 5,
                marginTop: 2,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#4ade80",
                  display: "inline-block",
                  boxShadow: "0 0 6px #4ade80",
                }}
              />
              En ligne
            </div>
          </div>
        </div>

        {/* Messages area */}
        <div
          style={{
            background: "#fafafa",
            padding: "16px 16px 8px",
            minHeight: 320,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          {messages.map((m, i) => (
            <ChatBubble key={i} role={m.role} text={m.text} startFrame={m.frame} />
          ))}
          {showTypingIndicator && <TypingDots />}
          {showProduct && <ProductCard startFrame={productFrame} />}
        </div>

        {/* Input bar */}
        <div
          style={{
            borderTop: "1px solid #f0eeff",
            padding: "10px 14px",
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "#fff",
          }}
        >
          <div
            style={{
              flex: 1,
              background: "#f5f2ff",
              borderRadius: 20,
              padding: "9px 14px",
              fontSize: 13.5,
              color: inputText ? "#18181b" : "#9ca3af",
              border: "1px solid #e8e0ff",
              display: "flex",
              alignItems: "center",
              minHeight: 18,
            }}
          >
            {inputText || "Posez votre question…"}
            {inputText && (
              <span
                style={{
                  display: "inline-block",
                  width: 1.5,
                  height: 14,
                  background: C.primary,
                  marginLeft: 1,
                  opacity: cursorBlink ? 1 : 0,
                }}
              />
            )}
          </div>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: inputText ? C.gradient : "#e8e0ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 15,
              color: inputText ? "#fff" : C.primary,
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
            fontSize: 10.5,
            color: C.accent,
            padding: "6px 0 8px",
            background: "#fff",
            letterSpacing: 0.2,
          }}
        >
          Powered by AuraFlow AI ✦
        </div>
      </div>
    </div>
  );
};
