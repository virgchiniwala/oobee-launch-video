// src/scenes/AnyDomainScene.tsx
import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { COLORS } from '../tokens';
import { fontFamily } from '../font';
import { DomainTags } from '../components/DomainTags';

const FULL_URL = 'https://shopee.sg';

export const AnyDomainScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardY = interpolate(
    spring({ frame, fps, config: { stiffness: 100, damping: 16 } }),
    [0, 1],
    [80, 0]
  );

  const charCount = Math.round(
    interpolate(frame, [20, 80], [0, FULL_URL.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );
  const displayedUrl = FULL_URL.slice(0, charCount);
  const showCursor = frame < 90;

  const overlayOpacity = interpolate(frame, [140, 165], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{ background: COLORS.bgApp, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 48 }}
    >
      <div
        style={{
          background: COLORS.bgCard,
          borderRadius: 16,
          padding: '40px 48px',
          width: 800,
          boxShadow: '0 4px 32px rgba(144,33,166,0.12)',
          transform: `translateY(${cardY}px)`,
          fontFamily,
        }}
      >
        <div style={{ fontSize: 18, color: COLORS.textMuted, marginBottom: 12 }}>
          Website URL
        </div>

        <div
          style={{
            background: COLORS.bgApp,
            borderRadius: 8,
            padding: '14px 20px',
            fontSize: 24,
            color: COLORS.purplePrimary,
            marginBottom: 24,
            minHeight: 56,
          }}
        >
          {displayedUrl}
          {showCursor && <span style={{ opacity: frame % 30 < 15 ? 1 : 0 }}>|</span>}
        </div>

        {frame >= 80 && <DomainTags />}
      </div>

      <div
        style={{
          fontSize: 56,
          fontWeight: 900,
          color: COLORS.purplePrimary,
          fontFamily,
          opacity: overlayOpacity,
          letterSpacing: -1,
        }}
      >
        Scan any domain.
      </div>
    </AbsoluteFill>
  );
};
