import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ShopifyStoreFullscreen } from "../components/ShopifyStoreFullscreen";
import { ChatWidget, ChatMessage } from "../components/ChatWidget";
import { KeyboardComponent } from "../components/KeyboardComponent";
import { CursorDot } from "../components/CursorDot";
import { OutroScreen } from "../components/OutroScreen";

// ─────────────────────────────────────────────────
// TIMING CONSTANTS  (all in global frames @ 60fps)
// ─────────────────────────────────────────────────
const S1_END = 300; // 5s  — Shopify store + fast scroll
const S2_END = 420; // 7s  — Chat bubble pops in
const S3_END = 600; // 10s — Chat opens, welcome message
const S4_END = 1320; // 22s — Typing / conversation
const S5_END = 1920; // 32s — Product card recommendation
// Outro: 1920–2100

// Scroll animation
const SCROLL_START = 30;
const SCROLL_END = 180;
const SCROLL_MAX = 510;

// Chat bubble
const BUBBLE_IN = S1_END; // 300

// Cursor + click
const CURSOR_VIS = S2_END; // 420
const CURSOR_ARRIVE = CURSOR_VIS + 28; // 448
const CLICK_F = CURSOR_ARRIVE; // 448
const CHAT_OPEN_F = CLICK_F + 14; // 462

// Welcome message typewriter
const WELCOME_TEXT = "Bonjour ! Quel soin recherchez-vous ?";
const WELCOME_START = CHAT_OPEN_F + 28; // 490
const WELCOME_CHARS_PER_FRAME = 1.8;
const WELCOME_FRAMES = Math.ceil(WELCOME_TEXT.length / WELCOME_CHARS_PER_FRAME); // ~21

// Keyboard
const KB_IN_START = S3_END; // 600
const KB_IN_FRAMES = 22;

// Typing config
const TEXT1 = "jai les cheveux frises";
const TEXT2 = "demelage et brillance";
const FPC = 8; // frames per character (~7.5 chars/sec at 60fps)

const T1_START = KB_IN_START + KB_IN_FRAMES + 22; // 644
const T1_END = T1_START + TEXT1.length * FPC; // 644+176=820

const ENTER1 = T1_END + 22; // 842
const MSG1_F = ENTER1 + 5; // 847

const BOT1_IND_START = MSG1_F + 8; // 855
const BOT1_IND_END = BOT1_IND_START + 50; // 905  (~0.83s)

const BOT1_TEXT =
  "Pour les **cheveux frisés**, j'ai exactement ce qu'il vous faut.\n\nQuel est votre besoin principal ?";
const BOT1_START = BOT1_IND_END; // 905
const BOT1_CPF = 2; // chars per frame
const BOT1_END = BOT1_START + Math.ceil(BOT1_TEXT.length / BOT1_CPF); // 905+50=955

const PAUSE_END = BOT1_END + 55; // 1010

const T2_START = PAUSE_END; // 1010
const T2_END = T2_START + TEXT2.length * FPC; // 1010+168=1178

const ENTER2 = T2_END + 22; // 1200
const MSG2_F = ENTER2 + 5; // 1205

const KB_OUT_START = ENTER2 + 8; // 1208
const KB_OUT_END = KB_OUT_START + 22; // 1230

// Scene 5 — product recommendation
const BOT2_IND_START = MSG2_F + 60; // 1265 (give a beat before S5)
const BOT2_IND_END = BOT2_IND_START + 50; // 1315
const BOT2_TEXT =
  "Notre **N°03 DÉMÊLE** est parfait !\n\nIl **démêle sans peser** et donne de la brillance naturellement.";
const BOT2_START = BOT2_IND_END; // 1315 (just at S4_END boundary)
const BOT2_CPF = 1.8;
const BOT2_END = BOT2_START + Math.ceil(BOT2_TEXT.length / BOT2_CPF); // 1315+60=1375
const PRODUCT_F = BOT2_END + 18; // 1393

// ─────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────

