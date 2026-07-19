// Prev/next + dot-progress control for stepping through the 5 Panj Pyare or
// Panj Takht profiles — mirrors the web kiosk's chapter bar, wired to the
// shared stepPyara/stepTakht reducers via the store.
import { Pressable, StyleSheet, View } from 'react-native';

import { Colors, Spacing } from '../constants/theme';
import { AppText } from './AppText';

export function ChapterBar({
  total,
  currentIndex,
  chapterLabel,
  chapterName,
  previousLabel,
  nextLabel,
  onStep,
}: {
  total: number;
  currentIndex: number;
  chapterLabel: string;
  chapterName: string;
  previousLabel: string;
  nextLabel: string;
  onStep: (delta: number) => void;
}) {
  const canPrev = currentIndex > 0;
  const canNext = currentIndex < total - 1;

  return (
    <View style={styles.row}>
      <Pressable
        onPress={() => onStep(-1)}
        disabled={!canPrev}
        accessibilityRole="button"
        accessibilityLabel={previousLabel}
        style={[styles.navButton, !canPrev && styles.navButtonDisabled]}>
        <AppText color={canPrev ? 'gold300' : 'cloud500'}>←</AppText>
      </Pressable>

      <View style={styles.meta}>
        <AppText variant="eyebrow" color="gold300" style={{ textAlign: 'center' }}>
          {chapterLabel} {currentIndex + 1} / {total} — {chapterName}
        </AppText>
        <View style={styles.dots}>
          {Array.from({ length: total }, (_, i) => (
            <View key={i} style={[styles.dot, i <= currentIndex && styles.dotFilled]} />
          ))}
        </View>
      </View>

      <Pressable
        onPress={() => onStep(1)}
        disabled={!canNext}
        accessibilityRole="button"
        accessibilityLabel={nextLabel}
        style={[styles.navButton, !canNext && styles.navButtonDisabled]}>
        <AppText color={canNext ? 'gold300' : 'cloud500'}>→</AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, paddingVertical: Spacing.sm },
  navButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(247,217,137,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonDisabled: { borderColor: 'rgba(255,255,255,0.1)' },
  meta: { flex: 1, alignItems: 'center', gap: Spacing.xs },
  dots: { flexDirection: 'row', gap: 6 },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.2)' },
  dotFilled: { backgroundColor: Colors.gold400 },
});
