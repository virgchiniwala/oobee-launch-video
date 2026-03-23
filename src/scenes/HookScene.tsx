// src/scenes/HookScene.tsx
import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { COLORS } from '../tokens';
import { fontFamily } from '../font';
import { OobeeLogo } from '../components/OobeeLogo';
import { StrikeThrough } from '../components/StrikeThrough';

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Beat 1: logo fade
  const logoOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const logoY = interpolate(
    spring({ frame, fps, config: { stiffness: 80, damping: 16 } }),
    [0, 1],
    [-20, 0]
  );

  // Beat 1: giant "100" scale up
  const hundredScale = interpolate(
    spring({ frame: frame - 20, fps, config: { stiffness: 80, damping: 14 } }),
    [0, 1],
    [0.5, 1]
  );
  const hundredOpacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Beat 2: purple wipe bar
  const wipeWidth = interpolate(frame, [60, 70], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });

  // Beat 2: "100" fades out as wipe passes
  const hundredExitOpacity = interpolate(frame, [62, 68], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Beat 2: "1,000" counter rolls in
  const thousandValue = Math.round(
    interpolate(frame, [70, 120], [100, 1000], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );
  const thousandOpacity = interpolate(frame, [68, 78], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Beat 2: label transition
  const labelBeforeOpacity = interpolate(frame, [62, 68], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const labelAfterOpacity = interpolate(frame, [68, 78], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Beat 3: glow on "1,000"
  const glow = interpolate(frame, [120, 130], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ background: COLORS.bgCard, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

      {/* Logo */}
      <div style={{ position: 'absolute', top: 60, opacity: logoOpacity, transform: `translateY(${logoY}px)` }}>
        <OobeeLogo width={180} />
      </div>

      {/* Giant number area */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 60 }}>
        {/* Labels */}
        <div style={{ position: 'absolute', opacity: labelBeforeOpacity, fontFamily, fontSize: 22, color: COLORS.textMuted, letterSpacing: 4, marginBottom: 16, textTransform: 'uppercase' }}>
          Beta — pages per scan
        </div>
        <div style={{ position: 'absolute', opacity: labelAfterOpacity, fontFamily, fontSize: 22, color: COLORS.purplePrimary, letterSpacing: 4, marginBottom: 16, textTransform: 'uppercase', fontWeight: 700 }}>
          V1 — pages per scan
        </div>

        {/* The number */}
        <div style={{ marginTop: 40 }}>
          {/* "100" exits during wipe */}
          <div style={{ opacity: hundredExitOpacity * hundredOpacity, transform: `scale(${hundredScale})`, position: 'absolute' }}>
            <span style={{ fontFamily, fontSize: 200, fontWeight: 900, color: COLORS.textDisabled, letterSpacing: -8, lineHeight: 1 }}>
              100
            </span>
          </div>

          {/* "1,000" enters after wipe */}
          <div style={{ opacity: thousandOpacity }}>
            <span style={{
              fontFamily,
              fontSize: 200,
              fontWeight: 900,
              color: COLORS.purplePrimary,
              letterSpacing: -8,
              lineHeight: 1,
              textShadow: `0 0 ${glow * 60}px rgba(144,33,166,0.4)`,
            }}>
              {thousandValue.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Beat 3: Strike-through rows */}
      <div style={{ position: 'absolute', bottom: 160, left: 200, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Sequence from={120}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <StrikeThrough before="gov.sg only" after="Scan any domain" strikeStartFrame={0} afterStartFrame={14} fontSize={34} />
            <Sequence from={40}>
              <StrikeThrough before="7 days of reports" after="2 months of reports" strikeStartFrame={0} afterStartFrame={14} fontSize={34} />
            </Sequence>
            <Sequence from={80}>
              <StrikeThrough before="No custom flows" after="Post-login custom flows" strikeStartFrame={0} afterStartFrame={14} fontSize={34} />
            </Sequence>
          </div>
        </Sequence>
      </div>

      {/* Purple wipe overlay */}
      <AbsoluteFill style={{ pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: `${wipeWidth}%`,
          background: COLORS.purplePrimary,
        }} />
      </AbsoluteFill>

    </AbsoluteFill>
  );
};
