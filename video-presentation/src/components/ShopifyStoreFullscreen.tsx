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

type Props = { scrollY?: number };

export const ShopifyStoreFullscreen: React.FC<Props> = ({ scrollY = 0 }) => (
  <div
    style={{
      width: 1920,
      height: 1080,
      overflow: "hidden",
      background: "#fff",
      fontFamily: "'Helvetica Neue', Arial, sans-serif",
      position: "relative",
    }}
  >
    <div style={{ transform: `translateY(${-scrollY}px)` }}>
      {/* Announcement bar */}
      <div
        style={{
          background: "#1a1a1a",
          color: "#fff",
          textAlign: "center",
          padding: "11px 0",
          fontSize: 15,
          letterSpacing: 0.5,
        }}
      >
        Livraison offerte dès 50€ | 100% Naturel 🌿
      </div>

      {/* Navbar */}
      <nav
        style={{
          background: "#fff",
          borderBottom: "1px solid #e5e5e5",
          padding: "0 100px",
          height: 78,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: 6,
            color: "#1a1a1a",
          }}
        >
          ALGAÉE
        </span>
        <div style={{ display: "flex", gap: 44, fontSize: 16, color: "#1a1a1a" }}>
          {["Accueil", "Soins cheveux", "Routines", "À propos"].map((link) => (
            <span
              key={link}
              style={{
                cursor: "pointer",
                borderBottom: link === "Accueil" ? "1.5px solid #1a1a1a" : "none",
                paddingBottom: 3,
              }}
            >
              {link}
            </span>
          ))}
        </div>
        <div style={{ display: "flex", gap: 26, fontSize: 22, color: "#1a1a1a", alignItems: "center" }}>
          <span>🔍</span>
          <span>👤</span>
          <span style={{ position: "relative" }}>
            🛒
            <span
              style={{
                position: "absolute",
                top: -5,
                right: -9,
                background: "#1a1a1a",
                color: "#fff",
                width: 18,
                height: 18,
                borderRadius: "50%",
                fontSize: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
              }}
            >
              0
            </span>
          </span>
        </div>
      </nav>

      {/* Hero */}
      <div
        style={{
          background: "linear-gradient(135deg, #f7f2ec 0%, #efe8de 100%)",
          display: "flex",
          alignItems: "center",
          padding: "0 140px",
          height: 530,
          gap: 100,
        }}
      >
        <div style={{ flex: 1 }}>
          <p
            style={{
              fontSize: 13,
              color: "#4a9b8e",
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: "uppercase",
              margin: "0 0 22px",
            }}
          >
            Collection 2024
          </p>
          <h1
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: 66,
              fontWeight: 700,
              color: "#1a1a1a",
              lineHeight: 1.15,
              margin: "0 0 22px",
            }}
          >
            Soins capillaires
            <br />
            aux algues françaises
          </h1>
          <p style={{ fontSize: 20, color: "#666", margin: "0 0 40px", lineHeight: 1.6 }}>
            Formulés sans sulfates, sans silicones
          </p>
          <button
            style={{
              background: "#1a1a1a",
              color: "#fff",
              border: "none",
              padding: "18px 48px",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: 2.5,
              cursor: "pointer",
              textTransform: "uppercase",
            }}
          >
            Découvrir la collection
          </button>
        </div>

        <div
          style={{
            width: 380,
            height: 380,
            background: "rgba(255,255,255,0.65)",
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 24px 80px rgba(0,0,0,0.1)",
            flexShrink: 0,
          }}
        >
          <Img
            src={staticFile("hero.svg")}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
      </div>

      {/* Products section */}
      <div style={{ padding: "70px 140px 80px", background: "#fff" }}>
        <h2
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: 38,
            fontWeight: 700,
            color: "#1a1a1a",
            textAlign: "center",
            margin: "0 0 56px",
            letterSpacing: 0.5,
          }}
        >
          Nos bestsellers
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 36 }}>
          {PRODUCTS.map((p) => (
            <div key={p.number}>
              <div
                style={{
                  background: "#f7f7f7",
                  height: 300,
                  marginBottom: 22,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Img
                  src={p.image}
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
              <p
                style={{
                  fontSize: 11,
                  color: "#888",
                  margin: "0 0 6px",
                  textTransform: "uppercase",
                  letterSpacing: 2,
                  fontWeight: 600,
                }}
              >
                {p.number}
              </p>
              <p style={{ fontSize: 19, fontWeight: 600, color: "#1a1a1a", margin: "0 0 6px" }}>
                {p.name}
              </p>
              <p style={{ fontSize: 19, color: "#1a1a1a", margin: "0 0 18px" }}>{p.price}</p>
              <button
                style={{
                  background: "#fff",
                  color: "#1a1a1a",
                  border: "1px solid #1a1a1a",
                  padding: "13px 0",
                  fontSize: 12,
                  fontWeight: 600,
                  width: "100%",
                  cursor: "pointer",
                  letterSpacing: 1.2,
                  textTransform: "uppercase",
                }}
              >
                Ajouter au panier
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          borderTop: "1px solid #e5e5e5",
          fontSize: 12,
          color: "#aaa",
          background: "#fafafa",
        }}
      >
        Propulsé par <strong style={{ color: "#555" }}>Shopify</strong>
      </div>
    </div>
  </div>
);
