import React from "react";
import {
  AbsoluteFill, Audio, interpolate, staticFile, spring, useCurrentFrame, useVideoConfig,
} from "remotion";
import { C, FONT } from "../constants";
import { ChatWidget } from "./ChatWidget";
import { KeyboardTyping } from "./KeyboardTyping";

const TYPING_TEXT = "j'ai les cheveux secs et frisés";
const FPC = 4;
const CHARS = TYPING_TEXT.length; // 31

const BOT_MSG1_START = 30;
const USER_TYPE_START = 90;
const USER_TYPE_END = USER_TYPE_START + CHARS * FPC; // 214
const USER_SEND = USER_TYPE_END + 4;                  // 218
const BOT_TYPING_START = USER_SEND + 10;              // 228
const BOT_MSG2_START = 242;
const PRODUCT_START = 340;
const KEYBOARD_HIDE = USER_SEND + 18;                 // 236

const AZERTY_MAP: Record<string, string> = {
  a:"A",z:"Z",e:"E",r:"R",t:"T",y:"Y",u:"U",i:"I",o:"O",p:"P",
  q:"Q",s:"S",d:"D",f:"F",g:"G",h:"H",j:"J",k:"K",l:"L",m:"M",
  w:"W",x:"X",c:"C",v:"V",b:"B",n:"N",
  é:"E",è:"E",à:"A",ù:"U",ç:"C"," ":"SPACE","'":"APOS",
};

export const ChatDemoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Slide IN from right
  const slideIn = interpolate(frame, [0, 22], [1920, 0], { extrapolateRight: "clamp" });
  const fadeIn = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });
  // Slide OUT left
  const slideOut = interpolate(frame, [durationInFrames - 22, durationInFrames], [0, -1920], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [durationInFrames - 22, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  const panelOp = interpolate(frame, [15, 35], [0, 1], { extrapolateRight: "clamp" });
  const panelX = spring({ fps, frame: Math.max(0, frame - 15), config: { damping: 18, stiffness: 260, mass: 0.9 }, from: -40, to: 0 });

  const steps = [
    { icon: "👋", label: "Accueil personnalisé",      trigger: BOT_MSG1_START },
    { icon: "⌨️", label: "Analyse du besoin client",  trigger: USER_TYPE_START },
    { icon: "🎯", label: "Recommandation ciblée",     trigger: BOT_MSG2_START },
    { icon: "🛒", label: "Produit + achat direct",    trigger: PRODUCT_START },
  ];

  const charCount = Math.floor(
    interpolate(frame, [USER_TYPE_START, USER_TYPE_END], [0, CHARS], {
      extrapolateLeft: "clamp", extrapolateRight: "clamp",
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
    messages.push({ role: "bot", text: "Bonjour ! Quel soin recherchez-vous ? 👋", frame: BOT_MSG1_START });
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
        transform: `translateX(${frame < durationInFrames - 22 ? slideIn : slideOut}px)`,
        opacity: Math.min(fadeIn, fadeOut),
      }}
    >
      {audios}

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
          Démo en direct
        </div>
        <div
          style={{
            fontSize: 44,
            fontWeight: 900,
            color: "#fff",
            lineHeight: 1.12,
            letterSpacing: "-1.2px",
            marginBottom: 44,
          }}
        >
          Un conseiller IA{" "}
          <span
            style={{
              background: `linear-gradient(90deg, ${C.accent}, #c4b5fd)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            qui vend
          </span>
        </div>

        {/* Step indicators */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {steps.map((s, i) => {
            const active = frame >= s.trigger;
            const dotScale = active
              ? spring({ fps, frame: Math.max(0, frame - s.trigger), config: { damping: 14, stiffness: 300, mass: 0.6 }, from: 0.6, to: 1 })
              : 1;
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, opacity: active ? 1 : 0.3 }}>
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
                  {s.icon}{"  "}{s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

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
