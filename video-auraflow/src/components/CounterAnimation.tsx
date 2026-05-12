import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

interface CounterAnimationProps {
  targetValue: number;
  prefix?: string;
  suffix?: string;
  label: string;
  duration?: number;
  color?: string;
}

export const CounterAnimation: React.FC<CounterAnimationProps> = ({
  targetValue,
  prefix = '',
  suffix = '',
  label,
  duration = 90,
  color = '#a78bfa',
}) => {
  const frame = useCurrentFrame();

  const value = Math.floor(
    interpolate(frame, [0, duration], [0, targetValue], {
      extrapolateRight: 'clamp',
    })
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <div
        style={{
          fontSize: 72,
          fontWeight: 900,
          color,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          lineHeight: 1,
          letterSpacing: '-2px',
        }}
      >
        {prefix}
        {value}
        {suffix}
      </div>
      <div
        style={{
          fontSize: 24,
          color: 'rgba(255,255,255,0.7)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          textAlign: 'center',
          fontWeight: 500,
        }}
      >
        {label}
      </div>
    </div>
  );
};
