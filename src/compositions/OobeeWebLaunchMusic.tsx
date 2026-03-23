// src/compositions/OobeeWebLaunchMusic.tsx
import React from 'react';
import { AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { FRAMES } from '../tokens';
import { OobeeWebLaunch } from './OobeeWebLaunch';

export const OobeeWebLaunchMusic: React.FC = () => {
  const frame = useCurrentFrame();

  // Fade out last 3s (frames 1170–1260)
  const volume = interpolate(
    frame,
    [0, FRAMES.scene6Start + 30, FRAMES.total],
    [0.4, 0.4, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill>
      <Audio
        src={staticFile('background-track.mp3')}
        volume={volume}
      />
      <OobeeWebLaunch />
    </AbsoluteFill>
  );
};
