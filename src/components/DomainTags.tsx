// src/components/DomainTags.tsx
import React from 'react';
import { spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { COLORS } from '../tokens';
import { fontFamily } from '../font';

interface TagProps {
  label: string;
  bg: string;
  textColor: string;
  delayFrames: number;
}

const Tag: React.FC<TagProps> = ({ label, bg, textColor, delayFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: frame - delayFrames,
    fps,
    config: { stiffness: 200, damping: 16 },
  });
  const opacity = interpolate(frame, [delayFrames, delayFrames + 6], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        display: 'inline-flex',
        background: bg,
        color: textColor,
        borderRadius: 24,
        padding: '8px 20px',
        fontSize: 22,
        fontWeight: 700,
        fontFamily,
        transform: `scale(${scale})`,
        opacity,
        transformOrigin: 'center center',
      }}
    >
      {label}
    </div>
  );
};

export const DomainTags: React.FC = () => (
  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
    <Tag
      label="✓ .gov.sg"
      bg={COLORS.green50}
      textColor={COLORS.green150}
      delayFrames={10}
    />
    <Tag
      label=".com, .org, .net & more"
      bg={COLORS.green50}
      textColor={COLORS.green150}
      delayFrames={25}
    />
  </div>
);
