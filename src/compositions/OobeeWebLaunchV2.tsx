// src/compositions/OobeeWebLaunchV2.tsx
import React from 'react';
import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from 'remotion';
import { FRAMES } from '../tokens';
import { HookSceneV2 } from '../scenes/v2/HookScene';
import { PageScanSceneV2 } from '../scenes/v2/PageScanScene';
import { AnyDomainSceneV2 } from '../scenes/v2/AnyDomainScene';
import { HistorySceneV2 } from '../scenes/v2/HistoryScene';
import { CustomFlowSceneV2 } from '../scenes/v2/CustomFlowScene';
import { OutroSceneV2 } from '../scenes/v2/OutroScene';

const FADE = 10;

const FadeIn: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, FADE], [0, 1], { extrapolateRight: 'clamp' });
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};

const wrap = (Scene: React.FC) => () => <FadeIn><Scene /></FadeIn>;

const HookFaded = wrap(HookSceneV2);
const PageScanFaded = wrap(PageScanSceneV2);
const AnyDomainFaded = wrap(AnyDomainSceneV2);
const HistoryFaded = wrap(HistorySceneV2);
const CustomFlowFaded = wrap(CustomFlowSceneV2);
const OutroFaded = wrap(OutroSceneV2);

export const OobeeWebLaunchV2: React.FC = () => (
  <AbsoluteFill>
    <Sequence from={FRAMES.scene1Start} durationInFrames={FRAMES.scene2Start - FRAMES.scene1Start}>
      <HookFaded />
    </Sequence>
    <Sequence from={FRAMES.scene2Start} durationInFrames={FRAMES.scene3Start - FRAMES.scene2Start}>
      <PageScanFaded />
    </Sequence>
    <Sequence from={FRAMES.scene3Start} durationInFrames={FRAMES.scene4Start - FRAMES.scene3Start}>
      <AnyDomainFaded />
    </Sequence>
    <Sequence from={FRAMES.scene4Start} durationInFrames={FRAMES.scene5Start - FRAMES.scene4Start}>
      <HistoryFaded />
    </Sequence>
    <Sequence from={FRAMES.scene5Start} durationInFrames={FRAMES.scene6Start - FRAMES.scene5Start}>
      <CustomFlowFaded />
    </Sequence>
    <Sequence from={FRAMES.scene6Start} durationInFrames={FRAMES.total - FRAMES.scene6Start}>
      <OutroFaded />
    </Sequence>
  </AbsoluteFill>
);
