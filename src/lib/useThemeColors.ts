import { Colors } from '../constants/theme';
import { palettes } from '../constants/palettes';
import displayContent from '../shared/display-content';
import { useKioskStore } from '../store/kioskStore';

export type ThemeColors = Record<keyof typeof Colors, string> & { accentSecondary: string };

/**
 * Merges the static base palette with the active seasonal theme's gold
 * override and secondary accent — matching the web kiosk's global.css
 * (--color-gold-300/400/500 and --color-accent-secondary are what change
 * per theme there). Scoped to the highest-visibility surfaces (AppText,
 * tab bar, ThemeAtmosphere) rather than threaded through every component's
 * StyleSheet — see Phase 7 commit notes.
 */
export function useThemeColors(): ThemeColors {
  const themeId = useKioskStore((s) => s.themeId);
  const activeTheme = displayContent.themes.find((t) => t.id === themeId);
  const theme = palettes[activeTheme?.palette ?? 'default'];
  return {
    ...Colors,
    gold300: theme.gold300,
    gold400: theme.gold400,
    gold500: theme.gold500,
    accentSecondary: theme.accentSecondary,
  };
}
