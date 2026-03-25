// src/stills/AnnouncementCard.tsx
import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { COLORS } from '../tokens';
import { fontFamily } from '../font';

const Feature: React.FC<{ text: string }> = ({ text }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
    <div style={{
      width: 28, height: 28, borderRadius: '50%',
      background: 'rgba(255,255,255,0.2)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 16, color: '#fff', flexShrink: 0,
    }}>✓</div>
    <span style={{ fontSize: 26, color: 'rgba(255,255,255,0.92)', fontFamily, fontWeight: 500 }}>
      {text}
    </span>
  </div>
);

export const AnnouncementCard: React.FC = () => (
  <AbsoluteFill style={{ fontFamily }}>
    {/* Purple gradient background */}
    <div style={{
      position: 'absolute', inset: 0,
      background: `linear-gradient(135deg, #6b0f7a 0%, ${COLORS.purplePrimary} 45%, #b040c9 100%)`,
    }} />

    {/* Subtle dot pattern overlay */}
    <div style={{
      position: 'absolute', inset: 0,
      backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
      backgroundSize: '32px 32px',
    }} />

    {/* Content */}
    <div style={{
      position: 'absolute', inset: 0,
      padding: '56px 80px',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
    }}>
      {/* Top: Logo — clipped to hide subtitle */}
      <div style={{ overflow: 'hidden', height: 52, display: 'flex', alignItems: 'flex-start' }}>
        <Img src={staticFile('logo-oobee-full-colour-FPA-110x40.svg')} style={{ width: 180, filter: 'brightness(0) invert(1)' }} />
      </div>

      {/* Middle: Headline */}
      <div>
        <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.15)', borderRadius: 8, padding: '6px 18px', marginBottom: 20 }}>
          <span style={{ fontSize: 22, color: 'rgba(255,255,255,0.85)', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>
            v1 Launch
          </span>
        </div>
        <div style={{ fontSize: 80, fontWeight: 900, color: '#fff', lineHeight: 1.05, letterSpacing: -2, marginBottom: 36 }}>
          Oobee Web<br />v1 is live.
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Feature text="1,000 pages per scan (10× more than Beta)" />
          <Feature text="Scan any domain — .gov.sg, .com, .org & more" />
          <Feature text="2 months of report history" />
          <Feature text="Post-login custom flows" />
        </div>
      </div>

      {/* Bottom: CTA */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 10,
        background: '#fff', borderRadius: 999,
        padding: '18px 44px', alignSelf: 'flex-start',
      }}>
        <span style={{ fontSize: 28, fontWeight: 700, color: COLORS.purplePrimary }}>
          Try it → app.oobee.tech.gov.sg
        </span>
      </div>
    </div>
  </AbsoluteFill>
);
