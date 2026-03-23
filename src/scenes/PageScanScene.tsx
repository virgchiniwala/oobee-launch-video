// src/scenes/PageScanScene.tsx
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
import { COLORS } from '../tokens';
import { fontFamily } from '../font';
import { ProgressBar } from '../components/ProgressBar';

export const PageScanScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardY = interpolate(
    spring({ frame, fps, config: { stiffness: 100, damping: 16 } }),
    [0, 1],
    [80, 0]
  );

  const accordionHeight = interpolate(
    spring({ frame: frame - 20, fps, config: { stiffness: 80, damping: 14 } }),
    [0, 1],
    [0, 120]
  );

  const chevronRotate = interpolate(frame, [20, 50], [0, 180], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const pageValue = Math.round(
    interpolate(frame, [60, 100], [100, 1000], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  const scannedPages = Math.round(
    interpolate(frame, [100, 200], [0, 1000], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );
  const progressRatio = scannedPages / 1000;
  const progressVisible = frame >= 100;

  const badgeOpacity = interpolate(frame, [190, 215], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const badgeScale = interpolate(
    spring({ frame: frame - 190, fps, config: { stiffness: 200, damping: 14 } }),
    [0, 1],
    [0.7, 1]
  );

  return (
    <AbsoluteFill
      style={{ background: COLORS.bgApp, alignItems: 'center', justifyContent: 'center' }}
    >
      <div
        style={{
          background: COLORS.bgCard,
          borderRadius: 16,
          padding: '40px 48px',
          width: 720,
          boxShadow: '0 4px 32px rgba(144,33,166,0.12)',
          transform: `translateY(${cardY}px)`,
          fontFamily,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <span style={{ fontSize: 20, color: COLORS.textPrimary }}>Scan up to</span>
          <button
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: 0,
            }}
          >
            <span style={{ color: COLORS.purplePrimary, fontWeight: 700, fontSize: 22 }}>
              {pageValue.toLocaleString()} pages
            </span>
            <Img
              src={staticFile('chevron-purple.svg')}
              style={{ width: 16, height: 16, transform: `rotate(${chevronRotate}deg)` }}
            />
          </button>
        </div>

        <div style={{ overflow: 'hidden', height: accordionHeight }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <Img src={staticFile('up-stepper-button.svg')} style={{ width: 32, height: 32 }} />
            <Img src={staticFile('down-stepper-button.svg')} style={{ width: 32, height: 32 }} />
            <span style={{ fontSize: 28, fontWeight: 700, color: COLORS.textPrimary }}>
              {pageValue.toLocaleString()}
            </span>
            <span style={{ fontSize: 20, color: COLORS.textMuted }}>pages</span>
          </div>
        </div>

        {progressVisible && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <Img
                src={staticFile('loading_spinner.svg')}
                style={{ width: 24, height: 24 }}
              />
              <span style={{ fontSize: 20, color: COLORS.purplePrimary, fontWeight: 600 }}>
                Scanning: Page {scannedPages} of 1,000
              </span>
            </div>
            <ProgressBar progress={progressRatio} height={8} />
          </div>
        )}
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 120,
          background: COLORS.purplePrimary,
          color: '#fff',
          borderRadius: 40,
          padding: '16px 40px',
          fontSize: 28,
          fontWeight: 700,
          fontFamily,
          opacity: badgeOpacity,
          transform: `scale(${badgeScale})`,
        }}
      >
        10× more than Beta
      </div>
    </AbsoluteFill>
  );
};
