import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT } from "../constants";

const MockPage: React.FC<{ scrollY: number }> = ({ scrollY }) => (
  <div
    style={{
      position: "absolute",
      top: -scrollY,
      left: 0,
      right: 0,
      fontFamily: FONT.sans,
    }}
  >
    {/* Nav */}
    <div
      style={{
        background: "#fff",
        borderBottom: "1px solid #e5e7eb",
        padding: "0 40px",
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ fontSize: 22, fontWeight: 900, color: "#7c3aed" }}>AuraFlow AI</div>
      <div style={{ display: "flex", gap: 32, fontSize: 14, color: "#374151" }}>
        {["Fonctionnalités", "Tarifs", "Démo", "Contact"].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <div
        style={{
          background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
          color: "#fff",
          borderRadius: 8,
          padding: "8px 20px",
          fontSize: 14,
          fontWeight: 700,
        }}
      >
        Essai gratuit
      </div>
    </div>

    {/* Hero section */}
    <div
      style={{
        background: "linear-gradient(135deg, #faf5ff 0%, #ede9fe 100%)",
        padding: "80px 120px",
        display: "flex",
        gap: 80,
        alignItems: "center",
        minHeight: 500,
      }}
    >
      <div style={{ flex: 1 }}>
        <div
          style={{
            display: "inline-block",
            background: "#ede9fe",
            color: "#7c3aed",
            borderRadius: 20,
            padding: "4px 16px",
            fontSize: 13,
            fontWeight: 600,
            marginBottom: 20,
          }}
        >
          ✨ Propulsé par GPT-4
        </div>
        <div
          style={{
            fontSize: 52,
            fontWeight: 900,
            color: "#111827",
            lineHeight: 1.1,
            letterSpacing: "-1.5px",
            marginBottom: 24,
          }}
        >
          Vendez plus avec un<br />
          <span style={{ color: "#7c3aed" }}>assistant IA</span> intelligent
        </div>
        <div style={{ fontSize: 18, color: "#6b7280", lineHeight: 1.6, marginBottom: 36 }}>
          Installez AuraFlow sur votre Shopify en 5 minutes et regardez vos conversions exploser.
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          <div
            style={{
              background: "#7c3aed",
              color: "#fff",
              borderRadius: 10,
              padding: "14px 28px",
              fontSize: 16,
              fontWeight: 700,
            }}
          >
            Démarrer gratuitement →
          </div>
          <div
            style={{
              border: "2px solid #d1d5db",
              color: "#374151",
              borderRadius: 10,
              padding: "14px 28px",
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            Voir la démo
          </div>
        </div>
      </div>
      <div
        style={{
          flex: 1,
          background: "linear-gradient(135deg, #7c3aed22, #4f46e511)",
          borderRadius: 20,
          height: 340,
          border: "1px solid #c4b5fd44",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 80,
        }}
      >
        💬
      </div>
    </div>

    {/* Stats */}
    <div
      style={{
        background: "#1e1b4b",
        padding: "60px 120px",
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      {[
        { val: "+34%", label: "Taux de conversion" },
        { val: "24/7", label: "Support disponible" },
        { val: "5min", label: "Installation" },
        { val: "200+", label: "Boutiques actives" },
      ].map((s) => (
        <div key={s.label} style={{ textAlign: "center" }}>
          <div style={{ fontSize: 44, fontWeight: 900, color: "#a78bfa" }}>{s.val}</div>
          <div style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", marginTop: 6 }}>{s.label}</div>
        </div>
      ))}
    </div>

    {/* Features */}
    <div style={{ background: "#fff", padding: "80px 120px" }}>
      <div
        style={{
          textAlign: "center",
          fontSize: 40,
          fontWeight: 800,
          color: "#111827",
          marginBottom: 60,
          letterSpacing: "-1px",
        }}
      >
        Tout ce dont vous avez besoin
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 32 }}>
        {[
          { icon: "🤖", t: "IA conversationnelle", d: "GPT-4 entraîné sur votre catalogue" },
          { icon: "📦", t: "Gestion des produits", d: "Recommandations personnalisées en temps réel" },
          { icon: "📊", t: "Analytics détaillés", d: "Suivez chaque conversation et conversion" },
        ].map((f) => (
          <div
            key={f.t}
            style={{
              background: "#f9fafb",
              borderRadius: 16,
              padding: "32px",
              border: "1px solid #e5e7eb",
            }}
          >
            <div style={{ fontSize: 36, marginBottom: 16 }}>{f.icon}</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 8 }}>{f.t}</div>
            <div style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6 }}>{f.d}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const WebsiteScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const fadeOut = interpolate(frame, [durationInFrames - 30, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Browser slides in from top
  const browserY = spring({ fps, frame, config: { damping: 22, stiffness: 160 }, from: -80, to: 0 });
  const browserOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // Scroll animation: starts at frame 60
  const maxScroll = 400;
  const scrollY = interpolate(frame, [60, 400], [0, maxScroll], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Chat widget appears at frame 420
  const widgetOpacity = interpolate(frame, [420, 460], [0, 1], { extrapolateRight: "clamp" });
  const widgetScale = spring({ fps, frame: Math.max(0, frame - 420), config: { damping: 20, stiffness: 200 }, from: 0.7, to: 1 });

  const urlText = "auraflowaii.fr";
  const urlChars = Math.floor(interpolate(frame, [0, 30], [0, urlText.length], { extrapolateRight: "clamp" }));

  return (
    <AbsoluteFill
      style={{
        background: C.darker,
        opacity: fadeOut,
      }}
    >
      {/* Label */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 14,
          color: "rgba(255,255,255,0.3)",
          letterSpacing: 3,
          textTransform: "uppercase",
          fontFamily: FONT.sans,
          opacity: browserOpacity,
        }}
      >
        Le site auraflowaii.fr
      </div>

      {/* Browser window */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 80,
          right: 80,
          bottom: 60,
          transform: `translateY(${browserY}px)`,
          opacity: browserOpacity,
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 40px 120px rgba(0,0,0,0.8)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        {/* Browser chrome */}
        <div
          style={{
            background: "#1e1e1e",
            height: 52,
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
            gap: 12,
            borderBottom: "1px solid #333",
          }}
        >
          <div style={{ display: "flex", gap: 6 }}>
            {["#ff5f56", "#ffbd2e", "#27c93f"].map((c) => (
              <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
            ))}
          </div>
          <div
            style={{
              flex: 1,
              maxWidth: 480,
              margin: "0 auto",
              background: "#2d2d2d",
              borderRadius: 8,
              height: 30,
              display: "flex",
              alignItems: "center",
              padding: "0 12px",
              gap: 6,
            }}
          >
            <span style={{ fontSize: 11, color: "#4ade80" }}>🔒</span>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", fontFamily: FONT.sans }}>
              {urlText.slice(0, urlChars)}
            </span>
          </div>
        </div>

        {/* Page content */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            height: "calc(100% - 52px)",
            background: "#fff",
          }}
        >
          <MockPage scrollY={scrollY} />

          {/* Chat widget overlay */}
          <div
            style={{
              position: "absolute",
              bottom: 24,
              right: 24,
              opacity: widgetOpacity,
              transform: `scale(${widgetScale})`,
              transformOrigin: "bottom right",
            }}
          >
            <div
              style={{
                background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                width: 56,
                height: 56,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                boxShadow: "0 8px 24px rgba(124,58,237,0.5)",
                cursor: "pointer",
              }}
            >
              💬
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
