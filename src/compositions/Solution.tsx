import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

const FEATURES = [
  { icon: "🤖", title: "Contenu généré par IA", desc: "Fiches produits & emails en secondes" },
  { icon: "🎯", title: "Publicités ultra-ciblées", desc: "Audiences IA + copy optimisé automatiquement" },
  { icon: "💬", title: "Chatbot e-commerce 24/7", desc: "Répond, conseille et convertit à votre place" },
  { icon: "🔄", title: "Relances automatisées", desc: "Paniers abandonnés récupérés sans effort" },
];

export const Solution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0f0f0f 0%, #0d1b2a 100%)",
        padding: "60px 80px",
        flexDirection: "column",
        gap: 40,
      }}
    >
      <div style={{ opacity: headerOpacity, textAlign: "center" }}>
        <p style={{ fontFamily: "sans-serif", fontSize: 18, color: "#6ee7f7", letterSpacing: 3, textTransform: "uppercase", margin: "0 0 12px" }}>
          Notre solution
        </p>
        <h2 style={{ fontFamily: "sans-serif", fontSize: 52, fontWeight: 800, color: "#fff", margin: 0 }}>
          L'IA travaille.{" "}
          <span style={{ color: "#6ee7f7" }}>Vous encaissez.</span>
        </h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
          flex: 1,
        }}
      >
        {FEATURES.map((feat, i) => {
          const startFrame = 25 + i * 15;
          const progress = spring({ frame: frame - startFrame, fps, config: { damping: 14 }, durationInFrames: 30 });
          const opacity = interpolate(progress, [0, 1], [0, 1]);
          const scale = interpolate(progress, [0, 1], [0.85, 1]);

          return (
            <div
              key={i}
              style={{
                opacity,
                transform: `scale(${scale})`,
                background: "rgba(110,231,247,0.07)",
                border: "1px solid rgba(110,231,247,0.2)",
                borderRadius: 16,
                padding: "32px 28px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <span style={{ fontSize: 40 }}>{feat.icon}</span>
              <h3 style={{ fontFamily: "sans-serif", fontSize: 22, fontWeight: 700, color: "#fff", margin: 0 }}>
                {feat.title}
              </h3>
              <p style={{ fontFamily: "sans-serif", fontSize: 18, color: "#a0aec0", margin: 0 }}>
                {feat.desc}
              </p>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};