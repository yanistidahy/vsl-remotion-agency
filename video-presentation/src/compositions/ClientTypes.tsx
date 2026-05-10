import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { MacBook } from "../components/MacBook";
import { BeautyWebsite } from "../components/BeautyWebsite";
import { ChatWindow, Message } from "../components/ChatWindow";
import { COLORS } from "../constants";

const BOT_RESPONSE = "Pour vos **cheveux**, quel est votre besoin ?\n\nHydratation, démêlage ou réparation ?";

export const ClientTypes: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Frame 0-30: quick replies visible
  // Frame 30-50: "Soin cheveux" clicked (active)
  // Frame 50-80: user message appears
  // Frame 80-120: typing indicator
  // Frame 120-210: bot response with typewriter

  const userMessageOpacity = interpolate(frame, [50, 65], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const showTyping = frame >= 80 && frame < 130;

  const botTextLength = Math.floor(
    interpolate(frame, [130, 210], [0, BOT_RESPONSE.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const botText = BOT_RESPONSE.slice(0, botTextLength);
  const showBot = frame >= 130;

  const messages: Message[] = [
    { role: "bot", text: "Bonjour ! Quel type de produit recherchez-vous ?" },
    ...(frame >= 50 ? [{ role: "user" as const, text: "Soin cheveux" }] : []),
    ...(showBot ? [{ role: "bot" as const, text: botText }] : []),
  ];

  const quickReplies =
    frame < 50
      ? [
          { label: "Soin visage" },
          { label: "Soin cheveux" },
          { label: "Je ne sais pas" },
        ]
      : frame >= 130
      ? [
          { label: "Hydratation" },
          { label: "Démêlage" },
          { label: "Réparation" },
        ]
      : [];

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
              <div style={{ position: "absolute", bottom: 16, right: 16 }}>
                <ChatWindow
                  messages={messages}
                  quickReplies={quickReplies}
                  showTyping={showTyping}
                  slideProgress={1}
                />
              </div>
            </div>
          }
          scale={1}
        />
      </div>
    </AbsoluteFill>
  );
};
