// Ported from kiosk.ts's text()/classForLanguage() — same fallback
// behavior, adapted for RN: text() now takes `language` explicitly instead
// of closing over module-level state (there's no module-level render loop
// here, state lives in the Zustand store), and classForLanguage's CSS class
// swap becomes a font-family style object since RN has no CSS classes.
import type { Language, LocalizedText, View } from '../shared/display';
import { fontFamilies } from './fonts';

export function text(value: LocalizedText, language: Language): string {
  return value[language] ?? value.en;
}

export function useLocalizedTextStyle(language: Language): { fontFamily: string } {
  return { fontFamily: language === 'pa' ? fontFamilies.gurmukhiRegular : fontFamilies.bodyRegular };
}

// Ported verbatim from kiosk.ts's `icons` map — same emoji glyphs, kept
// identical across web and mobile rather than introducing a vector-icon
// dependency for a single-glyph-per-tab use case.
export const viewIcons: Record<View, string> = {
  home: '🏛️',
  pyare: '⚔️',
  takhts: '🕌',
  quiz: '✨',
  learn: '📖',
  about: 'ℹ️',
  resources: '🌐',
  leaflets: '📄',
};
