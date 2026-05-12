import React from 'react';
import {
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  AbsoluteFill,
} from 'remotion';

interface PlanFeature {
  text: string;
}

interface PricingPlan {
  name: string;
  setup: string;
  monthly: string;
  features: PlanFeature[];
  recommended?: boolean;
  delay: number;
}

const PLANS: PricingPlan[] = [
  {
    name: 'Essentiel',
    setup: '300€',
    monthly: '150€/mois',
    features: [
      { text: 'Chat IA sur votre site' },
      { text: 'Connaissance produits' },
      { text: 'Support email' },
      { text: 'Analytics basiques' },
    ],
    delay: 0,
  },
  {
    name: 'Premium',
    setup: '500€',
    monthly: '300€/mois',
    features: [
      { text: 'Tout Essentiel inclus' },
      { text: 'Mémoire client avancée' },
      { text: 'Intégration CRM/E-commerce' },
      { text: 'Support prioritaire 24/7' },
      { text: 'Analytics avancés + rapports' },
    ],
    recommended: true,
    delay: 40,
  },
];

const PlanCard: React.FC<PricingPlan & { frame: number; fps: number }> = ({
  name,
  setup,
  monthly,
  features,
  recommended,
  delay,
  frame,
  fps,
}) => {
  const localFrame = Math.max(0, frame - delay);

  const scale = spring({
    frame: localFrame,
    fps,
    config: { damping: 20, stiffness: 250 },
  });

  const y = interpolate(localFrame, [0, 25], [60, 0], {
    extrapolateRight: 'clamp',
  });

  const opacity = interpolate(localFrame, [0, 18], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        transform: `scale(${scale}) translateY(${y}px)`,
        opacity,
        background: recommended
          ? 'linear-gradient(160deg, #1e0a4e, #160a38)'
          : 'rgba(255,255,255,0.04)',
        border: recommended
          ? '2px solid rgba(167,139,250,0.6)'
          : '1px solid rgba(255,255,255,0.1)',
        borderRadius: 28,
        padding: '40px 44px',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        flex: 1,
        position: 'relative',
        boxShadow: recommended
          ? '0 30px 60px rgba(124,58,237,0.25)'
          : 'none',
      }}
    >
      {recommended && (
        <div
          style={{
            position: 'absolute',
            top: -16,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            color: '#ffffff',
            borderRadius: 20,
            padding: '6px 20px',
            fontSize: 13,
            fontWeight: 800,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            boxShadow: '0 4px 16px rgba(245,158,11,0.4)',
          }}
        >
          ⭐ RECOMMANDÉ
        </div>
      )}

      <div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: recommended ? '#a78bfa' : '#ffffff',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            marginBottom: 8,
          }}
        >
          {name}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 8,
            flexWrap: 'wrap',
          }}
        >
          <span
            style={{
              fontSize: 18,
              color: 'rgba(255,255,255,0.5)',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          >
            {setup} setup +
          </span>
          <span
            style={{
              fontSize: 40,
              fontWeight: 900,
              color: '#ffffff',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              letterSpacing: '-1px',
            }}
          >
            {monthly}
          </span>
        </div>
      </div>

      <div
        style={{
          height: 1,
          background: recommended
            ? 'rgba(167,139,250,0.3)'
            : 'rgba(255,255,255,0.08)',
        }}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        {features.map((f, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: '50%',
                background: recommended
                  ? 'rgba(124,58,237,0.3)'
                  : 'rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 13,
                flexShrink: 0,
              }}
            >
              ✓
            </div>
            <span
              style={{
                fontSize: 16,
                color: 'rgba(255,255,255,0.75)',
                fontFamily: 'system-ui, -apple-system, sans-serif',
              }}
            >
              {f.text}
            </span>
          </div>
        ))}
      </div>

      <div
        style={{
          background: recommended
            ? 'linear-gradient(135deg, #7c3aed, #4f46e5)'
            : 'rgba(255,255,255,0.08)',
          color: '#ffffff',
          borderRadius: 14,
          padding: '16px 0',
          textAlign: 'center',
          fontSize: 17,
          fontWeight: 700,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          border: recommended ? 'none' : '1px solid rgba(255,255,255,0.12)',
          marginTop: 'auto',
        }}
      >
        Démarrer →
      </div>
    </div>
  );
};

export const PricingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const titleY = interpolate(frame, [0, 20], [-30, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background:
          'radial-gradient(ellipse at 50% 20%, #100a28 0%, #0a0a0f 60%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 160px',
        gap: 48,
        overflow: 'hidden',
      }}
    >
      {/* Title */}
      <div
        style={{
          transform: `translateY(${titleY}px)`,
          opacity: titleOpacity,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: 16,
            color: 'rgba(255,255,255,0.4)',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            textTransform: 'uppercase',
            letterSpacing: '4px',
            marginBottom: 12,
          }}
        >
          Tarification simple
        </div>
        <div
          style={{
            fontSize: 58,
            fontWeight: 900,
            color: '#ffffff',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            letterSpacing: '-2px',
          }}
        >
          Choisissez votre{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #a78bfa, #818cf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            formule
          </span>
        </div>
      </div>

      {/* Plan cards */}
      <div
        style={{
          display: 'flex',
          gap: 36,
          width: '100%',
          alignItems: 'stretch',
        }}
      >
        {PLANS.map((plan) => (
          <PlanCard key={plan.name} {...plan} frame={frame} fps={fps} />
        ))}
      </div>
    </AbsoluteFill>
  );
};
