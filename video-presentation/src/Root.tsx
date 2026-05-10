import React from "react";
import { Composition } from "remotion";
import { ChatbotPresentation } from "./ChatbotPresentation";

// Total: 1350 frames = 45s at 30fps
const TOTAL_FRAMES = 150 + 210 + 120 + 120 + 240 + 300 + 210; // = 1350

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ChatbotPresentation"
        component={ChatbotPresentation}
        durationInFrames={TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
