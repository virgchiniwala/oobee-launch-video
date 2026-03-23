// src/components/StepperFlow.tsx
import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig, Img, staticFile } from 'remotion';
import { COLORS } from '../tokens';
import { fontFamily } from '../font';
import { ProgressBar } from './ProgressBar';

interface StepperFlowProps {
  step1DoneFrame: number;
  step2StartFrame: number;
  step2FillDuration: number;
  step3DoneFrame: number;
}

export const StepperFlow: React.FC<StepperFlowProps> = ({
  step1DoneFrame,
  step2StartFrame,
  step2FillDuration,
  step3DoneFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const checkScale = spring({
    frame: frame - step1DoneFrame,
    fps,
    config: { stiffness: 200, damping: 14 },
  });

  const step2Progress = interpolate(
    frame,
    [step2StartFrame, step2StartFrame + step2FillDuration],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const scannedPage = Math.round(step2Progress * 10);

  const step3Opacity = interpolate(
    frame,
    [step3DoneFrame, step3DoneFrame + 15],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const stepCircle = (num: number, active: boolean) => (
    <div
      style={{
        width: 36,
        height: 36,
        borderRadius: '50%',
        background: active ? COLORS.purplePrimary : COLORS.borderLight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: active ? '#fff' : COLORS.textMuted,
        fontSize: 16,
        fontWeight: 700,
        fontFamily,
        flexShrink: 0,
      }}
    >
      {num}
    </div>
  );

  return (
    <div
      style={{
        background: COLORS.bgCard,
        borderRadius: 16,
        padding: '32px 40px',
        boxShadow: '0 4px 24px rgba(144,33,166,0.12)',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        fontFamily,
        width: 640,
      }}
    >
      {/* Step 1 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {stepCircle(1, true)}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 22, fontWeight: 600, color: COLORS.textPrimary }}>
            Log in to your website
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginTop: 4,
              transform: `scale(${checkScale})`,
              transformOrigin: 'left center',
            }}
          >
            <Img src={staticFile('check-icon.svg')} style={{ width: 18, height: 18 }} />
            <span style={{ fontSize: 16, color: COLORS.green100 }}>Session captured</span>
          </div>
        </div>
      </div>

      {/* Step 2 */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
        {stepCircle(2, true)}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 22, fontWeight: 600, color: COLORS.textPrimary, marginBottom: 10 }}>
            Select pages to scan
          </div>
          <ProgressBar progress={step2Progress} height={8} />
          <div style={{ fontSize: 16, color: COLORS.purplePrimary, marginTop: 6 }}>
            Scanning: Page {scannedPage} of 10
          </div>
        </div>
      </div>

      {/* Step 3 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          opacity: step3Opacity,
        }}
      >
        {stepCircle(3, step3Opacity > 0.5)}
        <div style={{ fontSize: 22, fontWeight: 600, color: step3Opacity > 0.5 ? COLORS.textPrimary : COLORS.textMuted }}>
          View accessibility report
        </div>
      </div>
    </div>
  );
};