function getActiveKey(f: number): string | null {
  if (f >= T1_START && f < T1_END) {
    const idx = Math.floor((f - T1_START) / FPC);
    if (idx < TEXT1.length) {
      const ch = TEXT1[idx];
      return ch === " " ? "SPACE" : ch.toUpperCase();
    }
  }
  if (f >= ENTER1 && f < ENTER1 + 9) return "ENTER";
  if (f >= T2_START && f < T2_END) {
    const idx = Math.floor((f - T2_START) / FPC);
    if (idx < TEXT2.length) {
      const ch = TEXT2[idx];
      return ch === " " ? "SPACE" : ch.toUpperCase();
    }
  }
  if (f >= ENTER2 && f < ENTER2 + 9) return "ENTER";
  return null;
}

function getInputText(f: number): string {
  if (f >= T1_START && f < MSG1_F) {
    if (f >= T1_END) return TEXT1;
    const chars = Math.floor((f - T1_START) / FPC) + 1;
    return TEXT1.slice(0, chars);
  }
  if (f >= T2_START && f < MSG2_F) {
    if (f >= T2_END) return TEXT2;
    const chars = Math.floor((f - T2_START) / FPC) + 1;
    return TEXT2.slice(0, chars);
  }
  return "";
}

function getMessages(f: number, welcomeText: string): ChatMessage[] {
  const msgs: ChatMessage[] = [];

  // Welcome (typewriter during S3, full after)
  if (f >= WELCOME_START) {
    const len =
      f >= WELCOME_START + WELCOME_FRAMES
        ? WELCOME_TEXT.length
        : Math.floor((f - WELCOME_START) * WELCOME_CHARS_PER_FRAME);
    msgs.push({ role: "bot", text: WELCOME_TEXT.slice(0, len) });
  }

  // User message 1
  if (f >= MSG1_F) msgs.push({ role: "user", text: "j'ai les cheveux frisés" });

  // Bot response 1
  if (f >= BOT1_START) {
    const len =
      f >= BOT1_END
        ? BOT1_TEXT.length
        : Math.floor((f - BOT1_START) * BOT1_CPF);
    msgs.push({ role: "bot", text: BOT1_TEXT.slice(0, len) });
  }

  // User message 2
  if (f >= MSG2_F) msgs.push({ role: "user", text: "démêlage et brillance" });

  // Bot response 2
  if (f >= BOT2_START) {
    const len =
      f >= BOT2_END
        ? BOT2_TEXT.length
        : Math.floor((f - BOT2_START) * BOT2_CPF);
    msgs.push({ role: "bot", text: BOT2_TEXT.slice(0, len) });
  }

  return msgs;
}

