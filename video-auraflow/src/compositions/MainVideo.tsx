import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { HeroScene } from "../components/HeroScene";
import { ProblemScene } from "../components/ProblemScene";
import { ChatDemoScene } from "../components/ChatDemoScene";
import { FeaturesScene } from "../components/FeaturesScene";
import { OutroScene } from "../components/OutroScene";

// Scene timing at 60fps
// HeroScene:     0    → 360   (6s)
// ProblemScene:  360  → 720   (6s)
// ChatDemoScene: 720  → 2100  (23s)  ← hero scene
// FeaturesScene: 2100 → 2640  (9s)
// OutroScene:    2640 → 3000  (6s)

export const MainVideo: React.FC = () => (
  <AbsoluteFill>
    <Audio src={staticFile("music.mp3")} volume={0.22} />

    <Sequence from={0} durationInFrames={360}>
      <HeroScene />
    </Sequence>

    <Sequence from={360} durationInFrames={360}>
      <ProblemScene />
    </Sequence>

    <Sequence from={720} durationInFrames={1380}>
      <ChatDemoScene />
    </Sequence>

    <Sequence from={2100} durationInFrames={540}>
      <FeaturesScene />
    </Sequence>

    <Sequence from={2640} durationInFrames={360}>
      <OutroScene />
    </Sequence>
  </AbsoluteFill>
);
