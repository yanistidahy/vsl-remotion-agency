import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

interface Particle {
  id: number;
  x: number;
  startY: number;
  size: number;
  speed: number;
  opacity: number;
  delay: number;
}

const PARTICLES: Particle[] = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  startY: 80 + Math.random() * 20,
  size: 3 + Math.random() * 5,
  speed: 0.008 + Math.random() * 0.012,
  opacity: 0.3 + Math.random() * 0.5,
  delay: Math.floor(Math.random() * 120),
}));

export const ParticleEffect: React.FC<{ color?: string }> = ({
  color = '#a78bfa',
}) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {PARTICLES.map((p) => {
        const localFrame = Math.max(0, frame - p.delay);
        const progress = (localFrame * p.speed) % 1;
        const y = p.startY - progress * 120;
        const opacity = interpolate(
          progress,
          [0, 0.1, 0.8, 1],
          [0, p.opacity, p.opacity, 0],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );

        return (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: `${y}%`,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              background: color,
              opacity,
              boxShadow: `0 0 ${p.size * 2}px ${color}`,
            }}
          />
        );
      })}
    </div>
  );
};
