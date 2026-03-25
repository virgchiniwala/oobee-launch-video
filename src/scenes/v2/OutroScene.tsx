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
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: 36,
      fontFamily,
    }}>
      {/* Logo — clipped to hide subtitle */}
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

      <div style={{
        opacity: titleOpacity,
        fontSize: 80,
        fontWeight: 700,
        color: COLORS.textPrimary,
        letterSpacing: -1,
      }}>
        Oobee Web v1 is live
      </div>

      <div style={{
        width: 320,
        height: 4,
        background: `linear-gradient(90deg, ${COLORS.purplePrimary}, ${COLORS.purpleDark})`,
        transformOrigin: 'center center',
        transform: `scaleX(${dividerScale})`,
        borderRadius: 2,
      }} />

      <div style={{
        opacity: ctaOpacity,
        fontSize: 44,
        color: COLORS.purplePrimary,
        fontWeight: 700,
      }}>
        Try it → app.oobee.tech.gov.sg
      </div>
    </AbsoluteFill>
  );
};
