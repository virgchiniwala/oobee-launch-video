// src/components/OobeeLogo.tsx
import React from 'react';
import { spring, useCurrentFrame, useVideoConfig, Img, staticFile, interpolate } from 'remotion';

interface OobeeLogoProps {
  width?: number;
}

export const OobeeLogo: React.FC<OobeeLogoProps> = ({ width = 220 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = interpolate(
    spring({ frame, fps, config: { stiffness: 100, damping: 14 } }),
    [0, 1],
    [0.8, 1]
  );
  const opacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <Img
      src={staticFile('logo-oobee-full-colour-FPA-110x40.svg')}
      style={{
        width,
        transform: `scale(${scale})`,
        opacity,
      }}
    />
  );
};
