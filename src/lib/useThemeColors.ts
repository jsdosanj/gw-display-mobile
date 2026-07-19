import { Colors } from '../constants/theme';
import { palettes } from '../constants/palettes';
import displayContent from '../shared/display-content';
import { useKioskStore } from '../store/kioskStore';

/**
 * Merges the static base palette with the active seasonal theme's gold
 * override — the only colors that change per theme, matching the web
 * kiosk's global.css (only --color-gold-300/400/500 are overridden there).
 * Scoped to the highest-visibility surfaces (AppText, tab bar) rather than
 * threaded through every component's StyleSheet — see Phase 7 commit notes.
 */
export function useThemeColors(): Record<keyof typeof Colors, string> {
  const themeId = useKioskStore((s) => s.themeId);
  const activeTheme = displayContent.themes.find((t) => t.id === themeId);
  const gold = palettes[activeTheme?.palette ?? 'default'];
  return { ...Colors, gold300: gold.gold300, gold400: gold.gold400, gold500: gold.gold500 };
}
