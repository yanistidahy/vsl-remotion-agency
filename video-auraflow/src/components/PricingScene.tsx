import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT } from "../constants";

const plans = [
  {
    name: "Essentiel",
    setup: "300€",
    monthly: "150€/mois",
    highlight: false,
    color: "rgba(255,255,255,0.06)",
    border: "rgba(255,255,255,0.1)",
    badge: null,
    features: [
      "Chat IA illimité",
      "Catalogue jusqu'à 500 produits",
      "Support par email",
      "Tableau de bord basique",
      "1 boutique",
    ],
  },
  {
    name: "Premium",
    setup: "500€",
    monthly: "300€/mois",
    highlight: true,
    color: `${C.primary}22`,
    border: `${C.primary}55`,
    badge: "⭐ Populaire",
    features: [
      "Chat IA illimité",
      "Catalogue illimité",
      "Support prioritaire 24/7",
      "Analytics avancés + A/B tests",
      "Jusqu'à 5 boutiques",
      "Personnalisation complète",
    ],
  },
];

export const PricingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const fadeOut = interpolate(frame, [durationInFrames - 30, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleOpacity = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [0, 25], [30, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse 80% 60% at 50% 50%, #120830 0%, ${C.darker} 70%)`,
        opacity: fadeOut,
      }}
    >
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 160px",
        }}
      >
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            textAlign: "center",
            marginBottom: 60,
          }}
        >
          <div
            style={{
              fontSize: 14,
              color: C.accent,
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: "uppercase",
              marginBottom: 16,
              fontFamily: FONT.sans,
            }}
          >
            Tarifs
          </div>
          <div
            style={{
              fontSize: 52,
              fontWeight: 800,
              color: "#fff",
              fontFamily: FONT.sans,
              letterSpacing: "-1.5px",
            }}
          >
            Un investissement qui se rentabilise
          </div>
        </div>

        <div style={{ display: "flex", gap: 40, width: "100%", maxWidth: 1000 }}>
          {plans.map((plan, i) => {
            const start = 40 + i * 25;
            const sc = spring({ fps, frame: Math.max(0, frame - start), config: { damping: 22, stiffness: 200 }, from: 0.88, to: 1 });
            const op = interpolate(frame, [start, start + 20], [0, 1], { extrapolateRight: "clamp" });

            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  background: plan.color,
                  border: `1px solid ${plan.border}`,
                  borderRadius: 24,
                  padding: "42px 38px",
                  transform: `scale(${sc})`,
                  opacity: op,
                  fontFamily: FONT.sans,
                  position: "relative",
                  boxShadow: plan.highlight ? `0 0 80px ${C.primary}30` : "none",
                }}
              >
                {plan.badge && (
                  <div
                    style={{
                      position: "absolute",
                      top: -14,
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: C.gradient,
                      color: "#fff",
                      borderRadius: 20,
                      padding: "4px 18px",
                      fontSize: 13,
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {plan.badge}
                  </div>
                )}

                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 800,
                    color: plan.highlight ? C.accent : "#fff",
                    marginBottom: 24,
                  }}
                >
                  {plan.name}
                </div>

                <div style={{ marginBottom: 8 }}>
                  <span style={{ fontSize: 18, color: "rgba(255,255,255,0.5)", fontWeight: 400 }}>
                    Installation:{" "}
                  </span>
                  <span style={{ fontSize: 24, fontWeight: 800, color: "#fff" }}>{plan.setup}</span>
                </div>
                <div style={{ marginBottom: 32 }}>
                  <span
                    style={{
                      fontSize: 42,
                      fontWeight: 900,
                      color: plan.highlight ? C.accent : "#fff",
                    }}
                  >
                    {plan.monthly.split("/")[0]}
                  </span>
                  <span style={{ fontSize: 16, color: "rgba(255,255,255,0.4)" }}>/mois</span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 36 }}>
                  {plan.features.map((f, fi) => {
                    const featureStart = start + 30 + fi * 10;
                    return (
                      <div
                        key={fi}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          opacity: interpolate(frame, [featureStart, featureStart + 15], [0, 1], {
                            extrapolateRight: "clamp",
                          }),
                          transform: `translateX(${interpolate(frame, [featureStart, featureStart + 15], [-10, 0], { extrapolateRight: "clamp" })}px)`,
                        }}
                      >
                        <span
                          style={{
                            color: plan.highlight ? C.accent : "#4ade80",
                            fontSize: 15,
                            fontWeight: 700,
                          }}
                        >
                          ✓
                        </span>
                        <span style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>{f}</span>
                      </div>
                    );
                  })}
                </div>

                <div
                  style={{
                    background: plan.highlight ? C.gradient : "rgba(255,255,255,0.1)",
                    borderRadius: 12,
                    padding: "13px 0",
                    textAlign: "center",
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  Choisir {plan.name} →
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
