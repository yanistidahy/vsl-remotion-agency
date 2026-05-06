import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

const TESTIMONIALS = [
  {
    name: "Marie L.",
    role: "Fondatrice, BoutiqueLuxe.fr",
    quote: "En 3 mois, notre CA a augmenté de +187%. L'IA gère tout le contenu.",
    result: "+187% de CA",
  },
  {
    name: "Thomas R.",
    role: "CEO, SportGear Store",
    quote: "Le chatbot répond à 80% des questions clients. Mon équipe se concentre sur la croissance.",
    result: "80% support automatisé",
  },
  {
    name: "Camille D.",
    role: "Directrice, MaisonDéco Paris",
    quote: "ROI de 8x sur nos publicités IA en premier mois. Incroyable.",
    result: "ROI 8x publicités",
  },
];

export const SocialProof: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)",
        padding: "60px 80px",
        flexDirection: "column",
        gap: 40,
      }}
    >
      <div style={{ opacity: titleOpacity, textAlign: "center" }}>
        <h2 style={{ fontFamily: "sans-serif", fontSize: 52, fontWeight: 800, color: "#fff", margin: 0 }}>
          Ils nous font <span style={{ color: "#f6e05e" }}>confiance</span>
        </h2>
      </div>

      <div style={{ display: "flex", gap: 28, flex: 1, alignItems: "stretch" }}>
        {TESTIMONIALS.map((t, i) => {
          const startFrame = 20 + i * 20;
          const progress = spring({ frame: frame - startFrame, fps, config: { damping: 14 }, durationInFrames: 35 });
          const opacity = interpolate(progress, [0, 1], [0, 1]);
          const translateY = interpolate(progress, [0, 1], [40, 0]);

          return (
            <div
              key={i}
              style={{
                opacity,
                transform: `translateY(${translateY}px)`,
                flex: 1,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(246,224,94,0.2)",
                borderRadius: 16,
                padding: "32px 28px",
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              <div
                style={{
                  background: "rgba(246,224,94,0.15)",
                  border: "1px solid #f6e05e",
                  borderRadius: 8,
                  padding: "10px 18px",
                  alignSelf: "flex-start",
                }}
              >
                <span style={{ fontFamily: "sans-serif", fontSize: 18, fontWeight: 700, color: "#f6e05e" }}>
                  {t.result}
                </span>
              </div>

              <p style={{ fontFamily: "sans-serif", fontSize: 18, color: "#e2e8f0", margin: 0, lineHeight: 1.6, flex: 1 }}>
                "{t.quote}"
              </p>

              <div>
                <p style={{ fontFamily: "sans-serif", fontSize: 16, fontWeight: 700, color: "#fff", margin: "0 0 4px" }}>
                  {t.name}
                </p>
                <p style={{ fontFamily: "sans-serif", fontSize: 14, color: "#a0aec0", margin: 0 }}>
                  {t.role}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};