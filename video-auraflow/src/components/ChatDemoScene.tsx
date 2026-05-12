import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  staticFile,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, FONT } from "../constants";
import { ChatWidget } from "./ChatWidget";
import { KeyboardTyping } from "./KeyboardTyping";

const SPRING = { damping: 16, stiffness: 280, mass: 0.8 };
const SPRING_TRANS = { damping: 22, stiffness: 350, mass: 0.7 };
const TRANS = 10;

const TYPING_TEXT = "j'ai les cheveux secs et frisés";
const FPC = 3; // frames per char (plus rapide)
const CHARS = TYPING_TEXT.length; // 31

const BOT_MSG1_START = 20;
const USER_TYPE_START = 60;
const USER_TYPE_END = USER_TYPE_START + CHARS * FPC; // 153
const USER_SEND = USER_TYPE_END + 4; // 157
const BOT_TYPING_START = USER_SEND + 8; // 165
const BOT_MSG2_START = 175;
const PRODUCT_START = 280;
const KEYBOARD_HIDE = USER_SEND + 15; // 172

const AZERTY_MAP: Record<string, string> = {
  a: "A",
  z: "Z",
  e: "E",
  r: "R",
  t: "T",
  y: "Y",
  u: "U",
  i: "I",
  o: "O",
  p: "P",
  q: "Q",
  s: "S",
  d: "D",
  f: "F",
  g: "G",
  h: "H",
  j: "J",
  k: "K",
  l: "L",
  m: "M",
  w: "W",
  x: "X",
  c: "C",
  v: "V",
  b: "B",
  n: "N",
  é: "E",
  è: "E",
  à: "A",
  ù: "U",
  ç: "C",
  " ": "SPACE",
  "'": "APOS",
};

