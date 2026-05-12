import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { HeroScene } from "../components/HeroScene";
import { ProblemScene } from "../components/ProblemScene";
import { ChatDemoScene } from "../components/ChatDemoScene";
import { FeaturesScene } from "../components/FeaturesScene";
import { OutroScene } from "../components/OutroScene";

const TRANS = 10;

export const MainVideo: React.FC = () => (
  <AbsoluteFill>
    <Audio src={staticFile("music.mp3")} volume={0.26} />
    <Sequence from={0} durationInFrames={310}><HeroScene /></Sequence>
    <Sequence from={300} durationInFrames={250}><ProblemScene /></Sequence>
    <Sequence from={540} durationInFrames={850}><ChatDemoScene /></Sequence>
    <Sequence from={1380} durationInFrames={370}><FeaturesScene /></Sequence>
    <Sequence from={1750} durationInFrames={300}><OutroScene /></Sequence>
  </AbsoluteFill>
);
