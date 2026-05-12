import React from 'react';
import {
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  AbsoluteFill,
} from 'remotion';

interface ProblemItem {
  icon: string;
  text: string;
  delay: number;
}

const PROBLEMS: ProblemItem[] = [
  { icon: '😴', text: 'Votre site dort la nuit', delay: 20 },
  { icon: '❓', text: 'Clients sans réponse', delay: 50 },
  { icon: '💸', text: 'Ventes perdues', delay: 80 },
];

const ProblemCard: React.FC<ProblemItem & { frame: number; fps: number }> = ({
  icon,
  text,
  delay,
  frame,
  fps,
}) => {
  const localFrame = Math.max(0, frame - delay);

  const x = interpolate(localFrame, [0, 25], [-200, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const opacity = interpolate(localFrame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const scale = spring({
    frame: localFrame,
    fps,
    config: { damping: 20, stiffness: 250 },
  });

  return (
    <div
      style={{
        transform: `translateX(${x}px) scale(${scale})`,
        opacity,
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        background: 'rgba(239,68,68,0.12)',
        border: '1px solid rgba(239,68,68,0.3)',
        borderRadius: 16,
        padding: '20px 28px',
        width: '100%',
      }}
    >
      <div style={{ fontSize: 40, lineHeight: 1 }}>{icon}</div>
      <div
        style={{
          fontSize: 26,
          fontWeight: 600,
          color: '#fca5a5',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {text}
      </div>
    </div>
  );
};

export const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const solutionOpacity = interpolate(frame, [160, 210], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const solutionX = interpolate(frame, [160, 200], [100, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const dividerProgress = interpolate(frame, [140, 180], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const titleY = interpolate(frame, [0, 20], [-30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const bubbleScale = spring({
    frame: Math.max(0, frame - 200),
    fps,
    config: { damping: 22, stiffness: 280 },
  });

  return (
    <AbsoluteFill
      style={{
        background: 'radial-gradient(ellipse at 30% 50%, #1a0a0a 0%, #0a0a0f 60%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 120px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '100%',
          gap: 80,
          alignItems: 'center',
        }}
      >
        {/* Left side - Problems */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
          }}
        >
          <div
            style={{
              transform: `translateY(${titleY}px)`,
              opacity: titleOpacity,
              fontSize: 18,
              color: 'rgba(255,255,255,0.4)',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              marginBottom: 8,
            }}
          >
            Le problème
          </div>
          {PROBLEMS.map((p) => (
            <ProblemCard key={p.text} {...p} frame={frame} fps={fps} />
          ))}
        </div>

        {/* Divider */}
        <div
          style={{
            width: 2,
            height: 400 * dividerProgress,
            background:
              'linear-gradient(to bottom, transparent, rgba(124,58,237,0.6), transparent)',
            flexShrink: 0,
          }}
        />

        {/* Right side - Solution */}
        <div
          style={{
            flex: 1,
            transform: `translateX(${solutionX}px)`,
            opacity: solutionOpacity,
            display: 'flex',
            flexDirection: 'column',
            gap: 32,
            alignItems: 'flex-start',
          }}
        >
          <div
            style={{
              fontSize: 18,
              color: 'rgba(255,255,255,0.4)',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '3px',
            }}
          >
            La solution
          </div>
          <div
            style={{
              fontSize: 40,
              fontWeight: 800,
              color: '#ffffff',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              lineHeight: 1.2,
            }}
          >
            Et si votre site{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #a78bfa, #818cf8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              vendait 24h/24 ?
            </span>
          </div>

          {/* Chat bubble */}
          <div
            style={{
              transform: `scale(${bubbleScale})`,
              background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
              borderRadius: 20,
              padding: '24px 28px',
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              boxShadow: '0 20px 50px rgba(124,58,237,0.4)',
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
              }}
            >
              💬
            </div>
            <div>
              <div
                style={{
                  color: '#fff',
                  fontSize: 20,
                  fontWeight: 700,
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                }}
              >
                AuraFlow AI répond
              </div>
              <div
                style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: 15,
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  marginTop: 4,
                }}
              >
                à vos clients à votre place
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
