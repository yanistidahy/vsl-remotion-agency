import React from 'react';
import { useCurrentFrame, spring, useVideoConfig, interpolate } from 'remotion';

interface ProductCardProps {
  name: string;
  price: string;
  description?: string;
  delay?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  description,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const localFrame = Math.max(0, frame - delay);

  const scale = spring({
    frame: localFrame,
    fps,
    config: { damping: 25, stiffness: 300, mass: 0.8 },
  });

  const opacity = interpolate(localFrame, [0, 10], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        opacity,
        background: '#ffffff',
        borderRadius: 20,
        overflow: 'hidden',
        width: 320,
        boxShadow: '0 20px 60px rgba(124,58,237,0.3)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <div
        style={{
          background: 'linear-gradient(135deg, #f3e8ff, #ede9fe)',
          width: '100%',
          height: 180,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontSize: 80,
            lineHeight: 1,
          }}
        >
          🧴
        </div>
      </div>

      <div style={{ padding: '20px 24px 24px' }}>
        <div
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: '#18181b',
            marginBottom: 6,
            lineHeight: 1.3,
          }}
        >
          {name}
        </div>
        {description && (
          <div
            style={{
              fontSize: 13,
              color: '#71717a',
              marginBottom: 14,
              lineHeight: 1.5,
            }}
          >
            {description}
          </div>
        )}
        <div
          style={{
            fontSize: 28,
            fontWeight: 900,
            color: '#7c3aed',
            marginBottom: 16,
          }}
        >
          {price}
        </div>
        <div
          style={{
            background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
            color: '#ffffff',
            borderRadius: 10,
            padding: '12px 0',
            textAlign: 'center',
            fontSize: 15,
            fontWeight: 700,
            width: '100%',
          }}
        >
          Voir le produit →
        </div>
      </div>
    </div>
  );
};
