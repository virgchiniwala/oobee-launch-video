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

const URL_TEXT = 'https://wogaa.sg/login';

export const CustomFlowScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Card slides up from bottom
  const cardY = interpolate(
    spring({ frame, fps, config: { stiffness: 100, damping: 16 } }),
    [0, 1],
    [120, 0]
  );
  const cardOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Tab toggle: Post-login activates at frame 35
  const postLoginActive = frame >= 35;
  const toggleProgress = interpolate(frame, [30, 45], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Typewriter for URL (frames 60 → 150)
  const urlProgress = interpolate(frame, [60, 150], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const visibleChars = Math.floor(urlProgress * URL_TEXT.length);
  const typedUrl = URL_TEXT.slice(0, visibleChars);
  const showCursor = frame >= 60 && frame <= 155;

  // Input field highlight when typing
  const inputBorderOpacity = interpolate(frame, [58, 65], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Scan button pulse at frame 175
  const buttonPulse = spring({
    frame: frame - 170,
    fps,
    config: { stiffness: 300, damping: 10 },
  });
  const buttonScale = frame >= 170
    ? 1 + buttonPulse * 0.06 * Math.max(0, 1 - (frame - 170) / 20)
    : 1;

  // Overlay caption fades in at frame 210
  const overlayOpacity = interpolate(frame, [210, 240], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const preLoginBg = `rgba(144,33,166,${1 - toggleProgress})`;
  const preLoginColor = `rgba(255,255,255,${1 - toggleProgress})`;
  const postLoginBg = `rgba(144,33,166,${toggleProgress})`;
  const postLoginColor = `rgba(255,255,255,${toggleProgress})`;
  const preLoginTextColor = interpolate(toggleProgress, [0, 1], [255, 144]);

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bgApp,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 60,
      }}
    >
      {/* The scan form card */}
      <div
        style={{
          opacity: cardOpacity,
          transform: `translateY(${cardY}px)`,
          background: COLORS.bgCard,
          borderRadius: 16,
          padding: '64px 80px',
          boxShadow: '0 8px 48px rgba(0,0,0,0.10)',
          width: 1100,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 36,
          fontFamily,
        }}
      >
        {/* Pre-login / Post-login toggle */}
        <div
          style={{
            display: 'flex',
            background: '#f0f0f0',
            borderRadius: 999,
            padding: 4,
            gap: 4,
          }}
        >
          {/* Pre-login tab */}
          <div
            style={{
              padding: '14px 36px',
              borderRadius: 999,
              fontSize: 24,
              fontWeight: 600,
              fontFamily,
              background: postLoginActive ? 'transparent' : COLORS.purplePrimary,
              color: postLoginActive ? COLORS.textSecondary : '#fff',
              transition: 'none',
            }}
          >
            Pre-login Scan
          </div>
          {/* Post-login tab */}
          <div
            style={{
              padding: '14px 36px',
              borderRadius: 999,
              fontSize: 24,
              fontWeight: 600,
              fontFamily,
              background: postLoginActive ? COLORS.purplePrimary : 'transparent',
              color: postLoginActive ? '#fff' : COLORS.textSecondary,
            }}
          >
            Post-login Scan
          </div>
        </div>

        {/* Heading */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 52, fontWeight: 900, color: COLORS.textPrimary, letterSpacing: -1, fontFamily }}>
            🔑 Scan pages behind a login
          </div>
          <div
            style={{
              marginTop: 14,
              fontSize: 26,
              color: COLORS.purplePrimary,
              fontWeight: 500,
              fontFamily,
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
          >
            ⓘ How does it work?
          </div>
        </div>

        {/* URL input */}
        <div
          style={{
            width: '100%',
            border: `2px solid ${inputBorderOpacity > 0.5 ? COLORS.purplePrimary : '#dededd'}`,
            borderRadius: 999,
            padding: '20px 36px',
            fontSize: 28,
            color: typedUrl ? COLORS.textPrimary : COLORS.textMuted,
            fontFamily,
            background: '#fff',
            boxShadow: inputBorderOpacity > 0.5 ? `0 0 0 3px rgba(144,33,166,0.15)` : 'none',
            minHeight: 72,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span style={{ color: typedUrl ? COLORS.textPrimary : COLORS.textMuted }}>
            {typedUrl || 'https://'}
          </span>
          {showCursor && (
            <span style={{ display: 'inline-block', width: 2, height: 30, background: COLORS.purplePrimary, marginLeft: 2, verticalAlign: 'middle' }} />
          )}
        </div>

        {/* Advanced scan options */}
        <div
          style={{
            fontSize: 24,
            color: COLORS.purplePrimary,
            fontWeight: 500,
            fontFamily,
            textDecoration: 'underline',
            borderBottom: `2px solid ${COLORS.purplePrimary}`,
            paddingBottom: 2,
          }}
        >
          Advanced scan options ↓
        </div>

        {/* Scan button */}
        <div
          style={{
            background: COLORS.purplePrimary,
            color: '#fff',
            borderRadius: 999,
            padding: '22px 72px',
            fontSize: 28,
            fontWeight: 700,
            fontFamily,
            transform: `scale(${buttonScale})`,
            boxShadow: frame >= 170 ? `0 4px 24px rgba(144,33,166,0.4)` : 'none',
          }}
        >
          Scan now
        </div>

        {/* Disclaimer */}
        <div style={{ fontSize: 20, color: COLORS.textMuted, fontFamily, textAlign: 'center' }}>
          No sensitive data during this scan will be saved.
        </div>
      </div>

      {/* Overlay caption */}
      <div
        style={{
          fontSize: 68,
          fontWeight: 900,
          color: COLORS.purplePrimary,
          fontFamily,
          opacity: overlayOpacity,
          letterSpacing: -2,
          textAlign: 'center',
        }}
      >
        Scan behind login pages. Finally.
      </div>
    </AbsoluteFill>
  );
};
