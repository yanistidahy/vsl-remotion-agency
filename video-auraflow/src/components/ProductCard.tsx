import React from "react";
import { interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Img } from "remotion";
import { C, FONT } from "../constants";

type Props = {
  startFrame?: number;
};

export const ProductCard: React.FC<Props> = ({ startFrame = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = Math.max(0, frame - startFrame);

  const scale = spring({ fps, frame: local, config: { damping: 18, stiffness: 260, mass: 0.9 }, from: 0.85, to: 1 });
  const opacity = interpolate(local, [0, 12], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        background: "#fff",
        border: `1.5px solid ${C.accent}55`,
        borderRadius: 14,
        padding: "14px 16px",
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        opacity,
        fontFamily: FONT.sans,
        boxShadow: `0 8px 30px rgba(124,58,237,0.12)`,
        marginTop: 4,
        marginBottom: 4,
      }}
    >
      <div
        style={{
          fontSize: 10,
          color: C.primary,
          fontWeight: 700,
          letterSpacing: 1.2,
          textTransform: "uppercase",
          marginBottom: 10,
        }}
      >
        ✨ Recommandé pour vous
      </div>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 10,
            background: "linear-gradient(135deg, #f5f2ff 0%, #ede9fe 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 32,
            flexShrink: 0,
            border: "1px solid #e8e0ff",
          }}
        >
          🌿
        </div>

        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#18181b",
              lineHeight: 1.3,
              marginBottom: 3,
            }}
          >
            Huile de Baobab Bio 250ml
          </div>
          <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 6 }}>
            Hydratation & anti-frisottis
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                fontSize: 18,
                fontWeight: 900,
                color: C.primary,
              }}
            >
              24,65€
            </span>
            <span
              style={{
                fontSize: 10,
                color: "#6b7280",
                background: "#f3f4f6",
                borderRadius: 20,
                padding: "2px 7px",
              }}
            >
              ⭐ 4.9
            </span>
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: 12,
          background: C.gradient,
          borderRadius: 9,
          padding: "9px 0",
          textAlign: "center",
          fontSize: 13,
          fontWeight: 700,
          color: "#fff",
          letterSpacing: 0.2,
        }}
      >
        Voir le produit →
      </div>
    </div>
  );
};
