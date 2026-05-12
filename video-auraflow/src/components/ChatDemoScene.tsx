import React from "react";
import { AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT } from "../constants";
import { ChatWidget } from "./ChatWidget";
import { KeyboardTyping } from "./KeyboardTyping";

const TYPING_TEXT = "jai les cheveux secs et frises";
const FPC = 8; // frames per character

const BOT_TEXT =
  "Pour vos **cheveux secs et frisés**, notre **Huile de Baobab Bio** est parfaite.\n\nElle **hydrate en profondeur** et **réduit les frisottis** naturellement. ✨";

// Timing constants (local frames)
const WIDGET_IN = 20;
const KEYBOARD_IN = 60;
const TYPE_START = 80;
const TYPE_END = TYPE_START + TYPING_TEXT.length * FPC; // 80 + 240 = 320
const ENTER_F = TYPE_END + 20; // 340
const USER_MSG_F = ENTER_F + 5; // 345
const BOT_TYPING_START = USER_MSG_F + 10; // 355
const BOT_TYPING_END = BOT_TYPING_START + 50; // 405
const BOT_MSG_F = BOT_TYPING_END; // 405
const PRODUCT_F = BOT_MSG_F + 50; // 455

export const ChatDemoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const fadeOut = interpolate(frame, [durationInFrames - 30, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const bgOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  // Slide-in progress for chat widget
  const widgetProgress = interpolate(frame, [WIDGET_IN, WIDGET_IN + 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Keyboard progress
  const keyboardProgress = interpolate(frame, [KEYBOARD_IN, KEYBOARD_IN + 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Input text
  const charCount = Math.floor(
    interpolate(frame, [TYPE_START, TYPE_END], [0, TYPING_TEXT.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const inputText = frame >= USER_MSG_F ? "" : TYPING_TEXT.slice(0, charCount);

  // Active key
  function getActiveKey(): string | null {
    if (frame < TYPE_START || frame >= ENTER_F + 5) return null;
    if (frame >= ENTER_F && frame < ENTER_F + 5) return "ENTER";
    const charIdx = Math.floor((frame - TYPE_START) / FPC);
    if (charIdx < 0 || charIdx >= TYPING_TEXT.length) return null;
    const ch = TYPING_TEXT[charIdx];
    if (ch === " ") return "SPACE";
    return ch.toUpperCase();
  }

  // Messages
  const messages: Array<{ role: "user" | "bot"; text: string; frame: number }> = [];
  if (frame >= USER_MSG_F) {
    messages.push({ role: "user", text: TYPING_TEXT, frame: USER_MSG_F });
  }
  if (frame >= BOT_MSG_F) {
    messages.push({ role: "bot", text: BOT_TEXT, frame: BOT_MSG_F });
  }

  const showTyping = frame >= BOT_TYPING_START && frame < BOT_TYPING_END;
  const showProduct = frame >= PRODUCT_F;

  // Per-keystroke audio
  const keyAudios: React.ReactNode[] = [];
  for (let i = 0; i < TYPING_TEXT.length; i++) {
    const pressF = TYPE_START + i * FPC;
    if (frame >= pressF && frame < pressF + 5) {
      keyAudios.push(
        <Audio key={`k-${i}`} src={staticFile("click.wav")} volume={0.4} />
      );
    }
  }
  if (frame >= ENTER_F && frame < ENTER_F + 5) {
    keyAudios.push(
      <Audio key="enter" src={staticFile("click.wav")} volume={0.55} />
    );
  }
  if (frame >= USER_MSG_F && frame < USER_MSG_F + 6) {
    keyAudios.push(
      <Audio key="notif" src={staticFile("notification.wav")} volume={0.5} />
    );
  }

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse 80% 70% at 30% 50%, #0e0520 0%, ${C.darker} 65%)`,
        opacity: fadeOut,
      }}
    >
      {keyAudios}

      {/* Left: context text */}
      <div
        style={{
          position: "absolute",
          left: 100,
          top: "50%",
          transform: "translateY(-50%)",
          width: 460,
          opacity: bgOpacity,
          fontFamily: FONT.sans,
        }}
      >
        <div
          style={{
            fontSize: 13,
            color: C.accent,
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          Démo live
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 800,
            color: "#fff",
            lineHeight: 1.15,
            letterSpacing: "-1.5px",
            marginBottom: 24,
          }}
        >
          Un client pose une question…
        </div>
        <div
          style={{
            fontSize: 18,
            color: "rgba(255,255,255,0.45)",
            lineHeight: 1.6,
          }}
        >
          AuraFlow comprend le besoin et recommande le produit parfait — instantanément.
        </div>

        {showProduct && (
          <div
            style={{
              marginTop: 36,
              display: "flex",
              alignItems: "center",
              gap: 10,
              opacity: interpolate(frame, [PRODUCT_F, PRODUCT_F + 20], [0, 1], { extrapolateRight: "clamp" }),
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#4ade80",
              }}
            />
            <span style={{ fontSize: 15, color: "#4ade80", fontWeight: 600 }}>
              Recommandation envoyée en 0.8s
            </span>
          </div>
        )}
      </div>

      {/* Chat widget on the right */}
      <ChatWidget
        messages={messages}
        inputText={inputText}
        showTypingIndicator={showTyping}
        showProduct={showProduct}
        productFrame={PRODUCT_F}
        slideProgress={widgetProgress}
      />

      {/* Keyboard at bottom */}
      <KeyboardTyping activeKey={getActiveKey()} slideProgress={keyboardProgress} />
    </AbsoluteFill>
  );
};
