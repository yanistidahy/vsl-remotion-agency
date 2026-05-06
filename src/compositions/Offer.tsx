import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

const INCLUSIONS = [
  "✅ Audit IA de votre boutique (valeur 497€)",
  "✅ Intégration chatbot e-commerce personnalisé",
  "✅ 30 fiches produits générées par IA",
  "✅ Campagnes Meta & Google optimisées par IA",
  "✅ Séquence email automation complète (7 emails)",
  "✅ Dashboard reporting en temps réel",
  "✅ Support prioritaire 7j/7",
];

export const Offer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerProgress = spring({ frame, fps, config: { damping: 14 }, durationInFrames: 35 });
  const headerOpacity = interpolate(headerProgress, [0, 1], [0, 1]);
  const headerScale = interpolate(headerProgress, [0, 1], [0.9, 1]);

  const priceOpacity = interpolate(frame, [50, 70], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
        padding: "50px 80px",
        flexDirection: "row",
        gap: 60,
        alignItems: "center",
      }}
    >
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 28 }}>
        <div style={{ opacity: headerOpacity, transform: `scale(${headerScale})` }}>
          <p style={{ fontFamily: "sans-serif", fontSize: 18, color: "#6ee7f7", letterSpacing: 3, textTransform: "uppercase", margin: "0 0 10px" }}>
            Offre de lancement
          </p>
          <h2 style={{ fontFamily: "sans-serif", fontSize: 48, fontWeight: 800, color: "#fff", margin: 0, lineHeight: 1.15 }}>
            Pack IA E-commerce{" "}
            <span style={{ color: "#6ee7f7" }}>Complet</span>
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {INCLUSIONS.map((item, i) => {
            const startFrame = 20 + i * 10;
            const opacity = interpolate(frame, [startFrame, startFrame + 12], [0, 1], {
              extrapolateRight: "clamp",
              extrapolateLeft: "clamp",
            });
            const translateX = interpolate(frame, [startFrame, startFrame + 12], [-20, 0], {
              extrapolateRight: "clamp",
              extrapolateLeft: "clamp",
            });
            return (
              <p
                key={i}
                style={{
                  opacity,
                  transform: `translateX(${translateX}px)`,
                  fontFamily: "sans-serif",
                  fontSize: 20,
                  color: "#e2e8f0",
                  margin: 0,
                }}
              >
                {item}
              </p>
            );
          })}
        </div>
      </div>

      <div
        style={{
          opacity: priceOpacity,
          background: "rgba(110,231,247,0.08)",
          border: "2px solid #6ee7f7",
          borderRadius: 24,
          padding: "48px 52px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          minWidth: 320,
        }}
      >
        <p style={{ fontFamily: "sans-serif", fontSize: 16, color: "#a0aec0", margin: 0, textDecoration: "line-through" }}>
          Valeur totale : 3 497€
        </p>
        <div>
          <p style={{ fontFamily: "sans-serif", fontSize: 18, color: "#6ee7f7", margin: "0 0 8px" }}>
            Offre spéciale
          </p>
          <p style={{ fontFamily: "sans-serif", fontSize: 72, fontWeight: 900, color: "#fff", margin: 0, lineHeight: 1 }}>
            997€
          </p>
          <p style={{ fontFamily: "sans-serif", fontSize: 16, color: "#a0aec0", margin: "8px 0 0" }}>
            paiement unique
          </p>
        </div>
        <div
          style={{
            background: "#e53e3e",
            borderRadius: 8,
            padding: "8px 16px",
          }}
        >
          <p style={{ fontFamily: "sans-serif", fontSize: 15, color: "#fff", margin: 0, fontWeight: 700 }}>
            ⏳ Seulement 5 places ce mois-ci
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};