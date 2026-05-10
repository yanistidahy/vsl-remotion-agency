import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { MacBook } from "../components/MacBook";
import { BeautyWebsite } from "../components/BeautyWebsite";
import { ChatWindow, Message } from "../components/ChatWindow";
import { ProductCardComponent } from "../components/ProductCardComponent";
import { COLORS } from "../constants";

const BOT_INTRO = "Notre **N°03 DÉMÊLE** est parfait pour vous !";
const BOT_DETAIL = "Il réduit les frisottis et facilite le démêlage.";

export const ProductRecommendation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Frame 0-30: show question + "Démêlage" quick reply
  // Frame 30-50: user sends "Démêlage"
  // Frame 50-100: typing indicator
  // Frame 100-170: bot response typewriter
  // Frame 150-220: product card appears

  const showUserMsg = frame >= 30;
  const showTyping = frame >= 50 && frame < 100;

  const introLength = Math.floor(
    interpolate(frame, [100, 140], [0, BOT_INTRO.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
  );
  const detailLength = Math.floor(
    interpolate(frame, [140, 180], [0, BOT_DETAIL.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
  );

  const botText =
    frame >= 180
      ? `${BOT_INTRO}\n\n${BOT_DETAIL}`
      : frame >= 140
      ? `${BOT_INTRO}\n\n${BOT_DETAIL.slice(0, detailLength)}`
      : BOT_INTRO.slice(0, introLength);

  const showBot = frame >= 100;

  const productAppear = spring({
    fps,
    frame: Math.max(0, frame - 170),
    config: { damping: 16, stiffness: 90 },
    from: 0,
    to: 1,
  });

  const messages: Message[] = [
    { role: "bot", text: "Pour vos **cheveux**, quel est votre besoin ?\n\nHydratation, démêlage ou réparation ?" },
    ...(showUserMsg ? [{ role: "user" as const, text: "Démêlage" }] : []),
    ...(showBot ? [{ role: "bot" as const, text: botText }] : []),
  ];

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
                  quickReplies={
                    frame < 30
                      ? [{ label: "Hydratation" }, { label: "Démêlage", active: false }, { label: "Réparation" }]
                      : frame >= 30 && frame < 100
                      ? []
                      : []
                  }
                  showTyping={showTyping}
                  slideProgress={1}
                />
              </div>
              {/* Product card */}
              {frame >= 170 && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 80,
                    left: 20,
                  }}
                >
                  <ProductCardComponent
                    name="N°03 DÉMÊLE"
                    description="Réduit les frisottis et facilite le démêlage en douceur."
                    price="31,00 EUR"
                    appear={productAppear}
                  />
                </div>
              )}
            </div>
          }
          scale={1}
        />
      </div>
    </AbsoluteFill>
  );
};
