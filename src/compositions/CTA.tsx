import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

export const CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const contentProgress = spring({ frame, fps, config: { damping: 12 }, durationInFrames: 40 });
  const opacity = interpolate(contentProgress, [0, 1], [0, 1]);
  const scale = interpolate(contentProgress, [0, 1], [0.88, 1]);

  const btnProgress = spring({ frame: frame - 30, fps, config: { damping: 10 }, durationInFrames: 35 });
  const btnOpacity = interpolate(btnProgress, [0, 1], [0, 1]);
  const btnScale = interpolate(btnProgress, [0, 1], [0.7, 1]);

  const pulse = interpolate(
    Math.sin(((frame - 60) / fps) * Math.PI * 2),
    [-1, 1],
    [1, 1.03],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const btnFinalScale = frame > 60 ? btnScale * pulse : btnScale;

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%)",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 36,
        padding: "0 100px",
      }}
    >
      <div
        style={{
          opacity,
          transform: `scale(${scale})`,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <h2
          style={{
            fontFamily: "sans-serif",
            fontSize: 64,
            fontWeight: 900,
            color: "#fff",
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          Prêt à automatiser
          <br />
          votre <span style={{ color: "#6ee7f7" }}>croissance ?</span>
        </h2>
        <p
          style={{
            fontFamily: "sans-serif",
            fontSize: 24,
            color: "#a0aec0",
            margin: 0,
          }}
        >
          Réservez votre appel stratégique gratuit de 30 min
        </p>
      </div>

      <div
        style={{
          opacity: btnOpacity,
          transform: `scale(${btnFinalScale})`,
          background: "linear-gradient(135deg, #6ee7f7 0%, #3182ce 100%)",
          borderRadius: 16,
          padding: "24px 64px",
          cursor: "pointer",
        }}
      >
        <p
          style={{
            fontFamily: "sans-serif",
            fontSize: 26,
            fontWeight: 800,
            color: "#0f0f0f",
            margin: 0,
            textAlign: "center",
          }}
        >
          Réserver mon appel gratuit →
        </p>
      </div>

      <p
        style={{
          opacity: interpolate(frame, [50, 70], [0, 1], { extrapolateRight: "clamp" }),
          fontFamily: "sans-serif",
          fontSize: 16,
          color: "#4a5568",
          margin: 0,
          textAlign: "center",
        }}
      >
        Sans engagement · Résultats garantis ou remboursé
      </p>
    </AbsoluteFill>
  );
};