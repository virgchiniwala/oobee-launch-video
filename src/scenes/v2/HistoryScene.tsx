// src/scenes/v2/HistoryScene.tsx
import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from 'remotion';
import { COLORS } from '../../tokens';
import { fontFamily } from '../../font';

const CARDS = [
  { siteName: 'Ministry of Education', siteUrl: 'moe.gov.sg', date: '22 Mar 2025' },
  { siteName: 'GovTech', siteUrl: 'tech.gov.sg', date: '20 Jan 2025' },
  { siteName: 'CPF Board', siteUrl: 'cpf.gov.sg', date: '22 Jan 2025' },
];

const BigScanCard: React.FC<typeof CARDS[0]> = ({ siteName, siteUrl, date }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const y = interpolate(spring({ frame, fps, config: { stiffness: 100, damping: 16 } }), [0, 1], [60, 0]);
  const opacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  return (
    <div style={{ transform: `translateY(${y}px)`, opacity }}>
      <div style={{
        background: COLORS.bgCard,
        borderRadius: 16,
        border: `1px solid ${COLORS.purplePrimary}`,
        padding: '28px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily,
        boxShadow: '0 4px 20px rgba(144,33,166,0.10)',
      }}>
        <div>
          <div style={{ fontSize: 32, fontWeight: 700, color: COLORS.textPrimary, marginBottom: 6 }}>{siteName}</div>
          <div style={{ fontSize: 26, color: COLORS.textSecondary, marginBottom: 10 }}>{siteUrl}</div>
          <div style={{
            display: 'inline-flex',
            background: COLORS.badgeBg,
            color: COLORS.badgeText,
            borderRadius: 8,
            padding: '6px 14px',
            fontSize: 22,
            fontWeight: 700,
          }}>{date}</div>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{
            border: `2px solid ${COLORS.purplePrimary}`,
            borderRadius: 8,
            padding: '12px 28px',
            fontSize: 22,
            color: COLORS.purplePrimary,
            fontFamily,
          }}>Download</div>
          <div style={{
            background: COLORS.purplePrimary,
            borderRadius: 8,
            padding: '12px 28px',
            fontSize: 22,
            color: '#fff',
            fontFamily,
          }}>View report</div>
        </div>
      </div>
    </div>
  );
};

export const HistorySceneV2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headingY = interpolate(spring({ frame, fps, config: { stiffness: 100, damping: 16 } }), [0, 1], [40, 0]);
  const headingOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });

  const counterValue = Math.round(
    interpolate(frame, [70, 130], [7, 60], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );
  const counterOpacity = interpolate(frame, [70, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Overlay replaces counter — fades in at 150, counter fades out at 150
  const overlayOpacity = interpolate(frame, [150, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const counterFadeOut = interpolate(frame, [145, 158], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{
      background: COLORS.bgApp,
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexDirection: 'column',
      paddingTop: 72,
    }}>
      {/* Heading */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 24,
        marginBottom: 36,
        transform: `translateY(${headingY}px)`,
        opacity: headingOpacity,
        fontFamily, width: 1400,
      }}>
        <span style={{ fontSize: 60, fontWeight: 700, color: COLORS.textPrimary }}>Scan Reports</span>
        <span style={{
          background: COLORS.badgeBg, color: COLORS.badgeText,
          borderRadius: 12, padding: '8px 20px', fontSize: 32, fontWeight: 700,
        }}>12 Total</span>
      </div>

      {/* Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 1400, marginBottom: 40 }}>
        {CARDS.map((card, i) => (
          frame >= 15 + i * 20 ? (
            <Sequence key={card.siteUrl} from={15 + i * 20} layout="none">
              <BigScanCard {...card} />
            </Sequence>
          ) : null
        ))}
      </div>

      {/* Counter → overlay transition — centred, single focal point */}
      <div style={{ position: 'relative', height: 120, width: 1400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Counter */}
        <div style={{
          position: 'absolute',
          display: 'flex', alignItems: 'baseline', gap: 20,
          opacity: counterOpacity * counterFadeOut, fontFamily,
        }}>
          <span style={{ fontSize: 44, color: COLORS.textMuted, textDecoration: 'line-through' }}>7 days</span>
          <span style={{ fontSize: 40, color: COLORS.borderLight }}>→</span>
          <span style={{ fontSize: 80, fontWeight: 900, color: COLORS.purplePrimary }}>{counterValue} days</span>
        </div>

        {/* Overlay — replaces counter */}
        <div style={{
          position: 'absolute',
          fontSize: 64,
          fontWeight: 900,
          color: COLORS.purplePrimary,
          fontFamily,
          opacity: overlayOpacity,
          letterSpacing: -1,
          textAlign: 'center',
          whiteSpace: 'nowrap',
        }}>
          Access 2 months of historical reports.
        </div>
      </div>
    </AbsoluteFill>
  );
};
