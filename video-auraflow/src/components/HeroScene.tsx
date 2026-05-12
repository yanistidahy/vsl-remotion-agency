import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill,
} from 'remotion';
import { ParticleEffect } from './ParticleEffect';

export const HeroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 200, mass: 1.2 },
  });

  const logoOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const textY = interpolate(frame, [30, 60], [60, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const textOpacity = interpolate(frame, [30, 55], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const taglineOpacity = interpolate(frame, [70, 100], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const taglineY = interpolate(frame, [70, 100], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const glowPulse = interpolate(
    Math.sin(frame * 0.05),
    [-1, 1],
    [0.6, 1.0]
  );

  const subtitleOpacity = interpolate(frame, [110, 140], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: 'radial-gradient(ellipse at 50% 40%, #1a0a3e 0%, #0a0a0f 70%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <ParticleEffect color="#a78bfa" />

      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(124,58,237,${0.15 * glowPulse}) 0%, transparent 70%)`,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      />

      {/* Logo circle */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          opacity: logoOpacity,
          width: 140,
          height: 140,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 72,
          fontWeight: 900,
          color: '#ffffff',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          boxShadow: `0 0 ${60 * glowPulse}px rgba(124,58,237,0.7), 0 0 ${120 * glowPulse}px rgba(124,58,237,0.3)`,
          marginBottom: 36,
        }}
      >
        A
      </div>

      {/* Brand name */}
      <div
        style={{
          transform: `translateY(${textY}px)`,
          opacity: textOpacity,
          fontSize: 88,
          fontWeight: 900,
          color: '#ffffff',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          letterSpacing: '-3px',
          lineHeight: 1,
          marginBottom: 20,
          textAlign: 'center',
        }}
      >
        <span style={{ color: '#a78bfa' }}>Aura</span>
        <span>Flow</span>
        <span
          style={{
            fontSize: 48,
            fontWeight: 400,
            color: 'rgba(255,255,255,0.6)',
            letterSpacing: '4px',
            marginLeft: 12,
          }}
        >
          AI
        </span>
      </div>

      {/* Divider line */}
      <div
        style={{
          opacity: textOpacity,
          width: interpolate(textOpacity, [0, 1], [0, 300]),
          height: 2,
          background: 'linear-gradient(90deg, transparent, #7c3aed, transparent)',
          marginBottom: 28,
        }}
      />

      {/* Tagline */}
      <div
        style={{
          transform: `translateY(${taglineY}px)`,
          opacity: taglineOpacity,
          fontSize: 34,
          color: 'rgba(255,255,255,0.85)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontWeight: 300,
          letterSpacing: '1px',
          textAlign: 'center',
        }}
      >
        L'assistant IA qui{' '}
        <span
          style={{
            color: '#a78bfa',
            fontWeight: 700,
          }}
        >
          vend pour vous
        </span>
      </div>

      {/* Sub-tagline */}
      <div
        style={{
          opacity: subtitleOpacity,
          fontSize: 20,
          color: 'rgba(255,255,255,0.4)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          marginTop: 16,
          letterSpacing: '3px',
          textTransform: 'uppercase',
        }}
      >
        24h/24 · 7j/7 · Sans interruption
      </div>
    </AbsoluteFill>
  );
};
