// src/components/StrikeThrough.tsx
import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS } from '../tokens';
import { fontFamily } from '../font';

interface StrikeThroughProps {
  before: string;
  after: string;
  /** Frame within this component's local timeline to start the strike animation */
  strikeStartFrame?: number;
  /** Frame within this component's local timeline to start the after-text reveal */
  afterStartFrame?: number;
  fontSize?: number;
}

export const StrikeThrough: React.FC<StrikeThroughProps> = ({
  before,
  after,
  strikeStartFrame = 10,
  afterStartFrame = 20,
  fontSize = 36,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Red line scaleX 0→1
  const strikeScale = interpolate(
    frame,
    [strikeStartFrame, strikeStartFrame + 12],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // After-text spring slide in from right
  const afterX = interpolate(
    spring({ frame: frame - afterStartFrame, fps, config: { stiffness: 120, damping: 14 } }),
    [0, 1],
    [60, 0]
  );
  const afterOpacity = interpolate(
    frame,
    [afterStartFrame, afterStartFrame + 8],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontFamily, fontSize }}>
      {/* Before: grey + strikethrough */}
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <span style={{ color: COLORS.textDisabled }}>{before}</span>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            height: 3,
            width: '100%',
            background: COLORS.red,
            transformOrigin: 'left center',
            transform: `scaleX(${strikeScale})`,
          }}
        />
      </div>

      {/* Arrow */}
      <span style={{ color: COLORS.borderLight, fontSize: fontSize * 0.8 }}>→</span>

      {/* After: purple, slides in */}
      <span
        style={{
          color: COLORS.purplePrimary,
          fontWeight: 700,
          transform: `translateX(${afterX}px)`,
          opacity: afterOpacity,
        }}
      >
        {after}
      </span>
    </div>
  );
};
