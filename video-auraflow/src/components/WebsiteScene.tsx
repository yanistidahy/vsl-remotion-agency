import React from 'react';
import {
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  AbsoluteFill,
} from 'remotion';

const BrowserFrame: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div
    style={{
      background: '#1e1e2e',
      borderRadius: 16,
      overflow: 'hidden',
      boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
      border: '1px solid rgba(255,255,255,0.08)',
    }}
  >
    {/* Browser chrome */}
    <div
      style={{
        background: '#2a2a3d',
        padding: '14px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div style={{ display: 'flex', gap: 7 }}>
        {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
          <div
            key={c}
            style={{
              width: 13,
              height: 13,
              borderRadius: '50%',
              background: c,
            }}
          />
        ))}
      </div>
      <div
        style={{
          flex: 1,
          background: 'rgba(255,255,255,0.06)',
          borderRadius: 8,
          padding: '6px 14px',
          color: 'rgba(255,255,255,0.5)',
          fontSize: 14,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span style={{ color: '#4ade80', fontSize: 13 }}>🔒</span>
        auraflowaii.fr
      </div>
    </div>
    {children}
  </div>
);

const WebsiteMockup: React.FC<{ scrollProgress: number }> = ({
  scrollProgress,
}) => {
  const sections = [
    {
      label: 'HERO',
      bg: 'linear-gradient(135deg, #1a0a3e, #0d0d1a)',
      content: (
        <div
          style={{
            padding: '60px 60px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
          }}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
              borderRadius: '50%',
              width: 80,
              height: 80,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 40,
              fontWeight: 900,
              color: '#fff',
              fontFamily: 'system-ui',
              boxShadow: '0 0 40px rgba(124,58,237,0.5)',
            }}
          >
            A
          </div>
          <div
            style={{
              fontSize: 44,
              fontWeight: 900,
              color: '#fff',
              fontFamily: 'system-ui',
              letterSpacing: '-1px',
              textAlign: 'center',
            }}
          >
            <span style={{ color: '#a78bfa' }}>Aura</span>Flow AI
          </div>
          <div
            style={{
              fontSize: 20,
              color: 'rgba(255,255,255,0.7)',
              fontFamily: 'system-ui',
              textAlign: 'center',
            }}
          >
            L'assistant IA qui vend pour vous
          </div>
          <div
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
              color: '#fff',
              borderRadius: 12,
              padding: '14px 32px',
              fontSize: 18,
              fontWeight: 700,
              fontFamily: 'system-ui',
            }}
          >
            Démarrer gratuitement
          </div>
        </div>
      ),
    },
    {
      label: 'FEATURES',
      bg: '#0f0f1a',
      content: (
        <div
          style={{
            padding: '40px 40px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: '#fff',
              fontFamily: 'system-ui',
              textAlign: 'center',
              marginBottom: 8,
            }}
          >
            Fonctionnalités
          </div>
          {[
            { icon: '🤖', title: 'IA Conversationnelle', desc: 'Répond comme un vrai conseiller' },
            { icon: '🧠', title: 'Mémoire Client', desc: 'Se souvient de chaque visiteur' },
            { icon: '📦', title: 'Catalogue Produits', desc: 'Connaît tous vos articles' },
          ].map((f) => (
            <div
              key={f.title}
              style={{
                background: 'rgba(124,58,237,0.12)',
                border: '1px solid rgba(124,58,237,0.25)',
                borderRadius: 12,
                padding: '16px 20px',
                display: 'flex',
                gap: 14,
                alignItems: 'center',
              }}
            >
              <span style={{ fontSize: 24 }}>{f.icon}</span>
              <div>
                <div
                  style={{
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: 16,
                    fontFamily: 'system-ui',
                  }}
                >
                  {f.title}
                </div>
                <div
                  style={{
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: 13,
                    fontFamily: 'system-ui',
                  }}
                >
                  {f.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      label: 'DEMO',
      bg: 'linear-gradient(135deg, #1a0a3e, #0a0a1a)',
      highlight: true,
      content: (
        <div
          style={{
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: '#fff',
              fontFamily: 'system-ui',
              textAlign: 'center',
            }}
          >
            Essayez la démo en direct
          </div>
          <div
            style={{
              background: 'rgba(124,58,237,0.15)',
              border: '2px solid rgba(124,58,237,0.5)',
              borderRadius: 16,
              padding: '24px 32px',
              display: 'flex',
              gap: 16,
              alignItems: 'center',
            }}
          >
            <div style={{ fontSize: 40 }}>💬</div>
            <div>
              <div
                style={{
                  color: '#a78bfa',
                  fontWeight: 700,
                  fontSize: 18,
                  fontFamily: 'system-ui',
                }}
              >
                Chat en direct
              </div>
              <div
                style={{
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: 14,
                  fontFamily: 'system-ui',
                }}
              >
                Ouvrez le chat et posez votre question →
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const totalHeight = sections.length * 380;
  const scrollY = scrollProgress * (totalHeight - 380);

  return (
    <div
      style={{
        height: 500,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        style={{
          transform: `translateY(${-scrollY}px)`,
          transition: 'none',
        }}
      >
        {sections.map((section, i) => (
          <div
            key={i}
            style={{
              background: section.bg,
              height: 380,
              position: 'relative',
              outline: section.highlight
                ? '3px solid rgba(124,58,237,0.7)'
                : 'none',
              outlineOffset: -3,
            }}
          >
            {section.content}
            {section.highlight && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(135deg, rgba(124,58,237,0.06), transparent)',
                  pointerEvents: 'none',
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export const WebsiteScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const browserScale = spring({
    frame,
    fps,
    config: { damping: 22, stiffness: 180 },
  });

  const browserOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const scrollProgress = interpolate(frame, [60, 420], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const arrowOpacity = interpolate(frame, [350, 420], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const arrowBounce = interpolate(Math.sin(frame * 0.15), [-1, 1], [-6, 6]);

  const chatBubbleOpacity = interpolate(frame, [450, 510], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const chatBubbleScale = spring({
    frame: Math.max(0, frame - 450),
    fps,
    config: { damping: 20, stiffness: 300 },
  });

  const pulseSize = interpolate(
    Math.sin(frame * 0.12),
    [-1, 1],
    [1.0, 1.15]
  );

  return (
    <AbsoluteFill
      style={{
        background: '#0a0a0f',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '40px 120px',
      }}
    >
      <div
        style={{
          transform: `scale(${browserScale})`,
          opacity: browserOpacity,
          width: '100%',
          maxWidth: 1100,
          position: 'relative',
        }}
      >
        <BrowserFrame>
          <WebsiteMockup scrollProgress={scrollProgress} />
        </BrowserFrame>

        {/* Arrow pointing to demo */}
        <div
          style={{
            position: 'absolute',
            bottom: 120,
            right: -180,
            opacity: arrowOpacity,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <div
            style={{
              transform: `translateX(${arrowBounce}px)`,
              fontSize: 48,
            }}
          >
            👈
          </div>
          <div
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
              color: '#fff',
              borderRadius: 12,
              padding: '10px 18px',
              fontSize: 16,
              fontWeight: 700,
              fontFamily: 'system-ui, -apple-system, sans-serif',
              whiteSpace: 'nowrap',
              boxShadow: '0 8px 24px rgba(124,58,237,0.4)',
            }}
          >
            Essayez maintenant
          </div>
        </div>

        {/* Chat bubble widget preview */}
        <div
          style={{
            position: 'absolute',
            bottom: -20,
            right: 20,
            transform: `scale(${chatBubbleScale})`,
            opacity: chatBubbleOpacity,
          }}
        >
          <div
            style={{
              transform: `scale(${pulseSize})`,
              width: 60,
              height: 60,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
              boxShadow: '0 0 30px rgba(124,58,237,0.6)',
              cursor: 'pointer',
            }}
          >
            💬
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: 70,
              right: 0,
              background: '#ffffff',
              borderRadius: '12px 12px 4px 12px',
              padding: '10px 14px',
              fontSize: 13,
              fontFamily: 'system-ui, -apple-system, sans-serif',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              color: '#18181b',
              fontWeight: 500,
            }}
          >
            Besoin d'aide ? 👋
          </div>
        </div>
      </div>

      {/* Label */}
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: browserOpacity,
          fontSize: 16,
          color: 'rgba(255,255,255,0.35)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          letterSpacing: '3px',
          textTransform: 'uppercase',
        }}
      >
        auraflowaii.fr
      </div>
    </AbsoluteFill>
  );
};
