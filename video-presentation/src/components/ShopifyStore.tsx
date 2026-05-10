import React from "react";
import { Img, staticFile } from "remotion";

const PRODUCTS = [
  {
    image: staticFile("product1.svg"),
    number: "N°01 NETTOIE",
    name: "Shampooing Algues & Protéines",
    price: "28,00 €",
  },
  {
    image: staticFile("product2.svg"),
    number: "N°02 NOURRIT",
    name: "Masque Hydratant Intensif",
    price: "32,00 €",
  },
  {
    image: staticFile("product3.svg"),
    number: "N°03 DÉMÊLE",
    name: "Après-shampooing Équilibrant",
    price: "31,00 €",
  },
];

type ShopifyStoreProps = {
  scrollY?: number;
};

export const ShopifyStore: React.FC<ShopifyStoreProps> = ({ scrollY = 0 }) => {
  return (
    <div
      style={{
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        background: "#fff",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Scrollable page content */}
      <div style={{ transform: `translateY(${-scrollY}px)` }}>

        {/* Announcement bar */}
        <div
          style={{
            background: "#1a1a1a",
            color: "#fff",
            textAlign: "center",
            padding: "6px 12px",
            fontSize: 9.5,
            letterSpacing: 0.4,
          }}
        >
          Livraison offerte dès 50€ | Produits 100% naturels 🌿
        </div>

        {/* Header / Navbar */}
        <nav
          style={{
            background: "#fff",
            borderBottom: "1px solid #e8e8e8",
            padding: "10px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <span
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: 4,
              color: "#1a1a1a",
              textTransform: "uppercase",
            }}
          >
            ALGAÉE
          </span>

          {/* Navigation */}
          <div
            style={{
              display: "flex",
              gap: 18,
              fontSize: 10.5,
              color: "#1a1a1a",
              fontWeight: 400,
            }}
          >
            {["Accueil", "Soins cheveux", "Routines", "À propos"].map((link) => (
              <span key={link} style={{ cursor: "pointer", borderBottom: link === "Accueil" ? "1px solid #1a1a1a" : "none", paddingBottom: 1 }}>
                {link}
              </span>
            ))}
          </div>

          {/* Icons */}
          <div style={{ display: "flex", gap: 12, alignItems: "center", fontSize: 13, color: "#1a1a1a" }}>
            <span>🔍</span>
            <span>👤</span>
            <span style={{ position: "relative" }}>
              🛒
              <span
                style={{
                  position: "absolute",
                  top: -5,
                  right: -7,
                  background: "#1a1a1a",
                  color: "#fff",
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  fontSize: 7,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                0
              </span>
            </span>
          </div>
        </nav>

        {/* Hero Banner */}
        <div
          style={{
            background: "linear-gradient(135deg, #f7f2ec 0%, #f0e9e0 100%)",
            display: "flex",
            alignItems: "center",
            padding: "28px 24px",
            gap: 20,
            minHeight: 170,
          }}
        >
          <div style={{ flex: 1 }}>
            <p
              style={{
                fontSize: 8.5,
                color: "#4a9b8e",
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: "uppercase",
                margin: "0 0 8px",
              }}
            >
              Collection 2024
            </p>
            <h1
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: 21,
                fontWeight: 700,
                color: "#1a1a1a",
                lineHeight: 1.25,
                margin: "0 0 10px",
              }}
            >
              Soins capillaires<br />aux algues françaises
            </h1>
            <p style={{ fontSize: 10.5, color: "#666", margin: "0 0 16px", lineHeight: 1.5 }}>
              Formulés sans sulfates, sans silicones
            </p>
            <button
              style={{
                background: "#1a1a1a",
                color: "#fff",
                border: "none",
                padding: "10px 22px",
                fontSize: 9,
                fontWeight: 600,
                letterSpacing: 1.5,
                cursor: "pointer",
                textTransform: "uppercase",
                borderRadius: 0,
              }}
            >
              Découvrir la collection
            </button>
          </div>

          {/* Hero product image */}
          <div
            style={{
              width: 140,
              height: 140,
              flexShrink: 0,
              background: "#fff",
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
          >
            <Img
              src={staticFile("hero.svg")}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
        </div>

        {/* Products grid */}
        <div style={{ padding: "24px 20px", background: "#fff" }}>
          <h2
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: 18,
              fontWeight: 700,
              color: "#1a1a1a",
              textAlign: "center",
              margin: "0 0 20px",
              letterSpacing: 0.5,
            }}
          >
            Nos bestsellers
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 20,
            }}
          >
            {PRODUCTS.map((product) => (
              <div key={product.number} style={{ background: "#fff" }}>
                {/* Product image */}
                <div
                  style={{
                    background: "#f7f7f7",
                    paddingBottom: "100%",
                    position: "relative",
                    overflow: "hidden",
                    marginBottom: 10,
                  }}
                >
                  <Img
                    src={product.image}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>

                {/* Product info */}
                <p
                  style={{
                    fontSize: 8.5,
                    color: "#888",
                    margin: "0 0 3px",
                    textTransform: "uppercase",
                    letterSpacing: 1.2,
                    fontWeight: 500,
                  }}
                >
                  {product.number}
                </p>
                <p
                  style={{
                    fontSize: 11.5,
                    fontWeight: 600,
                    color: "#1a1a1a",
                    margin: "0 0 4px",
                    lineHeight: 1.3,
                  }}
                >
                  {product.name}
                </p>
                <p style={{ fontSize: 12, color: "#1a1a1a", margin: "0 0 10px", fontWeight: 400 }}>
                  {product.price}
                </p>
                <button
                  style={{
                    background: "#fff",
                    color: "#1a1a1a",
                    border: "1px solid #1a1a1a",
                    padding: "7px 0",
                    fontSize: 9,
                    fontWeight: 600,
                    cursor: "pointer",
                    letterSpacing: 0.8,
                    width: "100%",
                    textTransform: "uppercase",
                  }}
                >
                  Ajouter au panier
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer hint */}
        <div
          style={{
            textAlign: "center",
            padding: "16px",
            borderTop: "1px solid #e8e8e8",
            fontSize: 9,
            color: "#aaa",
          }}
        >
          Propulsé par <strong style={{ color: "#555" }}>Shopify</strong>
        </div>
      </div>
    </div>
  );
};
