// src/scenes/HistoryScene.tsx
import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from 'remotion';
import { COLORS } from '../tokens';
import { fontFamily } from '../font';
import { ScanCardMock } from '../components/ScanCardMock';

const CARDS = [
  { siteName: 'Ministry of Education', siteUrl: 'moe.gov.sg', date: '22 Mar 2025' },
  { siteName: 'GovTech', siteUrl: 'tech.gov.sg', date: '20 Jan 2025' },
  { siteName: 'CPF Board', siteUrl: 'cpf.gov.sg', date: '22 Jan 2025' },
];

const AnimatedCard: React.FC<{ card: typeof CARDS[0] }> = ({ card }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const y = interpolate(
    spring({ frame, fps, config: { stiffness: 100, damping: 16 } }),
    [0, 1],
    [60, 0]
  );
  const opacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div style={{ transform: `translateY(${y}px)`, opacity }}>
      <ScanCardMock {...card} />
    </div>
  );
};

export const HistoryScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headingY = interpolate(
    spring({ frame, fps, config: { stiffness: 100, damping: 16 } }),
    [0, 1],
    [40, 0]
  );
  const headingOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });

  const counterValue = Math.round(
    interpolate(frame, [80, 140], [7, 60], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );
  const counterOpacity = interpolate(frame, [80, 95], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const overlayOpacity = interpolate(frame, [140, 165], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bgApp,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        paddingTop: 80,
      }}
    >
      {/* Heading */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          marginBottom: 40,
          transform: `translateY(${headingY}px)`,
          opacity: headingOpacity,
          fontFamily,
          width: 1200,
        }}
      >
        <span style={{ fontSize: 52, fontWeight: 700, color: COLORS.textPrimary }}>
          Scan Reports
        </span>
        <span
          style={{
            background: COLORS.badgeBg,
            color: COLORS.badgeText,
            borderRadius: 10,
            padding: '6px 16px',
            fontSize: 26,
            fontWeight: 700,
          }}
        >
          12 Total
        </span>
      </div>

      {/* Card list — 1200px wide, stacked vertically */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 1200, marginBottom: 48 }}>
        {CARDS.map((card, i) => (
          frame >= 20 + i * 20 ? (
            <Sequence key={card.siteUrl} from={20 + i * 20} layout="none">
              <AnimatedCard card={card} />
            </Sequence>
          ) : null
        ))}
      </div>

      {/* Days counter */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, opacity: counterOpacity, fontFamily, width: 1200 }}>
        <span style={{ fontSize: 40, color: COLORS.textMuted, textDecoration: 'line-through' }}>7 days</span>
        <span style={{ fontSize: 36, color: COLORS.borderLight }}>→</span>
        <span style={{ fontSize: 72, fontWeight: 900, color: COLORS.purplePrimary }}>
          {counterValue} days
        </span>
      </div>

      {/* Overlay */}
      <div
        style={{
          position: 'absolute',
          bottom: 80,
          fontSize: 60,
          fontWeight: 900,
          color: COLORS.purplePrimary,
          fontFamily,
          opacity: overlayOpacity,
          letterSpacing: -1,
          textAlign: 'center',
        }}
      >
        Access 2 months of historical reports.
      </div>
    </AbsoluteFill>
  );
};
