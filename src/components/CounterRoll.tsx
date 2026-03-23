// src/components/CounterRoll.tsx
import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { COLORS } from '../tokens';
import { fontFamily } from '../font';

interface CounterRollProps {
  from: number;
  to: number;
  durationInFrames: number;
  suffix?: string;
  fontSize?: number;
  color?: string;
}

export const CounterRoll: React.FC<CounterRollProps> = ({
  from,
  to,
  durationInFrames,
  suffix = '',
  fontSize = 120,
  color = COLORS.purplePrimary,
}) => {
  const frame = useCurrentFrame();
  const value = Math.round(
    interpolate(frame, [0, durationInFrames], [from, to], {
      extrapolateRight: 'clamp',
    })
  );

  return (
    <span
      style={{
        fontFamily,
        fontSize,
        fontWeight: 900,
        color,
        letterSpacing: '-4px',
        lineHeight: 1,
      }}
    >
      {value.toLocaleString()}
      {suffix}
    </span>
  );
};
