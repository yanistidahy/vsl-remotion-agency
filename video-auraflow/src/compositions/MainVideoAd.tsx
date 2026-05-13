import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { Scene1Hook } from "../scenes/Scene1Hook";
import { Scene2Agitate } from "../scenes/Scene2Agitate";
import { Scene3Solution } from "../scenes/Scene3Solution";
import { Scene4Demo } from "../scenes/Scene4Demo";
import { Scene5Stats } from "../scenes/Scene5Stats";
import { Scene6SocialProof } from "../scenes/Scene6SocialProof";
import { Scene7Features } from "../scenes/Scene7Features";
import { Scene8CTA } from "../scenes/Scene8CTA";
import { FlashTransition } from "../components/FlashTransition";

export const MainVideoAd: React.FC = () => (
  <AbsoluteFill>
    <Audio src={staticFile("music.mp3")} volume={0.28} />

    <Sequence from={0}    durationInFrames={90}><Scene1Hook /></Sequence>
    <Sequence from={90}   durationInFrames={150}><Scene2Agitate /></Sequence>
    <Sequence from={240}  durationInFrames={150}><Scene3Solution /></Sequence>
    <Sequence from={390}  durationInFrames={390}><Scene4Demo /></Sequence>
    <Sequence from={780}  durationInFrames={240}><Scene5Stats /></Sequence>
    <Sequence from={1020} durationInFrames={180}><Scene6SocialProof /></Sequence>
    <Sequence from={1200} durationInFrames={240}><Scene7Features /></Sequence>
    <Sequence from={1440} durationInFrames={360}><Scene8CTA /></Sequence>

    {[90, 240, 390, 780, 1020, 1200, 1440].map(cut => (
      <FlashTransition key={cut} cutFrame={cut} />
    ))}
  </AbsoluteFill>
);
