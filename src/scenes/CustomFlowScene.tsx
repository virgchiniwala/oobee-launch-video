// src/scenes/CustomFlowScene.tsx
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
import { StepperFlow } from '../components/StepperFlow';

export const CustomFlowScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardY = interpolate(
    spring({ frame, fps, config: { stiffness: 100, damping: 16 } }),
    [0, 1],
    [80, 0]
  );

  const overlayOpacity = interpolate(frame, [200, 230], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{ background: COLORS.bgApp, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 60 }}
    >
      <div style={{ transform: `translateY(${cardY}px)` }}>
        <StepperFlow
          step1DoneFrame={30}
          step2StartFrame={60}
          step2FillDuration={100}
          step3DoneFrame={180}
        />
      </div>

      <div
        style={{
          fontSize: 52,
          fontWeight: 900,
          color: COLORS.purplePrimary,
          fontFamily,
          opacity: overlayOpacity,
          letterSpacing: -1,
        }}
      >
        Behind the login. Finally.
      </div>
    </AbsoluteFill>
  );
};
