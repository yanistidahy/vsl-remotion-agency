import React from 'react';
import {
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  AbsoluteFill,
} from 'remotion';
import { ParticleEffect } from './ParticleEffect';

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const logoScale = spring({
    frame: Math.max(0, frame - 10),
    fps,
    config: { damping: 18, stiffness: 220 },
  });

  const logoOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const ctaOpacity = interpolate(frame, [40, 70], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const ctaY = interpolate(frame, [40, 70], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const urlOpacity = interpolate(frame, [70, 95], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const fadeOut = interpolate(frame, [90, 120], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const glowPulse = interpolate(Math.sin(frame * 0.08), [-1, 1], [0.6, 1.0]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, #1a0a3e 0%, #0d0a2e 40%, #0a0a0f 100%)`,
        opacity: bgOpacity * fadeOut,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        gap: 32,
      }}
    >
      <ParticleEffect color="#a78bfa" />

      {/* Radial glow */}
      <div
        style={{
          position: 'absolute',
          width: 800,
          height: 800,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(124,58,237,${0.2 * glowPulse}) 0%, transparent 70%)`,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      />

      {/* Logo */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          opacity: logoOpacity,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
        }}
      >
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 60,
            fontWeight: 900,
            color: '#ffffff',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            boxShadow: `0 0 ${50 * glowPulse}px rgba(124,58,237,0.7), 0 0 ${100 * glowPulse}px rgba(124,58,237,0.3)`,
          }}
        >
          A
        </div>

        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: '#ffffff',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            letterSpacing: '-2px',
            lineHeight: 1,
          }}
        >
          <span style={{ color: '#a78bfa' }}>Aura</span>Flow{' '}
          <span
            style={{
              fontSize: 36,
              fontWeight: 400,
              color: 'rgba(255,255,255,0.5)',
              letterSpacing: '4px',
            }}
          >
            AI
          </span>
        </div>
      </div>

      {/* CTA */}
      <div
        style={{
          transform: `translateY(${ctaY}px)`,
          opacity: ctaOpacity,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <div
          style={{
            fontSize: 40,
            fontWeight: 800,
            color: '#ffffff',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            textAlign: 'center',
            lineHeight: 1.2,
          }}
        >
          Réservez votre{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #a78bfa, #818cf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            démo gratuite
          </span>
        </div>

        <div
          style={{
            background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
            color: '#ffffff',
            borderRadius: 20,
            padding: '20px 60px',
            fontSize: 24,
            fontWeight: 700,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            boxShadow: '0 16px 40px rgba(124,58,237,0.5)',
            letterSpacing: '0.5px',
          }}
        >
          Démarrer maintenant →
        </div>
      </div>

      {/* URL */}
      <div
        style={{
          opacity: urlOpacity,
          fontSize: 28,
          color: 'rgba(255,255,255,0.5)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          letterSpacing: '3px',
        }}
      >
        <span style={{ color: '#a78bfa', fontWeight: 700 }}>auraflowaii</span>
        .fr
      </div>
    </AbsoluteFill>
  );
};
