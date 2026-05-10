import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

type Props = {
  titleText: string;
  titleColor: string;
};

export const MyVideo: React.FC<Props> = ({ titleText, titleColor }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  const slideUp = interpolate(frame, [0, 30], [50, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0f0f0f",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          fontFamily: "sans-serif",
          fontSize: 80,
          color: titleColor,
          opacity,
          transform: `translateY(${slideUp}px)`,
          textAlign: "center",
          padding: "0 100px",
        }}
      >
        {titleText}
      </h1>
    </AbsoluteFill>
  );
};
