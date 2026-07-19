// Bilingual-aware typography — every variant automatically switches to the
// Gurmukhi typeface when the active language is Punjabi (mirrors kiosk.ts's
// classForLanguage()), so screens never need to think about font selection
// themselves, only which variant/color to use.
import { Text, type TextProps } from 'react-native';

import { Colors } from '../constants/theme';
import { fontFamilies } from '../lib/fonts';
import { useThemeColors } from '../lib/useThemeColors';
import { useKioskStore } from '../store/kioskStore';

export type AppTextVariant = 'display' | 'heading' | 'subheading' | 'body' | 'label' | 'eyebrow';

const variantStyles: Record<AppTextVariant, { fontSize: number; lineHeight: number; letterSpacing?: number }> = {
  display: { fontSize: 34, lineHeight: 40 },
  heading: { fontSize: 24, lineHeight: 30 },
  subheading: { fontSize: 18, lineHeight: 24 },
  body: { fontSize: 15, lineHeight: 22 },
  label: { fontSize: 13, lineHeight: 18 },
  eyebrow: { fontSize: 12, lineHeight: 16, letterSpacing: 1.5 },
};

const variantWeight: Record<AppTextVariant, 'display' | 'body-semi' | 'body'> = {
  display: 'display',
  heading: 'display',
  subheading: 'body-semi',
  body: 'body',
  label: 'body-semi',
  eyebrow: 'body-semi',
};

export interface AppTextProps extends TextProps {
  variant?: AppTextVariant;
  color?: keyof typeof Colors;
}

export function AppText({ variant = 'body', color = 'white', style, ...props }: AppTextProps) {
  const language = useKioskStore((s) => s.language);
  const themeColors = useThemeColors();
  const isPunjabi = language === 'pa';
  const weight = variantWeight[variant];

  const fontFamily = isPunjabi
    ? weight === 'body' ? fontFamilies.gurmukhiRegular : fontFamilies.gurmukhiSemiBold
    : weight === 'display'
      ? fontFamilies.displaySemiBold
      : weight === 'body-semi'
        ? fontFamilies.bodySemiBold
        : fontFamilies.bodyRegular;

  return (
    <Text
      style={[
        variantStyles[variant],
        { fontFamily, color: themeColors[color] },
        variant === 'eyebrow' && { textTransform: 'uppercase' as const },
        style,
      ]}
      {...props}
    />
  );
}
