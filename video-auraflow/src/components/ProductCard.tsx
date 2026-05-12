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

  const slide = spring({ fps, frame: local, config: { damping: 22, stiffness: 180 }, from: 60, to: 0 });
  const opacity = interpolate(local, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        background: "rgba(15,10,30,0.97)",
        border: `1px solid ${C.accent}55`,
        borderRadius: 16,
        padding: "20px 22px",
        width: 320,
        transform: `translateY(${slide}px)`,
        opacity,
        fontFamily: FONT.sans,
        boxShadow: `0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px ${C.primary}22`,
      }}
    >
      <div
        style={{
          fontSize: 11,
          color: C.accent,
          fontWeight: 600,
          letterSpacing: 1.5,
          textTransform: "uppercase",
          marginBottom: 14,
        }}
      >
        ✨ Recommandé pour vous
      </div>

      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 12,
            background: "linear-gradient(135deg, #1a1025 0%, #2d1b4e 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            border: `1px solid ${C.primary}44`,
            overflow: "hidden",
          }}
        >
          <Img
            src={staticFile("product-baobab.svg")}
            style={{ width: 64, height: 64, objectFit: "contain" }}
          />
        </div>

        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.3,
              marginBottom: 4,
            }}
          >
            Huile de Baobab Bio 250ml
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>
            Hydratation & anti-frisottis
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 18, fontWeight: 800, color: C.accent }}>24.65€</span>
            <span
              style={{
                fontSize: 11,
                background: `${C.primary}33`,
                color: C.accent,
                borderRadius: 20,
                padding: "2px 8px",
                border: `1px solid ${C.primary}44`,
              }}
            >
              ⭐ 4.9
            </span>
          </div>
        </div>
      </div>

      <button
        style={{
          marginTop: 16,
          width: "100%",
          padding: "10px 0",
          background: C.gradient,
          border: "none",
          borderRadius: 10,
          color: "#fff",
          fontSize: 13,
          fontWeight: 700,
          fontFamily: FONT.sans,
          cursor: "pointer",
          letterSpacing: 0.3,
        }}
      >
        Ajouter au panier →
      </button>
    </div>
  );
};
