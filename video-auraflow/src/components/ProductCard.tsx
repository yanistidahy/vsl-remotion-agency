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

  const scale = spring({ fps, frame: local, config: { damping: 18, stiffness: 260, mass: 0.9 }, from: 0.82, to: 1 });
  const opacity = interpolate(local, [0, 14], [0, 1], { extrapolateRight: "clamp" });
  const y = interpolate(local, [0, 14], [12, 0], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        background: "#fff",
        border: `1.5px solid ${C.accent}55`,
        borderRadius: 16,
        padding: "14px 16px",
        transform: `scale(${scale}) translateY(${y}px)`,
        transformOrigin: "top center",
        opacity,
        fontFamily: FONT.sans,
        boxShadow: `0 12px 40px rgba(124,58,237,0.14)`,
        marginTop: 6,
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
          marginBottom: 12,
        }}
      >
        ✨ Recommandé pour vous
      </div>

      <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
        {/* Product photo */}
        <div
          style={{
            width: 72,
            height: 88,
            borderRadius: 10,
            background: "linear-gradient(135deg, #fdf8f0 0%, #f5ede0 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            border: "1px solid #e8d8c0",
            overflow: "hidden",
          }}
        >
          <Img
            src={staticFile("product-bottle.svg")}
            style={{ width: 52, height: 78, objectFit: "contain" }}
          />
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
          <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 8 }}>
            Hydratation · anti-frisottis
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 20, fontWeight: 900, color: C.primary }}>
              24,65€
            </span>
            <span
              style={{
                fontSize: 10.5,
                color: "#6b7280",
                background: "#f3f4f6",
                borderRadius: 20,
                padding: "2px 8px",
              }}
            >
              ⭐ 4.9 (128)
            </span>
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: 14,
          background: C.gradient,
          borderRadius: 10,
          padding: "10px 0",
          textAlign: "center",
          fontSize: 13.5,
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
