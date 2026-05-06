import "./index.css";
import { Composition } from "remotion";
import { VIDEO_FPS, VIDEO_WIDTH, VIDEO_HEIGHT, COMPOSITIONS } from "./constants";
import { Intro } from "./compositions/Intro";
import { Problem } from "./compositions/Problem";
import { Solution } from "./compositions/Solution";
import { SocialProof } from "./compositions/SocialProof";
import { Offer } from "./compositions/Offer";
import { CTA } from "./compositions/CTA";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* ── 1. Intro ───────────────────────────── */}
      <Composition
        id="VSL-Intro"
        component={Intro}
        durationInFrames={COMPOSITIONS.Intro.durationInFrames}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />

      {/* ── 2. Problème ────────────────────────── */}
      <Composition
        id="VSL-Problem"
        component={Problem}
        durationInFrames={COMPOSITIONS.Problem.durationInFrames}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />

      {/* ── 3. Solution ────────────────────────── */}
      <Composition
        id="VSL-Solution"
        component={Solution}
        durationInFrames={COMPOSITIONS.Solution.durationInFrames}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />

      {/* ── 4. Preuve sociale ──────────────────── */}
      <Composition
        id="VSL-SocialProof"
        component={SocialProof}
        durationInFrames={COMPOSITIONS.SocialProof.durationInFrames}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />

      {/* ── 5. Offre ───────────────────────────── */}
      <Composition
        id="VSL-Offer"
        component={Offer}
        durationInFrames={COMPOSITIONS.Offer.durationInFrames}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />

      {/* ── 6. Call to Action ──────────────────── */}
      <Composition
        id="VSL-CTA"
        component={CTA}
        durationInFrames={COMPOSITIONS.CTA.durationInFrames}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
    </>
  );
};