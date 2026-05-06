import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const titleY = spring({ frame, fps, config: { damping: 12 }, durationInFrames: 40 });
  const titleTranslate = interpolate(titleY, [0, 1], [40, 0]);

  const subtitleOpacity = interpolate(frame, [25, 45], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%)",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 24,
      }}
    >
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleTranslate}px)`,
          textAlign: "center",
          padding: "0 80px",
        }}
      >
        <p
          style={{
            fontFamily: "sans-serif",
            fontSize: 22,
            color: "#6ee7f7",
            letterSpacing: 4,
            textTransform: "uppercase",
            margin: "0 0 16px",
          }}
        >
          Agence IA E-commerce
        </p>
        <h1
          style={{
            fontFamily: "sans-serif",
            fontSize: 72,
            fontWeight: 900,
            color: "#ffffff",
            lineHeight: 1.1,
            margin: 0,
          }}
        >
          Multipliez vos ventes
          <br />
          <span style={{ color: "#6ee7f7" }}>sans effort humain</span>
        </h1>
      </div>

      <p
        style={{
          opacity: subtitleOpacity,
          fontFamily: "sans-serif",
          fontSize: 26,
          color: "#a0aec0",
          textAlign: "center",
          maxWidth: 700,
          margin: 0,
        }}
      >
        La puissance de l'intelligence artificielle au service de votre boutique
      </p>
    </AbsoluteFill>
  );
};