import React from "react";
import { Img, interpolate } from "remotion";
import { COLORS } from "../constants";

const BRAND_TEAL = "#4a9b8e";

type ProductCardProps = {
  name: string;
  subtitle: string;
  description: string;
  price: string;
  imageUrl: string;
  appear?: number;
};

export const ProductCardComponent: React.FC<ProductCardProps> = ({
  name,
  subtitle,
  description,
  price,
  imageUrl,
  appear = 1,
}) => {
  const translateY = interpolate(appear, [0, 1], [20, 0]);

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 10,
        overflow: "hidden",
        boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
        transform: `translateY(${translateY}px)`,
        opacity: appear,
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        width: 220,
        border: "1px solid #f0f0f0",
      }}
    >
      {/* Product image */}
      <div
        style={{
          height: 120,
          background: "#f7f7f7",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Img
          src={imageUrl}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
        <div
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            background: BRAND_TEAL,
            color: "#fff",
            fontSize: 8,
            padding: "3px 7px",
            borderRadius: 3,
            fontWeight: 700,
            letterSpacing: 0.5,
            textTransform: "uppercase",
          }}
        >
          Bestseller
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: "12px 14px" }}>
        <p
          style={{
            fontSize: 8.5,
            color: BRAND_TEAL,
            fontWeight: 700,
            margin: "0 0 2px",
            textTransform: "uppercase",
            letterSpacing: 1.2,
          }}
        >
          {subtitle}
        </p>
        <p
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "#1a1a1a",
            margin: "0 0 4px",
          }}
        >
          {name}
        </p>
        <p
          style={{
            fontSize: 10,
            color: "#666",
            margin: "0 0 10px",
            lineHeight: 1.4,
          }}
        >
          {description}
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: 15, fontWeight: 700, color: BRAND_TEAL }}>
            {price}
          </span>
          <button
            style={{
              background: "#1a1a1a",
              color: "#fff",
              border: "none",
              padding: "7px 12px",
              borderRadius: 4,
              fontSize: 10,
              fontWeight: 600,
              cursor: "pointer",
              letterSpacing: 0.3,
            }}
          >
            Voir le produit →
          </button>
        </div>
      </div>
    </div>
  );
};
