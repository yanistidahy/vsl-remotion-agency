import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { MacBook } from "../components/MacBook";
import { ShopifyStore } from "../components/ShopifyStore";
import { ChatWindow, Message } from "../components/ChatWindow";
import { COLORS } from "../constants";

const BOT_RESPONSE =
  "Pour vos **cheveux**, quel est votre besoin ?\n\nHydratation, démêlage ou réparation ?";

export const ClientTypes: React.FC = () => {
  const frame = useCurrentFrame();

  // Frame 0-30: quick replies visible
  // Frame 30-55: user message "Soin cheveux" appears
  // Frame 55-100: typing indicator
  // Frame 100-210: bot response typewriter

  const showUserMsg = frame >= 30;
  const showTyping = frame >= 55 && frame < 105;

  const botLength = Math.floor(
    interpolate(frame, [105, 210], [0, BOT_RESPONSE.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const botText = BOT_RESPONSE.slice(0, botLength);
  const showBot = frame >= 105;

  const messages: Message[] = [
    { role: "bot", text: "Bonjour ! Quel type de produit recherchez-vous ?" },
    ...(showUserMsg ? [{ role: "user" as const, text: "Soin cheveux" }] : []),
    ...(showBot ? [{ role: "bot" as const, text: botText }] : []),
  ];

  const quickReplies =
    frame < 30
      ? [{ label: "Soin visage" }, { label: "Soin cheveux" }, { label: "Je ne sais pas" }]
      : frame >= 105
      ? [{ label: "Hydratation" }, { label: "Démêlage" }, { label: "Réparation" }]
      : [];

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
              <div style={{ position: "absolute", bottom: 14, right: 14 }}>
                <ChatWindow
                  messages={messages}
                  quickReplies={quickReplies}
                  showTyping={showTyping}
                  slideProgress={1}
                />
              </div>
            </div>
          }
        />
      </div>
    </AbsoluteFill>
  );
};
