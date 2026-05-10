import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { Intro } from "./compositions/Intro";
import { WebsiteBrowse } from "./compositions/WebsiteBrowse";
import { ChatBubbleScene } from "./compositions/ChatBubbleScene";
import { OpenChat } from "./compositions/OpenChat";
import { ClientTypes } from "./compositions/ClientTypes";
import { ProductRecommendation } from "./compositions/ProductRecommendation";
import { Outro } from "./compositions/Outro";
import { SCENES } from "./constants";

export const ChatbotPresentation: React.FC = () => {
  return (
    <AbsoluteFill>
      <Series>
        {/* Scene 1: MacBook opening (0-5s = 150 frames) */}
        <Series.Sequence durationInFrames={SCENES.intro.duration}>
          <Intro />
        </Series.Sequence>

        {/* Scene 2: Website browse (5-12s = 210 frames) */}
        <Series.Sequence durationInFrames={SCENES.browse.duration}>
          <WebsiteBrowse />
        </Series.Sequence>

        {/* Scene 3: Chat bubble appears (12-16s = 120 frames) */}
        <Series.Sequence durationInFrames={SCENES.bubble.duration}>
          <ChatBubbleScene />
        </Series.Sequence>

        {/* Scene 4: Client opens chat (16-20s = 120 frames) */}
        <Series.Sequence durationInFrames={SCENES.openChat.duration}>
          <OpenChat />
        </Series.Sequence>

        {/* Scene 5: Client types (20-28s = 240 frames) */}
        <Series.Sequence durationInFrames={SCENES.clientTypes.duration}>
          <ClientTypes />
        </Series.Sequence>

        {/* Scene 6: Product recommendation (28-38s = 300 frames) */}
        <Series.Sequence durationInFrames={SCENES.product.duration}>
          <ProductRecommendation />
        </Series.Sequence>

        {/* Scene 7: Logo outro (38-45s = 210 frames) */}
        <Series.Sequence durationInFrames={SCENES.outro.duration}>
          <Outro />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
