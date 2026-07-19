// Brand tokens matching the web kiosk's "digital darbar" palette
// (src/styles/global.css in jsdosanj/gw-display) — this app runs a single
// always-dark theme, same as the touchscreen kiosk it mirrors, not a
// light/dark adaptive one. Phase 7 extends `gold` into the same seasonal
// palette swaps (vaisakhi/diwali/gurpurab) the web app supports.
import { Platform } from 'react-native';

export const Colors = {
  night950: '#050b14',
  night900: '#091322',
  night850: '#0d1a2c',
  night800: '#112039',
  gold300: '#f7d989',
  gold400: '#e4bb5e',
  gold500: '#bd8a22',
  cloud200: '#d9e4ef',
  cloud400: '#93a6bc',
  cloud500: '#6f839a',
  white: '#f8fafc',
} as const;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    mono: 'monospace',
  },
});

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const Radius = {
  sm: 12,
  md: 20,
  lg: 28,
} as const;
