// src/font.ts
import { loadFont } from '@remotion/fonts';
import { staticFile } from 'remotion';

const family = 'Atkinson Hyperlegible Next';

loadFont({
  family,
  url: staticFile('fonts/AtkinsonHyperlegibleNext-Regular.woff2'),
  weight: '400',
});

loadFont({
  family,
  url: staticFile('fonts/AtkinsonHyperlegibleNext-Bold.woff2'),
  weight: '700',
});

export const fontFamily = family;
