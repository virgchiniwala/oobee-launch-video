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

interface StepProps {
  number: number;
  title: string;
  subtitle?: string;
  active: boolean;
  opacity?: number;
}

const Step: React.FC<StepProps> = ({ number, title, subtitle, active, opacity = 1 }) => (
  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24, opacity, fontFamily }}>
    <div
      style={{
        width: 48,
        height: 48,
        borderRadius: '50%',
        background: active ? COLORS.purplePrimary : COLORS.borderLight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: active ? '#fff' : COLORS.textMuted,
        fontSize: 22,
        fontWeight: 700,
        flexShrink: 0,
        marginTop: 2,
      }}
    >
      {number}
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 28, fontWeight: 700, color: active ? COLORS.textPrimary : COLORS.textMuted, marginBottom: 4 }}>
        {title}
      </div>
      {subtitle && (
        <div style={{ fontSize: 20, color: COLORS.textSecondary }}>
          {subtitle}
        </div>
      )}
    </div>
  </div>
);

export const StepperFlow: React.FC<StepperFlowProps> = ({
  step1DoneFrame,
  step2StartFrame,
  step2FillDuration,
  step3DoneFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Step 1 checkmark
  const checkScale = spring({
    frame: frame - step1DoneFrame,
    fps,
    config: { stiffness: 200, damping: 14 },
  });
  const step1Done = frame >= step1DoneFrame;

  // Step 2 progress
  const step2Progress = interpolate(
    frame,
    [step2StartFrame, step2StartFrame + step2FillDuration],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const scannedPage = Math.round(step2Progress * 10);
  const step2Active = frame >= step2StartFrame;

  // Step 3 fade
  const step3Opacity = interpolate(
    frame,
    [step3DoneFrame, step3DoneFrame + 15],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <div
      style={{
        background: COLORS.bgCard,
        borderRadius: 20,
        padding: '56px 72px',
        boxShadow: '0 8px 40px rgba(144,33,166,0.12)',
        fontFamily,
        width: 900,
        position: 'relative',
      }}
    >
      {/* Vertical connecting line */}
      <div
        style={{
          position: 'absolute',
          left: 95,
          top: 104,
          width: 2,
          height: 'calc(100% - 160px)',
          background: `linear-gradient(180deg, ${COLORS.purplePrimary}, ${COLORS.borderLight})`,
          opacity: 0.3,
        }}
      />

      {/* Step 1: Log in */}
      <div style={{ marginBottom: 40 }}>
        <Step
          number={1}
          title="Log in to your website"
          subtitle="Start the scan session in a new browser tab"
          active={true}
        />
        {step1Done && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginTop: 12,
              marginLeft: 72,
              transform: `scale(${checkScale})`,
              transformOrigin: 'left center',
            }}
          >
            <Img src={staticFile('check-icon.svg')} style={{ width: 22, height: 22 }} />
            <span style={{ fontSize: 20, color: COLORS.green100, fontWeight: 600 }}>
              Session captured
            </span>
          </div>
        )}
      </div>

      {/* Step 2: Navigate and scan */}
      <div style={{ marginBottom: 40 }}>
        <Step
          number={2}
          title="Navigate and scan"
          subtitle={step2Active ? `Scanning: Page ${scannedPage} of 10` : 'Click "Scan this page" in the control panel'}
          active={step2Active}
        />
        {step2Active && (
          <div style={{ marginTop: 14, marginLeft: 72 }}>
            <ProgressBar progress={step2Progress} height={10} />
          </div>
        )}
      </div>

      {/* Step 3: View report */}
      <div style={{ opacity: step3Opacity }}>
        <Step
          number={3}
          title="View your accessibility report"
          subtitle="Find your report in the Scan Reports section"
          active={step3Opacity > 0.5}
        />
      </div>
    </div>
  );
};
