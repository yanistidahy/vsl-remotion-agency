import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { MacBook } from "../components/MacBook";
import { BeautyWebsite } from "../components/BeautyWebsite";
import { ChatBubbleWidget } from "../components/ChatBubbleWidget";
import { ChatWindow } from "../components/ChatWindow";
import { Cursor } from "../components/Cursor";
import { COLORS } from "../constants";

export const OpenChat: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Cursor moves toward bubble (bottom right of screen = approx 730, 410 in screen coords)
  const cursorX = interpolate(frame, [0, 40], [500, 710], { extrapolateRight: "clamp" });
  const cursorY = interpolate(frame, [0, 40], [200, 400], { extrapolateRight: "clamp" });
  const isClicking = frame >= 40 && frame <= 55;

  // Chat window slides up after click
  const chatProgress = spring({
    fps,
    frame: Math.max(0, frame - 50),
    config: { damping: 16, stiffness: 100 },
    from: 0,
    to: 1,
  });

  const showChat = frame >= 50;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at center, #1a0533 0%, ${COLORS.dark} 70%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          transform: "scale(1.35) translateY(-30px)",
          transformOrigin: "center center",
        }}
      >
        <MacBook
          screenOpacity={1}
          screenContent={
            <div style={{ width: "100%", height: "100%", position: "relative" }}>
              <BeautyWebsite scrollY={80} />

              {/* Chat bubble */}
              {!showChat && (
                <div style={{ position: "absolute", bottom: 16, right: 16 }}>
                  <ChatBubbleWidget showTooltip={false} pulseProgress={1} />
                </div>
              )}

              {/* Chat window */}
              {showChat && (
                <div style={{ position: "absolute", bottom: 16, right: 16 }}>
                  <ChatWindow
                    messages={[
                      {
                        role: "bot",
                        text: "Bonjour ! Quel type de produit recherchez-vous ?",
                      },
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

              {/* Cursor */}
              <Cursor x={cursorX} y={cursorY} clicking={isClicking} />
            </div>
          }
          scale={1}
        />
      </div>
    </AbsoluteFill>
  );
};
