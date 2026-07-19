// Transcribed once from the web kiosk's global.css seasonal theme overrides
// (--color-gold-300/400/500 and --color-accent-secondary are what change per
// theme there; everything else in the palette is shared). Kept as a plain
// lookup table, the same shape the plan called for, rather than anything
// CSS-variable-based since RN has no equivalent mechanism.
import type { ThemePalette } from '../shared/display';

export interface GoldPalette {
  gold300: string;
  gold400: string;
  gold500: string;
  /** Ambient/decorative-only accent, never used on text — see ThemeAtmosphere. */
  accentSecondary: string;
}

export const palettes: Record<ThemePalette, GoldPalette> = {
  default: { gold300: '#f7d989', gold400: '#e4bb5e', gold500: '#bd8a22', accentSecondary: '#60a5fa' },
  vaisakhi: { gold300: '#ffb37a', gold400: '#f28a3c', gold500: '#c96a1f', accentSecondary: '#4ad194' },
  diwali: { gold300: '#ffcf7a', gold400: '#e6a23d', gold500: '#a8471f', accentSecondary: '#c4404a' },
  gurpurab: { gold300: '#fff3d1', gold400: '#f0cf7e', gold500: '#c79f3f', accentSecondary: '#c4b5fd' },
};
