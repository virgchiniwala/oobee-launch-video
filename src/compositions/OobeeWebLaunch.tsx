// src/compositions/OobeeWebLaunch.tsx
import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { FRAMES } from '../tokens';
import { HookScene } from '../scenes/HookScene';
import { PageScanScene } from '../scenes/PageScanScene';
import { AnyDomainScene } from '../scenes/AnyDomainScene';
import { HistoryScene } from '../scenes/HistoryScene';
import { CustomFlowScene } from '../scenes/CustomFlowScene';
import { OutroScene } from '../scenes/OutroScene';

export const OobeeWebLaunch: React.FC = () => (
  <AbsoluteFill>
    <Sequence from={FRAMES.scene1Start} durationInFrames={FRAMES.scene2Start - FRAMES.scene1Start}>
      <HookScene />
    </Sequence>
    <Sequence from={FRAMES.scene2Start} durationInFrames={FRAMES.scene3Start - FRAMES.scene2Start}>
      <PageScanScene />
    </Sequence>
    <Sequence from={FRAMES.scene3Start} durationInFrames={FRAMES.scene4Start - FRAMES.scene3Start}>
      <AnyDomainScene />
    </Sequence>
    <Sequence from={FRAMES.scene4Start} durationInFrames={FRAMES.scene5Start - FRAMES.scene4Start}>
      <HistoryScene />
    </Sequence>
    <Sequence from={FRAMES.scene5Start} durationInFrames={FRAMES.scene6Start - FRAMES.scene5Start}>
      <CustomFlowScene />
    </Sequence>
    <Sequence from={FRAMES.scene6Start} durationInFrames={FRAMES.total - FRAMES.scene6Start}>
      <OutroScene />
    </Sequence>
  </AbsoluteFill>
);
