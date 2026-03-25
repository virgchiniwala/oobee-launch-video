// src/scenes/v2/PageScanScene.tsx
import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { COLORS } from '../../tokens';
import { fontFamily } from '../../font';
import { ProgressBar } from '../../components/ProgressBar';

export const PageScanSceneV2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardY = interpolate(
    spring({ frame, fps, config: { stiffness: 100, damping: 16 } }),
    [0, 1], [80, 0]
  );

  // Accordion opens immediately
  const accordionHeight = interpolate(
    spring({ frame: frame - 10, fps, config: { stiffness: 80, damping: 14 } }),
    [0, 1], [0, 140]
  );
  const chevronRotate = interpolate(frame, [10, 40], [0, 180], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Scan starts at frame 40 — page limit is ALREADY 1,000
  const scannedPages = Math.round(
    interpolate(frame, [40, 180], [0, 1000], {
      extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    })
  );
  const progressRatio = scannedPages / 1000;
  const progressVisible = frame >= 40;

  const badgeOpacity = interpolate(frame, [130, 150], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const badgeScale = interpolate(
    spring({ frame: frame - 130, fps, config: { stiffness: 200, damping: 14 } }),
    [0, 1], [0.7, 1]
  );

  return (
    <AbsoluteFill style={{ background: COLORS.bgApp, alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        background: COLORS.bgCard,
        borderRadius: 20,
        padding: '64px 88px',
        width: 1400,
        boxShadow: '0 4px 40px rgba(144,33,166,0.13)',
        transform: `translateY(${cardY}px)`,
        fontFamily,
      }}>
        {/* Page limit toggle row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
          <span style={{ fontSize: 34, color: COLORS.textPrimary }}>Scan up to</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: COLORS.purplePrimary, fontWeight: 700, fontSize: 40 }}>
              1,000 pages
            </span>
            <Img
              src={staticFile('chevron-purple.svg')}
              style={{ width: 20, height: 20, transform: `rotate(${chevronRotate}deg)` }}
            />
          </div>
        </div>

        {/* Accordion — stepper showing 1,000 */}
        <div style={{ overflow: 'hidden', height: accordionHeight, marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingBottom: 20 }}>
            <Img src={staticFile('up-stepper-button.svg')} style={{ width: 40, height: 40 }} />
            <Img src={staticFile('down-stepper-button.svg')} style={{ width: 40, height: 40 }} />
            <span style={{ fontSize: 52, fontWeight: 700, color: COLORS.textPrimary, fontFeatureSettings: '"zero" 0' }}>1,000</span>
            <span style={{ fontSize: 36, color: COLORS.textMuted }}>pages</span>
          </div>
        </div>

        {/* Scan progress */}
        {progressVisible && (
          <div style={{ marginTop: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              <Img src={staticFile('loading_spinner.svg')} style={{ width: 32, height: 32 }} />
              <span style={{ fontSize: 36, color: COLORS.purplePrimary, fontWeight: 600 }}>
                Scanning: Page {scannedPages} of 1,000
              </span>
            </div>
            <ProgressBar progress={progressRatio} height={10} />
          </div>
        )}
      </div>

      {/* Badge */}
      <div style={{
        position: 'absolute',
        bottom: 140,
        background: COLORS.purplePrimary,
        color: '#fff',
        borderRadius: 48,
        padding: '24px 64px',
        fontSize: 44,
        fontWeight: 700,
        fontFamily,
        opacity: badgeOpacity,
        transform: `scale(${badgeScale})`,
        boxShadow: '0 8px 32px rgba(144,33,166,0.35)',
      }}>
        10× more than Beta — same as Inspect Plus
      </div>
    </AbsoluteFill>
  );
};
