// src/compositions/OobeeWebLaunchV3.tsx
import React from 'react';
import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from 'remotion';
import { HookSceneV3 } from '../scenes/v3/HookScene';
import { PageScanSceneV2 } from '../scenes/v2/PageScanScene';
import { AnyDomainSceneV2 } from '../scenes/v2/AnyDomainScene';
import { HistorySceneV2 } from '../scenes/v2/HistoryScene';
import { OutroSceneV2 } from '../scenes/v2/OutroScene';

// V3 drops the custom flow scene: 270 + 210 + 210 + 210 + 90 = 990 frames (33s)
export const FRAMES_V3 = {
  scene1Start: 0,
  scene2Start: 270,
  scene3Start: 480,
  scene4Start: 690,
  scene5Start: 900,
  total: 990,
} as const;

const FADE = 10;

const FadeIn: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, FADE], [0, 1], { extrapolateRight: 'clamp' });
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};

const wrap = (Scene: React.FC) => () => <FadeIn><Scene /></FadeIn>;

const PageScanFaded = wrap(PageScanSceneV2);
const AnyDomainFaded = wrap(AnyDomainSceneV2);
const HistoryFaded = wrap(HistorySceneV2);
const OutroFaded = wrap(OutroSceneV2);

export const OobeeWebLaunchV3: React.FC = () => (
  <AbsoluteFill>
    <Sequence from={FRAMES_V3.scene1Start} durationInFrames={FRAMES_V3.scene2Start - FRAMES_V3.scene1Start}>
      <HookSceneV3 />
    </Sequence>
    <Sequence from={FRAMES_V3.scene2Start} durationInFrames={FRAMES_V3.scene3Start - FRAMES_V3.scene2Start}>
      <PageScanFaded />
    </Sequence>
    <Sequence from={FRAMES_V3.scene3Start} durationInFrames={FRAMES_V3.scene4Start - FRAMES_V3.scene3Start}>
      <AnyDomainFaded />
    </Sequence>
    <Sequence from={FRAMES_V3.scene4Start} durationInFrames={FRAMES_V3.scene5Start - FRAMES_V3.scene4Start}>
      <HistoryFaded />
    </Sequence>
    <Sequence from={FRAMES_V3.scene5Start} durationInFrames={FRAMES_V3.total - FRAMES_V3.scene5Start}>
      <OutroFaded />
    </Sequence>
  </AbsoluteFill>
);
