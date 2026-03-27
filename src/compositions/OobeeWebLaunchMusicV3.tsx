// src/compositions/OobeeWebLaunchMusicV3.tsx
import React from 'react';
import { AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { FRAMES_V3, OobeeWebLaunchV3 } from './OobeeWebLaunchV3';

export const OobeeWebLaunchMusicV3: React.FC = () => {
  const frame = useCurrentFrame();

  // Fade out over the outro (last ~3s)
  const volume = interpolate(
    frame,
    [0, FRAMES_V3.scene5Start + 30, FRAMES_V3.total],
    [0.4, 0.4, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill>
      <Audio
        src={staticFile('background-track.mp3')}
        volume={volume}
      />
      <OobeeWebLaunchV3 />
    </AbsoluteFill>
  );
};
