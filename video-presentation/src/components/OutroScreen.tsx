import React from "react";
import { interpolate, spring } from "remotion";

const PRIMARY = "#7c3aed";
const GRADIENT = "linear-gradient(135deg, #7c3aed, #4f46e5)";

type Props = {
  frame: number;
  fps: number;
};

export const OutroScreen: React.FC<Props> = ({ frame, fps }) => {
  const bgOpacity = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: "clamp" });

  const logoScale = spring({
    fps,
    frame: Math.max(0, frame - 20),
    config: { damping: 22, stiffness: 320 },
    from: 0.4,
    to: 1,
  });
  const logoOpacity = interpolate(frame, [20, 50], [0, 1], { extrapolateRight: "clamp" });

  // Pulsing glow
  const glow = interpolate((frame * 2) % 90, [0, 45, 90], [0, 18, 0]);

  const tag1Opacity = interpolate(frame, [65, 95], [0, 1], { extrapolateRight: "clamp" });
  const tag1Y = interpolate(frame, [65, 95], [18, 0], { extrapolateRight: "clamp" });

  const tag2Opacity = interpolate(frame, [95, 125], [0, 1], { extrapolateRight: "clamp" });
  const tag2Y = interpolate(frame, [95, 125], [18, 0], { extrapolateRight: "clamp" });

  const endFade = interpolate(frame, [155, 180], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Particle ring
  const particles = Array.from({ length: 24 }, (_, i) => {
    const angle = (i / 24) * Math.PI * 2;
    const r = 220 + (i % 3) * 70;
    return {
      x: Math.cos(angle) * r,
      y: Math.sin(angle) * r,
      opacity: interpolate((frame + i * 4) % 80, [0, 40, 80], [0.08, 0.35, 0.08]),
      size: 2 + (i % 4),
    };
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(135deg, #1e0540 0%, #0a0010 60%, #1e0540 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: bgOpacity * endFade,
        zIndex: 40,
      }}
    >
      {/* Particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: PRIMARY,
            transform: `translate(calc(-50% + ${p.x}px), calc(-50% + ${p.y}px))`,
            opacity: p.opacity * logoOpacity,
          }}
        />
      ))}

      {/* Outer glow ring */}
      <div
        style={{
          position: "absolute",
          width: 340 + glow * 2,
          height: 340 + glow * 2,
          borderRadius: "50%",
          background: `radial-gradient(ellipse, ${PRIMARY}25 0%, transparent 70%)`,
          filter: "blur(30px)",
          opacity: logoOpacity,
        }}
      />

      {/* Center content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 28,
          transform: `scale(${logoScale})`,
          opacity: logoOpacity,
        }}
      >
        {/* Logo avatar */}
        <div
          style={{
            width: 130,
            height: 130,
            borderRadius: "50%",
            background: GRADIENT,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Helvetica Neue', sans-serif",
            fontWeight: 900,
            fontSize: 68,
            color: "#fff",
            boxShadow: `0 0 ${24 + glow}px ${PRIMARY}90, 0 0 80px ${PRIMARY}40`,
            border: "3px solid rgba(255,255,255,0.18)",
          }}
        >
          A
        </div>

        {/* Brand name */}
        <div
          style={{
            fontFamily: "'Helvetica Neue', sans-serif",
            fontSize: 58,
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "-1px",
            textAlign: "center",
          }}
        >
          Aura
          <span
            style={{
              background: GRADIENT,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Flow
          </span>
          <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 32, fontWeight: 400 }}>
            {" "}AI
          </span>
        </div>

        {/* Tagline 1 */}
        <div
          style={{
            opacity: tag1Opacity,
            transform: `translateY(${tag1Y}px)`,
            fontFamily: "'Helvetica Neue', sans-serif",
            fontSize: 24,
            color: "rgba(255,255,255,0.65)",
            textAlign: "center",
            fontWeight: 300,
            letterSpacing: 0.5,
          }}
        >
          Votre assistant IA disponible{" "}
          <span style={{ color: "#fff", fontWeight: 700 }}>24h/24</span>
        </div>

        {/* Tagline 2 */}
        <div
          style={{
            opacity: tag2Opacity,
            transform: `translateY(${tag2Y}px)`,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              height: 1,
              width: 70,
              background: `linear-gradient(90deg, transparent, ${PRIMARY})`,
            }}
          />
          <span
            style={{
              fontFamily: "'Helvetica Neue', sans-serif",
              fontSize: 15,
              color: PRIMARY,
              fontWeight: 600,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            Powered by AuraFlow AI
          </span>
          <div
            style={{
              height: 1,
              width: 70,
              background: `linear-gradient(90deg, ${PRIMARY}, transparent)`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
