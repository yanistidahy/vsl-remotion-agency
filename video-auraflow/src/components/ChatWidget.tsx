import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { ProductCard } from './ProductCard';

interface ChatMessage {
  role: 'bot' | 'user';
  text: string;
  showAt: number;
  hasProduct?: boolean;
}

const MESSAGES: ChatMessage[] = [
  {
    role: 'bot',
    text: 'Bonjour ! Quel soin recherchez-vous ? 👋',
    showAt: 0,
  },
  {
    role: 'user',
    text: "j'ai les cheveux secs et frisés",
    showAt: 60,
  },
  {
    role: 'bot',
    text: "Pour vos **cheveux secs et frisés**, notre **Huile de Baobab Bio** est parfaite.\n\nElle **hydrate en profondeur** et **réduit les frisottis** naturellement.",
    showAt: 120,
    hasProduct: true,
  },
];

const RenderBoldText: React.FC<{ text: string; color: string }> = ({
  text,
  color,
}) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={i} style={{ fontWeight: 800 }}>
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
};

export const ChatWidget: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const openProgress = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 200 },
  });

  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        transform: `scale(${openProgress}) translateY(${interpolate(
          openProgress,
          [0, 1],
          [60, 0]
        )}px)`,
        opacity,
        background: '#ffffff',
        borderRadius: 24,
        overflow: 'hidden',
        width: 420,
        boxShadow:
          '0 40px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(124,58,237,0.15)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        transformOrigin: 'bottom right',
      }}
    >
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
          padding: '18px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 22,
            border: '2px solid rgba(255,255,255,0.3)',
          }}
        >
          🤖
        </div>
        <div>
          <div
            style={{ color: '#fff', fontWeight: 700, fontSize: 17, lineHeight: 1.2 }}
          >
            AuraFlow AI
          </div>
          <div
            style={{
              color: 'rgba(255,255,255,0.75)',
              fontSize: 13,
              display: 'flex',
              alignItems: 'center',
              gap: 5,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#4ade80',
                display: 'inline-block',
              }}
            />
            En ligne
          </div>
        </div>
        <div style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.7)', fontSize: 20 }}>
          ✕
        </div>
      </div>

      {/* Messages */}
      <div
        style={{
          padding: '20px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          background: '#f8f9ff',
          minHeight: 300,
        }}
      >
        {MESSAGES.map((msg, idx) => {
          const localFrame = frame - msg.showAt;
          if (localFrame < 0) return null;

          const msgOpacity = interpolate(localFrame, [0, 12], [0, 1], {
            extrapolateRight: 'clamp',
          });
          const msgY = interpolate(localFrame, [0, 12], [20, 0], {
            extrapolateRight: 'clamp',
          });

          const isBot = msg.role === 'bot';

          return (
            <div key={idx} style={{ opacity: msgOpacity, transform: `translateY(${msgY}px)` }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: isBot ? 'flex-start' : 'flex-end',
                  alignItems: 'flex-end',
                  gap: 8,
                }}
              >
                {isBot && (
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 16,
                      flexShrink: 0,
                    }}
                  >
                    🤖
                  </div>
                )}
                <div
                  style={{
                    maxWidth: '78%',
                    padding: '12px 16px',
                    borderRadius: isBot ? '18px 18px 18px 4px' : '18px 18px 4px 18px',
                    background: isBot
                      ? '#ffffff'
                      : 'linear-gradient(135deg, #7c3aed, #4f46e5)',
                    color: isBot ? '#18181b' : '#ffffff',
                    fontSize: 14,
                    lineHeight: 1.6,
                    boxShadow: isBot ? '0 2px 12px rgba(0,0,0,0.08)' : 'none',
                    whiteSpace: 'pre-line',
                  }}
                >
                  <RenderBoldText text={msg.text} color={isBot ? '#7c3aed' : '#fff'} />
                </div>
              </div>
              {msg.hasProduct && localFrame > 40 && (
                <div
                  style={{
                    marginTop: 12,
                    marginLeft: 40,
                    transform: 'scale(0.72)',
                    transformOrigin: 'top left',
                  }}
                >
                  <ProductCard
                    name="Huile de Baobab Bio 250ml"
                    price="24.65€"
                    description="Hydratation intense pour cheveux secs et frisés"
                    delay={0}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div
        style={{
          padding: '12px 16px',
          background: '#ffffff',
          borderTop: '1px solid #f0f0f5',
          display: 'flex',
          gap: 10,
          alignItems: 'center',
        }}
      >
        <div
          style={{
            flex: 1,
            background: '#f3f4f6',
            borderRadius: 24,
            padding: '10px 16px',
            fontSize: 14,
            color: '#9ca3af',
          }}
        >
          Tapez votre message...
        </div>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
          }}
        >
          ➤
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          padding: '8px 16px',
          background: '#fafafa',
          borderTop: '1px solid #f0f0f5',
          textAlign: 'center',
          fontSize: 11,
          color: '#a1a1aa',
        }}
      >
        Powered by{' '}
        <span style={{ color: '#7c3aed', fontWeight: 700 }}>AuraFlow AI</span>
      </div>
    </div>
  );
};
