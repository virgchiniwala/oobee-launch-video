# Oobee Web v1 — Launch Video

A 42-second product launch video for **Oobee Web v1**, built with [Remotion](https://www.remotion.dev). Showcases the four key upgrades from Beta through animated UI components that mirror the real app.

## What it covers

| Scene | Feature | Duration |
|---|---|---|
| Hook | 100 → 1,000 pages · strike-through upgrade reveal | 0–9s |
| Feature 1 | 1,000 page scans with live progress | 9–16s |
| Feature 2 | Scan any domain — gov.sg, .com, .org, .net & more | 16–23s |
| Feature 3 | 2 months of report history (up from 7 days) | 23–30s |
| Feature 4 | Post-login custom flow scans | 30–39s |
| Outro | Logo + CTA → app.oobee.tech.gov.sg | 39–42s |

## Deliverables

| File | Description |
|---|---|
| `out/oobee-web-v1-launch-silent.mp4` | Version A — no audio (primary, Slack autoplay) |
| `out/oobee-web-v1-launch-music.mp4` | Version B — background music |
| `out/oobee-web-v1-thumbnail.png` | Still export of frame 1259 |

Render outputs are gitignored. Run the render commands below to generate them locally.

## Setup

```bash
npm i
```

## Preview

```bash
npm run dev
```

Opens the Remotion Studio at `localhost:3000`.

## Render

**Version A (silent):**
```bash
npx remotion render src/index.ts OobeeWebLaunchSilent out/oobee-web-v1-launch-silent.mp4 \
  --codec=h264 --crf=18 --pixel-format=yuv420p
```

**Version B (with music):**
```bash
npx remotion render src/index.ts OobeeWebLaunchMusic out/oobee-web-v1-launch-music.mp4 \
  --codec=h264 --crf=18 --pixel-format=yuv420p
```

**Thumbnail (frame 1259):**
```bash
npx remotion still src/index.ts OobeeWebLaunchSilent out/oobee-web-v1-thumbnail.png \
  --frame=1259
```

## Tech

- **Remotion 4.x** — React-based video framework
- **Font** — Atkinson Hyperlegible Next (local woff2, matches Oobee design system)
- **Design tokens** — pulled directly from `oobee-web-frontend/src/styles/index.css`
- **Format** — 1920×1080 · 30fps · 42s (1,260 frames)
