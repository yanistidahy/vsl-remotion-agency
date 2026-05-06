import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

const PAIN_POINTS = [
  "Des heures perdues à rédiger des fiches produits",
  "Des campagnes publicitaires qui ne convertissent pas",
  "Un service client débordé par les mêmes questions",
  "Des abandons de panier sans relance automatique",
];

export const Problem: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #1a0000 0%, #2d0000 100%)",
        justifyContent: "center",
        alignItems: "flex-start",
        flexDirection: "column",
        padding: "0 120px",
        gap: 40,
      }}
    >
      <h2
        style={{
          opacity: titleOpacity,
          fontFamily: "sans-serif",
          fontSize: 52,
          fontWeight: 800,
          color: "#fff",
          margin: 0,
        }}
      >
        Vous reconnaissez-vous ?
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 20, width: "100%" }}>
        {PAIN_POINTS.map((point, i) => {
          const startFrame = 20 + i * 18;
          const opacity = interpolate(frame, [startFrame, startFrame + 15], [0, 1], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
          });
          const translateX = interpolate(frame, [startFrame, startFrame + 15], [-30, 0], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
          });

          return (
            <div
              key={i}
              style={{
                opacity,
                transform: `translateX(${translateX}px)`,
                display: "flex",
                alignItems: "center",
                gap: 20,
                background: "rgba(255,255,255,0.05)",
                borderLeft: "4px solid #e53e3e",
                padding: "18px 24px",
                borderRadius: 8,
              }}
            >
              <span style={{ fontSize: 28 }}>❌</span>
              <p
                style={{
                  fontFamily: "sans-serif",
                  fontSize: 24,
                  color: "#fff",
                  margin: 0,
                }}
              >
                {point}
              </p>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};