// src/components/ProgressBar.tsx
import React from 'react';
import { COLORS } from '../tokens';

interface ProgressBarProps {
  /** 0 to 1 */
  progress: number;
  height?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 8,
}) => (
  <div
    style={{
      width: '100%',
      height,
      background: '#e5e7eb',
      borderRadius: height / 2,
      overflow: 'hidden',
    }}
  >
    <div
      style={{
        height: '100%',
        width: `${Math.min(progress * 100, 100)}%`,
        background: `linear-gradient(90deg, ${COLORS.progressBarFill1}, ${COLORS.progressBarFill2})`,
        borderRadius: height / 2,
      }}
    />
  </div>
);
