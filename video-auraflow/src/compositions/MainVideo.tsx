import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
  interpolate,
} from 'remotion';
import { HeroScene } from '../components/HeroScene';
import { ProblemScene } from '../components/ProblemScene';
import { WebsiteScene } from '../components/WebsiteScene';
import { ChatDemoScene } from '../components/ChatDemoScene';
import { FeaturesScene } from '../components/FeaturesScene';
import { PricingScene } from '../components/PricingScene';
import { OutroScene } from '../components/OutroScene';

const SceneTransition: React.FC<{
  children: React.ReactNode;
  from: number;
  duration: number;
}> = ({ children, from, duration }) => {
  const frame = useCurrentFrame();
  const localFrame = frame - from;

  const fadeIn = interpolate(localFrame, [0, 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const fadeOut = interpolate(localFrame, [duration - 18, duration], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ opacity: Math.min(fadeIn, fadeOut) }}>
      {children}
    </AbsoluteFill>
  );
};

export const MainVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: '#0a0a0f' }}>
      {/* Scene 1: Hero Intro — 0–6s (0–360f) */}
      <Sequence from={0} durationInFrames={360}>
        <SceneTransition from={0} duration={360}>
          <HeroScene />
        </SceneTransition>
      </Sequence>

      {/* Scene 2: Problem Statement — 6–12s (360–720f) */}
      <Sequence from={360} durationInFrames={360}>
        <SceneTransition from={360} duration={360}>
          <ProblemScene />
        </SceneTransition>
      </Sequence>

      {/* Scene 3: Website Demo — 12–22s (720–1320f) */}
      <Sequence from={720} durationInFrames={600}>
        <SceneTransition from={720} duration={600}>
          <WebsiteScene />
        </SceneTransition>
      </Sequence>

      {/* Scene 4: Live Chat Demo — 22–35s (1320–2100f) */}
      <Sequence from={1320} durationInFrames={780}>
        <SceneTransition from={1320} duration={780}>
          <ChatDemoScene />
        </SceneTransition>
      </Sequence>

      {/* Scene 5: Key Features — 35–44s (2100–2640f) */}
      <Sequence from={2100} durationInFrames={540}>
        <SceneTransition from={2100} duration={540}>
          <FeaturesScene />
        </SceneTransition>
      </Sequence>

      {/* Scene 6: Pricing — 44–48s (2640–2880f) */}
      <Sequence from={2640} durationInFrames={240}>
        <SceneTransition from={2640} duration={240}>
          <PricingScene />
        </SceneTransition>
      </Sequence>

      {/* Scene 7: CTA Outro — 48–50s (2880–3000f) */}
      <Sequence from={2880} durationInFrames={120}>
        <SceneTransition from={2880} duration={120}>
          <OutroScene />
        </SceneTransition>
      </Sequence>

      {/* Background music */}
      <Audio src={staticFile('music.mp3')} volume={0.25} />
    </AbsoluteFill>
  );
};
