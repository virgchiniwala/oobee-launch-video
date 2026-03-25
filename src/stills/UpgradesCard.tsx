// src/stills/UpgradesCard.tsx
import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { COLORS } from '../tokens';
import { fontFamily } from '../font';

interface UpgradeProps {
  before: string;
  after: string;
  label: string;
}

const UpgradeCell: React.FC<UpgradeProps> = ({ before, after, label }) => (
  <div style={{
    background: '#fff',
    borderRadius: 16,
    padding: '28px 32px',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    flex: 1,
    boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
  }}>
    <div style={{ fontSize: 17, color: COLORS.textMuted, fontFamily, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>
      {label}
    </div>
    {/* Before */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <span style={{ fontSize: 26, color: COLORS.textSecondary, fontFamily, fontWeight: 600 }}>{before}</span>
        <div style={{
          position: 'absolute', top: '50%', left: 0,
          width: '100%', height: 2.5,
          background: COLORS.red,
          transform: 'translateY(-50%)',
        }} />
      </div>
    </div>
    {/* Arrow + after */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{ fontSize: 24, color: COLORS.purplePrimary, fontWeight: 700 }}>→</span>
      <span style={{ fontSize: 30, fontWeight: 900, color: COLORS.purplePrimary, fontFamily }}>
        {after}
      </span>
    </div>
  </div>
);

export const UpgradesCard: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.bgApp, fontFamily }}>
    {/* Top purple accent bar */}
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: 14,
      background: `linear-gradient(90deg, ${COLORS.purplePrimary}, ${COLORS.purpleDark})`,
    }} />

    <div style={{
      position: 'absolute', inset: 0,
      padding: '48px 72px',
      display: 'flex', flexDirection: 'column', gap: 24,
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 18, color: COLORS.purplePrimary, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6 }}>
            Oobee Web
          </div>
          <div style={{ fontSize: 52, fontWeight: 900, color: COLORS.textPrimary, letterSpacing: -1 }}>
            What's new in v1
          </div>
        </div>
        <div style={{ overflow: 'hidden', height: 44, display: 'flex', alignItems: 'flex-start' }}>
          <Img src={staticFile('logo-oobee-full-colour-FPA-110x40.svg')} style={{ width: 160 }} />
        </div>
      </div>

      {/* 2×2 upgrade grid */}
      <div style={{ display: 'flex', gap: 20, flex: 1 }}>
        <UpgradeCell label="Page limit" before="100 pages" after="1,000 pages" />
        <UpgradeCell label="Domains" before="gov.sg only" after="Any domain" />
      </div>
      <div style={{ display: 'flex', gap: 20, flex: 1 }}>
        <UpgradeCell label="Report history" before="7 days" after="2 months" />
        <UpgradeCell label="Scan type" before="No custom flows" after="Post-login flows" />
      </div>

      {/* Footer CTA */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center',
          background: COLORS.purplePrimary, borderRadius: 999,
          padding: '12px 32px',
        }}>
          <span style={{ fontSize: 22, color: '#fff', fontWeight: 700, fontFamily }}>
            Try it → app.oobee.tech.gov.sg
          </span>
        </div>
      </div>
    </div>
  </AbsoluteFill>
);
