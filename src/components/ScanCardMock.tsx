// src/components/ScanCardMock.tsx
import React from 'react';
import { COLORS } from '../tokens';
import { fontFamily } from '../font';

interface ScanCardMockProps {
  siteName: string;
  siteUrl: string;
  date: string; // e.g. "22 Mar 2025"
  muted?: boolean;
}

export const ScanCardMock: React.FC<ScanCardMockProps> = ({
  siteName,
  siteUrl,
  date,
  muted = false,
}) => {
  const textColor = muted ? COLORS.textMuted : COLORS.textPrimary;
  const borderColor = muted ? COLORS.borderLight : COLORS.purplePrimary;

  return (
    <div
      style={{
        background: COLORS.bgCard,
        borderRadius: 12,
        border: `1px solid ${borderColor}`,
        padding: '20px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily,
        boxShadow: muted ? 'none' : '0 4px 16px rgba(144,33,166,0.1)',
        opacity: muted ? 0.5 : 1,
      }}
    >
      <div>
        <div style={{ fontSize: 20, fontWeight: 700, color: textColor, marginBottom: 4 }}>
          {siteName}
        </div>
        <div style={{ fontSize: 16, color: COLORS.textSecondary, marginBottom: 8 }}>
          {siteUrl}
        </div>
        <div
          style={{
            display: 'inline-flex',
            background: COLORS.badgeBg,
            color: COLORS.badgeText,
            borderRadius: 8,
            padding: '4px 8px',
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          {date}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, opacity: muted ? 0 : 1 }}>
        <div
          style={{
            background: 'transparent',
            border: `1px solid ${COLORS.purplePrimary}`,
            borderRadius: 6,
            padding: '8px 16px',
            fontSize: 14,
            color: COLORS.purplePrimary,
            fontFamily,
          }}
        >
          Download
        </div>
        <div
          style={{
            background: COLORS.purplePrimary,
            borderRadius: 6,
            padding: '8px 16px',
            fontSize: 14,
            color: '#fff',
            fontFamily,
          }}
        >
          View report
        </div>
      </div>
    </div>
  );
};
