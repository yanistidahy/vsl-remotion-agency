import React from 'react';
import {
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  AbsoluteFill,
} from 'remotion';
import { CounterAnimation } from './CounterAnimation';

interface FeatureCard {
  icon: string;
  title: string;
  description: string;
  gradient: string;
  delay: number;
}

const FEATURES: FeatureCard[] = [
  {
    icon: '🤖',
    title: 'IA Conversationnelle',
    description: 'Répond comme un vrai conseiller humain, 24h/24',
    gradient: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
    delay: 0,
  },
  {
    icon: '🧠',
    title: 'Mémoire Client',
    description: 'Se souvient de chaque visiteur et personnalise',
    gradient: 'linear-gradient(135deg, #4f46e5, #4338ca)',
    delay: 30,
  },
  {
    icon: '📦',
    title: 'Connaissance Produits',
    description: 'Connaît tout votre catalogue en profondeur',
    gradient: 'linear-gradient(135deg, #6d28d9, #5b21b6)',
    delay: 60,
  },
];

const FeatureCardComponent: React.FC<FeatureCard & { frame: number; fps: number }> = ({
  icon,
  title,
  description,
  gradient,
  delay,
  frame,
  fps,
}) => {
  const localFrame = Math.max(0, frame - delay);

  const scale = spring({
    frame: localFrame,
    fps,
    config: { damping: 22, stiffness: 280 },
  });

  const y = interpolate(localFrame, [0, 20], [80, 0], {
    extrapolateRight: 'clamp',
  });

  const opacity = interpolate(localFrame, [0, 15], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        transform: `scale(${scale}) translateY(${y}px)`,
        opacity,
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(124,58,237,0.25)',
        borderRadius: 24,
        padding: '40px 36px',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        position: 'relative',
        overflow: 'hidden',
        flex: 1,
      }}
    >
      {/* Top accent */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: gradient,
        }}
      />

      {/* Icon */}
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: 18,
          background: gradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 36,
          boxShadow: '0 12px 30px rgba(124,58,237,0.35)',
        }}
      >
        {icon}
      </div>

      <div
        style={{
          fontSize: 24,
          fontWeight: 800,
          color: '#ffffff',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          lineHeight: 1.2,
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: 17,
          color: 'rgba(255,255,255,0.6)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          lineHeight: 1.5,
        }}
      >
        {description}
      </div>
    </div>
  );
};

export const FeaturesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const titleY = interpolate(frame, [0, 25], [-30, 0], {
    extrapolateRight: 'clamp',
  });

  const statsOpacity = interpolate(frame, [280, 340], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const statsLocalFrame = Math.max(0, frame - 280);

  return (
    <AbsoluteFill
      style={{
        background:
          'radial-gradient(ellipse at 50% 30%, #140a2e 0%, #0a0a0f 65%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 120px',
        gap: 56,
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
            marginBottom: 14,
          }}
        >
          Pourquoi AuraFlow AI
        </div>
        <div
          style={{
            fontSize: 60,
            fontWeight: 900,
            color: '#ffffff',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            letterSpacing: '-2px',
            lineHeight: 1,
          }}
        >
          Tout ce dont vous{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #a78bfa, #818cf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            avez besoin
          </span>
        </div>
      </div>

      {/* Feature cards */}
      <div
        style={{
          display: 'flex',
          gap: 28,
          width: '100%',
        }}
      >
        {FEATURES.map((f) => (
          <FeatureCardComponent key={f.title} {...f} frame={frame} fps={fps} />
        ))}
      </div>

      {/* Stats row */}
      <div
        style={{
          opacity: statsOpacity,
          display: 'flex',
          gap: 80,
          padding: '32px 60px',
          background: 'rgba(124,58,237,0.08)',
          border: '1px solid rgba(124,58,237,0.2)',
          borderRadius: 20,
          width: '100%',
          justifyContent: 'space-around',
        }}
      >
        <CounterAnimation
          targetValue={35}
          prefix="+"
          suffix="%"
          label="de conversion"
          duration={80}
          color="#a78bfa"
        />
        <div
          style={{
            width: 1,
            background: 'rgba(124,58,237,0.3)',
            alignSelf: 'stretch',
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ fontSize: 72, fontWeight: 900, color: '#a78bfa', fontFamily: 'system-ui', lineHeight: 1, letterSpacing: '-2px' }}>
            24/7
          </div>
          <div style={{ fontSize: 24, color: 'rgba(255,255,255,0.7)', fontFamily: 'system-ui', fontWeight: 500 }}>
            disponible
          </div>
        </div>
        <div
          style={{
            width: 1,
            background: 'rgba(124,58,237,0.3)',
            alignSelf: 'stretch',
          }}
        />
        <CounterAnimation
          targetValue={48}
          suffix="h"
          label="livraison"
          duration={80}
          color="#a78bfa"
        />
      </div>
    </AbsoluteFill>
  );
};
