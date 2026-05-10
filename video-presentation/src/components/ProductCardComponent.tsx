import React from "react";
import { interpolate } from "remotion";
import { COLORS } from "../constants";

type ProductCardProps = {
  name: string;
  description: string;
  price: string;
  appear?: number; // 0-1 animation progress
};

export const ProductCardComponent: React.FC<ProductCardProps> = ({
  name,
  description,
  price,
  appear = 1,
}) => {
  const translateY = interpolate(appear, [0, 1], [20, 0]);
  const opacity = appear;

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        transform: `translateY(${translateY}px)`,
        opacity,
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        width: 240,
      }}
    >
      {/* Product image area */}
      <div
        style={{
          height: 110,
          background: "linear-gradient(135deg, #f0e4d7, #e2d0c0)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <span style={{ fontSize: 50 }}>💆</span>
        <div
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            background: COLORS.primary,
            color: "#fff",
            fontSize: 9,
            padding: "3px 8px",
            borderRadius: 10,
            fontWeight: 600,
          }}
        >
          Bestseller
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "12px 14px" }}>
        <p style={{ fontSize: 9, color: COLORS.primary, fontWeight: 600, margin: "0 0 3px", textTransform: "uppercase", letterSpacing: 1 }}>
          Après-shampooing
        </p>
        <p style={{ fontSize: 13, fontWeight: 700, color: COLORS.text, margin: "0 0 4px" }}>
          {name}
        </p>
        <p style={{ fontSize: 10, color: "#666", margin: "0 0 10px", lineHeight: 1.4 }}>
          {description}
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: COLORS.primary }}>{price}</span>
          <button
            style={{
              background: COLORS.gradient,
              color: "#fff",
              border: "none",
              padding: "7px 14px",
              borderRadius: 20,
              fontSize: 11,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Voir le produit →
          </button>
        </div>
      </div>
    </div>
  );
};