export const ChatDemoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Slide IN from right
  const slideIn = interpolate(frame, [0, TRANS], [1920, 0], { extrapolateRight: "clamp" });
  const fadeIn = interpolate(frame, [0, TRANS], [0, 1], { extrapolateRight: "clamp" });
  // Slide OUT left
  const slideOut = interpolate(
    frame,
    [durationInFrames - TRANS, durationInFrames],
    [0, -1920],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const fadeOut = interpolate(
    frame,
    [durationInFrames - TRANS, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Left panel entrance
  const panelOp = interpolate(frame, [12, 28], [0, 1], { extrapolateRight: "clamp" });
  const panelX = spring({
    fps,
    frame: Math.max(0, frame - 12),
    config: SPRING,
    from: -50,
    to: 0,
  });

  // Headline words animate in one-by-one
  const headlineWords = ["Un", "conseiller", "IA", "qui", "vend"];
  const headlineStart = 16;

  const steps = [
    { icon: "👋", label: "Accueil personnalisé", trigger: BOT_MSG1_START },
    { icon: "⌨️", label: "Analyse du besoin client", trigger: USER_TYPE_START },
    { icon: "🎯", label: "Recommandation ciblée", trigger: BOT_MSG2_START },
    { icon: "🛒", label: "Produit + achat direct", trigger: PRODUCT_START },
  ];

  const charCount = Math.floor(
    interpolate(frame, [USER_TYPE_START, USER_TYPE_END], [0, CHARS], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const inputText = frame >= USER_SEND ? "" : TYPING_TEXT.slice(0, charCount);

  function getActiveKey(): string | null {
    if (frame >= USER_SEND) return null;
    if (frame >= USER_TYPE_END && frame < USER_SEND) return "ENTER";
    if (frame < USER_TYPE_START) return null;
    const idx = Math.floor((frame - USER_TYPE_START) / FPC);
    if (idx < 0 || idx >= CHARS) return null;
    const ch = TYPING_TEXT[idx];
    return AZERTY_MAP[ch.toLowerCase()] ?? ch.toUpperCase();
  }

  const keyboardProgress = (() => {
    if (frame < USER_TYPE_START) return 0;
    if (frame > KEYBOARD_HIDE) return Math.max(0, 1 - (frame - KEYBOARD_HIDE) / 14);
    return Math.min(1, (frame - USER_TYPE_START) / 14);
  })();

  const messages: Array<{ role: "user" | "bot"; text: string; frame: number }> = [];
  if (frame >= BOT_MSG1_START)
    messages.push({
      role: "bot",
      text: "Bonjour ! Quel soin recherchez-vous ? 👋",
      frame: BOT_MSG1_START,
    });
  if (frame >= USER_SEND)
    messages.push({ role: "user", text: TYPING_TEXT, frame: USER_SEND });
  if (frame >= BOT_MSG2_START)
    messages.push({
      role: "bot",
      text: "Pour vos **cheveux secs et frisés**,\nnotre **Huile de Baobab Bio** est parfaite.\nElle **hydrate en profondeur** et\n**réduit les frisottis** naturellement. 🌿",
      frame: BOT_MSG2_START,
    });

  const showTyping = frame >= BOT_TYPING_START && frame < BOT_MSG2_START;
  const showProduct = frame >= PRODUCT_START;

  const audios: React.ReactNode[] = [];
  for (let i = 0; i < CHARS; i++) {
    const pressF = USER_TYPE_START + i * FPC;
    if (frame >= pressF && frame < pressF + 4)
      audios.push(<Audio key={`k${i}`} src={staticFile("click.mp3")} volume={0.3} />);
  }
  if (frame >= USER_SEND && frame < USER_SEND + 5)
    audios.push(<Audio key="notif" src={staticFile("notification.mp3")} volume={0.45} />);

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse 80% 70% at 25% 50%, #0e0520 0%, ${C.dark} 60%)`,
        transform: `translateX(${frame < durationInFrames - TRANS ? slideIn : slideOut}px)`,
        opacity: Math.min(fadeIn, fadeOut),
      }}
    >
      {audios}

      {/* Blurred purple orb behind chat widget area */}
      <div
        style={{
          position: "absolute",
          right: "18%",
          top: "50%",
          transform: "translateY(-50%)",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(124,58,237,0.08) 0%, transparent 72%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: "24%",
          top: "20%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(79,70,229,0.07) 0%, transparent 72%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      {/* LEFT PANEL */}
      <div
        style={{
          position: "absolute",
          left: 100,
          top: "50%",
          transform: `translateY(-50%) translateX(${panelX}px)`,
          width: 500,
          opacity: panelOp,
          fontFamily: FONT.sans,
        }}
      >
        {/* "DÉMO EN DIRECT" label */}
        <div
          style={{
            fontSize: 13,
            color: C.accent,
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          DÉMO EN DIRECT
        </div>

        {/* Big headline word-by-word */}
        <div
          style={{
            fontSize: 44,
            fontWeight: 900,
            color: "#fff",
            lineHeight: 1.12,
            letterSpacing: "-1.2px",
            marginBottom: 44,
            display: "flex",
            flexWrap: "wrap",
            gap: "0 10px",
          }}
        >
          {headlineWords.map((word, i) => {
            const wStart = headlineStart + i * 4;
            const wOp = interpolate(frame, [wStart, wStart + 10], [0, 1], {
              extrapolateRight: "clamp",
              extrapolateLeft: "clamp",
            });
            const wY = spring({
              fps,
              frame: Math.max(0, frame - wStart),
              config: SPRING,
              from: 18,
              to: 0,
            });
            const isVend = word === "vend";
            return (
              <span
                key={i}
                style={{
                  opacity: wOp,
                  transform: `translateY(${wY}px)`,
                  display: "inline-block",
                  background: isVend
                    ? `linear-gradient(90deg, ${C.accent}, #c4b5fd)`
                    : undefined,
                  WebkitBackgroundClip: isVend ? "text" : undefined,
                  WebkitTextFillColor: isVend ? "transparent" : undefined,
                  color: isVend ? undefined : "#fff",
                }}
              >
                {word}
              </span>
            );
          })}
        </div>

        {/* Step indicators */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {steps.map((s, i) => {
            const active = frame >= s.trigger;
            const dotScale = active
              ? spring({
                  fps,
                  frame: Math.max(0, frame - s.trigger),
                  config: { damping: 14, stiffness: 300, mass: 0.6 },
                  from: 0.6,
                  to: 1,
                })
              : 1;
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  opacity: active ? 1 : 0.3,
                }}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: active ? C.primary : "rgba(255,255,255,0.2)",
                    boxShadow: active ? `0 0 10px ${C.primary}` : "none",
                    transform: `scale(${dotScale})`,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: 14,
                    color: active ? "#fff" : "rgba(255,255,255,0.35)",
                    fontWeight: active ? 600 : 400,
                  }}
                >
                  {s.icon}{"  "}
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chat widget glowing halo */}
      <div
        style={{
          position: "absolute",
          right: "14%",
          top: "50%",
          transform: "translateY(-50%)",
          width: 460,
          height: 560,
          borderRadius: 24,
          background: "rgba(124,58,237,0.08)",
          filter: "blur(30px)",
          pointerEvents: "none",
        }}
      />

      {/* CHAT WIDGET */}
      <ChatWidget
        messages={messages}
        inputText={inputText}
        showTypingIndicator={showTyping}
        showProduct={showProduct}
        productFrame={PRODUCT_START}
        startFrame={0}
      />

      {/* KEYBOARD OVERLAY */}
      <KeyboardTyping activeKey={getActiveKey()} slideProgress={keyboardProgress} />
    </AbsoluteFill>
  );
};
