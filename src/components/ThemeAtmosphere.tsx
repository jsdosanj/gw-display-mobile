import { StyleSheet } from 'react-native';
import { Circle, Defs, RadialGradient, Stop, Svg } from 'react-native-svg';

import { useThemeColors } from '../lib/useThemeColors';
import displayContent from '../shared/display-content';
import type { ThemePalette } from '../shared/display';
import { useKioskStore } from '../store/kioskStore';

interface Blob {
  cx: string;
  cy: string;
  r: string;
  gradient: 'gold-glow' | 'accent-glow';
}

// Mirrors the web kiosk's #ambient-layer blobs + per-theme .theme-motif
// (global.css) — pure gradients, no figurative imagery. Each theme gets a
// distinct arrangement so the four themes read as genuinely different
// atmospheres rather than a gold hue-shift.
const blobLayouts: Record<ThemePalette, Blob[]> = {
  default: [
    { cx: '8%', cy: '6%', r: '32%', gradient: 'gold-glow' },
    { cx: '95%', cy: '38%', r: '28%', gradient: 'accent-glow' },
  ],
  // Dawn light over harvest fields — warm gold high, fresh green low.
  vaisakhi: [
    { cx: '50%', cy: '-4%', r: '40%', gradient: 'gold-glow' },
    { cx: '92%', cy: '58%', r: '34%', gradient: 'accent-glow' },
    { cx: '2%', cy: '68%', r: '26%', gradient: 'accent-glow' },
  ],
  // Rows of distant lights glowing up from the base, gold and crimson.
  diwali: [
    { cx: '18%', cy: '100%', r: '34%', gradient: 'gold-glow' },
    { cx: '58%', cy: '102%', r: '30%', gradient: 'accent-glow' },
    { cx: '92%', cy: '98%', r: '28%', gradient: 'gold-glow' },
  ],
  // A serene halo emanating from the top center — reverent light, not a figure.
  gurpurab: [
    { cx: '50%', cy: '0%', r: '44%', gradient: 'gold-glow' },
    { cx: '50%', cy: '6%', r: '26%', gradient: 'accent-glow' },
  ],
};

/**
 * Full-bleed decorative background glow, mounted once behind a screen's
 * scrollable content (see (tabs)/index.tsx) — the mobile counterpart to the
 * web kiosk's ambient layer. Static (no animation), so it needs no
 * reduced-motion handling.
 */
export function ThemeAtmosphere() {
  const themeId = useKioskStore((s) => s.themeId);
  const activeTheme = displayContent.themes.find((t) => t.id === themeId);
  const palette = activeTheme?.palette ?? 'default';
  const colors = useThemeColors();
  const blobs = blobLayouts[palette];

  return (
    <Svg style={StyleSheet.absoluteFill} pointerEvents="none">
      <Defs>
        <RadialGradient id="gold-glow" cx="50%" cy="50%" r="50%">
          <Stop offset="0" stopColor={colors.gold300} stopOpacity={0.3} />
          <Stop offset="1" stopColor={colors.gold300} stopOpacity={0} />
        </RadialGradient>
        <RadialGradient id="accent-glow" cx="50%" cy="50%" r="50%">
          <Stop offset="0" stopColor={colors.accentSecondary} stopOpacity={0.24} />
          <Stop offset="1" stopColor={colors.accentSecondary} stopOpacity={0} />
        </RadialGradient>
      </Defs>
      {blobs.map((blob, i) => (
        <Circle key={i} cx={blob.cx} cy={blob.cy} r={blob.r} fill={`url(#${blob.gradient})`} />
      ))}
    </Svg>
  );
}
