// src/scenes/OutroScene.tsx
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
import { OobeeLogo } from '../components/OobeeLogo';

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [20, 38], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const dividerScale = interpolate(
    spring({ frame: frame - 30, fps, config: { stiffness: 80, damping: 14 } }),
    [0, 1],
    [0, 1]
  );

  const ctaOpacity = interpolate(frame, [45, 68], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bgCard,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 32,
        fontFamily,
      }}
    >
      <OobeeLogo width={320} />

      <div style={{ opacity: titleOpacity, fontSize: 72, fontWeight: 700, color: COLORS.textPrimary, letterSpacing: -1 }}>
        Oobee Web v1 is live
      </div>

      <div
        style={{
          width: 200,
          height: 4,
          background: `linear-gradient(90deg, ${COLORS.purplePrimary}, ${COLORS.purpleDark})`,
          transformOrigin: 'left center',
          transform: `scaleX(${dividerScale})`,
          borderRadius: 2,
        }}
      />

      <div
        style={{
          opacity: ctaOpacity,
          fontSize: 40,
          color: COLORS.purplePrimary,
          fontWeight: 600,
        }}
      >
        Try it → app.oobee.tech.gov.sg
      </div>
    </AbsoluteFill>
  );
};
