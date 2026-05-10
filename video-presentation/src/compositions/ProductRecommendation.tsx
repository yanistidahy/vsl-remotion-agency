import React from "react";
import { AbsoluteFill, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { MacBook } from "../components/MacBook";
import { ShopifyStore } from "../components/ShopifyStore";
import { ChatWindow, Message } from "../components/ChatWindow";
import { ProductCardComponent } from "../components/ProductCardComponent";
import { COLORS } from "../constants";

const BOT_INTRO = "Notre **N°03 DÉMÊLE** est parfait pour vous !";
const BOT_DETAIL = "Il réduit les frisottis et facilite le démêlage.";
const PRODUCT_IMAGE = staticFile("product3.svg");

export const ProductRecommendation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Frame 0-30: quick replies visible
  // Frame 30-55: user sends "Démêlage"
  // Frame 55-110: typing indicator
  // Frame 110-190: bot intro typewriter
  // Frame 190-240: bot detail typewriter
  // Frame 220+: product card appears

  const showUserMsg = frame >= 30;
  const showTyping = frame >= 55 && frame < 110;

  const introLen = Math.floor(
    interpolate(frame, [110, 170], [0, BOT_INTRO.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const detailLen = Math.floor(
    interpolate(frame, [175, 240], [0, BOT_DETAIL.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  const botText =
    frame >= 175
      ? `${BOT_INTRO}\n\n${BOT_DETAIL.slice(0, detailLen)}`
      : BOT_INTRO.slice(0, introLen);

  const showBot = frame >= 110;

  const productAppear = spring({
    fps,
    frame: Math.max(0, frame - 220),
    config: { damping: 16, stiffness: 90 },
    from: 0,
    to: 1,
  });
  const showProduct = frame >= 220;

  const messages: Message[] = [
    {
      role: "bot",
      text: "Pour vos **cheveux**, quel est votre besoin ?\n\nHydratation, démêlage ou réparation ?",
    },
    ...(showUserMsg ? [{ role: "user" as const, text: "Démêlage" }] : []),
    ...(showBot ? [{ role: "bot" as const, text: botText }] : []),
  ];

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

              {/* Chat window */}
              <div style={{ position: "absolute", bottom: 14, right: 14 }}>
                <ChatWindow
                  messages={messages}
                  quickReplies={
                    frame < 30
                      ? [{ label: "Hydratation" }, { label: "Démêlage" }, { label: "Réparation" }]
                      : []
                  }
                  showTyping={showTyping}
                  slideProgress={1}
                />
              </div>

              {/* Real Shopify product card */}
              {showProduct && (
                <div style={{ position: "absolute", bottom: 18, left: 14 }}>
                  <ProductCardComponent
                    name="N°03 DÉMÊLE"
                    subtitle="Après-shampooing"
                    description="Réduit les frisottis et facilite le démêlage en douceur."
                    price="31,00 €"
                    imageUrl={PRODUCT_IMAGE}
                    appear={productAppear}
                  />
                </div>
              )}
            </div>
          }
        />
      </div>
    </AbsoluteFill>
  );
};
