// src/scenes/v2/HookScene.tsx
import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { COLORS } from '../../tokens';
import { fontFamily } from '../../font';
import { StrikeThrough } from '../../components/StrikeThrough';

export const HookSceneV2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo fade
  const logoOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const logoY = interpolate(
    spring({ frame, fps, config: { stiffness: 80, damping: 16 } }),
    [0, 1], [-20, 0]
  );

  // "100" scale + opacity
  const hundredScale = interpolate(
    spring({ frame: frame - 20, fps, config: { stiffness: 80, damping: 14 } }),
    [0, 1], [0.5, 1]
  );
  const hundredOpacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Purple wipe: grow 0→100% (60–76), slide off (76–92)
  const wipeWidth = interpolate(frame, [60, 76], [0, 100], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });
  const wipeTranslateX = interpolate(frame, [76, 92], [0, 100], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // "100" exits during wipe
  const hundredExitOpacity = interpolate(frame, [62, 74], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // "1,000" counter
  const thousandValue = Math.round(
    interpolate(frame, [80, 130], [100, 1000], {
      extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    })
  );
  const thousandOpacity = interpolate(frame, [76, 90], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Label transition
  const labelBeforeOpacity = interpolate(frame, [62, 74], [1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const labelAfterOpacity = interpolate(frame, [76, 90], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Glow
  const glow = interpolate(frame, [130, 145], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const numStyle: React.CSSProperties = {
    fontFamily,
    fontSize: 280,
    fontWeight: 900,
    letterSpacing: -8,
    lineHeight: 1,
    fontFeatureSettings: '"zero" 0',
  };

  return (
    <AbsoluteFill style={{ background: COLORS.bgCard, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

      {/* Logo — pinned top-left, clipped to hide subtitle */}
      <div style={{ position: 'absolute', top: 60, left: 80, opacity: logoOpacity, transform: `translateY(${logoY}px)`, overflow: 'hidden', height: 50 }}>
        <Img src={staticFile('logo-oobee-full-colour-FPA-110x40.svg')} style={{ width: 180 }} />
      </div>

      {/* Centre column */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>

        {/* Label */}
        <div style={{ position: 'relative', height: 48, marginBottom: 12 }}>
          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', opacity: labelBeforeOpacity, fontFamily, fontSize: 32, color: COLORS.textMuted, letterSpacing: 4, textTransform: 'uppercase' }}>
            Beta — pages per scan
          </div>
          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', opacity: labelAfterOpacity, fontFamily, fontSize: 32, color: COLORS.purplePrimary, letterSpacing: 4, textTransform: 'uppercase', fontWeight: 700 }}>
            V1 — pages per scan
          </div>
        </div>

        {/* Number — fixed height container so layout doesn't jump */}
        <div style={{ position: 'relative', height: 300, width: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 60 }}>
          <div style={{ position: 'absolute', opacity: hundredExitOpacity * hundredOpacity, transform: `scale(${hundredScale})` }}>
            <span style={{ ...numStyle, color: COLORS.textDisabled }}>100</span>
          </div>
          <div style={{ position: 'absolute', opacity: thousandOpacity }}>
            <span style={{
              ...numStyle,
              color: COLORS.purplePrimary,
              textShadow: `0 0 ${glow * 60}px rgba(144,33,166,0.4)`,
            }}>
              {thousandValue >= 1000 ? '1,000' : thousandValue.toString()}
            </span>
          </div>
        </div>

        {/* Strike-throughs — centred column */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 36 }}>
          <Sequence from={100} layout="none">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 36 }}>
              <StrikeThrough before="gov.sg only" after="Scan any domain" strikeStartFrame={0} afterStartFrame={14} fontSize={52} />
              <Sequence from={40} layout="none">
                <StrikeThrough before="7 days of reports" after="2 months of reports" strikeStartFrame={0} afterStartFrame={14} fontSize={52} />
              </Sequence>
              <Sequence from={80} layout="none">
                <StrikeThrough before="No custom flows" after="Post-login custom flows" strikeStartFrame={0} afterStartFrame={14} fontSize={52} />
              </Sequence>
            </div>
          </Sequence>
        </div>
      </div>

      {/* Purple wipe overlay */}
      <AbsoluteFill style={{ pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, height: '100%',
          width: `${wipeWidth}%`,
          background: COLORS.purplePrimary,
          transform: `translateX(${wipeTranslateX}%)`,
        }} />
      </AbsoluteFill>

    </AbsoluteFill>
  );
};
