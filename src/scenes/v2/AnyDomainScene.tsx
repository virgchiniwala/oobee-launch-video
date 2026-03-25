// src/scenes/v2/AnyDomainScene.tsx
import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { COLORS } from '../../tokens';
import { fontFamily } from '../../font';
import { DomainTags } from '../../components/DomainTags';

const FULL_URL = 'https://visitsingapore.com';

export const AnyDomainSceneV2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardY = interpolate(
    spring({ frame, fps, config: { stiffness: 100, damping: 16 } }),
    [0, 1], [100, 0]
  );

  const charCount = Math.round(
    interpolate(frame, [15, 70], [0, FULL_URL.length], {
      extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    })
  );
  const displayedUrl = FULL_URL.slice(0, charCount);
  const showCursor = frame >= 15 && frame < 80;

  // Input border highlight
  const inputBorder = frame >= 15 ? COLORS.purplePrimary : COLORS.borderLight;

  const overlayOpacity = interpolate(frame, [100, 125], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Scan button pulses at frame 80
  const btnPulse = spring({ frame: frame - 80, fps, config: { stiffness: 300, damping: 10 } });
  const btnScale = frame >= 80 ? 1 + btnPulse * 0.04 * Math.max(0, 1 - (frame - 80) / 15) : 1;

  return (
    <AbsoluteFill style={{
      background: COLORS.bgApp,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: 64,
    }}>
      <div style={{
        background: COLORS.bgCard,
        borderRadius: 20,
        padding: '56px 80px',
        width: 1400,
        boxShadow: '0 8px 48px rgba(144,33,166,0.12)',
        transform: `translateY(${cardY}px)`,
        fontFamily,
        display: 'flex',
        flexDirection: 'column',
        gap: 28,
      }}>
        {/* Label */}
        <div style={{ fontSize: 30, color: COLORS.textMuted, fontWeight: 500 }}>
          Website URL
        </div>

        {/* URL input */}
        <div style={{
          background: COLORS.bgApp,
          borderRadius: 12,
          border: `2px solid ${inputBorder}`,
          padding: '20px 32px',
          fontSize: 36,
          color: COLORS.purplePrimary,
          minHeight: 80,
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          boxShadow: frame >= 15 ? '0 0 0 4px rgba(144,33,166,0.10)' : 'none',
        }}>
          {displayedUrl || <span style={{ color: COLORS.textMuted }}>https://</span>}
          {showCursor && <span style={{ display: 'inline-block', width: 2, height: 34, background: COLORS.purplePrimary, marginLeft: 3, verticalAlign: 'middle' }} />}
        </div>

        {/* Domain tags */}
        <Sequence from={70} layout="none">
          <DomainTags />
        </Sequence>

        {/* Scan button */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
          <div style={{
            background: COLORS.purplePrimary,
            color: '#fff',
            borderRadius: 999,
            padding: '20px 80px',
            fontSize: 32,
            fontWeight: 700,
            fontFamily,
            transform: `scale(${btnScale})`,
            boxShadow: '0 4px 24px rgba(144,33,166,0.3)',
          }}>
            Scan now
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div style={{
        fontSize: 80,
        fontWeight: 900,
        color: COLORS.purplePrimary,
        fontFamily,
        opacity: overlayOpacity,
        letterSpacing: -2,
      }}>
        Scan any domain — including sites in development.
      </div>
    </AbsoluteFill>
  );
};
