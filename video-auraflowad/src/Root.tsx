import { Composition } from "remotion";
import { MainVideo } from "./compositions/MainVideo";

export const Root = () => (
  <Composition
    id="AuraFlowAd"
    component={MainVideo}
    durationInFrames={1800}
    fps={60}
    width={1080}
    height={1920}
  />
);
