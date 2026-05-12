import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { HeroScene } from "../components/HeroScene";
import { ProblemScene } from "../components/ProblemScene";
import { ChatDemoScene } from "../components/ChatDemoScene";
import { FeaturesScene } from "../components/FeaturesScene";
import { OutroScene } from "../components/OutroScene";

// Push-slide transition: scene N slides left, scene N+1 enters from right.
// 10-frame overlap = 0.167s at 60fps — fast, professional cut.

const TRANS = 10;

export const MainVideo: React.FC = () => (
  <AbsoluteFill>
    <Audio src={staticFile("music.mp3")} volume={0.26} />

    <Sequence from={0} durationInFrames={360 + TRANS}>
      <HeroScene />
    </Sequence>

    <Sequence from={360} durationInFrames={360 + TRANS}>
      <ProblemScene />
    </Sequence>

    <Sequence from={720} durationInFrames={1380 + TRANS}>
      <ChatDemoScene />
    </Sequence>

    <Sequence from={2100} durationInFrames={540 + TRANS}>
      <FeaturesScene />
    </Sequence>

    <Sequence from={2640} durationInFrames={360}>
      <OutroScene />
    </Sequence>
  </AbsoluteFill>
);
