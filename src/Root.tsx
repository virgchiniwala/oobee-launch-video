// src/Root.tsx
import React from 'react';
import { Composition, Still } from 'remotion';
import { OobeeWebLaunch } from './compositions/OobeeWebLaunch';
import { OobeeWebLaunchMusic } from './compositions/OobeeWebLaunchMusic';
import { AnnouncementCard } from './stills/AnnouncementCard';
import { UpgradesCard } from './stills/UpgradesCard';
import { FRAMES } from './tokens';
import './font'; // ensure font is loaded

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="OobeeWebLaunchSilent"
      component={OobeeWebLaunch}
      durationInFrames={FRAMES.total}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="OobeeWebLaunchMusic"
      component={OobeeWebLaunchMusic}
      durationInFrames={FRAMES.total}
      fps={30}
      width={1920}
      height={1080}
    />
    <Still
      id="AnnouncementCard"
      component={AnnouncementCard}
      width={1200}
      height={628}
    />
    <Still
      id="UpgradesCard"
      component={UpgradesCard}
      width={1200}
      height={628}
    />
  </>
);
