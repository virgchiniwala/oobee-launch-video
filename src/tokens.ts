// src/tokens.ts
export const COLORS = {
  purplePrimary: '#9021a6',   // --a11y-purple-100-light
  purpleDark: '#d54dff',       // --a11y-purple-100-dark
  purpleHighlight: '#c000e5',  // --a11y-purple-highlight
  purple50: '#f8d6ff',         // --a11y-purple-50
  purple150: '#7a1b87',        // --a11y-purple-150
  bgApp: '#f4f4f4',            // --a11y-black-5
  bgCard: '#ffffff',
  textPrimary: '#26241b',      // --a11y-black-100
  textSecondary: '#525048',    // --a11y-black-80
  textMuted: '#93928d',        // --a11y-black-50
  textDisabled: '#c9c8c6',     // --a11y-black-25
  borderLight: '#dededd',      // --a11y-black-15
  green100: '#3aa566',         // --leaf-green-100
  green50: '#ace5c3',          // --leaf-green-50
  green150: '#146635',         // --leaf-green-150
  red: '#ec6162',              // --light-carmine-pink
  progressBarFill1: '#3b82f6', // actual ActiveJobs.module.css fill start
  progressBarFill2: '#1d4ed8', // actual ActiveJobs.module.css fill end
  badgeBg: '#f1f1f1',          // --anti-flash-white
  badgeText: '#525048',        // --a11y-black-80
} as const;

export const FRAMES = {
  scene1Start: 0,
  scene2Start: 210,
  scene3Start: 450,
  scene4Start: 660,
  scene5Start: 870,
  scene6Start: 1140,
  total: 1260,
} as const;
