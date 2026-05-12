import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { HeroScene } from "../components/HeroScene";
import { ProblemScene } from "../components/ProblemScene";
import { ChatDemoScene } from "../components/ChatDemoScene";
import { FeaturesScene } from "../components/FeaturesScene";
import { OutroScene } from "../components/OutroScene";

// Each scene slides OUT left (translateX 0→-1920) and fades over last 22 frames.
// The NEXT scene starts 22 frames before the previous one ends,
// so it slides IN from right (translateX 1920→0) during the same window.
// Result: instant, snappy Apple-style push transition (~0.37s at 60fps).

const TRANS = 22; // overlap frames

// Absolute start frames (accounting for overlaps):
// Hero:     0    → 382   (360 + TRANS)
// Problem:  360  → 742   (360 + 22 overlap + TRANS)
// Chat:     720  → 2122  (1380 + 22 overlap + TRANS)
// Features: 2100 → 2662  (540 + 22 overlap + TRANS)
// Outro:    2640 → 3000  (360, no slide-out – fades to black)

export const MainVideo: React.FC = () => (
  <AbsoluteFill>
    <Audio src={staticFile("music.mp3")} volume={0.22} />

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