// ─────────────────────────────────────────────────
// MAIN COMPOSITION
// ─────────────────────────────────────────────────
export const MainVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Scroll ──────────────────────────────────────
  const scrollY = interpolate(frame, [SCROLL_START, SCROLL_END], [0, SCROLL_MAX], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Chat bubble ─────────────────────────────────
  const bubbleScale = spring({
    fps,
    frame: Math.max(0, frame - BUBBLE_IN),
    config: { damping: 25, stiffness: 320 },
    from: 0,
    to: 1,
  });
  const showBubble = frame >= BUBBLE_IN && frame < CHAT_OPEN_F;

  // ── Cursor ──────────────────────────────────────
  const cursorVisible = frame >= CURSOR_VIS && frame < CHAT_OPEN_F + 30;
  const cursorX = interpolate(frame, [CURSOR_VIS, CURSOR_ARRIVE], [900, 1866], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cursorY = interpolate(frame, [CURSOR_VIS, CURSOR_ARRIVE], [540, 1016], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const clicking = frame >= CLICK_F && frame < CLICK_F + 12;

  // ── Chat window ──────────────────────────────────
  const chatSlide = spring({
    fps,
    frame: Math.max(0, frame - CHAT_OPEN_F),
    config: { damping: 26, stiffness: 340 },
    from: 0,
    to: 1,
  });
  const chatVisible = frame >= CHAT_OPEN_F;

  // ── Keyboard ────────────────────────────────────
  const kbInProgress = spring({
    fps,
    frame: Math.max(0, frame - KB_IN_START),
    config: { damping: 22, stiffness: 300 },
    from: 0,
    to: 1,
  });
  const kbOutProgress = spring({
    fps,
    frame: Math.max(0, frame - KB_OUT_START),
    config: { damping: 22, stiffness: 300 },
    from: 0,
    to: 1,
  });
  const kbSlide =
    frame >= KB_OUT_START
      ? interpolate(kbOutProgress, [0, 1], [1, 0])
      : frame >= KB_IN_START
      ? kbInProgress
      : 0;
  const keyboardVisible = kbSlide > 0.05;

  // ── Typing state ─────────────────────────────────
  const activeKey = getActiveKey(frame);
  const inputText = getInputText(frame);
  const messages = getMessages(frame, WELCOME_TEXT);
  const showTypingIndicator =
    (frame >= BOT1_IND_START && frame < BOT1_IND_END) ||
    (frame >= BOT2_IND_START && frame < BOT2_IND_END);

  // Blinking cursor in input: blink at 2Hz when idle
  const isTypingNow =
    (frame >= T1_START && frame < T1_END) ||
    (frame >= T2_START && frame < T2_END);
  const cursorBlink =
    chatVisible &&
    (isTypingNow || Math.floor(frame / 30) % 2 === 0) &&
    frame < MSG2_F + 10;

  // ── Product card ─────────────────────────────────
  const productScale = spring({
    fps,
    frame: Math.max(0, frame - PRODUCT_F),
    config: { damping: 22, stiffness: 320 },
    from: 0,
    to: 1,
  });
  const showProduct = frame >= PRODUCT_F && frame < S5_END + 30;

  // ── Outro ────────────────────────────────────────
  const showOutro = frame >= S5_END;
  const outroFrame = frame - S5_END;

  // ── Ambient overlay fade (outro) ─────────────────
  const mainFade =
    frame >= S5_END
      ? interpolate(frame, [S5_END, S5_END + 20], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 1;

  return (
    <AbsoluteFill style={{ background: "#fff", overflow: "hidden" }}>

      {/* ── Ambient music ─────────────────────── */}
      <Audio src={staticFile("ambient.wav")} volume={0.18} />

      {/* ── Notification on send ──────────────── */}
      {frame >= ENTER1 && frame < ENTER1 + 25 && (
        <Audio src={staticFile("notification.wav")} volume={0.45} />
      )}
      {frame >= ENTER2 && frame < ENTER2 + 25 && (
        <Audio src={staticFile("notification.wav")} volume={0.45} />
      )}

      {/* ── Per-keystroke audio ───────────────── */}
      {TEXT1.split("").map((_, i) => {
        const pressF = T1_START + i * FPC;
        if (frame >= pressF && frame < pressF + 5) {
          return (
            <Audio
              key={`k1-${i}`}
              src={staticFile("keyboard-click.wav")}
              volume={0.55}
            />
          );
        }
        return null;
      })}
      {TEXT2.split("").map((_, i) => {
        const pressF = T2_START + i * FPC;
        if (frame >= pressF && frame < pressF + 5) {
          return (
            <Audio
              key={`k2-${i}`}
              src={staticFile("keyboard-click.wav")}
              volume={0.55}
            />
          );
        }
        return null;
      })}

      {/* ── Shopify store (always visible) ───── */}
      <div style={{ opacity: mainFade }}>
        <ShopifyStoreFullscreen scrollY={scrollY} />
      </div>

      {/* ── Chat bubble ───────────────────────── */}
      {showBubble && (
        <div
          style={{
            position: "absolute",
            right: 44,
            bottom: 44,
            transform: `scale(${bubbleScale})`,
            transformOrigin: "bottom right",
            opacity: mainFade,
            zIndex: 20,
          }}
        >
          <div style={{ position: "relative", display: "inline-flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>
            {/* Tooltip */}
            {frame >= BUBBLE_IN + 35 && (
              <div
                style={{
                  background: "#fff",
                  borderRadius: 12,
                  padding: "9px 16px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
                  fontSize: 16,
                  color: "#1a1a1a",
                  fontFamily: "'Helvetica Neue', sans-serif",
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                  border: "1px solid #f0f0f0",
                  opacity: interpolate(frame, [BUBBLE_IN + 35, BUBBLE_IN + 55], [0, 1], { extrapolateRight: "clamp" }),
                }}
              >
                Un conseil ? 💬
              </div>
            )}
            {/* Bubble */}
            <div style={{ position: "relative" }}>
              {/* Pulse */}
              {frame < BUBBLE_IN + 70 && (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: `translate(-50%, -50%) scale(${interpolate((frame - BUBBLE_IN) % 60, [0, 60], [1, 2])})`,
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: "#7c3aed",
                    opacity: interpolate((frame - BUBBLE_IN) % 60, [0, 30, 60], [0.4, 0, 0]),
                  }}
                />
              )}
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 32,
                  boxShadow: "0 10px 32px rgba(124,58,237,0.45)",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                💬
              </div>
              {/* Badge */}
              <div
                style={{
                  position: "absolute",
                  top: -4,
                  right: -4,
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: "#ef4444",
                  border: "2.5px solid #fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  color: "#fff",
                  fontWeight: 700,
                  zIndex: 3,
                }}
              >
                1
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Cursor ────────────────────────────── */}
      <CursorDot x={cursorX} y={cursorY} visible={cursorVisible} clicking={clicking} />

      {/* ── Chat window ───────────────────────── */}
      {chatVisible && (
        <div style={{ opacity: mainFade }}>
          <ChatWidget
            slideProgress={chatSlide}
            messages={messages}
            inputText={inputText}
            showTypingIndicator={showTypingIndicator}
            cursorBlink={cursorBlink}
            keyboardVisible={keyboardVisible}
            frame={frame}
          />
        </div>
      )}

      {/* ── Keyboard ──────────────────────────── */}
      {frame >= KB_IN_START && (
        <div style={{ opacity: mainFade }}>
          <KeyboardComponent activeKey={activeKey} slideProgress={kbSlide} />
        </div>
      )}

      {/* ── Product card ──────────────────────── */}
      {showProduct && (
        <div
          style={{
            position: "absolute",
            left: 60,
            bottom: keyboardVisible ? 300 : 50,
            transform: `scale(${productScale})`,
            transformOrigin: "bottom left",
            opacity: productScale * mainFade,
            zIndex: 25,
          }}
        >
          <div
            style={{
              width: 300,
              background: "#fff",
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
              border: "1px solid #f0f0f0",
              fontFamily: "'Helvetica Neue', Arial, sans-serif",
            }}
          >
            {/* Product image */}
            <div
              style={{
                height: 180,
                background: "#f7f7f7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              {/* Use local SVG since CDN is blocked */}
              <img
                src={staticFile("product3.svg")}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                alt="N°03 DÉMÊLE"
              />
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  background: "#4a9b8e",
                  color: "#fff",
                  fontSize: 10,
                  padding: "4px 10px",
                  borderRadius: 4,
                  fontWeight: 700,
                  letterSpacing: 0.5,
                  textTransform: "uppercase",
                }}
              >
                Bestseller
              </div>
            </div>
            {/* Info */}
            <div style={{ padding: "16px 18px" }}>
              <p
                style={{
                  fontSize: 10,
                  color: "#4a9b8e",
                  fontWeight: 700,
                  margin: "0 0 4px",
                  textTransform: "uppercase",
                  letterSpacing: 1.5,
                }}
              >
                Après-shampooing
              </p>
              <p style={{ fontSize: 17, fontWeight: 700, color: "#1a1a1a", margin: "0 0 4px" }}>
                N°03 DÉMÊLE
              </p>
              <p style={{ fontSize: 13, color: "#666", margin: "0 0 14px", lineHeight: 1.4 }}>
                Démêle sans peser · brillance naturelle
              </p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 20, fontWeight: 700, color: "#4a9b8e" }}>31,00 €</span>
                <button
                  style={{
                    background: "#1a1a1a",
                    color: "#fff",
                    border: "none",
                    padding: "9px 16px",
                    borderRadius: 6,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Voir le produit →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Outro overlay ─────────────────────── */}
      {showOutro && <OutroScreen frame={outroFrame} fps={fps} />}
    </AbsoluteFill>
  );
};
