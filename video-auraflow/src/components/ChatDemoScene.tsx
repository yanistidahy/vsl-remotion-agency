import React from 'react';
import {
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  AbsoluteFill,
} from 'remotion';
import { ChatWidget } from './ChatWidget';
import { KeyboardTyping } from './KeyboardTyping';

export const ChatDemoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const titleY = interpolate(frame, [0, 25], [-30, 0], {
    extrapolateRight: 'clamp',
  });

  const chatScale = spring({
    frame: Math.max(0, frame - 20),
    fps,
    config: { damping: 22, stiffness: 200 },
  });
  const chatOpacity = interpolate(frame, [20, 45], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const keyboardOpacity = interpolate(frame, [70, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const keyboardY = interpolate(frame, [70, 90], [60, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background:
          'radial-gradient(ellipse at 60% 40%, #1a0a3e 0%, #0a0a0f 65%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        gap: 80,
        padding: '0 100px',
      }}
    >
      {/* Left: title + description */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}
      >
        <div
          style={{
            transform: `translateY(${titleY}px)`,
            opacity: titleOpacity,
          }}
        >
          <div
            style={{
              fontSize: 16,
              color: 'rgba(255,255,255,0.4)',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              marginBottom: 12,
            }}
          >
            En action
          </div>
          <div
            style={{
              fontSize: 52,
              fontWeight: 900,
              color: '#ffffff',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              lineHeight: 1.1,
              letterSpacing: '-1px',
            }}
          >
            Votre IA
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #a78bfa, #818cf8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              conseille
            </span>
            <br />
            et vend
          </div>
          <div
            style={{
              marginTop: 20,
              fontSize: 20,
              color: 'rgba(255,255,255,0.55)',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              lineHeight: 1.6,
              maxWidth: 360,
            }}
          >
            Elle analyse la demande, recommande le bon produit et guide
            vers l'achat — instantanément.
          </div>
        </div>

        {/* Stats */}
        <div
          style={{
            opacity: interpolate(frame, [120, 160], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
            display: 'flex',
            gap: 32,
            marginTop: 16,
          }}
        >
          {[
            { val: '<2s', label: 'Temps de réponse' },
            { val: '24/7', label: 'Disponibilité' },
            { val: '+35%', label: 'Conversion' },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: 36,
                  fontWeight: 900,
                  color: '#a78bfa',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  lineHeight: 1,
                }}
              >
                {s.val}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.45)',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  marginTop: 4,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Chat widget + keyboard */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
        }}
      >
        <div
          style={{
            transform: `scale(${chatScale})`,
            opacity: chatOpacity,
            transformOrigin: 'center bottom',
          }}
        >
          <ChatWidget />
        </div>

        <div
          style={{
            transform: `translateY(${keyboardY}px)`,
            opacity: keyboardOpacity,
          }}
        >
          <KeyboardTyping startFrame={60} charsPerSecond={8} fps={fps} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
