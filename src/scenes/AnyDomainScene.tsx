// src/scenes/AnyDomainScene.tsx
import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { COLORS } from '../tokens';
import { fontFamily } from '../font';
import { DomainTags } from '../components/DomainTags';

const FULL_URL = 'https://visitsingapore.com';

export const AnyDomainScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardY = interpolate(
    spring({ frame, fps, config: { stiffness: 100, damping: 16 } }),
    [0, 1],
    [100, 0]
  );

  const charCount = Math.round(
    interpolate(frame, [20, 80], [0, FULL_URL.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );
  const displayedUrl = FULL_URL.slice(0, charCount);
  const showCursor = frame < 90;

  const overlayOpacity = interpolate(frame, [130, 160], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bgApp,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 60,
      }}
    >
      {/* Scan URL card */}
      <div
        style={{
          background: COLORS.bgCard,
          borderRadius: 20,
          padding: '56px 72px',
          width: 1100,
          boxShadow: '0 8px 48px rgba(144,33,166,0.12)',
          transform: `translateY(${cardY}px)`,
          fontFamily,
        }}
      >
        <div style={{ fontSize: 26, color: COLORS.textMuted, marginBottom: 16 }}>
          Website URL
        </div>
        <div
          style={{
            background: COLORS.bgApp,
            borderRadius: 10,
            padding: '18px 28px',
            fontSize: 34,
            color: COLORS.purplePrimary,
            marginBottom: 32,
            minHeight: 72,
            fontWeight: 500,
          }}
        >
          {displayedUrl}
          {showCursor && <span style={{ opacity: frame % 30 < 15 ? 1 : 0 }}>|</span>}
        </div>

        {/* Domain tags — wrapped in Sequence so frame resets to 0 */}
        <Sequence from={80} layout="none">
          <DomainTags />
        </Sequence>
      </div>

      {/* Overlay headline */}
      <div
        style={{
          fontSize: 80,
          fontWeight: 900,
          color: COLORS.purplePrimary,
          fontFamily,
          opacity: overlayOpacity,
          letterSpacing: -2,
        }}
      >
        Scan any domain.
      </div>
    </AbsoluteFill>
  );
};
