import { StyleSheet, View } from 'react-native';

import { Radius, Spacing } from '../constants/theme';
import { AppText } from './AppText';

export type DetailCardTone = 'neutral' | 'story' | 'fact' | 'shaheedi' | 'visitors';

const toneStyle: Record<DetailCardTone, { bg: string; border: string; label: 'gold300' | 'cloud400' }> = {
  neutral: { bg: 'rgba(255,255,255,0.03)', border: 'rgba(255,255,255,0.1)', label: 'gold300' },
  story: { bg: 'rgba(96,165,250,0.05)', border: 'rgba(96,165,250,0.15)', label: 'gold300' },
  fact: { bg: 'rgba(228,187,94,0.08)', border: 'rgba(247,217,137,0.25)', label: 'gold300' },
  shaheedi: { bg: 'rgba(244,63,94,0.05)', border: 'rgba(253,164,175,0.15)', label: 'gold300' },
  visitors: { bg: 'rgba(52,211,153,0.05)', border: 'rgba(110,231,183,0.15)', label: 'gold300' },
};

export function DetailCard({
  label,
  children,
  tone = 'neutral',
}: {
  label: string;
  children: string;
  tone?: DetailCardTone;
}) {
  const palette = toneStyle[tone];
  return (
    <View style={[styles.card, { backgroundColor: palette.bg, borderColor: palette.border }]}>
      <AppText variant="eyebrow" color={palette.label}>
        {label}
      </AppText>
      <AppText variant="body" color="cloud200" style={{ marginTop: Spacing.xs }}>
        {children}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.md,
    borderWidth: 1,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
});
