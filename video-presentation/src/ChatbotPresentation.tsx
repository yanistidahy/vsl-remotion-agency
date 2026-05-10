import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { ShopifyScene } from "./compositions/ShopifyScene";
import { OpenChat } from "./compositions/OpenChat";
import { ClientTypes } from "./compositions/ClientTypes";
import { ProductRecommendation } from "./compositions/ProductRecommendation";
import { Outro } from "./compositions/Outro";
import { SCENES } from "./constants";

export const ChatbotPresentation: React.FC = () => {
  return (
    <AbsoluteFill>
      <Series>
        {/* Scene 1: Shopify store + scroll + chat bubble (0-16s = 480 frames) */}
        <Series.Sequence durationInFrames={SCENES.shopify.duration}>
          <ShopifyScene />
        </Series.Sequence>

        {/* Scene 2: Cursor clicks, chat window opens (16-20s = 120 frames) */}
        <Series.Sequence durationInFrames={SCENES.openChat.duration}>
          <OpenChat />
        </Series.Sequence>

        {/* Scene 3: Client types "Soin cheveux", bot responds (20-28s = 240 frames) */}
        <Series.Sequence durationInFrames={SCENES.clientTypes.duration}>
          <ClientTypes />
        </Series.Sequence>

        {/* Scene 4: "Démêlage" → N°03 DÉMÊLE product card (28-38s = 300 frames) */}
        <Series.Sequence durationInFrames={SCENES.product.duration}>
          <ProductRecommendation />
        </Series.Sequence>

        {/* Scene 5: AuraFlow AI logo outro (38-45s = 210 frames) */}
        <Series.Sequence durationInFrames={SCENES.outro.duration}>
          <Outro />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
