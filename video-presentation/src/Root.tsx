import React from "react";
import { Composition } from "remotion";
import { MainVideo } from "./compositions/MainVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="AuraFlowPresentation"
        component={MainVideo}
        durationInFrames={2100} // 35s at 60fps
        fps={60}
        width={1920}
        height={1080}
      />
    </>
  );
};
