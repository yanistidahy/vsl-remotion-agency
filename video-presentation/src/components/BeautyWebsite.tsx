import React from "react";
import { COLORS } from "../constants";

type BeautyWebsiteProps = {
  scrollY?: number;
};

const products = [
  { name: "Crème Lumière", price: "45,00 EUR", category: "Soin visage", color: "#f5e6d3" },
  { name: "Sérum Éclat", price: "62,00 EUR", category: "Sérum", color: "#e8d5c4" },
  { name: "Huile Précieuse", price: "38,00 EUR", category: "Soin corps", color: "#d4c5b0" },
  { name: "N°03 DÉMÊLE", price: "31,00 EUR", category: "Soin cheveux", color: "#e2d4c8" },
  { name: "Masque Douceur", price: "28,00 EUR", category: "Masque", color: "#f0e4d7" },
  { name: "Baume Lèvres", price: "18,00 EUR", category: "Lèvres", color: "#f5d5c5" },
];

export const BeautyWebsite: React.FC<BeautyWebsiteProps> = ({ scrollY = 0 }) => {
  return (
    <div
      style={{
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        background: "#fff",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        transform: `translateY(${-scrollY}px)`,
        fontSize: 11,
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 24px",
          borderBottom: "1px solid #f0f0f0",
          background: "#fff",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <span style={{ fontWeight: 700, fontSize: 14, color: COLORS.primary, letterSpacing: "-0.5px" }}>
          SOINS NATURELS &amp; BEAUTÉ
        </span>
        <div style={{ display: "flex", gap: 16, color: "#555", fontSize: 10 }}>
          {["Visage", "Cheveux", "Corps", "Nouveau"].map((item) => (
            <span key={item} style={{ cursor: "pointer" }}>{item}</span>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span style={{ fontSize: 10, color: "#888" }}>🔍</span>
          <span style={{ fontSize: 10, color: "#888" }}>♡</span>
          <div
            style={{
              background: COLORS.primary,
              color: "#fff",
              padding: "4px 10px",
              borderRadius: 20,
              fontSize: 9,
              fontWeight: 600,
            }}
          >
            Panier (0)
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div
        style={{
          background: "linear-gradient(135deg, #f5ece4 0%, #ede0d4 100%)",
          padding: "30px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: 140,
        }}
      >
        <div>
          <p style={{ fontSize: 9, color: COLORS.primary, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 6px" }}>
            Collection Printemps 2024
          </p>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#1a1a1a", margin: "0 0 8px", lineHeight: 1.2 }}>
            La nature au cœur<br />de votre beauté
          </h1>
          <p style={{ fontSize: 10, color: "#666", margin: "0 0 14px", maxWidth: 220 }}>
            Des soins 100% naturels, formulés pour sublimer votre peau et vos cheveux.
          </p>
          <button
            style={{
              background: COLORS.primary,
              color: "#fff",
              border: "none",
              padding: "8px 18px",
              borderRadius: 20,
              fontSize: 10,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Découvrir →
          </button>
        </div>
        {/* Decorative circle / product illustration */}
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #f0d9c8, #e8c8b2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            fontSize: 40,
          }}
        >
          🌿
        </div>
      </div>

      {/* Products grid */}
      <div style={{ padding: "20px 24px" }}>
        <h2 style={{ fontSize: 14, fontWeight: 700, color: "#1a1a1a", margin: "0 0 14px" }}>
          Nos bestsellers
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
          {products.map((p) => (
            <div
              key={p.name}
              style={{
                borderRadius: 8,
                overflow: "hidden",
                border: "1px solid #f0f0f0",
                background: "#fff",
              }}
            >
              <div
                style={{
                  height: 80,
                  background: p.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 28,
                }}
              >
                {p.category.includes("cheveux") ? "💆" : p.category.includes("Masque") ? "✨" : p.category.includes("Lèvres") ? "💋" : p.category.includes("Sérum") ? "💧" : p.category.includes("corps") ? "🌸" : "🧴"}
              </div>
              <div style={{ padding: "8px 10px" }}>
                <p style={{ fontSize: 10, color: COLORS.primary, margin: "0 0 2px", fontWeight: 600 }}>{p.category}</p>
                <p style={{ fontSize: 11, fontWeight: 700, color: "#1a1a1a", margin: "0 0 4px" }}>{p.name}</p>
                <p style={{ fontSize: 11, color: COLORS.primary, fontWeight: 700, margin: 0 }}>{p.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
