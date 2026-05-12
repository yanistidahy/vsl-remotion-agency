import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { HeroScene } from "../components/HeroScene";
import { ProblemScene } from "../components/ProblemScene";
import { WebsiteScene } from "../components/WebsiteScene";
import { ChatDemoScene } from "../components/ChatDemoScene";
import { FeaturesScene } from "../components/FeaturesScene";
import { PricingScene } from "../components/PricingScene";
import { OutroScene } from "../components/OutroScene";

// Scene timing (frames at 60fps)
// HeroScene:     0    → 360   (6s)
// ProblemScene:  360  → 720   (6s)
// WebsiteScene:  720  → 1320  (10s)
// ChatDemoScene: 1320 → 2100  (13s)
// FeaturesScene: 2100 → 2640  (9s)
// PricingScene:  2640 → 2880  (4s)
// OutroScene:    2880 → 3000  (2s)

export const MainVideo: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      {/* Background music */}
      <Audio src={staticFile("music.wav")} volume={0.18} />

      <Sequence from={0} durationInFrames={360}>
        <HeroScene />
      </Sequence>

      <Sequence from={360} durationInFrames={360}>
        <ProblemScene />
      </Sequence>

      <Sequence from={720} durationInFrames={600}>
        <WebsiteScene />
      </Sequence>

      <Sequence from={1320} durationInFrames={780}>
        <ChatDemoScene />
      </Sequence>

      <Sequence from={2100} durationInFrames={540}>
        <FeaturesScene />
      </Sequence>

      <Sequence from={2640} durationInFrames={240}>
        <PricingScene />
      </Sequence>

      <Sequence from={2880} durationInFrames={120}>
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  );
};
