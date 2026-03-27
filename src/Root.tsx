// src/Root.tsx
import React from 'react';
import { Composition, Still } from 'remotion';
import { OobeeWebLaunch } from './compositions/OobeeWebLaunch';
import { OobeeWebLaunchMusic } from './compositions/OobeeWebLaunchMusic';
import { OobeeWebLaunchV2 } from './compositions/OobeeWebLaunchV2';
import { OobeeWebLaunchMusicV2 } from './compositions/OobeeWebLaunchMusicV2';
import { OobeeWebLaunchV3, FRAMES_V3 } from './compositions/OobeeWebLaunchV3';
import { OobeeWebLaunchMusicV3 } from './compositions/OobeeWebLaunchMusicV3';
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
    <Composition
      id="OobeeWebLaunchSilentV2"
      component={OobeeWebLaunchV2}
      durationInFrames={FRAMES.total}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="OobeeWebLaunchMusicV2"
      component={OobeeWebLaunchMusicV2}
      durationInFrames={FRAMES.total}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="OobeeWebLaunchSilentV3"
      component={OobeeWebLaunchV3}
      durationInFrames={FRAMES_V3.total}
      fps={30}
      width={1920}
      height={1080}
    />
    <Composition
      id="OobeeWebLaunchMusicV3"
      component={OobeeWebLaunchMusicV3}
      durationInFrames={FRAMES_V3.total}
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
