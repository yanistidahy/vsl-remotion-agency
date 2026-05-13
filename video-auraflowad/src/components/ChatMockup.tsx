import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT } from "../constants";

export const ChatMockup: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sc = spring({ fps, frame, config: { damping: 16, stiffness: 500 }, from: 0, to: 1 });

  const msgs = [
    { role: "bot", text: "Bonjour ! Quel soin recherchez-vous ? 👋" },
    { role: "user", text: "cheveux secs et frisés" },
    { role: "bot", text: "Huile de Baobab Bio — hydrate en profondeur 🌿" },
  ];

  return (
    <div style={{
      transform: `scale(${sc})`,
      width: 340, background: "#fff", borderRadius: 20,
      boxShadow: "0 20px 80px rgba(0,0,0,0.4)", overflow: "hidden",
      fontFamily: FONT.sans,
    }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(90deg, ${C.purple}, #4f46e5)`, padding: "14px 18px", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80" }} />
        <span style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>AuraFlow AI</span>
      </div>
      {/* Messages */}
      <div style={{ padding: "14px 12px", display: "flex", flexDirection: "column", gap: 10, background: "#f8f8fb" }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{
              background: m.role === "user" ? `linear-gradient(135deg, ${C.purple}, #4f46e5)` : "#fff",
              color: m.role === "user" ? "#fff" : "#111",
              padding: "9px 14px", borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
              fontSize: 13, fontWeight: 500, maxWidth: 220, boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}>
              {m.text}
            </div>
          </div>
        ))}
        {/* Product mini */}
        <div style={{ background: "#fff", borderRadius: 12, padding: "10px 12px", border: `1px solid ${C.purple}33`, display: "flex", alignItems: "center", gap: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <div style={{ width: 48, height: 56, background: `linear-gradient(135deg, #f3e8ff, #e0d9ff)`, borderRadius: 8, flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#111" }}>Huile Baobab Bio</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: C.purple, marginTop: 2 }}>24,65€</div>
            <div style={{ background: C.purple, color: "#fff", borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700, marginTop: 5, display: "inline-block" }}>Acheter →</div>
          </div>
        </div>
      </div>
    </div>
  );
};
