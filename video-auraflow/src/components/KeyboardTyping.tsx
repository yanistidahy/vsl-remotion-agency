import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

const KEYS_ROW1 = ['Q','W','E','R','T','Y','U','I','O','P'];
const KEYS_ROW2 = ['A','S','D','F','G','H','J','K','L'];
const KEYS_ROW3 = ['Z','X','C','V','B','N','M'];

const TYPED_SEQUENCE = "j'ai les cheveux secs et frisés";

interface KeyboardTypingProps {
  startFrame?: number;
  charsPerSecond?: number;
  fps?: number;
}

export const KeyboardTyping: React.FC<KeyboardTypingProps> = ({
  startFrame = 0,
  charsPerSecond = 8,
  fps = 60,
}) => {
  const frame = useCurrentFrame();
  const localFrame = Math.max(0, frame - startFrame);
  const framesPerChar = fps / charsPerSecond;
  const charIndex = Math.floor(localFrame / framesPerChar);
  const currentChar = TYPED_SEQUENCE[charIndex]?.toUpperCase() ?? '';

  const opacity = interpolate(frame, [startFrame, startFrame + 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const renderKey = (key: string) => {
    const isActive =
      key === currentChar ||
      (key === "'" && currentChar === "'") ||
      (key === ' ' && TYPED_SEQUENCE[charIndex] === ' ');
    return (
      <div
        key={key}
        style={{
          width: 46,
          height: 46,
          borderRadius: 8,
          background: isActive
            ? 'linear-gradient(135deg, #7c3aed, #4f46e5)'
            : 'rgba(255,255,255,0.12)',
          border: isActive
            ? '2px solid #a78bfa'
            : '2px solid rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: isActive ? '#ffffff' : 'rgba(255,255,255,0.5)',
          fontSize: 14,
          fontWeight: 700,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          boxShadow: isActive ? '0 0 16px rgba(124,58,237,0.6)' : 'none',
          transition: 'all 0.05s',
          transform: isActive ? 'translateY(2px) scale(0.95)' : 'none',
        }}
      >
        {key}
      </div>
    );
  };

  return (
    <div
      style={{
        opacity,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        padding: '24px 32px',
        background: 'rgba(0,0,0,0.7)',
        borderRadius: 20,
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(124,58,237,0.2)',
      }}
    >
      <div style={{ display: 'flex', gap: 6 }}>{KEYS_ROW1.map(renderKey)}</div>
      <div style={{ display: 'flex', gap: 6 }}>{KEYS_ROW2.map(renderKey)}</div>
      <div style={{ display: 'flex', gap: 6 }}>{KEYS_ROW3.map(renderKey)}</div>
      <div
        style={{
          width: 280,
          height: 46,
          borderRadius: 8,
          background: 'rgba(255,255,255,0.12)',
          border: '2px solid rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'rgba(255,255,255,0.4)',
          fontSize: 13,
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        ESPACE
      </div>
    </div>
  );
};
