import React from "react";
import { Composition } from "remotion";
import { MainVideo } from "./compositions/MainVideo";
import { MainVideoAd } from "./compositions/MainVideoAd";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="AuraFlowVideo"
      component={MainVideo}
      durationInFrames={2050}
      fps={60}
      width={1920}
      height={1080}
      defaultProps={{}}
    />
    <Composition
      id="AuraFlowAd"
      component={MainVideoAd}
      durationInFrames={1800}
      fps={60}
      width={1080}
      height={1920}
      defaultProps={{}}
    />
  </>
);
