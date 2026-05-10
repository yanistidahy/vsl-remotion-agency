import { Composition } from "remotion";
import { MyVideo } from "./MyVideo";

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="MyVideo"
        component={MyVideo}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          titleText: "Bienvenue",
          titleColor: "#ffffff",
        }}
      />
    </>
  );
};
