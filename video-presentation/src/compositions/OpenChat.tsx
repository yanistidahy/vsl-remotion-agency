import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { MacBook } from "../components/MacBook";
import { ShopifyStore } from "../components/ShopifyStore";
import { ChatBubbleWidget } from "../components/ChatBubbleWidget";
import { ChatWindow } from "../components/ChatWindow";
import { Cursor } from "../components/Cursor";
import { COLORS } from "../constants";

export const OpenChat: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Cursor moves toward the chat bubble (bottom-right of screen)
  const cursorX = interpolate(frame, [0, 45], [480, 705], { extrapolateRight: "clamp" });
  const cursorY = interpolate(frame, [0, 45], [200, 400], { extrapolateRight: "clamp" });
  const isClicking = frame >= 45 && frame <= 58;

  // Chat window slides up after click
  const chatProgress = spring({
    fps,
    frame: Math.max(0, frame - 55),
    config: { damping: 16, stiffness: 100 },
    from: 0,
    to: 1,
  });
  const showChat = frame >= 55;

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse at center, #1e053f 0%, #0a0a0f 65%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ transform: "scale(1.18)", transformOrigin: "center center" }}>
        <MacBook
          screenOpacity={1}
          screenContent={
            <div style={{ width: "100%", height: "100%", position: "relative" }}>
              <ShopifyStore scrollY={310} />

              {/* Bubble visible until chat opens */}
              {!showChat && (
                <div style={{ position: "absolute", bottom: 20, right: 14 }}>
                  <ChatBubbleWidget showTooltip={false} pulseProgress={1} />
                </div>
              )}

              {/* Chat window */}
              {showChat && (
                <div style={{ position: "absolute", bottom: 14, right: 14 }}>
                  <ChatWindow
                    messages={[
                      { role: "bot", text: "Bonjour ! Quel type de produit recherchez-vous ?" },
                    ]}
                    quickReplies={[
                      { label: "Soin visage" },
                      { label: "Soin cheveux" },
                      { label: "Je ne sais pas" },
                    ]}
                    slideProgress={chatProgress}
                  />
                </div>
              )}

              {/* Animated cursor */}
              <Cursor x={cursorX} y={cursorY} clicking={isClicking} />
            </div>
          }
        />
      </div>
    </AbsoluteFill>
  );
};
