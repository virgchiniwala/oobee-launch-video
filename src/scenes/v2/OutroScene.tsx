// src/scenes/v2/OutroScene.tsx
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

export const OutroSceneV2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = interpolate(
    spring({ frame, fps, config: { stiffness: 100, damping: 14 } }),
    [0, 1], [0.8, 1]
  );
  const logoOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });

  const titleOpacity = interpolate(frame, [18, 36], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const dividerScale = interpolate(
    spring({ frame: frame - 28, fps, config: { stiffness: 80, damping: 14 } }),
    [0, 1], [0, 1]
  );

  const ctaOpacity = interpolate(frame, [42, 62], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{
      background: COLORS.bgCard,
      fontFamily,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 32,
    }}>
      {/* Logo */}
      <div style={{
        overflow: 'hidden',
        height: 88,
        display: 'flex',
        alignItems: 'flex-start',
        opacity: logoOpacity,
        transform: `scale(${logoScale})`,
      }}>
        <Img
          src={staticFile('logo-oobee-full-colour-FPA-110x40.svg')}
          style={{ width: 320 }}
        />
      </div>

      {/* Headline */}
      <div style={{
        opacity: titleOpacity,
        fontSize: 96,
        fontWeight: 700,
        color: COLORS.textPrimary,
        letterSpacing: -2,
        lineHeight: 1,
      }}>
        Try A Scan Now
      </div>

      {/* Divider */}
      <div style={{
        width: 360,
        height: 4,
        background: `linear-gradient(90deg, ${COLORS.purplePrimary}, ${COLORS.purpleDark})`,
        transformOrigin: 'center center',
        transform: `scaleX(${dividerScale})`,
        borderRadius: 2,
      }} />

      {/* QR + URL row */}
      <div style={{
        opacity: ctaOpacity,
        display: 'flex',
        alignItems: 'center',
        gap: 48,
      }}>
        <Img
          src={staticFile('qr-oobee-web.svg')}
          style={{ width: 320, height: 320 }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span style={{ fontSize: 30, color: COLORS.textMuted, fontWeight: 500 }}>
            Scan the QR or visit
          </span>
          <span style={{ fontSize: 52, color: COLORS.purplePrimary, fontWeight: 700 }}>
            app.oobee.tech.gov.sg
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
